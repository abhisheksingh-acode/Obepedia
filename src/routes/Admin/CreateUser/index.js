const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const User = require("../../../models/signupmodel");
const bcrypt = require("bcrypt");

// Creating a User
const CreateUser = (req, resp) => {
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
        role: "user",
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

module.exports = { CreateUser, CreateInstitute };
