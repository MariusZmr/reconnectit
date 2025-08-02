const mysql = require("mysql2/promise")
const bcrypt = require("bcryptjs")

async function createAdminUser() {
  const connection = await mysql.createConnection({
    host: process.env.DB_HOST || "localhost",
    user: process.env.DB_USER || "root",
    password: process.env.DB_PASSWORD || "",
    database: process.env.DB_NAME || "techforge_pc",
  })

  try {
    // Hash the password
    const password = "admin123"
    const hashedPassword = await bcrypt.hash(password, 12)

    console.log("Creating admin user...")
    console.log("Password:", password)
    console.log("Hashed password:", hashedPassword)

    // Delete existing admin user if exists
    await connection.execute("DELETE FROM users WHERE username = ? OR email = ?", ["admin", "admin@techforgepc.com"])

    // Insert new admin user
    await connection.execute("INSERT INTO users (username, email, password_hash, role) VALUES (?, ?, ?, ?)", [
      "admin",
      "admin@techforgepc.com",
      hashedPassword,
      "admin",
    ])

    console.log("Admin user created successfully!")

    // Verify the user was created
    const [rows] = await connection.execute("SELECT username, email, role FROM users WHERE username = ?", ["admin"])
    console.log("Created user:", rows[0])
  } catch (error) {
    console.error("Error creating admin user:", error)
  } finally {
    await connection.end()
  }
}

createAdminUser()
