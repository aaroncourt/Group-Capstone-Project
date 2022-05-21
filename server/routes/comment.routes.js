const commentController = require('../controllers/comment.controllers');

module.exports = (app) => {
    app.get('/api/comments/all', commentController.getAllUsers);
    app.post('/api/comments/new', commentController.createUser);
    app.get('/api/comments/:id', commentController.getOneUser);
    app.put('/api/comments/:id/edit', commentController.updateUser);
    app.delete('/api/comments/:id', commentController.deleteUser);
};