import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useAnimationFrame, useMotionValue } from "framer-motion";
import Tag from "@/components/Tag";
import Divisor from "@/components/Divisor";
import Button from "@/components/Buttons/Button";
import Reveal from "@/components/motion/Reveal";
import { FaInstagram } from "react-icons/fa";
import SocialCard from "@/components/Cards/SocialCard";
import { links, social } from "@/data/Data";

/** Mesma altura nas duas colunas; direita em ordem reversa para variar o conteúdo visual. */
const socialLeft = social;
const socialRight = [...social].reverse();

/** Ordem: coração → like → surpresa → coração → palmas → diamante */
const EMOJI_SEQUENCE = ["❤️", "👍", "😮", "❤️", "👏", "💎"];
const EMOJI_SPAWN_INTERVAL_MS = 3500;
const EMOJI_LIFETIME_MS = 3500;

/** Zonas fixas bem diferentes (topo alto, rodapé, meio, cantos superiores). */
const EMOJI_ZONES = [
    { top: [4, 12], left: [25, 45] },  // top meio

    { top: [80, 18], left: [12, 28] },  // top esquerdo
    { top: [75, 90], left: [72, 88] }, // bottom direito
    { top: [40, 60], left: [8, 24] },  // meio esquerdo
   

    { top: [8, 18], left: [72, 88] },  // top direito
    { top: [75, 90], left: [12, 28] }, // bottom esquerdo
    { top: [75, 90], left: [40, 60] }, // bottom meio
    
];

function jitterInRange(range) {
    const [lo, hi] = range;
    return lo + Math.random() * (hi - lo);
}

/** Alterna zonas para não aparecer sempre no mesmo lugar; jitter dentro da zona. */
function emojiSpawnForTick(tickIndex) {
    const emoji = EMOJI_SEQUENCE[tickIndex % EMOJI_SEQUENCE.length];
    const zone = EMOJI_ZONES[tickIndex % EMOJI_ZONES.length];
    return {
        emoji,
        left: jitterInRange(zone.left),
        top: jitterInRange(zone.top),
    };
}

/** Mesma velocidade (px/s) nas duas colunas; interação pai desacelera sem “pulo”. */
const SPEED_NORMAL = 44;
const SPEED_SLOW = 14;

/** Duplica o conteúdo e faz marquee infinito: esquerda sobe ↑, direita desce ↓. */
function SocialMarqueeColumn({ items, direction, slow }) {
    const measureRef = useRef(null);
    const [loopH, setLoopH] = useState(0);

    const y = useMotionValue(0);

    const slowRef = useRef(slow);
    slowRef.current = slow;

    useLayoutEffect(() => {
        const inner = measureRef.current;
        if (!inner) return;

        const measure = () => {
            setLoopH(inner.offsetHeight);
        };

        measure();

        const ro = new ResizeObserver(measure);
        ro.observe(inner);

        return () => ro.disconnect();
    }, [items]);

    useEffect(() => {
        if (!loopH) return;

        if (direction === "up") {
            y.set(0);
        } else {
            y.set(-loopH);
        }
    }, [loopH, direction, y]);

    useAnimationFrame((_, deltaMs) => {
        if (!loopH) return;

        const dt = deltaMs / 1000;
        const speed = slowRef.current ? SPEED_SLOW : SPEED_NORMAL;

        if (direction === "up") {
            let next = y.get() - speed * dt;

            if (next <= -loopH) {
                next += loopH;
            }

            y.set(next);
            return;
        }

        let next = y.get() + speed * dt;

        if (next >= 0) {
            next -= loopH;
        }

        y.set(next);
    });

    const renderCards = (suffix = "") =>
        items.map((item) => (
            <SocialCard
                key={`${item.id}${suffix}`}
                image={item.image}
                alt={suffix ? "" : item.alt}
            />
        ));

    const gapCls = "flex flex-col gap-3 sm:gap-5 shrink-0";

    return (
        <div className="flex min-h-0 min-w-0 flex-1 flex-col overflow-hidden">
            <motion.div
                style={{ y }}
                className={`${gapCls} will-change-transform`}
            >
                {/* bloco medido */}
                <div ref={measureRef} className={gapCls}>
                    {renderCards()}
                </div>

                {/* cópia 1 */}
                <div className={gapCls} aria-hidden>
                    {renderCards("-dup-1")}
                </div>

                {/* cópia 2 */}
                <div className={gapCls} aria-hidden>
                    {renderCards("-dup-2")}
                </div>
            </motion.div>
        </div>
    );
}

/** `null` até medir no client. */
function usePreferHoverForSlowMotion() {
    const [preferHover, setPreferHover] = useState(null);

    useEffect(() => {
        const mq = window.matchMedia("(hover: hover) and (pointer: fine)");
        const sync = () => setPreferHover(mq.matches);
        sync();
        mq.addEventListener("change", sync);
        return () => mq.removeEventListener("change", sync);
    }, []);

    return preferHover;
}

