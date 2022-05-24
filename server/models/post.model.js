const mongoose = require('mongoose');
const arrayValidator = require('mongoose-array-validator');
const PostSchema = new mongoose.Schema({
    postTitle: {
        type: String,
        required:[true,'Please Enter a Post Title'],
    },  
    postBody: {
        type: String,
        required:[true,'Please Provide post details '],
    },
    // postPicture: {
    //     type: [String],
    //     default: undefined ,
    //     required: [true,'please add at least one picture'],
    //     minItems: {
    //         value: 1,
    //         message: props => `Please upload at least one picture`
    //     },
    //     maxItems: {
    //         value: 4,
    //         message: props => `maxsimum number of pictures is 4`
    //     },
    //     },
    postedBy: {
        type: mongoose.Schema.Types.ObjectId,
        required:true,
        ref: 'User'
    }

},{timestamps:true});


PostSchema.plugin(arrayValidator)
module.exports = mongoose.model('Post',PostSchema)