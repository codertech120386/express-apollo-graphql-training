require("dotenv").config();
const { UserInputError } = require("apollo-server-errors");
const jwt = require("jsonwebtoken");

const User = require("../../models/user.model");

const newToken = (user) => {
  return jwt.sign({ id: user.id }, process.env.JWT_SECRET_KEY);
};

module.exports = {
  Mutation: {
    register: (_, { email, password }) => {
      try {
        // create a user
        const user = User.create({ email: email, password: password });
        // hash his password to be done in user model

        // create a new token
        const token = newToken(user);
        // return the token
        console.log("token", token);
        return {
          ...user,
          email,
          token,
        };
      } catch (e) {
        throw new Error("Something went wrong");
      }
    },
    login: async (_, { email, password }) => {
      let user;
      try {
        // check if email exists for a user
        user = await User.findOne({ email: email }).exec();

        // if not throw userinputerror
        if (!user) throw new UserInputError("Email or password is incorrect");
      } catch (e) {
        throw new Error("Something went wrong");
      }

      try {
        // if yes then match the password against the hash stored in the database for that user
        const match = await user.checkPassword(password);

        // if not match the throw userinputerror
        if (!match) throw new UserInputError("Email or password is incorrect");
      } catch (e) {
        throw new Error("Something went wronggggss");
      }
      // if matched then create new token
      const token = newToken(user);

      // send the user back with the token
      return {
        ...user,
        email,
        token,
      };
    },
  },
};
