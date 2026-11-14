import test from 'node:test';
import assert from 'node:assert/strict';

import { generationLabel } from '../src/generation.js';
import defaultExport from '../src/generation.js';

test('zero generations back is "self"', () => {
  assert.equal(generationLabel(0), 'self');
});

test('one generation back is "parent"', () => {
  assert.equal(generationLabel(1), 'parent');
});

test('two generations back is "grandparent"', () => {
  assert.equal(generationLabel(2), 'grandparent');
});

test('three generations back is "great-grandparent"', () => {
  assert.equal(generationLabel(3), 'great-grandparent');
});

test('four generations back is "2× great-grandparent"', () => {
  assert.equal(generationLabel(4), '2\u00d7 great-grandparent');
});

test('five generations back is "3× great-grandparent"', () => {
  assert.equal(generationLabel(5), '3\u00d7 great-grandparent');
});

test('six generations back is "4× great-grandparent"', () => {
  assert.equal(generationLabel(6), '4\u00d7 great-grandparent');
});

test('the greats count uses U+00D7 MULTIPLICATION SIGN and no space before it', () => {
  assert.equal(generationLabel(4).charCodeAt(1), 0x00d7);
  assert.equal(generationLabel(5).charCodeAt(1), 0x00d7);
  assert.equal(generationLabel(4).slice(0, 3), '2\u00d7 ');
  assert.equal(generationLabel(4).slice(3), 'great-grandparent');
});

test('the default export is generationLabel', () => {
  assert.equal(defaultExport, generationLabel);
  assert.equal(defaultExport(2), 'grandparent');
});

test('a negative number throws a RangeError', () => {
  assert.throws(() => generationLabel(-1), RangeError);
});

test('a non-integer throws a RangeError', () => {
  assert.throws(() => generationLabel(1.5), RangeError);
});

test('NaN throws a RangeError', () => {
  assert.throws(() => generationLabel(NaN), RangeError);
});

test('a numeric string throws a RangeError', () => {
  assert.throws(() => generationLabel('3'), RangeError);
});

test('the RangeError message names the received value', () => {
  assert.throws(() => generationLabel(-1), /got -1/);
  assert.throws(() => generationLabel('3'), /got "3"/);
});
