"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useSession } from "next-auth/react"
import { Check, Loader2, Pencil } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { PortfolioForm } from "@/components/portfolio-form"
import { TemplateSelector } from "@/components/template-selector"
import { DashboardHeader } from "@/components/dashboard-header"

export default function DashboardPage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [portfolio, setPortfolio] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [publishLoading, setPublishLoading] = useState(false)
  const [activeTab, setActiveTab] = useState("template")

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login")
    }
  }, [status, router])

  useEffect(() => {
    const fetchPortfolio = async () => {
      if (session?.user?.email) {
        try {
          const response = await fetch(`/api/portfolio?email=${session.user.email}`)
          if (response.ok) {
            const data = await response.json()
            setPortfolio(data)

            // If user has already selected a template, go to edit tab
            if (data.template && data.template !== "none") {
              setActiveTab("edit")
            }
          }
        } catch (error) {
          console.error("Error fetching portfolio:", error)
        } finally {
          setIsLoading(false)
        }
      }
    }

    if (session?.user?.email) {
      fetchPortfolio()
    }
  }, [session])

  const handleTemplateSelect = async (template) => {
    try {
      const response = await fetch("/api/portfolio", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: session?.user?.email,
          template,
        }),
      })

      if (response.ok) {
        const updatedPortfolio = await response.json()
        setPortfolio(updatedPortfolio)
        setActiveTab("edit")
      }
    } catch (error) {
      console.error("Error updating template:", error)
    }
  }

  const handlePortfolioUpdate = async (data) => {
    try {
      const response = await fetch("/api/portfolio", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: session?.user?.email,
          data,
        }),
      })

      if (response.ok) {
        const updatedPortfolio = await response.json()
        setPortfolio(updatedPortfolio)
        return true
      }
      return false
    } catch (error) {
      console.error("Error updating portfolio:", error)
      return false
    }
  }

  const handlePublish = async () => {
    setPublishLoading(true)
    try {
      const response = await fetch("/api/portfolio/publish", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: session?.user?.email,
        }),
      })

      if (response.ok) {
        const updatedPortfolio = await response.json()
        setPortfolio(updatedPortfolio)
        setActiveTab("view")
      }
    } catch (error) {
      console.error("Error publishing portfolio:", error)
    } finally {
      setPublishLoading(false)
    }
  }

  if (status === "loading" || isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-teal" />
      </div>
    )
  }

  return (
    <div className="flex min-h-screen flex-col">
      <DashboardHeader user={session?.user} />
      <main className="flex-1 container py-6">
        <div className="flex flex-col gap-6">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold gradient-text">Your Portfolio</h1>
            {portfolio?.published && (
              <Button variant="outline" asChild className="border-teal text-teal hover:bg-teal/10">
                <a href={`/p/${portfolio.slug}`} target="_blank" rel="noopener noreferrer">
                  View Published Portfolio
                </a>
              </Button>
            )}
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="template">Choose Template</TabsTrigger>
              <TabsTrigger value="edit" disabled={!portfolio?.template || portfolio?.template === "none"}>
                Edit Content
              </TabsTrigger>
              <TabsTrigger value="view" disabled={!portfolio?.published}>
                View Portfolio
              </TabsTrigger>
            </TabsList>
            <TabsContent value="template" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-teal">Choose a Template</CardTitle>
                  <CardDescription>Select a template for your portfolio. You can change it later.</CardDescription>
                </CardHeader>
                <CardContent>
                  <TemplateSelector selectedTemplate={portfolio?.template} onSelect={handleTemplateSelect} />
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="edit" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-teal">Edit Your Portfolio</CardTitle>
                  <CardDescription>Add your information and projects to your portfolio.</CardDescription>
                </CardHeader>
                <CardContent>
                  {portfolio && <PortfolioForm initialData={portfolio.data} onSave={handlePortfolioUpdate} />}
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button
                    variant="outline"
                    onClick={() => setActiveTab("template")}
                    className="border-teal text-teal hover:bg-teal/10"
                  >
                    Back to Templates
                  </Button>
                  <Button onClick={handlePublish} disabled={publishLoading} className="bg-teal hover:bg-teal/90">
                    {publishLoading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Publishing...
                      </>
                    ) : portfolio?.published ? (
                      <>
                        <Check className="mr-2 h-4 w-4" />
                        Update Published Portfolio
                      </>
                    ) : (
                      <>
                        <Pencil className="mr-2 h-4 w-4" />
                        Publish Portfolio
                      </>
                    )}
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>
            <TabsContent value="view" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-teal">Your Published Portfolio</CardTitle>
                  <CardDescription>Your portfolio is now live and can be shared with others.</CardDescription>
                </CardHeader>
                <CardContent>
                  {portfolio?.published && (
                    <div className="flex flex-col gap-4">
                      <div className="flex flex-col gap-2">
                        <h3 className="text-lg font-medium text-teal">Public URL</h3>
                        <div className="flex items-center gap-2">
                          <code className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm">
                            {`${window.location.origin}/p/${portfolio.slug}`}
                          </code>
                          <Button
                            variant="outline"
                            size="sm"
                            className="border-teal text-teal hover:bg-teal/10"
                            onClick={() => {
                              navigator.clipboard.writeText(`${window.location.origin}/p/${portfolio.slug}`)
                            }}
                          >
                            Copy
                          </Button>
                        </div>
                      </div>
                      <div className="mt-4">
                        <Button asChild className="bg-teal hover:bg-teal/90">
                          <a href={`/p/${portfolio.slug}`} target="_blank" rel="noopener noreferrer">
                            Open Portfolio
                          </a>
                        </Button>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  )
}

