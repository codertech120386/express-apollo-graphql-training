const Book = require("../../models/book.model");
const { UserInputError } = require("apollo-server");

module.exports = {
  Query: {
    getBooks: async () => {
      try {
        const books = await Book.find({}).lean().exec();
        console.log("books", books);
        return books;
      } catch (e) {
        throw new Error("Something went wrong");
      }
    },
  },
  Mutation: {
    addBook: async (_, { title, author }) => {
      try {
        const book = await Book.create({ title, author });
        return book;
      } catch (e) {}
    },
    updateBook: async (_, { id, title, author }) => {
      try {
        let setObject = {};

        if (title) setObject.title = title;
        if (author) setObject.author = author;

        const book = await Book.findByIdAndUpdate(id, setObject, { new: true });
        return book;
      } catch (e) {}
    },
    deleteBook: async (_, { id }) => {
      try {
        const book = await Book.findByIdAndDelete(id);
        return book;
      } catch (e) {}
    },
  },
};
