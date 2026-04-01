"use client";

import { useCallback, useEffect, useRef, useState } from "react";

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

// ─── Name config ──────────────────────────────────────────────────────────────
// Full string typed/deleted as one sequence.
// LINE_BREAK_INDEX = length of line 1 ("Raisa" = 5 chars).
// After index 5 there's a space we skip, then line 2 is "Akmal Faridi".
const FULL_NAME = "Raisa Akmal Faridi";
const LINE_BREAK_INDEX = 5; // "Raisa".length
// ─────────────────────────────────────────────────────────────────────────────

type Phase = "typing" | "full-pause" | "deleting" | "empty-pause";

function useTypewriter({
    text = FULL_NAME,
    typeSpeed = 90,
    deleteSpeed = 55,
    pauseAfterFull = 2400,
    pauseAfterEmpty = 2000,
}: {
    text?: string;
    typeSpeed?: number;
    deleteSpeed?: number;
    pauseAfterFull?: number;
    pauseAfterEmpty?: number;
} = {}) {
    const [charCount, setCharCount] = useState(0);
    const [phase, setPhase] = useState<Phase>("typing");

    useEffect(() => {
        let t: ReturnType<typeof setTimeout>;

        if (phase === "typing") {
            if (charCount < text.length) {
                t = setTimeout(() => setCharCount((c) => c + 1), typeSpeed);
            } else {
                t = setTimeout(() => setPhase("full-pause"), pauseAfterFull);
            }
        } else if (phase === "full-pause") {
            setPhase("deleting");
        } else if (phase === "deleting") {
            if (charCount > 0) {
                t = setTimeout(() => setCharCount((c) => c - 1), deleteSpeed);
            } else {
                t = setTimeout(() => setPhase("empty-pause"), pauseAfterEmpty);
            }
        } else if (phase === "empty-pause") {
            setPhase("typing");
        }

        return () => clearTimeout(t);
    }, [charCount, phase, text, typeSpeed, deleteSpeed, pauseAfterFull, pauseAfterEmpty]);

    const typed = text.slice(0, charCount);
    const line1 = typed.slice(0, LINE_BREAK_INDEX);
    const line2 = charCount > LINE_BREAK_INDEX ? typed.slice(LINE_BREAK_INDEX + 1) : "";
    const cursorOnLine = charCount > LINE_BREAK_INDEX ? 2 : 1;

    // Buttons stay visible for 2s after name starts deleting, then hide
    const [buttonsVisible, setButtonsVisible] = useState(false);
    const hideTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    useEffect(() => {
        if (charCount > 0) {
            // Name has chars — cancel any pending hide, show buttons immediately
            if (hideTimerRef.current) {
                clearTimeout(hideTimerRef.current);
                hideTimerRef.current = null;
            }
            setButtonsVisible(true);
        } else {
            // Name just became empty — wait 2s then hide
            hideTimerRef.current = setTimeout(() => setButtonsVisible(false), 0);
        }
        return () => {
            if (hideTimerRef.current) clearTimeout(hideTimerRef.current);
        };
    }, [charCount]);

    return { line1, line2, cursorOnLine, buttonsVisible };
}

import React from "react";

const Cursor = () => (
    <span
        className="inline-block w-[3px] ml-[2px] bg-[var(--accent-orange)]"
        style={{
            height: "0.82em",
            verticalAlign: "middle",
            animation: "blink-cursor 0.75s step-end infinite",
        }}
    />
);

const HeroContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>((props, ref) => {
    const { line1, line2, cursorOnLine, buttonsVisible } = useTypewriter();

    return (
        <div
            ref={ref}
            className="absolute inset-0 z-10 flex flex-row items-center justify-start px-6 lg:pl-44 gap-88"
            style={{ opacity: 1, transform: "scale(1)", willChange: "opacity, transform" }}
        >
            <div className="relative z-10 flex flex-col items-center lg:items-start justify-center text-center lg:text-left max-w-xl">

                <div className="animate-fade-in-up" style={{ animationDelay: "0.2s", animationFillMode: "both" }}>
                    <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full glass mb-6 border border-[rgba(245,158,11,0.2)]" />
                </div>

                {/* ── Two-line name ── */}
                <div className="animate-fade-in-up" style={{ animationDelay: "0.5s", animationFillMode: "both" }}>
                    <h1
                        className="font-black tracking-tight mb-6"
                        style={{ fontSize: "clamp(3rem, 8vw, 6rem)", lineHeight: 1.05 }}
                    >
                        {/* Line 1 — "Raisa" */}
                        <div
                            className="block text-[var(--text-primary)] drop-shadow-[0_0_30px_rgba(245,158,11,0.15)]"
                            style={{ minHeight: "1.05em" }}
                        >
                            {line1 || <span className="invisible">R</span>}
                            {cursorOnLine === 1 && <Cursor />}
                        </div>

                        {/* Line 2 — "Akmal Faridi" */}
                        <div
                            className="block text-[var(--text-primary)] drop-shadow-[0_0_30px_rgba(245,158,11,0.15)]"
                            style={{ minHeight: "1.05em" }}
                        >
                            {line2 || <span className="invisible">A</span>}
                            {cursorOnLine === 2 && <Cursor />}
                        </div>
                    </h1>
                </div>

                {/* ── Buttons — synced with name visibility ── */}
                <div
                    className="flex mt-8 flex-col sm:flex-row gap-4"
                    style={{
                        opacity: buttonsVisible ? 1 : 0,
                        transform: buttonsVisible ? "translateY(0px)" : "translateY(14px)",
                        transition: "opacity 0.6s ease, transform 0.6s ease",
                        pointerEvents: buttonsVisible ? "auto" : "none",
                    }}
                >
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

            <div className="hidden lg:flex justify-center items-center" />
        </div>
    );
});

