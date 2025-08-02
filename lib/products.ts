import { db } from "./db"
import type { Product, ProductFormData } from "./types"

export async function getAllProducts(): Promise<Product[]> {
  try {
    const products = await db.selectFrom("products").selectAll().orderBy("created_at", "desc").execute()

    return products.map((product) => ({
      ...product,
      specs: JSON.parse(product.specs || "[]"),
    }))
  } catch (error) {
    console.error("Error fetching products:", error)
    return []
  }
}

export async function getVisibleProducts(): Promise<Product[]> {
  try {
    const products = await db
      .selectFrom("products")
      .selectAll()
      .where("visible", "=", true)
      .orderBy("created_at", "desc")
      .execute()

    return products.map((product) => ({
      ...product,
      specs: JSON.parse(product.specs || "[]"),
    }))
  } catch (error) {
    console.error("Error fetching visible products:", error)
    return []
  }
}

export async function getProductById(id: number): Promise<Product | null> {
  try {
    const product = await db.selectFrom("products").selectAll().where("id", "=", id).executeTakeFirst()

    if (!product) return null

    return {
      ...product,
      specs: JSON.parse(product.specs || "[]"),
    }
  } catch (error) {
    console.error("Error fetching product:", error)
    return null
  }
}

export async function createProduct(data: ProductFormData): Promise<Product | null> {
  try {
    const specsArray = data.specs
      .split(",")
      .map((s) => s.trim())
      .filter((s) => s.length > 0)

    const result = await db
      .insertInto("products")
      .values({
        name: data.name,
        category: data.category,
        price: Number.parseFloat(data.price),
        specs: JSON.stringify(specsArray),
        description: data.description,
        image: data.image || null,
        visible: data.visible,
        created_at: new Date(),
        updated_at: new Date(),
      })
      .executeTakeFirstOrThrow()

    if (result.insertId) {
      return getProductById(Number(result.insertId))
    }
    return null
  } catch (error) {
    console.error("Error creating product:", error)
    return null
  }
}

export async function updateProduct(id: number, data: ProductFormData): Promise<Product | null> {
  try {
    const specsArray =
      typeof data.specs === "string"
        ? data.specs
            .split(",")
            .map((s) => s.trim())
            .filter((s) => s.length > 0)
        : data.specs

    console.log("Updating product with data:", {
      id,
      name: data.name,
      category: data.category,
      price: data.price,
      specs: specsArray,
      description: data.description,
      image: data.image,
      visible: data.visible,
    })

    await db
      .updateTable("products")
      .set({
        name: data.name,
        category: data.category,
        price: Number.parseFloat(data.price.toString()),
        specs: JSON.stringify(specsArray),
        description: data.description,
        image: data.image || null,
        visible: data.visible,
        updated_at: new Date(),
      })
      .where("id", "=", id)
      .execute()

    console.log("Product updated successfully")
    return getProductById(id)
  } catch (error) {
    console.error("Error updating product:", error)
    throw error // Re-throw to handle in API route
  }
}

export async function deleteProduct(id: number): Promise<boolean> {
  try {
    const result = await db.deleteFrom("products").where("id", "=", id).executeTakeFirst()

    return result.numDeletedRows > 0
  } catch (error) {
    console.error("Error deleting product:", error)
    return false
  }
}

export async function toggleProductVisibility(id: number): Promise<boolean> {
  try {
    // Fetch current visibility
    const product = await db.selectFrom("products").select("visible").where("id", "=", id).executeTakeFirst()

    if (!product) return false

    await db
      .updateTable("products")
      .set({
        visible: !product.visible,
        updated_at: new Date(),
      })
      .where("id", "=", id)
      .execute()

    return true
  } catch (error) {
    console.error("Error toggling product visibility:", error)
    return false
  }
}
