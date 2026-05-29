/** Fade texto (exit / enter) — contínuo, sem pegada forte de ease-in puro no fim */
export const TESTIMONIAL_FADE_MS = 920;

/**
 * Fluxo perceptível do início ao fim sem “solavanco” ao meio;
 * próximo ao material / ease-out suave — opacidade acompanha naturalmente.
 */
export const TESTIMONIAL_CONTENT_EASE = [0.33, 0, 0.2, 1];

export const TESTIMONIAL_SWAP_TOTAL_MS = TESTIMONIAL_FADE_MS * 2;

/**
 * Pico exatamente ao meio; cada metade usa ease-in-out para não travar velocidade no ápice
 * (dois ease-in seguidos davam sensação de pausa).
 */
export const TESTIMONIAL_QUOTE_CYCLE_TIMES = [0, 0.5, 1];

/** dois segmentos: subida ao pico e volta — mesma família ease-in-out */
export const TESTIMONIAL_QUOTE_EASE = [0.45, 0, 0.55, 1];

export const QUOTE_TRANSLATE_PX = { mobile: 11, desktop: 24 };

/**
 * Carrossel de produtos — mesma duração e easing das aspas (testemunhos),
 * uma transição contínua (sem keyframe duplo das quotes).
 */
export const PRODUCT_SLIDE_TRANSITION = {
    type: "tween",
    duration: TESTIMONIAL_SWAP_TOTAL_MS / 1000,
    ease: TESTIMONIAL_QUOTE_EASE,
};
