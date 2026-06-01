/**
 * Horizontal: igual ao uso atual (rótulos de seção, etc.).
 * Vertical: mesmo visual do thumb da scrollbar (`w-1 h-10` arredondado).
 */
export default function Divisor({ orientation = "horizontal", className = "", variant = "primary" }) {
    const horizontal = orientation === "horizontal";
    const variants = {
        primary: "bg-highlight-primary/50",
        secondary: "bg-light-primary/85",
    }       
    return (
        <div
            aria-hidden
            className={`rounded-full ${variants[variant]} ${
                horizontal ? "h-1 w-10" : "h-10 w-1 shrink-0"
            } ${className}`.trim()}
        />
    );
}
