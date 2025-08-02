import { NextResponse } from "next/server"
import { login } from "@/lib/auth"

export async function POST(request: Request) {
  try {
    const formData = await request.formData()
    const result = await login(formData)

    if (result.success) {
      return NextResponse.json({ message: result.message }, { status: 200 })
    } else {
      return NextResponse.json({ error: result.error }, { status: 401 })
    }
  } catch (error: any) {
    console.error("API Login Error:", error)
    return NextResponse.json({ error: error.message || "Internal server error" }, { status: 500 })
  }
}
