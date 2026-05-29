import { useLayoutEffect, useRef, useState } from "react";

const MIN_THUMB = 36;

/**
 * Thumb alinhado ao `Divisor` vertical: `w-1`, pílula `rounded-full`, `bg-highlight-primary/50`.
 * Trilho fino `bg-highlight-primary/15`.
 */
export default function WindowScrollbar() {
    const trackRef = useRef(null);
    const [{ scrollable, thumbH, thumbTop }, setMetrics] = useState({
        scrollable: false,
        thumbH: MIN_THUMB,
        thumbTop: 0,
    });

    useLayoutEffect(() => {
        let raf = 0;

        const tick = () => {
            raf = 0;
            const root = document.documentElement;
            const track = trackRef.current;
            const trackH = track?.clientHeight ?? 0;
            const scrollHeight = root.scrollHeight;
            const clientHeight = root.clientHeight;

            const canScroll = scrollHeight > clientHeight + 3 && trackH > 0;

            if (!canScroll) {
                setMetrics({
                    scrollable: false,
                    thumbH: MIN_THUMB,
                    thumbTop: 0,
                });
                return;
            }

            let h = Math.round((clientHeight / scrollHeight) * trackH);
            h = Math.min(trackH, Math.max(MIN_THUMB, h));

            const maxScroll = scrollHeight - clientHeight;
            const top =
                maxScroll <= 0 ? 0 : (root.scrollTop / maxScroll) * (trackH - h);

            setMetrics({ scrollable: true, thumbH: h, thumbTop: top });
        };

        const schedule = () => {
            if (!raf) raf = requestAnimationFrame(tick);
        };

        schedule();
        window.addEventListener("scroll", schedule, { passive: true });
        window.addEventListener("resize", schedule);

        const obs =
            typeof ResizeObserver !== "undefined"
                ? new ResizeObserver(schedule)
                : null;
        obs?.observe(document.documentElement);
        obs?.observe(document.body);
        const tr = trackRef.current;
        if (tr) obs?.observe(tr);

        return () => {
            window.removeEventListener("scroll", schedule);
            window.removeEventListener("resize", schedule);
            obs?.disconnect();
            if (raf) cancelAnimationFrame(raf);
        };
    }, []);

    return (
        <div
            aria-hidden
            className="pointer-events-none fixed top-28 right-3 bottom-20 z-60 hidden w-4 md:flex md:justify-center md:right-5"
        >
            <div
                ref={trackRef}
                className={`relative h-full w-1 shrink-0 rounded-full ${
                    scrollable ? "" : "bg-transparent"
                }`}
            >
                {scrollable ? (
                    <div
                        className="absolute left-0 w-1 rounded-full bg-highlight-primary/50"
                        style={{
                            height: `${thumbH}px`,
                            top: `${thumbTop}px`,
                        }}
                    />
                ) : null}
            </div>
        </div>
    );
}