HeroContent.displayName = "HeroContent";

export default function HeroAboutSection() {
    const containerRef = useRef<HTMLDivElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const heroRef = useRef<HTMLDivElement>(null);
    const aboutRef = useRef<HTMLDivElement>(null);
    const overlayRef = useRef<HTMLDivElement>(null);


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
        img.src = `/frame/${String(frameNum).padStart(5, "0")}.webp`;
        img.onload = () => { imagesRef.current[frameNum] = img; };
    };

    // Pick up preloaded frames from the Loader (if available), otherwise fallback
    useEffect(() => {
        const preloaded = (window as unknown as Record<string, unknown>).__preloadedFrames as (HTMLImageElement | null)[] | undefined;
        if (preloaded && preloaded.length > 0) {
            for (let i = 1; i <= TOTAL_FRAMES; i++) {
                if (preloaded[i]) {
                    imagesRef.current[i] = preloaded[i];
                    loadedRef.current[i] = true;
                }
            }
            // Immediately draw frame 1 so it's visible behind the loader curtain
            const canvas = canvasRef.current;
            const ctx = canvas?.getContext("2d");
            const firstImg = imagesRef.current[1];
            if (ctx && canvas && firstImg) {
                canvas.width = window.innerWidth;
                canvas.height = window.innerHeight;
                ctx.drawImage(firstImg, 0, 0, canvas.width, canvas.height);
                lastDrawRef.current = { base: 1, blend: 0 };
            }
        } else {
            // Fallback: preload first 20 on-demand
            for (let i = 1; i <= Math.min(20, TOTAL_FRAMES); i++) loadFrame(i);
        }
    }, []);

    useEffect(() => {
        const resize = () => {
            const canvas = canvasRef.current;
            if (!canvas) return;
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            lastDrawRef.current = { base: -1, blend: -1 };
            // Redraw current frame after resize
            const firstImg = imagesRef.current[1];
            const ctx = canvas.getContext("2d");
            if (ctx && firstImg) {
                ctx.drawImage(firstImg, 0, 0, canvas.width, canvas.height);
            }
        };
        resize();
        window.addEventListener("resize", resize);
        return () => window.removeEventListener("resize", resize);
    }, []);

    useEffect(() => {
        const handleScroll = () => {
            if (!containerRef.current) return;
            const rect = containerRef.current.getBoundingClientRect();
            const totalScroll = rect.height - window.innerHeight * 2;
            scrollRef.current = Math.max(0, Math.min(1, -rect.top / totalScroll));
        };

        const tick = () => {
            const p = scrollRef.current;

            const exactFrame = p * (TOTAL_FRAMES - 1) + 1;
            const baseFrame = Math.max(1, Math.min(TOTAL_FRAMES, Math.floor(exactFrame)));
            const nextFrame = Math.max(1, Math.min(TOTAL_FRAMES, baseFrame + 1));
            const blend = Math.round((exactFrame - baseFrame) * 100) / 100;

            for (let i = baseFrame; i <= Math.min(TOTAL_FRAMES, baseFrame + PRELOAD_AHEAD); i++) {
                loadFrame(i);
            }

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

            const heroOpacity = p < 0.15 ? 1 : p > 0.35 ? 0 : 1 - (p - 0.15) / 0.2;
            const heroScale = 1 - p * 0.05;
            const aboutOpacity = p < 0.30 ? 0 : p > 0.50 ? 1 : (p - 0.30) / 0.2;
            const aboutOverlayOpacity = p < 0.25 ? 0 : p > 0.45 ? 0.7 : ((p - 0.25) / 0.2) * 0.7;
            const aboutTranslateY = p < 0.30 ? 60 : Math.max(0, 60 - ((p - 0.30) / 0.2) * 60);


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
            style={{ height: "450vh" }}
        >
            <div id="about" className="absolute left-0 w-0 h-0" style={{ top: "55%" }} />

            <div className="sticky top-0 w-full h-screen overflow-hidden" style={{ zIndex: 1 }}>

                {/* Canvas */}
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
                <HeroContent ref={heroRef} />

                {/* Scroll indicator */}
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
                                <p>Saya adalah seorang Full Stack Developer yang berfokus pada pengembangan aplikasi web yang modern, scalable, dan user-friendly.</p>
                                <p>Berpengalaman dalam menggunakan berbagai teknologi seperti Laravel, JavaScript, dan framework modern untuk membangun solusi digital yang efisien dan terstruktur dengan baik.</p>
                                <p>Saya selalu tertarik untuk mempelajari teknologi baru, meningkatkan kualitas kode, dan berkontribusi dalam menciptakan produk digital yang memberikan nilai nyata bagi pengguna.</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom fade — removed for seamless frame transition continuity */}
            </div>

            <style>{`
                @keyframes blink-cursor {
                    from, to { opacity: 1; }
                    50%      { opacity: 0; }
                }
            `}</style>
        </section>
    );
}