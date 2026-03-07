"use client";

const SOCIAL_LINKS = [
    {
        name: "LinkedIn",
        href: "https://linkedin.com/in/",
        icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" /></svg>,
        color: "#0077b5",
    },
    {
        name: "GitHub",
        href: "https://github.com/",
        icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" /></svg>,
        color: "#f5f5f5",
    },
    {
        name: "Instagram",
        href: "https://instagram.com/",
        icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" /></svg>,
        color: "#e1306c",
    },
    {
        name: "Email",
        href: "mailto:your@email.com",
        icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" /></svg>,
        color: "#f59e0b",
    },
];

export default function Footer() {
    return (
        <footer className="relative overflow-hidden">
            {/* CTA Section */}
            <div className="relative py-20">
                <div className="absolute inset-0 bg-[var(--bg-primary)]" />
                <div className="mesh-gradient w-[600px] h-[400px] bg-[var(--accent-orange)] top-0 left-1/2 -translate-x-1/2" />
                <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[var(--accent-orange)] to-transparent opacity-15" />

                <div className="relative z-10 max-w-3xl mx-auto px-6 lg:px-8 text-center">
                    <h3 className="text-3xl md:text-5xl font-black tracking-tight mb-4">
                        <span className="gradient-text">Mari Berkolaborasi</span>
                    </h3>
                    <p className="text-[var(--text-secondary)] text-sm md:text-base max-w-lg mx-auto mb-8 leading-relaxed">
                        Punya project menarik atau ingin berdiskusi? Saya selalu terbuka untuk peluang kolaborasi baru.
                    </p>
                    <a
                        href="mailto:your@email.com"
                        className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-gradient-to-r from-[var(--accent-orange)] to-[var(--accent-pink)] text-white font-semibold text-sm transition-all duration-300 hover:scale-105 hover:shadow-[0_0_40px_rgba(245,158,11,0.3)]"
                    >
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                            <polyline points="22,6 12,13 2,6" />
                        </svg>
                        Hubungi Saya
                    </a>
                </div>
            </div>

            {/* Footer bottom */}
            <div className="relative py-12 bg-[var(--bg-secondary)]">
                <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[rgba(255,255,255,0.06)] to-transparent" />

                <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
                    <div className="flex flex-col items-center text-center">
                        <a href="#home" className="text-2xl font-black gradient-text tracking-tight mb-6 animated-underline">
                            &lt;Dev /&gt;
                        </a>

                        <div className="flex gap-3 mb-8">
                            {SOCIAL_LINKS.map((link) => (
                                <a
                                    key={link.name}
                                    href={link.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label={link.name}
                                    className="w-12 h-12 rounded-2xl bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.06)] flex items-center justify-center text-[var(--text-secondary)] transition-all duration-500 hover:scale-110 hover:-translate-y-1 card-shine"
                                    onMouseEnter={(e) => {
                                        e.currentTarget.style.color = link.color;
                                        e.currentTarget.style.borderColor = `${link.color}40`;
                                        e.currentTarget.style.boxShadow = `0 8px 30px ${link.color}20`;
                                    }}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.color = "";
                                        e.currentTarget.style.borderColor = "";
                                        e.currentTarget.style.boxShadow = "";
                                    }}
                                >
                                    {link.icon}
                                </a>
                            ))}
                        </div>

                        <div className="w-full max-w-xs h-px bg-gradient-to-r from-transparent via-[var(--glass-border)] to-transparent mb-6" />

                        <p className="text-[10px] text-[var(--text-secondary)] opacity-60">
                            © {new Date().getFullYear()} Developer Portfolio. Built with{" "}
                            <span className="text-[var(--accent-orange)]">♥</span> using Next.js & Tailwind CSS
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    );
}
