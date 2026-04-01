"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import React from "react";

/* ═══════════════════════════════════════════════════════════════
   CONSTANTS  (ganti blok ini)
   ═══════════════════════════════════════════════════════════════ */
const TOTAL_FRAMES = 488;
const PRELOAD_AHEAD = 15;

// Hero — tidak berubah
const HERO_FADE_IN = 0.00;
const HERO_FULL_START = 0.00;
const HERO_FULL_END = 0.06;
const HERO_FADE_OUT = 0.13;

// About — tidak berubah
const ABOUT_FADE_IN = 0.11;
const ABOUT_FULL_START = 0.16;
const ABOUT_FULL_END = 0.24;
const ABOUT_FADE_OUT = 0.30;

// Skills — dimundurkan +0.08
const SKILLS_FADE_IN = 0.50;
const SKILLS_FULL_START = 0.55;
const SKILLS_FULL_END = 0.63;
const SKILLS_FADE_OUT = 0.68;

// Experience — dimundurkan +0.08
const EXP_FADE_IN = 0.80;
const EXP_FULL_START = 0.85;
const EXP_FULL_END = 0.96;
const EXP_FADE_OUT = 1.00;


/* ── Utility: trapezoidal opacity dengan smoothstep ─────────── */
function smoothstep(t: number) {
  return t * t * (3 - 2 * t);
}

function calcOpacity(
  p: number,
  fadeIn: number,
  fullStart: number,
  fullEnd: number,
  fadeOut: number
): number {
  if (p < fadeIn) return 0;
  if (p < fullStart) return smoothstep((p - fadeIn) / (fullStart - fadeIn));
  if (p <= fullEnd) return 1;
  if (p < fadeOut) return smoothstep(1 - (p - fullEnd) / (fadeOut - fullEnd));
  return 0;
}
/* ═══════════════════════════════════════════════════════════════
   PARTICLE DATA (hero section decoration)
   ═══════════════════════════════════════════════════════════════ */
const PARTICLE_DATA = Array.from({ length: 20 }, (_, i) => ({
  width: 2 + (((i * 7 + 3) % 5) * 0.6),
  height: 2 + (((i * 11 + 7) % 5) * 0.6),
  left: (i * 37 + 13) % 100,
  top: (i * 53 + 29) % 100,
  opacity: 0.15 + ((i * 17 + 5) % 10) * 0.03,
  duration: 3 + ((i * 23 + 11) % 8) * 0.5,
  delay: ((i * 31 + 3) % 10) * 0.5,
}));

/* ═══════════════════════════════════════════════════════════════
   TYPEWRITER HOOK (Hero name)
   ═══════════════════════════════════════════════════════════════ */
const FULL_NAME = "Raisa Akmal Faridi";
const LINE_BREAK_INDEX = 5;

type Phase = "typing" | "full-pause" | "deleting" | "empty-pause";

function useTypewriter() {
  const [charCount, setCharCount] = useState(0);
  const [phase, setPhase] = useState<Phase>("typing");

  useEffect(() => {
    let t: ReturnType<typeof setTimeout>;
    if (phase === "typing") {
      if (charCount < FULL_NAME.length) {
        t = setTimeout(() => setCharCount((c) => c + 1), 90);
      } else {
        t = setTimeout(() => setPhase("full-pause"), 2400);
      }
    } else if (phase === "full-pause") {
      t = setTimeout(() => setPhase("deleting"), 0);
    } else if (phase === "deleting") {
      if (charCount > 0) {
        t = setTimeout(() => setCharCount((c) => c - 1), 55);
      } else {
        t = setTimeout(() => setPhase("empty-pause"), 2000);
      }
    } else if (phase === "empty-pause") {
      t = setTimeout(() => setPhase("typing"), 0);
    }
    return () => clearTimeout(t);
  }, [charCount, phase]);

  const typed = FULL_NAME.slice(0, charCount);
  const line1 = typed.slice(0, LINE_BREAK_INDEX);
  const line2 = charCount > LINE_BREAK_INDEX ? typed.slice(LINE_BREAK_INDEX + 1) : "";
  const cursorOnLine = charCount > LINE_BREAK_INDEX ? 2 : 1;

  const [buttonsVisible, setButtonsVisible] = useState(false);
  const hideTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  useEffect(() => {
    if (charCount > 0) {
      if (hideTimerRef.current) {
        clearTimeout(hideTimerRef.current);
        hideTimerRef.current = null;
      }
      setButtonsVisible(true);
    } else {
      hideTimerRef.current = setTimeout(() => setButtonsVisible(false), 0);
    }
    return () => { if (hideTimerRef.current) clearTimeout(hideTimerRef.current); };
  }, [charCount]);

  return { line1, line2, cursorOnLine, buttonsVisible };
}

