const { authenticate } = require('feathers-authentication').hooks;
const { populate } = require('feathers-hooks-common');
const createGame = require('../../hooks/create-game');

const playersSchema = {
  include: {
    service: 'users',
    nameAs: 'players',
    parentField: 'playerIds',
    childField: '_id'
  }
};

const fixPlayerArray = require('../../hooks/fix-player-array');

module.exports = {
  before: {
    all: [ authenticate('jwt') ],
    find: [],
    get: [],
    create: [createGame()],
    update: [],
    patch: [],
    remove: []
  },

  after: {
    all: [populate({ schema: playersSchema }), fixPlayerArray()],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  },

  error: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  }
};
