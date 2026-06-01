export default function Button({
    icon,
    text,
    variant = "default",
    iconPosition = "start",
    type = "button",
    className = "",
    ...props
}) {
    const variants = {
        default:
            "bg-light-primary text-dark-primary  hover:bg-light-primary/90 px-6 py-3",
     

        outline:
            "border border-light-primary text-light-primary hover:bg-light-primary hover:text-dark-primary",

        icon:
            "bg-background-primary/20 border border-light-primary/20 text-light-primary aspect-square p-3 hover:backdrop-blur-sm p-4",
        IconMenu:
            "bg-background-primary/20 text-3xl leading-none text-light-primary aspect-square hover:backdrop-blur-sm",
    };

    const iconWrap =
        icon && (
            <span
                className={`
                        flex shrink-0 items-center justify-center
                        ${variant === "icon" ? "text-lg" : "text-lg sm:text-xl"}
                    `}
            >
                {icon}
            </span>
        );

    const textWrap =
        variant !== "icon" && text ? (
            <span className="text-sm font-medium text-dark-primary font-poppins">{text}</span>
        ) : null;

    const isIconEnd =
        variant !== "icon" && Boolean(text && icon && iconPosition === "end");

    return (
        <button
            type={type}
            className={`
                inline-flex items-center justify-center gap-2
                rounded-full
                cursor-pointer
                select-none
                transition-all duration-500 ease-[cubic-bezier(0.45,0,0.55,1)]
                hover:scale-105
                active:scale-95
                focus-visible:outline-none
                focus-visible:ring-2
                focus-visible:ring-highlight-primary
                focus-visible:ring-offset-2
                focus-visible:ring-offset-background-primary
               
                ${variants[variant]}
                ${className}
            `}
            {...props}
        >
            {isIconEnd ? (
                <>
                    {textWrap}
                    {iconWrap}
                </>
            ) : (
                <>
                    {iconWrap}
                    {textWrap}
                </>
            )}
        </button>
    );
}