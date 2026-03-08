"use client";

import { useEffect, useRef, useState } from "react";

const PROJECTS = [
    {
        title: "Digitizing Visitor",
        description: "Platform e-commerce full-stack dengan fitur keranjang belanja, payment gateway, dan dashboard admin.",
        tags: ["PHP", "Laravel", "Javascript", "Mysql"],
        link: "https://yourproject1.com",
        gradient: "from-[#f59e0b] to-[#ec4899]",
        color: "#f59e0b",
        image: "/image/project1.png",
        featured: true,
    },
    {
        title: "Marketing Tracking System",
        description: "Aplikasi manajemen tugas dengan fitur drag-and-drop, real-time collaboration, dan notifikasi.",
        tags: ["PHP", "Laravel", "JavaScript", "Mysql"],
        link: "https://yourproject2.com",
        gradient: "from-[#6366f1] to-[#a855f7]",
        color: "#6366f1",
        image: "/image/project2.png",
        featured: false,
    },
    {
        title: "Catalog & Booking Jok System",
        description: "Sistem CRM untuk mengelola customer, agenda, dan transaksi bisnis dengan reporting dashboard.",
        tags: ["Next.Js", "Kotlin", "PostgreSql"],
        link: "https://yourproject3.com",
        gradient: "from-[#ec4899] to-[#f43f5e]",
        color: "#ec4899",
        image: "/image/project3.png",
        featured: false,
    },
    {
        title: "Workshop Queue Booking System ",
        description: "Dashboard analitik media sosial dengan grafik interaktif dan auto-reporting.",
        tags: ["PHP", "Mysql"],
        link: "https://yourproject4.com",
        gradient: "from-[#10b981] to-[#22d3ee]",
        color: "#10b981",
        image: "/image/project4.png",
        featured: false,
    },
    {
        title: "Company Profile ",
        description: "Website portfolio personal dengan animasi frame, dark theme, dan desain premium.",
        tags: ["Next.js", "Tailwind CSS", "TypeScript"],
        link: "https://yourproject5.com",
        gradient: "from-[#f59e0b] to-[#6366f1]",
        color: "#f59e0b",
        image: "/image/project5.png",
        featured: false,
    },
    {
        title: "Company Profile ",
        description: "Website portfolio personal dengan animasi frame, dark theme, dan desain premium.",
        tags: ["Next.js", "Tailwind CSS", "TypeScript"],
        link: "https://yourproject5.com",
        gradient: "from-[#f59e0b] to-[#6366f1]",
        color: "#f59e0b",
        image: "/image/project5.png",
        featured: false,
    },

];