/* ═══════════════════════════════════════════════════════════════
   CURSOR COMPONENT
   ═══════════════════════════════════════════════════════════════ */
const Cursor = () => (
  <span
    className="inline-block w-[3px] ml-[2px] bg-[var(--accent-orange)]"
    style={{
      height: "0.82em",
      verticalAlign: "middle",
      animation: "blink-cursor 0.75s step-end infinite",
    }}
  />
);

/* ═══════════════════════════════════════════════════════════════
   SKILLS DATA
   ═══════════════════════════════════════════════════════════════ */
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
const ORB_SIZES = [130, 90, 66, 48];
const ORB_OPACITIES = [1, 0.7, 0.45, 0.25];

/* ═══════════════════════════════════════════════════════════════
   EXPERIENCE DATA
   ═══════════════════════════════════════════════════════════════ */
const EXPERIENCES = [
  {
    role: "Full Stack Developer",
    company: "PT KAYABA INDONESIA",
    period: "2026 - Present",
    description: "Mengembangkan aplikasi web skala besar menggunakan Laravel, React, dan Next.js. Mengelola deployment dan CI/CD pipeline.",
    tags: ["Laravel", "Tailwind CSS", "PHP"],
    color: "#f59e0b",
    accentGradient: "from-[#f59e0b] to-[#ec4899]",
    image: "/image/kyb.png",
  },
  {
    role: "Full Stack Developer",
    company: "Dwitama Prima",
    period: "2025 - 2026",
    description: "Merancang dan membangun antarmuka pengguna yang responsif dan modern. Berkolaborasi dengan tim desain untuk UX terbaik.",
    tags: ["Laravel", "Tailwind CSS", "PHP"],
    color: "#6366f1",
    accentGradient: "from-[#6366f1] to-[#a855f7]",
    image: "/image/dwitama.png",
  },
  {
    role: "Himpunan Mahasiswa Sistem Informasi",
    company: "Politeknik STMI",
    period: "2024 - 2026",
    description: "Mahasiswa aktif dan anggota Himpunan Mahasiswa Sistem Informasi Politeknik STMI Jakarta.",
    tags: ["podcast", "design"],
    color: "#22d3ee",
    accentGradient: "from-[#22d3ee] to-[#6366f1]",
    image: "/image/himasi.jfif",
  },
  {
    role: "Mahasiswa Politeknik STMI",
    company: "Politeknik STMI",
    period: "2023 - 2027",
    description: "Menempuh pendidikan D4 Sistem Informasi di Politeknik STMI Jakarta.",
    tags: ["Node.js", "Next JS", "React JS", "PostgreSQL", "PHP", "Laravel"],
    color: "#22d3ee",
    accentGradient: "from-[#22d3ee] to-[#6366f1]",
    image: "/image/stmi.png",
  },
];

/* ═══════════════════════════════════════════════════════════════
   MAIN COMPONENT
   ═══════════════════════════════════════════════════════════════ */
