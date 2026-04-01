"use client";

import { useEffect, useRef, useState, useCallback } from "react";

const EXPERIENCES = [
    {
        role: "Full Stack Developer",
        company: "PT KAYABA INDONESIA",
        period: "2026 - Present",
        description:
            "Mengembangkan aplikasi web skala besar menggunakan Laravel, React, dan Next.js. Mengelola deployment dan CI/CD pipeline.",
        tags: ["Laravel", "Tailwind CSS", "PHP"],
        color: "#f59e0b",
        accentGradient: "from-[#f59e0b] to-[#ec4899]",
        image: "/image/kyb.png",
    },
    {
        role: "Full Stack Developer",
        company: "Dwitama Prima",
        period: "2025 - 2026",
        description:
            "Merancang dan membangun antarmuka pengguna yang responsif dan modern. Berkolaborasi dengan tim desain untuk UX terbaik.",
        tags: ["Laravel", "Tailwind CSS", "PHP"],
        color: "#6366f1",
        accentGradient: "from-[#6366f1] to-[#a855f7]",
        image: "/image/dwitama.png",
    },
    {
        role: "Himpunan Mahasiswa Sistem Informasi",
        company: "Politeknik STMI",
        period: "2024 - 2026",
        description: "Mahasiswa aktif dan anggota Himpunan Mahasiswa Sistem Informasi Politeknik STMI Jakarta.",
        tags: ["podcast", "design"],
        color: "#22d3ee",
        accentGradient: "from-[#22d3ee] to-[#6366f1]",
        image: "/image/himasi.jfif",
    },
    {
        role: "Mahasiswa Politeknik STMI",
        company: "Politeknik STMI",
        period: "2023 - 2027",
        description: "Menempuh pendidikan D4 Sistem Informasi di Politeknik STMI Jakarta.",
        tags: ["Node.js", "Next JS", "React JS", "PostgreSQL", "PHP", "Laravel"],
        color: "#22d3ee",
        accentGradient: "from-[#22d3ee] to-[#6366f1]",
        image: "/image/stmi.png",
    },
];

type FadeState = "visible" | "fading-out" | "fading-in";

