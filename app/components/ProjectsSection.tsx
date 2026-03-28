"use client";

import { useEffect, useRef, useState } from "react";

const PROJECTS = [
    {
        title: "Digitizing Visitor",
        description: "Aplikasi Digitizing Visitor adalah sistem digital yang digunakan untuk mengelola proses kunjungan tamu ke perusahaan secara online dan terstruktur.",
        tags: ["PHP", "Laravel", "Javascript", "Mysql", "Tailwind CSS"],
        link: "https://yourproject1.com",
        color: "#f59e0b",
        image: "/project/visitor.jpeg",
    },
    {
        title: "Marketing Tracking System",
        description: "Marketing Tracking System (MTS) adalah aplikasi untuk memantau dan mencatat aktivitas tim sales atau marketing dalam menjalankan proyek.",
        tags: ["PHP", "Laravel", "JavaScript", "Mysql", "Tailwind CSS"],
        link: "https://yourproject2.com",
        color: "#6366f1",
        image: "/project/mts.jpeg",
    },
    {
        title: "Catalog & Booking Tracking Jok",
        description: "Sistem untuk menampilkan katalog produk jok kendaraan sekaligus mengelola proses pemesanan dan penjadwalan pemasangan.",
        tags: ["Next.Js", "Kotlin", "PostgreSql", "Tailwind CSS"],
        link: "https://yourproject3.com",
        color: "#ec4899",
        image: "/project/mobile.jpeg",
    },
    {
        title: "Workshop Queue Booking",
        description: "Sistem untuk mengelola pemesanan antrian servis kendaraan di bengkel secara online. Customer dapat booking jadwal servis.",
        tags: ["PHP", "Mysql", "Tailwind CSS"],
        link: "https://yourproject4.com",
        color: "#10b981",
        image: "/project/bokser.jpeg",
    },
    {
        title: "Company Profile",
        description: "Website Company Profile dengan animasi frame, dark theme, dan desain premium.",
        tags: ["Next.js", "Tailwind CSS", "JavaScript"],
        link: "https://yourproject5.com",
        color: "#f59e0b",
        image: "/project/net.png",
    },
    {
        title: "Inventory Management System",
        description: "Sistem untuk mengelola dan mencatat data persediaan barang dalam perusahaan secara digital.",
        tags: ["PHP", "Tailwind CSS"],
        link: "https://yourproject5.com",
        color: "#6366f1",
        image: "/project/UD.png",
    },
    {
        title: "Learning Management System",
        description: "Sistem e-learning untuk mendukung proses pembelajaran secara digital. Mahasiswa dan dosen dapat belajar mengajar online.",
        tags: ["PHP", "Tailwind CSS", "Laravel"],
        link: "https://yourproject5.com",
        color: "#a855f7",
        image: "/project/image.png",
    },
];

// Bento grid layout pattern — matches the reference image
// Row 1: large (col-span-2, row-span-2) + 2 small stacked
// Row 2: 1 small + large (col-span-2, row-span-2)
// Row 3: remaining cards
const GRID_CLASSES = [
    "col-span-2 row-span-2",  // 0: big left
    "col-span-1 row-span-1",  // 1: small top-right
    "col-span-1 row-span-1",  // 2: small bottom-right
    "col-span-1 row-span-1",  // 3: small bottom-left
    "col-span-2 row-span-2",  // 4: big right
    "col-span-1 row-span-1",  // 5: small
    "col-span-2 row-span-1",  // 6: wide bottom
];

