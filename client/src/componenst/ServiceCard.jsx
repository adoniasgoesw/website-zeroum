export default function ServiceCard({ image, id, title, description }) {
    return (
        <article className="w-full h-full  flex flex-col gap-3">

            <div className="w-full h-full overflow-hidden rounded-sm">

                <img src={image} alt="" className="w-full h-full object-cover" />

            </div>

            <div className="w-full h-full  flex flex-col gap-3 ">

                <h1 className="text-5xl font-semibold text-title-primary">
                    {String(id).padStart(2, "0")}
                </h1>

                <h2 className="uppercase text-lg text-text-primary font-light">{title}</h2>

                <p className="text-xs font-light text-text-primary">{description}</p>

            </div>

        </article>
    );
}
