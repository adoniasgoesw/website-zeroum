import Tag from "@/components/Tag";
import Divisor from "@/components/Divisor";
import { links, stats } from "@/data/Data";
import AboutCard from "@/components/Cards/AbouteCard";
import Button from "@/components/Buttons/Button";

export default function About() {
    const agendaUrl = links.agenda?.trim() ?? "";

    return (
        <section
            id="about"
            className="flex w-full items-center justify-center bg-background-primary px-6 py-16 sm:px-10 sm:py-20 md:px-16 lg:min-h-screen lg:px-20 lg:py-24 xl:px-32"
        >
            <div className="mt-20 mx-auto flex w-full max-w-7xl flex-col items-center gap-12 lg:flex-row lg:items-center lg:justify-between lg:gap-14 xl:gap-20">
                <div className="flex w-full shrink-0 justify-center lg:w-[46%] xl:w-[42%]">
                    <AboutCard />
                </div>

                <div className="flex w-full flex-col gap-6 md:gap-8 lg:w-[52%] lg:max-w-2xl xl:max-w-none">
                    <div className="flex flex-col items-center gap-2 md:items-start">
                        <Tag text="Sobre Nós" />
                        <Divisor />
                    </div>

                    <div className="flex w-full flex-col gap-6 md:gap-7">
                        <div className="flex w-full flex-col gap-4">
                            <h2 className="max-w-xl text-center font-syncopate text-3xl font-bold capitalize text-light-primary sm:text-4xl md:text-start lg:max-w-none xl:text-5xl">
                                Um espaço para{" "}
                                <span className="text-highlight-primary">
                                    cuidar de você
                                </span>
                            </h2>

                            <p className="mx-auto max-w-xl text-center text-sm leading-relaxed text-light-primary/85 font-poppins font-light sm:text-[0.9375rem] md:mx-0 md:max-w-none md:text-start lg:text-base lg:leading-7">
                                Inaugurado em outubro de 2025, nosso studio nasceu com a proposta de oferecer um espaço moderno, acolhedor e dedicado ao cuidado pessoal, à autoestima e ao bem-estar.

                                Unimos qualidade, profissionalismo e inovação para proporcionar uma experiência única a cada cliente, sempre com atenção aos detalhes, respeito e excelência no atendimento. Mais do que serviços de estética e cuidado, queremos oferecer momentos de confiança, renovação e valorização pessoal.

                                Nosso compromisso é acompanhar tendências, investir constantemente em desenvolvimento e criar um ambiente onde cada pessoa se sinta bem, confortável e valorizada.

                                Seja bem-vindo ao nosso studio. Um espaço pensado para cuidar de você.
                            </p>
                        </div>

                        <div className="flex w-full justify-center md:justify-start">
                            {agendaUrl ? (
                                <a
                                    href={agendaUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex"
                                >
                                    <Button text="Agendar Horário" />
                                </a>
                            ) : (
                                <Button text="Agendar Horário" />
                            )}
                        </div>

                        <ul className="grid w-full grid-cols-1 gap-5 border-t border-light-primary/10 pt-8 sm:grid-cols-3 sm:gap-4 md:gap-6">
                            {stats.map((stat) => (
                                <li
                                    key={stat.id}
                                    className="flex min-w-0 flex-col items-center gap-2 sm:items-start sm:border-l sm:border-highlight-primary/30 sm:pl-4 md:pl-5 first:sm:border-l-0 first:sm:pl-0"
                                >
                                    <span className="text-center text-xs font-poppins font-light uppercase tracking-wide text-light-primary/70 sm:text-start md:text-sm">
                                        {stat.label}
                                    </span>
                                    <span className="text-center font-syncopate text-4xl font-bold text-light-primary sm:text-start md:text-[2.75rem] xl:text-5xl">
                                        {stat.value}
                                    </span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </section>
    );
}
