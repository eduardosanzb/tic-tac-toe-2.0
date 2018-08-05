const test = require('ava');
const { formatTable } = require('../src/lib.js')

const stdout = process.stdout;
const stdin = process.stdin;

const table = [
  ['X', 'O', 'O'],
  ['O', 'X', 'O'],
  ['O', 'O', 'X'],
];

test('formatTable for console.table', t => {
	t.snapshot(formatTable(table));
});

