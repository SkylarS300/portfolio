import { useEffect, useRef } from "react";

type StarfieldProps = {
    /** 0–1 multiplier for density */
    density?: number;
    /** 0–2 speed multiplier */
    speed?: number;
    /** Parallax follow with mouse */
    parallax?: boolean;
    /** Extra classes (e.g., opacity, blend modes) */
    className?: string;
};

/**
 * Lightweight canvas starfield with optional parallax.
 * Reacts to `window.dispatchEvent(new CustomEvent("stars:theme", { detail: { theme } }))`
 * where theme ∈ {"neutral","sky","fuchsia","emerald","amber","violet","rose"}.
 */
export default function Starfield({
    density = 0.7,
    speed = 1,
    parallax = true,
    className = "",
}: StarfieldProps) {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const rafRef = useRef<number | null>(null);
    const tintHueRef = useRef<number | null>(null); // null = white
    const densityBoostRef = useRef<number>(1);

    useEffect(() => {
        const canvas = canvasRef.current!;
        const ctx = canvas.getContext("2d")!;
        let w = (canvas.width = canvas.offsetWidth);
        let h = (canvas.height = canvas.offsetHeight);

        function onResize() {
            w = canvas.width = canvas.offsetWidth;
            h = canvas.height = canvas.offsetHeight;
            init();
        }
        const resizeObserver = new ResizeObserver(onResize);
        resizeObserver.observe(canvas);

        type Star = { x: number; y: number; z: number; vx: number; vy: number; size: number };
        let stars: Star[] = [];
        const baseCount = 120; // perf-tuned baseline
        let mx = 0,
            my = 0; // mouse normalized (-1..1)

        function makeCount() {
            return Math.floor(baseCount * density * densityBoostRef.current);
        }

        function init() {
            const count = makeCount();
            stars = Array.from({ length: count }).map(() => ({
                x: Math.random() * w,
                y: Math.random() * h,
                z: Math.random() * 0.8 + 0.2, // depth 0.2..1.0
                vx: (Math.random() - 0.5) * 0.15,
                vy: (Math.random() - 0.5) * 0.15,
                size: Math.random() * 1.4 + 0.4,
            }));
        }
        init();

        function tick() {
            ctx.clearRect(0, 0, w, h);
            for (const s of stars) {
                // parallax drift
                const px = parallax ? mx * (1 - s.z) * 0.6 : 0;
                const py = parallax ? my * (1 - s.z) * 0.6 : 0;
                s.x += s.vx * speed + px * 0.02;
                s.y += s.vy * speed + py * 0.02;

                // wrap
                if (s.x < -2) s.x = w + 2;
                if (s.x > w + 2) s.x = -2;
                if (s.y < -2) s.y = h + 2;
                if (s.y > h + 2) s.y = -2;

                // draw
                ctx.globalAlpha = 0.6 + 0.4 * s.z;
                const hue = tintHueRef.current;
                if (hue == null) {
                    ctx.fillStyle = "#ffffff";
                } else {
                    const light = Math.round(70 + s.z * 20); // 70–90%
                    ctx.fillStyle = `hsl(${hue} 90% ${light}%)`;
                }
                ctx.beginPath();
                ctx.arc(s.x, s.y, s.size * s.z, 0, Math.PI * 2);
                ctx.fill();
            }
            rafRef.current = requestAnimationFrame(tick);
        }
        rafRef.current = requestAnimationFrame(tick);

        function onMove(e: MouseEvent) {
            const rect = canvas.getBoundingClientRect();
            const cx = rect.left + rect.width / 2;
            const cy = rect.top + rect.height / 2;
            mx = ((e.clientX - cx) / rect.width) * 2; // -1..1
            my = ((e.clientY - cy) / rect.height) * 2;
        }
        if (parallax) window.addEventListener("mousemove", onMove);

        // React to Skills page theme hints
        function onTheme(e: Event) {
            const detail = (e as CustomEvent).detail || {};
            const theme = String(detail.theme || "neutral");
            const map: Record<string, number | null> = {
                neutral: null,
                sky: 195,
                fuchsia: 300,
                emerald: 150,
                amber: 45,
                violet: 265,
                rose: 345,
            };
            tintHueRef.current = theme in map ? (map as any)[theme] : null;
            densityBoostRef.current = theme === "neutral" ? 1 : 1.1; // subtle pop
            init();
        }
        window.addEventListener("stars:theme", onTheme as EventListener);

        return () => {
            if (rafRef.current) cancelAnimationFrame(rafRef.current);
            resizeObserver.disconnect();
            if (parallax) window.removeEventListener("mousemove", onMove);
            window.removeEventListener("stars:theme", onTheme as EventListener);
        };
    }, [density, speed, parallax]);

    return (
        <canvas
            ref={canvasRef}
            className={`absolute inset-0 w-full h-full pointer-events-none ${className}`}
            aria-hidden="true"
        />
    );
}
