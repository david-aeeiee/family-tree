import test from 'node:test';
import assert from 'node:assert/strict';

import { ageAt } from '../src/age-at.js';

test('year minus birth year for a year while alive', () => {
  assert.equal(ageAt({ born: 1901, died: 1985 }, 1950), 49);
});

test('the birth year itself counts as alive, so age 0', () => {
  assert.equal(ageAt({ born: 1901, died: 1985 }, 1901), 0);
});

test('the death year itself counts as alive, so the full age', () => {
  assert.equal(ageAt({ born: 1901, died: 1985 }, 1985), 84);
});

test('unknown birth year gives null', () => {
  assert.equal(ageAt({ died: 1985 }, 1950), null);
});

test('a year before the birth year gives null', () => {
  assert.equal(ageAt({ born: 1901, died: 1985 }, 1900), null);
});

test('a year after the death year gives null', () => {
  assert.equal(ageAt({ born: 1901, died: 1985 }, 1986), null);
});
