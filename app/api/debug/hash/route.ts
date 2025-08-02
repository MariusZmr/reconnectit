import { type NextRequest, NextResponse } from "next/server"
import { hashPassword, verifyPassword } from "@/lib/auth"

export async function POST(request: NextRequest) {
  try {
    const { password, hash } = await request.json()

    if (password && !hash) {
      // Hash a password
      const hashedPassword = await hashPassword(password)
      return NextResponse.json({
        password,
        hash: hashedPassword,
        message: "Password hashed successfully",
      })
    }

    if (password && hash) {
      // Verify a password against a hash
      const isValid = await verifyPassword(password, hash)
      return NextResponse.json({
        password,
        hash,
        isValid,
        message: isValid ? "Password matches!" : "Password does not match",
      })
    }

    return NextResponse.json({ error: "Please provide password and optionally hash" }, { status: 400 })
  } catch (error) {
    console.error("Debug hash error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
