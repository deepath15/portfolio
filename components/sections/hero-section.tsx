"use client"

import { useEffect, useRef } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ArrowDown, Download, Send } from "lucide-react"
import Link from "next/link"
import { gsap } from "gsap"
import RevealText from "@/components/reveal-text"
import FloatingElement from "@/components/floating-element"
import ImageEffect from "@/components/image-effect"

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const textRef = useRef<HTMLHeadingElement>(null)
  const circleRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!sectionRef.current || !textRef.current || !circleRef.current) return

    const tl = gsap.timeline()

    // Animate the text reveal
    tl.from(textRef.current.querySelectorAll(".reveal-text"), {
      y: 100,
      opacity: 0,
      stagger: 0.1,
      duration: 1,
      ease: "power4.out",
    })

    // Animate the circle
    gsap.to(circleRef.current, {
      y: "30%",
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top top",
        end: "bottom top",
        scrub: true,
      },
    })

    return () => {
      tl.kill()
    }
  }, [])

  return (
   <section
  id="home"
  ref={sectionRef}
  className="relative flex min-h-screen items-center justify-center overflow-hidden bg-white pt-20 dark:bg-black"
>

      {/* Background elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(0,200,255,0.15),transparent_70%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(0,255,200,0.1),transparent_70%)]"></div>
        <div
          ref={circleRef}
          className="absolute -right-[20%] top-[10%] h-[500px] w-[500px] rounded-full bg-gradient-to-br from-teal-400/20 to-blue-500/20 blur-3xl filter"
        ></div>
      </div>


      {/* class style 
      grid-cols-1 gap-12 px-4 md:grid-cols-2
      container relative z-10 mx-auto grid px-4 md:grid-cols-2 gap-12 items-center justify-center
      */}

<div className="px-4">
        {/* Left side - Text content */}
        <div className="flex flex-col items-start justify-center">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className="mb-6 inline-block rounded-full bg-gradient-to-r from-teal-400/10 to-blue-500/10 px-6 py-2 backdrop-blur-sm"
          >
            <span className="bg-gradient-to-r from-teal-400 to-blue-500 bg-clip-text text-sm font-medium text-transparent">
              Hello, I'm
            </span>
          </motion.div>

          <h1
            ref={textRef}
            className="mb-6 overflow-hidden text-5xl font-bold leading-tight tracking-tighter text-gray-900 dark:text-white md:text-6xl lg:text-7xl"
          >
            <div className="reveal-text">Deepath Selvaraj</div>
            <div className="reveal-text mt-2 bg-gradient-to-r from-teal-400 to-blue-500 bg-clip-text text-transparent">
              Full Stack Developer
            </div>
          </h1>

          <RevealText delay={0.6} className="mb-8 max-w-lg text-lg text-gray-600 dark:text-gray-400">
            Crafting scalable, secure, and visually engaging digital solutions using React, Next.js, Node.js, MongoDB,
            and more.
          </RevealText>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="flex flex-col items-center justify-center gap-4 sm:flex-row"
          >
            <Button
              asChild
              size="lg"
              className="group relative overflow-hidden rounded-full bg-gradient-to-r from-teal-400 to-blue-500 px-8 text-white"
            >
              <Link href="#contact">
                <span className="relative z-10">Contact Me</span>
                <span className="absolute inset-0 -z-10 bg-gradient-to-r from-blue-500 to-teal-400 opacity-0 transition-opacity duration-300 group-hover:opacity-100"></span>
                <Send className="relative z-10 ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="rounded-full border-gray-300 px-8 backdrop-blur-sm dark:border-gray-700"
            >
              <a href="/resume.pdf" download>
                Download CV <Download className="ml-2 h-4 w-4" />
              </a>
            </Button>
          </motion.div>
        </div>

        
        {/* <div className="relative flex items-center justify-center">
          <FloatingElement amplitude={15} duration={6} className="relative h-[450px] w-[350px]">
            <div className="absolute -left-6 -top-6 h-24 w-24 rounded-full bg-teal-400/30 backdrop-blur-md"></div>
            <div className="absolute -bottom-6 -right-6 h-24 w-24 rounded-full bg-blue-500/30 backdrop-blur-md"></div>
            <div className="relative h-full w-full overflow-hidden rounded-2xl border-8 border-white shadow-2xl dark:border-gray-800">
              <ImageEffect
                src="/placeholder.svg?height=450&width=350"
                alt="Deepath Selvaraj"
                width={350}
                height={450}
                effect="glow"
              />
            </div>
          </FloatingElement>

          
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 1 }}
            className="absolute -right-4 bottom-20 z-10 rounded-lg bg-white p-4 shadow-lg dark:bg-gray-800"
          >
            <div className="flex items-center gap-2">
              <div className="h-3 w-3 rounded-full bg-green-500"></div>
              <span className="text-sm font-medium">Available for work</span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 1.2 }}
            className="absolute -left-4 top-20 z-10 rounded-lg bg-white p-4 shadow-lg dark:bg-gray-800"
          >
            <div className="flex items-center gap-2">
              <div className="h-3 w-3 rounded-full bg-blue-500"></div>
              <span className="text-sm font-medium">Creative Technologist</span>
            </div>
          </motion.div>
        </div> */}
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.2 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{
            y: [0, 12, 0],
          }}
          transition={{
            duration: 1.5,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "loop",
          }}
        >
          <Link
            href="#about"
            aria-label="Scroll down"
            className="flex h-12 w-12 items-center justify-center rounded-full border border-gray-300 text-gray-600 backdrop-blur-sm transition-colors hover:border-teal-400 hover:text-teal-400 dark:border-gray-700 dark:text-gray-400 dark:hover:border-teal-400 dark:hover:text-teal-400"
          >
            <ArrowDown className="h-5 w-5" />
          </Link>
        </motion.div>
      </motion.div>
    </section>
  )
}
