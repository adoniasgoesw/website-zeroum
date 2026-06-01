import { useEffect, useState } from "react";
import { getSectionScrollOffset } from "@/lib/sectionScrollOffset";
import { isProgrammaticScrollActive } from "@/lib/sectionScrollNavigation";

function hrefToId(href) {
    return href.startsWith("#") ? href.slice(1) : href;
}

/**
 * Índice do link ativo conforme a seção visível na página.
 * @param {string[]} hrefs — hrefs de navlinks (#home, #about, …)
 * @param {{ enabled?: boolean }} options
 */
export function useNavbarScrollSpy(hrefs, { enabled = true } = {}) {
    const [activeIndex, setActiveIndex] = useState(0);

    useEffect(() => {
        if (!enabled || !hrefs.length) return;

        const ids = hrefs.map(hrefToId);
        const sections = ids
            .map((id) => document.getElementById(id))
            .filter(Boolean);

        if (!sections.length) return;

        const ratios = new Map(ids.map((id) => [id, 0]));

        const resolveByScroll = () => {
            const y = window.scrollY + getSectionScrollOffset();
            let idx = 0;
            for (let i = 0; i < sections.length; i++) {
                if (sections[i].offsetTop <= y) idx = i;
            }
            return idx;
        };

        const pickActive = () => {
            if (isProgrammaticScrollActive()) return;

            const atBottom =
                window.innerHeight + window.scrollY >=
                document.documentElement.scrollHeight - 4;

            if (atBottom) {
                setActiveIndex(sections.length - 1);
                return;
            }

            let bestId = ids[0];
            let bestRatio = 0;

            for (const id of ids) {
                const ratio = ratios.get(id) ?? 0;
                if (ratio > bestRatio) {
                    bestRatio = ratio;
                    bestId = id;
                }
            }

            if (bestRatio > 0) {
                const idx = ids.indexOf(bestId);
                if (idx >= 0) setActiveIndex(idx);
                return;
            }

            setActiveIndex(resolveByScroll());
        };

        const observer = new IntersectionObserver(
            (entries) => {
                for (const entry of entries) {
                    ratios.set(entry.target.id, entry.intersectionRatio);
                }
                pickActive();
            },
            {
                rootMargin: `-${getSectionScrollOffset()}px 0px -52% 0px`,
                threshold: [
                    0, 0.05, 0.1, 0.15, 0.2, 0.25, 0.3, 0.35, 0.4, 0.45, 0.5,
                    0.55, 0.6, 0.65, 0.7, 0.75, 0.8, 0.85, 0.9, 0.95, 1,
                ],
            },
        );

        sections.forEach((section) => observer.observe(section));

        const onScroll = () => pickActive();
        window.addEventListener("scroll", onScroll, { passive: true });
        window.addEventListener("resize", onScroll, { passive: true });
        pickActive();

        return () => {
            observer.disconnect();
            window.removeEventListener("scroll", onScroll);
            window.removeEventListener("resize", onScroll);
        };
    }, [hrefs, enabled]);

    return activeIndex;
}
