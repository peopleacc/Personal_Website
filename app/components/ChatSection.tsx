"use client";

import { useState, useRef, useEffect } from "react";

interface Message {
    id: number;
    text: string;
    sender: "user" | "bot";
    timestamp: string;
}

const BOT_RESPONSES: Record<string, string> = {
    halo: "Halo! Selamat datang di portfolio saya. Ada yang ingin Anda ketahui? 😊",
    hello: "Hello! Welcome! How can I help you? 😊",
    hi: "Hi there! 👋 Silahkan tanyakan apa saja tentang saya!",
    siapa: "Saya adalah seorang Full Stack Developer yang passionate dengan teknologi web modern. Saya menguasai berbagai bahasa pemrograman dan framework.",
    skill: "Saya menguasai JavaScript, TypeScript, React, Next.js, Laravel, PHP, Python, Node.js, dan Go. Cek bagian Skills di atas! 👆",
    pengalaman: "Saya memiliki 3+ tahun pengalaman di bidang web development, pernah bekerja di berbagai perusahaan sebagai Full Stack, Frontend, dan Backend Developer.",
    project: "Saya telah mengerjakan 20+ project termasuk E-Commerce, Task Management, CRM System, dan banyak lagi! Lihat bagian Projects! 📂",
    kontak: "Hubungi saya melalui LinkedIn, Instagram, GitHub, atau email di footer halaman ini! 👇",
    hire: "Terima kasih! Silahkan hubungi saya via email atau LinkedIn untuk diskusi kolaborasi. 🤝",
    default: "Terima kasih atas pertanyaannya! Saya masih chatbot sederhana. Untuk info lebih detail, hubungi saya langsung melalui kontak di footer. 😊",
};

function getBotResponse(input: string): string {
    const lower = input.toLowerCase();
    for (const [key, response] of Object.entries(BOT_RESPONSES)) {
        if (key !== "default" && lower.includes(key)) return response;
    }
    return BOT_RESPONSES.default;
}

function getTimeString(): string {
    return new Date().toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" });
}

