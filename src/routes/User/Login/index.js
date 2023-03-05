const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const bcrypt = require("bcrypt");
const User = require("../../../models/signupmodel");
const jwt = require("jsonwebtoken");

const Login = async (req, resp) => {
  User.findOne({ email: req.body.email })
    .exec()
    .then((user) => {
      if (!user) {
        return resp.json({ msg: "user not found" });
      } else {
        if (user.role !== "user") {
          return resp.json({ msg: "You aren't registerd User!" });
        } else {
          bcrypt.compare(req.body.password, user.password, (err, result) => {
            if (err) {
              console.log(err);
            } else if (result) {
              const token = jwt.sign(
                {
                  name: user.name,
                  role: user.role,
                  email: user.email,
                },
                "This is Token Key",
                {
                  expiresIn: "24h",
                }
              );

              return resp.status(200).json({
                msg: `Hello ${user.name}!`,
                user,
                token: token,
              });
            } else {
              return resp.status(500).json({ msg: "Password is wrong!" });
            }
          });
        }
      }
    })
    .catch((err) => {
      return resp
        .status(500)
        .json({ error: err, msg: "internal server error" });
    });
};

const getLogin = (req, resp) => {
  resp.status(200).json({ msg: "hello Please Login" });
};

module.exports = { Login, getLogin };
