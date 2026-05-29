/** Entrada dos cards do slider de produtos (scale + fade + rotação leve). */
export const PRODUCTS_ENTRANCE_VIEWPORT = {
    once: true,
    amount: 0.12,
    margin: "0px 0px -5% 0px",
};

export const PRODUCTS_CARD_EASE = [0.45, 0, 0.55, 1];
export const PRODUCTS_CARD_DURATION = 0.78;
export const PRODUCTS_COLUMN_STAGGER = 0.14;

export const PRODUCTS_CONTROLS_DELAY_EXTRA = 0.22;
export const PRODUCTS_CONTROLS_DURATION = 0.68;

export function productCardHidden(colIndex) {
    const rotate = colIndex % 2 === 0 ? -1.75 : 1.75;
    return {
        opacity: 0,
        scale: 0.92,
        y: 18,
        rotate,
    };
}

export const productCardVisible = {
    opacity: 1,
    scale: 1,
    y: 0,
    rotate: 0,
};

export function productCardTransition(colIndex) {
    return {
        duration: PRODUCTS_CARD_DURATION,
        ease: PRODUCTS_CARD_EASE,
        delay: colIndex * PRODUCTS_COLUMN_STAGGER,
    };
}

export const productControlsHidden = { opacity: 0, scale: 0.9 };
export const productControlsVisible = { opacity: 1, scale: 1 };

export function productControlsTransition(visibleColumns) {
    return {
        duration: PRODUCTS_CONTROLS_DURATION,
        ease: PRODUCTS_CARD_EASE,
        delay:
            Math.max(0, visibleColumns - 1) * PRODUCTS_COLUMN_STAGGER +
            PRODUCTS_CONTROLS_DELAY_EXTRA,
    };
}
