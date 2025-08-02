import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import { cookies } from "next/headers"
import { db } from "./db" // Import the Kysely instance
import type { User } from "./types"

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key-change-in-production"

export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 12)
}

export async function verifyPassword(password: string, hashedPassword: string): Promise<boolean> {
  return bcrypt.compare(password, hashedPassword)
}

export async function createToken(userId: number): Promise<string> {
  return jwt.sign({ userId }, JWT_SECRET, { expiresIn: "7d" })
}

export async function verifyToken(token: string): Promise<{ userId: number } | null> {
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as { userId: number }
    return decoded
  } catch {
    return null
  }
}

export async function getCurrentUser(): Promise<User | null> {
  try {
    const cookieStore = cookies()
    const token = cookieStore.get("auth-token")?.value

    if (!token) return null

    const decoded = await verifyToken(token)
    if (!decoded) return null

    const user = await db
      .selectFrom("users")
      .select(["id", "username", "email", "role", "created_at", "updated_at"])
      .where("id", "=", decoded.userId)
      .executeTakeFirst()

    return user || null
  } catch (error) {
    console.error("Error getting current user:", error)
    return null
  }
}

export async function authenticateUser(username: string, password: string): Promise<User | null> {
  try {
    console.log("Attempting to authenticate user:", username)

    const user = await db
      .selectFrom("users")
      .selectAll()
      .where((eb) => eb.or([eb("username", "=", username), eb("email", "=", username)]))
      .executeTakeFirst()

    if (!user) {
      console.log("User not found:", username)
      return null
    }

    console.log("User found, verifying password...")

    const isValid = await verifyPassword(password, user.password_hash)
    console.log("Password verification result:", isValid)

    if (!isValid) return null

    // Remove password hash from returned user
    const { password_hash, ...userWithoutPassword } = user
    return userWithoutPassword as User
  } catch (error) {
    console.error("Authentication error:", error)
    return null
  }
}
