import { useRef } from "react";
import { useInView, useReducedMotion } from "framer-motion";
import { useCountUp } from "@/hooks/useCountUp";
import { parseStatValue } from "@/lib/parseStatValue";
import { ABOUT_STATS_VIEWPORT } from "@/constants/aboutMotion";

export default function AboutStatItem({
    label,
    value,
    countFrom = 0,
    className = "",
}) {
    const ref = useRef(null);
    const reduceMotion = useReducedMotion();
    const isInView = useInView(ref, ABOUT_STATS_VIEWPORT);

    const { numeric, suffix, hasNumber } = parseStatValue(value);
    const count = useCountUp(numeric, {
        enabled: isInView && hasNumber && !reduceMotion,
        from: countFrom,
    });

    const displayValue =
        reduceMotion || !hasNumber
            ? value
            : `${count}${suffix}`;

    return (
        <li
            ref={ref}
            className={`flex min-w-0 flex-col items-center gap-2 sm:items-start sm:border-l sm:border-highlight-primary/30 sm:pl-4 md:pl-5 first:sm:border-l-0 first:sm:pl-0 ${className}`}
        >
            <span className="text-center text-xs font-poppins font-light uppercase tracking-wide text-light-primary/70 sm:text-start md:text-sm">
                {label}
            </span>
            <span className="text-center font-syncopate text-4xl font-bold tabular-nums text-light-primary sm:text-start md:text-[2.75rem] xl:text-5xl">
                {displayValue}
            </span>
        </li>
    );
}
