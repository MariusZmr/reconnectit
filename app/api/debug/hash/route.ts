import { NextResponse } from "next/server"
import bcrypt from "bcryptjs"

export async function POST(request: Request) {
  try {
    const { password, hash } = await request.json()

    if (password && !hash) {
      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 12)
      console.log(`Password: ${password}, Hashed: ${hashedPassword}`)
      return NextResponse.json({ password, hashedPassword }, { status: 200 })
    } else if (password && hash) {
      // Compare password with hash
      const match = await bcrypt.compare(password, hash)
      console.log(`Verifying password: ${password}, Hashed: ${hash}, Match: ${match}`)
      return NextResponse.json({ password, hash, match }, { status: 200 })
    } else {
      return NextResponse.json(
        { error: "Please provide a password to hash or a password and hash to compare." },
        { status: 400 },
      )
    }
  } catch (error: any) {
    console.error("Error in debug hash API:", error)
    return NextResponse.json({ error: error.message || "Internal server error" }, { status: 500 })
  }
}
