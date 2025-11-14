import { NextResponse } from "next/server"
import { getToken } from "next-auth/jwt"
import { Redis } from "@upstash/redis"

// Initialize Upstash Redis client
const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL || "",
  token: process.env.UPSTASH_REDIS_REST_TOKEN || "",
})

// List of reserved paths that should not be treated as portfolio slugs
const reservedPaths = [
  '/dashboard',
  '/login',
  '/api',
  '/p',
  '/_next',
  '/favicon.ico',
  '/icon.png',
  '/placeholder-logo.png',
  '/placeholder-logo.svg',
  '/placeholder-user.jpg',
  '/placeholder.jpg',
  '/placeholder.svg'
]

export async function middleware(request) {
  const { pathname } = request.nextUrl

  // Check if the request is for the dashboard
  if (pathname.startsWith("/dashboard")) {
    const token = await getToken({ req: request })

    // Redirect to login if not authenticated
    if (!token) {
      const url = new URL("/login", request.url)
      url.searchParams.set("callbackUrl", encodeURI(pathname))
      return NextResponse.redirect(url)
    }
  }

  if (pathname === "/login") {
    const token = await getToken({ req: request })
    if (token) {
      const url = new URL("/dashboard", request.url)
      return NextResponse.redirect(url)
    }
  }

  if (pathname === "/") {
    const token = await getToken({ req: request })
    if (token) {
      const url = new URL("/dashboard", request.url)
      return NextResponse.redirect(url)
    }
  }

  // Check if this might be a portfolio slug
  const slug = pathname.slice(1) // Remove leading slash
  
  // Skip if it's a reserved path or has multiple segments
  if (reservedPaths.some(path => pathname.startsWith(path)) || 
      slug.includes('/') || 
      slug === '' ||
      pathname.startsWith('/.')) {
    return NextResponse.next()
  }

  // Check if this slug exists in Redis
  try {
    const email = await redis.get(`slug:${slug}`)
    if (email) {
      // This is a valid portfolio slug, let it continue to the [slug] route
      return NextResponse.next()
    }
  } catch (error) {
    console.error('Error checking slug in middleware:', error)
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
}

