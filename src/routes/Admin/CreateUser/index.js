const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const User = require("../../../models/signupmodel");
const bcrypt = require("bcrypt");

// Creating a User
const CreateUser = async (req, resp) => {
  // bcrypt.hash(req.body.password, 10, (err, hash) => {
  //   if (err) {
  //     resp.status(500).json({ msg: err });
  //   } else {
  const { name, email, mobile, role, password } = req.body;
  const user = new User({
    _id: new mongoose.Types.ObjectId(),
    name,
    email,
    mobile,
    password,
    role: "user",
  });

  user.save();

  const result = await user;

  //       .then((result) => {
  //         console.log(result);
  return resp.status(200).json({ newUser: result });
  //       })

  //       .catch((err) => {
  //         console.log(err);
  //         resp.status(500).json({ error: err });
  //       });
  //   }
  // });
};

// Creating a Institute
const CreateInstitute = (req, resp) => {
  bcrypt.hash(req.body.password, 10, (err, hash) => {
    if (err) {
      resp.status(500).json({ msg: err });
    } else {
      const { name, email, mobile, role, password } = req.body;
      const user = new User({
        _id: new mongoose.Types.ObjectId(),
        name,
        email,
        mobile,
        password: hash,
        role: "institute",
      });

      user
        .save()

        .then((result) => {
          console.log(result);
          resp.status(200).json({ newUser: result });
        })

        .catch((err) => {
          console.log(err);
          resp.status(500).json({ error: err });
        });
    }
  });
};

const resetPassword = async (req, resp) => {
  const updatePassword = await bcrypt.hash(req.body.password, 10);
  const result = await User.findOne({ _id: req.params.id }).updateOne({
    password: updatePassword,
  });

  return resp.status(200).json({ msg: "password is updated", result });
};

module.exports = { CreateUser, CreateInstitute, resetPassword };
