import { NextResponse } from "next/server"
import { db } from "@/lib/db" // Import the Kysely instance

export async function GET() {
  try {
    // Perform a simple query to check database connectivity
    await db.selectFrom("users").select(db.fn.count("id").as("count")).execute()

    return NextResponse.json({
      status: "healthy",
      database: "connected",
      timestamp: new Date().toISOString(),
    })
  } catch (error) {
    console.error("Health check failed:", error)
    return NextResponse.json(
      {
        status: "unhealthy",
        database: "disconnected",
        error: error.message,
        timestamp: new Date().toISOString(),
      },
      { status: 503 },
    )
  }
}
