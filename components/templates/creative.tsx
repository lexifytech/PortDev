import { Github, Globe, Linkedin, Twitter } from "lucide-react"

import { Button } from "@/components/ui/button"

export function CreativeTemplate({ portfolio }) {
  const { data } = portfolio

  return (
    <div className="min-h-screen bg-navy text-white">
      <div className="container px-4 md:px-6 py-10">
        <header className="mb-20">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <h1 className="text-4xl md:text-5xl font-bold text-teal">{data.name}</h1>
            <div className="flex gap-3">
              {data.social?.github && (
                <a href={data.social.github} target="_blank" rel="noopener noreferrer">
                  <Button
                    variant="outline"
                    size="icon"
                    className="rounded-full border-white/20 bg-transparent hover:bg-teal/10 hover:border-teal"
                  >
                    <Github className="h-5 w-5" />
                    <span className="sr-only">GitHub</span>
                  </Button>
                </a>
              )}
              {data.social?.linkedin && (
                <a href={data.social.linkedin} target="_blank" rel="noopener noreferrer">
                  <Button
                    variant="outline"
                    size="icon"
                    className="rounded-full border-white/20 bg-transparent hover:bg-teal/10 hover:border-teal"
                  >
                    <Linkedin className="h-5 w-5" />
                    <span className="sr-only">LinkedIn</span>
                  </Button>
                </a>
              )}
              {data.social?.twitter && (
                <a href={data.social.twitter} target="_blank" rel="noopener noreferrer">
                  <Button
                    variant="outline"
                    size="icon"
                    className="rounded-full border-white/20 bg-transparent hover:bg-teal/10 hover:border-teal"
                  >
                    <Twitter className="h-5 w-5" />
                    <span className="sr-only">Twitter</span>
                  </Button>
                </a>
              )}
              {data.social?.website && (
                <a href={data.social.website} target="_blank" rel="noopener noreferrer">
                  <Button
                    variant="outline"
                    size="icon"
                    className="rounded-full border-white/20 bg-transparent hover:bg-teal/10 hover:border-teal"
                  >
                    <Globe className="h-5 w-5" />
                    <span className="sr-only">Website</span>
                  </Button>
                </a>
              )}
            </div>
          </div>
        </header>

        <main>
          <section className="mb-20">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              <div>
                <h2 className="text-3xl font-bold mb-4 text-coral">{data.title}</h2>
                <p className="text-xl text-white/80">{data.bio}</p>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-4 text-coral">Skills</h3>
                <div className="flex flex-wrap gap-2">
                  {data.skills.map((skill) => (
                    <div key={skill} className="rounded-full bg-teal/10 px-4 py-1.5 text-sm">
                      {skill}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-3xl font-bold mb-10 text-coral">Projects</h2>
            <div className="grid grid-cols-1 gap-20">
              {data.projects.map((project, index) => (
                <div
                  key={project.id}
                  className={`grid grid-cols-1 md:grid-cols-2 gap-10 ${index % 2 === 1 ? "md:flex-row-reverse" : ""}`}
                >
                  <div className="space-y-4">
                    {project.assets && project.assets.length > 0 && (
                      <div className="overflow-hidden rounded-lg bg-white/5 p-2">
                        {project.assets[0].type === "image" ? (
                          <img
                            src={project.assets[0].url || "/placeholder.svg"}
                            alt={project.title}
                            className="w-full h-auto object-cover rounded-lg"
                          />
                        ) : (
                          <video
                            src={project.assets[0].url}
                            controls
                            className="w-full h-auto object-cover rounded-lg"
                          />
                        )}
                      </div>
                    )}

                    {project.assets && project.assets.length > 1 && (
                      <div className="grid grid-cols-3 gap-2">
                        {project.assets.slice(1, 4).map((asset, index) => (
                          <div key={asset.id} className="aspect-square rounded-lg overflow-hidden bg-white/5 p-1">
                            {asset.type === "image" ? (
                              <img
                                src={asset.url || "/placeholder.svg"}
                                alt={`${project.title} asset ${index + 2}`}
                                className="w-full h-full object-cover rounded-lg"
                              />
                            ) : (
                              <div className="w-full h-full bg-navy/50 flex items-center justify-center rounded-lg">
                                <video className="w-8 h-8" />
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  <div className="flex flex-col justify-center">
                    <h3 className="text-2xl font-bold mb-4 text-teal">{project.title}</h3>
                    <p className="text-white/70 mb-6">{project.description}</p>
                    {project.projectUrl && (
                      <Button
                        asChild
                        variant="outline"
                        className="w-fit border-teal bg-transparent hover:bg-teal/10 text-teal"
                      >
                        <a href={project.projectUrl} target="_blank" rel="noopener noreferrer">
                          View Project
                        </a>
                      </Button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </section>
        </main>
      </div>
      <footer className="border-t border-white/10 py-6 mt-20">
        <div className="container flex flex-col items-center justify-center gap-4 px-4 md:px-6 text-center">
          <p className="text-sm text-white/60">
            © {new Date().getFullYear()} {data.name}. All rights reserved.
          </p>
          <p className="text-sm text-white/60">
            Built with{" "}
            <a href="/" className="text-teal hover:underline">
              PortDev
            </a>
          </p>
        </div>
      </footer>
    </div>
  )
}

