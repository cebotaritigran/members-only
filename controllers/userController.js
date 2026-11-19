const bcrypt = require('bcryptjs');
const db = require('../db/queries');


async function showSignUpForm(req, res) {
  res.render('signup', { title: 'Sign Up' });
}

async function signUpUser(req, res) {

  const { username, password, memberStatusKey, adminStatusKey } = req.body;
  let adminStatus = false; // Check if the provided admin key matches the secret
  let memberStatus = false; // Check if the provided member key matches the secret

  if (adminStatusKey === process.env.adminSecret) {
    console.log(adminStatusKey, process.env.adminSecret);
    adminStatus = true;
  }
  if (memberStatusKey === process.env.memberOnlySecret) {
    console.log(memberStatusKey, process.env.memberOnlySecret);
    memberStatus = true;
  }
  console.log("Received sign-up data:", username, password, memberStatusKey, adminStatusKey, memberStatus, adminStatus);

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    await db.saveUser(username, hashedPassword, memberStatus, adminStatus);
    res.redirect('/');
  } catch (error) {
    console.error('Error registering user:', error);
    res.status(500).send('Internal Server Error');
  }
}

async function getAllUsers(req, res) {

  try {
    const users = await db.getAllUsers(); // Assuming you have a method to get all users
    res.render('users', { users: users, user: req.user }); // Render a view called 'users' and pass the users data
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).send('Internal Server Error');
    res.render('users', { users: [], user: req.user }); // Render the view with an empty users array in case of error
  }
}

async function deleteUserById(req, res) {
  const userId = req.params.id;

  try {
    await db.deleteUserById(userId);
    res.redirect('/user/users');
    if (req.user && req.user.id === parseInt(userId, 10)) {
      req.logout((err) => {
        if (err) {
          console.error('Error logging out user after deletion:', err);
        }
        res.redirect('/');
      });
    }
  } catch (error) {
    console.error('Error deleting user:', error);
    res.status(500).send('Internal Server Error');
  }
}

// async function showLoginForm(req, res) {
//   res.render('login', { title: 'Login' });
// }

// async function loginUser(req, res) {
//   const { username, password } = req.body;

//   try {
//     const user = await db.findUserByUsername(username);
//     if (!user) {
//       return res.status(401).send('Invalid username or password');
//     }

//     const isPasswordValid = await bcrypt.compare(password, user.password);
//     if (!isPasswordValid) {
//       console.log('Invalid password for user:', username);
//       return res.status(401).send('Invalid username or password');
//     }

//     req.session.userId = user.id;
//     console.log('User signed in:', user.username);
//     res.redirect('/');
//   } catch (error) {
//     console.error('Error signing in user:', error);
//     res.status(500).send('Internal Server Error');
//   }
// }

module.exports = {
  showSignUpForm,
  signUpUser,
  deleteUserById,
  getAllUsers,
};  