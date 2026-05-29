/**
 * Extrai número e sufixo de valores como "2025", "200+", "100%".
 * @param {string} value
 */
export function parseStatValue(value) {
    const match = String(value).trim().match(/^(\d+)(.*)$/);
    if (!match) {
        return { numeric: 0, suffix: value, hasNumber: false };
    }
    return {
        numeric: Number.parseInt(match[1], 10),
        suffix: match[2] ?? "",
        hasNumber: true,
    };
}
