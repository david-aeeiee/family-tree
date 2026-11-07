import test from 'node:test';
import assert from 'node:assert/strict';

import { formatLifeSpan } from '../src/life-span.js';

test('both years known gives an en dash range', () => {
  assert.equal(formatLifeSpan({ born: 1901, died: 1985 }), '1901\u20131985');
});

test('only the birth year known gives "b. YEAR"', () => {
  assert.equal(formatLifeSpan({ born: 1990 }), 'b. 1990');
});

test('only the death year known gives "d. YEAR"', () => {
  assert.equal(formatLifeSpan({ died: 1985 }), 'd. 1985');
});

test('neither year known gives an empty string', () => {
  assert.equal(formatLifeSpan({}), '');
});
