export default function Button({
    icon,
    text,
    variant = "primary",
    className = "",
    ...props
}) {

    const variants = {
        primary:
            "bg-backdrop-primary text-title-primary hover:opacity-90",

        secondary:
            "bg-highlight-secondary text-surface-mato hover:opacity-90",

        outline:
            "border border-backdrop-primary text-backdrop-primary hover:bg-backdrop-primary hover:text-title-primary",

        icon:
            "w-12 h-12 rounded-full bg-button-testimonials-primary  text-text-button-testimonials justify-center hover:scale-105 cursor-pointer"
    };

    return (
        <button
            className={`
                flex items-center justify-center gap-2
                px-4 py-2
                
                transition-all duration-300
                cursor-pointer
                font-medium
                ${variants[variant]}
                ${variant === "icon" ? "p-0" : ""}
                ${className}
            `}
            {...props}
        >
            {icon && <span>{icon}</span>}

            {variant !== "icon" && text}
        </button>
    );
}