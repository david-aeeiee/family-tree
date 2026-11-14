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
 * Format one year, marking it as approximate with a "c. " prefix.
 * @param {string|number} value
 * @param {boolean} [approx]
 * @returns {string}
 */
function formatYear(value, approx) {
  const year = String(value).trim();
  return approx ? `c. ${year}` : year;
}

/**
 * Format a life span from a birth and a death year.
 *
 * - both years known  -> "1901–1985" (en dash)
 * - birth year only   -> "b. 1990"
 * - death year only   -> "d. 1985"
 * - neither known     -> ""
 *
 * An approximate year is written with "c. " in front of it, e.g.
 * "c. 1850–1912", "b. c. 1850" or "d. c. 1912".
 *
 * @param {{
 *   born?: string|number|null,
 *   died?: string|number|null,
 *   bornApprox?: boolean,
 *   diedApprox?: boolean,
 * }} [years]
 * @returns {string}
 */
export function formatLifeSpan({ born, died, bornApprox, diedApprox } = {}) {
  const hasBorn = isKnown(born);
  const hasDied = isKnown(died);

  if (hasBorn && hasDied) {
    return `${formatYear(born, bornApprox)}\u2013${formatYear(died, diedApprox)}`;
  }
  if (hasBorn) {
    return `b. ${formatYear(born, bornApprox)}`;
  }
  if (hasDied) {
    return `d. ${formatYear(died, diedApprox)}`;
  }
  return '';
}

export default formatLifeSpan;
