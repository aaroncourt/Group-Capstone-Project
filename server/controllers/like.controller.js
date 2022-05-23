const Like = require('../models/like.model');

module.exports = {

    createLike: (req, res) => {
        const likedByUser = req.jwtpayload.id
        const likeOnPost = req.params.id
        let lk = req.body
        lk.likeOnPost = likeOnPost
        lk.likedByUser = likedByUser
        Like.create(lk)
            .then(newLike => {res.json(newLike)})
            .catch(err => {res.status(400).json(err)})
    },    
  
    getAllLikesByPostId: (req, res) => {
        Like.find({ likeOnPost: req.params.id})
            .then(allLikes => {
                let totalLikes = 0
                allLikes.forEach(like => {
                    totalLikes++
                })

                data = {
                    'allLikes': allLikes,
                    'totalLikes': totalLikes
                }
                res.json(data)
            })
            .catch(err => {
                res.json({message: 'Something went wrong: ', error: err})
            });
    },

    getOneLike: (req, res) => {
        Like.findOne({_id: req.params.id})
            .then(oneLike => {
                res.json(oneLike)
            })
            .catch(err => {
                res.json({message: 'Something went wrong: ', error: err})
            });
    },

    // updateLike: (req, res) => {
    //     Like.findOneAndUpdate( {_id: req.params.id}, req.body, {runValidators: true, new: true})
    //         .then(updatedLike => {
    //             res.json(updatedLike)
    //         })
    //         .catch(err => {res.status(400).json(err)
    //             console.log(err)
    //         })
    // },

    // deleteLike: (req, res) => {
    //     Like.deleteOne( {_id: req.params.id} )
    //         .then(deleteConfirmation => {
    //             res.json(deleteConfirmation)
    //         })
    //         .catch(err => {
    //             res.json({message: 'Something went wrong: ', error: err})
    //         });
    // },

    updateLike: async (req,res) => {
        try{
        const getCreaterId = await Like.find({_id: req.params.id})
        const likeCreator = getCreaterId[0].likedByUser.toString()
        if (req.jwtpayload.id != likeCreator ){
            console.log("You are not authorized to Like on this post")
            return
        }
        else{
            const likedPost = {
                likedByUser:req.jwtpayload.id,
                likeOnPost:req.params.id
            }
            console.log(likedPost,'body')

            const likeUpdate = await Like.findOneAndUpdate({_id: req.params.id}, likedPost, {runValidators: true, new: true})
            console.log(likedPost)
            res.json(likedPost)
        }
    }
    catch(err){
        console.log("something went wrong wiht Comment update")
        res.status(400).json(err)
    }
    },

    deleteLike: async (req,res) => {
        try{
            console.log('inside the delete like')
        const getCreaterId = await Like.find({_id: req.params.id})
        console.log(getCreaterId)
        const creatorId = getCreaterId[0].likedByUser.toString()
        console.log( getCreaterId[0].likedByUser.toString())
        console.log(req.jwtpayload.id,creatorId)
        if (req.jwtpayload.id != creatorId ){
            console.log("You are not authorized to delete this Comment")
            return
        }
        else{
            console.log('inside the delete ')
            const CommentDelete = await Like.deleteOne({_id: req.params.id})
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
