const userResolver = require('./user');
const serviceResolver = require('./service');

const rootResolver = {
  ...userResolver,
  ...serviceResolver
};

module.exports = rootResolver;
