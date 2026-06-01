import HeroImage from "@/assets/HeroTest9.png";
import Tag from "@/components/Tag";
import Divisor from "@/components/Divisor";
import Button from "@/components/Buttons/Button";
import { links } from "@/data/Data";

export default function Hero() {
    const agendaUrl = links.agenda?.trim() ?? "";

    return (
        <section
            id="home"
            className="relative flex min-h-screen w-full items-center justify-start bg-background-primary px-6 py-20 sm:px-10 md:px-16 lg:px-20 xl:px-32 overflow-hidden"
        >

            <div className="absolute top-0 left-0 h-full w-full bg-background-primary/30  z-10" />

            
            <div className="absolute top-0  left-0 h-full w-full z-0">
                <img
                    src={HeroImage}
                    alt="Ambiente do Zero Um Studio"
                    className="h-full w-full object-cover object-center xl:object-[center_42%]"
                />
            </div>

            <div className="relative z-10 flex h-full w-full flex-col items-center lg:items-start justify-center">
                <div className="flex flex-col items-center justify-center gap-5 lg:items-start">
                    <div className="flex flex-col items-center justify-center gap-2 lg:items-start">
                        <Tag text="zero um studio" variant="secondary" />
                        <Divisor variant="secondary" />
                    </div>
                    <div className="flex flex-col items-center justify-center gap-2 lg:items-start">
                        <h1 className="max-w-lg text-center font-syncopate text-5xl font-bold capitalize text-light-primary lg:text-start xl:text-6xl"> 
                            Eleve seu{" "}
                            <span className="text-highlight-primary">Visual</span>
                        </h1>

                        <p className="mx-auto max-w-lg text-center font-poppins text-sm font-light leading-relaxed text-light-primary/85 lg:text-start lg:mx-0">
                        Seja bem-vindo ao Zero Um Studio. Nosso espaço foi pensado para oferecer uma experiência leve e moderna em serviços de cabelo, barba e estética. Com profissionais qualificados e atendimento personalizado, nosso foco é fazer você se sentir bem com a sua própria imagem.
                        </p>

                        {agendaUrl ? (
                            <a
                                href={agendaUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="mt-3 inline-flex"
                                aria-label="Agendar horário no Trinks"
                            >
                                <Button text="Agendar Horário" type="button" />
                            </a>
                        ) : (
                            <div className="mt-3">
                                <Button text="Agendar Horário" type="button" disabled />
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
}
