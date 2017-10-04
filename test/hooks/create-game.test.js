const assert = require('assert');
const createGame = require('../../src/hooks/create-game');

const user = {
  _id: 'userId',
  name: 'User Name'
};

describe('\'createGame\' hook', () => {
  it('runs the hook', () => {
    // A mock hook object
    const mock = {
      params: { user }
    };

    // Initialize our hook with no options
    const hook = createGame();

    // Run the hook function (which returns a promise)
    // and compare the resulting hook object
    return hook(mock).then(result => {
      assert.ok(result.data.title, 'User Name\'s Foooobar');
    });
  });
});
