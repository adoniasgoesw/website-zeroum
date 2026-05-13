import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { FaQuoteLeft, FaQuoteRight } from "react-icons/fa";
import Button from "../../componenst/Button";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";

const easeOut = [0.22, 1, 0.36, 1];

const quoteLeftMotion = {
    hidden: {
        opacity: 0,
        x: -52,
        y: -8,
        scale: 0.88,
        rotate: -6,
        transition: { duration: 0.35, ease: [0.4, 0, 0.2, 1] },
    },
    visible: {
        opacity: 1,
        x: 0,
        y: 0,
        scale: 1,
        rotate: 0,
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
        y: 10,
        scale: 0.88,
        rotate: 6,
        transition: { duration: 0.35, ease: [0.4, 0, 0.2, 1] },
    },
    visible: {
        opacity: 1,
        x: 0,
        y: 0,
        scale: 1,
        rotate: 0,
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

export default function Testimonials() {
    const rootRef = useRef(null);
    const isInView = useInView(rootRef, {
        once: true,
        amount: "some",
        margin: "0px 0px -12% 0px",
    });
    const show = isInView ? "visible" : "hidden";

    return (
        <section className="bg-backdrop-secondary box-border flex min-h-96 w-full min-w-0 flex-col px-4 py-12 sm:px-8 sm:py-16 md:min-h-128 md:px-16 md:py-20 lg:min-h-152 lg:px-24 xl:min-h-176 xl:px-32">
            <div
                ref={rootRef}
                className="relative flex min-h-0 w-full flex-1 flex-col gap-4 sm:gap-6 md:gap-10"
            >
                <div className="pointer-events-none absolute inset-0 overflow-hidden">
                    <div className="relative h-full min-h-48 w-full sm:min-h-52">
                        <motion.div
                            className="absolute top-0 left-0 opacity-75 sm:opacity-90 md:opacity-100"
                            variants={quoteLeftMotion}
                            initial="hidden"
                            animate={show}
                        >
                            <FaQuoteLeft className="size-10 text-quote-primary sm:size-12 md:size-18 lg:size-24 xl:size-28" />
                        </motion.div>
                        <motion.div
                            className="absolute right-0 bottom-0 opacity-75 sm:opacity-90 md:opacity-100"
                            variants={quoteRightMotion}
                            initial="hidden"
                            animate={show}
                        >
                            <FaQuoteRight className="size-10 text-quote-primary sm:size-12 md:size-18 lg:size-24 xl:size-28" />
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
                        />
                        <Button
                            variant="icon"
                            icon={<ChevronRightIcon className="size-4 sm:size-4.5" />}
                            className="size-10! sm:size-12!"
                            aria-label="Próximo depoimento"
                        />
                    </div>
                </motion.div>

                <motion.div
                    className="relative z-10 flex min-h-0 w-full flex-1 items-center justify-center px-0 sm:px-2"
                    variants={testimonialMotion}
                    initial="hidden"
                    animate={show}
                >
                    <div className="mx-auto flex w-full max-w-4xl min-w-0 flex-col gap-2 sm:gap-3 md:gap-4">
                        <p className="wrap-break-word text-sm leading-relaxed font-light text-text-testimonials-primary sm:text-base md:text-xl lg:text-2xl">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                        </p>

                        <label className="text-lg font-medium text-text-testimonials-primary sm:text-xl md:text-2xl">
                            Matheus Silva
                        </label>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
