"use client";

import { useEffect, useRef, useState, useMemo } from "react";
import Image from "next/image";

const TOTAL_FRAMES = 104;

// Pre-computed particle data to avoid hydration mismatch from Math.random()
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
    const [currentFrame, setCurrentFrame] = useState(1);
    const [scrollProgress, setScrollProgress] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            if (!containerRef.current) return;
            const rect = containerRef.current.getBoundingClientRect();
            const totalScroll = rect.height - window.innerHeight;
            const progress = Math.max(0, Math.min(1, -rect.top / totalScroll));
            setScrollProgress(progress);

            const frame = Math.max(
                1,
                Math.min(TOTAL_FRAMES, Math.floor(progress * TOTAL_FRAMES) + 1)
            );
            setCurrentFrame(frame);
        };

        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const frameNumber = String(currentFrame).padStart(5, "0");

    // Hero fades out from 15% to 35%, About fades in from 30% to 50%
    const heroOpacity = scrollProgress < 0.15 ? 1 : scrollProgress > 0.35 ? 0 : 1 - (scrollProgress - 0.15) / 0.2;
    const aboutOpacity = scrollProgress < 0.30 ? 0 : scrollProgress > 0.50 ? 1 : (scrollProgress - 0.30) / 0.2;
    const heroScale = 1 - scrollProgress * 0.05;
    // Dark overlay opacity for About readability
    const aboutOverlayOpacity = scrollProgress < 0.25 ? 0 : scrollProgress > 0.45 ? 0.7 : ((scrollProgress - 0.25) / 0.2) * 0.7;
    const aboutTranslateY = scrollProgress < 0.30 ? 60 : 60 - ((scrollProgress - 0.30) / 0.2) * 60;

    return (
        <section
            id="home"
            ref={containerRef}
            className="relative w-full"
            style={{ height: "350vh" }}
        >
            <div className="sticky top-0 w-full h-screen overflow-hidden">
                {/* Animated Frame Background */}
                <div className="absolute inset-0">
                    <Image
                        src={`/frame/${frameNumber}.png`}
                        alt="Anime cityscape"
                        fill
                        className="object-cover"
                        priority={currentFrame <= 3}
                        sizes="100vw"
                    />
                    {/* Cinematic overlays */}
                    <div className="absolute inset-0 bg-gradient-to-b from-[rgba(15,10,26,0.3)] via-transparent to-[rgba(15,10,26,0.6)]" />
                    <div className="absolute inset-0 bg-gradient-to-r from-[rgba(15,10,26,0.4)] via-transparent to-[rgba(15,10,26,0.4)]" />
                    {/* Vignette */}
                    <div
                        className="absolute inset-0"
                        style={{
                            background: "radial-gradient(ellipse at center, transparent 50%, rgba(15,10,26,0.6) 100%)",
                        }}
                    />
                </div>

                {/* Dark overlay for About section readability */}
                <div
                    className="absolute inset-0 z-[1]"
                    style={{
                        background: "rgba(7, 4, 13, 0.85)",
                        opacity: aboutOverlayOpacity,
                        transition: "opacity 0.15s ease",
                    }}
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
                    className="absolute inset-0 z-10 flex flex-col items-center justify-center px-6 text-center"
                    style={{
                        opacity: heroOpacity,
                        transform: `scale(${heroScale})`,
                        transition: "opacity 0.1s, transform 0.1s",
                        pointerEvents: heroOpacity < 0.3 ? "none" : "auto",
                    }}
                >
                    <div
                        className="animate-fade-in-up"
                        style={{ animationDelay: "0.2s", animationFillMode: "both" }}
                    >
                        <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full glass mb-6 border border-[rgba(245,158,11,0.2)]">
                            <span className="w-2 h-2 rounded-full bg-[var(--accent-orange)] animate-pulse" />
                            <span className="text-xs md:text-sm font-medium tracking-[0.2em] uppercase text-[var(--accent-orange)]">
                                Available for work
                            </span>
                        </div>
                    </div>

                    <div
                        className="animate-fade-in-up"
                        style={{ animationDelay: "0.5s", animationFillMode: "both" }}
                    >
                        <h1 className="text-5xl md:text-7xl lg:text-9xl font-black leading-[0.9] mb-6 tracking-tight">
                            <span className="gradient-text">Creative</span>
                            <br />
                            <span className="text-[var(--text-primary)] drop-shadow-[0_0_30px_rgba(245,158,11,0.15)]">
                                Developer
                            </span>
                        </h1>
                    </div>

                    <div
                        className="animate-fade-in-up"
                        style={{ animationDelay: "0.8s", animationFillMode: "both" }}
                    >
                        <p className="text-base md:text-lg text-[var(--text-secondary)] max-w-xl mb-10 leading-relaxed">
                            Mengubah ide menjadi pengalaman digital yang memukau.
                            <br className="hidden md:block" />
                            Scroll untuk menjelajahi perjalanan saya.
                        </p>
                    </div>

                    <div
                        className="animate-fade-in-up flex flex-col sm:flex-row gap-4"
                        style={{ animationDelay: "1.1s", animationFillMode: "both" }}
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

                    {/* Scroll indicator */}
                    <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
                        <span className="text-[10px] text-[var(--text-secondary)] tracking-[0.3em] uppercase">
                            Scroll
                        </span>
                        <div className="w-5 h-9 rounded-full border border-[var(--text-secondary)] flex justify-center pt-2 opacity-50">
                            <div className="w-1 h-1 rounded-full bg-[var(--accent-orange)] animate-bounce" />
                        </div>
                    </div>
                </div>

                {/* ===== ABOUT CONTENT ===== */}
                <div
                    id="about"
                    className="absolute inset-0 z-10 flex items-center px-6"
                    style={{
                        opacity: aboutOpacity,
                        transform: `translateY(${Math.max(0, aboutTranslateY)}px)`,
                        transition: "opacity 0.1s, transform 0.1s",
                        pointerEvents: aboutOpacity < 0.3 ? "none" : "auto",
                    }}
                >
                    <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        {/* Left: Text */}
                        <div>
                            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass mb-6 border border-[rgba(168,85,247,0.2)]">
                                <span className="text-xs font-medium tracking-[0.2em] uppercase text-[var(--accent-purple)]">
                                    About Me
                                </span>
                            </div>
                            <h2 className="text-4xl md:text-6xl font-black leading-[1.05] mb-8 tracking-tight">
                                <span className="gradient-text">Who</span>{" "}
                                <span className="text-[var(--text-primary)]">Am I?</span>
                            </h2>
                            <div className="space-y-4 text-[var(--text-secondary)] text-sm md:text-base leading-relaxed">
                                <p>
                                    Saya adalah seorang developer yang passionate dalam membangun
                                    aplikasi web dan mobile yang modern, fungsional, dan memiliki
                                    desain yang memukau.
                                </p>
                                <p>
                                    Dengan pengalaman di berbagai teknologi dan framework, saya
                                    selalu berusaha memberikan solusi terbaik dalam setiap project.
                                </p>
                                <p>
                                    Saya percaya bahwa teknologi dapat mengubah dunia, dan saya
                                    ingin menjadi bagian dari perubahan tersebut.
                                </p>
                            </div>

                            {/* Stats */}
                            <div className="grid grid-cols-3 gap-4 mt-10">
                                {[
                                    { value: "3+", label: "Tahun", sub: "Pengalaman" },
                                    { value: "20+", label: "Project", sub: "Selesai" },
                                    { value: "10+", label: "Tech", sub: "Stack" },
                                ].map((stat, i) => (
                                    <div
                                        key={i}
                                        className="glass rounded-2xl p-4 text-center transition-all duration-500 hover:scale-105 hover:border-[rgba(245,158,11,0.2)] group"
                                    >
                                        <div className="text-2xl md:text-3xl font-black gradient-text">
                                            {stat.value}
                                        </div>
                                        <div className="text-xs text-[var(--text-secondary)] mt-1 font-medium">
                                            {stat.label}
                                        </div>
                                        <div className="text-[10px] text-[var(--text-secondary)] opacity-60">
                                            {stat.sub}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Right: Decorative circle with frame */}
                        <div className="hidden lg:flex justify-center">
                            <div className="relative w-[340px] h-[340px]">
                                {/* Glow rings */}
                                <div className="absolute -inset-4 rounded-full border border-[rgba(245,158,11,0.1)] animate-pulse" />
                                <div className="absolute -inset-8 rounded-full border border-[rgba(168,85,247,0.05)]" />
                                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-[var(--accent-orange)] via-[var(--accent-pink)] to-[var(--accent-purple)] opacity-20 blur-3xl animate-pulse" />
                                <div className="absolute inset-3 rounded-full glass border border-[var(--glass-border)] overflow-hidden shadow-[0_0_60px_rgba(245,158,11,0.1)]">
                                    <Image
                                        src="/frame/00104.png"
                                        alt="Profile"
                                        fill
                                        className="object-cover scale-[1.6] object-[center_30%]"
                                        sizes="340px"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-[rgba(15,10,26,0.4)] to-transparent" />
                                </div>
                                {/* Floating badge */}
                                <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 px-5 py-2 rounded-full glass-strong border border-[rgba(245,158,11,0.2)] animate-float">
                                    <span className="text-xs font-semibold gradient-text">Full Stack Developer</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom gradient fade to next section */}
                <div
                    className="absolute bottom-0 left-0 right-0 h-32 z-20 pointer-events-none"
                    style={{
                        opacity: scrollProgress > 0.85 ? (scrollProgress - 0.85) / 0.15 : 0,
                        background: "linear-gradient(to bottom, transparent, var(--bg-primary))",
                    }}
                />
            </div>
        </section>
    );
}
