"use client";

import { useEffect, useRef, useCallback } from "react";

const PRELOAD_AHEAD = 15;

interface FrameTransitionProps {
  startFrame: number;
  endFrame: number;
  scrollHeight?: string;
}

export default function FrameTransition({
  startFrame,
  endFrame,
  scrollHeight = "300vh",
}: FrameTransitionProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const totalFrames = endFrame - startFrame + 1;
  const imagesRef = useRef<(HTMLImageElement | null)[]>([]);
  const loadedRef = useRef<boolean[]>([]);

  const rafRef = useRef<number | null>(null);
  const scrollRef = useRef(0);
  const lastDrawRef = useRef({ base: -1, blend: -1 });

  // Initialize arrays once
  useEffect(() => {
    imagesRef.current = Array(totalFrames).fill(null);
    loadedRef.current = Array(totalFrames).fill(false);
  }, [totalFrames]);

  const loadFrame = useCallback(
    (frameNum: number) => {
      if (frameNum < startFrame || frameNum > endFrame) return;
      const idx = frameNum - startFrame;
      if (loadedRef.current[idx]) return;
      loadedRef.current[idx] = true;
      const img = new window.Image();
      img.src = `/frame/${String(frameNum).padStart(5, "0")}.webp`;
      img.onload = () => {
        imagesRef.current[idx] = img;
      };
    },
    [startFrame, endFrame]
  );

  // Preload first batch when component mounts
  useEffect(() => {
    for (
      let i = startFrame;
      i <= Math.min(startFrame + 20, endFrame);
      i++
    ) {
      loadFrame(i);
    }
  }, [startFrame, endFrame, loadFrame]);

  // Canvas resize handler
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

  // Main scroll + render loop
  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const scrollableDistance = rect.height - window.innerHeight;
      if (scrollableDistance <= 0) return;
      scrollRef.current = Math.max(
        0,
        Math.min(1, -rect.top / scrollableDistance)
      );
    };

    const tick = () => {
      const p = scrollRef.current;

      const exactFrame = p * (totalFrames - 1);
      const baseIdx = Math.max(
        0,
        Math.min(totalFrames - 1, Math.floor(exactFrame))
      );
      const nextIdx = Math.max(
        0,
        Math.min(totalFrames - 1, baseIdx + 1)
      );
      const blend =
        Math.round((exactFrame - baseIdx) * 100) / 100;

      // Preload ahead from current position
      const currentFrameNum = startFrame + baseIdx;
      for (
        let i = currentFrameNum;
        i <= Math.min(endFrame, currentFrameNum + PRELOAD_AHEAD);
        i++
      ) {
        loadFrame(i);
      }

      const last = lastDrawRef.current;
      if (
        baseIdx !== last.base ||
        Math.abs(blend - last.blend) > 0.005
      ) {
        const canvas = canvasRef.current;
        const ctx = canvas?.getContext("2d");
        const baseImg = imagesRef.current[baseIdx];
        const nextImg = imagesRef.current[nextIdx];

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
          lastDrawRef.current = { base: baseIdx, blend };
        }
      }

      rafRef.current = requestAnimationFrame(tick);
    };

    window.addEventListener("scroll", handleScroll, {
      passive: true,
    });
    rafRef.current = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [totalFrames, startFrame, endFrame, loadFrame]);

  return (
    <div
      ref={containerRef}
      className="relative w-full"
      style={{ height: scrollHeight }}
    >
      <div className="sticky top-0 w-full h-screen overflow-hidden">
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full"
          style={{ display: "block", objectFit: "cover" }}
        />
        {/* Subtle cinematic overlays for continuity */}
        <div className="absolute inset-0 bg-gradient-to-b from-[rgba(15,10,26,0.15)] via-transparent to-[rgba(15,10,26,0.15)] pointer-events-none" />
      </div>
    </div>
  );
}
