import {
    useEffect,
    useLayoutEffect,
    useMemo,
    useRef,
    useState,
} from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import Button from "../../componenst/Button";
import ProductCard from "../../componenst/ProductCard";
import { products } from "../../data/Data";

/** Igual a gap-8 entre cartões */
const GAP_PX = 32;

/** Deslize: começa lento e acelera (ease-in moderno); duração escala com o passo em px */
const SLIDE_EASE_IN = [0.54, 0.02, 0.22, 1];

function slideTweenDuration(stepPx) {
    if (stepPx <= 0) return 0;
    return Math.min(0.72, Math.max(0.44, stepPx / 460));
}

const sectionViewport = {
    once: true,
    amount: 0.14,
    margin: "0px 0px -10% 0px",
};

const easeLift = [0.22, 1, 0.36, 1];
const easeCard = [0.16, 1, 0.32, 1];
/** Leve overshoot no botão */
const easeButtonPop = [0.34, 1.45, 0.52, 1];

function getBreakpointCols() {
    if (typeof window === "undefined") return 1;
    if (window.matchMedia("(min-width: 1024px)").matches) return 4;
    if (window.matchMedia("(min-width: 768px)").matches) return 3;
    if (window.matchMedia("(min-width: 640px)").matches) return 2;
    return 1;
}

