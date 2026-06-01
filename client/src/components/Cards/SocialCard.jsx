export default function SocialCard({ image, alt = "Post do Instagram" }) {
    return (
        <article className="relative h-[250px] w-full min-w-0 shrink-0">
            <div className="absolute inset-0 overflow-hidden rounded-md">
                <img src={image} alt={alt} className="h-full w-full object-cover" />
            </div>
        </article>
    );
}
