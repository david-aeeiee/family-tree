// Labels for how many generations back an ancestor is.

/**
 * A generation count is a whole number of generations back: 0 or more.
 * @param {unknown} value
 * @returns {boolean}
 */
function isGenerationCount(value) {
  return Number.isInteger(value) && value >= 0;
}

/**
 * Show the received value in a RangeError message, quoting strings so that
 * `"3"` is not mistaken for the number 3.
 * @param {unknown} value
 * @returns {string}
 */
function describe(value) {
  return typeof value === 'string' ? `"${value}"` : String(value);
}

/**
 * Label an ancestor by how many generations back they are.
 *
 * - 0 -> "self"
 * - 1 -> "parent"
 * - 2 -> "grandparent"
 * - 3 -> "great-grandparent"
 * - 4 and up -> "2× great-grandparent", "3× great-grandparent", ...
 *   (the number of greats is n - 2, joined with U+00D7)
 *
 * @param {number} n
 * @returns {string}
 * @throws {RangeError} when n is negative, not an integer, or not a number.
 */
export function generationLabel(n) {
  if (!isGenerationCount(n)) {
    throw new RangeError(
      `generationLabel() expects a whole number of generations back, got ${describe(n)}`,
    );
  }

  if (n === 0) {
    return 'self';
  }
  if (n === 1) {
    return 'parent';
  }
  if (n === 2) {
    return 'grandparent';
  }
  if (n === 3) {
    return 'great-grandparent';
  }
  return `${n - 2}\u00d7 great-grandparent`;
}

export default generationLabel;
