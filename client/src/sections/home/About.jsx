import { motion } from "framer-motion";

const viewportAbout = { once: true, amount: 0.32 };

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
            ease: [0.22, 1, 0.36, 1],
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
            ease: [0.22, 1, 0.36, 1],
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
        transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
    },
};

export default function About() {
    return (
        <motion.section
            className="bg-backdrop-primary box-border flex w-full min-w-0 flex-col overflow-x-hidden py-20 min-h-screen px-10 md:px-16 lg:px-24 xl:px-32"
            initial="hidden"
            whileInView="visible"
            viewport={viewportAbout}
            variants={{ hidden: {}, visible: {} }}
        >
            <div className="flex flex-col lg:flex-row h-auto w-full items-center justify-between gap-10 ">
                <div className="relative mx-auto aspect-5/4 w-full max-w-[min(24rem,calc(100vw-2.5rem))] sm:max-w-[min(26rem,calc(100vw-3rem))] md:max-w-[min(28rem,calc(100vw-4rem))] lg:aspect-auto lg:h-[400px] xl:h-[540px] lg:max-w-none flex justify-center items-center">
                    <div className="relative h-full min-h-[220px] w-full">
                        <motion.div
                            variants={imageOne}
                            className="absolute top-0 left-0 aspect-square w-[58%] max-h-[400px] max-w-[400px] origin-center rounded-sm bg-backdrop-secondary"
                        />
                        <motion.div
                            variants={imageTwo}
                            className="absolute right-0 bottom-0 aspect-square w-[58%] max-h-[400px] max-w-[400px] origin-center rounded-sm bg-backdrop-primary p-3 sm:p-4"
                        >
                            <div className="h-full w-full rounded-sm bg-backdrop-secondary" />
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
                            Zero Um
                        </motion.h1>
                        <motion.p
                            className="text-xs font-light wrap-break-word text-text-primary"
                            variants={textChild}
                        >
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                            incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
                            exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure
                            dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                            Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt
                            mollit anim id est laborum.
                        </motion.p>
                    </motion.div>
                </div>
            </div>
        </motion.section>
    );
}
