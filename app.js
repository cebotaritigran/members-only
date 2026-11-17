require("dotenv").config();

const path = require("node:path");
const express = require("express");
const session = require("express-session");
const passport = require("passport");
const LocalStrategy = require('passport-local').Strategy;
const pool = require("./db/pool");
require("./config/passport"); // Ensure passport configuration is loaded



//ROUTES
const indexRouter = require("./routes/index");
const userRouter = require("./routes/userRouter");

const app = express();



app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));


// urlencoded and json middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

// Session configuration
const sessionStore = new (require("connect-pg-simple")(session))({
  pool: pool,
  createTableIfMissing: true,
});

app.use(
  session({
    store: sessionStore,
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24, // 1 day
    },
  }),
);

// Passport configuration
app.use(passport.initialize());
app.use(passport.session());

// Routes 
app.use("/", indexRouter);
app.get("/check", (req, res) => {
  res.render("authPage", { user: req.user });
});
app.get("/log-out", (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    res.redirect("/");
  });
});
app.use("/user", userRouter);

app.use((req, res) => {
  res.status(404).send("Page not found");
});

if (require.main === module) {
  const port = process.env.PORT || 3000;
  app.listen(port, () => {
    console.log(`Members Only listening on port ${port}`);
  });
}

module.exports = app;