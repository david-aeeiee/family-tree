// Formatting helpers for a person's life span.

/**
 * Treat missing, null and empty values as unknown.
 * @param {unknown} value
 * @returns {boolean}
 */
function isKnown(value) {
  return value !== undefined && value !== null && String(value).trim() !== '';
}

/**
 * Format a life span from a birth and a death year.
 *
 * - both years known  -> "1901–1985" (en dash)
 * - birth year only   -> "b. 1990"
 * - death year only   -> "d. 1985"
 * - neither known     -> ""
 *
 * @param {{ born?: string|number|null, died?: string|number|null }} [years]
 * @returns {string}
 */
export function formatLifeSpan({ born, died } = {}) {
  const hasBorn = isKnown(born);
  const hasDied = isKnown(died);

  if (hasBorn && hasDied) {
    return `${String(born).trim()}\u2013${String(died).trim()}`;
  }
  if (hasBorn) {
    return `b. ${String(born).trim()}`;
  }
  if (hasDied) {
    return `d. ${String(died).trim()}`;
  }
  return '';
}

export default formatLifeSpan;
