// const express = require("express");
// const router = express.Router();
const User = require("../../../models/signupmodel");

const Account = async (req, resp) => {
    
   try {
    const user = await User.findOne({_id:req.params.id});

    if(user.role === 'admin'){
        return resp.status(200).json(user)
    }
    else{
        return resp.status(500).json({msg:"user not found"})
    }
   } catch (error) {
    resp.status(500).json(error)
   }
}

// module.exports = { account }
module.exports = {Account};
  