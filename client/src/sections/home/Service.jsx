import { useSyncExternalStore } from "react";
import { motion } from "framer-motion";
import ServiceCard from "../../componenst/ServiceCard";
import { services } from "../../data/Data";

const viewportHeader = { once: true, amount: 0.22, margin: "0px 0px -8% 0px" };

const viewportCards = { once: true, amount: 0.48, margin: "0px 0px -10% 0px" };

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
        () => 1
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
        transition: { staggerChildren: 0.12, delayChildren: 0.04 },
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
        transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
    },
};

const rowSlide = {
    hidden: {
        opacity: 0,
        x: "clamp(4rem, 18vw, 10rem)",
        transition: { duration: 0.4, ease: [0.4, 0, 1, 1] },
    },
    visible: {
        opacity: 1,
        x: 0,
        transition: {
            duration: 2.0,
            delay: 0.3,
            ease: [0.22, 1, 0.36, 1],
        },
    },
};

export default function Service() {
    const columns = useServiceGridColumns();
    const rows = chunkByRow(services, columns);

    return (
        <section className="bg-backdrop-primary box-border flex w-full min-w-0 flex-col overflow-x-hidden py-20 min-h-screen px-10 md:px-16 lg:px-24 xl:px-32">
            <div className="flex min-h-0 w-full min-w-0 flex-1 flex-col gap-10">
                <motion.div
                    className="flex flex-col gap-2"
                    initial="hidden"
                    whileInView="visible"
                    viewport={viewportHeader}
                    variants={headerContainer}
                >
                    <motion.h1
                        className="text-4xl sm:text-5xl font-semibold text-title-primary"
                        variants={headerChild}
                    >
                        Escolha seu estilo
                    </motion.h1>
                    <motion.p
                        className="text-xs font-light max-w-lg wrap-break-word text-text-primary"
                        variants={headerChild}
                    >
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                        incididunt ut labore et dolore magna aliqua.
                    </motion.p>
                </motion.div>

                <div className="flex h-full w-full min-w-0 flex-col gap-6">
                    {rows.map((row, rowIndex) => (
                        <motion.div
                            key={`${columns}-${row.map((s) => s.id).join("-")}-${rowIndex}`}
                            className="grid w-full min-w-0 grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-4"
                            initial="hidden"
                            whileInView="visible"
                            viewport={viewportCards}
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
                </div>
            </div>
        </section>
    );
}
