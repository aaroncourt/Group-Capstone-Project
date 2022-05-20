const mongoose = require('mongoose');
const PictureSchema = new mongoose.Schema({
    pictureFileName:{
        type: String,
        required:[true,"File name  is requierd"],
    },
    pictureLocation:{
        type: String,
    },
    pictureByUser: {
        type: mongoose.Schema.Types.ObjectId,
        required:true,
        ref: 'User'
    },
    pictureOnPost: {
        type: mongoose.Schema.Types.ObjectId,
        required:true,
        ref: 'Post'
    },
},{timestamps:true});

module.exports = mongoose.model('Picture',PictureSchema)