import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Monitor, ArrowLeft } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { ThemeToggle } from "@/components/theme-toggle"
import { getVisibleProducts } from "@/lib/products"

export default async function ProductsPage() {
  const products = await getVisibleProducts()

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-colors duration-300">
      {/* Navigation */}
      <nav className="bg-white/70 backdrop-blur-xl border-b border-gray-200/50 shadow-sm dark:bg-gray-900/70 dark:border-gray-700/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="flex items-center space-x-3">
              <ArrowLeft className="h-5 w-5 text-gray-600 dark:text-gray-400" />
              <div className="p-2 bg-blue-500 rounded-xl shadow-lg">
                <Monitor className="h-6 w-6 text-white" />
              </div>
              <span className="text-xl font-semibold text-gray-900 dark:text-white">TechForge PC</span>
            </Link>
            <div className="flex items-center space-x-4">
              <ThemeToggle />
              <Link href="/admin">
                <Button className="bg-blue-500 hover:bg-blue-600 text-white rounded-xl px-6 shadow-lg hover:shadow-xl transition-all duration-200">
                  Login
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Header */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-4 dark:text-white">Our PC Builds</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto dark:text-gray-300">
            Explore our curated selection of custom PC builds, each designed for specific use cases and performance
            requirements.
          </p>
        </div>
      </section>

      {/* Products Grid */}
      <section className="pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {products.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-xl text-gray-600 dark:text-gray-300">No products available at the moment.</p>
              <p className="text-gray-500 dark:text-gray-400 mt-2">Please check back later!</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {products.map((product) => (
                <Card
                  key={product.id}
                  className="bg-white/70 backdrop-blur-xl border-gray-200/50 hover:shadow-xl transition-all duration-300 overflow-hidden rounded-2xl dark:bg-gray-800/70 dark:border-gray-700/50"
                >
                  <div className="relative">
                    <Image
                      src={
                        product.image ||
                        "/placeholder.svg?height=300&width=400&text=" + encodeURIComponent(product.name)
                      }
                      alt={product.name}
                      width={400}
                      height={300}
                      className="w-full h-48 object-cover"
                    />
                    <Badge className="absolute top-4 left-4 bg-blue-500/90 text-white rounded-full px-3 py-1 font-medium">
                      {product.category}
                    </Badge>
                  </div>
                  <CardHeader>
                    <CardTitle className="text-gray-900 text-xl dark:text-white">{product.name}</CardTitle>
                    <CardDescription className="text-gray-600 dark:text-gray-300">
                      {product.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <h4 className="text-sm font-semibold text-gray-500 mb-3 dark:text-gray-400">Key Specs:</h4>
                        <ul className="text-sm text-gray-600 space-y-2 dark:text-gray-300">
                          {product.specs.map((spec, index) => (
                            <li key={index} className="flex items-center">
                              <span className="w-2 h-2 bg-blue-500 rounded-full mr-3 dark:bg-blue-400"></span>
                              {spec}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-700">
                        <span className="text-2xl font-bold text-gray-900 dark:text-white">
                          ${product.price.toLocaleString()}
                        </span>
                        <Button className="bg-blue-500 hover:bg-blue-600 text-white rounded-xl px-6 shadow-lg hover:shadow-xl transition-all duration-200">
                          Get Quote
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
