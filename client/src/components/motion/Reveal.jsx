import { motion, useReducedMotion } from "framer-motion";
import {
    REVEAL_VIEWPORT,
    revealHidden,
    revealVisible,
    sectionRevealTransition,
} from "@/constants/sectionRevealMotion";

/**
 * Anima o bloco inteiro ao entrar na viewport (fade + subida).
 * Todos os filhos entram juntos — sem sequência interna.
 */
export default function Reveal({ className = "", children }) {
    const reduceMotion = useReducedMotion();

    if (reduceMotion) {
        return <div className={className}>{children}</div>;
    }

    return (
        <motion.div
            className={className}
            initial={revealHidden}
            whileInView={revealVisible}
            viewport={REVEAL_VIEWPORT}
            transition={sectionRevealTransition}
        >
            {children}
        </motion.div>
    );
}
