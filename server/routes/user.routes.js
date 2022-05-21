const userController = require('../controllers/user.controllers');

module.exports = (app) => {
    app.get('/api/users/all', userController.getAllUsers);
    app.post('/api/users/new', userController.createUser);
    app.get('/api/users/:id', userController.getOneUser);
    app.put('/api/users/:id/edit', userController.updateUser);
    app.delete('/api/users/:id', userController.deleteUser);
};