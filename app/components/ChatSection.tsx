"use client";

import { useState, useRef, useEffect } from "react";

interface Message {
    id: number;
    text: string;
    sender: "user" | "bot";
    timestamp: string;
}

function getTimeString(): string {
    return new Date().toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" });
}

export default function ChatSection() {
    const [messages, setMessages] = useState<Message[]>([
        {
            id: 0,
            text: "Halo! Saya chatbot Eca. Tanyakan apa aja tapi jangan ngaco yee wkwkw",
            sender: "bot",
            timestamp: getTimeString(),
        },
    ]);
    const [input, setInput] = useState("");
    const [isTyping, setIsTyping] = useState(false);
    const chatEndRef = useRef<HTMLDivElement>(null);
    const sectionRef = useRef<HTMLDivElement>(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => setIsVisible(entry.isIntersecting),
            { threshold: 0.1 }
        );
        if (sectionRef.current) observer.observe(sectionRef.current);
        return () => observer.disconnect();
    }, []);

    useEffect(() => {
        if (messages.length > 1) {
            chatEndRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest" });
        }
    }, [messages]);

    const handleSend = async () => {
        if (!input.trim() || isTyping) return;

        const userText = input.trim();
        const userMsg: Message = {
            id: Date.now(),
            text: userText,
            sender: "user",
            timestamp: getTimeString(),
        };

        setMessages((prev) => [...prev, userMsg]);
        setInput("");
        setIsTyping(true);

        try {
            const res = await fetch("/api/chat", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ message: userText }),
            });

            const data = await res.json();
            const botText = data.response ?? "Maaf, terjadi kesalahan. Silahkan coba lagi.";

            setMessages((prev) => [
                ...prev,
                {
                    id: Date.now() + 1,
                    text: botText,
                    sender: "bot",
                    timestamp: getTimeString(),
                },
            ]);
        } catch {
            setMessages((prev) => [
                ...prev,
                {
                    id: Date.now() + 1,
                    text: "❌ Gagal terhubung ke server. Pastikan aplikasi berjalan dengan benar.",
                    sender: "bot",
                    timestamp: getTimeString(),
                },
            ]);
        } finally {
            setIsTyping(false);
        }
    };

    return (
        <section id="chat" ref={sectionRef} className="relative py-32 overflow-hidden">
            {/* Deep purple gradient background */}
            <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, var(--section-bg-alt) 0%, var(--section-bg-mid) 50%, var(--section-bg) 100%)" }} />
            {/* Ambient glow orbs */}
            <div className="absolute top-20 -right-32 w-[400px] h-[400px] rounded-full pointer-events-none" style={{ background: "radial-gradient(circle, rgba(34,211,238,0.05) 0%, transparent 70%)", filter: "blur(60px)" }} />
            <div className="absolute bottom-20 -left-32 w-[400px] h-[400px] rounded-full pointer-events-none" style={{ background: "radial-gradient(circle, rgba(168,85,247,0.05) 0%, transparent 70%)", filter: "blur(60px)" }} />
            {/* Warm section divider */}
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[rgba(34,211,238,0.2)] to-transparent" />

            <div className={`relative z-10 max-w-3xl mx-auto px-6 lg:px-8 transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
                {/* Section heading */}
                <div className={`text-center mb-12 transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
                    <div className="section-label glass border-[rgba(34,211,238,0.15)] text-[var(--accent-cyan)]">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                            <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
                        </svg>
                        Ask Me
                    </div>
                    <h2 className="section-title mb-4">
                        <span className="text-white">Chat Boca (Bot Eca)</span>
                    </h2>
                    <p className="text-[rgba(255,255,255,0.6)] max-w-md mx-auto text-sm leading-relaxed">
                        Punya pertanyaan? Tanyakan langsung lewat Boca interaktif ini!
                    </p>
                </div>

                {/* Chat card */}
                <div className={`relative rounded-3xl overflow-hidden transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}`}>
                    {/* Outer glow */}
                    <div className="absolute -inset-0.5 rounded-3xl bg-gradient-to-br from-[rgba(34,211,238,0.15)] via-transparent to-[rgba(168,85,247,0.1)] blur-sm" />

                    <div className="relative bg-[rgba(0,0,0,0.9)] backdrop-blur-xl border border-[rgba(255,255,255,0.06)] rounded-3xl overflow-hidden">

                        {/* Chat Header */}
                        <div className="px-6 py-4 border-b border-[rgba(255,255,255,0.06)] flex items-center gap-3 bg-[rgba(255,255,255,0.02)]">
                            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-[var(--accent-cyan)] to-[var(--accent-purple)] flex items-center justify-center shadow-[0_0_20px_rgba(34,211,238,0.2)]">
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5">
                                    <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
                                </svg>
                            </div>
                            <div>
                                <p className="font-bold text-sm text-white">Boca</p>
                                <p className="text-[10px] text-emerald-400 flex items-center gap-1.5">
                                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                                    Online — siap membantu
                                </p>
                            </div>
                        </div>

                        {/* Messages */}
                        <div className="h-[400px] overflow-y-auto p-6 space-y-4">
                            {messages.map((msg) => (
                                <div
                                    key={msg.id}
                                    className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"} animate-fade-in`}
                                >
                                    <div
                                        className={`max-w-[80%] rounded-2xl px-5 py-3 ${msg.sender === "user"
                                            ? "bg-gradient-to-r from-[var(--accent-orange)] to-[var(--accent-pink)] text-white rounded-br-md shadow-[0_4px_20px_rgba(245,158,11,0.2)]"
                                            : "bg-[rgba(255,255,255,0.05)] text-white rounded-bl-md border border-[rgba(255,255,255,0.04)]"
                                            }`}
                                    >
                                        <p className="text-sm leading-relaxed">{msg.text}</p>
                                        <p className={`text-[9px] mt-1.5 ${msg.sender === "user" ? "text-white/50" : "text-[rgba(255,255,255,0.5)]"}`}>
                                            {msg.timestamp}
                                        </p>
                                    </div>
                                </div>
                            ))}

                            {/* Typing indicator */}
                            {isTyping && (
                                <div className="flex justify-start animate-fade-in">
                                    <div className="bg-[rgba(255,255,255,0.05)] rounded-2xl rounded-bl-md px-5 py-3.5 border border-[rgba(255,255,255,0.04)]">
                                        <div className="flex gap-1.5">
                                            {[0, 150, 300].map((delay) => (
                                                <span
                                                    key={delay}
                                                    className="w-2 h-2 rounded-full bg-[var(--accent-cyan)] opacity-60 animate-bounce"
                                                    style={{ animationDelay: `${delay}ms` }}
                                                />
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
                                    onKeyDown={(e) => {
                                        if (e.key === "Enter" && !e.shiftKey) {
                                            e.preventDefault();
                                            handleSend();
                                        }
                                    }}
                                    placeholder="Ketik pertanyaan..."
                                    className="flex-1 bg-[rgba(255,255,255,0.04)] border border-[rgba(255,255,255,0.06)] rounded-2xl px-5 py-3 text-sm text-white placeholder:text-[rgba(255,255,255,0.4)] focus:outline-none focus:border-[rgba(255,255,255,0.2)] focus:shadow-[0_0_20px_rgba(255,255,255,0.05)] transition-all duration-300"
                                />
                                <button
                                    onClick={handleSend}
                                    disabled={!input.trim() || isTyping}
                                    className="px-5 py-3 rounded-2xl bg-gradient-to-r from-[var(--accent-cyan)] to-[var(--accent-purple)] text-white font-semibold text-sm transition-all duration-300 hover:scale-105 hover:shadow-[0_0_30px_rgba(34,211,238,0.3)] disabled:opacity-30 disabled:hover:scale-100"
                                >
                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                                        <line x1="22" y1="2" x2="11" y2="13" />
                                        <polygon points="22 2 15 22 11 13 2 9 22 2" />
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