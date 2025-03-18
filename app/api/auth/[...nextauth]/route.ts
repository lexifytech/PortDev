import { Redis } from "@upstash/redis"
import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"

// Initialize Upstash Redis client
const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL || "",
  token: process.env.UPSTASH_REDIS_REST_TOKEN || "",
})

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    }),
  ],
  callbacks: {
    async signIn({ user, account }) {
      if (!user.email) {
        return false
      }

      try {
        // Check if user exists in database
        const existingUser = await redis.get(`user:${user.email}`)

        if (!existingUser) {
          // Create new user in database
          await redis.set(`user:${user.email}`, {
            id: user.id,
            email: user.email,
            name: user.name,
            image: user.image,
            createdAt: new Date().toISOString(),
          })

          // Create empty portfolio for new user
          await redis.set(`portfolio:${user.email}`, {
            userId: user.id,
            template: "minimal",
            published: false,
            data: {
              name: user.name || "",
              title: "",
              bio: "",
              skills: [],
              projects: [],
              social: {},
            },
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          })
        }

        return true
      } catch (error) {
        console.error("Error during sign in:", error)
        return false
      }
    },
    async session({ session }) {
      return session
    },
  },
  pages: {
    signIn: "/login",
  },
  secret: process.env.NEXTAUTH_SECRET,
})

export { handler as GET, handler as POST }

