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
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ${isScrolled
                    ? "py-2"
                    : "py-3"
                }`}
        >
            <div className={`max-w-7xl mx-auto px-4 lg:px-8 transition-all duration-700 ${isScrolled ? "" : ""
                }`}>
                <div className={`flex items-center justify-between h-14 px-5 rounded-2xl transition-all duration-700 ${isScrolled
                        ? "bg-[rgba(7,4,13,0.85)] backdrop-blur-xl border border-[rgba(255,255,255,0.06)] shadow-[0_8px_32px_rgba(0,0,0,0.4)]"
                        : "bg-transparent"
                    }`}>
                    {/* Logo */}
                    <a href="#home" className="relative group">
                        <span className="text-lg font-black gradient-text tracking-tight">
                            &lt;Dev /&gt;
                        </span>
                    </a>

                    {/* Desktop Nav */}
                    <div className="hidden md:flex items-center">
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

            {/* Mobile Menu */}
            <div className={`md:hidden overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] ${isMobileOpen ? "max-h-[400px]" : "max-h-0"}`}>
                <div className="mx-4 mt-2 bg-[rgba(7,4,13,0.95)] backdrop-blur-xl rounded-2xl border border-[rgba(255,255,255,0.06)] px-4 py-3 space-y-1 shadow-[0_8px_32px_rgba(0,0,0,0.4)]">
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
                </div>
            </div>
        </nav>
    );
}
