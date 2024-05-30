const express = require('express');
const cors = require('cors');
const { ApolloServer } = require('apollo-server-express');
const queryResolver = require('./queryResolvers');
const loginResolver = require('./loginResolver');
const { typeDefs } = require("./schema");

// Provide resolver functions for your schema fields
const resolvers = {
  Query: {
    ...queryResolver,
  },
  Mutation: {
    ...loginResolver,
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  introspection: true,
  playground: true,
});

const app = express();

// enable cors for local development
app.use(cors());

server.applyMiddleware({ app });

app.listen({ port: 4000 }, () =>
  console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
);
