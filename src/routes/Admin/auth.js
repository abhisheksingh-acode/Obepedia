const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const bcrypt = require("bcrypt");
const User = require("../../models/signupmodel");
const jwt = require("jsonwebtoken");

router.get("/login", (req, resp) => {
  resp.send("Hello, Please Login!");
});

router.post("/login", (req, resp) => {
  User.findOne({ email: req.body.email })
    .then((user) => {
      if (!user) {
        return resp.json({ msg: "user not found" });
      } else {
        if (user.role !== "admin") {
          return resp.json({ msg: "You arent admin" });
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
                msg: "Hello Admin",
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
      return resp.status(500).json({ error: err });
    });
});

const logout = async (req, res) => {
  return res.json({ msg: "token deleted" });
};

router.post("/logout", logout);

module.exports = router;