export default function Social() {
    const preferHover = usePreferHoverForSlowMotion();
    const [hoverActive, setHoverActive] = useState(false);
    const [tapActive, setTapActive] = useState(false);

    const galleryInteract =
        preferHover === true ? hoverActive : preferHover === false ? tapActive : false;

    const gallerySlow = galleryInteract;

    const [floatingEmojis, setFloatingEmojis] = useState([]);
    const emojiIdRef = useRef(0);
    const emojiSpawnTickRef = useRef(0);
    const emojiTimeoutsRef = useRef(new Set());

    useEffect(() => {
        emojiTimeoutsRef.current.forEach((t) => clearTimeout(t));
        emojiTimeoutsRef.current.clear();

        if (!galleryInteract) {
            setFloatingEmojis([]);
            return;
        }

        emojiSpawnTickRef.current = 0;

        const spawn = () => {
            const id = ++emojiIdRef.current;
            const tick = emojiSpawnTickRef.current++;
            const { left, top, emoji } = emojiSpawnForTick(tick);

            setFloatingEmojis((prev) => [...prev, { id, emoji, left, top }]);

            const ttl = setTimeout(() => {
                emojiTimeoutsRef.current.delete(ttl);
                setFloatingEmojis((prev) => prev.filter((e) => e.id !== id));
            }, EMOJI_LIFETIME_MS);
            emojiTimeoutsRef.current.add(ttl);
        };

        spawn();
        const interval = window.setInterval(spawn, EMOJI_SPAWN_INTERVAL_MS);

        return () => {
            window.clearInterval(interval);
            emojiTimeoutsRef.current.forEach((t) => clearTimeout(t));
            emojiTimeoutsRef.current.clear();
        };
    }, [galleryInteract]);

    return (
        <section
            id="social"
            className="flex min-h-screen w-full items-start justify-center bg-background-primary px-6 sm:px-10 py-20 md:items-center md:px-16 lg:px-20 xl:px-32"
        >
            <div className="flex h-full w-full flex-col items-center justify-center gap-10 lg:flex-row">
                <Reveal className="flex w-full flex-col items-center justify-center gap-5 lg:w-1/2 lg:items-start lg:justify-start">
                    <div className="flex flex-col items-center gap-2 md:items-start">
                        <Tag text="Instagram" />
                        <Divisor />
                    </div>
                    <div className="flex flex-col gap-2">
                        <h1 className="max-w-lg text-center font-syncopate text-3xl font-bold capitalize text-light-primary sm:text-4xl lg:text-start xl:text-5xl">
                            Estamos no <span className="text-highlight-primary">Instagram</span>
                        </h1>
                        <p className="mx-auto max-w-md text-center font-poppins text-sm font-light leading-relaxed text-light-primary/85 lg:mx-0 lg:text-start">
                            Quer conhecer melhor nosso trabalho? No Instagram você encontra resultados, bastidores e novidades do studio.
                        </p>
                    </div>

                    {links.instagram ? (
                        <a
                            href={links.instagram}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex"
                            aria-label="Abrir perfil do Zero Um no Instagram"
                        >
                            <Button
                                icon={<FaInstagram />}
                                text="Ver perfil"
                                type="button"
                            />
                        </a>
                    ) : (
                        <Button
                            icon={<FaInstagram />}
                            text="Instagram"
                            type="button"
                            disabled
                        />
                    )}
                </Reveal>

                {/* Hover (desktop) ou toque/teclado (mobile): desacelera colunas + emojis */}
                <div
                    className={`relative flex h-[540px] w-full justify-center overflow-hidden lg:w-1/2 ${
                        preferHover === false ? "touch-manipulation cursor-pointer select-none" : ""
                    }`}
                    onMouseEnter={() => preferHover === true && setHoverActive(true)}
                    onMouseLeave={() => preferHover === true && setHoverActive(false)}
                    onClick={() => {
                        if (preferHover === false) setTapActive((v) => !v);
                    }}
                    role={preferHover === false ? "button" : undefined}
                    tabIndex={preferHover === false ? 0 : undefined}
                    aria-pressed={preferHover === false ? tapActive : undefined}
                    aria-label={
                        preferHover === false
                            ? tapActive
                                ? "Galeria pausando devagar com reações. Toque para velocidade normal."
                                : "Toque na galeria para modo lento e emojis."
                            : undefined
                    }
                    onKeyDown={(e) => {
                        if (preferHover !== false) return;
                        if (e.key === "Enter" || e.key === " ") {
                            e.preventDefault();
                            setTapActive((v) => !v);
                        }
                    }}
                >
                    <AnimatePresence>
                        {floatingEmojis.map(({ id, emoji, left, top }) => (
                            <motion.span
                                key={id}
                                aria-hidden
                                className="pointer-events-none absolute z-30 select-none text-3xl leading-none drop-shadow-[0_2px_8px_rgba(0,0,0,0.45)] sm:text-4xl md:text-5xl"
                                style={{
                                    left: `${left}%`,
                                    top: `${top}%`,
                                }}
                                initial={{ opacity: 0, scale: 0.25, x: "-50%", y: "-50%" }}
                                animate={{ opacity: 1, scale: 1, x: "-50%", y: "-50%" }}
                                exit={{ opacity: 0, scale: 0.4, x: "-50%", y: "-50%" }}
                                transition={{
                                    opacity: { duration: 0.38 },
                                    scale: { type: "spring", stiffness: 420, damping: 22 },
                                }}
                            >
                                {emoji}
                            </motion.span>
                        ))}
                    </AnimatePresence>

                    <div className="relative flex h-full w-full max-w-full gap-3 sm:gap-5 md:justify-center">
                        <div className="pointer-events-none absolute inset-x-0 top-0 z-20 h-24 bg-gradient-to-b from-background-primary to-transparent" />
                        <div className="pointer-events-none absolute inset-x-0 bottom-0 z-20 h-24 bg-gradient-to-t from-background-primary to-transparent" />

                        <SocialMarqueeColumn items={socialLeft} direction="up" slow={gallerySlow} />
                        <SocialMarqueeColumn items={socialRight} direction="down" slow={gallerySlow} />
                    </div>
                </div>
            </div>
        </section>
    );
}
