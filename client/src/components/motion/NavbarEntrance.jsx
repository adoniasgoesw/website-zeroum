import { motion, useReducedMotion } from "framer-motion";
import {
    navbarEntranceHidden,
    navbarEntranceTransition,
    navbarEntranceVisible,
} from "@/constants/navbarMotion";

/**
 * Fade-in + desce de cima na carga da página (navbar).
 */
export default function NavbarEntrance({
    delay = 0,
    className = "",
    children,
}) {
    const reduceMotion = useReducedMotion();

    if (reduceMotion) {
        return <div className={className}>{children}</div>;
    }

    return (
        <motion.div
            className={className}
            initial={navbarEntranceHidden}
            animate={navbarEntranceVisible}
            transition={navbarEntranceTransition(delay)}
        >
            {children}
        </motion.div>
    );
}
