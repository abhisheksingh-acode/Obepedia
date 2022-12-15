const express = require('express');
const router = express.Router();

const {UserDet , GetUserDet , GetDet} = require('./UserDetails/index');

router.post('/userdet/:id' , UserDet);
router.get('/getuserdet/:id' , GetUserDet);
router.get('/onlyuserdet/:id' , GetDet);

// Review Module
const {postReview}  = require('./Reviews/index')

router.post('/reviews/postreview/:id' , postReview)

module.exports  = router ;