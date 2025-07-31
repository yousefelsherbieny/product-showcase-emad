"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

export default function ScrollTriggerGallery() {
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const loaderRef = useRef<HTMLDivElement>(null);
  const demoWrapperRef = useRef<HTMLDivElement>(null);

  // Gallery data
  const galleryData = [
    {
      id: 1,
      images: [
        {
          src: "/placeholder.svg?height=874&width=1240&text=Gallery+1+Image+1",
          alt: "Gallery 1 Image 1",
        },
        {
          src: "/placeholder.svg?height=874&width=1240&text=Gallery+1+Image+2",
          alt: "Gallery 1 Image 2",
        },
        {
          src: "/placeholder.svg?height=874&width=1240&text=Gallery+1+Image+3",
          alt: "Gallery 1 Image 3",
        },
      ],
    },
    {
      id: 2,
      images: [
        {
          src: "/placeholder.svg?height=874&width=1240&text=Gallery+2+Image+1",
          alt: "Gallery 2 Image 1",
        },
        {
          src: "/placeholder.svg?height=874&width=1240&text=Gallery+2+Image+2",
          alt: "Gallery 2 Image 2",
        },
        {
          src: "/placeholder.svg?height=874&width=1240&text=Gallery+2+Image+3",
          alt: "Gallery 2 Image 3",
        },
        {
          src: "/placeholder.svg?height=874&width=1240&text=Gallery+2+Image+4",
          alt: "Gallery 2 Image 4",
        },
      ],
    },
    {
      id: 3,
      images: [
        {
          src: "/placeholder.svg?height=874&width=1240&text=Gallery+3+Image+1",
          alt: "Gallery 3 Image 1",
        },
        {
          src: "/placeholder.svg?height=874&width=1240&text=Gallery+3+Image+2",
          alt: "Gallery 3 Image 2",
        },
        {
          src: "/placeholder.svg?height=874&width=1240&text=Gallery+3+Image+3",
          alt: "Gallery 3 Image 3",
        },
      ],
    },
    {
      id: 4,
      images: [
        {
          src: "/placeholder.svg?height=874&width=1240&text=Gallery+4+Image+1",
          alt: "Gallery 4 Image 1",
        },
        {
          src: "/placeholder.svg?height=874&width=1240&text=Gallery+4+Image+2",
          alt: "Gallery 4 Image 2",
        },
        {
          src: "/placeholder.svg?height=874&width=1240&text=Gallery+4+Image+3",
          alt: "Gallery 4 Image 3",
        },
        {
          src: "/placeholder.svg?height=874&width=1240&text=Gallery+4+Image+4",
          alt: "Gallery 4 Image 4",
        },
      ],
    },
  ];

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    // Simulate image loading
    const totalImages = galleryData.reduce(
      (acc, gallery) => acc + gallery.images.length,
      0
    );
    let loadedImages = 0;

    const simulateImageLoad = () => {
      const interval = setInterval(() => {
        loadedImages++;
        const progress = Math.round((loadedImages * 100) / totalImages);
        setLoadingProgress(progress);

        if (loadedImages >= totalImages) {
          clearInterval(interval);
          setTimeout(() => {
            showDemo();
          }, 500);
        }
      }, 200);
    };

    const showDemo = () => {
      setIsLoaded(true);

      // Hide loader

      // Setup ScrollTrigger animations
      const sections = gsap.utils.toArray(".demo-gallery");

      sections.forEach((section: any, index: number) => {
        const wrapper = section.querySelector(".wrapper");
        if (!wrapper) return;

        const isEven = index % 2 === 0;
        const x = isEven ? "100%" : `${wrapper.scrollWidth * -1}px`;
        const xEnd = isEven
          ? `${(wrapper.scrollWidth - section.offsetWidth) * -1}px`
          : "0%";

        gsap.fromTo(
          wrapper,
          { x },
          {
            x: xEnd,
            scrollTrigger: {
              trigger: section,
              scrub: 0.5,
              start: "top bottom",
              end: "bottom top",
            },
          }
        );
      });
    };

    // Start loading simulation
    simulateImageLoad();

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <section className="relative bg-gray-900 text-white overflow-hidden">
      {/* Loader */}

      {/* Demo Wrapper */}
      <div ref={demoWrapperRef} className="demo-wrapper overflow-x-hidden">
        {/* Header */}
        <header className="h-screen flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-6xl md:text-8xl font-bold mb-4">
              ScrollTrigger
            </h1>
            <h2 className="text-2xl md:text-4xl font-light">demo</h2>
          </div>
        </header>

        {/* Gallery Sections */}
        {galleryData.map((gallery, index) => (
          <section
            key={gallery.id}
            className={`demo-gallery ${
              index === galleryData.length - 1 ? "last" : ""
            } ${index < galleryData.length - 1 ? "pb-4" : ""}`}
          >
            <ul className="wrapper flex">
              {gallery.images.map((image, imgIndex) => (
                <li
                  key={imgIndex}
                  className="flex-shrink-0 w-[clamp(500px,60vw,800px)] pr-4"
                >
                  <Image
                    src={image.src || "/placeholder.svg"}
                    alt={image.alt}
                    width={1240}
                    height={874}
                    className="w-full h-auto bg-gray-200 rounded-lg"
                  />
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </section>
  );
}
