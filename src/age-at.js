// Age helpers for a person's life span.

/**
 * The age a person had reached in a given year.
 *
 * Contract (recorded by test/age-at.test.js, not implemented yet):
 * - known birth year and the person was alive that year -> year - born
 * - unknown birth year -> null
 * - year before the birth year -> null
 * - year after the death year -> null
 *
 * @param {{ born?: number|null, died?: number|null }} life
 * @param {number} year
 * @returns {number|null}
 */
export function ageAt({ born, died }, year) {
  throw new Error('not implemented');
}

export default ageAt;
