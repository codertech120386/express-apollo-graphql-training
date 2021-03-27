const express = require("express");
const { ApolloServer } = require("apollo-server");

const connect = require("./config/db");

const typeDefs = require("./graphql/typedefs");
const resolvers = require("./graphql/resolvers");

const app = express();

const server = new ApolloServer({ typeDefs, resolvers });

const start = async () => {
  await connect();

  // The `listen` method launches a web server.
  server.listen().then(({ url }) => {
    console.log(`🚀  Server ready at ${url}`);
  });

  app.listen(2244, () => {
    console.log("Listening on port 2244");
  });
};

module.exports = start;
