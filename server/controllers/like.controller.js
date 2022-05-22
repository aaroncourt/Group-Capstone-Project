const Like = require('../models/Like.models');

module.exports = {

    createLike: (req, res) => {
        Like.create(req.body)
            .then(newLike => {res.json(newLike)})
            .catch(err => {res.status(400).json(err)})
    },    

    getAllLikesByPost: (req, res) => {
        Like.find({ likeOnPost: req.params.id})
            .then(allLikes => {
                res.json(allLikes)
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
