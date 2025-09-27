"use client"

import { motion } from "framer-motion"
import { ArrowLeft, Code, Database, Bot, Wrench } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { useState, useEffect } from "react"

export default function SkillsPage() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const skillCategories = [
    {
      id: "frontend",
      name: "Frontend",
      icon: Code,
      emoji: "🖥",
      skills: ["React", "HTML", "CSS", "JavaScript"],
      color: "from-purple-400 to-blue-600",
    },
    {
      id: "backend",
      name: "Backend",
      icon: Database,
      emoji: "⚙️",
      skills: ["Node.js", "MySQL", "Python"],
      color: "from-blue-400 to-cyan-600",
    },
    {
      id: "ai",
      name: "AI Tools",
      icon: Bot,
      emoji: "🤖",
      skills: ["ChatGPT", "Midjourney", "Claude"],
      color: "from-purple-500 to-pink-600",
    },
    {
      id: "tools",
      name: "Tools",
      icon: Wrench,
      emoji: "🛠",
      skills: ["Git", "VS Code", "Figma", "Canva", "Framer"],
      color: "from-cyan-400 to-blue-600",
    },
  ]

  const softSkills = ["Project Management", "Client Communication", "Mentorship", "UI/UX Design"]

  // Floating particles component
  const FloatingParticles = () => {
    const [windowSize, setWindowSize] = useState({ width: 1000, height: 1000 })

    useEffect(() => {
      if (typeof window !== "undefined") {
        setWindowSize({ width: window.innerWidth, height: window.innerHeight })

        const handleResize = () => {
          setWindowSize({ width: window.innerWidth, height: window.innerHeight })
        }

        window.addEventListener("resize", handleResize)
        return () => window.removeEventListener("resize", handleResize)
      }
    }, [])

    const particles = Array.from({ length: 15 }, (_, i) => i)

    return (
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {particles.map((particle) => (
          <motion.div
            key={particle}
            className="absolute w-2 h-2 bg-purple-400/20 rounded-full"
            initial={{
              x: Math.random() * windowSize.width,
              y: Math.random() * windowSize.height,
            }}
            animate={{
              x: Math.random() * windowSize.width,
              y: Math.random() * windowSize.height,
            }}
            transition={{
              duration: Math.random() * 10 + 10,
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "reverse",
              ease: "linear",
            }}
          />
        ))}
      </div>
    )
  }

  if (!mounted) {
    return null
  }

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      <FloatingParticles />

      {/* Tech gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 via-blue-600/10 to-cyan-500/10 pointer-events-none" />

      <div className="container mx-auto px-4 py-20 relative z-10">
        <div className="mb-8">
          <Link href="/">
            <Button
              variant="ghost"
              className="group mb-4 hover:bg-gradient-to-r hover:from-purple-500/10 hover:to-blue-600/10"
            >
              <ArrowLeft className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1" />
              Back to Home
            </Button>
          </Link>
          <motion.h1
            className="text-4xl font-bold mb-4 bg-gradient-to-r from-purple-500 via-blue-600 to-cyan-500 bg-clip-text text-transparent"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Skills & Expertise
          </motion.h1>
          <p className="text-muted-foreground max-w-2xl">
            A comprehensive overview of my technical skills, tools, and areas of expertise.
          </p>
        </div>

        {/* Technical Skills Grid */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {skillCategories.map((category, categoryIndex) => {
            const IconComponent = category.icon
            return (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: categoryIndex * 0.1 }}
              >
                <Card className="h-full hover:shadow-2xl transition-all duration-300 border-purple-500/20 hover:border-purple-500/40">
                  <CardHeader className="text-center pb-4">
                    <div className="flex items-center justify-center space-x-3 mb-2">
                      <span className="text-3xl">{category.emoji}</span>
                      <IconComponent className="h-6 w-6 text-purple-500" />
                    </div>
                    <CardTitle className="text-xl bg-gradient-to-r from-purple-500 to-blue-600 bg-clip-text text-transparent">
                      {category.name}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 gap-3">
                      {category.skills.map((skill, skillIndex) => (
                        <motion.div
                          key={skill}
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{
                            duration: 0.3,
                            delay: categoryIndex * 0.1 + skillIndex * 0.05,
                            type: "spring",
                            stiffness: 100,
                          }}
                        >
                          <div
                            className={`
                            relative p-4 rounded-lg border-2 border-transparent
                            bg-gradient-to-br ${category.color} bg-opacity-10
                            hover:border-purple-500/30 hover:shadow-lg hover:shadow-purple-500/20
                            transition-all duration-300 cursor-pointer
                            group
                          `}
                          >
                            <div
                              className={`
                              absolute inset-0 rounded-lg opacity-0 group-hover:opacity-20
                              bg-gradient-to-br ${category.color}
                              transition-opacity duration-300
                            `}
                            />
                            <div className="relative text-center">
                              <h3 className="font-semibold text-sm">{skill}</h3>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )
          })}
        </div>

        {/* Soft Skills Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <Card className="border-purple-500/20 hover:border-purple-500/40 hover:shadow-2xl transition-all duration-300">
            <CardHeader className="text-center">
              <div className="flex items-center justify-center space-x-3 mb-2">
                <span className="text-3xl">💡</span>
              </div>
              <CardTitle className="text-xl bg-gradient-to-r from-purple-500 to-blue-600 bg-clip-text text-transparent">
                Soft Skills
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-3 justify-center">
                {softSkills.map((skill, index) => (
                  <motion.div
                    key={skill}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 0.5 + index * 0.1 }}
                  >
                    <Badge
                      variant="secondary"
                      className="px-4 py-2 text-sm hover:bg-gradient-to-r hover:from-purple-500/20 hover:to-blue-600/20 hover:text-purple-700 dark:hover:text-purple-300 transition-all cursor-pointer border border-purple-500/20 hover:border-purple-500/40"
                    >
                      {skill}
                    </Badge>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}
