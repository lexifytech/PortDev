import { Redis } from "@upstash/redis"
import { notFound } from "next/navigation"

import { MinimalTemplate } from "@/components/templates/minimal"
import { ModernTemplate } from "@/components/templates/modern"
import { CreativeTemplate } from "@/components/templates/creative"

// Initialize Upstash Redis client
const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL || "",
  token: process.env.UPSTASH_REDIS_REST_TOKEN || "",
})

export async function generateMetadata({ params }) {
  const { slug } = params

  try {
    // Get the email associated with this slug
    const email = await redis.get(`slug:${slug}`)

    if (!email) {
      return {
        title: "Portfolio Not Found",
      }
    }

    // Get the portfolio data
    const portfolio = await redis.get(`portfolio:${email}`)

    if (!portfolio || !portfolio.published) {
      return {
        title: "Portfolio Not Found",
      }
    }

    return {
      title: `${portfolio.data.name} - ${portfolio.data.title}`,
      description: portfolio.data.bio,
    }
  } catch (error) {
    console.error("Error generating metadata:", error)
    return {
      title: "Portfolio",
    }
  }
}

export default async function PortfolioPage({ params }) {
  const { slug } = params

  try {
    // Get the email associated with this slug
    const email = await redis.get(`slug:${slug}`)

    if (!email) {
      notFound()
    }

    // Get the portfolio data
    const portfolio = await redis.get(`portfolio:${email}`)

    if (!portfolio || !portfolio.published) {
      notFound()
    }

    // Render the appropriate template based on the portfolio's template setting
    switch (portfolio.template) {
      case "minimal":
        return <MinimalTemplate portfolio={portfolio} />
      case "modern":
        return <ModernTemplate portfolio={portfolio} />
      case "creative":
        return <CreativeTemplate portfolio={portfolio} />
      default:
        return <MinimalTemplate portfolio={portfolio} />
    }
  } catch (error) {
    console.error("Error fetching portfolio:", error)
    notFound()
  }
}

