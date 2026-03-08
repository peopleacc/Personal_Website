"use client";

import { useEffect, useRef, useState } from "react";

const EXPERIENCES = [
    {
        role: "Full Stack Developer",
        company: "PT KAYABA INDONESIA",
        period: "2026 - Present",
        description: "Mengembangkan aplikasi web skala besar menggunakan Laravel, React, dan Next.js. Mengelola deployment dan CI/CD pipeline.",
        tags: ["Laravel", "Tailwind CSS", "PHP"],
        color: "#f59e0b",
        accentGradient: "from-[#f59e0b] to-[#ec4899]",
        image: "/image/kyb.png", // ganti dengan path gambar
    },
    {
        role: "Full Stack Developer",
        company: "Dwitama Prima",
        period: "2025 - 2026",
        description: "Merancang dan membangun antarmuka pengguna yang responsif dan modern. Berkolaborasi dengan tim desain untuk UX terbaik.",
        tags: ["Laravel", "Tailwind CSS", "PHP"],
        color: "#6366f1",
        accentGradient: "from-[#6366f1] to-[#a855f7]",
        image: "/image/dwitama.png",
    },
    {
        role: "Himpunan Mahasiswa Sistem Informasi",
        company: "Politeknik STMI",
        period: "2024 - 2026",
        description: "Mahasiswa Politeknik STMI Jakarta.",
        tags: ["podcast","design"],
        color: "#22d3ee",
        accentGradient: "from-[#22d3ee] to-[#6366f1]",
        image: "/image/himasi.jfif",
    },
    {
        role: "Mahasiswa Politeknik STMI",
        company: "Politeknik STMI",
        period: "2023 - 2027",
        description: "Mahasiswa Politeknik STMI Jakarta.",
        tags: ["Node.js", "Next JS", "React JS", "PostgreSQL", "PHP", "Laravel"],
        color: "#22d3ee",
        accentGradient: "from-[#22d3ee] to-[#6366f1]",
        image: "/image/stmi.png",
    },
];

