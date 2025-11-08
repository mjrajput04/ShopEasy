"use client"

import { useState, use } from "react"
import Link from "next/link"
import { Navigation } from "@/components/navigation"
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
        <Navigation />
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
      <Navigation />
      <section className="max-w-6xl mx-auto px-4 py-8">
        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-card rounded-xl overflow-hidden border border-border shadow-sm">
            <img src={product.image || "/placeholder.svg"} alt={product.name} className="w-full h-[420px] object-cover" />
          </div>

          <div className="space-y-5">
            <div>
              <span className="inline-block px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-xs font-semibold rounded-full mb-3">{product.category}</span>
              <h1 className="text-2xl font-bold text-foreground mb-3 leading-tight">{product.name}</h1>
              {product.supplier && (
                <p className="text-sm text-muted-foreground">⭐ {product.supplier.rating}/5 · {product.supplier.reviews} reviews</p>
              )}
            </div>

            <div className="bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
              {product.price > 0 ? (
                <p className="text-3xl font-bold text-blue-600">₹{product.price.toLocaleString()}</p>
              ) : (
                <p className="text-3xl font-bold text-blue-600">Ask Price</p>
              )}
              <p className="text-sm text-muted-foreground mt-2" id="free-shipping">✓ Free shipping on orders over ₹5000</p>
            </div>

            {product.specifications && (
              <div className="bg-secondary/50 rounded-lg p-4">
                <h3 className="font-semibold text-foreground mb-3">Specifications</h3>
                <div className="space-y-2 text-sm">
                  {product.specifications.power && <div className="flex justify-between"><span className="text-muted-foreground">Power</span> <span className="font-semibold">{product.specifications.power}</span></div>}
                  {product.specifications.type && <div className="flex justify-between"><span className="text-muted-foreground">Type</span> <span className="font-semibold">{product.specifications.type}</span></div>}
                  {product.specifications.brand && <div className="flex justify-between"><span className="text-muted-foreground">Brand</span> <span className="font-semibold">{product.specifications.brand}</span></div>}
                </div>
              </div>
            )}



            <div>
              <label className="block text-sm font-semibold text-foreground mb-2" id="quantity-label">Quantity</label>
              <div className="flex items-center gap-3">
                <button onClick={() => setQuantity(Math.max(1, quantity - 1))} disabled={!product.inStock} className="w-11 h-11 border-2 border-border rounded-lg hover:border-blue-500 hover:bg-blue-50 dark:hover:bg-blue-950/20 disabled:opacity-50 transition font-semibold">
                  −
                </button>
                <span className="text-2xl font-bold w-14 text-center">{quantity}</span>
                <button onClick={() => setQuantity(quantity + 1)} disabled={!product.inStock} className="w-11 h-11 border-2 border-border rounded-lg hover:border-blue-500 hover:bg-blue-50 dark:hover:bg-blue-950/20 disabled:opacity-50 transition font-semibold">
                  +
                </button>
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={handleAddToCart}
                disabled={!product.inStock}
                className={`flex-1 py-3.5 rounded-lg font-semibold transition shadow-sm ${
                  product.inStock
                    ? addedToCart
                      ? "bg-green-600 text-white"
                      : "bg-blue-600 text-white hover:bg-blue-700 hover:shadow-md"
                    : "bg-gray-300 text-gray-500 cursor-not-allowed"
                }`}
              >
                {addedToCart ? <span id="added-to-cart">✓ Added</span> : product.inStock ? <span id="add-to-cart">Add to Cart</span> : <span id="out-of-stock">Out of Stock</span>}
              </button>
              <button className="w-12 h-12 border-2 border-border rounded-lg hover:border-red-500 hover:text-red-500 transition">♡</button>
            </div>
          </div>
        </div>

        {product.supplier && (
          <div className="mt-8 p-6 bg-card rounded-xl border border-border shadow-sm">
            <h3 className="text-lg font-semibold mb-4">Supplier Information</h3>
            <div className="grid md:grid-cols-3 gap-3 text-sm mb-5">
              <div className="bg-secondary/50 rounded-lg p-3">
                <p className="text-xs text-muted-foreground mb-1">Company</p>
                <p className="font-semibold">{product.supplier.name}</p>
              </div>
              <div className="bg-secondary/50 rounded-lg p-3">
                <p className="text-xs text-muted-foreground mb-1">Location</p>
                <p className="font-semibold">{product.supplier.location}</p>
              </div>
              <div className="bg-secondary/50 rounded-lg p-3">
                <p className="text-xs text-muted-foreground mb-1">Experience</p>
                <p className="font-semibold">{product.supplier.experience}</p>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-4 pt-4 border-t border-border text-center">
              <div>
                <p className="text-lg font-bold">30-Day</p>
                <p className="text-xs text-muted-foreground">Money Back</p>
              </div>
              <div>
                <p className="text-lg font-bold">2 Years</p>
                <p className="text-xs text-muted-foreground">Warranty</p>
              </div>
              <div>
                <p className="text-lg font-bold">24/7</p>
                <p className="text-xs text-muted-foreground">Support</p>
              </div>
            </div>
          </div>
        )}

        {relatedProducts.length > 0 && (
          <section className="mt-12 pt-8 border-t border-border">
            <h2 className="text-xl font-bold mb-6" id="related-products">Related Products</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
              {relatedProducts.map((relatedProduct) => (
                <div key={relatedProduct.id} className="bg-card border border-border rounded-xl overflow-hidden hover:shadow-lg hover:border-blue-500 transition-all cursor-pointer" onClick={() => (window.location.href = `/product/${relatedProduct.id}`)}>
                  <div className="h-44 bg-secondary overflow-hidden">
                    <img src={relatedProduct.image} alt={relatedProduct.name} className="w-full h-full object-cover hover:scale-105 transition-transform duration-300" />
                  </div>
                  <div className="p-4">
                    <p className="text-xs text-blue-600 dark:text-blue-400 font-medium mb-1">{relatedProduct.category}</p>
                    <h3 className="font-semibold text-sm mb-3 line-clamp-2">{relatedProduct.name}</h3>
                    <div className="flex items-center justify-between pt-2 border-t border-border">
                      {relatedProduct.price > 0 ? (
                        <span className="text-base font-bold">₹{relatedProduct.price.toLocaleString()}</span>
                      ) : (
                        <span className="text-base font-bold text-blue-600">Ask Price</span>
                      )}
                      <span className="text-blue-600 text-sm font-medium hover:underline" id="view-button">View →</span>
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
