const Like = require('../models/like.model');

module.exports = {

    createLike: (req, res) => {
        Like.create(req.body)
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

    updateLike: (req, res) => {
        Like.findOneAndUpdate( {_id: req.params.id}, req.body, {runValidators: true, new: true})
            .then(updatedLike => {
                res.json(updatedLike)
            })
            .catch(err => {res.status(400).json(err)
                console.log(err)
            })
    },

    deleteLike: (req, res) => {
        Like.deleteOne( {_id: req.params.id} )
            .then(deleteConfirmation => {
                res.json(deleteConfirmation)
            })
            .catch(err => {
                res.json({message: 'Something went wrong: ', error: err})
            });
    },

};
