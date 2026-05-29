import { useRef, useState } from "react";
import { useInView, useReducedMotion } from "framer-motion";
import Button from "../Buttons/Button";
import Message from "@/components/Notifications/Message";
import { useContactForm } from "@/hooks/useContactForm";
import { useTypingPlaceholder } from "@/hooks/useTypingPlaceholder";
import {
    CONTACT_FORM_VIEWPORT,
    CONTACT_PLACEHOLDERS,
    CONTACT_TYPING_CHAR_MS,
    contactTypingStartDelay,
} from "@/constants/contactMotion";

const inputClass =
    "w-full rounded-md border border-light-primary/20 p-4 font-poppins text-sm font-light text-light-primary placeholder:text-light-primary/50 focus:border-highlight-primary/60 focus:outline-none focus:ring-2 focus:ring-highlight-primary/25";

function resolvePlaceholder({ focused, hasValue, typing, full }) {
    if (focused || hasValue) return full;
    return typing.placeholder;
}

export default function ContactForm() {
    const articleRef = useRef(null);
    const reduceMotion = useReducedMotion();
    const sectionInView = useInView(articleRef, CONTACT_FORM_VIEWPORT);
    const typingEnabled = sectionInView && !reduceMotion;

    const [focusedFields, setFocusedFields] = useState({
        name: false,
        email: false,
        phone: false,
        message: false,
    });

    const {
        values,
        setField,
        submit,
        isLoading,
        isSuccess,
        error,
        submittedEmail,
        dismissSuccess,
    } = useContactForm();

    const nameTyping = useTypingPlaceholder(CONTACT_PLACEHOLDERS.name, {
        enabled: typingEnabled,
        startDelay: contactTypingStartDelay(0),
        msPerChar: CONTACT_TYPING_CHAR_MS,
    });

    const emailTyping = useTypingPlaceholder(CONTACT_PLACEHOLDERS.email, {
        enabled: typingEnabled,
        startDelay: contactTypingStartDelay(1),
        msPerChar: CONTACT_TYPING_CHAR_MS,
    });

    const phoneTyping = useTypingPlaceholder(CONTACT_PLACEHOLDERS.phone, {
        enabled: typingEnabled,
        startDelay: contactTypingStartDelay(2),
        msPerChar: CONTACT_TYPING_CHAR_MS,
    });

    const messageTyping = useTypingPlaceholder(CONTACT_PLACEHOLDERS.message, {
        enabled: typingEnabled,
        startDelay: contactTypingStartDelay(3),
        msPerChar: CONTACT_TYPING_CHAR_MS,
    });

    if (isSuccess) {
        return (
            <Message
                email={submittedEmail}
                onDismiss={dismissSuccess}
            />
        );
    }

    return (
        <article
            ref={articleRef}
            className="flex w-full flex-col gap-5 rounded-2xl bg-background-secondary p-5 sm:p-6 md:h-full md:p-10"
        >
            <form
                className="flex w-full flex-col gap-5 md:h-full md:min-h-0"
                onSubmit={submit}
                noValidate
            >
                <div className="flex flex-col gap-2">
                    <label
                        htmlFor="contact-name"
                        className="font-syncopate text-sm font-medium leading-snug text-light-primary/85"
                    >
                        Nome
                    </label>
                    <input
                        id="contact-name"
                        name="name"
                        type="text"
                        autoComplete="name"
                        required
                        disabled={isLoading}
                        value={values.name}
                        onChange={(e) => setField("name", e.target.value)}
                        onFocus={() =>
                            setFocusedFields((s) => ({ ...s, name: true }))
                        }
                        placeholder={resolvePlaceholder({
                            focused: focusedFields.name,
                            hasValue: Boolean(values.name),
                            typing: nameTyping,
                            full: CONTACT_PLACEHOLDERS.name,
                        })}
                        className={inputClass}
                    />
                </div>

                <div className="flex w-full flex-col gap-2 md:flex-row">
                    <div className="flex w-full flex-col gap-2">
                        <label
                            htmlFor="contact-email"
                            className="font-syncopate text-sm font-medium leading-snug text-light-primary/85"
                        >
                            E-mail
                        </label>
                        <input
                            id="contact-email"
                            name="email"
                            type="email"
                            autoComplete="email"
                            required
                            disabled={isLoading}
                            value={values.email}
                            onChange={(e) => setField("email", e.target.value)}
                            onFocus={() =>
                                setFocusedFields((s) => ({ ...s, email: true }))
                            }
                            placeholder={resolvePlaceholder({
                                focused: focusedFields.email,
                                hasValue: Boolean(values.email),
                                typing: emailTyping,
                                full: CONTACT_PLACEHOLDERS.email,
                            })}
                            className={inputClass}
                        />
                    </div>
                    <div className="flex w-full flex-col gap-2">
                        <label
                            htmlFor="contact-phone"
                            className="font-syncopate text-sm font-medium leading-snug text-light-primary/85"
                        >
                            WhatsApp
                        </label>
                        <input
                            id="contact-phone"
                            name="phone"
                            type="tel"
                            autoComplete="tel"
                            required
                            disabled={isLoading}
                            value={values.phone}
                            onChange={(e) => setField("phone", e.target.value)}
                            onFocus={() =>
                                setFocusedFields((s) => ({ ...s, phone: true }))
                            }
                            placeholder={resolvePlaceholder({
                                focused: focusedFields.phone,
                                hasValue: Boolean(values.phone),
                                typing: phoneTyping,
                                full: CONTACT_PLACEHOLDERS.phone,
                            })}
                            className={inputClass}
                        />
                    </div>
                </div>

                <div className="flex w-full flex-col gap-2 md:min-h-0 md:flex-1">
                    <label
                        htmlFor="contact-message"
                        className="font-syncopate text-sm font-medium leading-snug text-light-primary/85"
                    >
                        Mensagem
                    </label>
                    <textarea
                        id="contact-message"
                        name="message"
                        required
                        disabled={isLoading}
                        value={values.message}
                        onChange={(e) => setField("message", e.target.value)}
                        onFocus={() =>
                            setFocusedFields((s) => ({ ...s, message: true }))
                        }
                        placeholder={resolvePlaceholder({
                            focused: focusedFields.message,
                            hasValue: Boolean(values.message),
                            typing: messageTyping,
                            full: CONTACT_PLACEHOLDERS.message,
                        })}
                        rows={5}
                        className={`${inputClass} min-h-[8.5rem] resize-y sm:min-h-[9.5rem] md:min-h-0 md:h-full md:flex-1`}
                    />
                </div>

                {error ? (
                    <p
                        role="alert"
                        className="font-poppins text-sm text-red-400/95"
                    >
                        {error}
                    </p>
                ) : null}

                <div className="flex w-full shrink-0 items-center justify-center">
                    <Button
                        type="submit"
                        text={isLoading ? "Enviando…" : "Enviar"}
                        variant="default"
                        className="w-full disabled:pointer-events-none disabled:opacity-60"
                        disabled={isLoading}
                    />
                </div>
            </form>
        </article>
    );
}
