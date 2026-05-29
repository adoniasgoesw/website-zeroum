import Tag from "@/components/Tag";
import Divisor from "@/components/Divisor";
import { contact } from "@/data/Data";
import ContactForm from "@/components/Forms/ContactForm";
import Reveal from "@/components/motion/Reveal";

export default function Contact() {
    return (
        <section
            id="contact"
            className="flex min-h-screen w-full items-start justify-start bg-background-primary px-6 py-20 sm:px-10 md:items-center md:justify-center md:px-16 lg:px-20 xl:px-32"
        >
            <div className="flex h-full w-full flex-col gap-10 md:flex-row">
                <div className="flex w-full flex-col items-center justify-center gap-5 md:w-1/2 md:items-start">
                    <Reveal className="flex w-full flex-col items-center gap-10 md:items-start">
                        <div className="flex flex-col items-center gap-2 md:items-start">
                            <Tag text="Contato" />
                            <Divisor />
                        </div>

                        <div className="flex flex-col items-center gap-2 md:items-start">
                            <h1 className="max-w-xl text-center font-syncopate text-3xl font-bold capitalize text-light-primary sm:text-4xl md:text-start xl:text-5xl">
                                Fale com nossa{" "}
                                <span className="text-highlight-primary">equipe</span>
                            </h1>
                            <p className="mx-auto max-w-md text-center font-poppins text-sm font-light leading-relaxed text-light-primary/85 md:text-start lg:mx-0">
                                Entre em contato conosco para agendar seu horário, conhecer nossos serviços ou esclarecer qualquer dúvida. Saiba como nos encontrar.
                            </p>
                        </div>

                        <ul className="flex flex-wrap items-center justify-center gap-3 md:flex-col md:items-start md:justify-start">
                            {contact.map((item, index) => (
                                <li
                                    key={item.id ?? index}
                                    className="flex items-center gap-2"
                                >
                                    <span className="shrink-0 text-xl text-highlight-primary">
                                        {item.icon}
                                    </span>
                                    <span className="max-w-xs font-poppins text-sm font-light text-light-primary/85">
                                        {item.label}
                                    </span>
                                </li>
                            ))}
                        </ul>
                    </Reveal>
                </div>

                <div className="flex w-full flex-col items-stretch justify-center md:h-[540px] md:w-1/2">
                    <ContactForm />
                </div>
            </div>
        </section>
    );
}
