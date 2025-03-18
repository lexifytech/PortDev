import { type NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { Redis } from "@upstash/redis"

// Initialize Upstash Redis client
const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL || "",
  token: process.env.UPSTASH_REDIS_REST_TOKEN || "",
})

export async function GET(request: NextRequest) {
  const session = await getServerSession()

  if (!session?.user?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const { searchParams } = new URL(request.url)
  const email = searchParams.get("email")

  if (!email) {
    return NextResponse.json({ error: "Email is required" }, { status: 400 })
  }

  // Only allow users to access their own portfolio
  if (email !== session.user.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  try {
    const portfolio = await redis.get(`portfolio:${email}`)

    if (!portfolio) {
      return NextResponse.json({ error: "Portfolio not found" }, { status: 404 })
    }

    // Migrate old portfolio data structure if needed
    if (portfolio.data && portfolio.data.projects) {
      portfolio.data.projects = portfolio.data.projects.map((project) => {
        // If project has imageUrl but no assets, create assets array
        if (project.imageUrl && (!project.assets || project.assets.length === 0)) {
          return {
            ...project,
            assets: [
              {
                id: `${project.id}-image-1`,
                url: project.imageUrl,
                type: "image",
              },
            ],
          }
        }

        // Ensure assets array exists
        if (!project.assets) {
          return {
            ...project,
            assets: [],
          }
        }

        return project
      })
    }

    return NextResponse.json(portfolio)
  } catch (error) {
    console.error("Error fetching portfolio:", error)
    return NextResponse.json({ error: "Failed to fetch portfolio" }, { status: 500 })
  }
}

export async function PUT(request: NextRequest) {
  const session = await getServerSession()

  if (!session?.user?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  try {
    const body = await request.json()
    const { email, template, data } = body

    // Only allow users to update their own portfolio
    if (email !== session.user.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const portfolio = await redis.get(`portfolio:${email}`)

    if (!portfolio) {
      return NextResponse.json({ error: "Portfolio not found" }, { status: 404 })
    }

    const updatedPortfolio = {
      ...portfolio,
      ...(template && { template }),
      ...(data && { data }),
      updatedAt: new Date().toISOString(),
    }

    await redis.set(`portfolio:${email}`, updatedPortfolio)

    return NextResponse.json(updatedPortfolio)
  } catch (error) {
    console.error("Error updating portfolio:", error)
    return NextResponse.json({ error: "Failed to update portfolio" }, { status: 500 })
  }
}

