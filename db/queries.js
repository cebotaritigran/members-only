const pool = require("./pool");

async function saveUser(username, password, memberStatus = false, adminStatus = false) {
  const query = "INSERT INTO users (username, password, member_status, admin_status) VALUES ($1, $2, $3, $4)";
  const values = [username, password, memberStatus, adminStatus];
  console.log("Saving user:", username, password, memberStatus, adminStatus);
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

async function getAllUsers() {
  const query = "SELECT * FROM users";

  try {
    const result = await pool.query(query);
    return result.rows;
  } catch (error) {
    console.error("Error fetching all users:", error.message);
    throw error;
  }
}

async function deleteUserById(id) {
  const query = "DELETE FROM users WHERE id = $1";
  const values = [id];

  const deleteSessionQuery = `
    DELETE FROM "session"
    WHERE sess::jsonb -> 'passport' ->> 'user' = $1
  `;

  try {
    await pool.query(deleteSessionQuery, [id]);
    await pool.query(query, values);
  } catch (error) {
    console.error("Error deleting user by ID:", error.message);
    throw error;
  }
}

module.exports = {
  saveUser,
  findUserByUsername,
  findUserById,
  deleteUserById,
  getAllUsers,
};
