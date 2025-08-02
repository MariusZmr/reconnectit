import { type NextRequest, NextResponse } from "next/server"
import { db } from "@/lib/db" // Import the Kysely instance

export async function POST(request: NextRequest) {
  try {
    const { name, email, phone, message } = await request.json()

    if (!name || !email || !message) {
      return NextResponse.json({ error: "Name, email, and message are required" }, { status: 400 })
    }

    await db
      .insertInto("contact_submissions")
      .values({
        name: name,
        email: email,
        phone: phone || null,
        message: message,
        status: "new",
        created_at: new Date(),
      })
      .execute()

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error saving contact submission:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
