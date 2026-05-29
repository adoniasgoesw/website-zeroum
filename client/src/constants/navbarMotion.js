import {
    SECTION_REVEAL_DURATION,
    SECTION_REVEAL_EASE,
} from "@/constants/sectionRevealMotion";

/** Entrada do navbar — mesma velocidade/easing do footer (Reveal). */
export const NAVBAR_ENTRANCE_EASE = SECTION_REVEAL_EASE;
export const NAVBAR_ENTRANCE_DURATION = SECTION_REVEAL_DURATION;

export const navbarEntranceHidden = { opacity: 0, y: -20 };
export const navbarEntranceVisible = { opacity: 1, y: 0 };

/** Cascata leve entre logo, links e CTA. */
export const NAVBAR_ENTRANCE_STAGGER = 0.08;

export function navbarEntranceTransition(delay = 0) {
    return {
        duration: NAVBAR_ENTRANCE_DURATION,
        ease: NAVBAR_ENTRANCE_EASE,
        delay,
    };
}
