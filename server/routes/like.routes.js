const likeController = require('../controllers/like.controllers');

module.exports = (app) => {
    app.get('/api/likes/all', likeController.getAllUsers);
    app.post('/api/likes/new', likeController.createUser);
    app.get('/api/likes/:id', likeController.getOneUser);
    app.put('/api/likes/:id/edit', likeController.updateUser);
    app.delete('/api/likes/:id', likeController.deleteUser);
};