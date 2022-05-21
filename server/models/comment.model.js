const mongoose = require('mongoose');
const CommentsSchema = new mongoose.Schema({
    commentBody: {
        type: String,
        required:[true,'Please Enter a comment'],
    },  
    commentByUser: {
        type: mongoose.Schema.Types.ObjectId,
        required:true,
        ref: 'User'
    },
    commentOnPost: {
        type: mongoose.Schema.Types.ObjectId,
        required:true,
        ref: 'Post'
    },
},{timestamps:true});

module.exports = mongoose.model('Comment',CommentsSchema)