"use client";

import { useEffect, useRef, useState } from "react";

const EXPERIENCES = [
    {
        role: "Full Stack Developer",
        company: "Tech Company A",
        period: "2024 - Present",
        description: "Mengembangkan aplikasi web skala besar menggunakan Laravel, React, dan Next.js. Mengelola deployment dan CI/CD pipeline.",
        tags: ["Laravel", "React", "Next.js", "Docker"],
        color: "#f59e0b",
        accentGradient: "from-[#f59e0b] to-[#ec4899]",
    },
    {
        role: "Frontend Developer",
        company: "Startup B",
        period: "2023 - 2024",
        description: "Merancang dan membangun antarmuka pengguna yang responsif dan modern. Berkolaborasi dengan tim desain untuk UX terbaik.",
        tags: ["React", "Tailwind CSS", "TypeScript"],
        color: "#6366f1",
        accentGradient: "from-[#6366f1] to-[#a855f7]",
    },
    {
        role: "Backend Developer",
        company: "Agency C",
        period: "2022 - 2023",
        description: "Membangun API RESTful dan microservices. Mengelola database dan optimasi performa server.",
        tags: ["Node.js", "Express", "PostgreSQL"],
        color: "#22d3ee",
        accentGradient: "from-[#22d3ee] to-[#6366f1]",
    },
    {
        role: "Junior Developer",
        company: "Company D",
        period: "2021 - 2022",
        description: "Memulai karir sebagai developer. Mempelajari dasar-dasar pengembangan web dan berkontribusi pada project tim.",
        tags: ["PHP", "MySQL", "JavaScript"],
        color: "#ec4899",
        accentGradient: "from-[#ec4899] to-[#f43f5e]",
    },
    {
        role: "Freelancer",
        company: "Self-Employed",
        period: "2020 - 2021",
        description: "Mengerjakan berbagai project freelance untuk klien lokal dan internasional. Website dan aplikasi custom.",
        tags: ["WordPress", "PHP", "CSS"],
        color: "#10b981",
        accentGradient: "from-[#10b981] to-[#22d3ee]",
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
        <section
            id="experience"
            ref={sectionRef}
            className="relative py-32 overflow-hidden"
        >
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
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M2 3h6a4 4 0 014 4v14a3 3 0 00-3-3H2z" /><path d="M22 3h-6a4 4 0 00-4 4v14a3 3 0 013-3h7z" /></svg>
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
                    {/* Timeline center line */}
                    <div className="absolute left-6 md:left-1/2 md:-translate-x-px top-0 bottom-0 w-0.5 bg-gradient-to-b from-[var(--accent-orange)] via-[var(--accent-purple)] to-[var(--accent-cyan)] opacity-20" />

                    <div className="space-y-12">
                        {EXPERIENCES.map((exp, index) => {
                            const isLeft = index % 2 === 0;
                            return (
                                <div
                                    key={index}
                                    className={`relative flex items-start gap-8 transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
                                        } ${isLeft ? "md:flex-row" : "md:flex-row-reverse"}`}
                                    style={{ transitionDelay: isVisible ? `${index * 150}ms` : "0ms" }}
                                >
                                    {/* Timeline dot */}
                                    <div className="absolute left-6 md:left-1/2 -translate-x-1/2 z-10">
                                        <div
                                            className="w-4 h-4 rounded-full border-2 border-[var(--bg-secondary)] transition-all duration-500"
                                            style={{
                                                background: `linear-gradient(135deg, ${exp.color}, ${exp.color}80)`,
                                                boxShadow: `0 0 20px ${exp.color}40`,
                                            }}
                                        />
                                    </div>

                                    {/* Content */}
                                    <div className={`flex-1 pl-16 md:pl-0 ${isLeft ? "md:pr-16 md:text-right" : "md:pl-16 md:text-left"}`}>
                                        <div className="group glass-card card-shine rounded-2xl p-7 hover:border-[rgba(255,255,255,0.1)] transition-all duration-500">
                                            {/* Top accent bar */}
                                            <div className={`h-0.5 bg-gradient-to-r ${exp.accentGradient} rounded-full mb-5 w-12 transition-all duration-500 group-hover:w-full ${isLeft ? "md:ml-auto" : ""}`} />

                                            {/* Period badge */}
                                            <div className={`inline-flex items-center gap-2 mb-3 ${isLeft ? "md:flex-row-reverse" : ""}`}>
                                                <div
                                                    className="w-2 h-2 rounded-full transition-transform duration-500 group-hover:scale-150"
                                                    style={{ background: exp.color }}
                                                />
                                                <span className="text-[11px] font-semibold" style={{ color: exp.color }}>
                                                    {exp.period}
                                                </span>
                                            </div>

                                            <h3 className="text-xl font-bold text-[var(--text-primary)] mb-1 group-hover:text-white transition-colors">
                                                {exp.role}
                                            </h3>
                                            <p className="text-xs font-semibold tracking-wide mb-4" style={{ color: `${exp.color}cc` }}>
                                                {exp.company}
                                            </p>
                                            <p className="text-xs text-[var(--text-secondary)] leading-relaxed mb-6">
                                                {exp.description}
                                            </p>

                                            <div className={`flex flex-wrap gap-1.5 ${isLeft ? "md:justify-end" : ""}`}>
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

                                    {/* Spacer for the other side */}
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
