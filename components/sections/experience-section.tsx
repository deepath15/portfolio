"use client"

import { useEffect, useRef } from "react"
import { motion } from "framer-motion"
import { Briefcase, Calendar, Building, Award, ArrowRight } from "lucide-react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import RevealText from "@/components/reveal-text"


export default function ExperienceSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const cardsRef = useRef<HTMLDivElement>(null)

  const experiences = [
   {
  company: "GzofTech (Freelance)",
  position: "Full Stack Developer",
  period: "2025",
  description:
    "Worked with GzofTech on developing scalable web applications tailored to client business needs, focusing on full-stack architecture and responsive design.",
  skills: ["React", "Node.js", "Express", "MongoDB", "Tailwind CSS"],
  achievements: [
    "Built and delivered a custom CRM platform with dynamic dashboards",
    "Implemented secure user authentication and access control",
    "Designed reusable UI components for fast development",
    "Collaborated with remote teams using Git and Agile practices",
  ],
},
{
  company: "SkillMate (Freelance)",
  position: "Full Stack Developer",
  period: "2024",
  description:
    "Contributed to SkillMate, a freelancing portal, by developing dynamic user interfaces and integrating real-time Firebase features.",
  skills: ["React", "Tailwind CSS", "Firebase", "JavaScript"],
  achievements: [
    "Developed dashboard and project management pages",
    "Integrated real-time data handling using Firebase Firestore",
    "Implemented responsive UI with modular component architecture",
    "Improved UX through animations and intuitive layouts",
  ],
},
{
  company: "Vault of Code",
  position: "Front End Intern",
  period: "2023",
  description:
    "Completed a web development internship focused on applying modern frontend technologies and collaborative workflows.",
  skills: ["HTML/CSS", "JavaScript", "React", "Git"],
  achievements: [
    "Helped build and optimize the company website",
    "Created interactive educational content on web technologies",
    "Collaborated in team sprints and code reviews",
  ],
},
  ]

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

    if (!sectionRef.current || !cardsRef.current) return

    const cards = cardsRef.current.querySelectorAll(".experience-card")

    cards.forEach((card, index) => {
      gsap.fromTo(
        card,
        {
          y: 50,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 0.5,
          delay: index * 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: card,
            start: "top 90%",
            toggleActions: "play none none reverse",
          },
        },
      )
    })

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
    }
  }, [])

  return (
    <section id="experience" ref={sectionRef} className="relative overflow-hidden bg-white py-24 dark:bg-black">
      {/* Background elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(0,200,255,0.1),transparent_70%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_70%,rgba(0,255,200,0.05),transparent_70%)]"></div>
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
            Work Experience
          </h2>
          <div className="mx-auto h-1 w-20 bg-gradient-to-r from-teal-400 to-blue-500"></div>
          <p className="mx-auto mt-4 max-w-2xl text-gray-600 dark:text-gray-400">
            My professional journey and the creative projects I've had the opportunity to work on.
          </p>
        </motion.div>

        <div ref={cardsRef} className="space-y-8">
          {experiences.map((exp, index) => (
            <div
              key={index}
              className="experience-card overflow-hidden rounded-2xl bg-white opacity-0 shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl dark:bg-gray-800/50"
            >
              <div className="grid md:grid-cols-3">
                {/* Left side - Company info */}
                <div className="bg-gradient-to-br from-teal-400/10 to-blue-500/10 p-6 dark:from-teal-400/5 dark:to-blue-500/5">
                  <div className="mb-4 flex items-center">
                    <Building className="mr-2 h-5 w-5 text-teal-500 dark:text-teal-400" />
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white">{exp.company}</h3>
                  </div>
                  <div className="mb-4 flex items-center">
                    <Briefcase className="mr-2 h-5 w-5 text-blue-500 dark:text-blue-400" />
                    <h4 className="text-lg font-semibold text-gray-800 dark:text-gray-200">{exp.position}</h4>
                  </div>
                  <div className="flex items-center">
                    <Calendar className="mr-2 h-5 w-5 text-gray-600 dark:text-gray-400" />
                    <span className="text-gray-600 dark:text-gray-400">{exp.period}</span>
                  </div>

                  <div className="mt-6 flex flex-wrap gap-2">
                    {exp.skills.map((skill, skillIndex) => (
                      <span
                        key={skillIndex}
                        className="rounded-full bg-white px-3 py-1 text-xs font-medium text-gray-700 shadow-sm dark:bg-gray-700 dark:text-gray-300"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Right side - Description and achievements */}
                <div className="col-span-2 p-6">
                  <RevealText className="mb-6 text-gray-600 dark:text-gray-400">{exp.description}</RevealText>

                  <h5 className="mb-4 flex items-center font-semibold text-gray-900 dark:text-white">
                    <Award className="mr-2 h-5 w-5 text-teal-500 dark:text-teal-400" />
                    Key Achievements
                  </h5>
                  <ul className="space-y-2">
                    {exp.achievements.map((achievement, achievementIndex) => (
                      <motion.li
                        key={achievementIndex}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: achievementIndex * 0.1 }}
                        viewport={{ once: true }}
                        className="flex items-start"
                      >
                        <span className="mr-2 mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-gradient-to-r from-teal-400 to-blue-500"></span>
                        <span className="text-gray-600 dark:text-gray-400">{achievement}</span>
                      </motion.li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          viewport={{ once: true }}
          className="mt-12 text-center"
        >
          <a
            href="/resume.pdf"
            target="_blank"
            className="group inline-flex items-center text-lg font-medium text-teal-500 transition-colors hover:text-teal-600 dark:text-teal-400 dark:hover:text-teal-300"
            rel="noreferrer"
          >
            View Full Resume
            <ArrowRight className="ml-2 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
          </a>
        </motion.div>
      </div>
    </section>
  )
}
