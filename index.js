'use strict';
require('module-alias/register')

const Game  = require('@roles/Game');

(function main() {
  const game = new Game();
  game.play();
})();


