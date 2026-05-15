import {
    useEffect,
    useRef,
    useState,
    useSyncExternalStore,
} from "react";
import {
    AnimatePresence,
    motion,
    useAnimationControls,
    useInView,
    useReducedMotion,
    useScroll,
    useSpring,
    useTransform,
} from "framer-motion";
import { BiSolidQuoteLeft, BiSolidQuoteRight } from "react-icons/bi";
import Button from "../../componenst/Button";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import { testimonials } from "../../data/Data";

/** Fade do depoimento: saída um pouco mais curta; entrada mais longa e suave (evita “pulo” seco). */
const TESTIMONIAL_FADE_OUT_DURATION = 0.95;
const TESTIMONIAL_FADE_IN_DURATION = 1.2;
const TESTIMONIAL_FADE_IN_DELAY = 0.14;
/** Curva suave em todo o fade (saída e entrada). */
const testimonialFadeEase = [0.25, 0.1, 0.25, 1];

const quoteSwapTransitionOut = {
    duration: TESTIMONIAL_FADE_OUT_DURATION,
    ease: testimonialFadeEase,
};

const quoteSwapTransitionIn = {
    duration: TESTIMONIAL_FADE_IN_DURATION,
    ease: testimonialFadeEase,
};

/** Empurrão lateral na troca (aspas ficam parcialmente visíveis). */
const QUOTE_SWAP_NUDGE_LEFT = "-3.25rem";
const QUOTE_SWAP_NUDGE_RIGHT = "3.25rem";
/** Próximo (>): aspas crescem um pouco; anterior (<): encolhem um pouco. */
const QUOTE_SWAP_SCALE_NEXT = 1.18;
const QUOTE_SWAP_SCALE_PREV = 0.86;

const floatMirror = {
    repeat: Infinity,
    repeatType: "mirror",
    ease: "easeInOut",
};

const floatContent = {
    y: [-2.5, 2.5],
    rotate: [-0.28, 0.28],
};

const quoteLeftMotion = {
    hidden: {
        opacity: 0,
        scale: 0.74,
        x: -52,
        rotate: -11,
        transition: { duration: 0.2, ease: [0.4, 0, 0.2, 1] },
    },
    visible: {
        opacity: 1,
        scale: 1,
        x: 0,
        rotate: 0,
        transition: {
            duration: 0.5,
            delay: 0,
            ease: testimonialFadeEase,
        },
    },
};

/** Aspas fundo: direita → esquerda (x+), com scale + rotate + opacity */
const quoteRightMotion = {
    hidden: {
        opacity: 0,
        scale: 0.74,
        x: 52,
        rotate: 11,
        transition: { duration: 0.2, ease: [0.4, 0, 0.2, 1] },
    },
    visible: {
        opacity: 1,
        scale: 1,
        x: 0,
        rotate: 0,
        transition: {
            duration: 0.52,
            /** Depois da avaliação — último na sequência */
            delay: 0.95,
            ease: testimonialFadeEase,
        },
    },
};

/** Entrada: scale + opacidade */
const navButtonsMotion = {
    hidden: {
        opacity: 0,
        scale: 0.82,
        transition: { duration: 0.2, ease: [0.4, 0, 0.2, 1] },
    },
    visible: {
        opacity: 1,
        scale: 1,
        transition: {
            duration: 0.38,
            delay: 0.26,
            ease: testimonialFadeEase,
        },
    },
};

const testimonialMotion = {
    hidden: {
        opacity: 0,
        y: 64,
        transition: { duration: 0.24, ease: [0.4, 0, 0.2, 1] },
    },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.72,
            /** Aspas topo → botões → avaliação → aspas fundo */
            delay: 0.52,
            ease: testimonialFadeEase,
        },
    },
};

/** Entrada sem movimento (reduced motion). */
const entranceReducedMotion = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { duration: 0.22 },
    },
};

/** Troca de depoimento: some e reaparece só com opacidade (< e > iguais). */
const testimonialFadeVariants = {
    enter: {
        opacity: 0,
    },
    center: {
        opacity: 1,
        transition: {
            duration: TESTIMONIAL_FADE_IN_DURATION,
            delay: TESTIMONIAL_FADE_IN_DELAY,
            ease: testimonialFadeEase,
        },
    },
    exit: {
        opacity: 0,
        transition: {
            duration: TESTIMONIAL_FADE_OUT_DURATION,
            ease: testimonialFadeEase,
        },
    },
};

const MOBILE_MAX_WIDTH = 639;

function subscribeMobileTestimonials(cb) {
    const mq = window.matchMedia(`(max-width: ${MOBILE_MAX_WIDTH}px)`);
    mq.addEventListener("change", cb);
    return () => mq.removeEventListener("change", cb);
}

function getMobileTestimonialsSnapshot() {
    return window.matchMedia(`(max-width: ${MOBILE_MAX_WIDTH}px)`).matches;
}

