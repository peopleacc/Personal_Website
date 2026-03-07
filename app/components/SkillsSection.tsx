"use client";

import { useEffect, useRef, useState } from "react";

const SKILLS = [
    { name: "JavaScript", level: 90, color: "#f7df1e", icon: "JS", category: "Language" },
    { name: "TypeScript", level: 85, color: "#3178c6", icon: "TS", category: "Language" },
    { name: "React / Next.js", level: 88, color: "#61dafb", icon: "⚛", category: "Frontend" },
    { name: "PHP / Laravel", level: 82, color: "#ff2d20", icon: "🐘", category: "Backend" },
    { name: "Python", level: 75, color: "#3776ab", icon: "🐍", category: "Language" },
    { name: "Node.js", level: 80, color: "#68a063", icon: "⬢", category: "Backend" },
    { name: "Go", level: 60, color: "#00add8", icon: "Go", category: "Language" },
    { name: "Database", level: 78, color: "#4169e1", icon: "🗄", category: "Infrastructure" },
];

export default function SkillsSection() {
    const sectionRef = useRef<HTMLDivElement>(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => { if (entry.isIntersecting) setIsVisible(true); },
            { threshold: 0.1 }
        );
        if (sectionRef.current) observer.observe(sectionRef.current);
        return () => observer.disconnect();
    }, []);

    return (
        <section
            id="skills"
            ref={sectionRef}
            className="relative min-h-screen py-32 overflow-hidden"
        >
            {/* Background effects */}
            <div className="absolute inset-0 bg-[var(--bg-primary)]" />
            <div className="mesh-gradient w-[600px] h-[600px] bg-[var(--accent-purple)] -top-40 -right-40" />
            <div className="mesh-gradient w-[400px] h-[400px] bg-[var(--accent-orange)] bottom-20 -left-20" />
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[var(--accent-orange)] to-transparent opacity-20" />

            <div className="relative z-10 max-w-5xl mx-auto px-8 lg:px-12">
                {/* Header */}
                <div className={`text-center mb-20 transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
                    <div className="section-label glass border-[rgba(245,158,11,0.15)] text-[var(--accent-orange)]">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M16 18l6-6-6-6M8 6l-6 6 6 6" /></svg>
                        My Skills
                    </div>
                    <h2 className="section-title mb-4">
                        <span className="gradient-text">Tech Stack</span>
                    </h2>
                    <p className="text-[var(--text-secondary)] max-w-lg mx-auto text-sm leading-relaxed">
                        Teknologi dan bahasa pemrograman yang saya kuasai untuk membangun solusi digital berkualitas tinggi
                    </p>
                </div>

                {/* Bento Grid Skills */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-5xl mx-auto">
                    {SKILLS.map((skill, index) => (
                        <div
                            key={skill.name}
                            className={`group relative rounded-2xl overflow-hidden transition-all duration-700 card-shine ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                                } ${index === 0 || index === 2 ? "md:col-span-1 md:row-span-1" : ""}`}
                            style={{ transitionDelay: isVisible ? `${index * 80}ms` : "0ms" }}
                        >
                            {/* Animated gradient border on hover */}
                            <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-transparent via-transparent to-transparent group-hover:from-[rgba(245,158,11,0.2)] group-hover:via-transparent group-hover:to-[rgba(168,85,247,0.2)] transition-all duration-700 -z-10 blur-[1px] scale-[1.02]" />

                            <div className="relative h-full bg-[rgba(13,10,23,0.8)] backdrop-blur-xl border border-[rgba(255,255,255,0.06)] group-hover:border-[rgba(245,158,11,0.15)] rounded-2xl p-6 transition-all duration-500 group-hover:bg-[rgba(13,10,23,0.9)]">
                                {/* Icon */}
                                <div
                                    className="w-14 h-14 rounded-2xl flex items-center justify-center text-lg font-black mb-5 transition-all duration-500 group-hover:scale-110 group-hover:shadow-lg"
                                    style={{
                                        background: `linear-gradient(135deg, ${skill.color}20, ${skill.color}08)`,
                                        border: `1px solid ${skill.color}30`,
                                        color: skill.color,
                                    }}
                                >
                                    {skill.icon}
                                </div>

                                {/* Info */}
                                <h3 className="font-bold text-sm text-[var(--text-primary)] mb-1 group-hover:text-white transition-colors">
                                    {skill.name}
                                </h3>
                                <p className="text-[10px] text-[var(--text-secondary)] mb-4 uppercase tracking-wider font-medium">
                                    {skill.category}
                                </p>

                                {/* Circular progress indicator */}
                                <div className="flex items-center gap-3">
                                    <div className="relative w-10 h-10 flex-shrink-0">
                                        <svg className="w-10 h-10 -rotate-90" viewBox="0 0 36 36">
                                            <circle
                                                cx="18" cy="18" r="14"
                                                fill="none"
                                                stroke="rgba(255,255,255,0.06)"
                                                strokeWidth="3"
                                            />
                                            <circle
                                                cx="18" cy="18" r="14"
                                                fill="none"
                                                stroke={skill.color}
                                                strokeWidth="3"
                                                strokeLinecap="round"
                                                strokeDasharray={`${isVisible ? skill.level * 0.88 : 0} 88`}
                                                className="transition-all duration-[1.5s] ease-[cubic-bezier(0.16,1,0.3,1)]"
                                                style={{ transitionDelay: `${index * 80 + 300}ms`, filter: `drop-shadow(0 0 4px ${skill.color}60)` }}
                                            />
                                        </svg>
                                        <span
                                            className="absolute inset-0 flex items-center justify-center text-[9px] font-black"
                                            style={{ color: skill.color }}
                                        >{skill.level}%</span>
                                    </div>
                                    {/* Mini bar */}
                                    <div className="flex-1 h-1 rounded-full bg-[rgba(255,255,255,0.04)] overflow-hidden">
                                        <div
                                            className="h-full rounded-full transition-all duration-[1.5s] ease-[cubic-bezier(0.16,1,0.3,1)]"
                                            style={{
                                                width: isVisible ? `${skill.level}%` : "0%",
                                                background: `linear-gradient(90deg, ${skill.color}, ${skill.color}50)`,
                                                transitionDelay: `${index * 80 + 300}ms`,
                                            }}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
