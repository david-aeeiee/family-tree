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

test('an approximate birth year in a full range is marked with "c. "', () => {
  assert.equal(
    formatLifeSpan({ born: 1850, bornApprox: true, died: 1912 }),
    'c. 1850\u20131912',
  );
});

test('an approximate death year in a full range is marked with "c. "', () => {
  assert.equal(
    formatLifeSpan({ born: 1850, died: 1912, diedApprox: true }),
    '1850\u2013c. 1912',
  );
});

test('both approximate years in a full range are marked with "c. "', () => {
  assert.equal(
    formatLifeSpan({ born: 1850, bornApprox: true, died: 1912, diedApprox: true }),
    'c. 1850\u2013c. 1912',
  );
});

test('an approximate birth year on its own gives "b. c. YEAR"', () => {
  assert.equal(formatLifeSpan({ born: 1850, bornApprox: true }), 'b. c. 1850');
});

test('an approximate death year on its own gives "d. c. YEAR"', () => {
  assert.equal(formatLifeSpan({ died: 1912, diedApprox: true }), 'd. c. 1912');
});