function ProjectCard({ project, gridClass, index, isVisible }: {
    project: typeof PROJECTS[0];
    gridClass: string;
    index: number;
    isVisible: boolean;
}) {
    const isBig = gridClass.includes("row-span-2");

    return (
        <div
            className={`group relative rounded-2xl overflow-hidden cursor-pointer transition-all duration-700 ${gridClass} ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}`}
            style={{ transitionDelay: isVisible ? `${index * 80}ms` : "0ms", minHeight: isBig ? "380px" : "180px" }}
        >
            {/* Image */}
            <img
                src={project.image}
                alt={project.title}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                onError={e => { (e.target as HTMLImageElement).style.display = "none"; }}
            />

            {/* Default overlay — always visible */}
            <div
                className="absolute inset-0 transition-opacity duration-500"
                style={{
                    background: "linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.2) 50%, rgba(0,0,0,0.05) 100%)",
                }}
            />

            {/* Hover overlay — darker, shows description */}
            <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{
                    background: "linear-gradient(to top, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0.7) 50%, rgba(0,0,0,0.5) 100%)",
                }}
            />

            {/* Color accent line at top */}
            <div
                className="absolute top-0 left-0 right-0 h-[3px] opacity-0 group-hover:opacity-100 transition-all duration-500"
                style={{ background: `linear-gradient(90deg, ${project.color}, transparent)` }}
            />

            {/* Content — bottom aligned */}
            <div className="absolute inset-x-0 bottom-0 p-5 flex flex-col justify-end">
                {/* Tags */}
                <div className="flex flex-wrap gap-1.5 mb-3 opacity-0 group-hover:opacity-100 -translate-y-2 group-hover:translate-y-0 transition-all duration-500 delay-75">
                    {project.tags.slice(0, 3).map(tag => (
                        <span
                            key={tag}
                            className="px-2 py-0.5 rounded-full text-[9px] font-semibold text-white/80 border border-white/10"
                            style={{ background: "rgba(255,255,255,0.08)" }}
                        >
                            {tag}
                        </span>
                    ))}
                    {project.tags.length > 3 && (
                        <span className="px-2 py-0.5 rounded-full text-[9px] font-semibold text-white/50 border border-white/10" style={{ background: "rgba(255,255,255,0.05)" }}>
                            +{project.tags.length - 3}
                        </span>
                    )}
                </div>

                {/* Title — always visible */}
                <h3 className={`font-bold text-white mb-1 transition-all duration-300 ${isBig ? "text-xl md:text-2xl" : "text-sm md:text-base"}`}>
                    {project.title}
                </h3>

                {/* Description — only on hover */}
                <p className={`text-white/60 leading-relaxed max-h-0 group-hover:max-h-32 overflow-hidden transition-all duration-500 ease-out ${isBig ? "text-sm" : "text-xs"}`}>
                    {project.description}
                </p>

                {/* View link — only on hover */}
                <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 mt-3 text-xs font-semibold opacity-0 group-hover:opacity-100 -translate-y-2 group-hover:translate-y-0 transition-all duration-500 delay-150"
                    style={{ color: project.color }}
                    onClick={e => e.stopPropagation()}
                >
                    View Project
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                </a>
            </div>

            {/* External link icon — top right on hover */}
            <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center backdrop-blur-md opacity-0 group-hover:opacity-100 transition-all duration-300 hover:scale-110"
                style={{
                    background: "rgba(0,0,0,0.5)",
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
    );
}

export default function ProjectsSection() {
    const sectionRef = useRef<HTMLDivElement>(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => setIsVisible(entry.isIntersecting),
            { threshold: 0.05 }
        );
        if (sectionRef.current) observer.observe(sectionRef.current);
        return () => observer.disconnect();
    }, []);

    return (
        <section id="projects" ref={sectionRef} className="relative py-32 overflow-hidden">
            {/* Deep purple gradient background */}
            <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, var(--section-bg) 0%, var(--section-bg-mid) 50%, var(--section-bg-alt) 100%)" }} />
            {/* Ambient glow orbs */}
            <div className="absolute top-1/4 -left-40 w-[500px] h-[500px] rounded-full pointer-events-none" style={{ background: "radial-gradient(circle, rgba(245,158,11,0.05) 0%, transparent 70%)", filter: "blur(60px)" }} />
            <div className="absolute bottom-1/4 -right-40 w-[500px] h-[500px] rounded-full pointer-events-none" style={{ background: "radial-gradient(circle, rgba(236,72,153,0.05) 0%, transparent 70%)", filter: "blur(60px)" }} />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full pointer-events-none" style={{ background: "radial-gradient(circle, rgba(168,85,247,0.04) 0%, transparent 70%)", filter: "blur(80px)" }} />
            {/* Warm section divider */}
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[rgba(236,72,153,0.2)] to-transparent" />

            <div className={`relative z-10 max-w-6xl mx-auto px-6 lg:px-8 transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
                {/* Header */}
                <div className={`text-center mb-20 transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
                    <div className="section-label glass border-[rgba(236,72,153,0.15)] text-[var(--accent-pink)]">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                            <path d="M22 19a2 2 0 01-2 2H4a2 2 0 01-2-2V5a2 2 0 012-2h5l2 3h9a2 2 0 012 2z" />
                        </svg>
                        Portfolio
                    </div>
                    <h2 className="section-title mb-4">
                        <span className="text-white">My Projects</span>
                    </h2>
                    <p className="text-[rgba(255,255,255,0.6)] max-w-lg mx-auto text-sm leading-relaxed">
                        Beberapa project terbaik yang pernah saya kerjakan
                    </p>
                </div>

                {/* Bento Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 auto-rows-[180px]">
                    {PROJECTS.map((project, index) => (
                        <ProjectCard
                            key={index}
                            project={project}
                            gridClass={GRID_CLASSES[index] || "col-span-1 row-span-1"}
                            index={index}
                            isVisible={isVisible}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}
