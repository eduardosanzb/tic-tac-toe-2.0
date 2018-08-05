'use strict';
const test = require('ava');
const sinon = require('sinon');

const Game = require('@roles/Game');

// TODO: replace with real players instances
const players = [
  {
    name: 'Test',
  },
];

let game = void 0;
let stubQuestionAsync = void 0;

// TODO: Replace with a real Board instance
const board = {
 withinBoundaries: () => true
};

test.before(() => {
  game = new Game({ players, board });
});

test.beforeEach(() => {
  stubQuestionAsync = sinon.stub(game.rl, 'questionAsync');
  stubQuestionAsync.resolves('3,4 ');
});

test.afterEach(() => {
  stubQuestionAsync.restore();
});

test.serial('success _getMove', async t => {
  const result = await game._getMove('Test');
  t.deepEqual(result, { player: 'Test', move: ['3','4'] });
});

test.serial('fail and then success _getMove', async t => {
  stubQuestionAsync.onCall(0).resolves('ww,er ');
  stubQuestionAsync.onCall(1).resolves('');
  stubQuestionAsync.onCall(2).resolves('3,4 ');

  const result = await game._getMove('Test');
  t.deepEqual(result, { player: 'Test', move: ['3','4'] });
});

test.after(() => {
  game._terminateGame();
});
