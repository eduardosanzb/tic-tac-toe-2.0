'use strict';

const readline = require('readline');
const { promisify } = require('util');

readline.Interface.prototype.question[promisify.custom] = function(prompt) {
  return new Promise(resolve =>
    readline.Interface.prototype.question.call(this, prompt, resolve),
  );
};

readline.Interface.prototype.questionAsync = promisify(
  readline.Interface.prototype.question,
);

module.exports = readline;