function getMobileTestimonialsServerSnapshot() {
    return false;
}

/**
 * Parallax ao sair da Phase: intervalo de scroll mais curto (efeito mais rápido),
 * deslocamento maior (impacto) e spring no progresso (entrada/saída mais suave).
 */
function useTestimonialsSectionScroll() {
    const sectionRef = useRef(null);

    const isMobile = useSyncExternalStore(
        subscribeMobileTestimonials,
        getMobileTestimonialsSnapshot,
        getMobileTestimonialsServerSnapshot,
    );

    const scrollOffset = isMobile
        ? ["start end", "start 0.54"]
        : ["start end", "start 0.48"];

    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: scrollOffset,
    });

    const parallaxPx = isMobile ? 104 : 148;

    const prefersReduced = useReducedMotion();

    const smoothProgress = useSpring(scrollYProgress, {
        stiffness: prefersReduced === true ? 12000 : 520,
        damping: prefersReduced === true ? 140 : 36,
        mass: prefersReduced === true ? 0.04 : 0.22,
        restDelta: 0.001,
    });

    const yShift = useTransform(smoothProgress, [0, 1], [parallaxPx, 0]);

    return {
        sectionRef,
        sectionMotionStyle:
            prefersReduced === true ? undefined : { y: yShift },
    };
}

