"use client"

import { useState, use } from "react"
import Link from "next/link"
import { Footer } from "@/components/footer"

interface Product {
  id: number
  name: string
  price: number
  category: string
  image: string
  inStock: boolean
  supplier?: {
    name: string
    location: string
    rating: number
    reviews: number
    verified: boolean
    responseRate: number
    experience: string
  }
  specifications?: {
    power?: string
    type?: string
    brand?: string
  }
}

const allProducts: Product[] = [
  {
    id: 1,
    name: "V6 Submersible Pump (SHREE RAM V6 RED Submersible Pump 7.50 HP X 4 Stg (30ft.)",
    price: 37892,
    category: "Submersible Pumps",
    image: "/a-belt/5E.jpg",
    inStock: true,
    supplier: {
      name: "Shree Ram Pump & Pipe",
      location: "Rajkot",
      rating: 3.8,
      reviews: 230,
      verified: true,
      responseRate: 75,
      experience: "3 yrs"
    },
    specifications: {
      power: "7.5 HP",
      type: "Automatic",
      brand: "Made in India"
    }
  },
  {
    id: 2,
    name: "Power: 1 HP Submersible Pump Sets",
    price: 75000,
    category: "Submersible Pumps",
    image: "/a-belt/5F.jpg",
    inStock: true,
    supplier: {
      name: "Mascot Pump Limited",
      location: "Ahmedabad",
      rating: 4.0,
      reviews: 44,
      verified: true,
      responseRate: 42,
      experience: "19 yrs"
    },
    specifications: {
      power: "1 HP",
      type: "Automatic"
    }
  },
  {
    id: 3,
    name: "0.75 HP SUBMERSIBLE PUMPSETS",
    price: 7000,
    category: "Submersible Pumps",
    image: "/a-belt/5G-1-1024x603.jpg",
    inStock: true,
    supplier: {
      name: "OMC Submersible Pump",
      location: "Rajkot",
      rating: 4.2,
      reviews: 256,
      verified: true,
      responseRate: 84,
      experience: "9 yrs"
    },
    specifications: {
      power: "0.75 HP",
      type: "Manual"
    }
  },
  {
    id: 4,
    name: "V5 Submersible Pump Set",
    price: 0,
    category: "Submersible Pumps",
    image: "/a-belt/5G-2.jpg",
    inStock: true,
    supplier: {
      name: "Kalsi Metal Works Pvt. Ltd.",
      location: "Jalandhar",
      rating: 4.0,
      reviews: 81,
      verified: true,
      responseRate: 80,
      experience: "11 yrs"
    },
    specifications: {
      power: "5 HP",
      brand: "Kalsi"
    }
  }
]

