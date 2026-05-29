export default function Tag({ text, variant = "primary" }) {
    const variants = {
        primary: "text-xs text-highlight-primary tracking-[0.12em] uppercase font-medium",
        secondary: "text-xs text-light-primary/85 tracking-[0.12em] uppercase font-medium",
    }
    return (
        <span className={variants[variant]}>
            {text}
        </span>
    )
}