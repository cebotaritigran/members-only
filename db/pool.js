require("dotenv").config();

const { Pool } = require("pg");

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

module.exports = pool;

/*
DATABASE: members_only

TABLE: users
- id
- username
- password
- membership_status
- is_admin

TABLE: messages
- id
- title
- text
- timestamp
- user_id

TABLE: session (Express sessions)
- sid
- sess
- expire
*/