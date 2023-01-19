const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const bcrypt = require("bcrypt");
const User = require("../../../models/signupmodel");
const jwt = require("jsonwebtoken");


const Login = async (req, resp) => {


  const {email, password} = req.body;

  const ifExist = await User.findOne({email, password, role : "institute"});

  if(!ifExist){
    return resp.status(500).json({Mgs:"invalid email & password!"});
  }


  const checkPassword = await bcrypt.compare(password, ifExist.password);

  if(!checkPassword){
    return resp.status(500).json({Mgs:"invalid password!"})
  }

  const token = jwt.sign(
    {
    name: ifExist.name,
    role: ifExist.role,
    email: ifExist.email,
    },
    'This is Token Key',
    {
      expiresIn:"24h"
    }
  );

  return resp.status(200).json({
    greeting: "Hello Institute",
    user: ifExist,
    token:token
  });

};


module.exports = {Login};
