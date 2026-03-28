"use client";

import { useEffect, useState } from "react";

export default function Loader({ onFinish }: { onFinish: () => void }) {
    const [phase, setPhase] = useState<"loading" | "line" | "opening" | "done">("loading");
    const [progress, setProgress] = useState(0);

    // Loading progress animation
    useEffect(() => {
        let frame: number;
        let start: number | null = null;
        const duration = 2500; // 2.5s loading

        const animate = (timestamp: number) => {
            if (!start) start = timestamp;
            const elapsed = timestamp - start;
            const p = Math.min(elapsed / duration, 1);
            // ease-out cubic
            const eased = 1 - Math.pow(1 - p, 3);
            setProgress(eased * 100);

            if (p < 1) {
                frame = requestAnimationFrame(animate);
            } else {
                // Loading done → show line
                setTimeout(() => setPhase("line"), 300);
            }
        };

        frame = requestAnimationFrame(animate);
        return () => cancelAnimationFrame(frame);
    }, []);

    // Phase transitions
    useEffect(() => {
        if (phase === "line") {
            // Line appears → then opens
            setTimeout(() => setPhase("opening"), 800);
        }
        if (phase === "opening") {
            // Curtain opens → done
            setTimeout(() => setPhase("done"), 2000);
        }
        if (phase === "done") {
            onFinish();
        }
    }, [phase, onFinish]);

    if (phase === "done") return null;

    return (
        <div
            className="fixed inset-0 z-[9999] flex items-center justify-center"
            style={{ pointerEvents: phase === "opening" ? "none" : "auto" }}
        >
            {/* ===== TOP CURTAIN ===== */}
            <div
                className="absolute top-0 left-0 right-0 bg-black transition-transform ease-[cubic-bezier(0.76,0,0.24,1)]"
                style={{
                    height: "50%",
                    transformOrigin: "top",
                    transform: phase === "opening" ? "translateY(-100%)" : "translateY(0)",
                    transitionDuration: "1.8s",
                }}
            />

            {/* ===== BOTTOM CURTAIN ===== */}
            <div
                className="absolute bottom-0 left-0 right-0 bg-black transition-transform ease-[cubic-bezier(0.76,0,0.24,1)]"
                style={{
                    height: "50%",
                    transformOrigin: "bottom",
                    transform: phase === "opening" ? "translateY(100%)" : "translateY(0)",
                    transitionDuration: "1.8s",
                }}
            />

            {/* ===== CENTER LINE (the split line) ===== */}
            <div
                className="absolute left-0 right-0 flex items-center justify-center transition-all ease-[cubic-bezier(0.76,0,0.24,1)]"
                style={{
                    top: "50%",
                    transform: "translateY(-50%)",
                    height: "2px",
                    opacity: phase === "opening" ? 0 : phase === "line" ? 1 : 0,
                    transitionDuration: "0.6s",
                }}
            >
                <div
                    className="h-full bg-gradient-to-r from-transparent via-white to-transparent transition-all ease-[cubic-bezier(0.16,1,0.3,1)]"
                    style={{
                        width: phase === "line" || phase === "opening" ? "100%" : "0%",
                        transitionDuration: "0.8s",
                    }}
                />
            </div>

            {/* ===== LOADER CONTENT (RAF text + progress) ===== */}
            <div
                className="relative z-10 flex flex-col items-center gap-8 transition-all duration-700"
                style={{
                    opacity: phase === "loading" ? 1 : 0,
                    transform: phase === "loading" ? "scale(1)" : "scale(0.9)",
                }}
            >
                {/* RAF Logo */}
                <div className="relative">
                    {/* Glow behind */}
                    <div
                        className="absolute inset-0 blur-3xl opacity-30"
                        style={{
                            background: "radial-gradient(circle, rgba(245,158,11,0.4), transparent 70%)",
                            transform: "scale(2)",
                        }}
                    />

                    {/* Main text */}
                    <h1
                        className="relative text-7xl md:text-9xl font-black tracking-[0.3em] select-none"
                        style={{
                            background: "linear-gradient(135deg, #f59e0b 0%, #ec4899 40%, #a855f7 70%, #f59e0b 100%)",
                            backgroundSize: "200% 200%",
                            WebkitBackgroundClip: "text",
                            WebkitTextFillColor: "transparent",
                            backgroundClip: "text",
                            animation: "gradientShift 3s ease-in-out infinite",
                            textShadow: "none",
                            filter: "drop-shadow(0 0 40px rgba(245,158,11,0.2))",
                        }}
                    >
                        RAF
                    </h1>

                    {/* Decorative dots around RAF */}
                    <div className="absolute -top-4 -left-4 w-2 h-2 rounded-full bg-[#f59e0b] opacity-60 animate-ping" style={{ animationDuration: "2s" }} />
                    <div className="absolute -top-2 -right-6 w-1.5 h-1.5 rounded-full bg-[#a855f7] opacity-40 animate-ping" style={{ animationDuration: "2.5s", animationDelay: "0.5s" }} />
                    <div className="absolute -bottom-3 left-1/2 w-1 h-1 rounded-full bg-[#ec4899] opacity-50 animate-ping" style={{ animationDuration: "1.8s", animationDelay: "0.3s" }} />
                </div>

                {/* Subtitle */}
                <p className="text-[10px] md:text-xs tracking-[0.5em] uppercase text-[rgba(255,255,255,0.35)] font-medium">
                    Portfolio
                </p>

                {/* Progress bar */}
                <div className="w-48 md:w-64 flex flex-col items-center gap-3">
                    <div className="w-full h-[2px] rounded-full bg-[rgba(255,255,255,0.06)] overflow-hidden">
                        <div
                            className="h-full rounded-full transition-none"
                            style={{
                                width: `${progress}%`,
                                background: "linear-gradient(90deg, #f59e0b, #ec4899, #a855f7)",
                                boxShadow: "0 0 12px rgba(245,158,11,0.5)",
                            }}
                        />
                    </div>
                    <span className="text-[9px] text-[rgba(255,255,255,0.25)] tracking-[0.3em] font-mono">
                        {Math.round(progress)}%
                    </span>
                </div>
            </div>

            {/* Subtle corner accents */}
            <div className="absolute top-8 left-8 w-8 h-8 border-t border-l border-[rgba(255,255,255,0.06)] transition-opacity duration-700" style={{ opacity: phase === "loading" ? 1 : 0 }} />
            <div className="absolute top-8 right-8 w-8 h-8 border-t border-r border-[rgba(255,255,255,0.06)] transition-opacity duration-700" style={{ opacity: phase === "loading" ? 1 : 0 }} />
            <div className="absolute bottom-8 left-8 w-8 h-8 border-b border-l border-[rgba(255,255,255,0.06)] transition-opacity duration-700" style={{ opacity: phase === "loading" ? 1 : 0 }} />
            <div className="absolute bottom-8 right-8 w-8 h-8 border-b border-r border-[rgba(255,255,255,0.06)] transition-opacity duration-700" style={{ opacity: phase === "loading" ? 1 : 0 }} />
        </div>
    );
}
