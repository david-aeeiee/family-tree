// Formatting helpers for a person's full name.

/**
 * Treat missing, null and empty values as unknown.
 * @param {unknown} value
 * @returns {boolean}
 */
function isKnown(value) {
  return value !== undefined && value !== null && String(value).trim() !== '';
}

/**
 * Format a full name from its parts.
 *
 * - given, middle and family are joined with single spaces, in that order
 *   -> "Ada King Lovelace"
 * - a known suffix follows a comma and one space
 *   -> { given: "Martin", family: "King", suffix: "Jr." } -> "Martin King, Jr."
 * - parts are trimmed; missing, null, empty and whitespace-only parts are skipped
 *   -> { given: "Ada", middle: "  ", family: "Lovelace" } -> "Ada Lovelace"
 * - nothing known -> ""
 *
 * Suffix edge cases, kept consistent with the comma rule above:
 * - family (or other base parts) missing -> the comma still applies
 *   -> { family: "King", suffix: "Jr." } -> "King, Jr."
 *   -> { given: "Ada", suffix: "Jr." } -> "Ada, Jr."
 * - suffix only, no other part known -> the suffix alone, with no leading comma
 *   -> { suffix: "Jr." } -> "Jr."
 *
 * @param {{ given?: string|null, middle?: string|null, family?: string|null, suffix?: string|null }} [parts]
 * @returns {string}
 */
export function formatFullName({ given, middle, family, suffix } = {}) {
  const base = [given, middle, family]
    .filter(isKnown)
    .map((part) => String(part).trim())
    .join(' ');

  if (!isKnown(suffix)) {
    return base;
  }

  const trimmedSuffix = String(suffix).trim();

  // A suffix needs something to attach to; on its own it stands without a comma.
  return base === '' ? trimmedSuffix : `${base}, ${trimmedSuffix}`;
}

export default formatFullName;
