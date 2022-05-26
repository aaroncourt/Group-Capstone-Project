const commentController = require('../controllers/comment.controller');
const { authenticate } = require('../config/jwt.config');


module.exports = (app) => {
    app.get('/api/comments/all/:id', authenticate, commentController.getAllCommentsByPostId);
    app.post('/api/comments/:id/new',authenticate, commentController.createComment);
    app.get('/api/comments/:id', commentController.getOneComment);
    app.put('/api/comments/:id/edit',authenticate, commentController.updateComment);
    app.delete('/api/comments/:id',authenticate, commentController.deleteComment);
};
