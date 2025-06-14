"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import AnimatedGradient from "./animated-gradient"
import ParticleField from "./particle-field"
import WaveBackground from "./wave-background"
import GeometricPattern from "./geometric-pattern"
import NoiseTexture from "./noise-texture"
import DotGrid from "./dot-grid"
import ObjectParticles from "./object-particles"

export default function BackgroundShowcase() {
  const [activeTab, setActiveTab] = useState("gradient")

  return (
    <div className="w-full">
      <Tabs defaultValue="gradient" onValueChange={setActiveTab}>
        <div className="flex justify-center mb-6">
          <TabsList className="grid grid-cols-3 md:grid-cols-7">
            <TabsTrigger value="gradient">Gradient</TabsTrigger>
            <TabsTrigger value="particles">Particles</TabsTrigger>
            <TabsTrigger value="waves">Waves</TabsTrigger>
            <TabsTrigger value="geometric">Geometric</TabsTrigger>
            <TabsTrigger value="noise">Noise</TabsTrigger>
            <TabsTrigger value="dots">Dot Grid</TabsTrigger>
            <TabsTrigger value="objects">3D Objects</TabsTrigger>
          </TabsList>
        </div>

        <div className="relative h-[400px] rounded-lg overflow-hidden border mb-6">
          <TabsContent value="gradient" className="h-full">
            <AnimatedGradient intensity="medium" />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="bg-white/80 backdrop-blur-sm p-6 rounded-lg max-w-md text-center">
                <h3 className="text-2xl font-bold mb-2">Animated Gradient</h3>
                <p>A smooth, animated gradient background that shifts between colors over time.</p>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="particles" className="h-full">
            <div className="absolute inset-0 bg-gray-900"></div>
            <ParticleField colors={["#3b82f6", "#ec4899", "#8b5cf6", "#f97316"]} />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="bg-white/80 backdrop-blur-sm p-6 rounded-lg max-w-md text-center">
                <h3 className="text-2xl font-bold mb-2">Particle Field</h3>
                <p>Floating particles that create depth and movement in your background.</p>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="waves" className="h-full">
            <div className="absolute inset-0 bg-gray-50"></div>
            <WaveBackground position="bottom" height={150} />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="bg-white/80 backdrop-blur-sm p-6 rounded-lg max-w-md text-center">
                <h3 className="text-2xl font-bold mb-2">Wave Background</h3>
                <p>Animated waves that add a dynamic, fluid element to your sections.</p>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="geometric" className="h-full">
            <div className="absolute inset-0 bg-gray-50"></div>
            <GeometricPattern patternType="hexagons" />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="bg-white/80 backdrop-blur-sm p-6 rounded-lg max-w-md text-center">
                <h3 className="text-2xl font-bold mb-2">Geometric Pattern</h3>
                <p>Clean, modern geometric patterns that add visual interest without distraction.</p>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="noise" className="h-full">
            <div className="absolute inset-0 bg-white"></div>
            <NoiseTexture animated={true} />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="bg-white/80 backdrop-blur-sm p-6 rounded-lg max-w-md text-center">
                <h3 className="text-2xl font-bold mb-2">Noise Texture</h3>
                <p>Subtle noise texture that adds depth and a tactile feel to your backgrounds.</p>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="dots" className="h-full">
            <div className="absolute inset-0 bg-gray-50"></div>
            <DotGrid animated={true} />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="bg-white/80 backdrop-blur-sm p-6 rounded-lg max-w-md text-center">
                <h3 className="text-2xl font-bold mb-2">Dot Grid</h3>
                <p>Clean, minimal dot grid pattern that adds structure and visual rhythm.</p>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="objects" className="h-full">
            <div className="absolute inset-0 bg-gray-900"></div>
            <ObjectParticles count={20} />
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="bg-white/80 backdrop-blur-sm p-6 rounded-lg max-w-md text-center">
                <h3 className="text-2xl font-bold mb-2">3D Objects</h3>
                <p>Floating 3D objects that create an immersive, interactive background.</p>
              </div>
            </div>
          </TabsContent>
        </div>

        <div className="text-center">
          <Button>Use This Background</Button>
        </div>
      </Tabs>
    </div>
  )
}
