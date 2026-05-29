import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { animate, motion, useInView, useMotionValue, useReducedMotion } from "framer-motion";
import ProductCard from "@/components/Cards/ProductCard";
import {
    PRODUCTS_ENTRANCE_VIEWPORT,
    productCardHidden,
    productCardTransition,
    productCardVisible,
    productControlsHidden,
    productControlsTransition,
    productControlsVisible,
} from "@/constants/productsMotion";
import { PRODUCT_SLIDE_TRANSITION } from "@/constants/testimonialsMotion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Button from "@/components/Buttons/Button";

const STRIP_GAP_PX = 20;

function useProductSlideColumns() {
    const [cols, setCols] = useState(1);

    useLayoutEffect(() => {
        const read = () => {
            if (window.matchMedia("(min-width: 1024px)").matches) setCols(4);
            else if (window.matchMedia("(min-width: 768px)").matches) setCols(3);
            else if (window.matchMedia("(min-width: 640px)").matches) setCols(2);
            else setCols(1);
        };
        read();
        const qs = ["(min-width: 1024px)", "(min-width: 768px)", "(min-width: 640px)"];
        const mqs = qs.map((q) => window.matchMedia(q));
        mqs.forEach((m) => m.addEventListener("change", read));
        return () => mqs.forEach((m) => m.removeEventListener("change", read));
    }, []);

    return cols;
}

function buildInfiniteStrip(productsList, cols) {
    const n = productsList.length;
    if (n === 0) return [];

    const mod = (i) => (((i % n) + n) % n);
    const prepend = Array.from({ length: cols }, (_, i) => productsList[mod(n - cols + i)]);
    const append = Array.from({ length: cols }, (_, i) => productsList[i % n]);
    return [...prepend, ...productsList, ...append];
}

function stepPxFor(viewportW, cols) {
    if (viewportW <= 0 || cols < 1) return 0;
    const inner = viewportW - (cols - 1) * STRIP_GAP_PX;
    const cardW = inner / cols;
    return cardW + STRIP_GAP_PX;
}

const visibleState = productCardVisible;

