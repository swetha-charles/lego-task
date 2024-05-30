// Construct a schema, using GraphQL schema language
const {gql} = require("apollo-server-express");

const typeDefs = gql`
    type Query {
        hello(name: String): String
    }

    type User {
        username: String
        lastLoggedIn: String
    }

    type Session {
        token: String
        user: User
    }

    type Mutation {
        login(username: String!, password: String!): Session
    }
`;

module.exports = { typeDefs }