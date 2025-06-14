"use client"

import { motion } from "framer-motion"

interface Color {
  id: string
  name: string
  hex: string
}

interface ColorPickerProps {
  colors?: Color[]
  activeColor: string
  onChange: (color: string) => void
}

export default function ColorPicker({ colors, activeColor, onChange }: ColorPickerProps) {
  // Default colors for when the colors prop is not provided
  const defaultColors = [
    { id: "blue", name: "Blue", hex: "#3b82f6" },
    { id: "pink", name: "Pink", hex: "#ec4899" },
    { id: "purple", name: "Purple", hex: "#8b5cf6" },
    { id: "orange", name: "Peach", hex: "#f97316" },
  ]

  // Use provided colors or fall back to default colors
  const colorOptions = colors || defaultColors

  return (
    <div className="flex items-center gap-3">
      {colorOptions.map((color) => (
        <motion.button
          key={color.id}
          className={`w-10 h-10 rounded-full relative ${activeColor === color.id ? "ring-2 ring-offset-2 ring-offset-gray-900 ring-primary" : ""}`}
          style={{ backgroundColor: color.hex }}
          onClick={() => onChange(color.id)}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          aria-label={`Select ${color.name} color`}
          title={color.name}
        >
          {activeColor === color.id && (
            <motion.div
              className="absolute inset-0 rounded-full"
              initial={{ scale: 0 }}
              animate={{ scale: [0, 1.4, 1] }}
              transition={{ duration: 0.3 }}
            >
              <span className="absolute inset-0 rounded-full border-2 border-white mix-blend-difference" />
            </motion.div>
          )}
        </motion.button>
      ))}
    </div>
  )
}
