import { useEffect, useState } from "react";

/** Alinha com Services: 1 · md:2 · lg:4 colunas. */
export function useServiceGridColumns() {
    const [cols, setCols] = useState(1);

    useEffect(() => {
        const read = () => {
            if (window.matchMedia("(min-width: 1024px)").matches) setCols(4);
            else if (window.matchMedia("(min-width: 768px)").matches) setCols(2);
            else setCols(1);
        };
        read();
        const queries = [
            "(min-width: 1024px)",
            "(min-width: 768px)",
        ];
        const mqs = queries.map((q) => window.matchMedia(q));
        mqs.forEach((mq) => mq.addEventListener("change", read));
        return () => mqs.forEach((mq) => mq.removeEventListener("change", read));
    }, []);

    return cols;
}
