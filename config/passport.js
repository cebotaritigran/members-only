var passport = require('passport');
var LocalStrategy = require('passport-local');
const db = require('../db/queries');

// verifyCallback is a function that will be called when a user attempts to log in. It checks the provided username and password against the database and calls done() with the appropriate user object or an error message.
const verifyCallback = async (username, password, done) => {
    try {
        const user = await db.findUserByUsername(username);
        // const user = rows[0];

        if (!user) {
            return done(null, false, { message: "Incorrect username" });
        }
        if (user.password !== password) {
            return done(null, false, { message: "Incorrect password" });
        }
        return done(null, user);
    } catch (err) {
        return done(err);
    }
};

// Configure the local strategy for use by Passport.
// The local strategy requires a `verify` function which receives the credentials
// (`username` and `password`) submitted by the user.  The function must verify
// that the password is correct and then invoke `cb` with a user object, which
// will be set at `req.user` in route handlers after authentication.
const strategy = new LocalStrategy(verifyCallback);

passport.use(strategy);

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    try {
        const user = await db.findUserById(id);
        done(null, user);
    } catch (err) {
        done(err);
    }
});
