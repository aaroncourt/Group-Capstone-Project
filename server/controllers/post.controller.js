const Post = require('../models/Post.models');

module.exports = {

    createPost: (req, res) => {
        Post.create(req.body)
            .then(newPost => {res.json(newPost)})
            .catch(err => {res.status(400).json(err)})
    },    

    getAllPosts: (req, res) => {
        console.log(req.body)
        Post.find({})
            .then(allPosts => {
                res.json(allPosts)
            })
            .catch(err => {
                res.json({message: 'Something went wrong: ', error: err})
            });
    },

    getOnePost: (req, res) => {
        Post.findOne({_id: req.params.id})
            .then(onePost => {
                res.json(onePost)
            })
            .catch(err => {
                res.json({message: 'Something went wrong: ', error: err})
            });
    },

    updatePost: (req, res) => {
        Post.findOneAndUpdate( {_id: req.params.id}, req.body, {runValidators: true, new: true})
            .then(updatedPost => {
                res.json(updatedPost)
            })
            .catch(err => {res.status(400).json(err)
                console.log(err)
            })
    },

    deletePost: (req, res) => {
        Post.deleteOne( {_id: req.params.id} )
            .then(deleteConfirmation => {
                res.json(deleteConfirmation)
            })
            .catch(err => {
                res.json({message: 'Something went wrong: ', error: err})
            });
    },

};
