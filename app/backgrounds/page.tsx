"use client"
import BackgroundShowcase from "@/components/backgrounds/background-showcase"
import AnimatedGradient from "@/components/backgrounds/animated-gradient"
import ParticleField from "@/components/backgrounds/particle-field"
import WaveBackground from "@/components/backgrounds/wave-background"
import GeometricPattern from "@/components/backgrounds/geometric-pattern"
import NoiseTexture from "@/components/backgrounds/noise-texture"
import DotGrid from "@/components/backgrounds/dot-grid"
import ObjectParticles from "@/components/backgrounds/object-particles"

export default function BackgroundsPage() {
  return (
    <main className="min-h-screen py-12">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Background Elements</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Explore a variety of background elements to enhance your website's visual appeal. These components can be
            used in any section of your site.
          </p>
        </div>

        <BackgroundShowcase />

        <div className="mt-20 space-y-24">
          {/* Animated Gradient Example */}
          <section className="relative rounded-xl overflow-hidden">
            <div className="h-[400px] relative">
              <AnimatedGradient colors={["#3b82f6", "#8b5cf6", "#ec4899", "#f97316"]} />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="bg-white/80 backdrop-blur-sm p-8 rounded-xl max-w-md">
                  <h2 className="text-3xl font-bold mb-4">Animated Gradient</h2>
                  <p className="mb-4">
                    A smooth, animated gradient background that shifts between colors over time. Perfect for hero
                    sections, call-to-actions, or any area that needs visual interest.
                  </p>
                  <p className="text-sm text-gray-600">
                    Customize colors, animation speed, and intensity to match your brand.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Particle Field Example */}
          <section className="relative rounded-xl overflow-hidden">
            <div className="h-[400px] relative bg-gray-900">
              <ParticleField colors={["#3b82f6", "#ec4899", "#8b5cf6", "#f97316"]} />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="bg-white/80 backdrop-blur-sm p-8 rounded-xl max-w-md">
                  <h2 className="text-3xl font-bold mb-4">Particle Field</h2>
                  <p className="mb-4">
                    Floating particles that create depth and movement in your background. Great for creating an
                    immersive, interactive feel.
                  </p>
                  <p className="text-sm text-gray-600">
                    Adjust particle count, size, colors, and animation speed to create the perfect atmosphere.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* 3D Objects Example */}
          <section className="relative rounded-xl overflow-hidden">
            <div className="h-[500px] relative bg-gray-900">
              <ObjectParticles count={30} />
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="bg-white/80 backdrop-blur-sm p-8 rounded-xl max-w-md">
                  <h2 className="text-3xl font-bold mb-4">3D Objects</h2>
                  <p className="mb-4">
                    Floating 3D objects that create an immersive, interactive background with depth and dimension.
                    Perfect for creating a modern, tech-forward aesthetic.
                  </p>
                  <p className="text-sm text-gray-600">
                    Customize object types, colors, count, and animation speed to match your brand's style.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Wave Background Example */}
          <section className="relative rounded-xl overflow-hidden">
            <div className="h-[400px] relative bg-gray-50">
              <WaveBackground position="bottom" height={150} />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="bg-white/80 backdrop-blur-sm p-8 rounded-xl max-w-md">
                  <h2 className="text-3xl font-bold mb-4">Wave Background</h2>
                  <p className="mb-4">
                    Animated waves that add a dynamic, fluid element to your sections. Perfect for creating a sense of
                    motion and flow.
                  </p>
                  <p className="text-sm text-gray-600">
                    Customize wave count, height, color, and animation speed to match your design.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Geometric Pattern Example */}
          <section className="relative rounded-xl overflow-hidden">
            <div className="h-[400px] relative bg-gray-50">
              <GeometricPattern patternType="hexagons" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="bg-white/80 backdrop-blur-sm p-8 rounded-xl max-w-md">
                  <h2 className="text-3xl font-bold mb-4">Geometric Pattern</h2>
                  <p className="mb-4">
                    Clean, modern geometric patterns that add visual interest without distraction. Great for creating
                    texture and depth.
                  </p>
                  <p className="text-sm text-gray-600">
                    Choose from circles, triangles, squares, or hexagons, and customize size, density, and colors.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Noise Texture Example */}
          <section className="relative rounded-xl overflow-hidden">
            <div className="h-[400px] relative bg-white">
              <NoiseTexture animated={true} />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="bg-white/80 backdrop-blur-sm p-8 rounded-xl max-w-md">
                  <h2 className="text-3xl font-bold mb-4">Noise Texture</h2>
                  <p className="mb-4">
                    Subtle noise texture that adds depth and a tactile feel to your backgrounds. Perfect for creating a
                    paper-like or grainy texture.
                  </p>
                  <p className="text-sm text-gray-600">
                    Adjust opacity, scale, and color to create the perfect subtle texture.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Dot Grid Example */}
          <section className="relative rounded-xl overflow-hidden">
            <div className="h-[400px] relative bg-gray-50">
              <DotGrid animated={true} />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="bg-white/80 backdrop-blur-sm p-8 rounded-xl max-w-md">
                  <h2 className="text-3xl font-bold mb-4">Dot Grid</h2>
                  <p className="mb-4">
                    Clean, minimal dot grid pattern that adds structure and visual rhythm. Great for creating a tech or
                    blueprint feel.
                  </p>
                  <p className="text-sm text-gray-600">
                    Customize dot size, spacing, color, and add subtle animation for more visual interest.
                  </p>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </main>
  )
}