export default function CinematicScroll() {
  /* ── Refs ───────────────────────────────────────────────────── */
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const aboutRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const skillsRef = useRef<HTMLDivElement>(null);
  const experienceRef = useRef<HTMLDivElement>(null);

  const imagesRef = useRef<(HTMLImageElement | null)[]>(Array(TOTAL_FRAMES + 2).fill(null));
  const loadedRef = useRef<boolean[]>(Array(TOTAL_FRAMES + 2).fill(false));

  const rafRef = useRef<number | null>(null);
  const scrollRef = useRef(0);
  const lastDrawRef = useRef({ base: -1, blend: -1 });

  /* ── Skills state ──────────────────────────────────────────── */
  const [skillIndex, setSkillIndex] = useState(0);
  const [skillStartX, setSkillStartX] = useState(0);
  const [skillDragging, setSkillDragging] = useState(false);
  const selectedSkill = SKILLS[skillIndex];
  const goNextSkill = () => setSkillIndex((i) => Math.min(i + 1, SKILLS.length - 1));
  const goPrevSkill = () => setSkillIndex((i) => Math.max(i - 1, 0));

  const getVisibleSkills = () => {
    const result = [];
    for (let offset = -3; offset <= 3; offset++) {
      const idx = skillIndex + offset;
      if (idx >= 0 && idx < SKILLS.length) result.push({ skill: SKILLS[idx], offset, idx });
    }
    return result;
  };

  /* ── Experience state ──────────────────────────────────────── */
  const [expActiveIndex, setExpActiveIndex] = useState(0);
  const [expDisplayIndex, setExpDisplayIndex] = useState(0);
  type FadeState = "visible" | "fading-out" | "fading-in";
  const [expFadeState, setExpFadeState] = useState<FadeState>("visible");
  const expAnimating = useRef(false);

  const goToExp = useCallback(
    (nextIndex: number) => {
      if (expAnimating.current || nextIndex === expActiveIndex) return;
      expAnimating.current = true;
      setExpFadeState("fading-out");
      setTimeout(() => {
        setExpDisplayIndex(nextIndex);
        setExpActiveIndex(nextIndex);
        setExpFadeState("fading-in");
        setTimeout(() => {
          setExpFadeState("visible");
          expAnimating.current = false;
        }, 400);
      }, 350);
    },
    [expActiveIndex]
  );

  const goPrevExp = () => goToExp((expActiveIndex - 1 + EXPERIENCES.length) % EXPERIENCES.length);
  const goNextExp = () => goToExp((expActiveIndex + 1) % EXPERIENCES.length);
  const exp = EXPERIENCES[expDisplayIndex];
  const expCardOpacity = expFadeState === "visible" ? 1 : 0;
  const expCardTranslateY = expFadeState === "fading-out" ? "-12px" : expFadeState === "fading-in" ? "12px" : "0px";

  /* ── Typewriter ────────────────────────────────────────────── */
  const { line1, line2, cursorOnLine, buttonsVisible } = useTypewriter();

  /* ── Frame loading ─────────────────────────────────────────── */
  const loadFrame = useCallback((frameNum: number) => {
    if (frameNum < 1 || frameNum > TOTAL_FRAMES) return;
    if (loadedRef.current[frameNum]) return;
    loadedRef.current[frameNum] = true;
    const img = new window.Image();
    img.src = `/frame/${String(frameNum).padStart(5, "0")}.webp`;
    img.onload = () => { imagesRef.current[frameNum] = img; };
  }, []);

  /* Pick up Loader‑preloaded hero frames */
  useEffect(() => {
    const preloaded = (window as unknown as Record<string, unknown>).__preloadedFrames as (HTMLImageElement | null)[] | undefined;
    if (preloaded && preloaded.length > 0) {
      for (let i = 1; i <= Math.min(104, TOTAL_FRAMES); i++) {
        if (preloaded[i]) { imagesRef.current[i] = preloaded[i]; loadedRef.current[i] = true; }
      }
      const canvas = canvasRef.current;
      const ctx = canvas?.getContext("2d");
      const firstImg = imagesRef.current[1];
      if (ctx && canvas && firstImg) {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        ctx.drawImage(firstImg, 0, 0, canvas.width, canvas.height);
        lastDrawRef.current = { base: 1, blend: 0 };
      }
    } else {
      for (let i = 1; i <= Math.min(20, TOTAL_FRAMES); i++) loadFrame(i);
    }
  }, [loadFrame]);

  /* Canvas resize */
  useEffect(() => {
    const resize = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      lastDrawRef.current = { base: -1, blend: -1 };
    };
    resize();
    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  }, []);

  /* ── Main scroll + render loop ─────────────────────────────── */
  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const totalScroll = rect.height - window.innerHeight;
      scrollRef.current = Math.max(0, Math.min(1, -rect.top / totalScroll));
    };

    const tick = () => {
      const p = scrollRef.current;

      /* ── Frame rendering ── */
      const exactFrame = p * (TOTAL_FRAMES - 1) + 1;
      const baseFrame = Math.max(1, Math.min(TOTAL_FRAMES, Math.floor(exactFrame)));
      const nextFrame = Math.max(1, Math.min(TOTAL_FRAMES, baseFrame + 1));
      const blend = Math.round((exactFrame - baseFrame) * 100) / 100;

      for (let i = baseFrame; i <= Math.min(TOTAL_FRAMES, baseFrame + PRELOAD_AHEAD); i++) loadFrame(i);

      const last = lastDrawRef.current;
      if (baseFrame !== last.base || Math.abs(blend - last.blend) > 0.005) {
        const canvas = canvasRef.current;
        const ctx = canvas?.getContext("2d");
        const baseImg = imagesRef.current[baseFrame];
        const nextImg = imagesRef.current[nextFrame];
        if (ctx && baseImg) {
          const w = canvas!.width;
          const h = canvas!.height;
          ctx.globalAlpha = 1;
          ctx.drawImage(baseImg, 0, 0, w, h);
          if (nextImg && blend > 0) {
            ctx.globalAlpha = blend;
            ctx.drawImage(nextImg, 0, 0, w, h);
            ctx.globalAlpha = 1;
          }
          lastDrawRef.current = { base: baseFrame, blend };
        }
      }

      // ── Content overlay opacities ── (ganti bagian di dalam tick())
      const heroOpacity = calcOpacity(p, HERO_FADE_IN, HERO_FULL_START, HERO_FULL_END, HERO_FADE_OUT);
      const heroScale = 1 - smoothstep(p) * 0.12;

      const aboutOpacity = calcOpacity(p, ABOUT_FADE_IN, ABOUT_FULL_START, ABOUT_FULL_END, ABOUT_FADE_OUT);
      const aboutTY = aboutOpacity < 1 && p < ABOUT_FULL_START
        ? 40 * (1 - aboutOpacity)
        : aboutOpacity < 1 && p > ABOUT_FULL_END
          ? -20 * (1 - aboutOpacity)
          : 0;

      const skillsOpacity = calcOpacity(p, SKILLS_FADE_IN, SKILLS_FULL_START, SKILLS_FULL_END, SKILLS_FADE_OUT);
      const skillsTY = skillsOpacity < 1 && p < SKILLS_FULL_START
        ? 40 * (1 - skillsOpacity)
        : skillsOpacity < 1 && p > SKILLS_FULL_END
          ? -20 * (1 - skillsOpacity)
          : 0;

      const expOpacity = calcOpacity(p, EXP_FADE_IN, EXP_FULL_START, EXP_FULL_END, EXP_FADE_OUT);
      const expTY = expOpacity < 1 && p < EXP_FULL_START
        ? 40 * (1 - expOpacity)
        : 0;

      const contentOverlay = Math.max(aboutOpacity, skillsOpacity, expOpacity) * 0.72;

      // Apply styles
      if (heroRef.current) {
        heroRef.current.style.opacity = String(heroOpacity);
        heroRef.current.style.transform = `scale(${heroScale.toFixed(4)})`;
        heroRef.current.style.pointerEvents = heroOpacity < 0.3 ? "none" : "auto";
      }
      if (aboutRef.current) {
        aboutRef.current.style.opacity = String(aboutOpacity.toFixed(4));
        aboutRef.current.style.transform = `translateY(${aboutTY.toFixed(2)}px)`;
        aboutRef.current.style.pointerEvents = aboutOpacity < 0.3 ? "none" : "auto";
      }
      if (skillsRef.current) {
        skillsRef.current.style.opacity = String(skillsOpacity.toFixed(4));
        skillsRef.current.style.transform = `translateY(${skillsTY.toFixed(2)}px)`;
        skillsRef.current.style.pointerEvents = skillsOpacity < 0.3 ? "none" : "auto";
      }
      if (experienceRef.current) {
        experienceRef.current.style.opacity = String(expOpacity.toFixed(4));
        experienceRef.current.style.transform = `translateY(${expTY.toFixed(2)}px)`;
        experienceRef.current.style.pointerEvents = expOpacity < 0.3 ? "none" : "auto";
      }
      if (overlayRef.current) {
        overlayRef.current.style.opacity = String(contentOverlay.toFixed(4));
      }

      rafRef.current = requestAnimationFrame(tick);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    rafRef.current = requestAnimationFrame(tick);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [loadFrame]);

  /* ═══════════════════════════════════════════════════════════
     RENDER
     ═══════════════════════════════════════════════════════════ */
  return (
    <section
      id="home"
      ref={containerRef}
      className="relative w-full"
      style={{ height: "1500vh" }}
    >
      {/* Navigation anchor points (calculated for 1500vh height where total scroll = 1400vh) */}
      <div id="about" className="absolute left-0 w-0 h-0" style={{ top: "14.93%" }} />   {/* aligns with p=0.16 */}
      <div id="skills" className="absolute left-0 w-0 h-0" style={{ top: "51.33%" }} />  {/* aligns with p=0.55 */}
      <div id="experience" className="absolute left-0 w-0 h-0" style={{ top: "79.33%" }} /> {/* aligns with p=0.85 */}

      {/* ── STICKY VIEWPORT ── */}
      <div className="sticky top-0 w-full h-screen overflow-hidden" style={{ zIndex: 1 }}>

        {/* Canvas */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full"
          style={{ display: "block", objectFit: "cover" }}
        />

        {/* Cinematic overlays */}
        <div className="absolute inset-0 bg-gradient-to-b from-[rgba(15,10,26,0.3)] via-transparent to-[rgba(15,10,26,0.6)] pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-r from-[rgba(15,10,26,0.4)] via-transparent to-[rgba(15,10,26,0.4)] pointer-events-none" />
        <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse at center, transparent 50%, rgba(15,10,26,0.6) 100%)" }} />

        {/* Dark overlay — controlled by content visibility */}
        <div
          ref={overlayRef}
          className="absolute inset-0 z-[1] pointer-events-none"
          style={{ background: "rgba(7, 4, 13, 0.85)", opacity: 0 }}
        />

        {/* Floating particles */}
        <div className="absolute inset-0 z-[1] pointer-events-none overflow-hidden">
          {PARTICLE_DATA.map((pt, i) => (
            <div
              key={i}
              className="absolute rounded-full"
              style={{
                width: `${pt.width}px`, height: `${pt.height}px`,
                left: `${pt.left}%`, top: `${pt.top}%`,
                background: `rgba(245, 158, 11, ${pt.opacity})`,
                animation: `float ${pt.duration}s ease-in-out infinite`,
                animationDelay: `${pt.delay}s`,
              }}
            />
          ))}
        </div>

        {/* ════════════════════════════════════════════════════
           HERO CONTENT
           ════════════════════════════════════════════════════ */}
        <div
          ref={heroRef}
          className="absolute inset-0 z-10 flex flex-row items-center justify-start px-6 lg:pl-44 gap-88"
          style={{ opacity: 1, transform: "scale(1)", willChange: "opacity, transform" }}
        >
          <div className="relative z-10 flex flex-col items-center lg:items-start justify-center text-center lg:text-left max-w-xl">
            <div className="animate-fade-in-up" style={{ animationDelay: "0.2s", animationFillMode: "both" }}>
              <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full glass mb-6 border border-[rgba(245,158,11,0.2)]" />
            </div>
            <div className="animate-fade-in-up" style={{ animationDelay: "0.5s", animationFillMode: "both" }}>
              <h1 className="font-black tracking-tight mb-6" style={{ fontSize: "clamp(3rem, 8vw, 6rem)", lineHeight: 1.05 }}>
                <div className="block text-[var(--text-primary)] drop-shadow-[0_0_30px_rgba(245,158,11,0.15)]" style={{ minHeight: "1.05em" }}>
                  {line1 || <span className="invisible">R</span>}
                  {cursorOnLine === 1 && <Cursor />}
                </div>
                <div className="block text-[var(--text-primary)] drop-shadow-[0_0_30px_rgba(245,158,11,0.15)]" style={{ minHeight: "1.05em" }}>
                  {line2 || <span className="invisible">A</span>}
                  {cursorOnLine === 2 && <Cursor />}
                </div>
              </h1>
            </div>
            <div
              className="flex mt-8 flex-col sm:flex-row gap-4"
              style={{
                opacity: buttonsVisible ? 1 : 0,
                transform: buttonsVisible ? "translateY(0px)" : "translateY(14px)",
                transition: "opacity 0.6s ease, transform 0.6s ease",
                pointerEvents: buttonsVisible ? "auto" : "none",
              }}
            >
              <a href="#skills" className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-gradient-to-r from-[var(--accent-orange)] to-[var(--accent-pink)] text-white font-semibold text-sm transition-all duration-300 hover:scale-105 hover:shadow-[0_0_40px_rgba(245,158,11,0.3)]">
                Explore My Skills
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 5v14M19 12l-7 7-7-7" /></svg>
              </a>
              <a href="#chat" className="inline-flex items-center gap-3 px-8 py-4 rounded-full glass text-[var(--text-primary)] font-semibold text-sm transition-all duration-300 hover:scale-105 hover:bg-[rgba(255,255,255,0.1)] border border-[var(--glass-border)]">
                Chat With Me
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" /></svg>
              </a>
            </div>
          </div>
          <div className="hidden lg:flex justify-center items-center" />
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2">
          <span className="text-[10px] text-[var(--text-secondary)] tracking-[0.3em] uppercase">Scroll</span>
          <div className="w-5 h-9 rounded-full border border-[var(--text-secondary)] flex justify-center pt-2 opacity-50">
            <div className="w-1 h-1 rounded-full bg-[var(--accent-orange)] animate-bounce" />
          </div>
        </div>

        {/* ════════════════════════════════════════════════════
           ABOUT CONTENT
           ════════════════════════════════════════════════════ */}
        <div
          ref={aboutRef}
          className="absolute inset-0 z-10 flex items-center px-6"
          style={{ opacity: 0, transform: "translateY(40px)", willChange: "opacity, transform", pointerEvents: "none" }}
        >
          <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass mb-6 border border-[rgba(168,85,247,0.2)]">
                <span className="text-xs font-medium tracking-[0.2em] uppercase text-[var(--accent-purple)]">About Me</span>
              </div>
              <h2 className="text-4xl md:text-6xl font-black leading-[1.05] mb-8 tracking-tight">
                <span className="gradient-text">Who</span>{" "}
                <span className="text-[var(--text-primary)]">Am I?</span>
              </h2>
              <div className="space-y-4 text-[var(--text-secondary)] text-sm md:text-base leading-relaxed">
                <p>Saya adalah seorang Full Stack Developer yang berfokus pada pengembangan aplikasi web yang modern, scalable, dan user-friendly.</p>
                <p>Berpengalaman dalam menggunakan berbagai teknologi seperti Laravel, JavaScript, dan framework modern untuk membangun solusi digital yang efisien dan terstruktur dengan baik.</p>
                <p>Saya selalu tertarik untuk mempelajari teknologi baru, meningkatkan kualitas kode, dan berkontribusi dalam menciptakan produk digital yang memberikan nilai nyata bagi pengguna.</p>
              </div>
            </div>
          </div>
        </div>

        {/* ════════════════════════════════════════════════════
           SKILLS CONTENT
           ════════════════════════════════════════════════════ */}
        <div
          ref={skillsRef}
          className="absolute inset-0 z-10 flex items-center justify-center px-8"
          style={{ opacity: 0, transform: "translateY(40px)", willChange: "opacity, transform", pointerEvents: "none" }}
        >
          <div className="max-w-5xl w-full">
            {/* Header */}
            <div className="text-center mb-14">
              <div className="section-label glass border-[rgba(245,158,11,0.15)] text-[var(--accent-orange)]">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M16 18l6-6-6-6M8 6l-6 6 6 6" /></svg>
                My Skills
              </div>
              <h2 className="section-title mb-4"><span className="text-white">Tech Stack</span></h2>
            </div>

            {/* Info Card */}
            <div className="flex justify-center mb-12">
              <div
                className="flex items-center gap-5 px-8 py-4 rounded-2xl border backdrop-blur-xl transition-all duration-500"
                style={{
                  background: "rgba(0,0,0,0.85)",
                  borderColor: `${selectedSkill.color}40`,
                  boxShadow: `0 0 40px ${selectedSkill.color}20`,
                  minWidth: "260px",
                }}
              >
                <img src={selectedSkill.icon} alt={selectedSkill.name} className="w-12 h-12 rounded-xl object-contain" style={{ filter: `drop-shadow(0 0 8px ${selectedSkill.color}80)` }} />
                <div className="flex-1">
                  <p className="text-white font-bold text-lg">{selectedSkill.name}</p>
                  <p className="text-[10px] uppercase tracking-widest mb-2" style={{ color: selectedSkill.color }}>{selectedSkill.category}</p>
                  <div className="w-full h-1.5 rounded-full bg-white/5 overflow-hidden">
                    <div className="h-full rounded-full transition-all duration-700" style={{ width: `${selectedSkill.level}%`, background: `linear-gradient(90deg, ${selectedSkill.color}, ${selectedSkill.color}60)`, boxShadow: `0 0 8px ${selectedSkill.color}` }} />
                  </div>
                  <p className="text-[10px] mt-1" style={{ color: selectedSkill.color }}>{selectedSkill.level}% Proficiency</p>
                </div>
              </div>
            </div>

            {/* Carousel */}
            <div
              className="relative flex items-center justify-center"
              style={{ height: "160px" }}
              onTouchStart={(e) => setSkillStartX(e.touches[0].clientX)}
              onTouchEnd={(e) => { const dx = skillStartX - e.changedTouches[0].clientX; if (Math.abs(dx) > 40) { dx > 0 ? goNextSkill() : goPrevSkill(); } }}
              onMouseDown={(e) => { setSkillDragging(false); setSkillStartX(e.clientX); }}
              onMouseMove={() => setSkillDragging(true)}
              onMouseUp={(e) => { if (!skillDragging) return; const dx = skillStartX - e.clientX; if (Math.abs(dx) > 40) { dx > 0 ? goNextSkill() : goPrevSkill(); } }}
            >
              <button onClick={goPrevSkill} disabled={skillIndex === 0} className="absolute left-0 z-20 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300" style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", opacity: skillIndex === 0 ? 0.2 : 1, cursor: skillIndex === 0 ? "not-allowed" : "pointer" }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5"><path d="M15 18l-6-6 6-6" /></svg>
              </button>

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
                      onClick={() => setSkillIndex(idx)}
                      className="relative rounded-full flex items-center justify-center cursor-pointer"
                      style={{
                        width: `${size}px`, height: `${size}px`, flexShrink: 0, opacity,
                        transition: "all 0.5s cubic-bezier(0.34,1.56,0.64,1)",
                        background: isCenter ? `radial-gradient(circle at 30% 30%, ${skill.color}25, rgba(13,10,23,0.95))` : "rgba(0,0,0,0.5)",
                        border: `2px solid ${isCenter ? skill.color : "rgba(255,255,255,0.07)"}`,
                        boxShadow: isCenter ? `0 0 40px ${skill.color}50, 0 0 80px ${skill.color}20, inset 0 0 30px ${skill.color}10` : "none",
                        filter: abs >= 3 ? "blur(0.5px)" : "none",
                      }}
                    >
                      {isCenter && (
                        <div className="absolute inset-0 rounded-full animate-ping" style={{ background: `radial-gradient(circle, ${skill.color}15, transparent)`, animationDuration: "2s" }} />
                      )}
                      <img src={skill.icon} alt={skill.name} className="object-contain rounded-full" style={{ width: `${imgSize}px`, height: `${imgSize}px`, filter: isCenter ? `drop-shadow(0 0 10px ${skill.color}90)` : "none", transition: "all 0.5s cubic-bezier(0.34,1.56,0.64,1)" }} />
                    </div>
                  );
                })}
              </div>

              <button onClick={goNextSkill} disabled={skillIndex === SKILLS.length - 1} className="absolute right-0 z-20 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300" style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", opacity: skillIndex === SKILLS.length - 1 ? 0.2 : 1, cursor: skillIndex === SKILLS.length - 1 ? "not-allowed" : "pointer" }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5"><path d="M9 18l6-6-6-6" /></svg>
              </button>
            </div>

            {/* Dots */}
            <div className="flex justify-center gap-2 mt-8">
              {SKILLS.map((_, i) => (
                <button key={i} onClick={() => setSkillIndex(i)} className="rounded-full transition-all duration-300" style={{ width: i === skillIndex ? "20px" : "6px", height: "6px", background: i === skillIndex ? selectedSkill.color : "rgba(255,255,255,0.15)", boxShadow: i === skillIndex ? `0 0 8px ${selectedSkill.color}` : "none" }} />
              ))}
            </div>
          </div>
        </div>

        {/* ════════════════════════════════════════════════════
           EXPERIENCE CONTENT
           ════════════════════════════════════════════════════ */}
        <div
          ref={experienceRef}
          className="absolute inset-0 z-10 flex items-center"
          style={{ opacity: 0, transform: "translateY(40px)", willChange: "opacity, transform", pointerEvents: "none" }}
        >
          <div className="w-full max-w-7xl mx-auto px-6 lg:px-12 flex flex-col lg:flex-row items-center gap-8">
            {/* LEFT */}
            <div className="lg:w-1/2 flex flex-col">
              {/* Header */}
              <div className="mb-8">
                <div className="section-label glass border-[rgba(168,85,247,0.15)] text-[var(--accent-purple)]">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M2 3h6a4 4 0 014 4v14a3 3 0 00-3-3H2z" /><path d="M22 3h-6a4 4 0 00-4 4v14a3 3 0 013-3h7z" /></svg>
                  Experience
                </div>
                <h2 className="section-title mb-2"><span className="text-white">Work Journey</span></h2>
                <p className="text-[rgba(255,255,255,0.5)] text-sm leading-relaxed max-w-md">Perjalanan karir saya di berbagai perusahaan dan project</p>
              </div>

              {/* Card */}
              <div style={{ opacity: expCardOpacity, transform: `translateY(${expCardTranslateY})`, transition: "opacity 350ms ease, transform 350ms ease", minHeight: "320px" }}>
                <div className="group relative rounded-2xl overflow-hidden border border-[rgba(255,255,255,0.08)] hover:border-[rgba(255,255,255,0.15)] transition-colors duration-500 card-shine" style={{ background: "rgba(7,4,13,0.8)", backdropFilter: "blur(24px)", boxShadow: `0 8px 60px ${exp.color}15, 0 0 0 1px rgba(255,255,255,0.04)` }}>
                  <div className="relative h-36 overflow-hidden">
                    <img src={exp.image} alt={exp.company} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }} />
                    <div className="absolute inset-0" style={{ background: `linear-gradient(to bottom, rgba(7,4,13,0.1) 0%, rgba(7,4,13,0.5) 60%, rgba(7,4,13,0.95) 100%)` }} />
                    <div className="absolute inset-0 opacity-20 group-hover:opacity-30 transition-opacity duration-500" style={{ background: `linear-gradient(135deg, ${exp.color}40, transparent)` }} />
                    <div className="absolute top-3 right-3">
                      <div className="flex items-center gap-1.5 px-3 py-1 rounded-full backdrop-blur-md" style={{ background: "rgba(0,0,0,0.5)", border: `1px solid ${exp.color}40` }}>
                        <div className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: exp.color }} />
                        <span className="text-[10px] font-semibold" style={{ color: exp.color }}>{exp.period}</span>
                      </div>
                    </div>
                  </div>
                  <div className="px-7 pb-7 -mt-1">
                    <div className={`h-0.5 bg-gradient-to-r ${exp.accentGradient} rounded-full mb-5 w-12 transition-all duration-500 group-hover:w-full`} />
                    <h3 className="text-xl font-bold text-white mb-1">{exp.role}</h3>
                    <p className="text-xs font-semibold tracking-wide mb-4" style={{ color: `${exp.color}cc` }}>{exp.company}</p>
                    <p className="text-xs text-[rgba(255,255,255,0.6)] leading-relaxed mb-6">{exp.description}</p>
                    <div className="flex flex-wrap gap-1.5">
                      {exp.tags.map((tag) => (
                        <span key={tag} className="px-3 py-1 rounded-full bg-[rgba(255,255,255,0.06)] text-[10px] font-semibold text-[rgba(255,255,255,0.7)] border border-[rgba(255,255,255,0.08)] group-hover:border-[rgba(255,255,255,0.15)] transition-colors">{tag}</span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Controls */}
              <div className="flex items-center gap-4 mt-6">
                <button onClick={goPrevExp} className="flex items-center justify-center w-9 h-9 rounded-full border border-[rgba(255,255,255,0.12)] bg-[rgba(255,255,255,0.05)] hover:bg-[rgba(255,255,255,0.1)] hover:border-[rgba(255,255,255,0.25)] transition-all duration-200" aria-label="Previous">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.7)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6" /></svg>
                </button>
                <div className="flex gap-2 items-center">
                  {EXPERIENCES.map((e, i) => (
                    <button key={i} onClick={() => goToExp(i)} className="rounded-full transition-all duration-500" style={{ width: i === expActiveIndex ? "28px" : "8px", height: "8px", background: i === expActiveIndex ? exp.color : "rgba(255,255,255,0.15)", boxShadow: i === expActiveIndex ? `0 0 12px ${exp.color}` : "none", border: "none", padding: 0, cursor: "pointer" }} aria-label={`Go to ${e.company}`} />
                  ))}
                </div>
                <button onClick={goNextExp} className="flex items-center justify-center w-9 h-9 rounded-full border border-[rgba(255,255,255,0.12)] bg-[rgba(255,255,255,0.05)] hover:bg-[rgba(255,255,255,0.1)] hover:border-[rgba(255,255,255,0.25)] transition-all duration-200" aria-label="Next">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.7)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6" /></svg>
                </button>
                <span className="ml-1 text-[10px] text-[rgba(255,255,255,0.4)] tracking-widest uppercase">{expActiveIndex + 1} / {EXPERIENCES.length}</span>
              </div>
            </div>
            <div className="hidden lg:block lg:w-1/2" />
          </div>
        </div>

      </div>

      {/* Keyframes */}
      <style>{`
        @keyframes blink-cursor {
          from, to { opacity: 1; }
          50%      { opacity: 0; }
        }
      `}</style>
    </section>
  );
}
