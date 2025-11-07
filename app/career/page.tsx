import Link from "next/link"
import { Footer } from "@/components/footer"

interface JobOpening {
  id: number
  title: string
  department: string
  location: string
  description: string
}

const jobOpenings: JobOpening[] = [
  {
    id: 1,
    title: "Product Curator",
    department: "Curation Team",
    location: "New York, NY",
    description: "Join our team to discover and select premium products from around the world.",
  },
  {
    id: 2,
    title: "Customer Success Manager",
    department: "Customer Support",
    location: "Remote",
    description: "Provide exceptional support and build lasting relationships with our valued customers.",
  },
  {
    id: 3,
    title: "Full Stack Developer",
    department: "Engineering",
    location: "San Francisco, CA",
    description: "Help us build the next generation of our e-commerce platform.",
  },
  {
    id: 4,
    title: "Marketing Specialist",
    department: "Marketing",
    location: "Los Angeles, CA",
    description: "Develop and execute marketing strategies to reach our target audience.",
  },
]

export default function CareerPage() {
  return (
    <main className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-4 py-16">
        <div className="mb-12">
          <h1 className="text-5xl font-bold text-foreground mb-4">Join Our Team</h1>
          <p className="text-xl text-muted-foreground">
            We're always looking for passionate individuals to join ShopEase and help us deliver excellence.
          </p>
        </div>

        <div className="space-y-6 mb-12">
          {jobOpenings.map((job) => (
            <div key={job.id} className="bg-card border border-border rounded-lg p-6 hover:shadow-lg transition">
              <div className="grid md:grid-cols-2 gap-4 items-start mb-4">
                <div>
                  <h3 className="text-2xl font-bold text-foreground mb-2">{job.title}</h3>
                  <div className="space-y-1">
                    <p className="text-sm text-muted-foreground">
                      <span className="font-semibold">Department:</span> {job.department}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      <span className="font-semibold">Location:</span> {job.location}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <button className="px-6 py-2 bg-accent text-accent-foreground rounded-lg font-semibold hover:opacity-90 transition">
                    Apply Now
                  </button>
                </div>
              </div>
              <p className="text-muted-foreground leading-relaxed">{job.description}</p>
            </div>
          ))}
        </div>

        <section className="bg-accent/10 border border-accent/20 rounded-lg p-8 text-center">
          <h2 className="text-2xl font-bold text-foreground mb-2">Don't see a role that fits?</h2>
          <p className="text-muted-foreground mb-4">Send us your resume and tell us what role you'd like to create!</p>
          <a href="mailto:careers@shopease.com" className="text-accent font-semibold hover:underline">
            careers@shopease.com
          </a>
        </section>
      </div>

      <Footer />
    </main>
  )
}
