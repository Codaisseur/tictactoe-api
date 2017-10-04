// Initializes the `symbols` service on path `/symbols`
const createService = require('feathers-mongoose');
const createModel = require('../../models/symbols.model');
const hooks = require('./symbols.hooks');
const filters = require('./symbols.filters');

module.exports = function () {
  const app = this;
  const Model = createModel(app);
  const paginate = app.get('paginate');

  const options = {
    name: 'symbols',
    Model,
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/symbols', createService(options));

  // Get our initialized service so that we can register hooks and filters
  const service = app.service('symbols');

  service.hooks(hooks);

  if (service.filter) {
    service.filter(filters);
  }
};
