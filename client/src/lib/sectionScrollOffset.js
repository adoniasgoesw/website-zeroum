import { SECTION_SCROLL_OFFSET_PX } from "@/constants/sectionNav";

const SITE_HEADER_SELECTOR = "header[data-site-header]";

/** Altura real da navbar fixa (medida no DOM). */
export function getSectionScrollOffset() {
    const header = document.querySelector(SITE_HEADER_SELECTOR);
    if (!header) return SECTION_SCROLL_OFFSET_PX;
    return Math.ceil(header.getBoundingClientRect().height);
}

/** Posição de scroll para alinhar o topo da seção logo abaixo da navbar. */
export function getSectionScrollTop(element) {
    const offset = getSectionScrollOffset();
    const top = element.getBoundingClientRect().top + window.scrollY;
    return Math.max(0, Math.round(top - offset));
}
