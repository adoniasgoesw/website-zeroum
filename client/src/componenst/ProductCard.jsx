export default function ProductCard({
    Name,
    Category,
    Image,
    style,
    className = "",
}) {
    return (
        <article
            data-product-card
            style={style}
            className={`flex min-w-0 shrink-0 flex-col gap-3 ${className}`}
        >
            <div className="aspect-square w-full overflow-hidden flex justify-center items-center bg-backdrop-secondary">
                <img
                    src={Image}
                    alt={Name}
                    className="h-[200px] w-[200px] object-cover"
                    loading="lazy"
                />
            </div>

            <div className="space-y-1">
                <span className="text-md block font-light text-title-primary">
                    {Category}
                </span>
                <h2 className="text-lg font-light uppercase text-title-primary">
                    {Name}
                </h2>
            </div>
        </article>
    );
}
