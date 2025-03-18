"use client";

import { Github, Globe, Linkedin, Twitter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState, useEffect, useRef } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function Carousel({ assets }: { assets: any[] }) {
  const [nav1, setNav1] = useState<Slider | null>(null);
  const slider1 = useRef<Slider>(null);
  const slider2 = useRef<Slider>(null);

  useEffect(() => {
    setNav1(slider1.current);
  }, []);

  const mainSettings = {
    arrows: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    infinite: true,
    autoplay: false,
    dots: true,
    focusOnSelect: true,
    customPaging: (i: number) => {
      const asset = assets[i];
      return (
        <a>
          <div style={{ backgroundColor: '#146864' }} className="w-5 h-5 rounded-lg"
          />
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
    <div>
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

export function CreativeTemplate({ portfolio }) {
  const { data } = portfolio;

  return (
    <div className="min-h-screen bg-navy text-white">
      <div className="container px-4 md:px-6 py-10">
        <header className="mb-20">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <h1 className="text-4xl md:text-5xl font-bold text-teal">
              {data.name}
            </h1>
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
                    className="rounded-full border-white/20 bg-transparent hover:bg-teal/10 hover:border-teal"
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
                    className="rounded-full border-white/20 bg-transparent hover:bg-teal/10 hover:border-teal"
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
                    className="rounded-full border-white/20 bg-transparent hover:bg-teal/10 hover:border-teal"
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
                <h2 className="text-3xl font-bold mb-4 text-coral">
                  {data.title}
                </h2>
                <p className="text-xl text-white/80">{data.bio}</p>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-4 text-coral">
                  Skills
                </h3>
                <div className="flex flex-wrap gap-2">
                  {data.skills.map((skill) => (
                    <div
                      key={skill}
                      className="rounded-full bg-teal/10 px-4 py-1.5 text-sm"
                    >
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
                  className={`grid grid-cols-1 md:grid-cols-2 gap-10 ${
                    index % 2 === 1 ? "md:flex-row-reverse" : ""
                  }`}
                >
                  <div className="space-y-4">
                    {project.assets && project.assets.length > 0 && (
                      <Carousel assets={project.assets} />
                    )}
                  </div>

                  <div className="flex flex-col justify-center">
                    <h3 className="text-2xl font-bold mb-4 text-teal">
                      {project.title}
                    </h3>
                    <p className="text-white/70 mb-6">{project.description}</p>
                    {project.projectUrl && (
                      <Button
                        asChild
                        variant="outline"
                        className="w-fit border-teal bg-transparent hover:bg-teal/10 text-teal"
                      >
                        <a
                          href={project.projectUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
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
  );
}
