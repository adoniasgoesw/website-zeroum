import { useLayoutEffect, useRef, useState } from "react";
import { useScroll, useMotionValueEvent } from "framer-motion";

const PHRASE =
    "Lorem Ipsum is a standard placeholder text used in design and publishing to simulate content without distracting from layout and typography.";

const WORDS = PHRASE.split(/\s+/).filter(Boolean);

function highlightedWordCount(scrollProgress, totalWords) {
    const v = Math.min(1, Math.max(0, scrollProgress));
    return Math.min(totalWords, Math.ceil(v * totalWords));
}

export default function Phase() {
    const sectionRef = useRef(null);
    const [activeWords, setActiveWords] = useState(0);

    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start 0.78", "end 0.32"],
    });

    useLayoutEffect(() => {
        setActiveWords(highlightedWordCount(scrollYProgress.get(), WORDS.length));
    }, [scrollYProgress]);

    useMotionValueEvent(scrollYProgress, "change", (v) => {
        const next = highlightedWordCount(v, WORDS.length);
        setActiveWords((prev) => (prev === next ? prev : next));
    });

    return (
        <section
            ref={sectionRef}
            className="bg-backdrop-primary box-border flex w-full min-w-0 flex-col py-20 min-h-screen px-10 md:px-16 lg:px-24 xl:px-32"
        >
            <div className="mx-auto flex w-full min-w-0 max-w-7xl flex-col gap-10">
                <h1 className="mx-auto w-full max-w-4xl text-center text-6xl font-semibold text-balance md:text-pretty wrap-break-word">
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
