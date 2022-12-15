const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const User = require("../models/signupmodel");
const bcrypt = require('bcrypt');

// Getting all Users details
router.get("/", (req, resp) => {
  User.find()
    .then((result) => {
      resp.status(200).json({
        UserDetails: result,
      });
    })
    .catch((err) => {
      resp.status(500).json({
        Error: err,
      });
    });
});

// Creating a User
router.post("/", (req, resp) => {
  bcrypt.hash(req.body.password,10,(err,hash)=>{
    if (err) {
      resp.status(500).json({msg:err})
    }
    else {

      const {name,email,mobile,role,password} = req.body;
      const user = new User({
        _id: new mongoose.Types.ObjectId(),
        name,
        email,
        mobile,
        password: hash,
        role,
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
  })
});

// Getting user by id
router.get("/:id", (req, resp) => {
  User.findById(req.params.id)
    .then((result) => {
      resp.status(200).json({
        UserDetails: result,
      });
    })
    .catch((err) => {
      resp.status(500).json({
        Error: err,
      });
    });
});

// Deleting User
router.delete("/:id", (req, resp) => {
  User.findById({ _id: req.params.id })
    .remove()
    .then((result) => {
      resp.status(200).json({
        Value: "User Detated!",
        val2: result,
      });
    })
    .catch((err) => {
      resp.status(500).json({
        Error: err,
      });
    });
});

// Updating User Details
router.put("/:id", (req, resp) => {
  User.findOneAndUpdate(
    { _id: req.params.id },
    {
      $set: {
        name: req.body.name,
        email: req.body.email,
        mobile: req.body.mobile,
        password: req.body.password,
        role: req.body.role,
      },
    }
  )
    .then((result) => {
      resp.status(200).json({ msg: "User Details are updated.", result });
    })
    .catch((err) => {
      resp.status(500).json({
        Error: err,
      });
    });
});



//**************** If You wanr to delete all users ************//

// router.delete('/' , (req,resp)=>{
//   User.find()
//   .deleteMany()
//   // .deleteMany()
//   .then((result) => {
//     resp.status(200).json({
//       Value: "User Detated!",
//       val2: result,
//     });
//   })
//   .catch((err) => {
//     resp.status(500).json({
//       Error: err,
//     });
//   });
// })

module.exports = router;
