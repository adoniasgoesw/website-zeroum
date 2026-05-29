import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { animate, motion, useMotionValue } from "framer-motion";

import Tag from "@/components/Tag";
import Divisor from "@/components/Divisor";
import ProductCard from "@/components/Cards/ProductCard";
import { products } from "@/data/Data";
import { PRODUCT_SLIDE_TRANSITION } from "@/constants/testimonialsMotion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Button from "@/components/Buttons/Button";

/** Igual ao `gap-5` do strip (altere os dois em conjunto) */
const STRIP_GAP_PX = 20;

/** Mesma grade visível: 1 · 2 sm · 3 md · 4 lg */
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

/** [clone últimos cols ítems, …lista, clone primeiros cols ítems] — loop imperceptível */
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

export default function Products() {
    const cols = useProductSlideColumns();
    const strip = useMemo(() => buildInfiniteStrip(products, cols), [cols, products]);
    /** Índice do card mais à esquerda na faixa estendida; região “real” = [cols … cols+n-1] */
    const n = products.length;
    const [slideSlot, setSlideSlot] = useState(() => cols);
    const viewportRef = useRef(null);
    const [viewportW, setViewportW] = useState(0);

    const x = useMotionValue(0);
    const animRef = useRef(null);
    const slideSlotRef = useRef(slideSlot);
    slideSlotRef.current = slideSlot;

    const prevViewportWRef = useRef(-1);

    /** Breakpoint mudou → reancora na primeira página “real” */
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

    /** Primeira medição e resize: apenas realinha x ao slot atual (sem tween) */
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
        strip.length > 0 && cardW > 0 ? strip.length * cardW + (strip.length - 1) * STRIP_GAP_PX : "100%";

    return (
        <section
            id="products"
            className="flex min-h-screen w-full items-start justify-center bg-background-primary px-6 sm:px-10 py-20 md:px-16 lg:px-20 xl:px-32"
        >
            <div className="flex w-full flex-col gap-10">
                <div className="flex w-full flex-col items-center justify-center gap-5">
                    <div className="flex flex-col items-center justify-center gap-2">
                        <Tag text="Loja" />
                        <Divisor />
                    </div>
                    <div className="flex w-full flex-col items-center justify-center gap-2">
                        <h1 className="mx-auto max-w-lg text-center font-syncopate text-4xl font-bold capitalize text-light-primary md:max-w-none xl:text-5xl">
                            Nosso <span className="text-highlight-primary">Produtos</span>
                        </h1>
                        <p className="mx-auto max-w-lg text-center text-sm leading-relaxed text-light-primary/85   font-poppins font-light">
                        Pomadas, ceras, óleos e finalizadores para manter o cabelo e a barba como você gosta no dia a dia.
                        </p>
                    </div>
                </div>

                <div ref={viewportRef} className="w-full overflow-hidden">
                    {strip.length > 0 && cardW > 0 ? (
                        <motion.div
                            className="flex"
                            style={{ x, width: stripW, gap: STRIP_GAP_PX }}
                        >
                            {strip.map((product, i) => (
                                <div
                                    key={`${product.id}-${i}-${cols}`}
                                    className="shrink-0"
                                    style={{ width: cardW }}
                                >
                                    <ProductCard {...product} />
                                </div>
                            ))}
                        </motion.div>
                    ) : null}
                </div>

                <div className="flex w-full justify-center gap-2 -mt-10">
                    <Button
                        icon={<ChevronLeft className="size-6"/>}
                        variant="icon"
                        type="button"
                        aria-label="Card anterior"
                        disabled={n === 0}
                        onClick={goPrev}
                    />
                    <Button
                        icon={<ChevronRight className="size-6"/>}
                        variant="icon"
                        type="button"
                        aria-label="Próximo card"
                        disabled={n === 0}
                        onClick={goNext}
                    />
                </div>
            </div>
        </section>
    );
}
