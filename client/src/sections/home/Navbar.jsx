import { links, navlinks } from "@/data/Data";
import Logo from "@/components/Logo";
import { Menu, X } from "lucide-react";
import Button from "@/components/Buttons/Button";
import { FaWhatsapp } from "react-icons/fa";
import { useCallback, useEffect, useState } from "react";
import { SECTION_NAVIGATE_EVENT } from "@/lib/sectionScrollNavigation";
import { useReducedMotion } from "framer-motion";
import { buildWhatsAppUrl } from "@/lib/buildWhatsAppUrl";
import { useNavbarScrollSpy } from "@/hooks/useNavbarScrollSpy";
import { useNavIndicatorPosition } from "@/hooks/useNavIndicatorPosition";
import { useIsLgViewport } from "@/hooks/useIsLgViewport";
import { getSectionScrollTop } from "@/lib/sectionScrollOffset";
import {
    getSmoothScrollDurationMs,
    smoothScrollToSection,
} from "@/lib/smoothSectionScroll";

const INDICATOR_EASE = "cubic-bezier(0.45, 0, 0.55, 1)";
const INDICATOR_TRANSITION_IDLE_MS = 550;

function buildIndicatorTransition(durationMs, reduceMotion) {
    if (reduceMotion || durationMs <= 0) return "none";
    return `transform ${durationMs}ms ${INDICATOR_EASE}`;
}

function navLinkClass(isActive) {
    return [
        "rounded-lg px-4 py-2.5 text-sm transition-all duration-300 ease-[cubic-bezier(0.45,0,0.55,1)]",
        "hover:bg-light-primary/5 active:scale-[0.98]",
        isActive
            ? "font-medium text-light-primary"
            : "font-light text-light-primary/75 hover:text-light-primary",
    ].join(" ");
}

