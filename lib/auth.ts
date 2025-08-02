import { SignJWT, jwtVerify } from "jose"
import { cookies } from "next/headers"
import { type NextRequest, NextResponse } from "next/server"
import bcrypt from "bcryptjs"
import { db } from "./db"
import type { User } from "./types"

const secretKey = process.env.JWT_SECRET
const encodedKey = new TextEncoder().encode(secretKey)

export async function encrypt(payload: any) {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("1 day from now")
    .sign(encodedKey)
}

export async function decrypt(session: string | undefined = "") {
  try {
    const { payload } = await jwtVerify(session, encodedKey, {
      algorithms: ["HS256"],
    })
    return payload
  } catch (error) {
    console.error("Failed to decrypt session:", error)
    return null
  }
}

export async function login(formData: FormData) {
  const username = formData.get("username") as string
  const password = formData.get("password") as string

  if (!username || !password) {
    throw new Error("Username and password are required.")
  }

  try {
    const user = await db
      .selectFrom("users")
      .where((eb) => eb.or([eb("username", "=", username), eb("email", "=", username)]))
      .selectAll()
      .executeTakeFirst()

    if (!user) {
      throw new Error("Invalid credentials.")
    }

    const passwordMatch = await bcrypt.compare(password, user.password_hash)

    if (!passwordMatch) {
      throw new Error("Invalid credentials.")
    }

    const expires = new Date(Date.now() + 24 * 60 * 60 * 1000) // 1 day
    const session = await encrypt({ user: user.username, role: user.role, expires })

    cookies().set("session", session, { expires, httpOnly: true, secure: process.env.NODE_ENV === "production" })

    return { success: true, message: "Logged in successfully!" }
  } catch (error: any) {
    console.error("Login error:", error)
    return { success: false, error: error.message || "Login failed." }
  }
}

export async function logout() {
  cookies().set("session", "", { expires: new Date(0) })
}

export async function getSession() {
  const session = cookies().get("session")?.value
  if (!session) return null
  return await decrypt(session)
}

export async function auth(request: NextRequest) {
  const session = await getSession()
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  // Optionally, check user role or other permissions here
  // For example, if only admins can access /admin routes
  if (request.nextUrl.pathname.startsWith("/admin")) {
    if (session.role !== "admin") {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 })
    }
  }

  return NextResponse.next()
}

export async function createUser(userData: Omit<User, "id" | "created_at" | "updated_at">): Promise<User> {
  try {
    const passwordHash = await bcrypt.hash(userData.password_hash, 12) // Hash the password
    const result = await db
      .insertInto("users")
      .values({ ...userData, password_hash: passwordHash })
      .executeTakeFirstOrThrow()

    if (!result.insertId) {
      throw new Error("Failed to get insert ID for new user.")
    }

    const newUser = await db
      .selectFrom("users")
      .where("id", "=", Number(result.insertId))
      .selectAll()
      .executeTakeFirst()
    if (!newUser) {
      throw new Error("Failed to retrieve newly created user.")
    }
    return newUser
  } catch (error) {
    console.error("Error creating user:", error)
    throw new Error("Failed to create user.")
  }
}
