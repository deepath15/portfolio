"use client"

import { useEffect, useRef } from "react"
import { motion } from "framer-motion"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import RevealText from "@/components/reveal-text"
import ImageEffect from "@/components/image-effect"

export default function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const timelineRef = useRef<HTMLDivElement>(null)
  const timelineLineRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

    if (!sectionRef.current || !timelineRef.current || !timelineLineRef.current) return

    // Animate the timeline line drawing
    gsap.fromTo(
      timelineLineRef.current,
      { height: 0 },
      {
        height: "100%",
        duration: 1,
        ease: "power2.inOut",
        scrollTrigger: {
          trigger: timelineRef.current,
          start: "top 70%",
          end: "bottom 70%",
          scrub: 0.6,
        },
      },
    )

    // Timeline animation
    const timelineItems = timelineRef.current.querySelectorAll(".timeline-item")
    timelineItems.forEach((item, index) => {
      const direction = index % 2 === 0 ? -50 : 50

      gsap.fromTo(
        item,
        {
          x: direction,
          opacity: 0,
        },
        {
          x: 0,
          opacity: 1,
          duration: 0.8,
          scrollTrigger: {
            trigger: item,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        },
      )
    })

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
    }
  }, [])

  const timelineItems = [
  {
    year: "2022",
    title: "Frontend Development",
    description: "Started learning HTML, CSS, JavaScript, and modern frontend frameworks like React and Tailwind CSS."
  },
  {
    year: "2023",
    title: "Backend & Databases",
    description: "Expanded skill set to backend development with Node.js, Express.js, and databases like MongoDB and PostgreSQL."
  },
  {
    year: "2024",
    title: "Freelancing & Problem Solving",
    description: "Started working as a freelance full stack developer. Also began practicing DSA and competitive programming on LeetCode."
  },
  {
    year: "2025",
    title: "Freelancing & Job Hunt",
    description: "Currently freelancing on full stack projects and actively looking for job openings in product-based companies."
  }
]


  return (
    <section id="about" ref={sectionRef} className="relative overflow-hidden bg-gray-50 py-24 dark:bg-gray-900">
      {/* Background elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(0,200,255,0.1),transparent_70%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_70%,rgba(0,255,200,0.05),transparent_70%)]"></div>
      </div>

      <div className="container relative z-10 mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true, margin: "-100px" }}
          className="mb-16 text-center"
        >
          <h2 className="mb-4 inline-block bg-gradient-to-r from-teal-400 to-blue-500 bg-clip-text text-3xl font-bold tracking-tight text-transparent sm:text-4xl">
            About Me
          </h2>
          <div className="mx-auto h-1 w-20 bg-gradient-to-r from-teal-400 to-blue-500"></div>
        </motion.div>

        {/* <div className="grid gap-12 md:grid-cols-2">
          <div className="relative flex items-center justify-center">
          <div className="relative h-[450px] w-[350px]">
              <ImageEffect
                src="/placeholder.svg?height=450&width=350"
                alt="Deepath Selvaraj"
                width={350}
                height={450}
                className="overflow-hidden rounded-2xl border-8 border-white shadow-2xl dark:border-gray-800"
                effect="glow"
              />

            
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                viewport={{ once: true }}
                className="absolute -bottom-6 -left-6 h-24 w-24 rounded-full bg-teal-400/30 backdrop-blur-md"
              ></motion.div>
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                viewport={{ once: true }}
                className="absolute -right-6 -top-6 h-24 w-24 rounded-full bg-blue-500/30 backdrop-blur-md"
              ></motion.div>

             
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5 }}
                viewport={{ once: true }}
                className="absolute -left-16 top-1/4 rounded-lg bg-white p-2 shadow-lg dark:bg-gray-800"
              >
                <div className="flex items-center gap-2">
                  <div className="h-8 w-8 rounded-full bg-blue-500/20 p-1.5">
                    <div className="h-full w-full rounded-full bg-blue-500"></div>
                  </div>
                  <span className="font-medium">React</span>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.6 }}
                viewport={{ once: true }}
                className="absolute -right-16 top-2/3 rounded-lg bg-white p-2 shadow-lg dark:bg-gray-800"
              >
                <div className="flex items-center gap-2">
                  <div className="h-8 w-8 rounded-full bg-teal-500/20 p-1.5">
                    <div className="h-full w-full rounded-full bg-teal-500"></div>
                  </div>
                  <span className="font-medium">Node.js</span>
                </div>
              </motion.div>
            </div> 
          </div>

          <div className="flex flex-col justify-center">
            <RevealText className="mb-4 text-2xl font-bold text-gray-900 dark:text-white">
              Full Stack Developer & Creative Technologist
            </RevealText>

            <RevealText delay={0.1} className="mb-6 text-gray-600 dark:text-gray-400">
              I'm a passionate developer blending technical skill and creative vision to build exceptional digital
              experiences. I specialize in frontend and backend development.
            </RevealText>

            <RevealText delay={0.2} className="mb-6 text-gray-600 dark:text-gray-400">
              My projects include Learning Management Systems, Inventory Management solutions, AI assistants like Ease
              Bot, and a Sketch-to-Code Platform that transforms UI designs into functional code using artificial
              intelligence.
            </RevealText>

            <div className="grid grid-cols-2 gap-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
                className="rounded-xl bg-white p-4 shadow-lg transition-transform duration-300 dark:bg-gray-800"
              >
                <h4 className="mb-2 font-semibold text-gray-900 dark:text-white">Location</h4>
                <p className="text-gray-600 dark:text-gray-400">Tamil Nadu, India</p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
                className="rounded-xl bg-white p-4 shadow-lg transition-transform duration-300 dark:bg-gray-800"
              >
                <h4 className="mb-2 font-semibold text-gray-900 dark:text-white">Email</h4>
                <p className="text-gray-600 dark:text-gray-400">deepath1506@gmail.com</p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
                className="rounded-xl bg-white p-4 shadow-lg transition-transform duration-300 dark:bg-gray-800"
              >
                <h4 className="mb-2 font-semibold text-gray-900 dark:text-white">Specialty</h4>
                <p className="text-gray-600 dark:text-gray-400">Full Stack Development</p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.6 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
                className="rounded-xl bg-white p-4 shadow-lg transition-transform duration-300 dark:bg-gray-800"
              >
                <h4 className="mb-2 font-semibold text-gray-900 dark:text-white">Availability</h4>
                <p className="text-gray-600 dark:text-gray-400">Open to opportunities</p>
              </motion.div>
            </div>
          </div>
        </div> */}

        <div ref={timelineRef} className="mt-24">
          <h3 className="mb-12 text-center text-2xl font-bold text-gray-900 dark:text-white">My Journey</h3>

          <div className="relative mx-auto max-w-4xl">
            <div className="absolute left-1/2 top-0 h-full w-0.5 -translate-x-1/2 bg-gray-200 dark:bg-gray-700">
              <div ref={timelineLineRef} className="h-0 w-full bg-gradient-to-b from-teal-400 to-blue-500"></div>
            </div>

            {timelineItems.map((item, index) => (
              <div
                key={index}
                className={`timeline-item relative mb-12 flex opacity-0 ${
                  index % 2 === 0 ? "justify-start" : "justify-end"
                } md:mb-16`}
              >
                <div className={`w-5/12 ${index % 2 === 0 ? "text-right" : "text-left"}`}>
                  <motion.div
                    whileHover={{ y: -5 }}
                    className="rounded-xl bg-white p-6 shadow-lg transition-all duration-300 dark:bg-gray-800"
                  >
                    <span className="mb-2 inline-block rounded-full bg-gradient-to-r from-teal-400/20 to-blue-500/20 px-3 py-1 text-sm font-semibold text-teal-500 dark:text-teal-400">
                      {item.year}
                    </span>
                    <h4 className="mb-2 text-xl font-bold text-gray-900 dark:text-white">{item.title}</h4>
                    <p className="text-gray-600 dark:text-gray-400">{item.description}</p>
                  </motion.div>
                </div>

                <motion.div
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20, delay: index * 0.2 }}
                  viewport={{ once: true }}
                  className="absolute left-1/2 top-6 flex h-6 w-6 -translate-x-1/2 items-center justify-center rounded-full border-2 border-white bg-gradient-to-r from-teal-400 to-blue-500 dark:border-gray-800"
                >
                  <div className="h-2 w-2 rounded-full bg-white"></div>
                </motion.div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
