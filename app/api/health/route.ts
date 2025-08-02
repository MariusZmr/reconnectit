import { NextResponse } from "next/server"
import { db } from "@/lib/db"

export async function GET() {
  try {
    // Attempt to fetch a simple count from the users table to check database connectivity
    await db.selectFrom("users").select(db.fn.count("id").as("count")).execute()
    return NextResponse.json({ status: "ok", database: "connected" }, { status: 200 })
  } catch (error: any) {
    console.error("Health check failed:", error)
    return NextResponse.json({ status: "error", database: "disconnected", message: error.message }, { status: 500 })
  }
}