function mobileNavLinkClass(isActive) {
    return [
        "block w-full rounded-xl py-3.5 pl-8 pr-5 font-syncopate text-base tracking-wide transition-all duration-300 ease-[cubic-bezier(0.45,0,0.55,1)] sm:py-4 sm:text-lg",
        "hover:bg-background-secondary/90 active:scale-[0.98] active:bg-background-secondary",
        isActive
            ? "font-bold text-highlight-primary"
            : "font-medium text-light-primary/80 hover:text-light-primary",
    ].join(" ");
}

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const whatsappUrl = buildWhatsAppUrl(links.whatsapp);
    const isDesktopNav = useIsLgViewport();
    const reduceMotion = useReducedMotion();

    const hrefs = navlinks.map((link) => link.href);
    const scrollActiveIndex = useNavbarScrollSpy(hrefs, { enabled: true });
    const [pinnedIndex, setPinnedIndex] = useState(null);
    const [indicatorTransition, setIndicatorTransition] = useState(() =>
        buildIndicatorTransition(INDICATOR_TRANSITION_IDLE_MS, false),
    );

    const displayIndex = pinnedIndex ?? scrollActiveIndex;

    const { navRef, x, width } = useNavIndicatorPosition(displayIndex, {
        enabled: isDesktopNav,
        orientation: "horizontal",
    });

    const {
        navRef: mobileNavRef,
        y: mobileIndicatorY,
        height: mobileIndicatorHeight,
        width: mobileIndicatorWidth,
    } = useNavIndicatorPosition(displayIndex, {
        enabled: isOpen && !isDesktopNav,
        orientation: "vertical",
    });

    const navigateToSection = useCallback(
        (href) => {
            const index = hrefs.indexOf(href);
            if (index < 0) return;

            const id = href.startsWith("#") ? href.slice(1) : href;
            const el = document.getElementById(id);
            const distance = el
                ? Math.abs(getSectionScrollTop(el) - window.scrollY)
                : 0;
            const durationMs = getSmoothScrollDurationMs(distance, {
                reduceMotion: !!reduceMotion,
            });

            setIndicatorTransition(
                buildIndicatorTransition(durationMs, !!reduceMotion),
            );
            setPinnedIndex(index);

            smoothScrollToSection(href, {
                reduceMotion: !!reduceMotion,
                onComplete: () => {
                    setPinnedIndex(null);
                    setIndicatorTransition(
                        buildIndicatorTransition(
                            INDICATOR_TRANSITION_IDLE_MS,
                            !!reduceMotion,
                        ),
                    );
                },
            });
        },
        [hrefs, reduceMotion],
    );

    const handleSectionClick = (event, href) => {
        event.preventDefault();
        navigateToSection(href);
    };

    useEffect(() => {
        const onExternalNav = (event) => {
            const href = event.detail?.href;
            if (typeof href === "string") navigateToSection(href);
        };

        window.addEventListener(SECTION_NAVIGATE_EVENT, onExternalNav);
        return () =>
            window.removeEventListener(SECTION_NAVIGATE_EVENT, onExternalNav);
    }, [navigateToSection]);

    const handleMobileSectionClick = (event, href) => {
        handleSectionClick(event, href);
        setIsOpen(false);
    };

    useEffect(() => {
        const header = document.querySelector("header[data-site-header]");
        if (!header) return;

        const syncNavHeight = () => {
            const height = Math.ceil(header.getBoundingClientRect().height);
            document.documentElement.style.setProperty(
                "--nav-height",
                `${height}px`,
            );
        };

        syncNavHeight();
        const observer = new ResizeObserver(syncNavHeight);
        observer.observe(header);
        window.addEventListener("resize", syncNavHeight);

        return () => {
            observer.disconnect();
            window.removeEventListener("resize", syncNavHeight);
        };
    }, []);

    useEffect(() => {
        if (isDesktopNav && isOpen) setIsOpen(false);
    }, [isDesktopNav, isOpen]);

    useEffect(() => {
        if (!isOpen) return;
        const previousOverflow = document.body.style.overflow;
        document.body.style.overflow = "hidden";

        const onKeyDown = (event) => {
            if (event.key === "Escape") setIsOpen(false);
        };

        window.addEventListener("keydown", onKeyDown);

        return () => {
            document.body.style.overflow = previousOverflow;
            window.removeEventListener("keydown", onKeyDown);
        };
    }, [isOpen]);

    return (
        <header
            data-site-header
            className="fixed top-0 left-0 z-50 h-auto w-full bg-background-primary px-6 py-5 sm:px-10 md:px-16 lg:px-20 xl:px-32"
        >
            <nav className="flex w-full min-w-0 items-center justify-between gap-3">
                <Logo />

                <div className="hidden lg:block">
                    <div ref={navRef} className="relative pb-3">
                        <ul className="flex items-center  xl:gap-5">
                            {navlinks.map((link, index) => (
                                <li
                                    key={link.href}
                                    data-nav-item
                                    className="shrink-0"
                                >
                                    <a
                                        href={link.href}
                                        onClick={(event) =>
                                            handleSectionClick(event, link.href)
                                        }
                                        className={navLinkClass(
                                            displayIndex === index,
                                        )}
                                    >
                                        {link.label}
                                    </a>
                                </li>
                            ))}
                        </ul>

                        <span
                            aria-hidden
                            className="pointer-events-none absolute bottom-0 left-0 h-1 rounded-full bg-highlight-primary will-change-transform"
                            style={{
                                width,
                                transform: `translate3d(${x}px, 0, 0)`,
                                transition: indicatorTransition,
                            }}
                        />
                    </div>
                </div>

                <div className="z-20 lg:hidden">
                    <Button
                        icon={isOpen ? <X /> : <Menu />}
                        variant="IconMenu"
                        aria-expanded={isOpen}
                        aria-controls="mobile-nav-panel"
                        aria-label={
                            isOpen ? "Fechar menu" : "Abrir menu de navegação"
                        }
                        onClick={() => setIsOpen((open) => !open)}
                    />
                </div>

                <div className="hidden xl:block">
                    <a
                        href={whatsappUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex"
                        aria-label="Fale conosco no WhatsApp"
                    >
                        <Button
                            text="Fale Conosco"
                            variant="default"
                            icon={<FaWhatsapp />}
                            type="button"
                        />
                    </a>
                </div>
            </nav>

            {isOpen ? (
                <div
                    id="mobile-nav-panel"
                    role="dialog"
                    aria-modal="true"
                    aria-label="Menu de navegação"
                    className="fixed inset-x-0 bottom-0 py-10 z-40 flex flex-col border-t border-light-primary/10 bg-background-primary/95 backdrop-blur-md xl:hidden"
                    style={{ top: "var(--nav-height, 5rem)" }}
                >
                    <nav className="flex min-h-0 flex-1 flex-col items-center justify-center overflow-y-auto px-6 py-8 sm:px-10 sm:py-10">
                        <div
                            ref={mobileNavRef}
                            className="relative w-full"
                        >
                            <ul className="flex flex-col gap-0.5 sm:gap-1">
                                {navlinks.map((link, index) => (
                                    <li
                                        key={link.href}
                                        data-nav-item
                                        className="shrink-0"
                                    >
                                        <a
                                            href={link.href}
                                            onClick={(event) =>
                                                handleMobileSectionClick(
                                                    event,
                                                    link.href,
                                                )
                                            }
                                            className={mobileNavLinkClass(
                                                displayIndex === index,
                                            )}
                                        >
                                            {link.label}
                                        </a>
                                    </li>
                                ))}
                            </ul>

                            <span
                                aria-hidden
                                className="pointer-events-none absolute top-0 left-2 rounded-full bg-highlight-primary will-change-transform sm:left-2.5"
                                style={{
                                    width: mobileIndicatorWidth,
                                    height: mobileIndicatorHeight || undefined,
                                    minHeight:
                                        mobileIndicatorHeight > 0
                                            ? undefined
                                            : "2.75rem",
                                    transform: `translate3d(0, ${mobileIndicatorY}px, 0)`,
                                    transition: indicatorTransition,
                                }}
                            />
                        </div>

                        <a
                            href={whatsappUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="mt-10 inline-flex w-full max-w-xs shrink-0 sm:max-w-sm"
                            onClick={() => setIsOpen(false)}
                        >
                            <Button
                                text="Fale Conosco"
                                variant="default"
                                icon={<FaWhatsapp />}
                                type="button"
                                className="w-full"
                            />
                        </a>
                    </nav>
                </div>
            ) : null}
        </header>
    );
}
