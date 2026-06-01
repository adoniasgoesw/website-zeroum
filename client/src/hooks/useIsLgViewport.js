import { useEffect, useState } from "react";

const LG_QUERY = "(min-width: 1024px)";

/** Tailwind `lg` — desktop navbar com divisor animado. */
export function useIsLgViewport() {
    const [matches, setMatches] = useState(() =>
        typeof window !== "undefined"
            ? window.matchMedia(LG_QUERY).matches
            : false,
    );

    useEffect(() => {
        const mq = window.matchMedia(LG_QUERY);
        const onChange = () => setMatches(mq.matches);
        onChange();
        mq.addEventListener("change", onChange);
        return () => mq.removeEventListener("change", onChange);
    }, []);

    return matches;
}
