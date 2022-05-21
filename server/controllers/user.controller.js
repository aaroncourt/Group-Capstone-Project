const User = require('../models/user.models');

module.exports = {

    createUser: (req, res) => {
        User.create(req.body)
            .then(newUser => {res.json(newUser)})
            .catch(err => {res.status(400).json(err)})
    },    

    getAllUsers: (req, res) => {
        console.log(req.body)
        User.find({})
            .then(allUsers => {
                res.json(allUsers)
            })
            .catch(err => {
                res.json({message: 'Something went wrong: ', error: err})
            });
    },

    getOneUser: (req, res) => {
        User.findOne({_id: req.params.id})
            .then(oneUser => {
                res.json(oneUser)
            })
            .catch(err => {
                res.json({message: 'Something went wrong: ', error: err})
            });
    },

    updateUser: (req, res) => {
        User.findOneAndUpdate( {_id: req.params.id}, req.body, {runValidators: true, new: true})
            .then(updatedUser => {
                res.json(updatedUser)
            })
            .catch(err => {res.status(400).json(err)
                console.log(err)
            })
    },

    deleteUser: (req, res) => {
        User.deleteOne( {_id: req.params.id} )
            .then(deleteConfirmation => {
                res.json(deleteConfirmation)
            })
            .catch(err => {
                res.json({message: 'Something went wrong: ', error: err})
            });
    },

};
