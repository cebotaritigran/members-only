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

userRouter.get('/logout', (req, res, next) => {
    req.logout((err) => {
        if (err) {
            return next(err);
        }
        res.redirect('/');
    });
});

userRouter.get("/member", (req, res) => {
    res.render("member", { user: req.user });
});

userRouter.get("/users", userController.getAllUsers); // Assuming you have a method to get all users

userRouter.post("/:id/delete", userController.deleteUserById);

// userRouter.get('/logout', userController.logoutUser);

module.exports = userRouter;