import AboutImage1 from "@/assets/About01.jpeg";
import AboutImage2 from "@/assets/About.jpeg";

export default function AboutCard({
    image1 = AboutImage1,
    image2 = AboutImage2,
    alt1 = "Ambiente do studio Zero Um",
    alt2 = "Detalhes do atendimento Zero Um",
}) {
    return (
        <div className="relative mx-auto flex aspect-5/4 w-full max-w-[min(24rem,calc(100vw-2.5rem))] items-center justify-center sm:max-w-[min(26rem,calc(100vw-3rem))] md:max-w-[min(28rem,calc(100vw-4rem))] lg:aspect-auto lg:h-[400px] lg:max-w-none xl:h-[540px]">
            <div className="relative h-full min-h-[220px] w-full">
                <div className="absolute top-0 left-0 aspect-square w-[58%] max-h-[400px] max-w-[400px] overflow-hidden bg-background-secondary rounded-md">
                    <img
                        src={image1}
                        alt={alt1}
                        className="h-full w-full object-cover"
                    />
                </div>

                <div className="absolute right-0 bottom-0 aspect-square w-[58%] max-h-[400px] max-w-[400px] overflow-hidden bg-background-primary p-3 sm:p-4 rounded-md">
                    <div className="h-full w-full overflow-hidden bg-background-secondary rounded-md">
                        <img
                            src={image2}
                            alt={alt2}
                            className="h-full w-full object-cover"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
