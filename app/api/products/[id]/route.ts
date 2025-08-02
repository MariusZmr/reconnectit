import { type NextRequest, NextResponse } from "next/server"
import { getCurrentUser } from "@/lib/auth"
import { getProductById, updateProduct, deleteProduct, toggleProductVisibility } from "@/lib/products"

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const id = Number.parseInt(params.id)
    if (isNaN(id)) {
      return NextResponse.json({ error: "Invalid product ID" }, { status: 400 })
    }

    const product = await getProductById(id)

    if (!product) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 })
    }

    return NextResponse.json(product)
  } catch (error) {
    console.error("Error fetching product:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const user = await getCurrentUser()
    if (!user || user.role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const id = Number.parseInt(params.id)
    if (isNaN(id)) {
      return NextResponse.json({ error: "Invalid product ID" }, { status: 400 })
    }

    const data = await request.json()

    // Validate required fields
    if (!data.name || !data.category || !data.price || !data.specs || !data.description) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    console.log("Updating product with ID:", id)
    console.log("Update data:", data)

    const product = await updateProduct(id, data)

    if (!product) {
      return NextResponse.json({ error: "Failed to update product" }, { status: 500 })
    }

    return NextResponse.json(product)
  } catch (error) {
    console.error("Error updating product:", error)

    // Check if it's a connection error
    if (error.code === "ECONNRESET" || error.code === "PROTOCOL_CONNECTION_LOST") {
      return NextResponse.json(
        {
          error: "Database connection error. Please try again.",
        },
        { status: 503 },
      )
    }

    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const user = await getCurrentUser()
    if (!user || user.role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const id = Number.parseInt(params.id)
    if (isNaN(id)) {
      return NextResponse.json({ error: "Invalid product ID" }, { status: 400 })
    }

    const success = await deleteProduct(id)

    if (!success) {
      return NextResponse.json({ error: "Failed to delete product" }, { status: 500 })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error deleting product:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function PATCH(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const user = await getCurrentUser()
    if (!user || user.role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const id = Number.parseInt(params.id)
    if (isNaN(id)) {
      return NextResponse.json({ error: "Invalid product ID" }, { status: 400 })
    }

    const { action } = await request.json()

    if (action === "toggle-visibility") {
      const success = await toggleProductVisibility(id)

      if (!success) {
        return NextResponse.json({ error: "Failed to toggle visibility" }, { status: 500 })
      }

      const product = await getProductById(id)
      return NextResponse.json(product)
    }

    return NextResponse.json({ error: "Invalid action" }, { status: 400 })
  } catch (error) {
    console.error("Error updating product:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
