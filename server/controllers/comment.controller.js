const Comment = require('../models/comment.model');
const User = require('../models/user.model')


module.exports = {

    createComment: (req, res) => {
        const commentByUser = req.jwtpayload.id
        const commentOnPost = req.params.id
        let cm = {
            commentBody: req.body,
            commentByUser: commentByUser,
            commentOnPost: commentOnPost
        }

        Comment.create(cm)
            .then(newComment => {res.json(newComment)})
            .catch(err => {res.status(400).json(err)})
    },    

    getAllCommentsByPostId: (req, res) => {
        Comment.find({ commentOnPost: req.params.id })
            .then(allComments => {
                res.json(allComments)
            })
            .catch(err => {
                res.json({message: 'Something went wrong: ', error: err})
            });
    },

    getOneComment: (req, res) => {
        Comment.findOne({_id: req.params.id})
            .then(oneComment => {
                res.json(oneComment)
            })
            .catch(err => {
                res.json({message: 'Something went wrong: ', error: err})
            });
    },

    // updateComment: (req, res) => {
    //     Comment.findOneAndUpdate( {_id: req.params.id}, req.body, {runValidators: true, new: true})
    //         .then(updatedComment => {
    //             res.json(updatedComment)
    //         })
    //         .catch(err => {res.status(400).json(err)
    //             console.log(err)
    //         })
    // },

    // deleteComment: (req, res) => {
    //     Comment.deleteOne( {_id: req.params.id} )
    //         .then(deleteConfirmation => {
    //             res.json(deleteConfirmation)
    //         })
    //         .catch(err => {
    //             res.json({message: 'Something went wrong: ', error: err})
    //         });
    // },

    updateComment: async (req,res) => {
        try{
        const getCreaterId = await Comment.find({_id: req.params.id})
        const commentCreator = getCreaterId[0].commentByUser.toString()
        if (req.jwtpayload.id != commentCreator ){
            console.log("You are not authorized to comment on this post")
            return
        }
        else{
            const commentBody = {
                commentBody: req.body.commentBody,
                commentByUser:req.jwtpayload.id,
                commentOnPost:req.params.id
            }
            console.log(commentBody,'body')

            const commentUpdate = await Comment.findOneAndUpdate({_id: req.params.id}, commentBody, {runValidators: true, new: true})
            console.log(commentUpdate)
            res.json(commentUpdate)
        }
    }
    catch(err){
        console.log("something went wrong wiht Comment update")
        res.status(400).json(err)
    }
    },

    deleteComment: async (req,res) => {
        try{
        const getCreaterId = await Comment.find({_id: req.params.id})
        const creatorId = getCreaterId[0].commentByUser.toString()
        console.log(req.jwtpayload.id,creatorId)
        if (req.jwtpayload.id != creatorId ){
            console.log("You are not authorized to delete this Comment")
            return
        }
        else{
            console.log('inside the delete ')
            const CommentDelete = await Comment.deleteOne({_id: req.params.id})
            console.log(CommentDelete)
            return res.json(CommentDelete)
        }
    }
    catch(err){
        console.log("something went wrong deleting your Comment")
        console.log(err)
        res.status(400).json(err)
    }
    }

};
