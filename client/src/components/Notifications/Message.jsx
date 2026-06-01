import Button from "@/components/Buttons/Button";
import { Mail } from "lucide-react";

/**
 * Card de feedback pós-envio — `background-secondary` e cores do tema.
 * @param {{ email?: string, onDismiss?: () => void }} props
 */
export default function Message({ email, onDismiss }) {
    const displayEmail = email?.trim() ? email.trim() : "seu endereço de e-mail";

    return (
        <article className="mx-auto w-full max-w-[min(420px,calc(100%-0px))] px-4 sm:px-0">
            <div className="rounded-[2rem] bg-background-secondary px-6 py-8 shadow-[0_24px_64px_-20px_rgb(7_8_12/0.45)] ring-1 ring-light-primary/8 sm:px-10 sm:py-10">
                <div className="flex flex-col items-center text-center">
                    <div
                        className="mb-8 flex size-19 items-center justify-center rounded-[1.65rem] bg-linear-to-br from-highlight-primary via-highlight-primary to-highlight-primary/75 shadow-[0_14px_32px_-8px_rgb(240_208_128/0.35)] ring-4 ring-highlight-primary/20 sm:size-21"
                        aria-hidden
                    >
                        <Mail
                            className="size-8 text-dark-primary drop-shadow-sm sm:size-9"
                            strokeWidth={1.75}
                        />
                    </div>

                    <h2 className="font-syncopate text-xl font-bold tracking-tight text-light-primary sm:text-2xl">
                        Mensagem enviada com sucesso!
                    </h2>

                    <p className="mt-4 max-w-sm font-poppins text-sm leading-relaxed text-light-primary/85 ">
                        Nossa equipe já recebeu seu contato. Enviamos uma confirmação para{" "}
                        <span className="break-all font-semibold text-highlight-primary">
                            {displayEmail}
                        </span>{" "}
                        e iremos responder em até{" "}
                        <span className="font-medium text-light-primary">2 dias</span>.
                    </p>

                    <div className="mt-8 w-full max-w-xs sm:max-w-sm">
                        <Button
                            type="button"
                            text="Entendi!"
                            variant="default"
                            onClick={onDismiss}
                            className="w-full"
                        />
                    </div>
                </div>
            </div>
        </article>
    );
}
