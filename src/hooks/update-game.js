// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html
const errors = require('feathers-errors');
const randomSymbol = require('./randomSymbol');

const JOIN_GAME = 'JOIN_GAME';

module.exports = function (options = {}) { // eslint-disable-line no-unused-vars
  return function updateGame (hook) {
    // Hooks can either return nothing or a promise
    // that resolves with the `hook` object for asynchronous operations
    switch(hook.data.type) {

    case JOIN_GAME :
      return randomSymbol(hook)
        .then((symbol) => {
          hook.data = {
            '$addToSet': {
              'playerIds': hook.params.user._id,
              'playerSymbols': symbol
            }
          };

          return Promise.resolve(hook);
        });

    default :
      throw new errors.NotAcceptable('Dunno what you want, but you are not gonna get it.');
    }
  };
};
