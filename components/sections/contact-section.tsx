"use client"

import type React from "react"

import { useEffect, useRef, useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Send, Mail, Phone, MapPin, Loader2 } from "lucide-react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

export default function ContactSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const formRef = useRef<HTMLFormElement>(null)
  const infoRef = useRef<HTMLDivElement>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

    if (!sectionRef.current || !formRef.current || !infoRef.current) return

    // Animate contact info
    gsap.from(infoRef.current.querySelectorAll(".contact-item"), {
      x: -50,
      opacity: 0,
      stagger: 0.1,
      duration: 0.8,
      scrollTrigger: {
        trigger: infoRef.current,
        start: "top 70%",
      },
    })

    const elements = formRef.current.querySelectorAll(".form-element")
    console.log("GSAP targets:", elements) // Add this line

    gsap.from(elements, {
      y: 30,
      opacity: 0,
      stagger: 0.1,
      duration: 0.6,
      scrollTrigger: {
        trigger: formRef.current,
        start: "top 70%",
      },
    })

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
    }
  }, [])

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)

    const formData = new FormData(formRef.current as HTMLFormElement)
    const data = {
      name: formData.get("name"),
      email: formData.get("email"),
      subject: formData.get("subject"),
      message: formData.get("message"),
    }
    const response = await fetch("/api/sendMail", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
    if (!response.ok) {
      // console.error("Error sending email:", response.statusText)
      setIsSubmitting(false)
      return
    }

    setIsSubmitting(false)
    setIsSubmitted(true)
  }

  const contactInfo = [
    {
      icon: Mail,
      title: "Email",
      value: "deepath1506@gmail.com",
      link: "mailto:deepath1506@gmail.com",
    },
    {
      icon: Phone,
      title: "Phone",
      value: "+91 80722 57125",
      link: "tel:+918072257125",
    },
    // {
    //   icon: MapPin,
    //   title: "Location",
    //   value: "Tamil Nadu, India",
    //   link: "https://maps.google.com/?q=Tamil+Nadu,+India",
    // },
  ]

  return (
    <section id="contact" ref={sectionRef} className="relative overflow-hidden bg-gray-50 py-24 dark:bg-gray-900">
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
            Get In Touch
          </h2>
          <div className="mx-auto h-1 w-20 bg-gradient-to-r from-teal-400 to-blue-500"></div>
          <p className="mx-auto mt-4 max-w-2xl text-gray-600 dark:text-gray-400">
            Have a project in mind or want to discuss potential opportunities? I'd love to hear from you!
          </p>
        </motion.div>

        <div className="mx-auto grid max-w-6xl gap-12 md:grid-cols-2">
          <div ref={infoRef}>
            <h3 className="mb-8 text-2xl font-bold text-gray-900 dark:text-white">Let's Connect</h3>

            <div className="mb-10 space-y-8">
              {contactInfo.map((item, index) => {
                const Icon = item.icon
                return (
                  <div key={index} className="contact-item flex items-start">
                    <div className="mr-4 rounded-xl bg-gradient-to-br from-teal-400/20 to-blue-500/20 p-4 text-teal-500 dark:text-teal-400">
                      <Icon className="h-6 w-6" />
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900 dark:text-white">{item.title}</h4>
                      <a
                        href={item.link}
                        className="text-gray-600 transition-colors hover:text-teal-500 dark:text-gray-400 dark:hover:text-teal-400"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {item.value}
                      </a>
                    </div>
                  </div>
                )
              })}
            </div>

            <div className="rounded-2xl bg-white p-6 shadow-lg dark:bg-gray-800">
              <h4 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">Connect on Social Media</h4>
              <ul className="space-y-3 text-gray-600 dark:text-gray-400">
                <li className="flex items-center justify-between">
                  <span>LinkedIn:</span>
                  <a
                    href="https://linkedin.com/in/deepath-s-b1083626a"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-teal-500 hover:underline dark:text-teal-400"
                  >
                    deepath-s-b1083626a
                  </a>
                </li>
                <li className="flex items-center justify-between">
                  <span>GitHub:</span>
                  <a
                    href="https://github.com/deepath15"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-teal-500 hover:underline dark:text-teal-400"
                  >
                    deepath15
                  </a>
                </li>
              </ul>
              <div className="mt-6 rounded-xl bg-gradient-to-r from-teal-400/10 to-blue-500/10 p-4">
                <p className="text-sm text-gray-700 dark:text-gray-300">
                  Currently Working at Zoho as Member Of Technical Staff.
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-2xl bg-white p-8 shadow-xl dark:bg-gray-800">
            <h3 className="mb-6 text-2xl font-bold text-gray-900 dark:text-white">Send Me a Message</h3>

            {isSubmitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center justify-center py-10 text-center"
              >
                <div className="mb-6 rounded-full bg-gradient-to-r from-teal-400/20 to-blue-500/20 p-4">
                  <Send className="h-8 w-8 text-teal-500 dark:text-teal-400" />
                </div>
                <h4 className="mb-2 text-xl font-bold text-gray-900 dark:text-white">Message Sent!</h4>
                <p className="mb-6 text-gray-600 dark:text-gray-400">
                  Thank you for reaching out. I'll get back to you as soon as possible.
                </p>
                <Button
                  onClick={() => setIsSubmitted(false)}
                  className="rounded-full bg-gradient-to-r from-teal-400 to-blue-500 px-6"
                >
                  Send Another Message
                </Button>
              </motion.div>
            ) : (
              <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
                <div className="form-element grid gap-6 md:grid-cols-2">
                  <div className="space-y-2">
                    <label htmlFor="name" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      Name
                    </label>
                    <Input
                      id="name"
                      name="name"
                      placeholder="Your name"
                      required
                      className="rounded-xl border-gray-300 bg-gray-50 focus:border-teal-500 focus:ring-teal-500 dark:border-gray-700 dark:bg-gray-900/50 dark:focus:border-teal-400"
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      Email
                    </label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="Your email"
                      required
                      className="rounded-xl border-gray-300 bg-gray-50 focus:border-teal-500 focus:ring-teal-500 dark:border-gray-700 dark:bg-gray-900/50 dark:focus:border-teal-400"
                    />
                  </div>
                </div>
                <div className="form-element space-y-2">
                  <label htmlFor="subject" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Subject
                  </label>
                  <Input
                    id="subject"
                    name="subject"
                    placeholder="Subject of your message"
                    required
                    className="rounded-xl border-gray-300 bg-gray-50 focus:border-teal-500 focus:ring-teal-500 dark:border-gray-700 dark:bg-gray-900/50 dark:focus:border-teal-400"
                  />
                </div>
                <div className="form-element space-y-2">
                  <label htmlFor="message" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Message
                  </label>
                  <Textarea
                    id="message"
                    name="message"
                    placeholder="Your message"
                    rows={5}
                    required
                    className="rounded-xl border-gray-300 bg-gray-50 focus:border-teal-500 focus:ring-teal-500 dark:border-gray-700 dark:bg-gray-900/50 dark:focus:border-teal-400"
                  />
                </div>
                <Button
                  type="submit"
                  className=" w-full rounded-xl bg-gradient-to-r from-teal-400 to-blue-500 px-8 py-6 text-lg font-medium text-white transition-all duration-300 hover:shadow-lg disabled:opacity-70"
                  disabled={isSubmitting}
                >
                 
                  {isSubmitting ?  "Sending..." :  " Send Message"  }
                </Button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
