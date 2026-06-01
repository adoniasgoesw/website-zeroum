/** Scroll suave iniciado pela navbar — evita que o spy “pule” entre seções no meio do caminho. */

export const SECTION_NAVIGATE_EVENT = "zeroum:navigate-section";

let programmaticScrolling = false;

const scrollListeners = new Set();

export function isProgrammaticScrollActive() {
    return programmaticScrolling;
}

export function setProgrammaticScrollActive(active) {
    if (programmaticScrolling === active) return;
    programmaticScrolling = active;
    scrollListeners.forEach((listener) => listener(active));
}

export function onProgrammaticScrollChange(listener) {
    scrollListeners.add(listener);
    return () => scrollListeners.delete(listener);
}

/** Footer / outros: dispara navegação com pin do indicador na Navbar. */
export function requestSectionNavigation(href) {
    window.dispatchEvent(
        new CustomEvent(SECTION_NAVIGATE_EVENT, { detail: { href } }),
    );
}
