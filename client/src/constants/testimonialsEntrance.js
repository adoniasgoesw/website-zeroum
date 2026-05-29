/** Entrada em camadas da seção Testemunhos. */
export const TESTIMONIAL_ENTRANCE_VIEWPORT = {
    once: true,
    amount: 0.18,
};

export const TESTIMONIAL_ENTRANCE_EASE = [0.45, 0, 0.55, 1];
export const TESTIMONIAL_ENTRANCE_DURATION = 0.74;

export const TESTIMONIAL_STEP_TOP = 0;
export const TESTIMONIAL_STEP_NAV = 0.16;
export const TESTIMONIAL_STEP_CARD = 0.32;
export const TESTIMONIAL_STEP_BOTTOM = 0.48;

/** Subida da seção no scroll — um pouco mais rápida que antes. */
export const TESTIMONIALS_FLOAT_PX = 115;

export const TESTIMONIALS_SCROLL_OFFSET_BY_TIER = {
    mobile: ["start end", "start 0.54"],
    sm: ["start end", "start 0.5"],
    md: ["start end", "start 0.46"],
    lg: ["start end", "start 0.42"],
};

export function testimonialEntranceTransition(step) {
    return {
        duration: TESTIMONIAL_ENTRANCE_DURATION,
        ease: TESTIMONIAL_ENTRANCE_EASE,
        delay: step,
    };
}

export const quoteTopEntranceHidden = {
    opacity: 0,
    scale: 0.88,
    x: -14,
    y: -18,
    rotate: -3.5,
};

export const quoteBottomEntranceHidden = {
    opacity: 0,
    scale: 0.88,
    x: 14,
    y: 18,
    rotate: 3.5,
};

export const quoteEntranceVisible = {
    opacity: 1,
    scale: 1,
    x: 0,
    y: 0,
    rotate: 0,
};

export const navEntranceHidden = { opacity: 0, scale: 0.9 };
export const navEntranceVisible = { opacity: 1, scale: 1 };

export const cardEntranceHidden = { opacity: 0, y: 22 };
export const cardEntranceVisible = { opacity: 1, y: 0 };
