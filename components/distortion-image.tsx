"use client"

import type React from "react"

import { useRef, useEffect, useState } from "react"
import Image from "next/image"

interface DistortionImageProps {
  src: string
  alt: string
  width?: number
  height?: number
  className?: string
  intensity?: number
}

export default function DistortionImage({
  src,
  alt,
  width = 400,
  height = 400,
  className = "",
  intensity = 20,
}: DistortionImageProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [isHovered, setIsHovered] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const requestRef = useRef<number>()
  const imageRef = useRef<HTMLImageElement | null>(null)
  const [imageLoaded, setImageLoaded] = useState(false)

  useEffect(() => {
    // Create and load the image
    const image = new Image()
    image.crossOrigin = "anonymous"
    image.src = src
    image.onload = () => {
      imageRef.current = image
      setImageLoaded(true)
    }

    return () => {
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current)
      }
    }
  }, [src])

  useEffect(() => {
    if (!canvasRef.current || !imageLoaded || !imageRef.current) return

    const canvas = canvasRef.current
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas dimensions
    canvas.width = width
    canvas.height = height

    const animate = () => {
      if (!ctx || !imageRef.current) return

      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Draw the image with distortion if hovered
      if (isHovered) {
        // Calculate distortion based on mouse position
        const centerX = canvas.width / 2
        const centerY = canvas.height / 2
        const distortionX = (mousePosition.x - centerX) / centerX
        const distortionY = (mousePosition.y - centerY) / centerY
        // Apply distortion
        for (let i = 0; i < canvas.height; i += 5) {
          // Calculate wave distortion
          const waveX = Math.sin(i * 0.01 + Date.now() * 0.001) * intensity * distortionX
          const waveY = Math.cos(i * 0.01 + Date.now() * 0.001) * intensity * distortionY
          // Draw a slice of the image with distortion
          ctx.drawImage(imageRef.current, 0, i, canvas.width, 5, waveX, i + waveY, canvas.width, 5)
        }
      } else {
        // Draw the image normally
        ctx.drawImage(imageRef.current, 0, 0, canvas.width, canvas.height)
      }
      requestRef.current = requestAnimationFrame(animate)
    }
    requestRef.current = requestAnimationFrame(animate)
    return () => {
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current)
      }
    }
  }, [isHovered, mousePosition, imageLoaded, width, height, intensity])
  // Fixed handleMouseMove function to ensure e is defined
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!canvasRef.current) return
    const rect = canvasRef.current.getBoundingClientRect()
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    })
  }

  return (
    <div className={`relative overflow-hidden ${className}`}>
      <canvas
        ref={canvasRef}
        width={width}
        height={height}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onMouseMove={handleMouseMove}
        className="h-full w-full"
      />
      {!imageLoaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-200 dark:bg-gray-800">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-t-transparent border-teal-500"></div>
        </div>
      )}
    </div>
  )
}
