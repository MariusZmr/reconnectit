import { NextResponse } from "next/server"
import { getProductById, updateProduct, deleteProduct, toggleProductVisibility } from "@/lib/products"
import { getSession } from "@/lib/auth"

export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    const id = Number(params.id)
    if (isNaN(id)) {
      return NextResponse.json({ error: "Invalid product ID" }, { status: 400 })
    }

    const product = await getProductById(id)
    if (!product) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 })
    }

    return NextResponse.json(product, { status: 200 })
  } catch (error: any) {
    console.error(`API GET product by ID error:`, error)
    return NextResponse.json({ error: error.message || "Failed to fetch product" }, { status: 500 })
  }
}

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  const session = await getSession()
  if (!session || session.role !== "admin") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  try {
    const id = Number(params.id)
    if (isNaN(id)) {
      return NextResponse.json({ error: "Invalid product ID" }, { status: 400 })
    }

    const productData = await request.json()
    const updatedProduct = await updateProduct(id, productData)

    return NextResponse.json(updatedProduct, { status: 200 })
  } catch (error: any) {
    console.error(`API PUT product error:`, error)
    return NextResponse.json({ error: error.message || "Failed to update product" }, { status: 500 })
  }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  const session = await getSession()
  if (!session || session.role !== "admin") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  try {
    const id = Number(params.id)
    if (isNaN(id)) {
      return NextResponse.json({ error: "Invalid product ID" }, { status: 400 })
    }

    await deleteProduct(id)
    return NextResponse.json({ message: "Product deleted successfully" }, { status: 200 })
  } catch (error: any) {
    console.error(`API DELETE product error:`, error)
    return NextResponse.json({ error: error.message || "Failed to delete product" }, { status: 500 })
  }
}

export async function PATCH(request: Request, { params }: { params: { id: string } }) {
  const session = await getSession()
  if (!session || session.role !== "admin") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  try {
    const id = Number(params.id)
    if (isNaN(id)) {
      return NextResponse.json({ error: "Invalid product ID" }, { status: 400 })
    }

    const { action } = await request.json()

    if (action === "toggle-visibility") {
      const updatedProduct = await toggleProductVisibility(id)
      return NextResponse.json(updatedProduct, { status: 200 })
    } else {
      return NextResponse.json({ error: "Invalid action" }, { status: 400 })
    }
  } catch (error: any) {
    console.error(`API PATCH product error:`, error)
    return NextResponse.json({ error: error.message || "Failed to perform action" }, { status: 500 })
  }
}
