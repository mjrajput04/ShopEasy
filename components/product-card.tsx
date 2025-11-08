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
    <div className="bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-2xl hover:border-blue-300 hover:-translate-y-2 transition-all duration-500 relative group">
      {/* Supplier Badge */}
      <div className="absolute top-3 left-3 z-10 animate-fade-in">
        <div className="bg-gradient-to-r from-orange-500 to-orange-600 text-white px-3 py-1 rounded-lg text-xs font-medium shadow-lg">
          Our Supplier
        </div>
      </div>

      {/* Product Image */}
      <div className="relative h-48 bg-gray-100 overflow-hidden">
        <img
          src={product.image || "/placeholder.svg"}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-110 group-hover:rotate-2 transition-all duration-700"
        />
        {!product.inStock && (
          <div className="absolute inset-0 bg-black/60 flex items-center justify-center backdrop-blur-sm">
            <span className="text-white font-semibold text-lg">Out of Stock</span>
          </div>
        )}
        {/* Image Count Badge */}
        <div className="absolute bottom-2 right-2 bg-teal-600 text-white px-2 py-1 rounded-lg text-xs flex items-center gap-1 shadow-lg animate-fade-in">
          <span>📷</span>
          <span>+{Math.floor(Math.random() * 5) + 2}</span>
        </div>
      </div>

      {/* Product Info */}
      <div className="p-5">
        <h3 className="font-medium text-gray-900 mb-3 line-clamp-2 text-sm leading-tight group-hover:text-blue-600 transition-colors duration-300">
          {product.name}
        </h3>

        {/* Price */}
        <div className="mb-4">
          {product.price > 0 ? (
            <>
              <span className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors duration-300">₹ {product.price.toLocaleString()}</span>
              <span className="text-sm text-gray-500 ml-1">/Piece</span>
            </>
          ) : (
            <span className="text-xl font-bold text-blue-600">Ask Price</span>
          )}
        </div>

        {/* Specifications */}
        {(product.specifications?.power || product.specifications?.type) && (
          <div className="mb-4 space-y-1">
            {product.specifications?.power && (
              <div className="text-xs text-gray-600 flex items-center gap-2">
                <span className="font-medium">Power:</span> 
                <span className="bg-blue-50 px-2 py-1 rounded">{product.specifications.power}</span>
              </div>
            )}
            {product.specifications?.type && (
              <div className="text-xs text-gray-600 flex items-center gap-2">
                <span className="font-medium">Type:</span> 
                <span className="bg-blue-50 px-2 py-1 rounded">{product.specifications.type}</span>
              </div>
            )}
          </div>
        )}

        {/* Rating */}
        <div className="flex items-center gap-1 mb-4">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className={`w-4 h-4 transition-all duration-300 ${
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
          <button className="w-full bg-gradient-to-r from-teal-600 to-cyan-600 hover:from-teal-700 hover:to-cyan-700 text-white py-3 px-4 rounded-lg text-sm font-semibold transition-all duration-300 hover:shadow-lg hover:scale-105">
            Buy Now
          </button>
        </Link>
      </div>
    </div>
  )
}