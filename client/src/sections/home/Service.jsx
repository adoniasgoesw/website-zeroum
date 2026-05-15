import { useSyncExternalStore } from "react";
import { motion } from "framer-motion";
import ServiceCard from "../../componenst/ServiceCard";
import { services } from "../../data/Data";

const viewportHeader = { once: true, amount: 0.22, margin: "0px 0px -8% 0px" };

const viewportCards = { once: true, amount: 0.42, margin: "0px 0px -10% 0px" };

/** Mesma família que Testimonials — arranque calmo, fecho mais vivo */
const serviceEase = [0.25, 0.1, 0.25, 1];

function subscribeToServiceBreakpoints(onChange) {
    const mqXl = window.matchMedia("(min-width: 1280px)");
    const mqSm = window.matchMedia("(min-width: 640px)");
    mqXl.addEventListener("change", onChange);
    mqSm.addEventListener("change", onChange);
    return () => {
        mqXl.removeEventListener("change", onChange);
        mqSm.removeEventListener("change", onChange);
    };
}

function serviceGridColumnsSnapshot() {
    if (window.matchMedia("(min-width: 1280px)").matches) return 4;
    if (window.matchMedia("(min-width: 640px)").matches) return 2;
    return 1;
}

function useServiceGridColumns() {
    return useSyncExternalStore(
        subscribeToServiceBreakpoints,
        serviceGridColumnsSnapshot,
        () => 1,
    );
}

function chunkByRow(items, columns) {
    const rows = [];
    for (let i = 0; i < items.length; i += columns) {
        rows.push(items.slice(i, i + columns));
    }
    return rows;
}

const headerContainer = {
    hidden: {},
    visible: {
        transition: { staggerChildren: 0.14, delayChildren: 0.04 },
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
        transition: { duration: 0.58, ease: serviceEase },
    },
};

/** Depois do título/descrição: cada linha de cards entra com stagger */
const cardsContainer = {
    hidden: {},
    visible: {
        transition: {
            delayChildren: 0.20,
            staggerChildren: 0.22,
        },
    },
};

/** Slide direita → esquerda, lento no início e mais rápido no fim */
const rowSlide = {
    hidden: {
        opacity: 0,
        x: "clamp(2.5rem, 12vw, 7rem)",
        transition: { duration: 0.32, ease: [0.4, 0, 0.2, 1] },
    },
    visible: {
        opacity: 1,
        x: 0,
        transition: {
            duration: 1.46,
            ease: serviceEase,
        },
    },
};

export default function Service() {
    const columns = useServiceGridColumns();
    const rows = chunkByRow(services, columns);

    return (
        <section className="box-border flex min-h-screen w-full min-w-0 flex-col overflow-x-hidden bg-backdrop-primary px-10 py-20 md:px-16 lg:px-24 xl:px-32">
            <div className="flex min-h-0 w-full min-w-0 flex-1 flex-col gap-10">
                <motion.div
                    className="flex flex-col gap-2"
                    initial="hidden"
                    whileInView="visible"
                    viewport={viewportHeader}
                    variants={headerContainer}
                >
                    <motion.h1
                        className="text-center text-4xl font-semibold text-title-primary sm:text-5xl md:text-start"
                        variants={headerChild}
                    >
                        Escolha seu estilo
                    </motion.h1>
                    <motion.p
                        className="mx-auto max-w-lg text-center text-xs font-light wrap-break-word text-text-primary md:mx-0 md:text-start"
                        variants={headerChild}
                    >
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                        sed do eiusmod tempor incididunt ut labore et dolore magna
                        aliqua.
                    </motion.p>
                </motion.div>

                <motion.div
                    className="flex h-full w-full min-w-0 flex-col gap-6"
                    initial="hidden"
                    whileInView="visible"
                    viewport={viewportCards}
                    variants={cardsContainer}
                >
                    {rows.map((row, rowIndex) => (
                        <motion.div
                            key={`${columns}-${row.map((s) => s.id).join("-")}-${rowIndex}`}
                            className="grid w-full min-w-0 grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-4"
                            variants={rowSlide}
                        >
                            {row.map(({ id, title, description, image }) => (
                                <div key={id} className="min-w-0">
                                    <ServiceCard
                                        id={id}
                                        title={title}
                                        description={description}
                                        image={image}
                                    />
                                </div>
                            ))}
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
