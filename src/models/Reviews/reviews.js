const mongoose = require('mongoose');

const ReviewsSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name:{
        type:String
    },
    desc:{
        type:String
    },
    rating:{
        type:Number
    },
    ref_id:{
        type:String
    },
    course_id:{
        type:String
    },
    institute_id:{
        type:String
    },
})


module.exports = mongoose.model('reviewsmodel', ReviewsSchema);