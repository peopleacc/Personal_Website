"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

export default function AboutSection() {
    const sectionRef = useRef<HTMLDivElement>(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) setIsVisible(true);
            },
            { threshold: 0.2 }
        );
        if (sectionRef.current) observer.observe(sectionRef.current);
        return () => observer.disconnect();
    }, []);

    return (
        <section
            id="about"
            ref={sectionRef}
            className="relative min-h-screen flex items-center py-24 overflow-hidden"
        >
            {/* Background: Frame 104 */}
            <div className="absolute inset-0">
                <Image
                    src="/frame/00104.png"
                    alt="Anime cityscape with figure"
                    fill
                    className="object-cover"
                    sizes="100vw"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-[var(--bg-primary)] via-[rgba(15,10,26,0.85)] to-[rgba(15,10,26,0.5)]" />
                <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-primary)] via-transparent to-[var(--bg-primary)]" />
            </div>

            <div className="relative z-10 max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                {/* Left Content */}
                <div
                    className={`transition-all duration-1000 ${isVisible
                            ? "opacity-100 translate-x-0"
                            : "opacity-0 -translate-x-12"
                        }`}
                >
                    <p className="text-sm font-medium tracking-[0.3em] uppercase text-[var(--accent-orange)] mb-4">
                        About Me
                    </p>
                    <h2 className="section-title gradient-text mb-6">
                        Who Am I?
                    </h2>
                    <div className="space-y-5 text-[var(--text-secondary)] text-base leading-relaxed">
                        <p>
                            Saya adalah seorang developer yang passionate dalam membangun
                            aplikasi web dan mobile yang modern, fungsional, dan memiliki
                            desain yang memukau.
                        </p>
                        <p>
                            Dengan pengalaman di berbagai teknologi dan framework, saya
                            selalu berusaha untuk memberikan solusi terbaik dalam setiap
                            project yang saya kerjakan.
                        </p>
                        <p>
                            Saya percaya bahwa teknologi dapat mengubah dunia, dan saya
                            ingin menjadi bagian dari perubahan tersebut melalui kode
                            yang saya tulis.
                        </p>
                    </div>

                    {/* Stats */}
                    <div className="grid grid-cols-3 gap-6 mt-10">
                        {[
                            { value: "3+", label: "Years Exp" },
                            { value: "20+", label: "Projects" },
                            { value: "10+", label: "Tech Stack" },
                        ].map((stat, i) => (
                            <div
                                key={i}
                                className="glass rounded-2xl p-4 text-center transition-all duration-300 hover:scale-105"
                            >
                                <div className="text-2xl md:text-3xl font-extrabold gradient-text">
                                    {stat.value}
                                </div>
                                <div className="text-xs text-[var(--text-secondary)] mt-1">
                                    {stat.label}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Right: Decorative visual */}
                <div
                    className={`hidden lg:flex justify-center transition-all duration-1000 delay-300 ${isVisible
                            ? "opacity-100 translate-x-0"
                            : "opacity-0 translate-x-12"
                        }`}
                >
                    <div className="relative w-80 h-80">
                        <div className="absolute inset-0 rounded-full bg-gradient-to-br from-[var(--accent-orange)] via-[var(--accent-pink)] to-[var(--accent-purple)] opacity-20 blur-3xl animate-pulse" />
                        <div className="absolute inset-4 rounded-full glass border-2 border-[var(--glass-border)] overflow-hidden">
                            <Image
                                src="/frame/00104.png"
                                alt="Profile"
                                fill
                                className="object-cover scale-150 object-top"
                                sizes="320px"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
