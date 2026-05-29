/** Entrada suave por seção — todos os elementos do bloco animam juntos. */
export const REVEAL_VIEWPORT = {
    once: true,
    amount: 0.1,
    margin: "0px 0px -4% 0px",
};

/** Mesma família do divisor da navbar — suave no início e no fim. */
export const SECTION_REVEAL_EASE = [0.45, 0, 0.55, 1];
export const SECTION_REVEAL_DURATION = 0.78;

export const revealHidden = { opacity: 0, y: 20 };
export const revealVisible = { opacity: 1, y: 0 };

export const sectionRevealTransition = {
    duration: SECTION_REVEAL_DURATION,
    ease: SECTION_REVEAL_EASE,
};
