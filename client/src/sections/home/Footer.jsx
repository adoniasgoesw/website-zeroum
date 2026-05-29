import Logo from "@/components/Logo";
import Button from "@/components/Buttons/Button";
import Reveal from "@/components/motion/Reveal";
import { contact, links, navlinks, services } from "@/data/Data";
import { buildWhatsAppUrl } from "@/lib/buildWhatsAppUrl";
import { requestSectionNavigation } from "@/lib/sectionScrollNavigation";
import { FaWhatsapp, FaInstagram } from "react-icons/fa";

const footerHeadingClass =
    "font-syncopate text-xs font-bold uppercase tracking-[0.12em] text-light-primary sm:text-sm";

const footerLinkClass =
    "inline-block max-w-xs text-sm font-poppins font-light text-light-primary/85 transition-all duration-300 ease-[cubic-bezier(0.45,0,0.55,1)] hover:translate-x-0.5 hover:text-highlight-primary focus-visible:text-highlight-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-highlight-primary/40 focus-visible:ring-offset-2 focus-visible:ring-offset-background-secondary rounded-sm";

const footerExternalClass =
    "inline-flex max-w-xs items-center gap-2 text-sm font-poppins font-light text-light-primary/85 transition-all duration-300 ease-[cubic-bezier(0.45,0,0.55,1)] hover:translate-x-0.5 hover:text-highlight-primary focus-visible:text-highlight-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-highlight-primary/40 focus-visible:ring-offset-2 focus-visible:ring-offset-background-secondary rounded-sm";

function handleFooterNavClick(event, href) {
    event.preventDefault();
    requestSectionNavigation(href);
}

export default function Footer() {
    const agendaUrl = links.agenda?.trim() ?? "";
    const whatsappUrl = buildWhatsAppUrl(links.whatsapp);
    const instagramUrl = links.instagram?.trim() ?? "";

    return (
        <footer className="w-full bg-background-primary p-5">
            <Reveal className="flex w-full flex-col gap-10 rounded-2xl bg-background-secondary px-5 py-10 ring-1 ring-light-primary/8 sm:gap-12 md:px-10 lg:px-15 xl:px-25">
                <div className="grid grid-cols-1 gap-10 sm:gap-12 md:grid-cols-2 lg:grid-cols-12 lg:gap-x-10 lg:gap-y-12">
                    <div className="flex flex-col items-start gap-4 md:max-w-sm lg:col-span-4">
                        <Logo className="self-start w-fit" />
                        <p className="text-start text-sm font-poppins font-light leading-relaxed text-light-primary/85 max-w-xs">
                            No Zero Um Studio SP, acreditamos que cuidar da
                            aparência é cuidar da autoestima.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 sm:gap-10 md:col-span-1 lg:col-span-8 lg:grid-cols-3 lg:gap-8">
                        <div className="flex flex-col gap-4 sm:gap-5">
                            <h2 className={footerHeadingClass}>Navegação</h2>
                            <ul className="flex flex-col gap-2.5 sm:gap-3">
                                {navlinks.map((item) => (
                                    <li key={item.href}>
                                        <a
                                            href={item.href}
                                            onClick={(event) =>
                                                handleFooterNavClick(
                                                    event,
                                                    item.href,
                                                )
                                            }
                                            className={footerLinkClass}
                                        >
                                            {item.label}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className="flex flex-col gap-4 sm:gap-5">
                            <h2 className={footerHeadingClass}>Serviços</h2>
                            <ul className="flex flex-col gap-2.5 sm:gap-3">
                                {services.map((item) => (
                                    <li key={item.id}>
                                        {agendaUrl ? (
                                            <a
                                                href={agendaUrl}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className={footerLinkClass}
                                            >
                                                {item.title}
                                            </a>
                                        ) : (
                                            <span
                                                className={`${footerLinkClass} cursor-default opacity-60`}
                                            >
                                                {item.title}
                                            </span>
                                        )}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className="flex flex-col gap-4 sm:col-span-2 sm:gap-5 lg:col-span-1">
                            <h2 className={footerHeadingClass}>Contato</h2>
                            <ul className="flex flex-col gap-3 sm:gap-4">
                                {contact.map((item, index) => (
                                    <li
                                        key={item.id ?? index}
                                        className="flex items-start gap-2.5"
                                    >
                                        
                                        {index === 1 && whatsappUrl ? (
                                            <a
                                                href={whatsappUrl}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className={footerExternalClass}
                                            >
                                                {item.label}
                                            </a>
                                        ) : index === 2 && instagramUrl ? (
                                            <a
                                                href={instagramUrl}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className={footerExternalClass}
                                            >
                                                {item.label}
                                            </a>
                                        ) : (
                                            <span className="text-sm font-poppins font-light leading-relaxed text-light-primary/85 max-w-xs">
                                                {item.label}
                                            </span>
                                        )}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col gap-6 border-t border-light-primary/10 pt-8 sm:flex-row sm:items-center sm:justify-between sm:pt-10">
                    <p className="text-center text-xs font-poppins font-light text-light-primary/70 sm:text-left sm:text-sm">
                        © 2026 Zero Um Studio SP. Todos os direitos reservados.
                    </p>

                    <div className="flex items-center justify-center gap-3 sm:justify-end">
                        {whatsappUrl ? (
                            <a
                                href={whatsappUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label="WhatsApp Zero Um Studio"
                                className="inline-flex transition-transform duration-300 hover:scale-105 active:scale-95"
                            >
                                <Button
                                    variant="icon"
                                    icon={<FaWhatsapp />}
                                    type="button"
                                />
                            </a>
                        ) : null}
                        {instagramUrl ? (
                            <a
                                href={instagramUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label="Instagram Zero Um Studio"
                                className="inline-flex transition-transform duration-300 hover:scale-105 active:scale-95"
                            >
                                <Button
                                    variant="icon"
                                    icon={<FaInstagram />}
                                    type="button"
                                />
                            </a>
                        ) : null}
                    </div>
                </div>
            </Reveal>
        </footer>
    );
}
