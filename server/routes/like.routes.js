const likeController = require('../controllers/like.controller');

module.exports = (app) => {
    app.get('/api/likes/all/:id', likeController.getAllLikesByPostId);
    app.post('/api/likes/new', likeController.createLike);
    app.get('/api/likes/:id', likeController.getOneLike);
    app.put('/api/likes/:id/edit', likeController.updateLike);
    app.delete('/api/likes/:id', likeController.deleteLike);
};