export default function Products() {
    const sectionRef = useRef(null);
    const viewportRef = useRef(null);
    const [viewportWidth, setViewportWidth] = useState(0);
    const [cols, setCols] = useState(1);
    const prefersReducedMotion = useReducedMotion();
    const reduced = prefersReducedMotion === true;
    const sectionInView = useInView(sectionRef, sectionViewport);
    const reveal = reduced || sectionInView;

    const len = products.length;

    /** offset = índice do cartão mais à esquerda na faixa triplicada; seguro em [len, 2*len - 1] */
    const [{ offset, instant }, setCarousel] = useState(() => ({
        offset: len > 0 ? len : 0,
        instant: false,
    }));
    const [sliding, setSliding] = useState(false);

    useLayoutEffect(() => {
        const el = viewportRef.current;
        if (!el) return;

        const measure = () => {
            setViewportWidth(el.clientWidth);
            setCols(getBreakpointCols());
        };

        measure();
        const ro = new ResizeObserver(measure);
        ro.observe(el);
        window.addEventListener("resize", measure);

        return () => {
            ro.disconnect();
            window.removeEventListener("resize", measure);
        };
    }, []);

    useEffect(() => {
        setCarousel({ offset: len > 0 ? len : 0, instant: false });
    }, [len, cols]);

    useEffect(() => {
        if (!instant) return;
        const id = requestAnimationFrame(() =>
            setCarousel((s) => ({ ...s, instant: false })),
        );
        return () => cancelAnimationFrame(id);
    }, [instant]);

    const cardWidth = useMemo(() => {
        if (viewportWidth <= 0 || cols < 1) return 0;
        return (viewportWidth - GAP_PX * Math.max(0, cols - 1)) / cols;
    }, [viewportWidth, cols]);

    const stepPx = useMemo(() => {
        if (cardWidth <= 0) return 0;
        return cardWidth + GAP_PX;
    }, [cardWidth]);

    const loopItems = useMemo(
        () => [...products, ...products, ...products],
        [],
    );

    const targetX = len > 0 && stepPx > 0 ? -offset * stepPx : 0;

    const transition = useMemo(() => {
        if (instant || prefersReducedMotion) return { duration: 0 };
        return {
            type: "tween",
            duration: slideTweenDuration(stepPx),
            ease: SLIDE_EASE_IN,
        };
    }, [instant, prefersReducedMotion, stepPx]);

    const showCarousel = len > 1 && cardWidth > 0 && stepPx > 0;

    const goNext = () => {
        if (len <= 1 || sliding || stepPx <= 0) return;
        setSliding(true);
        setCarousel((s) => ({
            offset: s.offset === 2 * len - 1 ? 2 * len : s.offset + 1,
            instant: false,
        }));
    };

    const goPrev = () => {
        if (len <= 1 || sliding || stepPx <= 0) return;
        setSliding(true);
        setCarousel((s) => ({
            offset: s.offset === len ? len - 1 : s.offset - 1,
            instant: false,
        }));
    };

    const onSlideComplete = () => {
        setSliding(false);
        setCarousel((s) => {
            if (s.offset === 2 * len)
                return { offset: len, instant: true };
            if (s.offset === len - 1)
                return { offset: 2 * len - 1, instant: true };
            return s;
        });
    };

    const headerContainer = useMemo(
        () => ({
            hidden: {},
            visible: {
                transition: {
                    staggerChildren: reduced ? 0 : 0.11,
                    delayChildren: reduced ? 0 : 0.04,
                },
            },
        }),
        [reduced],
    );

    const headerChild = useMemo(
        () => ({
            hidden: {
                opacity: reduced ? 1 : 0,
                y: reduced ? 0 : 36,
                transition: { duration: reduced ? 0 : 0.35 },
            },
            visible: {
                opacity: 1,
                y: 0,
                transition: {
                    duration: reduced ? 0 : 0.58,
                    ease: easeLift,
                },
            },
        }),
        [reduced],
    );

    /** Revelação em “cortina” vinda de baixo — diferente do texto, mantém foco na faixa. */
    const carouselShellVariants = useMemo(
        () => ({
            hidden: {
                clipPath: reduced ? "inset(0% 0% 0% 0%)" : "inset(0% 0% 100% 0%)",
                opacity: reduced ? 1 : 0.92,
            },
            visible: {
                clipPath: "inset(0% 0% 0% 0%)",
                opacity: 1,
                transition: {
                    duration: reduced ? 0 : 0.78,
                    ease: easeLift,
                    delay: reduced ? 0 : 0.06,
                },
            },
        }),
        [reduced],
    );

    /** Cartões: stagger por tipo de produto (índice no catálogo), micro-rotação + escala. */
    const productCardVariants = useMemo(
        () => ({
            hidden: {
                opacity: reduced ? 1 : 0,
                y: reduced ? 0 : 44,
                scale: reduced ? 1 : 0.9,
                rotateZ: reduced ? 0 : -1.4,
            },
            visible: (slot) => ({
                opacity: 1,
                y: 0,
                scale: 1,
                rotateZ: 0,
                transition: {
                    duration: reduced ? 0 : 0.64,
                    delay: reduced ? 0 : 0.16 + slot * 0.058,
                    ease: easeCard,
                },
            }),
        }),
        [reduced],
    );

    const buttonsRowVariants = useMemo(
        () => ({
            hidden: {},
            visible: {
                transition: {
                    staggerChildren: reduced ? 0 : 0.11,
                    delayChildren: reduced ? 0 : 0.48,
                },
            },
        }),
        [reduced],
    );

    const navButtonVariants = useMemo(
        () => ({
            hidden: {
                opacity: reduced ? 1 : 0,
                scale: reduced ? 1 : 0.62,
                y: reduced ? 0 : 18,
            },
            visible: {
                opacity: 1,
                scale: 1,
                y: 0,
                transition: {
                    duration: reduced ? 0 : 0.44,
                    ease: easeButtonPop,
                },
            },
        }),
        [reduced],
    );

    const cardMotionStyle = (width) =>
        width > 0
            ? {
                  width,
                  flexBasis: width,
                  maxWidth: width,
              }
            : undefined;

    const wrapCard = (product, index, width) => (
        <motion.div
            key={`${product.id}-${index}`}
            className="shrink-0"
            style={cardMotionStyle(width)}
            variants={productCardVariants}
            custom={len > 0 ? index % len : 0}
            initial="hidden"
            animate={reveal ? "visible" : "hidden"}
        >
            <ProductCard
                Name={product.Name}
                Category={product.Category}
                Image={product.Image}
                style={
                    width > 0
                        ? {
                              width: "100%",
                              flexBasis: "100%",
                              maxWidth: "100%",
                          }
                        : undefined
                }
            />
        </motion.div>
    );

    return (
        <motion.section
            ref={sectionRef}
            className="box-border flex min-h-screen w-full flex-col bg-backdrop-primary px-10 py-20 md:px-16 lg:px-24 xl:px-32"
        >
            <div className="mx-auto flex h-full w-full max-w-7xl flex-col gap-10">
                <motion.div
                    className="flex w-full flex-col gap-2"
                    variants={headerContainer}
                    initial="hidden"
                    animate={reveal ? "visible" : "hidden"}
                >
                    <motion.h1
                        variants={headerChild}
                        className="w-full text-center text-4xl font-semibold text-title-primary sm:text-5xl"
                    >
                        Nossos Produtos
                    </motion.h1>
                    <motion.p
                        variants={headerChild}
                        className="mx-auto w-full max-w-lg text-center text-xs font-light text-text-primary"
                    >
                        Lorem ipsum dolor sit amet, consectetur adipiscing
                        elit, sed do eiusmod tempor incididunt ut labore et
                        dolore magna aliqua.&nbsp;
                    </motion.p>
                </motion.div>

                {/* Uma linha: só move ao clicar < >; loop infinito */}
                <motion.div
                    ref={viewportRef}
                    className="relative w-full overflow-hidden pb-2"
                    variants={carouselShellVariants}
                    initial="hidden"
                    animate={reveal ? "visible" : "hidden"}
                >
                    {cardWidth <= 0 ? (
                        <div
                            className="min-h-[min(320px,45vh)] w-full rounded-sm bg-backdrop-secondary/25"
                            aria-hidden
                        />
                    ) : showCarousel ? (
                        <motion.div
                            key={`${cols}-${Math.round(cardWidth)}`}
                            className="flex w-max flex-nowrap gap-8 will-change-transform"
                            initial={false}
                            animate={{ x: targetX }}
                            transition={transition}
                            onAnimationComplete={onSlideComplete}
                        >
                            {loopItems.map((product, index) =>
                                wrapCard(product, index, cardWidth),
                            )}
                        </motion.div>
                    ) : (
                        <div className="flex flex-nowrap gap-8">
                            {products.map((product, index) =>
                                wrapCard(product, index, cardWidth),
                            )}
                        </div>
                    )}
                </motion.div>

                {len > 1 ? (
                    <motion.div
                        className="flex w-full justify-center"
                        variants={buttonsRowVariants}
                        initial="hidden"
                        animate={reveal ? "visible" : "hidden"}
                    >
                        <div className="flex gap-2">
                            <motion.div variants={navButtonVariants}>
                                <Button
                                    variant="icon"
                                    icon={
                                        <ChevronLeftIcon className="size-4 sm:size-4.5" />
                                    }
                                    className="size-10! sm:size-12!"
                                    aria-label="Produtos anteriores"
                                    type="button"
                                    onClick={goPrev}
                                    disabled={cardWidth <= 0 || sliding}
                                />
                            </motion.div>
                            <motion.div variants={navButtonVariants}>
                                <Button
                                    variant="icon"
                                    icon={
                                        <ChevronRightIcon className="size-4 sm:size-4.5" />
                                    }
                                    className="size-10! sm:size-12!"
                                    aria-label="Próximos produtos"
                                    type="button"
                                    onClick={goNext}
                                    disabled={cardWidth <= 0 || sliding}
                                />
                            </motion.div>
                        </div>
                    </motion.div>
                ) : null}

                {len <= 1 ? (
                    <p className="text-center text-xs text-text-primary">
                        Adicione mais produtos para ver o carrossel.
                    </p>
                ) : null}
            </div>
        </motion.section>
    );
}
