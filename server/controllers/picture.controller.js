const Picture = require('../models/Picture.model');

module.exports = {

    createPicture: (req, res) => {
        Picture.create(req.body)
            .then(newPicture => {res.json(newPicture)})
            .catch(err => {res.status(400).json(err)})
    },    

    getAllPicturesByPostId: (req, res) => {
        Picture.find({ pictureOnPost: req.params.id})
            .then(allPictures => {
                res.json(allPictures)
            })
            .catch(err => {
                res.json({message: 'Something went wrong: ', error: err})
            });
    },

    getOnePicture: (req, res) => {
        Picture.findOne({_id: req.params.id})
            .then(onePicture => {
                res.json(onePicture)
            })
            .catch(err => {
                res.json({message: 'Something went wrong: ', error: err})
            });
    },

    updatePicture: (req, res) => {
        Picture.findOneAndUpdate( {_id: req.params.id}, req.body, {runValidators: true, new: true})
            .then(updatedPicture => {
                res.json(updatedPicture)
            })
            .catch(err => {res.status(400).json(err)
                console.log(err)
            })
    },

    deletePicture: (req, res) => {
        Picture.deleteOne( {_id: req.params.id} )
            .then(deleteConfirmation => {
                res.json(deleteConfirmation)
            })
            .catch(err => {
                res.json({message: 'Something went wrong: ', error: err})
            });
    },

};
