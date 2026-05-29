/** Entrada das imagens do About (scale + fade). */
export const ABOUT_IMAGE_VIEWPORT = { once: true, amount: 0.25 };

export const ABOUT_IMAGE_EASE = [0.45, 0, 0.55, 1];
export const ABOUT_IMAGE_DURATION = 0.9;

export const aboutImageHidden = { opacity: 0, scale: 0.92 };
export const aboutImageVisible = { opacity: 1, scale: 1 };

/** Imagem 2 entra após a 1. */
export const ABOUT_IMAGE_2_DELAY = 0.22;

export function aboutImageTransition(delay = 0) {
    return {
        duration: ABOUT_IMAGE_DURATION,
        ease: ABOUT_IMAGE_EASE,
        delay,
    };
}

/** Count-up dos stats. */
export const ABOUT_STATS_VIEWPORT = { once: true, amount: 0.35 };
export const ABOUT_COUNT_DURATION_MS = 2000;
export const ABOUT_COUNT_EASE_POWER = 3;
