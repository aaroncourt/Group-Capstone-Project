const Comment = require('../models/Comment.models');

module.exports = {

    createComment: (req, res) => {
        Comment.create(req.body)
            .then(newComment => {res.json(newComment)})
            .catch(err => {res.status(400).json(err)})
    },    

    getAllComments: (req, res) => {
        console.log(req.body)
        Comment.find({})
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

    updateComment: (req, res) => {
        Comment.findOneAndUpdate( {_id: req.params.id}, req.body, {runValidators: true, new: true})
            .then(updatedComment => {
                res.json(updatedComment)
            })
            .catch(err => {res.status(400).json(err)
                console.log(err)
            })
    },

    deleteComment: (req, res) => {
        Comment.deleteOne( {_id: req.params.id} )
            .then(deleteConfirmation => {
                res.json(deleteConfirmation)
            })
            .catch(err => {
                res.json({message: 'Something went wrong: ', error: err})
            });
    },

};
