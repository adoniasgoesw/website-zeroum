/**
 * @param {{ phone: string, message?: string }} params
 * phone: E.164 sem "+" (ex.: 5511981754327)
 */
export function buildWhatsAppUrl({ phone, message = "" }) {
    const digits = String(phone).replace(/\D/g, "");
    if (!digits) return "https://wa.me/";
    const base = `https://wa.me/${digits}`;
    const text = message.trim();
    return text ? `${base}?text=${encodeURIComponent(text)}` : base;
}
