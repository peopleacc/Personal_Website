"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Hook that tracks whether a section is in the viewport.
 * Returns `true` when visible (fade in), `false` when not (fade out).
 */
export function useFadeOnScroll(threshold = 0.15) {
    const ref = useRef<HTMLDivElement>(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                setIsVisible(entry.isIntersecting);
            },
            { threshold }
        );
        if (ref.current) observer.observe(ref.current);
        return () => observer.disconnect();
    }, [threshold]);

    return { ref, isVisible };
}
