const { Router } = require('express');
const passport = require('passport');
require('../config/passport'); // Ensure passport configuration is loaded

const userRouter = Router();
const userController = require('../controllers/userController');

userRouter.get('/sign-up', userController.showSignUpForm);
userRouter.post('/sign-up', userController.signUpUser);

// userRouter.get('/login', userController.showLoginForm);
userRouter.post('/login', passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/",
    failureMessage: true,
}));

// userRouter.get('/logout', userController.logoutUser);

module.exports = userRouter;