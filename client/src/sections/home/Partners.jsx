import { ChevronRight } from "lucide-react";
import Button from "@/components/Buttons/Button";
import { links } from "@/data/Data";

export default function Partners() {
    const pdfUrl = links.partnersPdf;

    return (
        <section
            id="partners"
            className="flex min-h-screen w-full items-start justify-center bg-background-primary px-6 py-20 sm:px-10 md:items-center md:px-16 lg:px-20 xl:px-32"
        >
            <div className="flex h-full w-full flex-col items-center justify-center gap-10 lg:flex-row">
                <div className="flex h-[540px] w-full flex-col items-center justify-center gap-5 rounded-2xl bg-background-secondary p-10">
                    <h1 className="max-w-4xl text-center font-syncopate text-3xl font-bold capitalize text-light-primary sm:text-4xl xl:text-5xl">
                        Parceria <span className="text-highlight-primary">Corporativa</span>{" "}
                        Exclusiva
                    </h1>

                    <p className="mx-auto max-w-md text-center font-poppins text-sm font-light leading-relaxed text-light-primary/85">
                    Quer motivar sua equipe sem custo? Nossa parceria oferece 20% de desconto em todos os serviços de cabelo, barba e estética para seus colaboradores.
                    </p>

                    {pdfUrl ? (
                        <a
                            href={pdfUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex"
                            aria-label="Abrir mídia kit de parcerias corporativas em PDF"
                        >
                            <Button
                                icon={<ChevronRight className="size-6" />}
                                text="Saiba Mais"
                                iconPosition="end"
                                type="button"
                            />
                        </a>
                    ) : (
                        <Button
                            icon={<ChevronRight className="size-6" />}
                            text="Saiba Mais"
                            iconPosition="end"
                            type="button"
                            disabled
                        />
                    )}
                </div>
            </div>
        </section>
    );
}
