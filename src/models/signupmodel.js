// its a signup model which is same for all(user,institute and admin)

const mongoose = require("mongoose");
const Jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "name is required"],
  },
  email: {
    type: String,
    required: [true, "email is required"],
    unique: [true],
  },
  mobile: {
    type: Number,
    required: [true, "mobile is required"],
    unique: [true],
  },
  password: {
    type: String,
    minlength: [8, "password length should be 8 or higher"],
    required: [true, "password is required"],
  },
  role: {
    type: String,
    required: [true, "role is required"],
  },
});

userSchema.pre("save", async function () {
  const saltRounds = 10;
  this.password = await bcrypt.hash(this.password, saltRounds);
});

userSchema.methods.createJWT = function () {
  return Jwt.sign(
    {
      name: this.name,
      role: this.role,
      email: this.email,
    },
    "This is Token Key",
    {
      expiresIn: "24h",
    }
  );
};

module.exports = mongoose.model("User", userSchema);
