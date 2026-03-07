"use client";

import { useEffect, useRef, useState } from "react";

const PROJECTS = [
    {
        title: "E-Commerce Platform",
        description: "Platform e-commerce full-stack dengan fitur keranjang belanja, payment gateway, dan dashboard admin.",
        tags: ["Next.js", "TypeScript", "PostgreSQL", "Stripe"],
        link: "#",
        gradient: "from-[#f59e0b] to-[#ec4899]",
        color: "#f59e0b",
        emoji: "🛒",
        featured: true,
    },
    {
        title: "Task Management App",
        description: "Aplikasi manajemen tugas dengan fitur drag-and-drop, real-time collaboration, dan notifikasi.",
        tags: ["React", "Node.js", "Socket.io", "MongoDB"],
        link: "#",
        gradient: "from-[#6366f1] to-[#a855f7]",
        color: "#6366f1",
        emoji: "📋",
        featured: false,
    },
    {
        title: "CRM System",
        description: "Sistem CRM untuk mengelola customer, agenda, dan transaksi bisnis dengan reporting dashboard.",
        tags: ["Laravel", "PHP", "MySQL", "Bootstrap"],
        link: "#",
        gradient: "from-[#ec4899] to-[#f43f5e]",
        color: "#ec4899",
        emoji: "📊",
        featured: false,
    },
    {
        title: "Social Media Dashboard",
        description: "Dashboard analitik media sosial dengan grafik interaktif dan auto-reporting.",
        tags: ["Python", "Django", "Chart.js", "Redis"],
        link: "#",
        gradient: "from-[#10b981] to-[#22d3ee]",
        color: "#10b981",
        emoji: "📱",
        featured: false,
    },
    {
        title: "Portfolio Website",
        description: "Website portfolio personal dengan animasi frame, dark theme, dan desain premium.",
        tags: ["Next.js", "Tailwind CSS", "TypeScript"],
        link: "#",
        gradient: "from-[#f59e0b] to-[#6366f1]",
        color: "#f59e0b",
        emoji: "🎨",
        featured: false,
    },
    {
        title: "Chat Application",
        description: "Aplikasi chat real-time dengan fitur grup, file sharing, dan end-to-end encryption.",
        tags: ["React Native", "Firebase", "WebSocket"],
        link: "#",
        gradient: "from-[#a855f7] to-[#ec4899]",
        color: "#a855f7",
        emoji: "💬",
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
        <section
            id="projects"
            ref={sectionRef}
            className="relative py-32 overflow-hidden"
        >
            <div className="absolute inset-0 bg-[var(--bg-primary)]" />
            <div className="mesh-gradient w-[500px] h-[500px] bg-[var(--accent-orange)] -top-40 left-1/2" />
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[var(--accent-orange)] to-transparent opacity-15" />

            <div className="relative z-10 max-w-6xl mx-auto px-6 lg:px-8">
                <div className={`text-center mb-20 transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
                    <div className="section-label glass border-[rgba(236,72,153,0.15)] text-[var(--accent-pink)]">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M22 19a2 2 0 01-2 2H4a2 2 0 01-2-2V5a2 2 0 012-2h5l2 3h9a2 2 0 012 2z" /></svg>
                        Portfolio
                    </div>
                    <h2 className="section-title mb-4">
                        <span className="gradient-text">My Projects</span>
                    </h2>
                    <p className="text-[var(--text-secondary)] max-w-lg mx-auto text-sm leading-relaxed">
                        Beberapa project terbaik yang pernah saya kerjakan
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                    {PROJECTS.map((project, index) => (
                        <div
                            key={index}
                            className={`group relative rounded-3xl overflow-hidden transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
                                } ${project.featured ? "md:col-span-2 lg:col-span-1" : ""}`}
                            style={{ transitionDelay: isVisible ? `${index * 100}ms` : "0ms" }}
                        >
                            {/* Outer glow on hover */}
                            <div
                                className="absolute -inset-0.5 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 blur-sm"
                                style={{ background: `linear-gradient(135deg, ${project.color}30, transparent, ${project.color}15)` }}
                            />

                            <div className="relative h-full bg-[rgba(13,10,23,0.85)] backdrop-blur-xl border border-[rgba(255,255,255,0.06)] group-hover:border-[rgba(255,255,255,0.12)] rounded-3xl overflow-hidden transition-all duration-500 card-shine">
                                {/* Gradient top bar */}
                                <div className={`h-1 bg-gradient-to-r ${project.gradient} transition-all duration-500 group-hover:h-1.5`} />

                                <div className="p-7">
                                    {/* Featured badge */}
                                    {project.featured && (
                                        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gradient-to-r from-[rgba(245,158,11,0.15)] to-[rgba(236,72,153,0.1)] border border-[rgba(245,158,11,0.2)] mb-5 animate-shimmer" style={{ backgroundSize: '200% auto' }}>
                                            <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent-orange)] animate-pulse" />
                                            <span className="text-[9px] font-bold tracking-wider uppercase text-[var(--accent-orange)]">Featured</span>
                                        </div>
                                    )}

                                    {/* Icon */}
                                    <div
                                        className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${project.gradient} flex items-center justify-center mb-6 text-xl opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all duration-500 group-hover:shadow-lg`}
                                        style={{ boxShadow: `0 0 0 rgba(0,0,0,0)` }}
                                    >
                                        {project.emoji}
                                    </div>

                                    <h3 className="text-lg font-bold text-[var(--text-primary)] mb-3 group-hover:text-white transition-colors duration-300">
                                        {project.title}
                                    </h3>
                                    <p className="text-xs text-[var(--text-secondary)] leading-relaxed mb-6">
                                        {project.description}
                                    </p>

                                    <div className="flex flex-wrap gap-1.5 mb-6">
                                        {project.tags.map((tag) => (
                                            <span
                                                key={tag}
                                                className="px-3 py-1 rounded-full bg-[rgba(255,255,255,0.03)] text-[10px] font-semibold text-[var(--text-secondary)] border border-[rgba(255,255,255,0.06)] group-hover:border-[rgba(255,255,255,0.1)] transition-colors"
                                            >
                                                {tag}
                                            </span>
                                        ))}
                                    </div>

                                    <a
                                        href={project.link}
                                        className="inline-flex items-center gap-2 text-xs font-semibold transition-all group/link animated-underline"
                                        style={{ color: project.color }}
                                    >
                                        View Project
                                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="transition-transform group-hover/link:translate-x-1">
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
