const pictureController = require('../controllers/picture.controller');

module.exports = (app) => {
    app.get('/api/pictures/all/:id', pictureController.getAllPicturesByPostId);
    app.post('/api/pictures/new', pictureController.createPicture);
    app.get('/api/pictures/:id', pictureController.getOnePicture);
    app.put('/api/pictures/:id/edit', pictureController.updatePicture);
    app.delete('/api/pictures/:id', pictureController.deletePicture);
};