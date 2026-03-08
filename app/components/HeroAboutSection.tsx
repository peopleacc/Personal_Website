"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

const TOTAL_FRAMES = 104;
const PRELOAD_AHEAD = 10;

const PARTICLE_DATA = Array.from({ length: 20 }, (_, i) => ({
    width: 2 + ((i * 7 + 3) % 5) * 0.6,
    height: 2 + ((i * 11 + 7) % 5) * 0.6,
    left: ((i * 37 + 13) % 100),
    top: ((i * 53 + 29) % 100),
    opacity: 0.15 + ((i * 17 + 5) % 10) * 0.03,
    duration: 3 + ((i * 23 + 11) % 8) * 0.5,
    delay: ((i * 31 + 3) % 10) * 0.5,
}));

export default function HeroAboutSection() {
    const containerRef = useRef<HTMLDivElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const heroRef = useRef<HTMLDivElement>(null);
    const aboutRef = useRef<HTMLDivElement>(null);
    const overlayRef = useRef<HTMLDivElement>(null);
    const bottomFadeRef = useRef<HTMLDivElement>(null);

    const imagesRef = useRef<(HTMLImageElement | null)[]>(Array(TOTAL_FRAMES + 2).fill(null));
    const loadedRef = useRef<boolean[]>(Array(TOTAL_FRAMES + 2).fill(false));

    const rafRef = useRef<number | null>(null);
    const scrollRef = useRef(0);
    const lastDrawRef = useRef({ base: -1, blend: -1 });

    const loadFrame = (frameNum: number) => {
        if (frameNum < 1 || frameNum > TOTAL_FRAMES) return;
        if (loadedRef.current[frameNum]) return;
        loadedRef.current[frameNum] = true;
        const img = new window.Image();
        img.src = `/frame/${String(frameNum).padStart(5, "0")}.png`;
        img.onload = () => { imagesRef.current[frameNum] = img; };
    };

    // Eager preload first 20 frames
    useEffect(() => {
        for (let i = 1; i <= Math.min(20, TOTAL_FRAMES); i++) loadFrame(i);
    }, []);

    // Resize canvas
    useEffect(() => {
        const resize = () => {
            const canvas = canvasRef.current;
            if (!canvas) return;
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            lastDrawRef.current = { base: -1, blend: -1 }; // force redraw
        };
        resize();
        window.addEventListener("resize", resize);
        return () => window.removeEventListener("resize", resize);
    }, []);

    useEffect(() => {
        const handleScroll = () => {
            if (!containerRef.current) return;
            const rect = containerRef.current.getBoundingClientRect();
            const totalScroll = rect.height - window.innerHeight;
            scrollRef.current = Math.max(0, Math.min(1, -rect.top / totalScroll));
        };

        const tick = () => {
            const p = scrollRef.current;
            const exactFrame = p * (TOTAL_FRAMES - 1) + 1;
            const baseFrame = Math.max(1, Math.min(TOTAL_FRAMES, Math.floor(exactFrame)));
            const nextFrame = Math.max(1, Math.min(TOTAL_FRAMES, baseFrame + 1));
            const blend = Math.round((exactFrame - baseFrame) * 100) / 100;

            // Preload ahead
            for (let i = baseFrame; i <= Math.min(TOTAL_FRAMES, baseFrame + PRELOAD_AHEAD); i++) {
                loadFrame(i);
            }

            // Draw to canvas only if something changed
            const last = lastDrawRef.current;
            if (baseFrame !== last.base || Math.abs(blend - last.blend) > 0.005) {
                const canvas = canvasRef.current;
                const ctx = canvas?.getContext("2d");
                const baseImg = imagesRef.current[baseFrame];
                const nextImg = imagesRef.current[nextFrame];

                if (ctx && baseImg) {
                    const w = canvas!.width;
                    const h = canvas!.height;
                    ctx.globalAlpha = 1;
                    ctx.drawImage(baseImg, 0, 0, w, h);
                    if (nextImg && blend > 0) {
                        ctx.globalAlpha = blend;
                        ctx.drawImage(nextImg, 0, 0, w, h);
                        ctx.globalAlpha = 1;
                    }
                    lastDrawRef.current = { base: baseFrame, blend };
                }
            }

            // Update DOM directly — zero React re-render
            const heroOpacity = p < 0.15 ? 1 : p > 0.35 ? 0 : 1 - (p - 0.15) / 0.2;
            const heroScale = 1 - p * 0.05;
            const aboutOpacity = p < 0.30 ? 0 : p > 0.50 ? 1 : (p - 0.30) / 0.2;
            const aboutOverlayOpacity = p < 0.25 ? 0 : p > 0.45 ? 0.7 : ((p - 0.25) / 0.2) * 0.7;
            const aboutTranslateY = p < 0.30 ? 60 : Math.max(0, 60 - ((p - 0.30) / 0.2) * 60);
            const bottomFadeOpacity = p > 0.85 ? (p - 0.85) / 0.15 : 0;

            if (heroRef.current) {
                heroRef.current.style.opacity = String(heroOpacity);
                heroRef.current.style.transform = `scale(${heroScale})`;
                heroRef.current.style.pointerEvents = heroOpacity < 0.3 ? "none" : "auto";
            }
            if (aboutRef.current) {
                aboutRef.current.style.opacity = String(aboutOpacity);
                aboutRef.current.style.transform = `translateY(${aboutTranslateY}px)`;
                aboutRef.current.style.pointerEvents = aboutOpacity < 0.3 ? "none" : "auto";
            }
            if (overlayRef.current) {
                overlayRef.current.style.opacity = String(aboutOverlayOpacity);
            }
            if (bottomFadeRef.current) {
                bottomFadeRef.current.style.opacity = String(bottomFadeOpacity);
            }

            rafRef.current = requestAnimationFrame(tick);
        };

        window.addEventListener("scroll", handleScroll, { passive: true });
        rafRef.current = requestAnimationFrame(tick);

        return () => {
            window.removeEventListener("scroll", handleScroll);
            if (rafRef.current) cancelAnimationFrame(rafRef.current);
        };
    }, []);

    return (
        <section
            id="home"
            ref={containerRef}
            className="relative w-full"
            style={{ height: "350vh" }}
        >
            {/* About anchor — placed at ~55% of section height where About content is visible */}
            <div id="about" className="absolute left-0 w-0 h-0" style={{ top: "55%" }} />

            <div className="sticky top-0 w-full h-screen overflow-hidden">

                {/* Canvas — frame animation rendered here */}
                <canvas
                    ref={canvasRef}
                    className="absolute inset-0 w-full h-full"
                    style={{ display: "block", objectFit: "cover" }}
                />

                {/* Cinematic overlays */}
                <div className="absolute inset-0 bg-gradient-to-b from-[rgba(15,10,26,0.3)] via-transparent to-[rgba(15,10,26,0.6)] pointer-events-none" />
                <div className="absolute inset-0 bg-gradient-to-r from-[rgba(15,10,26,0.4)] via-transparent to-[rgba(15,10,26,0.4)] pointer-events-none" />
                <div
                    className="absolute inset-0 pointer-events-none"
                    style={{ background: "radial-gradient(ellipse at center, transparent 50%, rgba(15,10,26,0.6) 100%)" }}
                />

                {/* About dark overlay */}
                <div
                    ref={overlayRef}
                    className="absolute inset-0 z-[1] pointer-events-none"
                    style={{ background: "rgba(7, 4, 13, 0.85)", opacity: 0 }}
                />

                {/* Floating particles */}
                <div className="absolute inset-0 z-[1] pointer-events-none overflow-hidden">
                    {PARTICLE_DATA.map((p, i) => (
                        <div
                            key={i}
                            className="absolute rounded-full"
                            style={{
                                width: `${p.width}px`,
                                height: `${p.height}px`,
                                left: `${p.left}%`,
                                top: `${p.top}%`,
                                background: `rgba(245, 158, 11, ${p.opacity})`,
                                animation: `float ${p.duration}s ease-in-out infinite`,
                                animationDelay: `${p.delay}s`,
                            }}
                        />
                    ))}
                </div>

                {/* ===== HERO CONTENT ===== */}
                <div
                    ref={heroRef}
                    className="absolute inset-0 z-10 flex flex-row items-center justify-center px-6 lg:px-12 gap-88"
                    style={{ opacity: 1, transform: "scale(1)" }}
                >
                    {/* LEFT: Text */}
                    <div className="relative z-10 flex flex-col items-center lg:items-start justify-center text-center lg:text-left max-w-xl">
                        <div className="animate-fade-in-up" style={{ animationDelay: "0.2s", animationFillMode: "both" }}>
                            <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full glass mb-6 border border-[rgba(245,158,11,0.2)]">
                                <span className="w-2 h-2 rounded-full bg-[var(--accent-orange)] animate-pulse" />
                                <span className="text-xs md:text-sm font-medium tracking-[0.2em] uppercase text-[var(--accent-orange)]">
                                    Available for work
                                </span>
                            </div>
                        </div>

                        <div className="animate-fade-in-up" style={{ animationDelay: "0.5s", animationFillMode: "both" }}>
                            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black leading-[0.9] mb-6 tracking-tight">
                                <span className="gradient-text">Full Stack</span>
                                <br />
                                <span className="text-[var(--text-primary)] drop-shadow-[0_0_30px_rgba(245,158,11,0.15)]">
                                    Developer
                                </span>
                            </h1>
                        </div>

                        <div className="animate-fade-in-up" style={{ animationDelay: "0.8s", animationFillMode: "both" }}>
                            <p className="text-base md:text-lg text-[var(--text-succsess)] max-w-xl mb-10 leading-relaxed">
                                Selamat Datang di Website Personal Raisa Akmal Faridi.
                                <br className="hidden md:block" />
                                Scroll untuk menjelajahi perjalanan saya.
                            </p>
                        </div>

                        <div className="animate-fade-in-up flex flex-col sm:flex-row gap-4" style={{ animationDelay: "1.1s", animationFillMode: "both" }}>
                            <a
                                href="#skills"
                                className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-gradient-to-r from-[var(--accent-orange)] to-[var(--accent-pink)] text-white font-semibold text-sm transition-all duration-300 hover:scale-105 hover:shadow-[0_0_40px_rgba(245,158,11,0.3)]"
                            >
                                Explore My Skills
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M12 5v14M19 12l-7 7-7-7" />
                                </svg>
                            </a>
                            <a
                                href="#chat"
                                className="inline-flex items-center gap-3 px-8 py-4 rounded-full glass text-[var(--text-primary)] font-semibold text-sm transition-all duration-300 hover:scale-105 hover:bg-[rgba(255,255,255,0.1)] border border-[var(--glass-border)]"
                            >
                                Chat With Me
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                                </svg>
                            </a>
                        </div>

                    </div>

                    {/* RIGHT: Profile Photo */}
                    <div className="hidden lg:flex justify-center items-center">
                        <div className="relative w-[340px] h-[340px]">
                            <div className="absolute -inset-4 rounded-full border border-[rgba(245,158,11,0.1)] animate-pulse" />
                            <div className="absolute -inset-8 rounded-full border border-[rgba(168,85,247,0.05)]" />
                            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-[var(--accent-orange)] via-[var(--accent-pink)] to-[var(--accent-purple)] opacity-20 blur-3xl animate-pulse" />
                            <div className="absolute inset-3 rounded-full glass border border-[var(--glass-border)] overflow-hidden shadow-[0_0_60px_rgba(245,158,11,0.1)]">
                                <Image
                                    src="/image/fyor.jpg"
                                    alt="Profile"
                                    fill
                                    className="object-cover scale-[1] object-[center_30%]"
                                    sizes="340px"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-[rgba(15,10,26,0.4)] to-transparent" />
                            </div>
                            <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 px-5 py-2 rounded-full glass-strong border border-[rgba(245,158,11,0.2)] animate-float">
                                <span className="text-xs font-semibold gradient-text">Raisa Akmal Faridi</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Scroll indicator — centered at bottom of screen */}
                <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2">
                    <span className="text-[10px] text-[var(--text-secondary)] tracking-[0.3em] uppercase">Scroll</span>
                    <div className="w-5 h-9 rounded-full border border-[var(--text-secondary)] flex justify-center pt-2 opacity-50">
                        <div className="w-1 h-1 rounded-full bg-[var(--accent-orange)] animate-bounce" />
                    </div>
                </div>

                {/* ===== ABOUT CONTENT ===== */}
                <div
                    ref={aboutRef}
                    className="absolute inset-0 z-10 flex items-center px-6"
                    style={{ opacity: 0, transform: "translateY(60px)", pointerEvents: "none" }}
                >
                    <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        <div>
                            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass mb-6 border border-[rgba(168,85,247,0.2)]">
                                <span className="text-xs font-medium tracking-[0.2em] uppercase text-[var(--accent-purple)]">About Me</span>
                            </div>
                            <h2 className="text-4xl md:text-6xl font-black leading-[1.05] mb-8 tracking-tight">
                                <span className="gradient-text">Who</span>{" "}
                                <span className="text-[var(--text-primary)]">Am I?</span>
                            </h2>
                            <div className="space-y-4 text-[var(--text-secondary)] text-sm md:text-base leading-relaxed">
                                <p>
                                    Saya adalah seorang Full Stack Developer yang berfokus pada pengembangan aplikasi web yang modern, scalable, dan user-friendly.
                                </p>
                                <p>
                                    Berpengalaman dalam menggunakan berbagai teknologi seperti Laravel, JavaScript, dan framework modern untuk membangun solusi digital yang efisien dan terstruktur dengan baik.
                                </p>
                                <p>
                                    Saya selalu tertarik untuk mempelajari teknologi baru, meningkatkan kualitas kode, dan berkontribusi dalam menciptakan produk digital yang memberikan nilai nyata bagi pengguna.
                                </p>
                            </div>

                        </div>
                    </div>
                </div>

                {/* Bottom fade */}
                <div
                    ref={bottomFadeRef}
                    className="absolute bottom-0 left-0 right-0 h-32 z-20 pointer-events-none"
                    style={{ opacity: 0, background: "linear-gradient(to bottom, transparent, var(--bg-primary))" }}
                />
            </div>
        </section>
    );
}