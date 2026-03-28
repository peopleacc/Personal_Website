"use client";

import { useEffect, useRef, useState } from "react";

const SKILLS = [
  { name: "JavaScript", level: 90, color: "#f7df1e", icon: "/image/JS.png", category: "Language" },
  { name: "PHP", level: 82, color: "#8892bf", icon: "/image/php.png", category: "Language" },
  { name: "Kotlin", level: 82, color: "#7F52FF", icon: "/image/kotlin.jpg", category: "Language" },
  { name: "Python", level: 50, color: "#3776ab", icon: "/image/python.png", category: "Language" },
  { name: "Tailwind CSS", level: 90, color: "#38bdf8", icon: "/image/tailwind.png", category: "Frontend" },
  { name: "React", level: 88, color: "#61dafb", icon: "/image/react_js.png", category: "Frontend" },
  { name: "Next.js", level: 88, color: "#eaeaea", icon: "/image/next.png", category: "Frontend/Backend" },
  { name: "Laravel", level: 82, color: "#ff2d20", icon: "/image/laravel.png", category: "Backend" },
  { name: "MySQL", level: 78, color: "#4479a1", icon: "/image/mysql.png", category: "Database" },
  { name: "PostgreSQL", level: 78, color: "#336791", icon: "/image/postgre.png", category: "Database" },
];

// Ukuran orb berdasarkan jarak dari tengah (0=tengah, 1=sebelah, 2=dua langkah, 3=tiga langkah)
const ORB_SIZES = [130, 90, 66, 48];
const ORB_OPACITIES = [1, 0.7, 0.45, 0.25];