export default function Testimonials() {
    const { sectionRef, sectionMotionStyle } = useTestimonialsSectionScroll();
    const prefersReducedEntrance = useReducedMotion();
    const reduced = prefersReducedEntrance === true;

    const vQuoteLeft = reduced ? entranceReducedMotion : quoteLeftMotion;
    const vNav = reduced ? entranceReducedMotion : navButtonsMotion;
    const vTestimonial = reduced ? entranceReducedMotion : testimonialMotion;
    const vQuoteRight = reduced ? entranceReducedMotion : quoteRightMotion;

    const len = testimonials.length;
    const [index, setIndex] = useState(0);

    /** Entrada só na primeira vez que a secção entra no viewport; sem animação ao sair nem ao voltar a scrollar. */
    const isInView = useInView(sectionRef, {
        once: true,
        amount: 0.22,
        margin: "0px 0px -10% 0px",
    });
    const show = isInView ? "visible" : "hidden";

    const safe = len > 0 ? ((index % len) + len) % len : 0;
    const current = len > 0 ? testimonials[safe] : null;

    const slideDirRef = useRef(1);

    const leftQuoteCtrl = useAnimationControls();
    const rightQuoteCtrl = useAnimationControls();
    const [quoteSwapping, setQuoteSwapping] = useState(false);
    const prevQuoteIndexRef = useRef(index);

    useEffect(() => {
        if (show !== "visible") return;
        if (prevQuoteIndexRef.current === index) return;
        prevQuoteIndexRef.current = index;

        const dir = slideDirRef.current;
        const quotePeekScale =
            dir > 0 ? QUOTE_SWAP_SCALE_NEXT : QUOTE_SWAP_SCALE_PREV;

        let cancelled = false;

        (async () => {
            setQuoteSwapping(true);
            await Promise.all([
                leftQuoteCtrl.start({
                    x: QUOTE_SWAP_NUDGE_LEFT,
                    scale: quotePeekScale,
                    transition: quoteSwapTransitionOut,
                }),
                rightQuoteCtrl.start({
                    x: QUOTE_SWAP_NUDGE_RIGHT,
                    scale: quotePeekScale,
                    transition: quoteSwapTransitionOut,
                }),
            ]);
            if (cancelled) return;
            await Promise.all([
                leftQuoteCtrl.start({
                    x: 0,
                    scale: 1,
                    transition: {
                        ...quoteSwapTransitionIn,
                        delay: TESTIMONIAL_FADE_IN_DELAY,
                    },
                }),
                rightQuoteCtrl.start({
                    x: 0,
                    scale: 1,
                    transition: {
                        ...quoteSwapTransitionIn,
                        delay: TESTIMONIAL_FADE_IN_DELAY,
                    },
                }),
            ]);
            if (!cancelled) setQuoteSwapping(false);
        })();

        return () => {
            cancelled = true;
        };
    }, [index, show, leftQuoteCtrl, rightQuoteCtrl]);

    const goPrev = () => {
        slideDirRef.current = -1;
        setIndex((i) => (len <= 0 ? 0 : (i - 1 + len) % len));
    };
    const goNext = () => {
        slideDirRef.current = 1;
        setIndex((i) => (len <= 0 ? 0 : (i + 1) % len));
    };

    return (
        <motion.section
            ref={sectionRef}
            style={sectionMotionStyle}
            className="will-change-transform bg-backdrop-secondary box-border flex min-h-96 w-full min-w-0 flex-col px-4 py-12 sm:px-8 sm:py-16 md:min-h-128 md:px-16 md:py-20 lg:min-h-152 lg:px-24 xl:min-h-176 xl:px-32"
        >
            <div className="relative flex min-h-0 w-full flex-1 flex-col gap-4 sm:gap-6 md:gap-10">
                {/*
                  Camada decorativa: aspas. Entrada em sequência (delays nos variants):
                  1. Aspas topo (esq→dir) → 2. Botões → 3. Avaliação → 4. Aspas fundo (dir→esq)
                */}
                <div className="pointer-events-none absolute inset-0 overflow-visible">
                    <div className="relative h-full min-h-48 w-full overflow-visible sm:min-h-52">
                        <motion.div
                            className="absolute top-0 left-0 z-25 opacity-75 sm:opacity-90 md:opacity-100"
                            variants={vQuoteLeft}
                            initial="hidden"
                            animate={show}
                        >
                            <motion.span
                                className="inline-block origin-top-left will-change-transform"
                                animate={leftQuoteCtrl}
                                initial={{ x: 0, scale: 1, rotate: 0 }}
                            >
                                <motion.span
                                    className="inline-block origin-top-left will-change-transform"
                                    animate={
                                        quoteSwapping
                                            ? false
                                            : { scale: [1, 1.07, 1] }
                                    }
                                    transition={{
                                        ...floatMirror,
                                        duration: 2.65,
                                    }}
                                >
                                    <BiSolidQuoteLeft className="size-10 text-quote-primary sm:size-12 md:size-18 lg:size-24 xl:size-28" />
                                </motion.span>
                            </motion.span>
                        </motion.div>
                        <motion.div
                            className="absolute right-0 bottom-0 z-25 opacity-75 sm:opacity-90 md:opacity-100"
                            variants={vQuoteRight}
                            initial="hidden"
                            animate={show}
                        >
                            <motion.span
                                className="inline-block origin-bottom-right will-change-transform"
                                animate={rightQuoteCtrl}
                                initial={{ x: 0, scale: 1, rotate: 0 }}
                            >
                                <motion.span
                                    className="inline-block origin-bottom-right will-change-transform"
                                    animate={
                                        quoteSwapping
                                            ? false
                                            : { scale: [1, 1.07, 1] }
                                    }
                                    transition={{
                                        ...floatMirror,
                                        duration: 3.05,
                                    }}
                                >
                                    <BiSolidQuoteRight className="size-10 text-quote-primary sm:size-12 md:size-18 lg:size-24 xl:size-28" />
                                </motion.span>
                            </motion.span>
                        </motion.div>
                    </div>
                </div>

                <motion.div
                    className="relative z-10 flex w-full shrink-0 items-center justify-end"
                    variants={vNav}
                    initial="hidden"
                    animate={show}
                >
                    <div className="flex gap-2">
                        <Button
                            variant="icon"
                            icon={<ChevronLeftIcon className="size-4 sm:size-4.5" />}
                            className="size-10! sm:size-12!"
                            aria-label="Depoimento anterior"
                            type="button"
                            onClick={goPrev}
                            disabled={len <= 1}
                        />
                        <Button
                            variant="icon"
                            icon={<ChevronRightIcon className="size-4 sm:size-4.5" />}
                            className="size-10! sm:size-12!"
                            aria-label="Próximo depoimento"
                            type="button"
                            onClick={goNext}
                            disabled={len <= 1}
                        />
                    </div>
                </motion.div>

                <motion.div
                    className="relative z-10 flex min-h-0 w-full flex-1 items-center justify-center px-0 sm:px-2"
                    variants={vTestimonial}
                    initial="hidden"
                    animate={show}
                >
                    <motion.div
                        className="relative mx-auto w-full max-w-5xl min-h-52 min-w-0 overflow-hidden px-20 md:min-h-60"
                        animate={floatContent}
                        transition={{ ...floatMirror, duration: 6.75 }}
                    >
                        <AnimatePresence mode="wait" initial={false}>
                            {current ? (
                                <motion.div
                                    key={current.id}
                                    role="article"
                                    variants={testimonialFadeVariants}
                                    initial="enter"
                                    animate="center"
                                    exit="exit"
                                    className="flex w-full min-w-0 flex-col gap-2 sm:gap-3 md:gap-4 z-10"
                                    aria-live="polite"
                                    aria-atomic="true"
                                >
                                    <p className="wrap-break-word text-sm leading-relaxed font-light text-text-testimonials-primary sm:text-base md:text-xl lg:text-2xl">
                                        {current.description}
                                    </p>

                                    <p className="text-lg font-medium text-text-testimonials-primary sm:text-xl md:text-2xl">
                                        {current.name}
                                    </p>
                                </motion.div>
                            ) : null}
                        </AnimatePresence>
                    </motion.div>
                </motion.div>
            </div>
        </motion.section>
    );
}