export default function ProjectsSection() {
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
        <section id="projects" ref={sectionRef} className="relative py-32 overflow-hidden">
            <div className="absolute inset-0 bg-[var(--bg-primary)]" />
            <div className="mesh-gradient w-[500px] h-[500px] bg-[var(--accent-orange)] -top-40 left-1/2" />
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[var(--accent-orange)] to-transparent opacity-15" />

            <div className="relative z-10 max-w-6xl mx-auto px-6 lg:px-8">
                {/* Header */}
                <div className={`text-center mb-20 transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
                    <div className="section-label glass border-[rgba(236,72,153,0.15)] text-[var(--accent-pink)]">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                            <path d="M22 19a2 2 0 01-2 2H4a2 2 0 01-2-2V5a2 2 0 012-2h5l2 3h9a2 2 0 012 2z" />
                        </svg>
                        Portfolio
                    </div>
                    <h2 className="section-title mb-4">
                        <span className="gradient-text">My Projects</span>
                    </h2>
                    <p className="text-[var(--text-secondary)] max-w-lg mx-auto text-sm leading-relaxed">
                        Beberapa project terbaik yang pernah saya kerjakan
                    </p>
                </div>

                {/* Grid 3 kolom */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {PROJECTS.map((project, index) => (
                        <div
                            key={index}
                            className={`group relative rounded-3xl overflow-hidden transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}`}
                            style={{ transitionDelay: isVisible ? `${index * 100}ms` : "0ms" }}
                        >
                            {/* Outer glow */}
                            <div
                                className="absolute -inset-0.5 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 blur-sm -z-10"
                                style={{ background: `linear-gradient(135deg, ${project.color}40, transparent, ${project.color}20)` }}
                            />

                            <div className="relative h-full bg-[rgba(13,10,23,0.85)] backdrop-blur-xl border border-[rgba(255,255,255,0.06)] group-hover:border-[rgba(255,255,255,0.12)] rounded-3xl overflow-hidden transition-all duration-500 card-shine flex flex-col">

                                {/* ── IMAGE AREA ── */}
                                <div className="relative h-44 overflow-hidden flex-shrink-0">
                                    <img
                                        src={project.image}
                                        alt={project.title}
                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                        onError={e => {
                                            // Fallback: tampilkan gradient placeholder
                                            const target = e.currentTarget as HTMLImageElement;
                                            target.style.display = "none";
                                        }}
                                    />

                                    {/* Gradient fade bawah */}
                                    <div
                                        className="absolute inset-0"
                                        style={{
                                            background: `linear-gradient(
                                                to bottom,
                                                rgba(13,10,23,0.1) 0%,
                                                rgba(13,10,23,0.4) 55%,
                                                rgba(13,10,23,0.97) 100%
                                            )`,
                                        }}
                                    />

                                    {/* Color tint */}
                                    <div
                                        className="absolute inset-0 opacity-15 group-hover:opacity-25 transition-opacity duration-500"
                                        style={{ background: `linear-gradient(135deg, ${project.color}60, transparent 60%)` }}
                                    />

                                    {/* Top gradient bar */}
                                    <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${project.gradient} transition-all duration-500 group-hover:h-1.5`} />

                                    {/* Featured badge */}
                                    {project.featured && (
                                        <div className="absolute top-3 left-3">
                                            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full backdrop-blur-md border border-[rgba(245,158,11,0.3)]"
                                                style={{ background: "rgba(0,0,0,0.5)" }}>
                                                <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent-orange)] animate-pulse" />
                                                <span className="text-[9px] font-bold tracking-wider uppercase text-[var(--accent-orange)]">Featured</span>
                                            </div>
                                        </div>
                                    )}

                                    {/* External link icon */}
                                    <a
                                        href={project.link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center backdrop-blur-md opacity-0 group-hover:opacity-100 transition-all duration-300 hover:scale-110"
                                        style={{
                                            background: "rgba(0,0,0,0.55)",
                                            border: `1px solid ${project.color}50`,
                                        }}
                                        onClick={e => e.stopPropagation()}
                                    >
                                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5">
                                            <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6" />
                                            <path d="M15 3h6v6M10 14L21 3" />
                                        </svg>
                                    </a>
                                </div>

                                {/* ── CARD BODY ── */}
                                <div className="flex flex-col flex-1 p-6">
                                    <h3 className="text-base font-bold text-[var(--text-primary)] mb-2 group-hover:text-white transition-colors duration-300">
                                        {project.title}
                                    </h3>
                                    <p className="text-xs text-[var(--text-secondary)] leading-relaxed mb-4 flex-1">
                                        {project.description}
                                    </p>

                                    {/* Tags */}
                                    <div className="flex flex-wrap gap-1.5 mb-5">
                                        {project.tags.map((tag) => (
                                            <span
                                                key={tag}
                                                className="px-2.5 py-0.5 rounded-full bg-[rgba(255,255,255,0.03)] text-[10px] font-semibold text-[var(--text-secondary)] border border-[rgba(255,255,255,0.06)] group-hover:border-[rgba(255,255,255,0.1)] transition-colors"
                                            >
                                                {tag}
                                            </span>
                                        ))}
                                    </div>

                                    {/* CTA */}
                                    <a
                                        href={project.link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-2 text-xs font-semibold transition-all group/link"
                                        style={{ color: project.color }}
                                    >
                                        View Project
                                        <svg
                                            width="13" height="13" viewBox="0 0 24 24" fill="none"
                                            stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
                                            className="transition-transform group-hover/link:translate-x-1"
                                        >
                                            <path d="M5 12h14M12 5l7 7-7 7" />
                                        </svg>
                                    </a>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
