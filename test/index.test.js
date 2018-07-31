const test = require('ava');
const { printTable } = require('../index.js')

const table = [
  ['X', 'O', 'O'],
  ['O', 'X', 'O'],
  ['O', 'O', 'X'],
];
test('my passing test', t => {
	t.snapshot(printTable(table));
});
