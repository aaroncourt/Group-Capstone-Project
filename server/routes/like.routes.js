const likeController = require('../controllers/like.controller');
const { authenticate } = require('../config/jwt.config');


module.exports = (app) => {

    app.get('/api/likes/all/:id',authenticate, likeController.getAllLikesByPostId);
    app.post('/api/likes/:id/new',authenticate, likeController.createLike);
    app.get('/api/likes/:id',authenticate, likeController.getOneLike);
    app.put('/api/likes/:id/edit', authenticate,likeController.updateLike);
    app.delete('/api/likes/:id',authenticate,likeController.deleteLike);
};
