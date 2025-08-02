const bcrypt = require("bcryptjs")
const mysql = require("mysql2/promise")
require("dotenv").config() // Load environment variables

async function createAdminUser() {
  const connection = await mysql.createConnection({
    host: process.env.DB_HOST || "localhost",
    user: process.env.DB_USER || "root",
    password: process.env.DB_PASSWORD || "",
    database: process.env.DB_NAME || "reconnectit", // Changed database name
  })

  try {
    const username = "admin"
    const email = "admin@reconnectit.com" // Changed email domain
    const password = "admin123" // Default password

    // Check if admin user already exists
    const [existingUsers] = await connection.execute("SELECT id FROM users WHERE username = ? OR email = ?", [
      username,
      email,
    ])

    if (existingUsers.length > 0) {
      console.log("Admin user already exists. Skipping creation.")
      return
    }

    const passwordHash = await bcrypt.hash(password, 12) // Hash the password

    await connection.execute("INSERT INTO users (username, email, password_hash, role) VALUES (?, ?, ?, ?)", [
      username,
      email,
      passwordHash,
      "admin",
    ])

    console.log(`Admin user '${username}' created successfully with password '${password}'`)
  } catch (error) {
    console.error("Error creating admin user:", error)
  } finally {
    await connection.end()
  }
}

createAdminUser()