export default function ProductsCarousel({ products: productsList }) {
    const cols = useProductSlideColumns();
    const strip = useMemo(
        () => buildInfiniteStrip(productsList, cols),
        [cols, productsList],
    );
    const n = productsList.length;
    const [slideSlot, setSlideSlot] = useState(() => cols);
    const viewportRef = useRef(null);
    const [viewportW, setViewportW] = useState(0);
    const [playEntrance, setPlayEntrance] = useState(false);

    const reduceMotion = useReducedMotion();
    const sectionInView = useInView(viewportRef, PRODUCTS_ENTRANCE_VIEWPORT);

    const x = useMotionValue(0);
    const animRef = useRef(null);
    const slideSlotRef = useRef(slideSlot);
    slideSlotRef.current = slideSlot;
    const prevViewportWRef = useRef(-1);

    const visibleCols = Math.min(cols, n);

    useEffect(() => {
        if (sectionInView) setPlayEntrance(true);
    }, [sectionInView]);

    useLayoutEffect(() => {
        setSlideSlot(cols);
    }, [cols]);

    useLayoutEffect(() => {
        const el = viewportRef.current;
        if (!el) return;
        const measure = () => setViewportW(el.clientWidth);
        measure();
        const ro = new ResizeObserver(measure);
        ro.observe(el);
        return () => ro.disconnect();
    }, []);

    const stepPx = stepPxFor(viewportW, cols);

    useLayoutEffect(() => {
        if (viewportW <= 0 || cols < 1 || stepPx <= 0) return;
        const prev = prevViewportWRef.current;
        prevViewportWRef.current = viewportW;
        animRef.current?.stop();
        const slot = slideSlotRef.current;
        x.set(-slot * stepPx);
        if (prev === -1) return;
        if (prev === viewportW) return;
    }, [viewportW, cols, stepPx, x]);

    useEffect(() => {
        if (viewportW <= 0 || cols < 1 || stepPx <= 0 || n === 0) return;

        const target = -slideSlot * stepPx;
        if (Math.abs(x.get() - target) < 0.75) return;

        const completedSlot = slideSlot;
        let cancelled = false;
        animRef.current?.stop();
        const ctrl = animate(x, target, PRODUCT_SLIDE_TRANSITION);
        animRef.current = ctrl;

        ctrl.then(() => {
            if (cancelled) return;
            if (completedSlot === cols + n) {
                animRef.current?.stop();
                x.set(-cols * stepPx);
                setSlideSlot(cols);
            } else if (completedSlot === cols - 1) {
                animRef.current?.stop();
                x.set(-(cols + n - 1) * stepPx);
                setSlideSlot(cols + n - 1);
            }
        });

        return () => {
            cancelled = true;
            ctrl.stop();
        };
    }, [slideSlot, viewportW, cols, stepPx, n, x]);

    const goNext = () => {
        setSlideSlot((s) => (n === 0 ? s : Math.min(s + 1, cols + n)));
    };

    const goPrev = () => {
        setSlideSlot((s) => (n === 0 ? s : Math.max(s - 1, cols - 1)));
    };

    const inner = viewportW > 0 && cols >= 1 ? viewportW - (cols - 1) * STRIP_GAP_PX : 0;
    const cardW = cols >= 1 && inner > 0 ? inner / cols : 0;
    const stripW =
        strip.length > 0 && cardW > 0
            ? strip.length * cardW + (strip.length - 1) * STRIP_GAP_PX
            : "100%";

    const firstPageStart = cols;
    const firstPageEnd = cols + visibleCols;

    return (
        <>
            <div ref={viewportRef} className="w-full overflow-hidden">
                {strip.length > 0 && cardW > 0 ? (
                    <motion.div
                        className="flex"
                        style={{ x, width: stripW, gap: STRIP_GAP_PX }}
                    >
                        {strip.map((product, i) => {
                            const isFirstPage =
                                i >= firstPageStart && i < firstPageEnd;
                            const colIndex = i - firstPageStart;
                            const shouldAnimate =
                                playEntrance && isFirstPage && !reduceMotion;

                            return (
                                <motion.div
                                    key={`${product.id}-${i}-${cols}`}
                                    className="shrink-0"
                                    style={{
                                        width: cardW,
                                        transformOrigin: "center bottom",
                                    }}
                                    initial={
                                        isFirstPage && !reduceMotion
                                            ? productCardHidden(colIndex)
                                            : visibleState
                                    }
                                    animate={
                                        shouldAnimate
                                            ? productCardVisible
                                            : visibleState
                                    }
                                    transition={
                                        shouldAnimate
                                            ? productCardTransition(colIndex)
                                            : { duration: 0 }
                                    }
                                >
                                    <ProductCard {...product} />
                                </motion.div>
                            );
                        })}
                    </motion.div>
                ) : null}
            </div>

            <motion.div
                className="-mt-10 flex w-full justify-center gap-2"
                initial={
                    reduceMotion ? productControlsVisible : productControlsHidden
                }
                animate={
                    playEntrance && !reduceMotion
                        ? productControlsVisible
                        : productControlsVisible
                }
                transition={
                    playEntrance && !reduceMotion
                        ? productControlsTransition(visibleCols)
                        : { duration: 0 }
                }
            >
                <Button
                    icon={<ChevronLeft className="size-6" />}
                    variant="icon"
                    type="button"
                    aria-label="Card anterior"
                    disabled={n === 0}
                    onClick={goPrev}
                />
                <Button
                    icon={<ChevronRight className="size-6" />}
                    variant="icon"
                    type="button"
                    aria-label="Próximo card"
                    disabled={n === 0}
                    onClick={goNext}
                />
            </motion.div>
        </>
    );
}
