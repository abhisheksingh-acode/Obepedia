const mongoose = require('mongoose')

const SuggestionSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name:{
        type: String,
        required:[true, 'name is required']
    },
    email:{
        type: String,
        required:[true, 'email is required']
    },
    number:{
        type: Number,
        required:[true, 'phone is required']
    },
    description:{
        type: String,
        required:[true, 'message is required']
    }
})

module.exports = mongoose.model('SuggestionModel' , SuggestionSchema)