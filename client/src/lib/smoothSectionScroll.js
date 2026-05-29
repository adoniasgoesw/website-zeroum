import { getSectionScrollTop } from "@/lib/sectionScrollOffset";
import { setProgrammaticScrollActive } from "@/lib/sectionScrollNavigation";

let activeFrame = null;

function hrefToId(href) {
    return href.startsWith("#") ? href.slice(1) : href;
}

function easeInOutCubic(t) {
    return t < 0.5 ? 4 * t * t * t : 1 - (-2 * t + 2) ** 3 / 2;
}

function updateHash(href) {
    if (window.history?.replaceState) {
        window.history.replaceState(null, "", href);
    } else {
        window.location.hash = href;
    }
}

/** Mesma fórmula usada na animação — para sincronizar o divisor. */
export function getSmoothScrollDurationMs(distancePx, { reduceMotion = false } = {}) {
    if (reduceMotion) return 0;
    return Math.min(1400, Math.max(600, Math.abs(distancePx) * 0.75));
}

/**
 * Scroll suave até a seção do href (#home, #about, …).
 * Cancela animação anterior se o usuário clicar outro link.
 */
export function smoothScrollToSection(
    href,
    { reduceMotion = false, onComplete } = {},
) {
    const el = document.getElementById(hrefToId(href));
    if (!el) return;

    if (activeFrame !== null) {
        cancelAnimationFrame(activeFrame);
        activeFrame = null;
        setProgrammaticScrollActive(false);
    }

    const finish = () => {
        setProgrammaticScrollActive(false);
        onComplete?.();
        window.dispatchEvent(new Event("scroll"));
    };

    updateHash(href);

    const snapToTarget = () => {
        window.scrollTo(0, getSectionScrollTop(el));
        finish();
    };

    if (reduceMotion) {
        snapToTarget();
        return;
    }

    const startY = window.scrollY;
    const initialTarget = getSectionScrollTop(el);
    const distance = initialTarget - startY;

    if (Math.abs(distance) < 2) {
        snapToTarget();
        return;
    }

    setProgrammaticScrollActive(true);

    const duration = getSmoothScrollDurationMs(distance);
    const startTime = performance.now();

    const tick = (now) => {
        const progress = Math.min((now - startTime) / duration, 1);
        const eased = easeInOutCubic(progress);
        window.scrollTo(0, startY + distance * eased);

        if (progress < 1) {
            activeFrame = requestAnimationFrame(tick);
        } else {
            activeFrame = null;
            window.scrollTo(0, getSectionScrollTop(el));
            finish();
        }
    };

    activeFrame = requestAnimationFrame(tick);
}
