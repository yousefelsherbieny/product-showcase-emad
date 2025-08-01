"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import {
  motion,
  useScroll,
  useTransform,
  AnimatePresence,
} from "framer-motion";
import { ChevronDown, ShoppingBag, Heart, Star } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { TextPlugin } from "gsap/TextPlugin";

import { Button } from "@/components/ui/button";
import ProductViewer from "@/components/product-viewer";
import TestimonialCard from "@/components/testimonial-card";
import ColorPicker from "@/components/color-picker";
import ScrollAnimationSection from "@/components/scroll-animation-section";
import InteractiveModelsSection from "@/components/interactive-models-section";
import ProductGallery from "@/components/product-gallery";
import AnimatedText from "@/components/animated-text";
import FloatingText from "@/components/floating-text";
import TextScramble from "@/components/text-scramble";
import ObjectParticles from "@/components/backgrounds/object-particles";
import Navbar from "@/components/navbar";
import ExplodingGrid from "@/components/ExplodingGrid";
import HorizontalScrollSection from "@/components/HorizontalScrollSection";
import AutoMovingGallery from "@/components/auto-moving-gallery";
import ArchitectureSection from "@/components/architecture-section";
import ImageRippleWidget from "@/components/ImageRippleWidget";
import ScrollTriggerGallery from "@/components/scroll-trigger-gallery";
import HomeCoursesSection from "@/components/home-courses-section";
gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const [activeColor, setActiveColor] = useState("blue");
  const [isLoaded, setIsLoaded] = useState(false);
  const targetRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end start"],
  });

  const headerOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const headerY = useTransform(scrollYProgress, [0, 0.2], [0, -100]);

  const handleColorChange = (color: string) => {
    setActiveColor(color);
  };

  // Initialize GSAP
  useEffect(() => {
    // Register GSAP plugins
    gsap.registerPlugin(ScrollTrigger, TextPlugin);

    // Simulate loading
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  // Hero section text animations
  useEffect(() => {
    if (isLoaded && heroRef.current) {
      // Create a timeline for hero animations
      const tl = gsap.timeline();

      // Animate the eyebrow text
      const eyebrowElement = document.querySelector(".hero-eyebrow");
      if (eyebrowElement) {
        tl.from(".hero-eyebrow", {
          opacity: 0,
          y: 20,
          duration: 0.8,
          ease: "power3.out",
        });
      }

      // Manual text splitting for the heading
      const headingElement = document.querySelector(".hero-heading");
      if (headingElement) {
        const text = headingElement.textContent || "";
        const chars = [];

        // Clear the content
        headingElement.innerHTML = "";

        // Create spans for each character
        text.split("").forEach((char) => {
          const span = document.createElement("span");
          span.style.display = "inline-block";
          span.textContent = char === " " ? "\u00A0" : char; // Use non-breaking space for spaces
          headingElement.appendChild(span);
          chars.push(span);
        });

        // Animate the characters
        tl.from(
          chars,
          {
            opacity: 0,
            y: 50,
            rotationX: -90,
            stagger: 0.02,
            duration: 0.8,
            ease: "back.out(1.7)",
          },
          "-=0.4"
        );
      }

      // Animate the subheading
      const subheadingElement = document.querySelector(".hero-subheading");
      if (subheadingElement) {
        tl.from(
          ".hero-subheading",
          {
            opacity: 0,
            y: 30,
            duration: 0.8,
            ease: "power3.out",
          },
          "-=0.6"
        );
      }

      // Animate the buttons
      const buttonElements = document.querySelectorAll(".hero-buttons button");
      if (buttonElements.length > 0) {
        tl.from(
          ".hero-buttons button",
          {
            opacity: 0,
            y: 20,
            stagger: 0.2,
            duration: 0.6,
            ease: "power3.out",
          },
          "-=0.4"
        );
      }

      // Create floating animation for the scroll indicator
      const scrollIndicator = document.querySelector(".scroll-indicator");
      if (scrollIndicator) {
        gsap.to(".scroll-indicator", {
          y: 15,
          duration: 1.5,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });
      }
    }
  }, [isLoaded]);
  // 3D Characters Gallery Data

  const images = [
    "https://images.pexels.com/photos/30082445/pexels-photo-30082445.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    "https://images.unsplash.com/photo-1692606743169-e1ae2f0a960f?q=80&w=3560&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1709949908058-a08659bfa922?q=80&w=1200&auto=format",
    "https://images.unsplash.com/photo-1548192746-dd526f154ed9?q=80&w=1200&auto=format",
    "https://images.unsplash.com/photo-1644141655284-2961181d5a02?q=80&w=3000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.pexels.com/photos/30082445/pexels-photo-30082445.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    "https://assets.lummi.ai/assets/QmNfwUDpehZyLWzE8to7QzgbJ164S6fQy8JyUWemHtmShj?auto=format&w=1500",
    "https://images.unsplash.com/photo-1706049379414-437ec3a54e93?q=80&w=1200&auto=format",
    "https://assets.lummi.ai/assets/Qmb2P6tF2qUaFXnXpnnp2sk9HdVHNYXUv6MtoiSq7jjVhQ?auto=format&w=1500",
    "https://images.unsplash.com/photo-1508873881324-c92a3fc536ba?q=80&w=1200&auto=format",
  ];

  const charactersGallery = [
    {
      id: "cc4-male-1",
      title: "Professional Male Character",
      category: "CC4 Characters",
      image: "/dde.jpg",
      description:
        "High-quality business professional character with detailed facial features and realistic clothing.",
    },
    {
      id: "cc4-female-1",
      title: "Modern Female Character",
      category: "CC4 Characters",
      image: "/dfg.png",
      description:
        "Contemporary female character with stylish outfit and expressive facial animations.",
    },
    {
      id: "metahuman-1",
      title: "Photorealistic Human",
      category: "MetaHuman",
      image: "/dyyd.png",
      description:
        "Ultra-realistic digital human created with Unreal Engine's MetaHuman Creator technology.",
    },
    {
      id: "metahuman-2",
      title: "Fantasy Character",
      category: "MetaHuman",
      image: "/eed.jpg",
      description:
        "Fantasy-themed character with unique features and magical elements.",
    },
    {
      id: "custom-human-1",
      title: "Custom Avatar",
      category: "Custom Humans",
      image: "/hfz.jpg",
      description:
        "Personalized human character designed to match specific requirements and brand identity.",
    },
    {
      id: "custom-human-2",
      title: "Brand Ambassador",
      category: "Custom Humans",
      image: "Screenshot 2025-07-23 034028.png",
      description:
        "Professional brand representative character for marketing and promotional content.",
    },
    {
      id: "animal-1",
      title: "Realistic Wolf",
      category: "Animals",
      image: "Screenshot 2025-07-23 034310.png",
      description:
        "Highly detailed wolf character with realistic fur and natural animations.",
    },
    {
      id: "animal-2",
      title: "Majestic Eagle",
      category: "Animals",
      image: "/Screenshot 2025-07-23 032747.png",
      description:
        "Soaring eagle with detailed feathers and dynamic flight animations.",
    },
    {
      id: "custom-animal-1",
      title: "Cartoon Dog",
      category: "Custom Animals",
      image: "/Screenshot 2025-07-23 033020.png",
      description:
        "Stylized cartoon dog character perfect for children's content and games.",
    },
    {
      id: "custom-animal-2",
      title: "Fantasy Dragon",
      category: "Custom Animals",
      image: "/Screenshot 2025-07-23 033354.png",
      description:
        "Mythical dragon character with fire-breathing animations and magical effects.",
    },
  ];
  const testimonials = [
    {
      id: 1,
      name: "Alex Johnson",
      role: "Professional Designer",
      content:
        "These products have completely transformed my workflow. The quality and attention to detail are unmatched in the industry.",
      rating: 5,
      image: "/images/product-blue.jpeg",
    },
    {
      id: 2,
      name: "Samantha Lee",
      role: "Tech Enthusiast",
      content:
        "I've tried many similar products, but this collection stands out with its durability and elegant design. Absolutely worth every penny.",
      rating: 4,
      image: "/images/product-pink.jpeg",
    },
    {
      id: 3,
      name: "Michael Torres",
      role: "Student",
      content:
        "As someone who values both function and style, I couldn't be happier with my purchase. The colors are vibrant and the quality is exceptional.",
      rating: 5,
      image: "/images/product-purple.jpeg",
    },
  ];

  return (
    <main
      className="relative min-h-screen overflow-x-hidden bg-gray-900 text-white"
      ref={targetRef}
    >
      {/* Full-screen 3D objects background */}
      <div className="fixed inset-0 z-0">
        <ObjectParticles count={40} background="#111827" />
        <div className="absolute inset-0 bg-gradient-to-b from-gray-900/70 via-transparent to-gray-900/70 pointer-events-none"></div>
      </div>
      {/* Loading screen with logo */}
      <AnimatePresence>
        {!isLoaded && (
          <motion.div
            className="fixed inset-0 bg-gray-900 z-50 flex flex-col items-center justify-center"
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="mb-6"
            >
              <h1 className="text-5xl font-bold text-white">SWAGIFYY</h1>
            </motion.div>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="w-16 h-1 bg-primary rounded-full overflow-hidden"
            >
              <motion.div
                className="h-full bg-white"
                initial={{ x: "-100%" }}
                animate={{ x: "100%" }}
                transition={{
                  repeat: Number.POSITIVE_INFINITY,
                  duration: 1.5,
                  ease: "linear",
                }}
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      {/* Navbar */}
      <Navbar />
      {/* ───────── HERO SECTION ───────── */}
      <motion.section
        ref={heroRef}
        className="min-h-screen relative flex items-center justify-center overflow-hidden z-10 pt-20"
        style={{ opacity: headerOpacity, y: headerY }}
      >
        {/* ── looping video background ───────────────────────────── */}
        <video
          className="absolute inset-0 w-full h-full object-cover opacity-80 pointer-events-none"
          autoPlay
          loop
          muted
          playsInline
          src="/0728(1).mp4"
        />

        {/* optional dark tint over video (adjust / delete if not needed) */}
        {/* <div className="absolute inset-0 bg-black/15 mix-blend-multiply pointer-events-none" /> */}

        {/* ── foreground content ────────────────────────────────── */}
        <div className="container mx-auto px-6 z-10 pt-20">
          <div className="text-center max-w-3xl mx-auto relative z-10">
            {/* eyebrow */}

            {/* main headline */}
            <h1 className="mb-14">
              <span
                className="
            inline-block rounded-3xl bg-gray-800/60 backdrop-blur-sm
            px-6 py-3
          "
              >
                <span
                  className="
              text-5xl sm:text-7xl lg:text-8xl font-extrabold 
            "
                >
                  SWAGIFYY
                </span>
              </span>
            </h1>

            {/* strap‑line */}
            <p
              className="
    hero-subheading
    max-w-6xl   
    mx-auto  
    rounded-3xl bg-gray-800/60 backdrop-blur-sm
    text-gray-200 text-base sm:text-xl md:text-2xl leading-relaxed
    px-6 py-4 mb-10
  "
            >
              Swagifyy for advanced&nbsp;3D courses, events, architectural
              products &amp; cutting‑edge animation services.
            </p>

            {/* action buttons */}
            <div className="hero-buttons flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="group relative overflow-hidden">
                <span className="relative z-10">Shop Now</span>
                <span className="absolute inset-0 bg-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <ShoppingBag className="ml-2 h-5 w-5 inline" />
              </Button>

              <Button
                variant="outline"
                size="lg"
                className="group hover:border-primary bg-gray-800/50 text-white"
              >
                <span className="group-hover:text-primary transition-colors duration-300">
                  View Catalog
                </span>
                <span className="ml-2 group-hover:translate-x-1 transition-transform duration-300 inline-block">
                  →
                </span>
              </Button>
            </div>
          </div>

          {/* floating chevron */}
          <div className="scroll-indicator absolute bottom-8 left-1/2 -translate-x-1/2 text-white">
            <ChevronDown size={30} />
          </div>
        </div>
      </motion.section>
      {/* <ScrollTriggerGallery /> */}
      {/* Hover photos Section */}
      {/* 
      <section className="py-32">
        <ImageRippleWidget />
      </section> */}
      <HomeCoursesSection />
      {/* 3D Characters Gallery Section */}
      <section className="py-20 relative z-10 bg-gradient-to-b from-gray-900 to-gray-800">
        <div className="container mx-auto px-6 mb-12">
          <div className="text-center">
            <AnimatedText
              type="words"
              stagger={0.05}
              y={30}
              className="text-4xl md:text-5xl font-bold mb-6 text-whiteinline-block rounded-3xl bg-orange-800/60 backdrop-blur-sm
            px-6 py-3
         "
              onScrollTrigger={true}
            >
              From CC4 to MetaHuman & Beyond
            </AnimatedText>

            <AnimatedText
              type="lines"
              stagger={0.08}
              y={20}
              className="text-lg text-gray-300 max-w-3xl mx-auto"
              onScrollTrigger={true}
            >
              Discover our extensive collection of 3D characters, from
              professional CC4 models to photorealistic MetaHumans, custom
              characters, and stylized animals.
            </AnimatedText>
          </div>
        </div>

        <AutoMovingGallery items={charactersGallery} speed={60} />
      </section>
      <ArchitectureSection />
      <ExplodingGrid />
      {/* <HorizontalScrollSection /> */}
      {/* ------------------ 3‑D Product / Jacket slice -------------- */}
      {/* <section className="w-full relative z-10 bg-gradient-to-b from-gray-900 via-gray-900 to-gray-800">
        <div className="w-full px-0">
          <div className="text-center py-16">
            <AnimatedText
              type="chars"
              stagger={0.02}
              y={20}
              className="text-sm font-medium tracking-wider uppercase text-primary inline-block px-3 py-1 rounded-full bg-primary/20 mb-2"
              onScrollTrigger
            />
            <AnimatedText
              type="words"
              stagger={0.05}
              y={30}
              className="text-3xl md:text-4xl font-bold mb-4 text-white"
              onScrollTrigger
            >
              Interact With Our 3D Products
            </AnimatedText>
            <AnimatedText
              type="lines"
              stagger={0.08}
              y={20}
              className="text-lg text-gray-300 max-w-2xl mx-auto px-6"
              onScrollTrigger
            >
              SWAGIFYY brings products to life with immersive 3D technology.
              Examine every angle and detail before making your purchase.
            </AnimatedText>
          </div>

          <div className="w-full grid md:grid-cols-2 gap-0">
            <div
              className="
                relative w-full
                h-[80vh] md:h-[80vh]
                bg-gray-800/50 backdrop-blur-sm
                overflow-hidden
                will-change-transform
                sticky top-20
              "
            >
              <div
                className="absolute inset-0"
                style={{ transform: "translateZ(0)" }}
              >
                <ProductViewer modelPath="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/jacket-5ubbNEPTyi791kYKsxyo33s45TR5Ti.glb" />
              </div>
            </div>

            <div className="h-[80vh] flex items-center justify-center p-8 md:p-12 bg-gray-800/30">
              <div className="space-y-6 max-w-lg">
                <div className="space-y-4">
                  <AnimatedText
                    type="words"
                    stagger={0.05}
                    y={20}
                    className="text-2xl font-bold text-white"
                    onScrollTrigger
                  >
                    Premium Urban Jacket
                  </AnimatedText>
                  <AnimatedText
                    type="lines"
                    stagger={0.08}
                    y={20}
                    className="text-gray-300"
                    onScrollTrigger
                  >
                    Our 3D‑designed products combine cutting‑edge technology
                    with premium materials. Experience the future of online
                    shopping with SWAGIFYY.
                  </AnimatedText>

                  <div className="flex items-center gap-1 mb-4">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <Star
                        key={s}
                        className="w-5 h-5 fill-primary text-primary"
                      />
                    ))}
                    <span className="ml-2 text-sm text-gray-300">
                      (128 reviews)
                    </span>
                  </div>

                  <FloatingText
                    amplitude={5}
                    frequency={3}
                    direction="vertical"
                    className="text-2xl font-bold text-white"
                  >
                    $149.99
                  </FloatingText>
                </div>

                <div className="space-y-4">
                  <p className="font-medium text-white">Select Color:</p>
                  <ColorPicker
                    activeColor={activeColor}
                    onChange={handleColorChange}
                  />
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                  <Link href="/cart" passHref>
                    <Button size="lg" className="flex-1 group">
                      <ShoppingBag className="mr-2 h-5 w-5" />
                      <span>Add to Cart</span>
                    </Button>
                  </Link>

                  <Button
                    variant="outline"
                    size="lg"
                    className="flex-1 group bg-gray-800/50 text-white hover:bg-pink-900/30"
                  >
                    <Heart className="mr-2 h-5 w-5 group-hover:fill-pink-500 group-hover:text-pink-500 transition-colors duration-300" />
                    <span className="group-hover:text-pink-500 transition-colors duration-300">
                      Add to Wishlist
                    </span>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section> */}
      {/* 3D Product Viewer Section */}
      {/* Interactive Models Section with Hover Effects */}
      {/* <InteractiveModelsSection /> */}
      {/* Scroll Animation Section */}
      {/* <ScrollAnimationSection /> */}
      Product Collection
      <section className="py-20 relative z-10">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <AnimatedText
              type="chars"
              stagger={0.02}
              y={20}
              className="text-sm font-medium tracking-wider uppercase text-primary inline-block px-3 py-1 rounded-full bg-primary/20 mb-2"
              onScrollTrigger={true}
            >
              Our Collections
            </AnimatedText>

            <AnimatedText
              type="words"
              stagger={0.05}
              y={30}
              className="text-3xl md:text-4xl font-bold mb-4 text-white"
              onScrollTrigger={true}
            >
              Explore Our 3D Product Collections
            </AnimatedText>

            <AnimatedText
              type="lines"
              stagger={0.08}
              y={20}
              className="text-lg text-gray-300 max-w-2xl mx-auto"
              onScrollTrigger={true}
            >
              Browse through our interactive 3D collections. Each product can be
              viewed and manipulated in real-time for a true-to-life shopping
              experience.
            </AnimatedText>
          </div>

          <ProductGallery />
        </div>
      </section>
      {/* Testimonials Section */}
      <section className="py-20 relative z-10">
        <div className="absolute inset-0 bg-gray-800/30 backdrop-blur-sm"></div>
        <div className="container mx-auto px-6 relative">
          <div className="text-center mb-12">
            <AnimatedText
              type="chars"
              stagger={0.02}
              y={20}
              className="text-sm font-medium tracking-wider uppercase text-primary inline-block px-3 py-1 rounded-full bg-primary/20 mb-2"
              onScrollTrigger={true}
            >
              Customer Reviews
            </AnimatedText>

            <TextScramble
              phrases={[
                "What Our Customers Say",
                "Real People, Real Reviews",
                "Trusted Testimonials",
              ]}
              className="text-3xl md:text-4xl font-bold mb-4 text-white"
              speed={0.1}
              delay={4}
            />

            <AnimatedText
              type="lines"
              stagger={0.08}
              y={20}
              className="text-lg text-gray-300 max-w-2xl mx-auto"
              onScrollTrigger={true}
            >
              Don't just take our word for it. See what our customers have to
              say about our products.
            </AnimatedText>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial) => (
              <TestimonialCard key={testimonial.id} testimonial={testimonial} />
            ))}
          </div>
        </div>
      </section>
      {/* CTA Section */}
      <section className="py-20 relative z-10">
        <div className="absolute inset-0 bg-gray-800/50 backdrop-blur-sm"></div>
        <div className="container mx-auto px-6 relative">
          <div className="max-w-3xl mx-auto text-center">
            <AnimatedText
              type="words"
              stagger={0.05}
              y={30}
              className="text-3xl md:text-5xl font-bold mb-6 text-white"
              onScrollTrigger={true}
            >
              Experience Shopping in 3D
            </AnimatedText>

            <AnimatedText
              type="lines"
              stagger={0.08}
              y={20}
              className="text-lg md:text-xl text-gray-300 mb-8"
              onScrollTrigger={true}
            >
              Join thousands of customers who have discovered the future of
              online shopping with SWAGIFYY's interactive 3D product
              experiences.
            </AnimatedText>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="bg-primary hover:bg-primary/90 text-white px-8 py-6 text-lg"
              >
                Shop the Collection
              </Button>

              <Button
                variant="outline"
                size="lg"
                className="border-primary text-primary hover:bg-primary/10 px-8 py-6 text-lg bg-gray-800/50"
              >
                View Catalog
              </Button>
            </div>
          </div>
        </div>
      </section>
      {/* Footer */}
      <footer className="py-12 bg-gray-900/80 backdrop-blur-md text-white relative z-10 border-t border-gray-800">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">SWAGIFYY</h3>
              <p className="text-gray-400">
                Revolutionizing online shopping with interactive 3D product
                experiences and cutting-edge technology.
              </p>
            </div>

            <div>
              <h4 className="font-bold mb-4">Shop</h4>
              <ul className="space-y-2">
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    All Products
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Featured
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    New Arrivals
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Sale
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold mb-4">Company</h4>
              <ul className="space-y-2">
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    About Us
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Sustainability
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Press
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Careers
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold mb-4">Customer Service</h4>
              <ul className="space-y-2">
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Contact Us
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    FAQs
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Shipping & Returns
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Warranty
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400">
              © 2025 SWAGIFYY. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a
                href="#"
                className="text-gray-400 hover:text-white transition-colors"
              >
                Privacy Policy
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-white transition-colors"
              >
                Terms of Service
              </a>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}
