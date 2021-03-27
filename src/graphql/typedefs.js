const { gql } = require("apollo-server");

module.exports = gql`
  type Book {
    _id: ID!
    title: String!
    author: String!
  }

  type User {
    _id: ID!
    email: String!
    token: String
  }

  type Query {
    getBooks: [Book]
  }
  type Mutation {
    addBook(title: String, author: String): Book
    updateBook(id: ID!, title: String, author: String): Book
    deleteBook(id: ID!): Book
    register(email: String, password: String): User
    login(email: String, password: String): User
  }
`;
