# Family Tree
## Put your family’s history on your own website. Built in public with 3mote.

## Development

The project has no dependencies, so there is nothing to install.

Run the tests with Node's built-in test runner:

```sh
npm test
```

Requires Node 18 or newer. `npm test` runs `node --test`, which picks up the
files in `test/`; you can also run `node --test` directly without npm.

## Project layout

- `src/life-span.js` — `formatLifeSpan({ born, died })`, which formats a life
  span as `1901–1985`, `b. 1990`, `d. 1985`, or `""` when neither year is known.
- `test/life-span.test.js` — tests for the four life-span cases.
