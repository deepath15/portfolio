"use client"

import { useState } from "react"
import Image from "next/image"
import { motion } from "framer-motion"

interface ImageEffectProps {
  src: string
  alt: string
  width?: number
  height?: number
  className?: string
  effect?: "zoom" | "glow" | "tilt" | "none"
}

export default function ImageEffect({
  src,
  alt,
  width = 400,
  height = 400,
  className = "",
  effect = "zoom",
}: ImageEffectProps) {
  const [isHovered, setIsHovered] = useState(false)

  const getHoverAnimation = () => {
    switch (effect) {
      case "zoom":
        return { scale: 1.1 }
      case "tilt":
        return { rotateX: 10, rotateY: -10 }
      case "glow":
        return { boxShadow: "0 0 30px rgba(0, 200, 255, 0.5)" }
      default:
        return {}
    }
  }

  return (
    <motion.div
      className={`relative overflow-hidden ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{ transformStyle: "preserve-3d" }}
    >
      <motion.div
        className="h-full w-full"
        animate={isHovered ? getHoverAnimation() : {}}
        transition={{ duration: 0.4 }}
      >
        <Image
          src={src || "/placeholder.svg"}
          alt={alt}
          width={width}
          height={height}
          className="h-full w-full object-cover"
        />
        {effect === "glow" && isHovered && (
          <motion.div
            className="absolute inset-0 bg-gradient-to-tr from-teal-400/20 to-blue-500/20 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          />
        )}
      </motion.div>
    </motion.div>
  )
}
