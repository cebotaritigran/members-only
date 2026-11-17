const bcrypt = require('bcryptjs');
const db = require('../db/queries');


async function showSignUpForm(req, res) {
  res.render('signup', { title: 'Sign Up' });
}

async function signUpUser(req, res) {
  const { username, password } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    await db.saveUser(username, hashedPassword);
    res.redirect('/');
  } catch (error) {
    console.error('Error registering user:', error);
    res.status(500).send('Internal Server Error');
  }
}

async function showLoginForm(req, res) {
  res.render('login', { title: 'Login' });
}

async function loginUser(req, res) {
  const { username, password } = req.body;

  try {
    const user = await db.findUserByUsername(username);
    if (!user) {
      return res.status(401).send('Invalid username or password');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      console.log('Invalid password for user:', username);
      return res.status(401).send('Invalid username or password');
    }

    req.session.userId = user.id;
    console.log('User signed in:', user.username);
    res.redirect('/');
  } catch (error) {
    console.error('Error signing in user:', error);
    res.status(500).send('Internal Server Error');
  }
}

module.exports = {
  showSignUpForm,
  signUpUser,
  showLoginForm,
  loginUser
};  