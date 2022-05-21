const postController = require('../controllers/post.controllers');

module.exports = (app) => {
    app.get('/api/posts/all', postController.getAllUsers);
    app.post('/api/posts/new', postController.createUser);
    app.get('/api/posts/:id', postController.getOneUser);
    app.put('/api/posts/:id/edit', postController.updateUser);
    app.delete('/api/posts/:id', postController.deleteUser);
};