import { useCallback, useState } from "react";
import emailjs from "@emailjs/browser";
import { getEmailJsConfig } from "@/lib/emailjsEnv";
import { buildContactEmailParams } from "@/lib/formatContactEmail";

const EMPTY_VALUES = /** @type {const} */ ({
    name: "",
    email: "",
    phone: "",
    message: "",
});

/**
 * @returns {{
 *   values: { name: string, email: string, phone: string, message: string },
 *   setField: (field: 'name'|'email'|'phone'|'message', value: string) => void,
 *   submit: (e?: Event) => Promise<void>,
 *   isLoading: boolean,
 *   isSuccess: boolean,
 *   error: string | null,
 *   submittedEmail: string,
 *   dismissSuccess: () => void,
 *   clearError: () => void,
 * }}
 */
export function useContactForm() {
    const [values, setValues] = useState({ ...EMPTY_VALUES });
    const [isLoading, setIsLoading] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [error, setError] = useState(/** @type {string | null} */ (null));
    const [submittedEmail, setSubmittedEmail] = useState("");

    const setField = useCallback((field, value) => {
        setValues((prev) => ({ ...prev, [field]: value }));
        setError(null);
    }, []);

    const clearError = useCallback(() => setError(null), []);

    const dismissSuccess = useCallback(() => {
        setIsSuccess(false);
        setSubmittedEmail("");
    }, []);

    const submit = useCallback(
        async (e) => {
            e?.preventDefault();

            const name = values.name.trim();
            const email = values.email.trim();
            const phone = values.phone.trim();
            const message = values.message.trim();

            if (!name || !email || !phone || !message) {
                setError("Preencha nome, e-mail, WhatsApp e mensagem.");
                return;
            }

            setIsLoading(true);
            setError(null);

            try {
                const { publicKey, serviceId, templateId } = getEmailJsConfig();
                const templateParams = buildContactEmailParams({
                    name,
                    email,
                    phone,
                    message,
                });

                await emailjs.send(serviceId, templateId, templateParams, {
                    publicKey,
                });

                setSubmittedEmail(email);
                setIsSuccess(true);
                setValues({ ...EMPTY_VALUES });
            } catch (err) {
                const text =
                    typeof err === "object" && err !== null && "text" in err
                        ? String(/** @type {{ text?: string }} */ (err).text)
                        : err instanceof Error
                          ? err.message
                          : "Não foi possível enviar a mensagem. Tente novamente.";
                setError(text);
            } finally {
                setIsLoading(false);
            }
        },
        [values],
    );

    return {
        values,
        setField,
        submit,
        isLoading,
        isSuccess,
        error,
        submittedEmail,
        dismissSuccess,
        clearError,
    };
}
