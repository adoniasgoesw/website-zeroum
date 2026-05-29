import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import {
    motion,
    useReducedMotion,
    useScroll,
    useTransform,
} from "framer-motion";
import Button from "@/components/Buttons/Button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import TestimonialsCard from "@/components/Cards/TestimonialsCard";
import { BiSolidQuoteLeft, BiSolidQuoteRight } from "react-icons/bi";
import { testimonials } from "@/data/Data";
import {
    getViewportTierServerSnapshot,
    getViewportTierSnapshot,
    subscribeViewportTier,
} from "@/lib/viewportTier";
import {
    QUOTE_TRANSLATE_PX,
    TESTIMONIAL_QUOTE_CYCLE_TIMES,
    TESTIMONIAL_QUOTE_EASE,
    TESTIMONIAL_SWAP_TOTAL_MS,
} from "@/constants/testimonialsMotion";

const quoteKeyframesTransition = {
    duration: TESTIMONIAL_SWAP_TOTAL_MS / 1000,
    times: TESTIMONIAL_QUOTE_CYCLE_TIMES,
    ease: [TESTIMONIAL_QUOTE_EASE, TESTIMONIAL_QUOTE_EASE],
};

/** Deslocamento inicial (translateY) antes de assentar na posição final. */
const TESTIMONIALS_FLOAT_PX = 100;

/**
 * Janela de scroll — progresso 1 mais cedo = animação mais rápida e responsiva ao gesto.
 * Valores maiores no eixo “start X” completam a subida com menos percurso de scroll.
 */
const TESTIMONIALS_SCROLL_OFFSET_BY_TIER = /** @type {const} */ ({
    mobile: ["start end", "start 0.52"],
    sm: ["start end", "start 0.48"],
    md: ["start end", "start 0.44"],
    lg: ["start end", "start 0.4"],
});

/** Curva ease-out: responde cedo ao scroll e assenta sem “travadas” no final. */
function testimonialsScrollEase(t) {
    const clamped = Math.min(1, Math.max(0, t));
    return 1 - (1 - clamped) ** 1.65;
}

function useQuoteTranslatePx() {
    const [px, setPx] = useState(QUOTE_TRANSLATE_PX.desktop);
    useEffect(() => {
        const mq = window.matchMedia("(max-width: 639px)");
        const sync = () =>
            setPx(mq.matches ? QUOTE_TRANSLATE_PX.mobile : QUOTE_TRANSLATE_PX.desktop);
        sync();
        mq.addEventListener("change", sync);
        return () => mq.removeEventListener("change", sync);
    }, []);
    return px;
}

export default function Testumonials() {
    const sectionRef = useRef(null);
    const reduceMotion = useReducedMotion();

    const tier = useSyncExternalStore(
        subscribeViewportTier,
        getViewportTierSnapshot,
        getViewportTierServerSnapshot,
    );

    const scrollOffset = TESTIMONIALS_SCROLL_OFFSET_BY_TIER[tier];

    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: scrollOffset,
    });

    /** Ligado ao scroll, reversível; easing leve para movimento contínuo sem “respiros”. */
    const y = useTransform(scrollYProgress, (p) => {
        if (reduceMotion) return 0;
        const eased = testimonialsScrollEase(p);
        return TESTIMONIALS_FLOAT_PX * (1 - eased);
    });

    const [activeIndex, setActiveIndex] = useState(0);
    const [hasAnimatedSwap, setHasAnimatedSwap] = useState(false);
    const [quoteAnim, setQuoteAnim] = useState({ pulse: 0, direction: "next" });
    const translatePx = useQuoteTranslatePx();

    const n = testimonials.length;
    const current = testimonials[activeIndex];

    const goPrev = () => {
        setHasAnimatedSwap(true);
        setQuoteAnim((s) => ({ pulse: s.pulse + 1, direction: "prev" }));
        setActiveIndex((i) => (i - 1 + n) % n);
    };

    const goNext = () => {
        setHasAnimatedSwap(true);
        setQuoteAnim((s) => ({ pulse: s.pulse + 1, direction: "next" }));
        setActiveIndex((i) => (i + 1) % n);
    };

    const { pulse, direction } = quoteAnim;
    const scaleUpPeak = 1.08;
    const scaleDownPeak = 0.92;
    const scaleKeyframes =
        direction === "prev" ? [1, scaleDownPeak, 1] : [1, scaleUpPeak, 1];

    const activeQuoteAnimate =
        pulse === 0
            ? { scale: 1, x: 0, rotate: 0 }
            : {
                  scale: scaleKeyframes,
                  x: [0, -translatePx, 0],
                  rotate: [0, -5, 0],
              };

    const activeQuoteAnimateRight =
        pulse === 0
            ? { scale: 1, x: 0, rotate: 0 }
            : {
                  scale: scaleKeyframes,
                  x: [0, translatePx, 0],
                  rotate: [0, 5, 0],
              };

    return (
        <motion.section
            id="testimonials"
            ref={sectionRef}
            style={{ y }}
            className="relative h-[700px] w-full overflow-visible bg-background-secondary px-6 py-20 transform-gpu sm:px-10 md:px-16 lg:px-20 xl:px-32"
        >
            <div className="relative h-full w-full">
                <div className="absolute top-0 right-0 z-20 flex w-full justify-end gap-2">
                    <Button
                        icon={<ChevronLeft className="size-6" />}
                        variant="icon"
                        type="button"
                        onClick={goPrev}
                    />
                    <Button
                        icon={<ChevronRight className="size-6" />}
                        variant="icon"
                        type="button"
                        onClick={goNext}
                    />
                </div>

                <div className="absolute top-0 left-0 h-full w-full">
                    <div className="flex h-full w-full flex-col">
                        <div className="h-full w-full">
                            <motion.span
                                key={`quote-l-${pulse}`}
                                className="inline-block will-change-transform"
                                style={{ transformOrigin: "50% 50%" }}
                                initial={{ scale: 1, x: 0, rotate: 0 }}
                                animate={activeQuoteAnimate}
                                transition={
                                    pulse === 0
                                        ? { duration: 0 }
                                        : quoteKeyframesTransition
                                }
                            >
                                <BiSolidQuoteLeft className="size-20 text-light-primary lg:size-30 xl:size-40" />
                            </motion.span>
                        </div>
                        <div className="flex h-full w-full items-end justify-end">
                            <motion.span
                                key={`quote-r-${pulse}`}
                                className="inline-block will-change-transform"
                                style={{ transformOrigin: "50% 50%" }}
                                initial={{ scale: 1, x: 0, rotate: 0 }}
                                animate={activeQuoteAnimateRight}
                                transition={
                                    pulse === 0
                                        ? { duration: 0 }
                                        : quoteKeyframesTransition
                                }
                            >
                                <BiSolidQuoteRight className="size-20 text-light-primary lg:size-30 xl:size-40" />
                            </motion.span>
                        </div>
                    </div>
                </div>
                <div className="flex h-full w-full items-center justify-center">
                    <TestimonialsCard
                        name={current.name}
                        description={current.description}
                        swapKey={current.id}
                        enableSwapAnimation={hasAnimatedSwap}
                    />
                </div>
            </div>
        </motion.section>
    );
}