export default function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const [quantity, setQuantity] = useState(1)
  const [addedToCart, setAddedToCart] = useState(false)
  const [hoveredRelatedProductId, setHoveredRelatedProductId] = useState<number | null>(null)

  const resolvedParams = use(params)
  const product = allProducts.find((p) => p.id === Number.parseInt(resolvedParams.id))

  if (!product) {
    return (
      <main className="min-h-screen bg-background">
        <div className="max-w-7xl mx-auto px-4 py-12 text-center">
          <h1 className="text-3xl font-bold text-foreground mb-4" id="product-not-found">Product Not Found</h1>
          <p className="text-muted-foreground mb-8" id="product-not-found-desc">Sorry, we couldn't find the product you're looking for.</p>
          <Link href="/" className="text-accent hover:underline font-semibold">
            <span id="return-to-products">Return to Products</span>
          </Link>
        </div>
        <Footer />
      </main>
    )
  }

  const relatedProducts = allProducts.filter((p) => p.category === product.category && p.id !== product.id).slice(0, 4)

  const handleAddToCart = () => {
    setAddedToCart(true)
    setTimeout(() => setAddedToCart(false), 2000)
  }

  return (
    <main className="min-h-screen bg-background">
      {/* Product Details Section */}
      <section className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid md:grid-cols-2 gap-12 mb-16">
          {/* Product Image */}
          <div className="bg-card border border-border rounded-lg overflow-hidden">
            <img src={product.image || "/placeholder.svg"} alt={product.name} className="w-full h-[450px] object-cover" />
          </div>

          {/* Product Info */}
          <div>
            <div className="mb-6">
              <p className="text-sm text-muted-foreground mb-2">{product.category}</p>
              <h1 className="text-xl md:text-2xl font-bold text-foreground mb-4">{product.name}</h1>

              {/* Status Badge */}
              <div className="mb-6">
                {product.inStock ? (
                  <span className="inline-block px-4 py-2 bg-green-100 text-green-800 rounded-lg text-sm font-semibold">
                    <span id="in-stock">In Stock</span>
                  </span>
                ) : (
                  <span className="inline-block px-4 py-2 bg-red-100 text-red-800 rounded-lg text-sm font-semibold">
                    <span id="out-of-stock">Out of Stock</span>
                  </span>
                )}
              </div>
            </div>

            {/* Price */}
            <div className="mb-6">
              {product.price > 0 ? (
                <p className="text-3xl font-bold text-accent">₹{product.price.toLocaleString()}</p>
              ) : (
                <p className="text-3xl font-bold text-blue-600">Ask Price</p>
              )}
              <p className="text-muted-foreground mt-2" id="free-shipping">Free shipping on orders over ₹5000</p>
            </div>

            {/* Specifications */}
            {product.specifications && (
              <div className="mb-6">
                <h3 className="font-semibold text-foreground mb-3">Specifications</h3>
                <div className="space-y-2">
                  {product.specifications.power && (
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Power:</span>
                      <span className="font-medium">{product.specifications.power}</span>
                    </div>
                  )}
                  {product.specifications.type && (
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Type:</span>
                      <span className="font-medium">{product.specifications.type}</span>
                    </div>
                  )}
                  {product.specifications.brand && (
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Brand:</span>
                      <span className="font-medium">{product.specifications.brand}</span>
                    </div>
                  )}
                </div>
              </div>
            )}



            {/* Quantity Selector */}
            <div className="mb-8">
              <label className="block text-sm font-semibold text-foreground mb-4" id="quantity-label">Quantity</label>
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  disabled={!product.inStock}
                  className="px-4 py-2 border border-border rounded-lg hover:bg-secondary disabled:opacity-50 disabled:cursor-not-allowed transition"
                >
                  −
                </button>
                <span className="text-2xl font-bold text-foreground w-8 text-center">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  disabled={!product.inStock}
                  className="px-4 py-2 border border-border rounded-lg hover:bg-secondary disabled:opacity-50 disabled:cursor-not-allowed transition"
                >
                  +
                </button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4">
              <button
                onClick={handleAddToCart}
                disabled={!product.inStock}
                className={`flex-1 px-8 py-4 rounded-lg font-semibold text-lg transition ${
                  product.inStock
                    ? addedToCart
                      ? "bg-green-600 text-white"
                      : "bg-primary text-primary-foreground hover:opacity-90"
                    : "bg-muted text-muted-foreground cursor-not-allowed"
                }`}
              >
                {addedToCart ? <span id="added-to-cart">Added to Cart!</span> : product.inStock ? <span id="add-to-cart">Add to Cart</span> : <span id="out-of-stock">Out of Stock</span>}
              </button>
              <button className="px-8 py-4 border border-border rounded-lg font-semibold hover:bg-secondary transition">
                ♡
              </button>
            </div>


          </div>
        </div>

        {/* Supplier Information Section */}
        {product.supplier && (
          <div className="mb-16 p-6 bg-secondary rounded-lg">
            <h3 className="text-xl font-semibold text-foreground mb-4">Supplier Information</h3>
            <div className="grid md:grid-cols-2 gap-4 mb-6">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Company:</span>
                <span className="font-medium">{product.supplier.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Location:</span>
                <span className="font-medium">{product.supplier.location}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Rating:</span>
                <span className="font-medium">{product.supplier.rating}/5 ({product.supplier.reviews} reviews)</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Experience:</span>
                <span className="font-medium">{product.supplier.experience}</span>
              </div>
            </div>
            
            {/* Warranty & Support Info */}
            <div className="grid grid-cols-3 gap-4 text-center pt-4 border-t border-border">
              <div>
                <p className="text-2xl font-bold text-accent">30-Day</p>
                <p className="text-sm text-muted-foreground">Money Back</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-accent">2 Years</p>
                <p className="text-sm text-muted-foreground">Warranty</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-accent">24/7</p>
                <p className="text-sm text-muted-foreground">Support</p>
              </div>
            </div>
          </div>
        )}

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <section className="mt-16 pt-16 border-t border-border">
            <h2 className="text-3xl font-bold text-foreground mb-8" id="related-products">Related Products</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((relatedProduct) => (
                <div
                  key={relatedProduct.id}
                  className="bg-card border border-border rounded-lg overflow-hidden hover:shadow-lg transition cursor-pointer h-full flex flex-col"
                  onClick={() => (window.location.href = `/product/${relatedProduct.id}`)}
                >
                  <div className="relative h-48 bg-secondary overflow-hidden">
                    <img
                      src={
                        hoveredRelatedProductId === relatedProduct.id ? relatedProduct.hoverImage : relatedProduct.image
                      }
                      alt={relatedProduct.name}
                      className="w-full h-full object-cover hover:scale-105 transition"
                      onMouseEnter={() => setHoveredRelatedProductId(relatedProduct.id)}
                      onMouseLeave={() => setHoveredRelatedProductId(null)}
                    />
                  </div>
                  <div className="p-4 flex-1 flex flex-col">
                    <p className="text-sm text-muted-foreground mb-2">{relatedProduct.category}</p>
                    <h3 className="font-semibold text-foreground mb-2 line-clamp-2 flex-1">{relatedProduct.name}</h3>
                    <div className="flex items-center justify-between mt-4">
                      {relatedProduct.price > 0 ? (
                        <span className="text-lg font-bold text-accent">₹{relatedProduct.price.toLocaleString()}</span>
                      ) : (
                        <span className="text-lg font-bold text-blue-600">Ask Price</span>
                      )}
                      <span className="text-accent hover:underline text-sm" id="view-button">View</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}
      </section>

      <Footer />
    </main>
  )
}
