import { AnimatePresence, motion } from "framer-motion";
import Divisor from "../Divisor";
import { TESTIMONIAL_CONTENT_EASE, TESTIMONIAL_FADE_MS } from "@/constants/testimonialsMotion";

export default function TestimonialsCard({ name, description, swapKey, enableSwapAnimation }) {
    const transition = {
        duration: TESTIMONIAL_FADE_MS / 1000,
        ease: TESTIMONIAL_CONTENT_EASE,
    };

    return (
        <article className="w-full h-full flex items-center justify-center">
            <AnimatePresence mode="wait">
                <motion.div
                    key={swapKey}
                    className="flex flex-col items-center md:items-start"
                    initial={enableSwapAnimation ? { opacity: 0 } : false}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={transition}
                >
                    <div className="flex flex-col gap-5 max-w-2xl mx-auto">
                        <p className=" text-center text-md leading-relaxed text-light-primary/85  md:mx-0 md:text-start font-poppins font-light">
                            {description}
                        </p>
                        <h1 className="text-2xl font-bold font-syncopate text-light-primary text-center md:text-start">
                            {name}
                        </h1>
                    </div>
                    <Divisor />
                </motion.div>
            </AnimatePresence>
        </article>
    );
}