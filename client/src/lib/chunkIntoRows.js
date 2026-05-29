/**
 * Agrupa itens em linhas conforme o número de colunas do grid.
 * @template T
 * @param {T[]} items
 * @param {number} cols
 * @returns {T[][]}
 */
export function chunkIntoRows(items, cols) {
    const size = Math.max(1, cols);
    const rows = [];
    for (let i = 0; i < items.length; i += size) {
        rows.push(items.slice(i, i + size));
    }
    return rows;
}
