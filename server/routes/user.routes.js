const userController = require('../controllers/user.controller');
const upload = require('../config/multer.config')


module.exports = (app) => {
    app.get('/api/users/all',userController.getAllUsers);
    app.post('/api/users/new',upload.single('userProfilePic'), userController.createUser);
    app.get('/api/users/:id', userController.getOneUser);
    app.put('/api/users/:id/edit', userController.updateUser);
    app.delete('/api/users/:id', userController.deleteUser);
};