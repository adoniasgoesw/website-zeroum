import {
    useMotionValueEvent,
    useReducedMotion,
    useScroll,
} from "framer-motion";
import {
    useLayoutEffect,
    useRef,
    useState,
    useSyncExternalStore,
} from "react";
import {
    getViewportTierServerSnapshot,
    getViewportTierSnapshot,
    subscribeViewportTier,
} from "@/lib/viewportTier";

const PHRASE =
    "Sua imagem comunica presença antes mesmo de qualquer palavra ser dita ao redor.";

const WORDS = PHRASE.split(/\s+/).filter(Boolean);

/**
 * Ritmo por largura — alinha com breakpoints Tailwind (~sm 640 / md 768 / lg 1024).
 * Boost mais baixo ⇒ precisa percorrer quase todo o intervalo do scroll até acender todas as palavras.
 */
const PHASE_BOOST_BY_TIER = /** @type {const} */ ({
    mobile: 1.045,
    sm: 1.1,
    md: 1.18,
    lg: 1.28,
});

/**
 * Mais distância de scroll até o progresso ir de 0 → 1 (mobile/sm/md são mais lentos que lg).
 * Formato igual ao esperado pelo `offset` do `useScroll` do Motion.
 */
const PHASE_SCROLL_OFFSET_BY_TIER = /** @type {const} */ ({
    mobile: ["start end", "end center"],
    sm: ["start end", "end 0.45"],
    md: ["start 0.9", "end 0.4"],
    lg: ["start 0.82", "end 0.36"],
});

/** @typedef {import("@/lib/viewportTier").ViewportTier} PhaseTier */

function scrollProgressToWordPhase(raw, boost) {
    const v = Math.min(1, Math.max(0, raw));
    return Math.min(1, v * boost);
}

function highlightedWordCount(scrollProgress, totalWords, boost) {
    const phase = scrollProgressToWordPhase(scrollProgress, boost);
    return Math.min(totalWords, Math.ceil(phase * totalWords));
}

const WORD_COLOR_BASE =
    "text-light-primary/[0.38] transition-[color] duration-[420ms] ease-[cubic-bezier(0.22,1,0.36,1)]";
const WORD_COLOR_ACTIVE =
    "text-highlight-primary transition-[color] duration-[420ms] ease-[cubic-bezier(0.22,1,0.36,1)]";

export default function Phase() {
    const sectionRef = useRef(null);
    const reduceMotion = useReducedMotion();
    const [activeWords, setActiveWords] = useState(0);

    const phaseTier = useSyncExternalStore(
        subscribeViewportTier,
        getViewportTierSnapshot,
        getViewportTierServerSnapshot,
    );

    const boost = PHASE_BOOST_BY_TIER[phaseTier];
    const scrollOffset = PHASE_SCROLL_OFFSET_BY_TIER[phaseTier];

    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: scrollOffset,
    });

    useLayoutEffect(() => {
        if (reduceMotion) {
            return;
        }
        const id = requestAnimationFrame(() => {
            setActiveWords(
                highlightedWordCount(
                    scrollYProgress.get(),
                    WORDS.length,
                    boost,
                ),
            );
        });
        return () => cancelAnimationFrame(id);
    }, [scrollYProgress, boost, reduceMotion]);

    useMotionValueEvent(scrollYProgress, "change", (v) => {
        if (reduceMotion) {
            return;
        }
        const next = highlightedWordCount(v, WORDS.length, boost);
        setActiveWords((prev) => (prev === next ? prev : next));
    });

    const shownWords = reduceMotion ? WORDS.length : activeWords;
    return (
        <section
            ref={sectionRef}
            className="box-border flex min-h-[92svh] w-full min-w-0 flex-col bg-background-primary px-6 sm:px-10 py-16 sm:min-h-screen sm:py-20 md:px-16 lg:px-24 xl:px-32"
            lang="pt-BR"
            aria-labelledby="phase-heading"
        >
            <div className="mx-auto flex min-h-[min(70svh,32rem)] w-full min-w-0 max-w-7xl flex-[1_0_auto] flex-col items-center justify-center gap-10 sm:min-h-0 md:min-h-[min(76svh,36rem)]">
                <h1
                    id="phase-heading"
                    className="font-syncopate mx-auto w-full max-w-5xl text-center  font-semibold leading-[1.22] text-balance wrap-break-word text-4xl sm:text-5xl md:text-pretty md:text-6xl md:leading-snug"
                >
                    {WORDS.map((word, i) => (
                        <span key={`${word}-${i}`}>
                            {i > 0 ? " " : null}
                            <span
                                className={
                                    i < shownWords
                                        ? WORD_COLOR_ACTIVE
                                        : WORD_COLOR_BASE
                                }
                            >
                                {word}
                            </span>
                        </span>
                    ))}
                </h1>
            </div>
        </section>
    );
}