export default function ExperienceSection() {
    const sectionRef = useRef<HTMLDivElement>(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => { if (entry.isIntersecting) setIsVisible(true); },
            { threshold: 0.05 }
        );
        if (sectionRef.current) observer.observe(sectionRef.current);
        return () => observer.disconnect();
    }, []);

    return (
        <section id="experience" ref={sectionRef} className="relative py-32 overflow-hidden">
            {/* Background */}
            <div className="absolute inset-0 bg-[var(--bg-secondary)]" />
            <div className="mesh-gradient w-[500px] h-[500px] bg-[var(--accent-blue)] top-20 -right-40" />
            <div className="mesh-gradient w-[400px] h-[400px] bg-[var(--accent-pink)] bottom-40 -left-40" />
            <div className="absolute top-0 left-0 right-0 h-40 bg-gradient-to-b from-[var(--bg-primary)] to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-[var(--bg-primary)] to-transparent" />
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[var(--accent-purple)] to-transparent opacity-20" />

            <div className="relative z-10 max-w-5xl mx-auto px-6 lg:px-8">
                {/* Header */}
                <div className={`text-center mb-20 transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
                    <div className="section-label glass border-[rgba(168,85,247,0.15)] text-[var(--accent-purple)]">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                            <path d="M2 3h6a4 4 0 014 4v14a3 3 0 00-3-3H2z" />
                            <path d="M22 3h-6a4 4 0 00-4 4v14a3 3 0 013-3h7z" />
                        </svg>
                        Experience
                    </div>
                    <h2 className="section-title mb-4">
                        <span className="gradient-text">Work Journey</span>
                    </h2>
                    <p className="text-[var(--text-secondary)] max-w-lg mx-auto text-sm leading-relaxed">
                        Perjalanan karir saya di berbagai perusahaan dan project
                    </p>
                </div>

                {/* Timeline */}
                <div className="relative">
                    <div className="absolute left-6 md:left-1/2 md:-translate-x-px top-0 bottom-0 w-0.5 bg-gradient-to-b from-[var(--accent-orange)] via-[var(--accent-purple)] to-[var(--accent-cyan)] opacity-20" />

                    <div className="space-y-12">
                        {EXPERIENCES.map((exp, index) => {
                            const isLeft = index % 2 === 0;
                            return (
                                <div
                                    key={index}
                                    className={`relative flex items-start gap-8 transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"} ${isLeft ? "md:flex-row" : "md:flex-row-reverse"}`}
                                    style={{ transitionDelay: isVisible ? `${index * 150}ms` : "0ms" }}
                                >
                                    {/* Timeline dot */}
                                    <div className="absolute left-6 md:left-1/2 -translate-x-1/2 z-10 top-8">
                                        <div
                                            className="w-4 h-4 rounded-full border-2 border-[var(--bg-secondary)]"
                                            style={{
                                                background: `linear-gradient(135deg, ${exp.color}, ${exp.color}80)`,
                                                boxShadow: `0 0 20px ${exp.color}40`,
                                            }}
                                        />
                                    </div>

                                    {/* Card */}
                                    <div className={`flex-1 pl-16 md:pl-0 ${isLeft ? "md:pr-16" : "md:pl-16"}`}>
                                        <div
                                            className="group relative rounded-2xl overflow-hidden border border-[rgba(255,255,255,0.06)] hover:border-[rgba(255,255,255,0.12)] transition-all duration-500 card-shine"
                                            style={{
                                                background: "rgba(13,10,23,0.75)",
                                                backdropFilter: "blur(20px)",
                                                boxShadow: `0 0 0 0 ${exp.color}00`,
                                            }}
                                            onMouseEnter={e => (e.currentTarget.style.boxShadow = `0 8px 40px ${exp.color}15`)}
                                            onMouseLeave={e => (e.currentTarget.style.boxShadow = `0 0 0 0 ${exp.color}00`)}
                                        >
                                            {/* ── IMAGE BANNER (atas card) ── */}
                                            <div className="relative h-32 overflow-hidden">
                                                {/* Gambar perusahaan */}
                                                <img
                                                    src={exp.image}
                                                    alt={exp.company}
                                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                                    onError={e => {
                                                        // fallback jika gambar tidak ditemukan
                                                        (e.target as HTMLImageElement).style.display = "none";
                                                    }}
                                                />

                                                {/* Gradient overlay — bagian bawah fade ke card body */}
                                                <div
                                                    className="absolute inset-0"
                                                    style={{
                                                        background: `linear-gradient(
                                                            to bottom,
                                                            rgba(13,10,23,0.15) 0%,
                                                            rgba(13,10,23,0.5) 60%,
                                                            rgba(13,10,23,0.95) 100%
                                                        )`,
                                                    }}
                                                />

                                                {/* Color tint overlay sesuai aksen */}
                                                <div
                                                    className="absolute inset-0 opacity-20 group-hover:opacity-30 transition-opacity duration-500"
                                                    style={{
                                                        background: `linear-gradient(135deg, ${exp.color}40, transparent)`,
                                                    }}
                                                />

                                                {/* Period badge di atas gambar */}
                                                <div className="absolute top-3 right-3">
                                                    <div
                                                        className="flex items-center gap-1.5 px-3 py-1 rounded-full backdrop-blur-md"
                                                        style={{
                                                            background: "rgba(0,0,0,0.45)",
                                                            border: `1px solid ${exp.color}40`,
                                                        }}
                                                    >
                                                        <div className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: exp.color }} />
                                                        <span className="text-[10px] font-semibold" style={{ color: exp.color }}>
                                                            {exp.period}
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* ── CARD BODY ── */}
                                            <div className="px-7 pb-7 -mt-1">
                                                {/* Accent bar */}
                                                <div className={`h-0.5 bg-gradient-to-r ${exp.accentGradient} rounded-full mb-5 w-12 transition-all duration-500 group-hover:w-full`} />

                                                <h3 className="text-xl font-bold text-[var(--text-primary)] mb-1 group-hover:text-white transition-colors">
                                                    {exp.role}
                                                </h3>
                                                <p className="text-xs font-semibold tracking-wide mb-4" style={{ color: `${exp.color}cc` }}>
                                                    {exp.company}
                                                </p>
                                                <p className="text-xs text-[var(--text-secondary)] leading-relaxed mb-6">
                                                    {exp.description}
                                                </p>

                                                <div className="flex flex-wrap gap-1.5">
                                                    {exp.tags.map((tag) => (
                                                        <span
                                                            key={tag}
                                                            className="px-3 py-1 rounded-full bg-[rgba(255,255,255,0.04)] text-[10px] font-semibold text-[var(--text-secondary)] border border-[rgba(255,255,255,0.06)] group-hover:border-[rgba(255,255,255,0.1)] transition-colors"
                                                        >
                                                            {tag}
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Spacer */}
                                    <div className="hidden md:block flex-1" />
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </section>
    );
}