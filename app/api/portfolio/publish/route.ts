import { type NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { Redis } from "@upstash/redis"
import { nanoid } from "nanoid"

// Initialize Upstash Redis client
const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL || "",
  token: process.env.UPSTASH_REDIS_REST_TOKEN || "",
})

export async function POST(request: NextRequest) {
  const session = await getServerSession()

  if (!session?.user?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  try {
    const body = await request.json()
    const { email } = body

    // Only allow users to publish their own portfolio
    if (email !== session.user.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const portfolio = await redis.get(`portfolio:${email}`)

    if (!portfolio) {
      return NextResponse.json({ error: "Portfolio not found" }, { status: 404 })
    }

    // Generate a slug if one doesn't exist
    let slug = portfolio.slug
    if (!slug) {
      // Create a slug based on the user's name or a random ID
      const baseName = portfolio.data.name ? portfolio.data.name.toLowerCase().replace(/\s+/g, "-") : nanoid(8)
      
      // Use only a unique ID instead of name + ID
      slug = nanoid(12) // Generates a unique 12-character ID
      
      // Store a reference to the portfolio by slug for public access
      await redis.set(`slug:${slug}`, email)
    }

    const updatedPortfolio = {
      ...portfolio,
      slug,
      published: true,
      publishedAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }

    // Update the portfolio with the published status and slug
    await redis.set(`portfolio:${email}`, updatedPortfolio)

    // Store a reference to the portfolio by slug for public access
    await redis.set(`slug:${slug}`, email)

    return NextResponse.json(updatedPortfolio)
  } catch (error) {
    console.error("Error publishing portfolio:", error)
    return NextResponse.json({ error: "Failed to publish portfolio" }, { status: 500 })
  }
}

