import { useEffect, useState } from "react";
import { ABOUT_COUNT_DURATION_MS, ABOUT_COUNT_EASE_POWER } from "@/constants/aboutMotion";

function easeOutCubic(t) {
    return 1 - (1 - t) ** ABOUT_COUNT_EASE_POWER;
}

/**
 * Contagem progressiva de `from` até `target` (evita 0→2025 no ano).
 */
export function useCountUp(
    target,
    {
        enabled = false,
        durationMs = ABOUT_COUNT_DURATION_MS,
        from = 0,
    } = {},
) {
    const startValue = Math.min(from, target);
    const [display, setDisplay] = useState(startValue);

    useEffect(() => {
        if (!enabled) {
            setDisplay(startValue);
            return;
        }

        if (target <= startValue) {
            setDisplay(target);
            return;
        }

        let frame = null;
        const startTime = performance.now();
        const delta = target - startValue;

        const tick = (now) => {
            const progress = Math.min((now - startTime) / durationMs, 1);
            const eased = easeOutCubic(progress);
            setDisplay(Math.round(startValue + delta * eased));

            if (progress < 1) {
                frame = requestAnimationFrame(tick);
            } else {
                setDisplay(target);
            }
        };

        setDisplay(startValue);
        frame = requestAnimationFrame(tick);

        return () => {
            if (frame !== null) cancelAnimationFrame(frame);
        };
    }, [enabled, target, durationMs, startValue]);

    return display;
}
