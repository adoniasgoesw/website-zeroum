import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";

const HORIZONTAL_INDICATOR_WIDTH_PX = 40;
const VERTICAL_INDICATOR_WIDTH_PX = 4;

/**
 * Posição do divisor sob (horizontal) ou ao lado (vertical) do item ativo.
 * @param {'horizontal' | 'vertical'} orientation
 */
export function useNavIndicatorPosition(
    activeIndex,
    { enabled = true, orientation = "horizontal" } = {},
) {
    const navRef = useRef(null);
    const [x, setX] = useState(0);
    const [y, setY] = useState(0);
    const [width, setWidth] = useState(HORIZONTAL_INDICATOR_WIDTH_PX);
    const [height, setHeight] = useState(0);

    const measure = useCallback(() => {
        const nav = navRef.current;
        if (!enabled || !nav) return;

        const items = nav.querySelectorAll("[data-nav-item]");
        const item = items[activeIndex];
        if (!item) return;

        const navRect = nav.getBoundingClientRect();
        const itemRect = item.getBoundingClientRect();

        if (orientation === "vertical") {
            setX(0);
            setY(Math.round(itemRect.top - navRect.top));
            setWidth(VERTICAL_INDICATOR_WIDTH_PX);
            setHeight(itemRect.height);
            return;
        }

        const nextX = Math.round(
            itemRect.left -
                navRect.left +
                itemRect.width / 2 -
                HORIZONTAL_INDICATOR_WIDTH_PX / 2,
        );

        setX(nextX);
        setY(0);
        setWidth(HORIZONTAL_INDICATOR_WIDTH_PX);
        setHeight(0);
    }, [activeIndex, enabled, orientation]);

    useLayoutEffect(() => {
        measure();
    }, [measure]);

    useEffect(() => {
        if (!enabled) return;

        const nav = navRef.current;
        if (!nav) return;

        const ro = new ResizeObserver(measure);
        ro.observe(nav);

        const items = nav.querySelectorAll("[data-nav-item]");
        items.forEach((item) => ro.observe(item));

        window.addEventListener("resize", measure);

        return () => {
            ro.disconnect();
            window.removeEventListener("resize", measure);
        };
    }, [measure, enabled]);

    return {
        navRef,
        x,
        y,
        width,
        height,
        orientation,
    };
}
