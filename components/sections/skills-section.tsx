"use client"

import type React from "react"

import { useEffect, useRef, useState } from "react"
import { motion } from "framer-motion"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import RevealText from "@/components/reveal-text"
import { Code, Palette, Globe, Database, Layers, Lightbulb, Zap } from "lucide-react"

interface Skill {
  name: string
  level: number
  category: string
  icon: React.ElementType
}

export default function SkillsSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const skillsRef = useRef<HTMLDivElement>(null)
  const [activeCategory, setActiveCategory] = useState<string>("all")
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null)

  const categories = [
    { id: "all", name: "All Skills" },
    { id: "Programming Languages", name: "Programming Languages" }, 
    { id: "frontend", name: "Frontend" },
    { id: "backend", name: "Backend & Database" },
    { id: "tools", name: "Tools & Others" },
  ]

  const skills: Skill[] = [
    // Frontend
    { name: "HTML", level: 90, category: "frontend", icon: Code },
    { name: "CSS", level: 90, category: "frontend", icon: Code },
    { name: "React", level: 90, category: "frontend", icon: Code },
    { name: "Next.js", level: 85, category: "frontend", icon: Code },
    { name: "Tailwind CSS", level: 90, category: "frontend", icon: Palette },
    { name: "Redux", level: 75, category: "frontend", icon: Zap },
    { name: "Tank Stack Query", level: 75, category: "frontend", icon: Zap },
    { name: "Zustand", level: 90, category: "frontend", icon: Globe },

    // Backend
    { name: "Node.js", level: 75, category: "backend", icon: Code },
    { name: "Express", level: 70, category: "backend", icon: Code },
    { name: "MongoDB", level: 65, category: "backend", icon: Database },
    { name: "MySQL", level: 60, category: "backend", icon: Database },
    { name: "Rest API", level: 75, category: "backend", icon: Code },
    { name: "Authentication", level: 80, category: "backend", icon: Lightbulb },
    { name: "RabbitMQ", level: 65, category: "backend", icon: Database },
    { name: "Redis", level: 60, category: "backend", icon: Database },

    // Tools
    { name: "Git/GitHub", level: 85, category: "tools", icon: Layers },
    { name: "Postman", level: 65, category: "tools", icon: Layers },
    { name: "Thunder client", level: 65, category: "tools", icon: Layers },
    { name: "Figma", level: 75, category: "tools", icon: Palette },

    // Programming Languages
    { name: "Java", level: 70, category: "Programming Languages", icon: Layers },
    { name: "JavaScript", level: 85, category: "Programming Languages", icon: Globe },
    { name: "TypeScript", level: 80, category: "Programming Languages", icon: Globe },
  ]

  const filteredSkills = activeCategory === "all" ? skills : skills.filter((skill) => skill.category === activeCategory)

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

    if (!sectionRef.current || !skillsRef.current) return

    const skillBars = skillsRef.current.querySelectorAll(".skill-bar")

    skillBars.forEach((bar) => {
      const fill = bar.querySelector(".skill-bar-fill");
      if (!fill) return;

      const level = Number(bar.getAttribute("data-skill-level")) || 0;

      gsap.fromTo(
        fill,
        { width: "0%" },
        {
          width: `${level}%`,
          duration: 1.5,
          ease: "power2.out",
          scrollTrigger: {
            trigger: bar,
            start: "top 90%",
            toggleActions: "play none none reverse",
          },
        },
      )
    })

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
    }
  }, [activeCategory])

  return (
    <section id="skills" ref={sectionRef} className="relative overflow-hidden bg-white py-24 dark:bg-black">
      {/* Background elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(0,200,255,0.1),transparent_70%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(0,255,200,0.05),transparent_70%)]"></div>
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
            Skills & Expertise
          </h2>
          <div className="mx-auto h-1 w-20 bg-gradient-to-r from-teal-400 to-blue-500"></div>
          <p className="mx-auto mt-4 max-w-2xl text-gray-600 dark:text-gray-400">
            My technical skills and areas of expertise that I've developed throughout my career.
          </p>
        </motion.div>

        {/* Category Filter */}
        <div className="mb-12">
          <div className="flex flex-wrap justify-center gap-3">
            {categories.map((category) => (
              <motion.button
                key={category.id}
                whileHover={{ y: -3 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => setActiveCategory(category.id)}
                className={`rounded-full px-6 py-2 text-sm font-medium transition-all duration-300 ${
                  activeCategory === category.id
                    ? "bg-gradient-to-r from-teal-400 to-blue-500 text-white shadow-lg"
                    : "bg-white text-gray-700 shadow hover:shadow-md dark:bg-gray-800 dark:text-gray-300"
                }`}
              >
                {category.name}
              </motion.button>
            ))}
          </div>
        </div>

        {/* Skills Grid */}
        <div ref={skillsRef} className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredSkills.map((skill, index) => {
            const Icon = skill.icon
            return (
              <motion.div
                key={skill.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className="skill-card group relative overflow-hidden rounded-xl bg-white p-6 shadow-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-xl dark:bg-gray-800/50"
                onMouseEnter={() => setHoveredSkill(skill.name)}
                onMouseLeave={() => setHoveredSkill(null)}
              >
                <div className="mb-4 flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="mr-3 rounded-lg bg-gradient-to-br from-teal-400/20 to-blue-500/20 p-2 text-teal-500 transition-all duration-300 group-hover:from-teal-400/30 group-hover:to-blue-500/30 dark:text-teal-400">
                      <Icon className="h-5 w-5" />
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white">{skill.name}</h3>
                  </div>
                  <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">{skill.level}%</span>
                </div>

                <div
                  className="skill-bar h-2 overflow-hidden rounded-full bg-gray-200 dark:bg-gray-700"
                  data-skill-level={skill.level}
                >
                  <div
                    className="skill-bar-fill h-full rounded-full bg-gradient-to-r from-teal-400 to-blue-500"
                    style={{ width: `${skill.level}%` }}
                  ></div>
                </div>

                {/* Animated background on hover */}
                <div
                  className={`absolute inset-0 -z-10 bg-gradient-to-br from-teal-400/5 to-blue-500/5 opacity-0 transition-opacity duration-300 ${
                    hoveredSkill === skill.name ? "opacity-100" : ""
                  }`}
                ></div>
              </motion.div>
            )
          })}
        </div>

        <div className="mt-20">
          <h3 className="mb-10 text-center text-2xl font-bold text-gray-900 dark:text-white">Core Competencies</h3>

          <div className="grid gap-8 md:grid-cols-4">
            {[
              {
                title: "Frontend Development",
                icon: Code,
                description: "Building responsive, accessible, and performant user interfaces with React and Next.js.",
                color: "from-blue-400 to-indigo-500",
              },
              {
                title: "Backend Development",
                icon: Database,
                description: "Creating robust server-side applications with Node.js, Express, and MongoDB.",
                color: "from-purple-400 to-pink-500",
              },
              {
                title: "Database",
                icon: Palette,
                description: "Designing and managing efficient database schemas with a focus on scalability, data integrity, and optimized queries.",
                color: "from-amber-400 to-orange-500",
              },
              {
                title: "Full Stack Solutions",
                icon: Layers,
                description: "Developing end-to-end applications with integrated frontend and backend technologies.",
                color: "from-emerald-400 to-teal-500",
              },
            ].map((category, index) => {
              const CategoryIcon = category.icon
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="group rounded-xl bg-white p-6 text-center shadow-lg transition-all duration-500 hover:-translate-y-2 hover:shadow-xl dark:bg-gray-800/50"
                >
                  <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-teal-400/20 to-blue-500/20">
                    <div className={`rounded-full bg-gradient-to-r ${category.color} p-3`}>
                      <CategoryIcon className="h-6 w-6 text-white" />
                    </div>
                  </div>
                  <h4 className="mb-3 text-xl font-bold text-gray-900 dark:text-white">{category.title}</h4>
                  <p className="text-gray-600 dark:text-gray-400">{category.description}</p>
                </motion.div>
              )
            })}
          </div>
        </div>

        {/* Skill Chart */}
        <div className="mt-20">
          <RevealText className="mb-6 text-center text-xl font-bold text-gray-900 dark:text-white">
            My Skills Distribution
          </RevealText>

          <div className="mx-auto max-w-3xl">
            <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
              {[
                { name: "Frontend", percentage: 70 },
                { name: "Backend", percentage: 82 },
                { name: "Database", percentage: 65 },
                { name: "Programming Languages", percentage: 90 },
              ].map((category, index) => {
                return (
                  <motion.div
                    key={category.name}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="flex flex-col items-center"
                  >
                    <div className="relative mb-3 h-32 w-32">
                      <svg className="h-full w-full" viewBox="0 0 100 100">
                        <circle
                          className="fill-none stroke-gray-200 dark:stroke-gray-700"
                          cx="50"
                          cy="50"
                          r="45"
                          strokeWidth="10"
                        />
                        <motion.circle
                          className={`fill-none stroke-gradient-${index + 1}`}
                          cx="50"
                          cy="50"
                          r="45"
                          strokeWidth="10"
                          strokeDasharray={`${category.percentage * 2.83} 283`}
                          strokeDashoffset="0"
                          strokeLinecap="round"
                          initial={{ strokeDashoffset: 283 }}
                          whileInView={{ strokeDashoffset: 0 }}
                          transition={{ duration: 1.5, delay: index * 0.2, ease: "easeOut" }}
                          viewport={{ once: true }}
                        />
                      </svg>
                      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
                        <span className="text-2xl font-bold text-gray-900 dark:text-white">{category.percentage}%</span>
                      </div>
                    </div>
                    <span className="text-lg font-medium text-gray-900 dark:text-white">{category.name}</span>
                  </motion.div>
                )
              })}
            </div>
          </div>
        </div>
      </div>

      <style jsx global>{`
        .stroke-gradient-1 {
          stroke: url(#gradient-1);
        }
        .stroke-gradient-2 {
          stroke: url(#gradient-2);
        }
        .stroke-gradient-3 {
          stroke: url(#gradient-3);
        }
        .stroke-gradient-4 {
          stroke: url(#gradient-4);
        }
      `}</style>

      <svg width="0" height="0" className="absolute">
        <defs>
          <linearGradient id="gradient-1" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#2dd4bf" />
            <stop offset="100%" stopColor="#3b82f6" />
          </linearGradient>
          <linearGradient id="gradient-2" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#8b5cf6" />
            <stop offset="100%" stopColor="#ec4899" />
          </linearGradient>
          <linearGradient id="gradient-3" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#f59e0b" />
            <stop offset="100%" stopColor="#ef4444" />
          </linearGradient>
          <linearGradient id="gradient-4" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#10b981" />
            <stop offset="100%" stopColor="#0d9488" />
          </linearGradient>
        </defs>
      </svg>
    </section>
  )
}
