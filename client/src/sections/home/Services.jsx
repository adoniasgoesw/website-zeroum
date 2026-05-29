import Tag from "@/components/Tag";
import Divisor from "@/components/Divisor";
import ServicesGrid from "@/components/ServicesGrid";
import Reveal from "@/components/motion/Reveal";
import { services } from "@/data/Data";

export default function Services() {
    return (
        <section
            id="services"
            className="flex min-h-screen w-full items-start justify-start bg-background-primary px-6 py-20 sm:px-10 md:px-16 lg:px-20 xl:px-32"
        >
            <div className="flex w-full flex-col gap-10">
                <div className="flex flex-col items-center gap-5 md:items-start">
                    <Reveal className="flex w-full flex-col items-center gap-5 md:items-start">
                        <div className="flex flex-col items-center gap-2 md:items-start">
                            <Tag text="Serviços" />
                            <Divisor />
                        </div>
                        <div className="flex flex-col gap-2">
                            <h1 className="max-w-lg text-center font-syncopate text-4xl font-bold capitalize text-light-primary md:max-w-none md:text-start xl:text-5xl">
                                Escolha seu <span className="text-highlight-primary">Estilo</span>
                            </h1>
                            <p className="mx-auto max-w-lg text-center font-poppins text-sm font-light leading-relaxed text-light-primary/85 md:mx-0 md:text-start">
                                Oferecemos diferentes serviços para atender sua rotina e suas necessidades, sempre com conforto, qualidade e atendimento próximo.
                            </p>
                        </div>
                    </Reveal>
                </div>

                <ServicesGrid services={services} />
            </div>
        </section>
    );
}