export default function SkillsSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [startX, setStartX] = useState(0);
  const [isDragging, setIsDragging] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const goNext = () => setActiveIndex(i => Math.min(i + 1, SKILLS.length - 1));
  const goPrev = () => setActiveIndex(i => Math.max(i - 1, 0));

  const handleTouchStart = (e: React.TouchEvent) => setStartX(e.touches[0].clientX);
  const handleTouchEnd = (e: React.TouchEvent) => {
    const dx = startX - e.changedTouches[0].clientX;
    if (Math.abs(dx) > 40) dx > 0 ? goNext() : goPrev();
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(false);
    setStartX(e.clientX);
  };
  const handleMouseMove = () => setIsDragging(true);
  const handleMouseUp = (e: React.MouseEvent) => {
    if (!isDragging) return;
    const dx = startX - e.clientX;
    if (Math.abs(dx) > 40) dx > 0 ? goNext() : goPrev();
  };

  const selected = SKILLS[activeIndex];

  // Tampilkan 7 skill: offset -3 sampai +3
  const getVisibleSkills = () => {
    const result = [];
    for (let offset = -3; offset <= 3; offset++) {
      const idx = activeIndex + offset;
      if (idx >= 0 && idx < SKILLS.length) {
        result.push({ skill: SKILLS[idx], offset, idx });
      }
    }
    return result;
  };

  return (
    <section
      id="skills"
      ref={sectionRef}
      className="relative min-h-screen py-32 overflow-hidden"
    >
      <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, var(--section-bg) 0%, var(--section-bg-mid) 40%, var(--section-bg-alt) 100%)" }} />
      <div className="absolute top-20 -left-32 w-[500px] h-[500px] rounded-full pointer-events-none" style={{ background: "radial-gradient(circle, rgba(245,158,11,0.06) 0%, transparent 70%)", filter: "blur(60px)" }} />
      <div className="absolute bottom-20 -right-32 w-[400px] h-[400px] rounded-full pointer-events-none" style={{ background: "radial-gradient(circle, rgba(168,85,247,0.06) 0%, transparent 70%)", filter: "blur(60px)" }} />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[rgba(245,158,11,0.2)] to-transparent" />

      <div className={`relative z-10 max-w-5xl mx-auto px-8 lg:px-12 transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
        {/* Header */}
        <div className={`text-center mb-20 transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <div className="section-label glass border-[rgba(245,158,11,0.15)] text-[var(--accent-orange)]">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M16 18l6-6-6-6M8 6l-6 6 6 6" />
            </svg>
            My Skills
          </div>
          <h2 className="section-title mb-4">
            <span className="text-white">Tech Stack</span>
          </h2>
        </div>

        {/* Info Card */}
        <div className="flex justify-center mb-12 transition-all duration-500">
          <div
            className="flex items-center gap-5 px-8 py-4 rounded-2xl border backdrop-blur-xl transition-all duration-500"
            style={{
              background: "rgba(0,0,0,0.85)",
              borderColor: `${selected.color}40`,
              boxShadow: `0 0 40px ${selected.color}20`,
              minWidth: "260px",
            }}
          >
            <img
              src={selected.icon}
              className="w-12 h-12 rounded-xl object-contain"
              style={{ filter: `drop-shadow(0 0 8px ${selected.color}80)` }}
            />
            <div className="flex-1">
              <p className="text-white font-bold text-lg">{selected.name}</p>
              <p className="text-[10px] uppercase tracking-widest mb-2" style={{ color: selected.color }}>{selected.category}</p>
              <div className="w-full h-1.5 rounded-full bg-white/5 overflow-hidden">
                <div
                  className="h-full rounded-full transition-all duration-700"
                  style={{
                    width: `${selected.level}%`,
                    background: `linear-gradient(90deg, ${selected.color}, ${selected.color}60)`,
                    boxShadow: `0 0 8px ${selected.color}`,
                  }}
                />
              </div>
              <p className="text-[10px] mt-1" style={{ color: selected.color }}>{selected.level}% Proficiency</p>
            </div>
          </div>
        </div>

        {/* Carousel — tampilkan 7 orb */}
        <div
          className="relative flex items-center justify-center"
          style={{ height: "160px" }}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
        >
          {/* Prev arrow */}
          <button
            onClick={goPrev}
            disabled={activeIndex === 0}
            className="absolute left-0 z-20 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300"
            style={{
              background: "rgba(255,255,255,0.05)",
              border: "1px solid rgba(255,255,255,0.1)",
              opacity: activeIndex === 0 ? 0.2 : 1,
              cursor: activeIndex === 0 ? "not-allowed" : "pointer",
            }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5"><path d="M15 18l-6-6 6-6" /></svg>
          </button>

          {/* 7 Orbs */}
          <div className="flex items-center justify-center gap-2.5" style={{ userSelect: "none" }}>
            {getVisibleSkills().map(({ skill, offset, idx }) => {
              const abs = Math.abs(offset);
              const size = ORB_SIZES[abs] ?? 36;
              const opacity = ORB_OPACITIES[abs] ?? 0.15;
              const isCenter = offset === 0;
              const imgSize = size * 0.58;

              return (
                <div
                  key={skill.name}
                  onClick={() => setActiveIndex(idx)}
                  className="relative rounded-full flex items-center justify-center cursor-pointer"
                  style={{
                    width: `${size}px`,
                    height: `${size}px`,
                    flexShrink: 0,
                    opacity,
                    transition: "all 0.5s cubic-bezier(0.34,1.56,0.64,1)",
                    background: isCenter
                      ? `radial-gradient(circle at 30% 30%, ${skill.color}25, rgba(13,10,23,0.95))`
                      : "rgba(0,0,0,0.5)",
                    border: `2px solid ${isCenter ? skill.color : "rgba(255,255,255,0.07)"}`,
                    boxShadow: isCenter
                      ? `0 0 40px ${skill.color}50, 0 0 80px ${skill.color}20, inset 0 0 30px ${skill.color}10`
                      : "none",
                    filter: abs >= 3 ? "blur(0.5px)" : "none",
                  }}
                >
                  {isCenter && (
                    <div
                      className="absolute inset-0 rounded-full animate-ping"
                      style={{
                        background: `radial-gradient(circle, ${skill.color}15, transparent)`,
                        animationDuration: "2s",
                      }}
                    />
                  )}
                  <img
                    src={skill.icon}
                    className="object-contain rounded-full"
                    style={{
                      width: `${imgSize}px`,
                      height: `${imgSize}px`,
                      filter: isCenter ? `drop-shadow(0 0 10px ${skill.color}90)` : "none",
                      transition: "all 0.5s cubic-bezier(0.34,1.56,0.64,1)",
                    }}
                  />
                </div>
              );
            })}
          </div>

          {/* Next arrow */}
          <button
            onClick={goNext}
            disabled={activeIndex === SKILLS.length - 1}
            className="absolute right-0 z-20 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300"
            style={{
              background: "rgba(255,255,255,0.05)",
              border: "1px solid rgba(255,255,255,0.1)",
              opacity: activeIndex === SKILLS.length - 1 ? 0.2 : 1,
              cursor: activeIndex === SKILLS.length - 1 ? "not-allowed" : "pointer",
            }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5"><path d="M9 18l6-6-6-6" /></svg>
          </button>
        </div>

        {/* Dots */}
        <div className="flex justify-center gap-2 mt-8">
          {SKILLS.map((_, i) => (
            <button
              key={i}
              onClick={() => setActiveIndex(i)}
              className="rounded-full transition-all duration-300"
              style={{
                width: i === activeIndex ? "20px" : "6px",
                height: "6px",
                background: i === activeIndex ? selected.color : "rgba(255,255,255,0.15)",
                boxShadow: i === activeIndex ? `0 0 8px ${selected.color}` : "none",
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}