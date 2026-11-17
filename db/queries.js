const pool = require("./pool");

async function saveUser(username, password) {
  const query = "INSERT INTO users (username, password) VALUES ($1, $2)";
  const values = [username, password];
  console.log("Saving user:", username, password);
  try {
    await pool.query(query, values);
  } catch (error) {
    console.error("Error saving user:", error.message);
    throw error;
  }
}

async function findUserByUsername(username) {
  const query = "SELECT * FROM users WHERE username = $1";
  const values = [username];

  try {
    const result = await pool.query(query, values);
    return result.rows[0];
  } catch (error) {
    console.error("Error finding user by username:", error.message);
    throw error;
  }
}

async function findUserById(id) {
  const query = "SELECT * FROM users WHERE id = $1";
  const values = [id];

  try {
    const result = await pool.query(query, values);
    return result.rows[0];
  } catch (error) {
    console.error("Error finding user by ID:", error.message);
    throw error;
  }
}

module.exports = {
  saveUser,
  findUserByUsername,
  findUserById
};