const mongoose = require('mongoose');
const LikeSchema = new mongoose.Schema({
    likedByUser: {
        type: mongoose.Schema.Types.ObjectId,
        required:true,
        ref: 'User'
    },
    likeOnPost: {
        type: mongoose.Schema.Types.ObjectId,
        required:true,
        ref: 'Post'
    },
},{timestamps:true});

module.exports = mongoose.model('Like',LikeSchema)