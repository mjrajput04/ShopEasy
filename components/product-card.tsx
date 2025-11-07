"use client"

import Link from "next/link"
import { Star, MapPin, Shield } from "lucide-react"

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

interface ProductCardProps {
  product: Product
}

export function ProductCard({ product }: ProductCardProps) {
  const supplier = product.supplier || {
    name: "Shree Ram Pump & Pipe",
    location: "Rajkot",
    rating: 3.8,
    reviews: 230,
    verified: true,
    responseRate: 75,
    experience: "3 yrs"
  }

  return (
    <div className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-xl hover:border-gray-300 transition-all duration-300 relative group">
      {/* Supplier Badge */}
      <div className="absolute top-3 left-3 z-10">
        <div className="bg-orange-500 text-white px-2 py-1 rounded text-xs font-medium">
          Our Supplier
        </div>
      </div>

      {/* Product Image */}
      <div className="relative h-48 bg-gray-100 overflow-hidden">
        <img
          src={product.image || "/placeholder.svg"}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        {!product.inStock && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
            <span className="text-white font-semibold">Out of Stock</span>
          </div>
        )}
        {/* Image Count Badge */}
        <div className="absolute bottom-2 right-2 bg-teal-600 text-white px-2 py-1 rounded text-xs flex items-center gap-1">
          <span>📷</span>
          <span>+{Math.floor(Math.random() * 5) + 2}</span>
        </div>
      </div>

      {/* Product Info */}
      <div className="p-4">
        <h3 className="font-medium text-gray-900 mb-2 line-clamp-2 text-sm leading-tight">
          {product.name}
        </h3>

        {/* Price */}
        <div className="mb-3">
          {product.price > 0 ? (
            <>
              <span className="text-lg font-bold text-gray-900">₹ {product.price.toLocaleString()}</span>
              <span className="text-sm text-gray-500 ml-1">/Piece</span>
            </>
          ) : (
            <span className="text-lg font-bold text-blue-600">Ask Price</span>
          )}
        </div>

        {/* Specifications */}
        {(product.specifications?.power || product.specifications?.type) && (
          <div className="mb-3 space-y-1">
            {product.specifications?.power && (
              <div className="text-xs text-gray-600">
                <span className="font-medium">Power:</span> {product.specifications.power}
              </div>
            )}
            {product.specifications?.type && (
              <div className="text-xs text-gray-600">
                <span className="font-medium">Type:</span> {product.specifications.type}
              </div>
            )}
          </div>
        )}

        {/* Rating */}
        <div className="flex items-center gap-1 mb-3">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className={`w-3 h-3 ${
                i < Math.floor(supplier.rating)
                  ? "text-yellow-400 fill-current"
                  : "text-gray-300"
              }`}
            />
          ))}
          <span className="text-xs text-gray-600 ml-1">
            {supplier.rating} ({supplier.reviews})
          </span>
        </div>

        {/* Buy Button */}
        <Link href={`/product/${product.id}`}>
          <button className="w-full bg-teal-600 hover:bg-teal-700 text-white py-2 px-4 rounded text-sm font-medium transition-colors">
            Buy
          </button>
        </Link>
      </div>
    </div>
  )
}