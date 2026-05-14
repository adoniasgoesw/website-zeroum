import { useEffect, useRef, useState } from "react";
import {
    AnimatePresence,
    motion,
    useAnimationControls,
    useInView,
} from "framer-motion";
import { BiSolidQuoteLeft, BiSolidQuoteRight } from "react-icons/bi";
import Button from "../../componenst/Button";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import { testimonials } from "../../data/Data";

const easeOut = [0.22, 1, 0.36, 1];

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
        x: -52,
        scale: 0.88,
        transition: { duration: 0.35, ease: [0.4, 0, 0.2, 1] },
    },
    visible: {
        opacity: 1,
        x: 0,
        scale: 1,
        transition: {
            duration: 0.58,
            delay: 0,
            ease: easeOut,
        },
    },
};

const quoteRightMotion = {
    hidden: {
        opacity: 0,
        x: 52,
        scale: 0.88,
        transition: { duration: 0.35, ease: [0.4, 0, 0.2, 1] },
    },
    visible: {
        opacity: 1,
        x: 0,
        scale: 1,
        transition: {
            duration: 0.62,
            delay: 0.62,
            ease: easeOut,
        },
    },
};

const navButtonsMotion = {
    hidden: {
        opacity: 0,
        scale: 0.86,
        transition: { duration: 0.3, ease: [0.4, 0, 0.2, 1] },
    },
    visible: {
        opacity: 1,
        scale: 1,
        transition: {
            duration: 0.48,
            delay: 0.2,
            ease: easeOut,
        },
    },
};

const testimonialMotion = {
    hidden: {
        opacity: 0,
        y: 40,
        transition: { duration: 0.35, ease: [0.4, 0, 0.2, 1] },
    },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.58,
            delay: 0.4,
            ease: easeOut,
        },
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

export default function Testimonials() {
    const rootRef = useRef(null);
    const len = testimonials.length;
    const [index, setIndex] = useState(0);

    const isInView = useInView(rootRef, {
        once: true,
        amount: "some",
        margin: "0px 0px -12% 0px",
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
        <section className="bg-backdrop-secondary box-border flex min-h-96 w-full min-w-0 flex-col px-4 py-12 sm:px-8 sm:py-16 md:min-h-128 md:px-16 md:py-20 lg:min-h-152 lg:px-24 xl:min-h-176 xl:px-32">
            <div
                ref={rootRef}
                className="relative flex min-h-0 w-full flex-1 flex-col gap-4 sm:gap-6 md:gap-10"
            >
                <div className="pointer-events-none absolute inset-0 overflow-visible">
                    <div className="relative h-full min-h-48 w-full overflow-visible sm:min-h-52">
                        <motion.div
                            className="absolute top-0 left-0 z-25 opacity-75 sm:opacity-90 md:opacity-100"
                            variants={quoteLeftMotion}
                            initial="hidden"
                            animate={show}
                        >
                            <motion.span
                                className="inline-block origin-top-left will-change-transform"
                                animate={leftQuoteCtrl}
                                initial={{ x: 0, scale: 1 }}
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
                            variants={quoteRightMotion}
                            initial="hidden"
                            animate={show}
                        >
                            <motion.span
                                className="inline-block origin-bottom-right will-change-transform"
                                animate={rightQuoteCtrl}
                                initial={{ x: 0, scale: 1 }}
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
                    variants={navButtonsMotion}
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
                    variants={testimonialMotion}
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
        </section>
    );
}
