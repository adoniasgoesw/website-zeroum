import { TbRazorElectric } from "react-icons/tb";
import { useCallback, useEffect, useRef, useState } from "react";

/** Zona clicável transparente (WCAG ~44px); ícone sem caixa */
const DRAG_HIT = 44;

export default function CustomScrollbar() {
    const trackRef = useRef(null);
    const dragRef = useRef(false);
    const offsetRef = useRef(0);

    const [mounted, setMounted] = useState(false);
    const [visible, setVisible] = useState(false);
    const [thumbTop, setThumbTop] = useState(0);

    const updateThumb = useCallback(() => {
        const doc = document.documentElement;
        const maxScroll = Math.max(0, doc.scrollHeight - doc.clientHeight);

        setVisible(maxScroll > 4);

        if (maxScroll <= 0) {
            setThumbTop(0);
            return;
        }

        const prog = Math.min(1, Math.max(0, doc.scrollTop / maxScroll));
        let innerH = window.innerHeight;
        const trackEl = trackRef.current;
        if (trackEl) {
            const h = trackEl.getBoundingClientRect().height;
            if (h > 1) innerH = h;
        }
        const usable = Math.max(0, innerH - DRAG_HIT);

        setThumbTop(prog * usable);
    }, []);

    const setScrollFromClientY = useCallback((clientY) => {
        const track = trackRef.current;
        if (!track) return;

        const doc = document.documentElement;
        const maxScroll = doc.scrollHeight - doc.clientHeight;
        if (maxScroll <= 0) return;

        const rect = track.getBoundingClientRect();
        const trackLen = Math.max(0, rect.height - DRAG_HIT);
        if (trackLen <= 0) return;

        let y = clientY - rect.top - offsetRef.current;
        y = Math.min(Math.max(y, 0), trackLen);
        const prog = y / trackLen;
        doc.scrollTop = prog * maxScroll;
    }, []);

    useEffect(() => {
        setMounted(true);
    }, []);

    useEffect(() => {
        if (!mounted) return;

        updateThumb();

        window.addEventListener("scroll", updateThumb, { passive: true });
        window.addEventListener("resize", updateThumb);

        const ro = new ResizeObserver(updateThumb);
        ro.observe(document.documentElement);

        return () => {
            window.removeEventListener("scroll", updateThumb);
            window.removeEventListener("resize", updateThumb);
            ro.disconnect();
        };
    }, [mounted, updateThumb]);

    useEffect(() => {
        const onMove = (e) => {
            if (!dragRef.current) return;
            e.preventDefault();
            setScrollFromClientY(e.clientY);
            updateThumb();
        };
        const onUp = () => {
            dragRef.current = false;
        };

        window.addEventListener("pointermove", onMove);
        window.addEventListener("pointerup", onUp);
        window.addEventListener("pointercancel", onUp);
        return () => {
            window.removeEventListener("pointermove", onMove);
            window.removeEventListener("pointerup", onUp);
            window.removeEventListener("pointercancel", onUp);
        };
    }, [setScrollFromClientY, updateThumb]);

    if (!mounted || !visible) return null;

    const onThumbPointerDown = (e) => {
        e.preventDefault();
        e.stopPropagation();
        const thumb = e.currentTarget;
        const rect = thumb.getBoundingClientRect();
        offsetRef.current = e.clientY - rect.top;
        dragRef.current = true;
        thumb.setPointerCapture(e.pointerId);
    };

    /** Zona transparente só para clicar e saltar; linha inteira já não aparece — só segmento já scrollado */
    const onTrackPointerDown = (e) => {
        if (e.target instanceof Element && e.target.closest('[data-thumb="true"]'))
            return;
        offsetRef.current = DRAG_HIT / 2;
        setScrollFromClientY(e.clientY);
        updateThumb();
    };

    /** Segmento já “percorrido”: do topo até ao centro do ícone; no topo não desenhamos linha. */
    const lineHeightPx = thumbTop <= 1 ? 0 : thumbTop + DRAG_HIT / 2;

    return (
        <div
            className="pointer-events-none fixed top-0 right-3 z-9999 hidden h-dvh w-8 sm:block"
            aria-hidden
        >
            <div className="flex h-full w-full justify-center pb-[env(safe-area-inset-bottom)] pt-[env(safe-area-inset-top)]">
                <div
                    ref={trackRef}
                    role="presentation"
                    className="pointer-events-auto relative h-full w-6 shrink-0 cursor-pointer select-none"
                    onPointerDown={onTrackPointerDown}
                >
                    {lineHeightPx > 0 ? (
                        <div
                            className="pointer-events-none absolute left-1/2 top-0 w-px -translate-x-1/2 rounded-full bg-backdrop-secondary"
                            style={{
                                height: lineHeightPx,
                            }}
                        />
                    ) : null}
                    <button
                        type="button"
                        data-thumb="true"
                        aria-label="Indicador de rolagem"
                        className="-translate-x-1/2 absolute left-1/2 flex cursor-grab touch-manipulation items-center justify-center border-0 bg-transparent p-0 shadow-none outline-none active:cursor-grabbing"
                        style={{ top: thumbTop, width: DRAG_HIT, height: DRAG_HIT }}
                        onPointerDown={onThumbPointerDown}
                        onLostPointerCapture={() => {
                            dragRef.current = false;
                        }}
                    >
                        <TbRazorElectric
                            className="size-[22px] shrink-0 text-backdrop-secondary"
                            aria-hidden
                        />
                    </button>
                </div>
            </div>
        </div>
    );
}
