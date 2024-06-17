// Construct a schema, using GraphQL schema language
const {gql} = require("apollo-server-express");

const typeDefs = gql`
    type Query {
        hello(name: String): String
        characters: [Character]!
        character(id: String!): Character
    }

    type Character {
        name: String!,
        homeworld: String!,
        films: [String]!
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