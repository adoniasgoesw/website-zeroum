/**
 * Credenciais EmailJS via `.env` (prefixo VITE_ obrigatório no Vite).
 * PRIVATE_KEY não é lida aqui — não deve ir para o bundle do browser.
 */
export function getEmailJsConfig() {
    const publicKey = import.meta.env.VITE_PUBLIC_KEY?.trim();
    const serviceId = import.meta.env.VITE_SERVICE_ID?.trim();
    const templateId = import.meta.env.VITE_TEMPLATE_ID?.trim();

    const missing = [];
    if (!publicKey) missing.push("VITE_PUBLIC_KEY");
    if (!serviceId) missing.push("VITE_SERVICE_ID");
    if (!templateId) missing.push("VITE_TEMPLATE_ID");

    if (missing.length > 0) {
        throw new Error(
            `Variáveis de ambiente ausentes: ${missing.join(", ")}. Verifique o arquivo .env.`,
        );
    }

    return { publicKey, serviceId, templateId };
}
