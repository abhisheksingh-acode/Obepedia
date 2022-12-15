const mongoose = require('mongoose');

const SidebarSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    link:{
        type:String
    },
    banner:{
        type:String
    }
})


module.exports = mongoose.model('sidebarmodel', SidebarSchema);