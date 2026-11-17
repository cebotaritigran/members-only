const pool = require("./pool");

async function testConnection() {
  try {
    await pool.query("SELECT 1");
    console.log("Database connection successful.");
  } catch (error) {
    console.error("Database connection failed:", error.message);
    process.exitCode = 1;
  } finally {
    await pool.end();
  }
}

testConnection();