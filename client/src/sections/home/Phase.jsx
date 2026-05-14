import { useLayoutEffect, useRef, useState, useSyncExternalStore } from "react";
import { useScroll, useMotionValueEvent } from "framer-motion";

const PHRASE =
    "Lorem Ipsum is a standard placeholder text used in design and publishing to simulate content without distracting from layout and typography.";

const WORDS = PHRASE.split(/\s+/).filter(Boolean);

const MOBILE_MAX_WIDTH = 639;

function subscribeMobilePhase(cb) {
    const mq = window.matchMedia(`(max-width: ${MOBILE_MAX_WIDTH}px)`);
    mq.addEventListener("change", cb);
    return () => mq.removeEventListener("change", cb);
}

function getMobilePhaseSnapshot() {
    return window.matchMedia(`(max-width: ${MOBILE_MAX_WIDTH}px)`).matches;
}

function getMobilePhaseServerSnapshot() {
    return false;
}

/** No mobile o mesmo scroll avança mais palavras (frase “acompanha” mais depressa). */
function scrollProgressToWordPhase(raw, isMobile) {
    const v = Math.min(1, Math.max(0, raw));
    if (!isMobile) return v;
    return Math.min(1, v * 1.48);
}

function highlightedWordCount(scrollProgress, totalWords, isMobile) {
    const phase = scrollProgressToWordPhase(scrollProgress, isMobile);
    return Math.min(totalWords, Math.ceil(phase * totalWords));
}

export default function Phase() {
    const sectionRef = useRef(null);
    const [activeWords, setActiveWords] = useState(0);

    const isMobile = useSyncExternalStore(
        subscribeMobilePhase,
        getMobilePhaseSnapshot,
        getMobilePhaseServerSnapshot,
    );

    const scrollOffset = isMobile
        ? ["start end", "center center"]
        : ["start 0.78", "end 0.32"];

    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: scrollOffset,
    });

    useLayoutEffect(() => {
        setActiveWords(
            highlightedWordCount(
                scrollYProgress.get(),
                WORDS.length,
                isMobile,
            ),
        );
    }, [scrollYProgress, isMobile]);

    useMotionValueEvent(scrollYProgress, "change", (v) => {
        const next = highlightedWordCount(v, WORDS.length, isMobile);
        setActiveWords((prev) => (prev === next ? prev : next));
    });

    return (
        <section
            ref={sectionRef}
            className="bg-backdrop-primary box-border flex min-h-[88svh] w-full min-w-0 flex-col px-10 py-16 sm:min-h-screen sm:py-20 md:px-16 lg:px-24 xl:px-32"
        >
            <div className="mx-auto flex w-full min-w-0 max-w-7xl flex-col gap-10">
                <h1 className="mx-auto w-full max-w-4xl  text-center text-4xl sm:text-7xl font-semibold text-balance md:text-pretty wrap-break-word">
                    {WORDS.map((word, i) => (
                        <span key={i}>
                            {i > 0 ? " " : null}
                            <span
                                className={
                                    i < activeWords
                                        ? "text-title-primary"
                                        : "text-text-primary"
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
