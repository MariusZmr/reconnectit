import { NextResponse } from "next/server"
import { db } from "@/lib/db"
import type { ContactSubmission } from "@/lib/types"

export async function POST(request: Request) {
  try {
    const { name, email, phone, message } = (await request.json()) as Omit<
      ContactSubmission,
      "id" | "created_at" | "status"
    >

    if (!name || !email || !message) {
      return NextResponse.json({ error: "Name, email, and message are required." }, { status: 400 })
    }

    const result = await db
      .insertInto("contact_submissions")
      .values({ name, email, phone, message })
      .executeTakeFirstOrThrow()

    if (!result.insertId) {
      throw new Error("Failed to get insert ID for new contact submission.")
    }

    return NextResponse.json({ message: "Contact submission received!", id: result.insertId }, { status: 201 })
  } catch (error: any) {
    console.error("Error submitting contact form:", error)
    return NextResponse.json({ error: error.message || "Failed to submit contact form." }, { status: 500 })
  }
}
