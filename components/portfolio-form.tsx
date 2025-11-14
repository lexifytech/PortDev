"use client"

import { useState } from "react"
import type React from "react"
import { Loader2, Plus, Trash2, GripVertical } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent } from "@/components/ui/card"

export function PortfolioForm({ initialData, onSave }) {
  const { toast } = useToast()
  const [formData, setFormData] = useState(
    initialData || {
      name: "",
      title: "",
      bio: "",
      skills: [],
      projects: [],
      social: {
        github: "",
        linkedin: "",
        twitter: "",
        website: "",
      },
    },
  )
  const [isLoading, setIsLoading] = useState(false)
  const [newSkill, setNewSkill] = useState("")
  const [newAssetUrl, setNewAssetUrl] = useState("")
  const [newAssetType, setNewAssetType] = useState("image")
  const [activeProjectId, setActiveProjectId] = useState(null)
  const [dragIndex, setDragIndex] = useState<number | null>(null)

  const handleChange = (e) => {
    const { name, value } = e.target

    if (name.includes(".")) {
      const [parent, child] = name.split(".")
      setFormData({
        ...formData,
        [parent]: {
          ...formData[parent],
          [child]: value,
        },
      })
    } else {
      setFormData({
        ...formData,
        [name]: value,
      })
    }
  }

  const handleAddSkill = () => {
    if (newSkill.trim() && !formData.skills.includes(newSkill.trim())) {
      setFormData({
        ...formData,
        skills: [...formData.skills, newSkill.trim()],
      })
      setNewSkill("")
    }
  }

  const handleRemoveSkill = (skill) => {
    setFormData({
      ...formData,
      skills: formData.skills.filter((s) => s !== skill),
    })
  }

  const handleAddProject = () => {
    const newProject = {
      id: Date.now().toString(),
      title: "",
      description: "",
      assets: [],
      projectUrl: "",
      technologies: [],
    }

    setFormData({
      ...formData,
      projects: [...formData.projects, newProject],
    })

    setActiveProjectId(newProject.id)
  }

  const handleRemoveProject = (id) => {
    setFormData({
      ...formData,
      projects: formData.projects.filter((project) => project.id !== id),
    })

    if (activeProjectId === id) {
      setActiveProjectId(null)
    }
  }

  const handleProjectChange = (id, field, value) => {
    setFormData({
      ...formData,
      projects: formData.projects.map((project) => (project.id === id ? { ...project, [field]: value } : project)),
    })
  }

  const handleAddAsset = (projectId) => {
    if (!newAssetUrl.trim()) return

    const newAsset = {
      id: Date.now().toString(),
      url: newAssetUrl.trim(),
      type: newAssetType,
    }

    setFormData({
      ...formData,
      projects: formData.projects.map((project) =>
        project.id === projectId ? { ...project, assets: [...project.assets, newAsset] } : project,
      ),
    })

    setNewAssetUrl("")
  }

  const handleRemoveAsset = (projectId, assetId) => {
    setFormData({
      ...formData,
      projects: formData.projects.map((project) =>
        project.id === projectId
          ? {
              ...project,
              assets: project.assets.filter((asset) => asset.id !== assetId),
            }
          : project,
      ),
    })
  }

  const handleDragStart = (index: number) => {
    setDragIndex(index)
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
  }

  const handleDrop = (index: number) => {
    if (dragIndex === null || dragIndex === index) return
    const updated = [...formData.projects]
    const [moved] = updated.splice(dragIndex, 1)
    updated.splice(index, 0, moved)
    setFormData({ ...formData, projects: updated })
    setDragIndex(null)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const success = await onSave(formData)

      if (success) {
        toast({
          title: "Portfolio saved",
          description: "Your portfolio has been updated successfully.",
        })
      } else {
        toast({
          title: "Error",
          description: "Failed to save your portfolio. Please try again.",
          variant: "destructive",
        })
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <div className="space-y-4">
        <h3 className="text-lg font-medium text-teal">Personal Information</h3>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="name">Full Name</Label>
            <Input
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="John Doe"
              className="border-input focus-visible:ring-teal"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="title">Professional Title</Label>
            <Input
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Full Stack Developer"
              className="border-input focus-visible:ring-teal"
            />
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="bio">Bio</Label>
          <Textarea
            id="bio"
            name="bio"
            value={formData.bio}
            onChange={handleChange}
            placeholder="Write a short bio about yourself..."
            className="min-h-[120px] border-input focus-visible:ring-teal"
          />
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-medium text-teal">Skills</h3>
        <div className="flex flex-wrap gap-2">
          {formData.skills.map((skill) => (
            <div key={skill} className="flex items-center gap-1 rounded-full bg-teal/10 px-3 py-1 text-sm">
              {skill}
              <button
                type="button"
                onClick={() => handleRemoveSkill(skill)}
                className="ml-1 rounded-full p-1 hover:bg-teal/20"
              >
                <Trash2 className="h-3 w-3" />
                <span className="sr-only">Remove {skill}</span>
              </button>
            </div>
          ))}
        </div>
        <div className="flex gap-2">
          <Input
            value={newSkill}
            onChange={(e) => setNewSkill(e.target.value)}
            placeholder="Add a skill (e.g. React, Node.js)"
            className="border-input focus-visible:ring-teal"
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault()
                handleAddSkill()
              }
            }}
          />
          <Button type="button" onClick={handleAddSkill} size="sm" className="bg-teal hover:bg-teal/90">
            Add
          </Button>
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-medium text-teal">Projects</h3>
          <Button
            type="button"
            onClick={handleAddProject}
            size="sm"
            variant="outline"
            className="border-teal text-teal hover:bg-teal/10"
          >
            <Plus className="mr-2 h-4 w-4" />
            Add Project
          </Button>
        </div>

        {formData.projects.length === 0 && (
          <div className="rounded-lg border border-dashed p-8 text-center">
            <h4 className="text-sm font-medium">No projects added</h4>
            <p className="mt-1 text-sm text-muted-foreground">Add your first project to showcase your work.</p>
            <Button
              type="button"
              onClick={handleAddProject}
              variant="outline"
              className="mt-4 border-teal text-teal hover:bg-teal/10"
            >
              <Plus className="mr-2 h-4 w-4" />
              Add Project
            </Button>
          </div>
        )}

        <div className="space-y-6">
          {formData.projects.map((project, index) => (
            <Card key={project.id} className="overflow-hidden border-muted hover:border-teal transition-colors" onDragOver={handleDragOver} onDrop={() => handleDrop(index)}>
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2" draggable onDragStart={() => handleDragStart(index)}>
                    <GripVertical className="h-4 w-4 text-muted-foreground cursor-grab" />
                    <h4 className="text-lg font-medium text-teal">{project.title || "New Project"}</h4>
                  </div>
                  <Button
                    type="button"
                    onClick={() => handleRemoveProject(project.id)}
                    size="sm"
                    variant="ghost"
                    className="text-coral hover:bg-coral/10 hover:text-coral"
                  >
                    <Trash2 className="h-4 w-4" />
                    <span className="sr-only">Remove project</span>
                  </Button>
                </div>

                <Tabs
                  defaultValue="details"
                  className="w-full"
                  onValueChange={(value) => {
                    if (value === "assets") {
                      setActiveProjectId(project.id)
                    }
                  }}
                >
                  <TabsList className="grid w-full grid-cols-2 mb-4">
                    <TabsTrigger value="details">Details</TabsTrigger>
                    <TabsTrigger value="assets">Assets</TabsTrigger>
                  </TabsList>

                  <TabsContent value="details" className="space-y-4">
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor={`project-${project.id}-title`}>Title</Label>
                        <Input
                          id={`project-${project.id}-title`}
                          value={project.title}
                          onChange={(e) => handleProjectChange(project.id, "title", e.target.value)}
                          placeholder="Project Title"
                          className="border-input focus-visible:ring-teal"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor={`project-${project.id}-url`}>Project URL</Label>
                        <Input
                          id={`project-${project.id}-url`}
                          value={project.projectUrl}
                          onChange={(e) => handleProjectChange(project.id, "projectUrl", e.target.value)}
                          placeholder="https://example.com"
                          className="border-input focus-visible:ring-teal"
                        />
                      </div>
                      <div className="space-y-2 sm:col-span-2">
                        <Label htmlFor={`project-${project.id}-description`}>Description</Label>
                        <Textarea
                          id={`project-${project.id}-description`}
                          value={project.description}
                          onChange={(e) => handleProjectChange(project.id, "description", e.target.value)}
                          placeholder="Describe your project..."
                          className="border-input focus-visible:ring-teal"
                        />
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="assets" className="space-y-4">
                    <div className="space-y-4">
                      <div className="flex flex-col gap-2">
                        <Label>Project Assets (Images/Videos)</Label>

                        {project.assets && project.assets.length > 0 ? (
                          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-2">
                            {project.assets.map((asset) => (
                              <div key={asset.id} className="relative group border rounded-md overflow-hidden">
                                {asset.type === "image" ? (
                                  <div className="aspect-video bg-muted flex items-center justify-center">
                                    <img
                                      src={asset.url || "/placeholder.svg"}
                                      alt="Project asset"
                                      className="w-full h-full object-cover"
                                      onError={(e) => {
                                        e.target.src = "/placeholder.svg?height=200&width=300"
                                      }}
                                    />
                                  </div>
                                ) : (
                                  <div className="aspect-video bg-muted flex items-center justify-center">
                                    <video src={asset.url} controls className="w-full h-full object-cover" />
                                  </div>
                                )}
                                <Button
                                  type="button"
                                  variant="destructive"
                                  size="sm"
                                  className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                                  onClick={() => handleRemoveAsset(project.id, asset.id)}
                                >
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                                <div className="p-2 text-xs truncate">{asset.url.split("/").pop()}</div>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <div className="text-sm text-muted-foreground">
                            No assets added yet. Add images or videos to showcase your project.
                          </div>
                        )}
                      </div>

                      <div className="flex flex-col gap-2">
                        <Label>Add New Asset</Label>
                        <div className="flex gap-2">
                          <div className="flex-1">
                            <Input
                              value={newAssetUrl}
                              onChange={(e) => setNewAssetUrl(e.target.value)}
                              placeholder="Enter image or video URL"
                              className="border-input focus-visible:ring-teal"
                            />
                          </div>
                          <select
                            value={newAssetType}
                            onChange={(e) => setNewAssetType(e.target.value)}
                            className="px-3 py-2 rounded-md border border-input bg-transparent"
                          >
                            <option value="image">Image</option>
                            <option value="video">Video</option>
                          </select>
                          <Button
                            type="button"
                            onClick={() => handleAddAsset(project.id)}
                            className="bg-teal hover:bg-teal/90"
                          >
                            Add
                          </Button>
                        </div>
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-medium text-teal">Social Links</h3>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="github">GitHub</Label>
            <Input
              id="github"
              name="social.github"
              value={formData.social?.github || ""}
              onChange={handleChange}
              placeholder="https://github.com/username"
              className="border-input focus-visible:ring-teal"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="linkedin">LinkedIn</Label>
            <Input
              id="linkedin"
              name="social.linkedin"
              value={formData.social?.linkedin || ""}
              onChange={handleChange}
              placeholder="https://linkedin.com/in/username"
              className="border-input focus-visible:ring-teal"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="twitter">Twitter</Label>
            <Input
              id="twitter"
              name="social.twitter"
              value={formData.social?.twitter || ""}
              onChange={handleChange}
              placeholder="https://twitter.com/username"
              className="border-input focus-visible:ring-teal"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="website">Personal Website</Label>
            <Input
              id="website"
              name="social.website"
              value={formData.social?.website || ""}
              onChange={handleChange}
              placeholder="https://example.com"
              className="border-input focus-visible:ring-teal"
            />
          </div>
        </div>
      </div>

      <Button type="submit" disabled={isLoading} className="w-full bg-teal hover:bg-teal/90">
        {isLoading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Saving...
          </>
        ) : (
          "Save Portfolio"
        )}
      </Button>
    </form>
  )
}

