"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ExternalLink, Github, ChevronLeft, ChevronRight, ArrowRight } from "lucide-react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import RevealText from "@/components/reveal-text"
import ImageEffect from "@/components/image-effect"

export default function ProjectsSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const featuredRef = useRef<HTMLDivElement>(null)
  const [activeProject, setActiveProject] = useState(0)

  interface featuredProjectType {
    title: string
    description: string
    image?: string | undefined
    tags: string[]
    liveUrl: string
    githubUrl: string
  }

  const featuredProjects: featuredProjectType[] = [
    {
      title: "Sketch-to-Code Platform",
      description: "AI-driven code generation from UI designs, transforming sketches into functional frontend code.",
      image: "/low-code.png",
      tags: ["React", "AI", "Node.js", "Canvas API"],
      liveUrl: "low-code.deepath.tech",
      githubUrl: "https://github.com/deepath15/low-code",
    },
   {
      title: "Ease Bot",
      description:
        "A 3D animated navigation of our College named Achariya College Of Engineering at puducherry",
      tags: ["React", "Firebase", "AI", "Node.js"],
      image: "/placeholder.svg",
      liveUrl: "https://easebot.deepath.live",
      githubUrl: "https://github.com/deepath15/easebot",
    },
    {
      title: "Inventory Management System",
      description: "A role-based stock tracking solution for businesses to manage inventory efficiently.",
      image: "/ims.png",
      tags: ["React", "Node.js", "MongoDB", "Express"],
      liveUrl: "https://inventory.deepath.tech",
      githubUrl: "https://github.com/deepath15/shopify",
    },
  ]

  const otherProjects = [
     {
      title: "E-Commerce Dashboard",
      description: "A comprehensive admin dashboard for managing products, orders, and customer data. Implemented with a microservices architecture.",
      tags: ["React", "Chart.js", "Node.js", "MongoDB"],
      liveUrl: "",
      githubUrl: "",
    },
    
    {
      title: "Learning Management System",
      description: "A secure and interactive LMS platform with integrated PDF viewing and AI-powered content reading through API support.",
      tags: ["Next.js", "MongoDB", "Express", "Node.js"],
      liveUrl: "",
      githubUrl: "https://github.com/deepath15/edu",
    },
  ]

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)
    if (!sectionRef.current || !featuredRef.current) return

    gsap.from(featuredRef.current.querySelectorAll(".featured-project"), {
      y: 50,
      opacity: 0,
      stagger: 0.2,
      duration: 0.8,
      ease: "power3.out",
      scrollTrigger: {
        trigger: featuredRef.current,
        start: "top 70%",
      },
    })

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
    }
  }, [])

  const nextProject = () => {
    setActiveProject((prev) => (prev === featuredProjects.length - 1 ? 0 : prev + 1))
  }

  const prevProject = () => {
    setActiveProject((prev) => (prev === 0 ? featuredProjects.length - 1 : prev - 1))
  }

  const projectRefs = useRef<(HTMLDivElement | null)[]>([])
  const isFirstRender = useRef(true);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    const ref = projectRefs.current[activeProject];
    if (ref) {
      ref.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
      });
    }
  }, [activeProject])


  return (
    <section id="projects" ref={sectionRef} className="relative overflow-hidden bg-gray-50 py-24 dark:bg-gray-900">
      <div className="container relative z-10 mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true, margin: "-100px" }}
          className="mb-16 text-center"
        >
          <h2 className="mb-4 text-3xl font-bold sm:text-4xl bg-gradient-to-r from-teal-400 to-blue-500 bg-clip-text text-transparent">
            Featured Projects
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-gray-600 dark:text-gray-400">
            Explore my latest creative works that showcase my skills and passion for building exceptional digital experiences.
          </p>
        </motion.div>

        {/* Featured Project Display */}
        <div ref={featuredRef} className="grid  h-[500px]  gap-8 md:grid-cols-12">
          <div className="md:col-span-8 ">
            <div className="relative h-[500px] overflow-hidden rounded-2xl shadow-xl">
              <ImageEffect
                src={featuredProjects[activeProject].image || "/placeholder.svg"}
                alt={featuredProjects[activeProject].title}
                width={800}
                height={450}
                effect="zoom"
                className="w-full h-full"
              />
              <div className="absolute bottom-0 left-0 w-full p-6 text-white bg-gradient-to-t from-black/80 via-black/40 to-transparent">
                <RevealText className="text-2xl font-bold mb-2">{featuredProjects[activeProject].title}</RevealText>
                <RevealText className="mb-4">{featuredProjects[activeProject].description}</RevealText>
                <div className="mb-4 flex flex-wrap gap-2">
                  {featuredProjects[activeProject].tags.map((tag, i) => (
                    <span key={i} className="rounded-full bg-teal-500/20 px-3 py-1 text-sm text-white">
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="flex gap-4">  
                  <Button asChild size="lg" className="rounded-full bg-gradient-to-r from-teal-400 to-blue-500 px-6">
                    <Link href={featuredProjects[activeProject].liveUrl} target="_blank">
                      Live Demo <ExternalLink className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                  <Button asChild size="lg" className="rounded-full px-6">
                    <Link href={featuredProjects[activeProject].githubUrl} target="_blank">
                      GitHub <Github className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </div>

              <div className="absolute top-4 right-4 flex gap-2">
                <Button size="icon" variant="outline" onClick={prevProject}>
                  <ChevronLeft className="h-5 w-5" />
                </Button>
                <Button size="icon" variant="outline" onClick={nextProject}>
                  <ChevronRight className="h-5 w-5" />
                </Button>
              </div>
            </div>
          </div>

          <div className="md:col-span-4 lg:h-[500px] rounded-md overflow-y-scroll ">
            <div className="grid gap-4">
                  {featuredProjects.map((project, index) => (
                    <div
                      key={index}
                      ref={(el) => { projectRefs.current[index] = el; }}
                      className={`featured-project group cursor-pointer overflow-hidden rounded-xl  ${activeProject === index
                      ? "border-2 border-teal-400 dark:ring-teal-500"
                      : "opacity-70 hover:opacity-100"
                    }`}
                    onClick={() => {setActiveProject(index)}}
                    >
                     <div className="relative aspect-video overflow-hidden">
                    <Image
                      src={project.image || "/placeholder.svg"}
                      alt={project.title}
                      fill
                      className="object-cover  transition-transform duration-300 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, 300px"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                    <div className="absolute bottom-0 left-0 w-full p-4">
                      <h4 className="text-lg font-bold text-white">{project.title}</h4>
                    </div>
                  </div>
                    </div>
                  ))

                  }
            </div>
          </div>


          {/* <div className="md:col-span-4 lg:h-[500px] rounded-md overflow-y-scroll "  >
            <div className="grid gap-4">
              {featuredProjects.map((project, index) => (
                <div
                  key={index}
                  className={`featured-project group cursor-pointer overflow-hidden rounded-xl transition-all duration-300 ${activeProject === index
                      ? "border-2 border-teal-400 dark:ring-teal-500"
                      : "opacity-70 hover:opacity-100"
                    }`}
                  onClick={() => setActiveProject(index)}
                >
                  <div className="relative aspect-video overflow-hidden">
                    <Image
                      src={project.image || "/placeholder.svg"}
                      alt={project.title}
                      fill
                      className="object-cover  transition-transform duration-300 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, 300px"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                    <div className="absolute bottom-0 left-0 w-full p-4">
                      <h4 className="text-lg font-bold text-white">{project.title}</h4>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div> */}


        </div>
        <div className="lg:mt-36">
          <h3 className="mb-8 text-center text-2xl font-bold text-gray-900 dark:text-white">Other Projects</h3>
          <div className="grid gap-6 md:grid-cols-3">
            {otherProjects.map((project, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{
                  y: -0.1,
                  boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
                }}
                className="group rounded-xl bg-white p-6 shadow-lg transition-all duration-500 dark:bg-gray-800/50"
              >
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-teal-400/20 to-blue-500/20 transition-transform duration-300 group-hover:scale-110">
                  <div className="h-6 w-6 rounded-full bg-gradient-to-r from-teal-400 to-blue-500"></div>
                </div>

                <h4 className="mb-3 text-xl font-bold text-gray-900 transition-colors duration-300 group-hover:text-teal-500 dark:text-white dark:group-hover:text-teal-400">
                  {project.title}
                </h4>

                <p className="mb-4 text-gray-600 dark:text-gray-400">{project.description}</p>

                <div className="mb-6 flex flex-wrap gap-2">
                  {project.tags.map((tag, tagIndex) => (
                    <span
                      key={tagIndex}
                      className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-600 transition-colors duration-300 group-hover:bg-teal-50 group-hover:text-teal-600 dark:bg-gray-700 dark:text-gray-300 dark:group-hover:bg-teal-900/20 dark:group-hover:text-teal-300"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="flex justify-between">
                  {project.liveUrl ? (
                    <Link
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center text-sm font-medium text-teal-500 transition-all duration-300 hover:text-teal-600 hover:underline dark:text-teal-400 dark:hover:text-teal-300"
                    >
                      Live Demo <ExternalLink className="ml-1 h-3 w-3" />
                    </Link>
                  ) : (
                    <span
                      className="flex items-center text-sm font-medium text-gray-400 cursor-not-allowed"
                      title="Live demo not available"
                    >
                      Live Demo <ExternalLink className="ml-1 h-3 w-3" />
                    </span>
                  )}
                  {project.githubUrl ? (
                    <Link
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center text-sm font-medium text-gray-600 transition-all duration-300 hover:text-gray-900 hover:underline dark:text-gray-400 dark:hover:text-white"
                    >
                      View Code <Github className="ml-1 h-3 w-3" />
                    </Link>
                  ) : (
                    <span
                      className="flex items-center text-sm font-medium text-gray-400 cursor-not-allowed"
                      title="Code not available"
                    >
                      View Code <Github className="ml-1 h-3 w-3" />
                    </span>
                  )}
                </div>
                <div className="absolute -bottom-px left-0 h-1 w-0 rounded-b-xl bg-gradient-to-r from-teal-400 to-blue-500 transition-all duration-300 group-hover:w-full"></div>
              </motion.div>
            ))}
          </div>

          <div className="mt-10 text-center">
            <Button asChild className="rounded-full bg-gradient-to-r from-teal-400 to-blue-500 px-6">
              <Link href="https://github.com/deepath15" target="_blank" rel="noopener noreferrer">
                View All Projects <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
