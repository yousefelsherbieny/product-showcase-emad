"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Building2, Users, Calendar, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import AnimatedText from "./animated-text";

export default function ArchitectureSection() {
  const architectureProjects = [
    {
      id: 1,
      title: "Tech Conference 2024",
      location: "Dubai World Trade Centre",
      date: "March 2024",
      attendees: "5,000+",
      image: "/placeholder.svg?height=400&width=600&text=Tech+Conference+Booth",
      description:
        "Modern exhibition booth design with interactive 3D displays and immersive brand experience.",
    },
    {
      id: 2,
      title: "Fashion Week Pavilion",
      location: "Paris Fashion Week",
      date: "February 2024",
      attendees: "2,500+",
      image: "/placeholder.svg?height=400&width=600&text=Fashion+Week+Pavilion",
      description:
        "Elegant architectural structure showcasing luxury fashion brands with premium materials.",
    },
    {
      id: 3,
      title: "Corporate Summit",
      location: "Singapore Expo",
      date: "January 2024",
      attendees: "8,000+",
      image:
        "/placeholder.svg?height=400&width=600&text=Corporate+Summit+Design",
      description:
        "Professional conference setup with state-of-the-art technology and networking spaces.",
    },
    {
      id: 4,
      title: "Art Gallery Opening",
      location: "New York MoMA",
      date: "December 2023",
      attendees: "1,200+",
      image: "/placeholder.svg?height=400&width=600&text=Art+Gallery+Setup",
      description:
        "Minimalist gallery design emphasizing artwork presentation and visitor flow.",
    },
  ];

  return (
    <section className="py-20 relative z-10 bg-gradient-to-b from-gray-900 to-gray-800">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <AnimatedText
            type="chars"
            stagger={0.02}
            y={20}
            className="text-sm font-medium tracking-wider uppercase text-primary inline-block px-3 py-1 rounded-full bg-primary/20 mb-4"
            onScrollTrigger={true}
          >
            Architecture & Events
          </AnimatedText>

          <AnimatedText
            type="words"
            stagger={0.05}
            y={30}
            className="text-4xl md:text-5xl font-bold mb-6 text-white"
            onScrollTrigger={true}
          >
            Architectural Excellence in Events
          </AnimatedText>

          <AnimatedText
            type="lines"
            stagger={0.08}
            y={20}
            className="text-lg text-gray-300 max-w-3xl mx-auto"
            onScrollTrigger={true}
          >
            From corporate conferences to luxury exhibitions, we design and
            build architectural spaces that create unforgettable experiences and
            drive engagement.
          </AnimatedText>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          {architectureProjects.map((project, index) => (
            <motion.div
              key={project.id}
              className="bg-gray-800/50 backdrop-blur-sm rounded-2xl overflow-hidden group hover:bg-gray-800/70 transition-all duration-300"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              viewport={{ once: true }}
            >
              <div className="relative h-64 overflow-hidden">
                <Image
                  src={project.image || "/placeholder.svg"}
                  alt={project.title}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                  <h3 className="text-2xl font-bold text-white mb-2">
                    {project.title}
                  </h3>
                  <div className="flex items-center gap-4 text-sm text-gray-300">
                    <div className="flex items-center gap-1">
                      <MapPin className="w-4 h-4" />
                      {project.location}
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      {project.date}
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-6">
                <p className="text-gray-300 mb-4 leading-relaxed">
                  {project.description}
                </p>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-primary">
                    <Users className="w-5 h-5" />
                    <span className="font-semibold">
                      {project.attendees} Attendees
                    </span>
                  </div>

                  <Button
                    variant="outline"
                    size="sm"
                    className="border-primary text-primary hover:bg-primary/10 bg-transparent"
                  >
                    View Details
                  </Button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="text-center">
          <Button
            size="lg"
            className="bg-primary hover:bg-primary/90 text-white px-8 py-4"
          >
            <Building2 className="mr-2 h-5 w-5" />
            View All Projects
          </Button>
        </div>
      </div>
    </section>
  );
}
