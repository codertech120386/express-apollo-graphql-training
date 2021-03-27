const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
  email: { type: String, required: true },
  password: { type: String, required: true },
});

userSchema.pre("save", function (next) {
  // check if password is entered first time or modified and if not then do nothing
  if (!this.isModified("password")) return next();

  // then run it through bcrypt and hash it
  bcrypt.hash(this.password, 12, (err, hash) => {
    if (err) return next(err);

    // update the password in the database
    this.password = hash;
    return next();
  });
});

userSchema.methods.checkPassword = function (password) {
  const passwordHash = this.password;

  return new Promise((resolve, reject) => {
    bcrypt.compare(password, passwordHash, (err, same) => {
      if (err) return reject(err);

      return resolve(same);
    });
  });
};

module.exports = mongoose.model("user", userSchema);
