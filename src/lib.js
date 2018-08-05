'use strict';

/**
 * Formats the current board state to be used by console.table
 * @param {String[][]} table - The board state
 * @return {Object[]}
 **/
function formatTable(table) {
  return table.reduce((print, row, index) => {
    const formatted = row.reduce((result, x, i) => {
      return { ...result, [i]: x };
    }, {});
    print.push(formatted);
    return print;
  }, []);
}

module.exports = {
  printTable: boardState => {
    console.table(formatTable(boardState));
  },
  formatTable,
};
