const mongoose = require('mongoose')

const SuggestionSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name:{
        type: String,
        required:true
    },
    email:{
        type: String,
        required:true
    },
    number:{
        type: Number,
        required:true
    },
    description:{
        type: String,
        required:true
    }
})

module.exports = mongoose.model('SuggestionModel' , SuggestionSchema)