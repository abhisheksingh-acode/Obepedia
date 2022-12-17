const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const bcrypt = require("bcrypt");
const User = require("../../models/signupmodel");
const jwt = require("jsonwebtoken");

router.get("/login", (req, resp) => {
  resp.send("Hello, Please Login!");
});

router.post("/login",  (req, resp) => {
  User.findOne({ email: req.body.email })
    .then((user) => {
      if (!user) {
        resp.json({msg: "user not found"});
      } else {
        if (user.role !== "admin") {
          resp.json({msg:"You arent admin"});
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
                'This is Token Key',
                {
                  expiresIn:"24h"
                }
              );

              resp.status(200).json({
                greeting: "Hello Admin",
                user,
                token:token
              })
            }
            else{
              resp.status(500).json({Mgs:"Password is wrong!"})
            }
          });
        }
      }
    })
    .catch((err) => {
      resp.status(500).json({error:err});
    });
});

const logout = async (req, res) => {
  return res.json({ msg: "token deleted" });
};

router.post("/logout", logout);

module.exports = router;
