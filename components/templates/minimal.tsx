'use client';

import { Github, Globe, Linkedin, Twitter } from "lucide-react"
import { useState, useEffect, useRef } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Portfolio } from "@/lib/types";

function Carousel({ assets }: { assets: any[] }) {
  const [nav1, setNav1] = useState<Slider | null>(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const slider1 = useRef<Slider>(null);
  const slider2 = useRef<Slider>(null);
  const carouselRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setNav1(slider1.current);
  }, []);

  useEffect(() => {
    if (carouselRef.current) {
      const prevArrow = carouselRef.current.querySelector('.slick-prev');
      const nextArrow = carouselRef.current.querySelector('.slick-next');
      
      if (prevArrow && nextArrow) {
        prevArrow.classList.remove('pulse-last');
        nextArrow.classList.remove('pulse-first');
        
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
          <div style={{ backgroundColor: '#146864' }} className="w-5 h-5 rounded-lg" />
        </a>
      );
    },
  };

  const thumbSettings = {
    arrows: false,
    asNavFor: nav1 as Slider,
    slidesToShow: assets.length >= 3 ? 3 : assets.length,
    swipeToSlide: true,
    focusOnSelect: true,
  };

  return (
    <div className="relative" ref={carouselRef}>
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
      
      <style jsx global>{`
        .slick-prev {
          display: ${currentSlide === 0 ? 'none' : 'block'} !important;
        }
        
        .slick-next {
          display: ${currentSlide === assets.length - 1 ? 'none' : 'block'} !important;
        }
      `}</style>
    </div>
  );
}

export function MinimalTemplate({ portfolio }: { portfolio: Portfolio }) {
  const { data } = portfolio

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b">
        <div className="container flex h-16 items-center justify-between px-4 md:px-6">
          <div className="flex items-center gap-2 font-bold text-xl">
            <span className="text-teal">{data.name}</span>
          </div>
          <nav className="hidden md:flex gap-6">
            <a href="#about" className="text-sm font-medium hover:text-teal transition-colors">
              About
            </a>
            <a href="#projects" className="text-sm font-medium hover:text-teal transition-colors">
              Projects
            </a>
            <a href="#skills" className="text-sm font-medium hover:text-teal transition-colors">
              Skills
            </a>
          </nav>
          <div className="flex gap-4">
            {data.social?.github && (
              <a href={data.social.github} target="_blank" rel="noopener noreferrer">
                <Button variant="ghost" size="icon" className="hover:text-teal">
                  <Github className="h-5 w-5" />
                  <span className="sr-only">GitHub</span>
                </Button>
              </a>
            )}
            {data.social?.linkedin && (
              <a href={data.social.linkedin} target="_blank" rel="noopener noreferrer">
                <Button variant="ghost" size="icon" className="hover:text-teal">
                  <Linkedin className="h-5 w-5" />
                  <span className="sr-only">LinkedIn</span>
                </Button>
              </a>
            )}
            {data.social?.twitter && (
              <a href={data.social.twitter} target="_blank" rel="noopener noreferrer">
                <Button variant="ghost" size="icon" className="hover:text-teal">
                  <Twitter className="h-5 w-5" />
                  <span className="sr-only">Twitter</span>
                </Button>
              </a>
            )}
            {data.social?.website && (
              <a href={data.social.website} target="_blank" rel="noopener noreferrer">
                <Button variant="ghost" size="icon" className="hover:text-teal">
                  <Globe className="h-5 w-5" />
                  <span className="sr-only">Website</span>
                </Button>
              </a>
            )}
          </div>
        </div>
      </header>
      <main className="container py-12 px-4 md:px-6">
        <section id="about" className="mb-16">
          <h1 className="text-4xl font-bold mb-2 text-teal">{data.name}</h1>
          <h2 className="text-2xl text-muted-foreground mb-6">{data.title}</h2>
          <p className="max-w-2xl text-lg">{data.bio}</p>
        </section>

        <section id="skills" className="mb-16">
          <h2 className="text-2xl font-bold mb-6 text-teal">Skills</h2>
          <div className="flex flex-wrap gap-2">
            {data.skills.map((skill) => (
              <div key={skill} className="rounded-full bg-teal/10 px-3 py-1 text-sm">
                {skill}
              </div>
            ))}
          </div>
        </section>

        <section id="projects">
          <h2 className="text-2xl font-bold mb-6 text-teal">Projects</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {data.projects.map((project) => (
              <Card key={project.id} className="overflow-hidden border hover:border-teal transition-colors">
                {project.assets && project.assets.length > 0 && (
                  <Carousel assets={project.assets} />
                )}
                <CardContent className="p-4">
                  <h3 className="text-xl font-bold mb-2 text-teal">{project.title}</h3>
                  <p className="text-muted-foreground mb-4">{project.description}</p>

                  {project.assets && project.assets.length > 1 && (
                    <div className="flex gap-2 mb-4 overflow-x-auto pb-2">
                      {project.assets.slice(1).map((asset, index) => (
                        <div key={asset.id} className="flex-shrink-0 w-16 h-16 rounded overflow-hidden border">
                          {asset.type === "image" ? (
                            <img
                              src={asset.url || "/placeholder.svg"}
                              alt={`${project.title} asset ${index + 2}`}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <div className="w-full h-full bg-navy/20 flex items-center justify-center">
                              <video className="w-6 h-6" />
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  )}

                  {project.projectUrl && (
                    <Button asChild variant="outline" size="sm" className="border-teal text-teal hover:bg-teal/10">
                      <a href={project.projectUrl} target="_blank" rel="noopener noreferrer">
                        View Project
                      </a>
                    </Button>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      </main>
      <footer className="border-t py-6">
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
  )
}
