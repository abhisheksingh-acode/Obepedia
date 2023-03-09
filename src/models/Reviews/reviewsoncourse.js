const mongoose = require('mongoose');

const ReviewsOnCourseSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name:{
        type:String,
        required:true
    },
    desc:{
        type:String,
        required:true
    },
    rating:{
        type:Number,
        required:true
    },
    ref_id:{
        type:String,
        required:true
    },
    course_id:{
        type:String,
        required:true
    }
})


module.exports = mongoose.model('reviewsoncoursemodel', ReviewsOnCourseSchema);