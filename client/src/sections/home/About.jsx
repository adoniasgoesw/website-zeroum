import { useEffect, useMemo, useRef, useState } from "react";
import { animate, motion, useInView } from "framer-motion";
import { company } from "../../data/Data";

const viewportAbout = { once: true, amount: 0.32 };

/** Mesmo raio dos tiles em Galery.jsx (`tileShellBase`). */
const aboutImageRadius =
    "overflow-hidden rounded-3xl sm:rounded-[1.35rem] md:rounded-3xl";

const easeSmooth = [0.22, 1, 0.36, 1];
const easeCount = [0.25, 0.1, 0.25, 1];

/** Duração da contagem: nem rápida nem lenta. */
const COUNT_DURATION = 1.28;
/** Pequeno atraso após o label, antes da contagem (mesma coluna). */
const COUNT_BASE_DELAY_MS = 320;

const statColumnViewport = {
    once: true,
    amount: 0.38,
    margin: "0px 0px -12% 0px",
};

const imageOne = {
    hidden: {
        opacity: 0,
        scale: 0.35,
    },
    visible: {
        opacity: 1,
        scale: 1,
        transition: {
            duration: 0.58,
            ease: easeSmooth,
        },
    },
};

const imageTwo = {
    hidden: {
        opacity: 0,
        scale: 0.35,
    },
    visible: {
        opacity: 1,
        scale: 1,
        transition: {
            duration: 0.58,
            delay: 0.14,
            ease: easeSmooth,
        },
    },
};

const textWrap = {
    hidden: {},
    visible: {
        transition: {
            delayChildren: 0.5,
            staggerChildren: 0.12,
        },
    },
};

const textChild = {
    hidden: {
        opacity: 0,
        y: 32,
        transition: { duration: 0.35, ease: [0.4, 0, 0.2, 1] },
    },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.55, ease: easeSmooth },
    },
};

const statColumnVariants = {
    hidden: {},
    visible: {
        transition: {
            staggerChildren: 0.14,
        },
    },
};

const statLabelVariants = {
    hidden: {
        opacity: 0,
        y: 22,
    },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.5,
            ease: easeSmooth,
        },
    },
};

const statValueVariants = {
    hidden: {
        opacity: 0,
    },
    visible: {
        opacity: 1,
        transition: {
            duration: 0.28,
            ease: easeSmooth,
        },
    },
};

function parseStatValue(value) {
    if (typeof value === "number" && Number.isFinite(value)) {
        return {
            target: value,
            format: (n) => String(Math.round(n)),
        };
    }
    const s = String(value).trim();

    const pct = s.match(/^([\d.]+)\s*%$/);
    if (pct) {
        const target = parseFloat(pct[1]);
        if (Number.isFinite(target)) {
            return {
                target,
                format: (n) => `${Math.round(n)}%`,
            };
        }
    }

    /* "5+", "200+" → conta só o número; "+" surge no fim. Outros sufixos animam junto. */
    const withSuffix = s.match(/^([\d.]+)([^\d]*)$/);
    if (withSuffix) {
        const target = parseFloat(withSuffix[1]);
        const suffix = withSuffix[2] ?? "";
        if (Number.isFinite(target)) {
            return {
                target,
                format: (n) => `${Math.round(n)}${suffix}`,
                /** "+" só entra depois da contagem, com fade-in. */
                deferPlus: suffix === "+",
            };
        }
    }

    return { target: null, format: () => s };
}

function AnimatedStatValue({ value, className, columnVisible }) {
    const parsed = useMemo(() => parseStatValue(value), [value]);
    const deferPlus = parsed.deferPlus === true;

    const [display, setDisplay] = useState(() =>
        parsed.target !== null
            ? deferPlus
                ? "0"
                : parsed.format(0)
            : String(value),
    );
    const [showPlus, setShowPlus] = useState(false);

    useEffect(() => {
        if (!columnVisible) return;

        if (parsed.target === null) {
            setDisplay(String(value));
            setShowPlus(false);
            return;
        }

        setShowPlus(false);
        setDisplay(deferPlus ? "0" : parsed.format(0));

        let controls;
        let cancelled = false;

        const tid = window.setTimeout(() => {
            controls = animate(0, parsed.target, {
                duration: COUNT_DURATION,
                ease: easeCount,
                onUpdate: (latest) => {
                    setDisplay(
                        deferPlus
                            ? String(Math.round(latest))
                            : parsed.format(latest),
                    );
                },
                onComplete: () => {
                    if (!cancelled && deferPlus) setShowPlus(true);
                },
            });
        }, COUNT_BASE_DELAY_MS);

        return () => {
            cancelled = true;
            window.clearTimeout(tid);
            controls?.stop?.();
        };
    }, [columnVisible, parsed, value, deferPlus]);

    if (parsed.target === null) {
        return <span className={className}>{String(value)}</span>;
    }

    return (
        <span className={`inline-flex items-baseline ${className ?? ""}`}>
            <span className="tabular-nums">{display}</span>
            {deferPlus ? (
                <motion.span
                    aria-hidden={!showPlus}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: showPlus ? 1 : 0 }}
                    transition={{ duration: 0.42, ease: easeSmooth }}
                    className="tabular-nums inline-block min-w-[0.5ch]"
                >
                    +
                </motion.span>
            ) : null}
        </span>
    );
}

