import { NextResponse } from "next/server"
import { logout } from "@/lib/auth"

export async function POST() {
  try {
    await logout()
    return NextResponse.json({ message: "Logged out successfully" }, { status: 200 })
  } catch (error: any) {
    console.error("API Logout Error:", error)
    return NextResponse.json({ error: error.message || "Internal server error" }, { status: 500 })
  }
}
