export default function ServiceCard({
    id,
    title,
    description,
    image,
}) {
    return (
        <article className="flex h-full flex-col gap-5">
            <div className="overflow-hidden rounded-md h-[300px]">
                <img
                    src={image}
                    alt={title}
                    className="h-full w-full object-cover"
                />
            </div>

            <div className="flex flex-col gap-2">
                <span className="font-syncopate text-5xl font-bold text-light-primary/85">
                    0{id}
                </span>

                <h1 className="font-syncopate text-md font-medium text-light-primary">
                    {title}
                </h1>

                <p className="text-sm leading-relaxed font-light text-light-primary/85">
                    {description}
                </p>
            </div>
        </article>
    );
}