const printTable = table => {
  const formattedTable = table.reduce((print, row, index) => {
    const formatted = row.reduce((result, x, i) => {
      return { ...result, [i]: x };
    }, {});
    print.push(formatted);
    return print;
  }, []);
  console.table(formattedTable);
};

module.exports = {
  printTable,
};
