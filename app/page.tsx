import Link from "next/link"
import { ArrowRight, Code, Layers, Palette } from "lucide-react"

import { Button } from "@/components/ui/button"

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="border-b">
        <div className="container flex h-16 items-center justify-between px-4 md:px-6">
          <Link href="/" className="flex items-center gap-2 font-bold text-xl">
            <Code className="h-6 w-6 text-teal" />
            <span className="gradient-text">PortDev</span>
          </Link>
          <nav className="hidden md:flex gap-6">
            <Link href="#features" className="text-sm font-medium hover:text-teal transition-colors">
              Features
            </Link>
            <Link href="#templates" className="text-sm font-medium hover:text-teal transition-colors">
              Templates
            </Link>
            <Link href="#pricing" className="text-sm font-medium hover:text-teal transition-colors">
              Pricing
            </Link>
          </nav>
          <div className="flex gap-4">
            <Link href="/login">
              <Button variant="outline" className="border-teal text-teal hover:bg-teal/10">
                Log In
              </Button>
            </Link>
            <Link href="/login">
              <Button className="bg-teal hover:bg-teal/90">Get Started</Button>
            </Link>
          </div>
        </div>
      </header>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 gradient-bg">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl text-white">
                  Showcase Your Developer Portfolio
                </h1>
                <p className="mx-auto max-w-[700px] text-white/80 md:text-xl">
                  Create a stunning portfolio in minutes. Choose from beautiful templates and share your work with the
                  world.
                </p>
              </div>
              <div className="space-x-4">
                <Link href="/login">
                  <Button size="lg" className="gap-1 bg-white text-navy hover:bg-white/90">
                    Get Started <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
        <section id="features" className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl gradient-text">Features</h2>
                <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                  Everything you need to showcase your developer skills
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
                <div className="flex flex-col items-center space-y-2 border p-6 rounded-lg hover:border-teal transition-colors">
                  <Palette className="h-12 w-12 text-teal" />
                  <h3 className="text-xl font-bold">Beautiful Templates</h3>
                  <p className="text-muted-foreground text-center">
                    Choose from professionally designed templates that highlight your work
                  </p>
                </div>
                <div className="flex flex-col items-center space-y-2 border p-6 rounded-lg hover:border-teal transition-colors">
                  <Layers className="h-12 w-12 text-teal" />
                  <h3 className="text-xl font-bold">Easy Customization</h3>
                  <p className="text-muted-foreground text-center">
                    Customize your portfolio with your projects, skills, and personal information
                  </p>
                </div>
                <div className="flex flex-col items-center space-y-2 border p-6 rounded-lg hover:border-teal transition-colors">
                  <Code className="h-12 w-12 text-teal" />
                  <h3 className="text-xl font-bold">Developer Focused</h3>
                  <p className="text-muted-foreground text-center">
                    Built specifically for developers to showcase code projects and technical skills
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section id="templates" className="w-full py-12 md:py-24 lg:py-32 bg-muted">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl gradient-text">Templates</h2>
                <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                  Choose from our professionally designed templates
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
                <div className="overflow-hidden rounded-lg border bg-card hover:border-teal transition-colors">
                  <div className="aspect-video bg-navy/20 relative">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-xl font-bold text-teal">Minimal</span>
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold">Minimal</h3>
                    <p className="text-sm text-muted-foreground">Clean and simple design focused on your work</p>
                  </div>
                </div>
                <div className="overflow-hidden rounded-lg border bg-card hover:border-teal transition-colors">
                  <div className="aspect-video bg-navy/20 relative">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-xl font-bold text-teal">Modern</span>
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold">Modern</h3>
                    <p className="text-sm text-muted-foreground">Contemporary design with bold elements</p>
                  </div>
                </div>
                <div className="overflow-hidden rounded-lg border bg-card hover:border-teal transition-colors">
                  <div className="aspect-video bg-navy/20 relative">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-xl font-bold text-teal">Creative</span>
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold">Creative</h3>
                    <p className="text-sm text-muted-foreground">Unique layout to showcase your creativity</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section id="pricing" className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl gradient-text">
                  Simple Pricing
                </h2>
                <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                  Start for free, upgrade when you need more
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8 max-w-4xl">
                <div className="flex flex-col p-6 bg-card shadow-lg rounded-lg border hover:border-teal transition-colors">
                  <h3 className="text-2xl font-bold">Free</h3>
                  <div className="mt-4 text-center">
                    <span className="text-4xl font-bold">$0</span>
                    <span className="text-muted-foreground">/month</span>
                  </div>
                  <ul className="mt-4 space-y-2 flex-1">
                    <li className="flex items-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="h-4 w-4 mr-2 text-teal"
                      >
                        <polyline points="20 6 9 17 4 12"></polyline>
                      </svg>
                      1 portfolio
                    </li>
                    <li className="flex items-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="h-4 w-4 mr-2 text-teal"
                      >
                        <polyline points="20 6 9 17 4 12"></polyline>
                      </svg>
                      Basic templates
                    </li>
                    <li className="flex items-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="h-4 w-4 mr-2 text-teal"
                      >
                        <polyline points="20 6 9 17 4 12"></polyline>
                      </svg>
                      Custom domain
                    </li>
                  </ul>
                  <Link href="/login" className="mt-6">
                    <Button className="w-full bg-teal hover:bg-teal/90">Get Started</Button>
                  </Link>
                </div>
                <div className="flex flex-col p-6 bg-navy shadow-lg rounded-lg border border-teal">
                  <h3 className="text-2xl font-bold text-white">Pro</h3>
                  <div className="mt-4 text-center text-white">
                    <span className="text-4xl font-bold">$9</span>
                    <span className="opacity-85">/month</span>
                  </div>
                  <ul className="mt-4 space-y-2 flex-1 text-white">
                    <li className="flex items-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="h-4 w-4 mr-2 text-teal"
                      >
                        <polyline points="20 6 9 17 4 12"></polyline>
                      </svg>
                      Multiple portfolios
                    </li>
                    <li className="flex items-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="h-4 w-4 mr-2 text-teal"
                      >
                        <polyline points="20 6 9 17 4 12"></polyline>
                      </svg>
                      All templates
                    </li>
                    <li className="flex items-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="h-4 w-4 mr-2 text-teal"
                      >
                        <polyline points="20 6 9 17 4 12"></polyline>
                      </svg>
                      Custom domain
                    </li>
                    <li className="flex items-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="h-4 w-4 mr-2 text-teal"
                      >
                        <polyline points="20 6 9 17 4 12"></polyline>
                      </svg>
                      Analytics
                    </li>
                    <li className="flex items-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="h-4 w-4 mr-2 text-teal"
                      >
                        <polyline points="20 6 9 17 4 12"></polyline>
                      </svg>
                      Priority support
                    </li>
                  </ul>
                  <Link href="/login" className="mt-6">
                    <Button variant="outline" className="w-full border-teal text-teal hover:bg-teal/10">
                      Upgrade
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="border-t py-6 md:py-8">
        <div className="container flex flex-col items-center justify-center gap-4 px-4 md:px-6 text-center">
          <div className="flex items-center gap-2">
            <Code className="h-6 w-6 text-teal" />
            <span className="font-bold gradient-text">PortDev</span>
          </div>
          <p className="text-sm text-muted-foreground">© {new Date().getFullYear()} PortDev. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}

