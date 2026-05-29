import Tag from "@/components/Tag";
import Divisor from "@/components/Divisor";
import ProductsCarousel from "@/components/ProductsCarousel";
import Reveal from "@/components/motion/Reveal";
import { products } from "@/data/Data";

export default function Products() {
    return (
        <section
            id="products"
            className="flex min-h-screen w-full items-start justify-center bg-background-primary px-6 py-20 sm:px-10 md:px-16 lg:px-20 xl:px-32"
        >
            <div className="flex w-full flex-col gap-10">
                <Reveal className="flex w-full flex-col items-center justify-center gap-5">
                    <div className="flex flex-col items-center gap-2">
                        <Tag text="Loja" />
                        <Divisor />
                    </div>
                    <div className="flex w-full flex-col items-center justify-center gap-2">
                        <h1 className="mx-auto max-w-lg text-center font-syncopate text-4xl font-bold capitalize text-light-primary md:max-w-none xl:text-5xl">
                            Nosso <span className="text-highlight-primary">Produtos</span>
                        </h1>
                        <p className="mx-auto max-w-lg text-center font-poppins text-sm font-light leading-relaxed text-light-primary/85">
                            Pomadas, ceras, óleos e finalizadores para manter o cabelo e a barba como você gosta no dia a dia.
                        </p>
                    </div>
                </Reveal>

                <ProductsCarousel products={products} />
            </div>
        </section>
    );
}
