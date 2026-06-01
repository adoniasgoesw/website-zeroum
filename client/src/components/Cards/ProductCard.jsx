export default function ProductCard({ id, title, category, image }) {
    return (
        <article className="flex flex-col gap-5 w-full h-[400px]">
            <div className="w-full h-[300px] overflow-hidden rounded-md">
                <img src={image} alt={title} className="w-full h-full object-cover" />
            </div>

            <div className="flex flex-col ">
                <span className="text-light-primary/85 text-sm font-light font-poppins capitalize">{category}</span>
                <h1 className="text-light-primary text-md  font-medium font-syncopate">{title}</h1>
            </div>
        </article>
    )
}