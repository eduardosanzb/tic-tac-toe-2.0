'use strict';

require('module-alias/register');
const readline = require('@lib/readline');
const config = require('config');

const Game = require('@roles/Game');
const EMOJI_REGEX = /[\u{1f300}-\u{1f5ff}\u{1f900}-\u{1f9ff}\u{1f600}-\u{1f64f}\u{1f680}-\u{1f6ff}\u{2600}-\u{26ff}\u{2700}-\u{27bf}\u{1f1e6}-\u{1f1ff}\u{1f191}-\u{1f251}\u{1f004}\u{1f0cf}\u{1f170}-\u{1f171}\u{1f17e}-\u{1f17f}\u{1f18e}\u{3030}\u{2b50}\u{2b55}\u{2934}-\u{2935}\u{2b05}-\u{2b07}\u{2b1b}-\u{2b1c}\u{3297}\u{3299}\u{303d}\u{00a9}\u{00ae}\u{2122}\u{23f3}\u{24c2}\u{23e9}-\u{23ef}\u{25b6}\u{23f8}-\u{23fa}]/ug

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

async function getGameSetupForm() {
  let boardSize = 0;
  let players = [];

  while (boardSize < 3 || boardSize > 10) {
    boardSize = parseInt(
      (await rl.questionAsync(
        'Which size of board do you want? from 3 to 10? ',
      )).trim(),
    );
  }

  while (players.length < 3) {
    const playerNumber = players.length + 1;
    const name = (await rl.questionAsync(
      `Whats the name of the player ${playerNumber}: \t`,
    )).trim();
    const character = await getPlayerCharacter(playerNumber);
    players.push({
      name,
      character,
    });
  }

  return {
    boardSize,
    players,
  };
}

async function getPlayerCharacter(playerNumber) {
  let answer = void 0;
  do {
    answer = (await rl.questionAsync(
      `Whats the unique character for the ${playerNumber}: \t`,
    ))
      .trim()
      .toLowerCase();
  } while (/^[a-zA-Z]{1}$/.test(answer) === false && EMOJI_REGEX.test(answer) === false);
  return answer;
}
const YES_OPTIONS = ['y', 'yes'];
const NO_OPTIONS = ['n', 'no'];

async function askYesNo(question) {
  let answer = void 0;
  do {
    answer = (await rl.questionAsync(`${question} (y/n): `))
      .trim()
      .toLowerCase();
  } while ([...YES_OPTIONS, ...NO_OPTIONS].includes(answer) === false);
  return answer;
}

(async function main() {
  const useDefault = await askYesNo(
    'Do you want to use the default game setup',
  );
  rl.clearLine()

  let gameSetup = config.defaultSetup;
  if (['n', 'no', 'nein', 'nel'].includes(useDefault.trim().toLowerCase())) {
    gameSetup = await getGameSetupForm();
  }

  const game = new Game(gameSetup);
  console.log('game: ', game);
  game.play();
})();
