const commentController = require('../controllers/comment.controller');

module.exports = (app) => {
    app.get('/api/comments/all/:id', commentController.getAllCommentsByPostId);
    app.post('/api/comments/new', commentController.createComment);
    app.get('/api/comments/:id', commentController.getOneComment);
    app.put('/api/comments/:id/edit', commentController.updateComment);
    app.delete('/api/comments/:id', commentController.deleteComment);
};