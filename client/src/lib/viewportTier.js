/**
 * Tier de viewport alinhado aos breakpoints Tailwind (~sm 640 / md 768 / lg 1024).
 * Usado em Phase, Testimonials, etc., para offsets de scroll consistentes.
 */

/** @typedef {"mobile"|"sm"|"md"|"lg"} ViewportTier */

export function subscribeViewportTier(cb) {
    window.addEventListener("resize", cb);
    window.addEventListener("orientationchange", cb);
    return () => {
        window.removeEventListener("resize", cb);
        window.removeEventListener("orientationchange", cb);
    };
}

/** @returns {ViewportTier} */
export function getViewportTierSnapshot() {
    const w = window.innerWidth;
    if (w < 640) return "mobile";
    if (w < 768) return "sm";
    if (w < 1024) return "md";
    return "lg";
}

/** @returns {ViewportTier} */
export function getViewportTierServerSnapshot() {
    return "lg";
}
