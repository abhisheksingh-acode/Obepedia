const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const bcrypt = require("bcrypt");
const User = require("../../../models/signupmodel");
const jwt = require("jsonwebtoken");


const Login = (req, resp) => {
  User.findOne({ email: req.body.email })
    .exec()
    .then((user) => {
      if (!user) {
        resp.send("user not found");
      } else {
        if (user.role !== "user") {
          resp.send("You aren't registerd User!");
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
                greeting: `Hello ${user.name}!`,
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
};


const getLogin = (req,resp)=>{
    resp.status(200).json({msg:"hello Please Login"})
}

module.exports = {Login , getLogin};
