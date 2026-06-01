/**
 * Corpo do e-mail no formato exibido no Outlook (template EmailJS).
 * A linha "De: Nome <email>" costuma vir do reply_to / from_name no painel.
 */
export function formatContactEmailBody({ name, email, phone, message }) {
    return [
        `Nome: ${name}`,
        `Email: ${email}`,
        `Telefone: ${phone}`,
        "",
        "Mensagem:",
        message,
    ].join("\n");
}

/**
 * Parâmetros enviados ao template EmailJS.
 * No painel, use no corpo: {{message}} ou campos {{name}}, {{email}}, {{telefone}}, {{user_message}}.
 */
export function buildContactEmailParams({ name, email, phone, message }) {
    const formattedBody = formatContactEmailBody({ name, email, phone, message });

    return {
        from_name: name,
        reply_to: email,
        name,
        email,
        telefone: phone,
        phone,
        user_message: message,
        message: formattedBody,
    };
}
