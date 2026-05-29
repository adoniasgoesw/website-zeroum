import LogoImage from "@/assets/logo01.svg";

export default function Logo({ className = "" }) {
    return (
        <a
            href="#home"
            className={`inline-flex shrink-0 items-center self-center outline-none focus-visible:ring-2 focus-visible:ring-highlight-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background-primary ${className}`}
        >
            <img
                src={LogoImage}
                alt="Zero Um Studio"
                className="h-10 w-auto max-h-10 object-contain object-left sm:h-9 md:h-10"
                width={160}
                height={40}
                decoding="async"
            />
        </a>
    );
}
