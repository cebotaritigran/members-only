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
    res.redirect('/index');
  } catch (error) {
    console.error('Error registering user:', error);
    res.status(500).send('Internal Server Error');
  }
}

module.exports = {
  showSignUpForm,
  signUpUser,
};  