import { NextResponse } from "next/server"
import { getAllProducts, createProduct, getVisibleProducts } from "@/lib/products"
import { getSession } from "@/lib/auth"

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const all = searchParams.get("all") === "true"

    if (all) {
      const session = await getSession()
      if (!session || session.role !== "admin") {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
      }
      const products = await getAllProducts()
      return NextResponse.json(products, { status: 200 })
    } else {
      const products = await getVisibleProducts()
      return NextResponse.json(products, { status: 200 })
    }
  } catch (error: any) {
    console.error("API GET products error:", error)
    return NextResponse.json({ error: error.message || "Failed to fetch products" }, { status: 500 })
  }
}

export async function POST(request: Request) {
  const session = await getSession()
  if (!session || session.role !== "admin") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  try {
    const productData = await request.json()
    const newProduct = await createProduct(productData)
    return NextResponse.json(newProduct, { status: 201 })
  } catch (error: any) {
    console.error("API POST product error:", error)
    return NextResponse.json({ error: error.message || "Failed to create product" }, { status: 500 })
  }
}