export default function ExperienceSection() {
    const sectionRef = useRef<HTMLDivElement>(null);
    const [activeIndex, setActiveIndex] = useState(0);
    const [displayIndex, setDisplayIndex] = useState(0);
    const [fadeState, setFadeState] = useState<FadeState>("visible");
    const [headerVisible, setHeaderVisible] = useState(false);
    const isAnimating = useRef(false);

    // Header visibility
    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => setHeaderVisible(entry.isIntersecting),
            { threshold: 0.15 }
        );
        if (sectionRef.current) observer.observe(sectionRef.current);
        return () => observer.disconnect();
    }, []);

    const goTo = useCallback((nextIndex: number) => {
        if (isAnimating.current || nextIndex === activeIndex) return;
        isAnimating.current = true;

        // 1. Fade out
        setFadeState("fading-out");

        setTimeout(() => {
            // 2. Swap card while invisible
            setDisplayIndex(nextIndex);
            setActiveIndex(nextIndex);
            setFadeState("fading-in");

            setTimeout(() => {
                // 3. Fade in complete
                setFadeState("visible");
                isAnimating.current = false;
            }, 400);
        }, 350);
    }, [activeIndex]);

    const goPrev = () => goTo((activeIndex - 1 + EXPERIENCES.length) % EXPERIENCES.length);
    const goNext = () => goTo((activeIndex + 1) % EXPERIENCES.length);

    const exp = EXPERIENCES[displayIndex];

    const cardOpacity =
        fadeState === "fading-out" ? 0
        : fadeState === "fading-in" ? 0
        : 1;

    const cardTranslateY =
        fadeState === "fading-out" ? "-12px"
        : fadeState === "fading-in" ? "12px"
        : "0px";

    return (
        <section
            id="experience"
            ref={sectionRef}
            className="relative"
            style={{ height: "200vh" }}
        >
            {/* ── STICKY VIEWPORT ── */}
            <div className="sticky top-0 w-full h-screen overflow-hidden">

                {/* Background: frame 488 (last frame of Skills→Experience transition) */}
                <img
                    src="/frame/00488.webp"
                    alt="Experience background"
                    className="absolute inset-0 w-full h-full object-cover"
                    style={{ objectPosition: "center" }}
                />
                <div
                    className="absolute inset-0"
                    style={{
                        background:
                            "linear-gradient(90deg, rgba(7,4,13,0.88) 0%, rgba(7,4,13,0.7) 45%, rgba(7,4,13,0.3) 70%, transparent 100%)",
                    }}
                />
                <div
                    className="absolute inset-0 pointer-events-none"
                    style={{
                        background:
                            "linear-gradient(180deg, rgba(7,4,13,0.6) 0%, transparent 20%, transparent 80%, rgba(7,4,13,0.8) 100%)",
                    }}
                />
                <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[rgba(168,85,247,0.2)] to-transparent z-20" />

                {/* ── CONTENT ── */}
                <div className={`relative z-10 h-full flex items-center transition-all duration-1000 ${headerVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
                    <div className="w-full max-w-7xl mx-auto px-6 lg:px-12 flex flex-col lg:flex-row items-center gap-8">

                        {/* LEFT: Header + Card + Controls */}
                        <div className="lg:w-1/2 flex flex-col">

                            {/* Header */}
                            <div
                                className={`mb-8 transition-all duration-1000 ${
                                    headerVisible
                                        ? "opacity-100 translate-y-0"
                                        : "opacity-0 translate-y-8"
                                }`}
                            >
                                <div className="section-label glass border-[rgba(168,85,247,0.15)] text-[var(--accent-purple)]">
                                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                                        <path d="M2 3h6a4 4 0 014 4v14a3 3 0 00-3-3H2z" />
                                        <path d="M22 3h-6a4 4 0 00-4 4v14a3 3 0 013-3h7z" />
                                    </svg>
                                    Experience
                                </div>
                                <h2 className="section-title mb-2">
                                    <span className="text-white">Work Journey</span>
                                </h2>
                                <p className="text-[rgba(255,255,255,0.5)] text-sm leading-relaxed max-w-md">
                                    Perjalanan karir saya di berbagai perusahaan dan project
                                </p>
                            </div>

                            {/* ── CARD with fade animation ── */}
                            <div
                                style={{
                                    opacity: cardOpacity,
                                    transform: `translateY(${cardTranslateY})`,
                                    transition: "opacity 350ms ease, transform 350ms ease",
                                    minHeight: "320px",
                                }}
                            >
                                <div
                                    className="group relative rounded-2xl overflow-hidden border border-[rgba(255,255,255,0.08)] hover:border-[rgba(255,255,255,0.15)] transition-colors duration-500 card-shine"
                                    style={{
                                        background: "rgba(7,4,13,0.8)",
                                        backdropFilter: "blur(24px)",
                                        boxShadow: `0 8px 60px ${exp.color}15, 0 0 0 1px rgba(255,255,255,0.04)`,
                                    }}
                                >
                                    {/* Image banner */}
                                    <div className="relative h-36 overflow-hidden">
                                        <img
                                            src={exp.image}
                                            alt={exp.company}
                                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                            onError={(e) => {
                                                (e.target as HTMLImageElement).style.display = "none";
                                            }}
                                        />
                                        <div
                                            className="absolute inset-0"
                                            style={{
                                                background: `linear-gradient(to bottom, rgba(7,4,13,0.1) 0%, rgba(7,4,13,0.5) 60%, rgba(7,4,13,0.95) 100%)`,
                                            }}
                                        />
                                        <div
                                            className="absolute inset-0 opacity-20 group-hover:opacity-30 transition-opacity duration-500"
                                            style={{
                                                background: `linear-gradient(135deg, ${exp.color}40, transparent)`,
                                            }}
                                        />
                                        {/* Period badge */}
                                        <div className="absolute top-3 right-3">
                                            <div
                                                className="flex items-center gap-1.5 px-3 py-1 rounded-full backdrop-blur-md"
                                                style={{
                                                    background: "rgba(0,0,0,0.5)",
                                                    border: `1px solid ${exp.color}40`,
                                                }}
                                            >
                                                <div
                                                    className="w-1.5 h-1.5 rounded-full animate-pulse"
                                                    style={{ background: exp.color }}
                                                />
                                                <span
                                                    className="text-[10px] font-semibold"
                                                    style={{ color: exp.color }}
                                                >
                                                    {exp.period}
                                                </span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Card body */}
                                    <div className="px-7 pb-7 -mt-1">
                                        <div
                                            className={`h-0.5 bg-gradient-to-r ${exp.accentGradient} rounded-full mb-5 w-12 transition-all duration-500 group-hover:w-full`}
                                        />
                                        <h3 className="text-xl font-bold text-white mb-1">{exp.role}</h3>
                                        <p
                                            className="text-xs font-semibold tracking-wide mb-4"
                                            style={{ color: `${exp.color}cc` }}
                                        >
                                            {exp.company}
                                        </p>
                                        <p className="text-xs text-[rgba(255,255,255,0.6)] leading-relaxed mb-6">
                                            {exp.description}
                                        </p>
                                        <div className="flex flex-wrap gap-1.5">
                                            {exp.tags.map((tag) => (
                                                <span
                                                    key={tag}
                                                    className="px-3 py-1 rounded-full bg-[rgba(255,255,255,0.06)] text-[10px] font-semibold text-[rgba(255,255,255,0.7)] border border-[rgba(255,255,255,0.08)] group-hover:border-[rgba(255,255,255,0.15)] transition-colors"
                                                >
                                                    {tag}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* ── CONTROLS: dots + prev/next ── */}
                            <div className="flex items-center gap-4 mt-6">
                                {/* Prev button */}
                                <button
                                    onClick={goPrev}
                                    disabled={isAnimating.current}
                                    className="flex items-center justify-center w-9 h-9 rounded-full border border-[rgba(255,255,255,0.12)] bg-[rgba(255,255,255,0.05)] hover:bg-[rgba(255,255,255,0.1)] hover:border-[rgba(255,255,255,0.25)] transition-all duration-200 disabled:opacity-40"
                                    aria-label="Previous"
                                >
                                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.7)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                        <polyline points="15 18 9 12 15 6" />
                                    </svg>
                                </button>

                                {/* Dots */}
                                <div className="flex gap-2 items-center">
                                    {EXPERIENCES.map((e, i) => (
                                        <button
                                            key={i}
                                            onClick={() => goTo(i)}
                                            className="rounded-full transition-all duration-500"
                                            style={{
                                                width: i === activeIndex ? "28px" : "8px",
                                                height: "8px",
                                                background:
                                                    i === activeIndex
                                                        ? exp.color
                                                        : "rgba(255,255,255,0.15)",
                                                boxShadow:
                                                    i === activeIndex
                                                        ? `0 0 12px ${exp.color}`
                                                        : "none",
                                                border: "none",
                                                padding: 0,
                                                cursor: "pointer",
                                            }}
                                            aria-label={`Go to ${e.company}`}
                                        />
                                    ))}
                                </div>

                                {/* Next button */}
                                <button
                                    onClick={goNext}
                                    disabled={isAnimating.current}
                                    className="flex items-center justify-center w-9 h-9 rounded-full border border-[rgba(255,255,255,0.12)] bg-[rgba(255,255,255,0.05)] hover:bg-[rgba(255,255,255,0.1)] hover:border-[rgba(255,255,255,0.25)] transition-all duration-200 disabled:opacity-40"
                                    aria-label="Next"
                                >
                                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.7)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                        <polyline points="9 18 15 12 9 6" />
                                    </svg>
                                </button>

                                {/* Counter */}
                                <span className="ml-1 text-[10px] text-[rgba(255,255,255,0.4)] tracking-widest uppercase">
                                    {activeIndex + 1} / {EXPERIENCES.length}
                                </span>
                            </div>
                        </div>

                        {/* RIGHT: empty, shows background */}
                        <div className="hidden lg:block lg:w-1/2" />
                    </div>
                </div>

                {/* Bottom gradient */}
                <div
                    className="absolute bottom-0 left-0 right-0 h-32 z-20 pointer-events-none"
                    style={{
                        background: "linear-gradient(to bottom, transparent, var(--section-bg))",
                    }}
                />
            </div>
        </section>
    );
}
