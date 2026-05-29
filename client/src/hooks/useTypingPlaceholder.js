import { useEffect, useState } from "react";

/**
 * Revela o placeholder caractere a caractere, uma única vez por ativação.
 * @param {string} text
 * @param {{ enabled?: boolean, startDelay?: number, msPerChar?: number }} options
 */
export function useTypingPlaceholder(
    text,
    { enabled = true, startDelay = 0, msPerChar = 48 } = {},
) {
    const [length, setLength] = useState(enabled ? 0 : text.length);
    const [complete, setComplete] = useState(!enabled);

    useEffect(() => {
        if (!enabled) {
            setLength(text.length);
            setComplete(true);
            return;
        }

        setLength(0);
        setComplete(false);

        let index = 0;
        let timeoutId;
        let cancelled = false;

        const typeNext = () => {
            if (cancelled) return;
            index += 1;
            setLength(index);
            if (index >= text.length) {
                setComplete(true);
                return;
            }
            timeoutId = setTimeout(typeNext, msPerChar);
        };

        timeoutId = setTimeout(typeNext, startDelay);

        return () => {
            cancelled = true;
            clearTimeout(timeoutId);
        };
    }, [enabled, text, startDelay, msPerChar]);

    return {
        placeholder: text.slice(0, length),
        complete,
        full: text,
    };
}
