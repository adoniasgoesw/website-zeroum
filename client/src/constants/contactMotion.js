/** Entrada do formulário de contato. */
export const CONTACT_FORM_VIEWPORT = {
    once: true,
    amount: 0.2,
};

export const CONTACT_PLACEHOLDERS = {
    name: "Digite seu nome",
    email: "Digite seu e-mail",
    phone: "(11) 99999-9999",
    message: "Digite sua mensagem",
};

/** Velocidade da digitação nos placeholders (~48ms/caractere). */
export const CONTACT_TYPING_CHAR_MS = 48;

/** Pausa entre um campo e o próximo. */
export const CONTACT_TYPING_PAUSE_MS = 140;

/** Aguarda a entrada do bloco antes de iniciar a digitação. */
export const CONTACT_TYPING_INITIAL_DELAY_MS = 420;

const TYPING_FIELD_TEXTS = [
    CONTACT_PLACEHOLDERS.name,
    CONTACT_PLACEHOLDERS.email,
    CONTACT_PLACEHOLDERS.phone,
    CONTACT_PLACEHOLDERS.message,
];

/** Delay em ms (0 = nome, 1 = e-mail, 2 = WhatsApp, 3 = mensagem). */
export function contactTypingStartDelay(fieldIndex) {
    let delay = CONTACT_TYPING_INITIAL_DELAY_MS;
    for (let i = 0; i < fieldIndex; i++) {
        delay +=
            TYPING_FIELD_TEXTS[i].length * CONTACT_TYPING_CHAR_MS +
            CONTACT_TYPING_PAUSE_MS;
    }
    return delay;
}
