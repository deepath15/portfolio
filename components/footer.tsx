"use client"

import { useEffect, useRef } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { Github, Linkedin, ArrowUp, Mail } from "lucide-react"

export default function Footer() {
  const footerRef = useRef<HTMLElement>(null)
  const topRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

    if (!footerRef.current || !topRef.current) return

    // Animate footer wave
    gsap.fromTo(
      ".footer-wave",
      { y: 50 },
      {
        y: 0,
        duration: 1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: footerRef.current,
          start: "top bottom",
        },
      },
    )

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
    }
  }, [])

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
  }

  const socialLinks = [
    { name: "GitHub", icon: Github, url: "https://github.com/deepath15" },
    { name: "LinkedIn", icon: Linkedin, url: "https://linkedin.com/in/deepath-s-b1083626a" },
    { name: "Email", icon: Mail, url: "mailto:deepath1506@gmail.com" },
  ]

  const footerLinks = [
    { name: "Home", url: "#home" },
    { name: "About", url: "#about" },
    { name: "Skills", url: "#skills" },
    { name: "Projects", url: "#projects" },
    { name: "Experience", url: "#experience" },
    { name: "Contact", url: "#contact" },
  ]

  return (
    <footer ref={footerRef} className="relative bg-gray-900 pt-20 text-white">
      {/* Wave SVG */}
      <div className="absolute -top-20 left-0 w-full overflow-hidden">
        <svg
          className="footer-wave relative block w-full"
          data-name="Layer 1"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
          fill="currentColor"
        >
          <path
            d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z"
            className="fill-gray-900 opacity-25 dark:opacity-20"
          ></path>
          <path
            d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z"
            className="fill-gray-900 opacity-50 dark:opacity-40"
          ></path>
          <path
            d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z"
            className="fill-gray-900"
          ></path>
        </svg>
      </div>

      <div className="container mx-auto px-4">
        <div ref={topRef} className="mb-12 grid gap-8 md:grid-cols-3 lg:grid-cols-5">
          {/* Logo and description */}
          <div className="md:col-span-1 lg:col-start-2">
            <Link href="#home" className="group mb-6 flex items-center text-xl font-bold">
              <span className="mr-2 flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-teal-400 to-blue-500 text-white">
                D
              </span>
              <span className="bg-gradient-to-r from-teal-400 to-blue-500 bg-clip-text text-transparent transition-all duration-300 group-hover:tracking-wider">
                Deepath
              </span>
            </Link>
            <p className="mb-6 text-gray-400">
              Full Stack Developer & Creative Technologist specializing in building exceptional digital experiences with
              modern technologies.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((link, index) => {
                const Icon = link.icon
                return (
                  <motion.a
                    key={link.name}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ y: -5, color: "#2dd4bf" }}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-800 text-gray-400 transition-colors hover:bg-gray-700"
                    aria-label={link.name}
                  >
                    <Icon className="h-5 w-5" />
                  </motion.a>
                )
              })}
            </div>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-1">
            <h3 className="mb-6 text-lg font-bold">Quick Links</h3>
            <ul className="space-y-3">
              {footerLinks.map((link, index) => (
                <motion.li
                  key={link.name}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  viewport={{ once: true }}
                >
                  <Link
                    href={link.url}
                    className="group flex items-center text-gray-400 transition-colors hover:text-teal-400"
                  >
                    <span className="mr-2 h-1.5 w-1.5 rounded-full bg-gray-600 transition-colors group-hover:bg-teal-400"></span>
                    {link.name}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="md:col-span-1">
            <h3 className="mb-6 text-lg font-bold">Contact Info</h3>
            <ul className="space-y-4">
              <motion.li
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                viewport={{ once: true }}
                className="flex items-start"
              >
                <span className="mr-3 mt-1 flex h-6 w-6 items-center justify-center rounded-full bg-gray-800 text-teal-400">
                  <Mail className="h-3 w-3" />
                </span>
                <div>
                  <span className="block text-sm text-gray-500">Email</span>
                  <a href="mailto:deepath1506@gmail.com" className="text-gray-400 hover:text-teal-400">
                    deepath1506@gmail.com
                  </a>
                </div>
              </motion.li>
              <motion.li
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.1 }}
                viewport={{ once: true }}
                className="flex items-start"
              >
                <span className="mr-3 mt-1 flex h-6 w-6 items-center justify-center rounded-full bg-gray-800 text-teal-400">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-3 w-3"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                    />
                  </svg>
                </span>
                <div>
                  <span className="block text-sm text-gray-500">Phone</span>
                  <a href="tel:+918072257125" className="text-gray-400 hover:text-teal-400">
                    +91 80722 57125
                  </a>
                </div>
              </motion.li>
              <motion.li
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.2 }}
                viewport={{ once: true }}
                className="flex items-start"
              >
                <span className="mr-3 mt-1 flex h-6 w-6 items-center justify-center rounded-full bg-gray-800 text-teal-400">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-3 w-3"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                </span>
                <div>
                  <span className="block text-sm text-gray-500">Location</span>
                  <span className="text-gray-400">Tamil Nadu, India</span>
                </div>
              </motion.li>
            </ul>
          </div>

          {/* Newsletter */}
          {/* <div className="md:col-span-1">
            <h3 className="mb-6 text-lg font-bold">Stay Updated</h3>
            <p className="mb-4 text-gray-400">Subscribe to receive updates on my latest projects and experience.</p>
            <form className="space-y-3">
              <div className="relative">
                <input
                  type="email"
                  placeholder="Your email address"
                  className="w-full rounded-lg border border-gray-700 bg-gray-800 px-4 py-3 text-gray-300 focus:border-teal-400 focus:outline-none focus:ring-1 focus:ring-teal-400"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full rounded-lg bg-gradient-to-r from-teal-400 to-blue-500 px-4 py-3 font-medium text-white transition-transform hover:translate-y-[-2px]"
              >
                Subscribe
              </button>
            </form>
          </div> */}
        </div>

        {/* Divider */}
        <div className="h-px w-full bg-gradient-to-r from-transparent via-gray-700 to-transparent"></div>

        {/* Copyright */}
        {/* <div className="flex flex-col items-center justify-between py-8 md:flex-row">
          <p className="mb-4 text-center text-gray-500 md:mb-0">
            © {new Date().getFullYear()} Deepath Selvaraj. All rights reserved.
          </p>
          <div className="flex space-x-6 text-gray-500">
            <Link href="/privacy-policy" className="hover:text-teal-400">
              Privacy Policy
            </Link>
            <Link href="/terms-of-service" className="hover:text-teal-400">
              Terms of Service
            </Link>
          </div>
        </div> */}
      </div>

      {/* Scroll to top button */}
      <motion.button
        onClick={scrollToTop}
        className="fixed bottom-8 right-8 z-50 flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-r from-teal-400 to-blue-500 text-white shadow-lg transition-all duration-300 hover:shadow-teal-400/20"
        whileHover={{ y: -5 }}
        whileTap={{ scale: 0.9 }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <ArrowUp className="h-5 w-5" />
      </motion.button>
    </footer>
  )
}
