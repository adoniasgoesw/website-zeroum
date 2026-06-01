import Tag from "@/components/Tag";
import Divisor from "@/components/Divisor";
import ServiceCard from "@/components/Cards/ServiceCard";
import { services } from "@/data/Data";


export default function Services() {
    return (
        <section
            id="services"
            className="flex min-h-screen w-full items-start justify-start bg-background-primary px-6 sm:px-10 py-20 md:px-16 lg:px-20 xl:px-32"
        >
            <div className="flex flex-col gap-10 w-full">
            <div className="flex flex-col items-center md:items-start gap-5">
                    <div className="flex flex-col items-center justify-center gap-2 md:items-start">
                        <Tag text="Serviços" />
                        <Divisor />
                    </div>
                    <div className="flex flex-col gap-2 ">
                        <h1 className="max-w-lg md:max-w-none text-center font-syncopate  font-bold capitalize text-light-primary text-4xl xl:text-5xl text-center md:text-start">
                            Escolha seu <span className="text-highlight-primary">Estilo</span>
                        </h1>
                        <p className="mx-auto max-w-lg text-center text-sm leading-relaxed text-light-primary/85  md:mx-0 md:text-start font-poppins font-light">
                        Oferecemos diferentes serviços para atender sua rotina e suas necessidades, sempre com conforto, qualidade e atendimento próximo.
                        </p>
                    </div>

                    
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 gap-y-15">
                    {
                        services.map((service) => (
                            <ServiceCard key={service.id} {...service} />
                        ))
                    }
                </div>
            </div>
        </section>
    )
}