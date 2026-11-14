import test from 'node:test';
import assert from 'node:assert/strict';

import { formatFullName } from '../src/full-name.js';

test('given, middle and family are joined with single spaces', () => {
  assert.equal(
    formatFullName({ given: 'Ada', middle: 'King', family: 'Lovelace' }),
    'Ada King Lovelace',
  );
});

test('a known suffix follows a comma', () => {
  assert.equal(
    formatFullName({ given: 'Martin', family: 'King', suffix: 'Jr.' }),
    'Martin King, Jr.',
  );
});

test('a missing middle name is skipped', () => {
  assert.equal(
    formatFullName({ given: 'Ada', family: 'Lovelace' }),
    'Ada Lovelace',
  );
});

test('null, empty and whitespace-only parts are skipped', () => {
  assert.equal(
    formatFullName({ given: 'Ada', middle: null, family: 'Lovelace' }),
    'Ada Lovelace',
  );
  assert.equal(
    formatFullName({ given: 'Ada', middle: '', family: 'Lovelace' }),
    'Ada Lovelace',
  );
  assert.equal(
    formatFullName({ given: 'Ada', middle: '   ', family: 'Lovelace' }),
    'Ada Lovelace',
  );
});

test('parts are trimmed', () => {
  assert.equal(
    formatFullName({ given: '  Ada  ', middle: ' King ', family: 'Lovelace  ' }),
    'Ada King Lovelace',
  );
});

test('nothing known gives an empty string', () => {
  assert.equal(formatFullName({}), '');
  assert.equal(
    formatFullName({ given: null, middle: '', family: '  ', suffix: null }),
    '',
  );
  assert.equal(formatFullName(), '');
});

test('a family-less name keeps the comma before the suffix', () => {
  assert.equal(formatFullName({ family: 'King', suffix: 'Jr.' }), 'King, Jr.');
  assert.equal(formatFullName({ given: 'Ada', suffix: 'Jr.' }), 'Ada, Jr.');
});

test('a suffix on its own has no leading comma', () => {
  assert.equal(formatFullName({ suffix: 'Jr.' }), 'Jr.');
});
