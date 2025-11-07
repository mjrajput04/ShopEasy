"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Footer } from "@/components/footer"

export default function ContactPage() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" })
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
    setFormData({ name: "", email: "", message: "" })
    setTimeout(() => setSubmitted(false), 3000)
  }

  return (
    <main className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-4 py-16">
        <h1 className="text-5xl font-bold text-foreground mb-4">Get in Touch</h1>
        <p className="text-xl text-muted-foreground mb-12">Have questions or feedback? We'd love to hear from you.</p>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Contact Form */}
          <section>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-foreground mb-2">Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-2 border border-border rounded-lg bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-accent"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-foreground mb-2">Email</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-2 border border-border rounded-lg bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-accent"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-foreground mb-2">Message</label>
                <textarea
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  rows={5}
                  className="w-full px-4 py-2 border border-border rounded-lg bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-accent resize-none"
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-accent text-accent-foreground rounded-lg font-semibold hover:opacity-90 transition"
              >
                Send Message
              </button>

              {submitted && (
                <div className="p-4 bg-green-100 text-green-800 rounded-lg text-sm font-semibold">
                  Thank you! We'll get back to you soon.
                </div>
              )}
            </form>
          </section>

          {/* Contact Information */}
          <section className="space-y-8">
            <div>
              <h3 className="text-lg font-bold text-foreground mb-2">Email</h3>
              <a href="mailto:support@shopease.com" className="text-accent hover:underline">
                support@shopease.com
              </a>
            </div>

            <div>
              <h3 className="text-lg font-bold text-foreground mb-2">Phone</h3>
              <a href="tel:+1234567890" className="text-accent hover:underline">
                +1 (234) 567-890
              </a>
            </div>

            <div>
              <h3 className="text-lg font-bold text-foreground mb-2">Address</h3>
              <p className="text-muted-foreground">
                123 Premium Street
                <br />
                New York, NY 10001
                <br />
                United States
              </p>
            </div>

            <div>
              <h3 className="text-lg font-bold text-foreground mb-4">Business Hours</h3>
              <div className="space-y-2 text-muted-foreground">
                <p>Monday - Friday: 9:00 AM - 6:00 PM EST</p>
                <p>Saturday: 10:00 AM - 4:00 PM EST</p>
                <p>Sunday: Closed</p>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-bold text-foreground mb-4">Follow Us</h3>
              <div className="flex gap-4">
                <a href="#" className="text-accent hover:underline">
                  Instagram
                </a>
                <a href="#" className="text-accent hover:underline">
                  Facebook
                </a>
                <a href="#" className="text-accent hover:underline">
                  Twitter
                </a>
              </div>
            </div>
          </section>
        </div>
      </div>

      <Footer />
    </main>
  )
}
