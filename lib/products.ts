import { db } from "./db"
import type { Product } from "./types"

export async function getAllProducts(): Promise<Product[]> {
  try {
    const products = await db.selectFrom("products").selectAll().execute()
    return products.map((p) => ({
      ...p,
      specs: JSON.parse(p.specs as string), // Parse JSON string back to array
      price: Number(p.price), // Ensure price is a number
    }))
  } catch (error) {
    console.error("Error fetching all products:", error)
    throw new Error("Failed to fetch all products.")
  }
}

export async function getVisibleProducts(): Promise<Product[]> {
  try {
    const products = await db.selectFrom("products").where("visible", "=", true).selectAll().execute()
    return products.map((p) => ({
      ...p,
      specs: JSON.parse(p.specs as string), // Parse JSON string back to array
      price: Number(p.price), // Ensure price is a number
    }))
  } catch (error) {
    console.error("Error fetching visible products:", error)
    throw new Error("Failed to fetch visible products.")
  }
}

export async function getProductById(id: number): Promise<Product | undefined> {
  try {
    const product = await db.selectFrom("products").where("id", "=", id).selectAll().executeTakeFirst()
    if (product) {
      return {
        ...product,
        specs: JSON.parse(product.specs as string), // Parse JSON string back to array
        price: Number(product.price), // Ensure price is a number
      }
    }
    return undefined
  } catch (error) {
    console.error(`Error fetching product with ID ${id}:`, error)
    throw new Error(`Failed to fetch product with ID ${id}.`)
  }
}

export async function createProduct(productData: Omit<Product, "id" | "created_at" | "updated_at">): Promise<Product> {
  try {
    const result = await db
      .insertInto("products")
      .values({
        ...productData,
        specs: JSON.stringify(productData.specs), // Stringify specs array to JSON
        price: productData.price.toFixed(2), // Store price as decimal with 2 places
      })
      .executeTakeFirstOrThrow()

    if (!result.insertId) {
      throw new Error("Failed to get insert ID for new product.")
    }

    const newProduct = await getProductById(Number(result.insertId))
    if (!newProduct) {
      throw new Error("Failed to retrieve newly created product.")
    }
    return newProduct
  } catch (error) {
    console.error("Error creating product:", error)
    throw new Error("Failed to create product.")
  }
}

export async function updateProduct(
  id: number,
  productData: Partial<Omit<Product, "id" | "created_at" | "updated_at">>,
): Promise<Product> {
  try {
    const updatedData: any = { ...productData }
    if (updatedData.specs) {
      updatedData.specs = JSON.stringify(updatedData.specs) // Stringify specs array to JSON
    }
    if (updatedData.price) {
      updatedData.price = Number(updatedData.price).toFixed(2) // Ensure price is formatted
    }

    await db.updateTable("products").set(updatedData).where("id", "=", id).execute()

    const updatedProduct = await getProductById(id)
    if (!updatedProduct) {
      throw new Error("Failed to retrieve updated product.")
    }
    return updatedProduct
  } catch (error) {
    console.error(`Error updating product with ID ${id}:`, error)
    throw new Error(`Failed to update product with ID ${id}.`)
  }
}

export async function deleteProduct(id: number): Promise<void> {
  try {
    await db.deleteFrom("products").where("id", "=", id).execute()
  } catch (error) {
    console.error(`Error deleting product with ID ${id}:`, error)
    throw new Error(`Failed to delete product with ID ${id}.`)
  }
}

export async function toggleProductVisibility(id: number): Promise<Product> {
  try {
    const product = await getProductById(id)
    if (!product) {
      throw new Error("Product not found.")
    }

    const newVisibility = !product.visible

    await db.updateTable("products").set({ visible: newVisibility }).where("id", "=", id).execute()

    const updatedProduct = await getProductById(id)
    if (!updatedProduct) {
      throw new Error("Failed to retrieve product after toggling visibility.")
    }
    return updatedProduct
  } catch (error) {
    console.error(`Error toggling visibility for product with ID ${id}:`, error)
    throw new Error(`Failed to toggle product visibility for ID ${id}.`)
  }
}
