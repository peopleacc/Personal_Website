"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

const TOTAL_FRAMES = 104;

export default function HeroSection() {
    const [currentFrame, setCurrentFrame] = useState(1);
    const containerRef = useRef<HTMLDivElement>(null);

    // Animate frames on scroll
    useEffect(() => {
        const handleScroll = () => {
            if (!containerRef.current) return;
            const rect = containerRef.current.getBoundingClientRect();
            const scrollProgress = Math.max(
                0,
                Math.min(1, -rect.top / (rect.height - window.innerHeight))
            );
            const frame = Math.max(
                1,
                Math.min(TOTAL_FRAMES, Math.floor(scrollProgress * TOTAL_FRAMES) + 1)
            );
            setCurrentFrame(frame);
        };

        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const frameNumber = String(currentFrame).padStart(5, "0");

    return (
        <section
            id="home"
            ref={containerRef}
            className="relative w-full"
            style={{ height: "300vh" }}
        >
            {/* Sticky frame container */}
            <div className="sticky top-0 w-full h-screen overflow-hidden">
                {/* Frame Image */}
                <div className="absolute inset-0">
                    <Image
                        src={`/frame/${frameNumber}.png`}
                        alt="Anime cityscape"
                        fill
                        className="object-cover"
                        priority={currentFrame <= 3}
                        sizes="100vw"
                    />
                    {/* Dark gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-b from-[rgba(15,10,26,0.4)] via-transparent to-[var(--bg-primary)]" />
                    <div className="absolute inset-0 bg-gradient-to-r from-[rgba(15,10,26,0.5)] via-transparent to-[rgba(15,10,26,0.5)]" />
                </div>

                {/* Hero Content */}
                <div className="relative z-10 h-full flex flex-col items-center justify-center px-6 text-center">
                    <div className="animate-fade-in-up" style={{ animationDelay: "0.2s", animationFillMode: "both" }}>
                        <p className="text-sm md:text-base font-medium tracking-[0.3em] uppercase text-[var(--accent-orange)] mb-4">
                            Welcome to my world
                        </p>
                    </div>
                    <div className="animate-fade-in-up" style={{ animationDelay: "0.5s", animationFillMode: "both" }}>
                        <h1 className="text-5xl md:text-7xl lg:text-8xl font-extrabold leading-tight mb-6">
                            <span className="gradient-text">Creative</span>
                            <br />
                            <span className="text-[var(--text-primary)]">Developer</span>
                        </h1>
                    </div>
                    <div className="animate-fade-in-up" style={{ animationDelay: "0.8s", animationFillMode: "both" }}>
                        <p className="text-lg md:text-xl text-[var(--text-secondary)] max-w-xl mb-10">
                            Crafting digital experiences with passion and precision.
                            <br />
                            Scroll down to explore my journey.
                        </p>
                    </div>
                    <div className="animate-fade-in-up" style={{ animationDelay: "1.1s", animationFillMode: "both" }}>
                        <a
                            href="#about"
                            className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-gradient-to-r from-[var(--accent-orange)] to-[var(--accent-pink)] text-white font-semibold text-base transition-all duration-300 hover:scale-105 animate-pulse-glow"
                        >
                            Explore More
                            <svg
                                width="20"
                                height="20"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            >
                                <path d="M12 5v14M19 12l-7 7-7-7" />
                            </svg>
                        </a>
                    </div>

                    {/* Scroll indicator */}
                    <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-fade-in" style={{ animationDelay: "1.5s", animationFillMode: "both" }}>
                        <span className="text-xs text-[var(--text-secondary)] tracking-widest uppercase">
                            Scroll
                        </span>
                        <div className="w-6 h-10 rounded-full border-2 border-[var(--text-secondary)] flex justify-center pt-2">
                            <div className="w-1.5 h-1.5 rounded-full bg-[var(--accent-orange)] animate-bounce" />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
