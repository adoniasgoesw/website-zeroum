/** Cards de serviços — entrada da direita, linha por linha. */
export const SERVICES_CARDS_VIEWPORT = {
    once: true,
    amount: 0.15,
    margin: "0px 0px -6% 0px",
};

export const SERVICES_ROW_EASE = [0.45, 0, 0.55, 1];
export const SERVICES_ROW_DURATION = 0.82;
export const SERVICES_ROW_STAGGER = 0.16;

export const servicesRowHidden = { opacity: 0, x: 56 };
export const servicesRowVisible = { opacity: 1, x: 0 };

export function servicesRowTransition(rowIndex = 0) {
    return {
        duration: SERVICES_ROW_DURATION,
        ease: SERVICES_ROW_EASE,
        delay: rowIndex * SERVICES_ROW_STAGGER,
    };
}
