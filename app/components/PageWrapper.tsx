"use client";

import { useState, useCallback, useEffect } from "react";
import Loader from "./Loader";

export default function PageWrapper({ children }: { children: React.ReactNode }) {
    const [loaded, setLoaded] = useState(false);

    const handleFinish = useCallback(() => {
        setLoaded(true);
    }, []);

    // Prevent scrolling during loader
    useEffect(() => {
        if (!loaded) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }
        return () => { document.body.style.overflow = ""; };
    }, [loaded]);

    return (
        <>
            {!loaded && <Loader onFinish={handleFinish} />}
            {/* Website content always rendered — visible behind the curtain when it opens */}
            {children}
        </>
    );
}
