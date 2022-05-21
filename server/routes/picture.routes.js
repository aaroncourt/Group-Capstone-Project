const pictureController = require('../controllers/picture.controllers');

module.exports = (app) => {
    app.get('/api/pictures/all', pictureController.getAllUsers);
    app.post('/api/pictures/new', pictureController.createUser);
    app.get('/api/pictures/:id', pictureController.getOneUser);
    app.put('/api/pictures/:id/edit', pictureController.updateUser);
    app.delete('/api/pictures/:id', pictureController.deleteUser);
};