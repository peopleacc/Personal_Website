"use client";

import { useState, useEffect } from "react";

const NAV_ITEMS = [
    { label: "Home", href: "#home" },
    { label: "About", href: "#about" },
    { label: "Skills", href: "#skills" },
    { label: "Experience", href: "#experience" },
    { label: "Projects", href: "#projects" },
    { label: "Chat", href: "#chat" },
];

export default function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [activeSection, setActiveSection] = useState("home");
    const [isMobileOpen, setIsMobileOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 80);
            const sections = NAV_ITEMS.map((item) => item.href.replace("#", ""));
            for (let i = sections.length - 1; i >= 0; i--) {
                const el = document.getElementById(sections[i]);
                if (el && el.getBoundingClientRect().top <= 150) {
                    setActiveSection(sections[i]);
                    break;
                }
            }
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <nav
            className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
            style={{
                background: isScrolled
                    ? "rgba(7, 4, 13, 0.6)"
                    : "transparent",
                backdropFilter: isScrolled ? "blur(20px)" : "none",
                WebkitBackdropFilter: isScrolled ? "blur(20px)" : "none",
                borderBottom: isScrolled
                    ? "1px solid rgba(255,255,255,0.06)"
                    : "1px solid transparent",
            }}
        >
            <div className="w-full px-6 lg:px-12">
                <div className="flex items-center justify-between h-16">

                    {/* LEFT — Logo */}
                    <a href="#home" className="relative group flex-shrink-0">
                        <span className="text-lg font-black gradient-text tracking-tight">
                            &lt;Raisa AF&gt;
                        </span>
                    </a>

                    {/* CENTER — Nav Links (desktop) */}
                    <div className="hidden md:flex items-center absolute left-1/2 -translate-x-1/2">
                        <div className="flex items-center gap-1 p-1 rounded-full">
                            {NAV_ITEMS.map((item) => {
                                const isActive = activeSection === item.href.replace("#", "");
                                return (
                                    <a
                                        key={item.href}
                                        href={item.href}
                                        className={`relative px-4 py-1.5 rounded-full text-xs font-semibold tracking-wide transition-all duration-300 ${isActive
                                                ? "text-white bg-gradient-to-r from-[var(--accent-orange)] to-[var(--accent-pink)] shadow-[0_0_20px_rgba(245,158,11,0.25)]"
                                                : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
                                            }`}
                                    >
                                        {item.label}
                                    </a>
                                );
                            })}
                        </div>
                    </div>

                    {/* RIGHT — Email Button (desktop) + Mobile Toggle */}
                    <div className="flex items-center gap-3 flex-shrink-0">
                        {/* Email Button — desktop */}
                        <a
                            href="mailto:raisakmalfaridi@gmail.com"
                            className="hidden md:inline-flex items-center gap-2 px-5 py-2 rounded-full text-xs font-semibold tracking-wide transition-all duration-300 border border-[rgba(255,255,255,0.1)] text-[var(--text-primary)] hover:border-[var(--accent-orange)] hover:shadow-[0_0_20px_rgba(245,158,11,0.15)] hover:text-[var(--accent-orange)]"
                            style={{ background: "rgba(255,255,255,0.04)" }}
                        >
                            <svg
                                width="14"
                                height="14"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            >
                                <rect x="2" y="4" width="20" height="16" rx="2" />
                                <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                            </svg>
                            Email Me
                        </a>

                        {/* Mobile Toggle */}
                        <button
                            className="md:hidden flex flex-col gap-1.5 p-2.5 rounded-xl bg-[rgba(255,255,255,0.04)] border border-[rgba(255,255,255,0.06)]"
                            onClick={() => setIsMobileOpen(!isMobileOpen)}
                            aria-label="Toggle menu"
                        >
                            <span className={`block w-5 h-0.5 bg-[var(--text-primary)] transition-all duration-300 origin-center ${isMobileOpen ? "rotate-45 translate-y-[4px]" : ""}`} />
                            <span className={`block w-5 h-0.5 bg-[var(--text-primary)] transition-all duration-300 ${isMobileOpen ? "opacity-0 scale-0" : ""}`} />
                            <span className={`block w-5 h-0.5 bg-[var(--text-primary)] transition-all duration-300 origin-center ${isMobileOpen ? "-rotate-45 -translate-y-[4px]" : ""}`} />
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            <div className={`md:hidden overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] ${isMobileOpen ? "max-h-[500px]" : "max-h-0"}`}>
                <div className="px-6 py-3 space-y-1 border-t border-[rgba(255,255,255,0.06)]">
                    {NAV_ITEMS.map((item) => {
                        const isActive = activeSection === item.href.replace("#", "");
                        return (
                            <a
                                key={item.href}
                                href={item.href}
                                onClick={() => setIsMobileOpen(false)}
                                className={`block px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 ${isActive
                                        ? "text-white bg-gradient-to-r from-[var(--accent-orange)] to-[var(--accent-pink)]"
                                        : "text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[rgba(255,255,255,0.04)]"
                                    }`}
                            >
                                {item.label}
                            </a>
                        );
                    })}
                    {/* Email — mobile */}
                    <a
                        href="mailto:raisakmalfaridi@gmail.com"
                        onClick={() => setIsMobileOpen(false)}
                        className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium text-[var(--accent-orange)] hover:bg-[rgba(255,255,255,0.04)] transition-all duration-300"
                    >
                        <svg
                            width="14"
                            height="14"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        >
                            <rect x="2" y="4" width="20" height="16" rx="2" />
                            <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                        </svg>
                        Email Me
                    </a>
                </div>
            </div>
        </nav>
    );
}
