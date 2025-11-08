import Link from "next/link"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-background">
      <Navigation />
      <div className="max-w-4xl mx-auto px-4 py-16">
        <div className="mb-16">
          <h1 className="text-5xl font-bold text-foreground mb-8">About ShopEase</h1>

          <div className="prose prose-invert max-w-none">
            <section className="mb-12">
              <h2 className="text-3xl font-bold text-foreground mb-4">Our Mission</h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                ShopEase is dedicated to bringing premium, carefully curated products to discerning customers around the
                world. We believe that shopping should be an experience, not a transaction. Every product in our
                collection has been hand-selected for quality, design, and value.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-3xl font-bold text-foreground mb-4">Our Story</h2>
              <p className="text-lg text-muted-foreground leading-relaxed mb-4">
                Founded in 2023, ShopEase emerged from a simple idea: to create a shopping platform that prioritizes
                quality over quantity. Our team of passionate curators spends countless hours sourcing the finest
                products from artisans and manufacturers worldwide.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                What started as a small boutique has grown into a trusted destination for thousands of customers who
                share our commitment to excellence and sustainability.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-3xl font-bold text-foreground mb-4">Why Choose ShopEase?</h2>
              <ul className="space-y-4 text-muted-foreground">
                <li className="flex gap-3">
                  <span className="text-accent font-bold">✓</span>
                  <span>Curated Selection: Every product is chosen with care and expertise</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-accent font-bold">✓</span>
                  <span>Quality Assurance: We guarantee authenticity and durability</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-accent font-bold">✓</span>
                  <span>Sustainable Practices: Supporting ethical manufacturers</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-accent font-bold">✓</span>
                  <span>Customer First: Dedicated support for every purchase</span>
                </li>
              </ul>
            </section>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  )
}
