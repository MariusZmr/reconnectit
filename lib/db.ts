import { Kysely, MysqlDialect } from "kysely"
import { createPool } from "mysql2"
import type { Product, User, ContactSubmission } from "./types"

// Define your database schema for Kysely
interface Database {
  users: User
  products: Product
  contact_submissions: ContactSubmission
}

const dialect = new MysqlDialect({
  pool: createPool({
    host: process.env.DB_HOST || "localhost",
    user: process.env.DB_USER || "root",
    password: process.env.DB_PASSWORD || "",
    database: process.env.DB_NAME || "reconnectit", // Changed database name
    waitForConnections: true,
    connectionLimit: 10,
    maxIdle: 10, // max idle connections, the default value is the same as `connectionLimit`
    idleTimeout: 60000, // idle connections timeout, in milliseconds, the default value 60000
    queueLimit: 0,
    acquireTimeout: 60000, // timeout for acquiring connection
    timeout: 60000, // timeout for queries
    enableKeepAlive: true,
    keepAliveInitialDelay: 0,
    reconnect: true,
    ssl: process.env.NODE_ENV === "production" ? { rejectUnauthorized: false } : false,
  }),
})

// Initialize Kysely
export const db = new Kysely<Database>({
  dialect,
})

// Test connection on startup
db.selectFrom("users")
  .select(db.fn.count("id").as("count"))
  .execute()
  .then(() => {
    console.log("Database connected successfully via Kysely")
  })
  .catch((err) => {
    console.error("Database connection failed via Kysely:", err)
  })

// Note: Kysely handles connection pooling and release internally,
// so you don't need explicit pool.getConnection() and connection.release() calls
// in your data access functions anymore.
