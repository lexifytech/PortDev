"use client";

import { Github, Globe, Linkedin, Twitter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useState, useEffect, useRef } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Portfolio } from "@/lib/types";

function Carousel({ assets }: { assets: any[] }) {
  const [nav1, setNav1] = useState<Slider | null>(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const slider1 = useRef<Slider>(null);
  const slider2 = useRef<Slider>(null);
  const carouselRef = useRef<HTMLDivElement>(null);
  const carouselId = useRef(`carousel-${Math.random().toString(36).substr(2, 9)}`);

  useEffect(() => {
    setNav1(slider1.current);
  }, []);

  useEffect(() => {
    if (carouselRef.current) {
      const prevArrow = carouselRef.current.querySelector('.slick-prev') as HTMLElement;
      const nextArrow = carouselRef.current.querySelector('.slick-next') as HTMLElement;
      
      if (prevArrow && nextArrow) {
        prevArrow.classList.remove('pulse-last');
        nextArrow.classList.remove('pulse-first');
        
        // Control arrow visibility directly
        prevArrow.style.display = currentSlide === 0 ? 'none' : 'block';
        nextArrow.style.display = currentSlide === assets.length - 1 ? 'none' : 'block';
        
        if (currentSlide === 0) {
          nextArrow.classList.add('pulse-first');
        }
        
        if (currentSlide === assets.length - 1) {
          prevArrow.classList.add('pulse-last');
        }
      }
    }
  }, [currentSlide, assets.length]);

  const mainSettings = {
    arrows: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    infinite: false,
    autoplay: false,
    dots: true,
    focusOnSelect: true,
    beforeChange: (current: number, next: number) => {
      setCurrentSlide(next);
    },
    customPaging: (i: number) => {
      const asset = assets[i];
      return (
        <a>
          <div
            style={{ backgroundColor: "#146864" }}
            className="w-5 h-5 rounded-lg"
          />
        </a>
      );
    },
  };

  return (
    <div className={`relative ${carouselId.current}`} ref={carouselRef}>
      <Slider {...mainSettings} ref={slider1}>
        {assets.map((asset, index) => (
          <div key={asset.id || index} className="p-1">
            {asset.type === "image" ? (
              <img
                src={asset.url || "/placeholder.svg"}
                alt={`Slide ${index + 1}`}
                className="w-full h-auto object-cover rounded-lg"
              />
            ) : (
              <video
                src={asset.url}
                controls
                className="w-full h-auto object-cover rounded-lg"
              />
            )}
          </div>
        ))}
      </Slider>
    </div>
  );
}

export function ModernTemplate({ portfolio }: { portfolio: Portfolio }) {
  const { data } = portfolio;

  return (
    <div className="min-h-screen bg-background">
      <div className="container px-4 md:px-6 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
          <div className="lg:col-span-2 lg:sticky lg:top-10 lg:self-start">
            <div className="space-y-8">
              <div className="space-y-2">
                <h1 className="text-4xl font-bold text-teal">{data.name}</h1>
                <h2 className="text-xl text-muted-foreground">{data.title}</h2>
              </div>

              <div>
                <p className="text-lg">{data.bio}</p>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-teal">Skills</h3>
                <div className="flex flex-wrap gap-2">
                  {data.skills.map((skill) => (
                    <div
                      key={skill}
                      className="rounded-md bg-teal/10 px-3 py-1 text-sm"
                    >
                      {skill}
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-teal">Connect</h3>
                <div className="flex gap-3">
                  {data.social?.github && (
                    <a
                      href={data.social.github}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Button
                        variant="outline"
                        size="icon"
                        className="border-teal text-teal hover:bg-teal/10"
                      >
                        <Github className="h-5 w-5" />
                        <span className="sr-only">GitHub</span>
                      </Button>
                    </a>
                  )}
                  {data.social?.linkedin && (
                    <a
                      href={data.social.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Button
                        variant="outline"
                        size="icon"
                        className="border-teal text-teal hover:bg-teal/10"
                      >
                        <Linkedin className="h-5 w-5" />
                        <span className="sr-only">LinkedIn</span>
                      </Button>
                    </a>
                  )}
                  {data.social?.twitter && (
                    <a
                      href={data.social.twitter}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Button
                        variant="outline"
                        size="icon"
                        className="border-teal text-teal hover:bg-teal/10"
                      >
                        <Twitter className="h-5 w-5" />
                        <span className="sr-only">Twitter</span>
                      </Button>
                    </a>
                  )}
                  {data.social?.website && (
                    <a
                      href={data.social.website}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Button
                        variant="outline"
                        size="icon"
                        className="border-teal text-teal hover:bg-teal/10"
                      >
                        <Globe className="h-5 w-5" />
                        <span className="sr-only">Website</span>
                      </Button>
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-3">
            <div className="space-y-10">
              <div>
                <h2 className="text-3xl font-bold mb-6 text-teal">Projects</h2>
                <div className="space-y-10">
                  {data.projects.map((project) => (
                    <div key={project.id} className="space-y-4">
                      <h3 className="text-2xl font-bold text-teal">
                        {project.title}
                      </h3>
                      <p className="mt-2 text-muted-foreground">
                        {project.description}
                      </p>
                      {project.assets && project.assets.length > 0 && (
                        <Carousel assets={project.assets} />
                      )}
                      {project.projectUrl ? (
                        <Button
                          asChild
                          variant="outline"
                          className="mt-4 border-teal text-teal hover:bg-teal/10"
                        >
                          <a
                            href={project.projectUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            View Project
                          </a>
                        </Button>
                      ) : (
                        <div className="h-4" />
                      )}
                      <Separator className="mt-6" />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <footer className="border-t py-6 mt-20">
        <div className="container flex flex-col items-center justify-center gap-4 px-4 md:px-6 text-center">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} {data.name}. All rights reserved.
          </p>
          <p className="text-sm text-muted-foreground">
            Built with{" "}
            <a href="/" className="text-teal hover:underline">
              PortDev
            </a>
          </p>
        </div>
      </footer>
    </div>
  );
}
