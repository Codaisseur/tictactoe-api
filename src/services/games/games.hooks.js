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

const isGameJoinable = require('../../hooks/is-game-joinable');

const updateGame = require('../../hooks/update-game');

module.exports = {
  before: {
    all: [ authenticate('jwt') ],
    find: [],
    get: [],
    create: [createGame()],
    update: [updateGame()],
    patch: [updateGame()],
    remove: []
  },

  after: {
    all: [populate({ schema: playersSchema }), fixPlayerArray(), isGameJoinable()],
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
