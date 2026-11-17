const { Router } = require('express');

const userRouter = Router();
const userController = require('../controllers/userController');

userRouter.get('/sign-up', userController.showSignUpForm);
userRouter.post('/sign-up', userController.signUpUser);

// userRouter.get('/login', userController.showLoginForm);
// userRouter.post('/login', userController.loginUser);

// userRouter.get('/logout', userController.logoutUser);

module.exports = userRouter;