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

class Game {
  constructor({ players, board } = {}) {
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });

    this.players = players.reduce((result, player) => {
      return { ...result, [player.name]: player };
    }, {});

    this.rl = rl;

    this.board = board;
  }

  async _getMove(player) {
    while(true) {
      const rawInput = (await this.rl.questionAsync(`Whats your next move 🤔  ? (turn:"${player}")`)).trim();
      const move = rawInput.split(',');
      if (/^[\d],[\d]$/gi.test(rawInput) && this.board.withinBoundaries(move)) {
        return {
          player,
          move,
        };
      }
    }
  }


  play() {
    while (!this.board.gameEnded) {}
  }
  _terminateGame() {
    this.rl.close();
  }
}
module.exports = Game;
