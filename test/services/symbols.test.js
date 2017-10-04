const assert = require('assert');
const app = require('../../src/app');

describe('\'symbols\' service', () => {
  it('registered the service', () => {
    const service = app.service('symbols');

    assert.ok(service, 'Registered the service');
  });
});
