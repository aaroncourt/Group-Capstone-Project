const postController = require('../controllers/post.controller');
const upload = require('../config/multer.config')


module.exports = (app) => {
    app.get('/api/posts/all', postController.getAllPosts);
    app.get('/api/posts/all/:id', postController.getAllPostsByUserId);
    app.post('/api/posts/new',upload.single('postPicture'), postController.createPost);
    app.get('/api/posts/:id', postController.getOnePost);
    app.put('/api/posts/:id/edit', postController.updatePost);
    app.delete('/api/posts/:id', postController.deletePost);
};