function AboutStatColumn({ stat }) {
    const ref = useRef(null);
    const columnInView = useInView(ref, statColumnViewport);

    return (
        <motion.div
            ref={ref}
            variants={statColumnVariants}
            initial="hidden"
            animate={columnInView ? "visible" : "hidden"}
            className="flex min-w-0 flex-col gap-2"
        >
            <motion.span
                variants={statLabelVariants}
                className="text-[11px] font-normal uppercase tracking-wide text-text-primary/80 sm:text-xs"
            >
                {stat.label}
            </motion.span>
            <motion.span
                variants={statValueVariants}
                className="block text-2xl font-semibold tabular-nums text-title-primary sm:text-3xl"
            >
                <AnimatedStatValue
                    value={stat.value}
                    columnVisible={columnInView}
                    className="tabular-nums"
                />
            </motion.span>
        </motion.div>
    );
}

export default function About() {
    const about = company[0];

    return (
        <motion.section
            className="bg-backdrop-primary box-border flex min-h-screen w-full min-w-0 flex-col overflow-x-hidden px-10 py-20 md:px-16 lg:px-24 xl:px-32"
            initial="hidden"
            whileInView="visible"
            viewport={viewportAbout}
            variants={{ hidden: {}, visible: {} }}
        >
            <div className="flex h-auto w-full flex-col items-center justify-between gap-10 lg:flex-row">
                <div className="relative mx-auto flex aspect-5/4 w-full max-w-[min(24rem,calc(100vw-2.5rem))] items-center justify-center sm:max-w-[min(26rem,calc(100vw-3rem))] md:max-w-[min(28rem,calc(100vw-4rem))] lg:aspect-auto lg:h-[400px] lg:max-w-none xl:h-[540px]">
                    <div className="relative h-full min-h-[220px] w-full">
                        <motion.div
                            variants={imageOne}
                            className={`absolute top-0 left-0 aspect-square w-[58%] max-h-[400px] max-w-[400px] origin-center bg-backdrop-secondary ${aboutImageRadius}`}
                        />
                        <motion.div
                            variants={imageTwo}
                            className={`absolute right-0 bottom-0 aspect-square w-[58%] max-h-[400px] max-w-[400px] origin-center bg-backdrop-primary p-3 sm:p-4 ${aboutImageRadius}`}
                        >
                            <div
                                className={`h-full w-full bg-backdrop-secondary ${aboutImageRadius}`}
                            />
                        </motion.div>
                    </div>
                </div>
                <div className="flex h-full w-full items-center justify-center">
                    <motion.div
                        className="flex max-w-lg flex-col gap-2"
                        variants={textWrap}
                    >
                        <motion.h1
                            className="text-4xl font-semibold text-title-primary sm:text-5xl"
                            variants={textChild}
                        >
                            {about?.name ?? ""}
                        </motion.h1>
                        <motion.p
                            className="text-xs font-light wrap-break-word text-text-primary"
                            variants={textChild}
                        >
                            {about?.description ?? ""}
                        </motion.p>
                        <motion.div
                            variants={textChild}
                            className="mt-6 w-full"
                        >
                            <div className="grid w-full grid-cols-1 gap-8 sm:grid-cols-3 sm:gap-6">
                                {(about?.stats ?? []).map((stat, i) => (
                                    <AboutStatColumn
                                        key={`${stat.label}-${i}`}
                                        stat={stat}
                                    />
                                ))}
                            </div>
                        </motion.div>
                    </motion.div>
                </div>
            </div>
        </motion.section>
    );
}
