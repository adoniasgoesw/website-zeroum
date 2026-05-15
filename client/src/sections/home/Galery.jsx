import { useLayoutEffect, useMemo, useRef, useState } from "react";
import {
    motion,
    useInView,
    useReducedMotion,
} from "framer-motion";
import { galery } from "../../data/Data";

const COLS_MOBILE = 2;
const COLS_DESKTOP = 3;

/** Ordem de entrada das fotos (rótulos 1–6 no array): 1 → 2 → 3 → 4 → 6 → 5 → índices 0-based. */
const GALLERY_ANIM_ORDER = [0, 1, 2, 3, 5, 4];
/** Espaço entre o início da animação de cada foto (sequência lenta). */
const GALLERY_TILE_STAGGER_S = 0.32;
/** Duração da entrada de cada tile (translate + scale + opacidade). */
const GALLERY_TILE_ENTER_DURATION_S = 1.42;

const galleryEnterEase = [0.25, 0.1, 0.25, 1];
const easeSmooth = [0.22, 1, 0.36, 1];

const sectionViewport = { once: true, amount: 0.12 };

/** Grelha inteira: animação só na entrada; ao sair do viewport mantém estado final (sem saída). */
const gridInViewOptions = {
    once: true,
    amount: 0.28,
    margin: "0px 0px -12% 0px",
};

function staggerRankForGalleryIndex(sequenceIndex) {
    const rank = GALLERY_ANIM_ORDER.indexOf(sequenceIndex);
    return rank === -1 ? sequenceIndex : rank;
}

const galleryTileHidden = {
    opacity: 0,
    y: 48,
    scale: 0.92,
    transition: { duration: 0.4, ease: [0.4, 0, 0.2, 1] },
};

const headerContainer = {
    hidden: {},
    visible: {
        transition: {
            staggerChildren: 0.14,
            delayChildren: 0,
        },
    },
};

const headerChild = {
    hidden: {
        opacity: 0,
        y: 36,
        transition: { duration: 0.35, ease: [0.4, 0, 0.2, 1] },
    },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.55, ease: easeSmooth },
    },
};

function splitIntoColumns(items, colCount) {
    return Array.from({ length: colCount }, (_, col) =>
        items.filter((_, i) => i % colCount === col),
    );
}

function useGalleryCols() {
    const [cols, setCols] = useState(COLS_MOBILE);

    useLayoutEffect(() => {
        const mq = window.matchMedia("(min-width: 768px)");
        const apply = () =>
            setCols(mq.matches ? COLS_DESKTOP : COLS_MOBILE);
        apply();
        mq.addEventListener("change", apply);
        return () => mq.removeEventListener("change", apply);
    }, []);

    return cols;
}

function tileAspectClass(globalIndex) {
    if (globalIndex === 1) {
        return "aspect-[4/5] w-full";
    }
    return "aspect-square w-full";
}

const tileShellBase =
    "relative min-h-0 w-full min-w-0 overflow-hidden rounded-2xl bg-backdrop-secondary shadow-[0_2px_20px_-4px_rgba(0,0,0,0.07)] sm:rounded-[1.35rem] md:rounded-3xl md:shadow-[0_6px_28px_-6px_rgba(0,0,0,0.09)]";

function GalleryAnimatedTile({ item, sequenceIndex, gridInView }) {
    const reduceMotion = useReducedMotion();
    const prefersReduced = reduceMotion === true;

    const shellClass = `${tileShellBase} ${tileAspectClass(sequenceIndex)}`;

    const variants = useMemo(() => {
        const rank = staggerRankForGalleryIndex(sequenceIndex);
        return {
            hidden: galleryTileHidden,
            visible: {
                opacity: 1,
                y: 0,
                scale: 1,
                transition: {
                    duration: GALLERY_TILE_ENTER_DURATION_S,
                    ease: galleryEnterEase,
                    delay: rank * GALLERY_TILE_STAGGER_S,
                },
            },
        };
    }, [sequenceIndex]);

    if (prefersReduced) {
        return (
            <div className={shellClass}>
                <img
                    src={item.Image}
                    alt={`Galeria ${sequenceIndex + 1}`}
                    className="h-full w-full object-cover"
                    loading="lazy"
                />
            </div>
        );
    }

    return (
        <motion.div
            className={shellClass}
            variants={variants}
            initial="hidden"
            animate={gridInView ? "visible" : "hidden"}
        >
            <img
                src={item.Image}
                alt={`Galeria ${sequenceIndex + 1}`}
                loading="lazy"
                className="h-full w-full object-cover"
            />
        </motion.div>
    );
}

function GalleryStacks({
    columns,
    colCount,
    stackGapClass,
    wrapperClass,
}) {
    const gridRef = useRef(null);
    const gridInView = useInView(gridRef, gridInViewOptions);

    return (
        <div ref={gridRef} className={wrapperClass}>
            {columns.map((colItems, colIndex) => (
                <div
                    key={colIndex}
                    className={`flex min-h-0 min-w-0 flex-col ${stackGapClass}`}
                >
                    {colItems.map((item, rowIdx) => {
                        const sequenceIndex = colIndex + rowIdx * colCount;
                        return (
                            <GalleryAnimatedTile
                                key={`${colCount}-${sequenceIndex}`}
                                item={item}
                                sequenceIndex={sequenceIndex}
                                gridInView={gridInView}
                            />
                        );
                    })}
                </div>
            ))}
        </div>
    );
}

export default function Galery() {
    const sectionRef = useRef(null);
    const sectionInView = useInView(sectionRef, sectionViewport);
    const cols = useGalleryCols();

    const columns = splitIntoColumns(galery, cols);

    const wrapperClass =
        cols === COLS_MOBILE
            ? "grid grid-cols-2 items-start gap-x-5 sm:gap-x-6"
            : "grid grid-cols-3 items-start gap-6 lg:gap-8";

    const stackGapClass =
        cols === COLS_MOBILE ? "gap-5 sm:gap-6" : "gap-6 lg:gap-8";

    return (
        <motion.section
            ref={sectionRef}
            className="box-border w-full min-w-0 bg-backdrop-primary px-10 py-16 pb-20 md:px-16 md:py-20 lg:px-24 lg:pb-24 xl:px-32"
        >
            <div className="mx-auto flex w-full max-w-7xl flex-col gap-8 md:gap-10">
                <motion.div
                    className="space-y-2"
                    variants={headerContainer}
                    initial="hidden"
                    animate={sectionInView ? "visible" : "hidden"}
                >
                    <motion.h1
                        variants={headerChild}
                        className="text-center text-4xl font-semibold text-title-primary sm:text-5xl md:text-start"
                    >
                        Nossa Galeria
                    </motion.h1>
                    <motion.p
                        variants={headerChild}
                        className="mx-auto max-w-sm text-center text-xs font-light text-text-primary md:mx-0 md:text-start"
                    >
                        Lorem ipsum dolor sit amet, consectetur adipiscing
                        elit, sed do eiusmod tempor incididunt ut labore.
                    </motion.p>
                </motion.div>

                <GalleryStacks
                    columns={columns}
                    colCount={cols}
                    stackGapClass={stackGapClass}
                    wrapperClass={wrapperClass}
                />
            </div>
        </motion.section>
    );
}
