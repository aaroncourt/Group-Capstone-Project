const userController = require('../controllers/user.controller');
const upload = require('../config/multer.config')
const { authenticate } = require('../config/jwt.config');


module.exports = (app) => {
    app.post('/api/users/login',userController.loginUser);
    app.post('/api/users/logout',userController.logout);
    app.get('/api/logedinuser',authenticate, userController.getLoggedInUser);
    app.get('/api/users/all',userController.getAllUsers);
    app.post('/api/users/new', userController.createUser);
    app.get('/api/users/:id', userController.getOneUser);
    app.put('/api/users/:id/edit', userController.updateUser);
    app.delete('/api/users/:id', userController.deleteUser);

};