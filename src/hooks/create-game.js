// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html
const Game = require('../models/games.class');
const randomSymbol = require('./randomSymbol');

module.exports = function (options = {}) { // eslint-disable-line no-unused-vars
  return function createGame (hook) {
    return randomSymbol(hook)
      .then((symbol) => {
        const game = new Game();
        const { user } = hook.params;

        game.setup(user);
        hook.data = game;
        hook.data.playerSymbols = [symbol];

        return Promise.resolve(hook);
      });
  };
};
