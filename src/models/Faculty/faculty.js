const mongoose = require('mongoose')

const facultySchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name:{
        type: String,
        required:true
    },
    description:{
        type: String,
        required:true
    },
    subject:{
        type: String,
        required:true
    },
    institute_id:{
        type: String,
        required:true
    }
})

module.exports = mongoose.model('facultyModel' , facultySchema)