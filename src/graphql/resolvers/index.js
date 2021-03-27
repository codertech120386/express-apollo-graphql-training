const bookResolvers = require("./books.resolvers");
const userResolvers = require("./users.resolvers");

module.exports = {
  Query: {
    ...bookResolvers.Query,
  },
  Mutation: {
    ...bookResolvers.Mutation,
    ...userResolvers.Mutation,
  },
};
