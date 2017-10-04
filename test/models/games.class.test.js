const assert = require('assert');
const ModelClass = require('../../src/models/games.class');

describe('\'games\' modelClass', () => {
  const user = {
    _id: 'userId',
    name: 'User Name'
  };

  const game = new ModelClass();

  describe('#setup(user)', () => {
    game.setup(user);

    it('creates the title for the game', () => {
      assert.equal(game.title, 'User Name\'s Game');
    });

    it('adds the user to the playerIds of the game', () => {
      assert.ok(game.playerIds.includes(user._id));
    });

    it('sets up 1 initial player for the game', () => {
      assert.equal(game.playerIds.length, 1);
    });
  });
});