export default function ChatSection() {
    const [messages, setMessages] = useState<Message[]>([
        { id: 0, text: "Halo! 👋 Saya chatbot portfolio. Tanyakan tentang skill, project, pengalaman, atau apa saja!", sender: "bot", timestamp: getTimeString() },
    ]);
    const [input, setInput] = useState("");
    const [isTyping, setIsTyping] = useState(false);
    const chatEndRef = useRef<HTMLDivElement>(null);
    const sectionRef = useRef<HTMLDivElement>(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(([entry]) => { if (entry.isIntersecting) setIsVisible(true); }, { threshold: 0.1 });
        if (sectionRef.current) observer.observe(sectionRef.current);
        return () => observer.disconnect();
    }, []);

    useEffect(() => {
        chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    const handleSend = () => {
        if (!input.trim()) return;
        const userMsg: Message = { id: Date.now(), text: input.trim(), sender: "user", timestamp: getTimeString() };
        setMessages((prev) => [...prev, userMsg]);
        setInput("");
        setIsTyping(true);
        setTimeout(() => {
            setMessages((prev) => [...prev, { id: Date.now() + 1, text: getBotResponse(userMsg.text), sender: "bot", timestamp: getTimeString() }]);
            setIsTyping(false);
        }, 800 + Math.random() * 800);
    };

    return (
        <section id="chat" ref={sectionRef} className="relative py-32 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-b from-[var(--bg-primary)] via-[var(--bg-secondary)] to-[var(--bg-primary)]" />
            <div className="mesh-gradient w-[400px] h-[400px] bg-[var(--accent-cyan)] top-20 right-0" />
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[var(--accent-cyan)] to-transparent opacity-15" />

            <div className="relative z-10 max-w-3xl mx-auto px-6 lg:px-8">
                <div className={`text-center mb-12 transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
                    <div className="section-label glass border-[rgba(34,211,238,0.15)] text-[var(--accent-cyan)]">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" /></svg>
                        Ask Me
                    </div>
                    <h2 className="section-title mb-4">
                        <span className="gradient-text-alt">Chat With Me</span>
                    </h2>
                    <p className="text-[var(--text-secondary)] max-w-md mx-auto text-sm leading-relaxed">
                        Punya pertanyaan? Tanyakan langsung lewat chatbot interaktif ini!
                    </p>
                </div>

                <div className={`relative rounded-3xl overflow-hidden transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}`}>
                    {/* Outer glow */}
                    <div className="absolute -inset-0.5 rounded-3xl bg-gradient-to-br from-[rgba(34,211,238,0.15)] via-transparent to-[rgba(168,85,247,0.1)] blur-sm" />

                    <div className="relative bg-[rgba(13,10,23,0.9)] backdrop-blur-xl border border-[rgba(255,255,255,0.06)] rounded-3xl overflow-hidden">
                        {/* Chat Header */}
                        <div className="px-6 py-4 border-b border-[rgba(255,255,255,0.06)] flex items-center gap-3 bg-[rgba(255,255,255,0.02)]">
                            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-[var(--accent-cyan)] to-[var(--accent-purple)] flex items-center justify-center shadow-[0_0_20px_rgba(34,211,238,0.2)]">
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5"><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" /></svg>
                            </div>
                            <div>
                                <p className="font-bold text-sm text-[var(--text-primary)]">Portfolio Bot</p>
                                <p className="text-[10px] text-emerald-400 flex items-center gap-1.5">
                                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                                    Online — siap membantu
                                </p>
                            </div>
                        </div>

                        {/* Messages */}
                        <div className="h-[400px] overflow-y-auto p-6 space-y-4">
                            {messages.map((msg) => (
                                <div key={msg.id} className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"} animate-fade-in`}>
                                    <div className={`max-w-[80%] rounded-2xl px-5 py-3 ${msg.sender === "user"
                                        ? "bg-gradient-to-r from-[var(--accent-orange)] to-[var(--accent-pink)] text-white rounded-br-md shadow-[0_4px_20px_rgba(245,158,11,0.2)]"
                                        : "bg-[rgba(255,255,255,0.05)] text-[var(--text-primary)] rounded-bl-md border border-[rgba(255,255,255,0.04)]"
                                        }`}>
                                        <p className="text-sm leading-relaxed">{msg.text}</p>
                                        <p className={`text-[9px] mt-1.5 ${msg.sender === "user" ? "text-white/50" : "text-[var(--text-secondary)]"}`}>
                                            {msg.timestamp}
                                        </p>
                                    </div>
                                </div>
                            ))}
                            {isTyping && (
                                <div className="flex justify-start animate-fade-in">
                                    <div className="bg-[rgba(255,255,255,0.05)] rounded-2xl rounded-bl-md px-5 py-3.5 border border-[rgba(255,255,255,0.04)]">
                                        <div className="flex gap-1.5">
                                            {[0, 150, 300].map((delay) => (
                                                <span key={delay} className="w-2 h-2 rounded-full bg-[var(--accent-cyan)] opacity-60 animate-bounce" style={{ animationDelay: `${delay}ms` }} />
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            )}
                            <div ref={chatEndRef} />
                        </div>

                        {/* Input */}
                        <div className="px-6 py-4 border-t border-[rgba(255,255,255,0.06)] bg-[rgba(255,255,255,0.02)]">
                            <div className="flex gap-3">
                                <input
                                    type="text"
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                    onKeyDown={(e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); handleSend(); } }}
                                    placeholder="Ketik pertanyaan..."
                                    className="flex-1 bg-[rgba(255,255,255,0.04)] border border-[rgba(255,255,255,0.06)] rounded-2xl px-5 py-3 text-sm text-[var(--text-primary)] placeholder:text-[var(--text-secondary)] focus:outline-none focus:border-[var(--accent-cyan)] focus:shadow-[0_0_20px_rgba(34,211,238,0.1)] transition-all duration-300"
                                />
                                <button
                                    onClick={handleSend}
                                    disabled={!input.trim()}
                                    className="px-5 py-3 rounded-2xl bg-gradient-to-r from-[var(--accent-cyan)] to-[var(--accent-purple)] text-white font-semibold text-sm transition-all duration-300 hover:scale-105 hover:shadow-[0_0_30px_rgba(34,211,238,0.3)] disabled:opacity-30 disabled:hover:scale-100"
                                >
                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                                        <line x1="22" y1="2" x2="11" y2="13" /><polygon points="22 2 15 22 11 13 2 9 22 2" />
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
