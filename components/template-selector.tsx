"use client"

import { Check } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

const templates = [
  {
    id: "minimal",
    name: "Minimal",
    description: "Clean and simple design focused on your work",
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    id: "modern",
    name: "Modern",
    description: "Contemporary design with bold elements",
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    id: "creative",
    name: "Creative",
    description: "Unique layout to showcase your creativity",
    image: "/placeholder.svg?height=200&width=300",
  },
]

export function TemplateSelector({ selectedTemplate, onSelect }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {templates.map((template) => (
        <div
          key={template.id}
          className={cn(
            "relative overflow-hidden rounded-lg border-2 transition-all",
            selectedTemplate === template.id
              ? "border-teal ring-2 ring-teal ring-offset-2"
              : "border-muted hover:border-teal/50",
          )}
        >
          <div className="aspect-video w-full overflow-hidden">
            <img
              src={template.image || "/placeholder.svg"}
              alt={template.name}
              className="h-full w-full object-cover"
            />
          </div>
          <div className="p-4">
            <h3 className="font-medium">{template.name}</h3>
            <p className="text-sm text-muted-foreground">{template.description}</p>
            <Button
              variant={selectedTemplate === template.id ? "default" : "outline"}
              className={cn(
                "mt-4 w-full",
                selectedTemplate === template.id
                  ? "bg-teal hover:bg-teal/90"
                  : "border-teal text-teal hover:bg-teal/10",
              )}
              onClick={() => onSelect(template.id)}
            >
              {selectedTemplate === template.id ? (
                <>
                  <Check className="mr-2 h-4 w-4" /> Selected
                </>
              ) : (
                "Select Template"
              )}
            </Button>
          </div>
        </div>
      ))}
    </div>
  )
}

