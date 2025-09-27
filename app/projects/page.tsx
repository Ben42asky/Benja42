"use client"
import { motion } from "framer-motion"
import { ArrowLeft, ExternalLink, Github } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { useState, useEffect } from "react"

export default function ProjectsPage() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const projects = [
    {
      title: "Fear Fighter",
      description:
        "An interactive web application designed to help users overcome fears and phobias through guided exercises and progress tracking. Built with Next.js and TypeScript for optimal performance and type safety.",
      tags: ["React", "Next.js", "TypeScript", "CSS"],
      image: "/images/fear-fighter-new-screenshot.jpeg",
      liveUrl: "https://fearfighter.vercel.app/",
      githubUrl: "https://github.com/Ben42asky/fear-fighter.git",
      featured: true,
    },
    {
      title: "Memory Game",
      description:
        "An engaging memory card game built with modern web technologies, featuring multiple difficulty levels, score tracking, and responsive design. Developed using Next.js and TypeScript.",
      tags: ["JavaScript", "TypeScript", "CSS", "Next.js"],
      image: "/images/memory-game-screenshot.png",
      liveUrl: "https://memory-game-liart-mu.vercel.app/",
      githubUrl: "https://github.com/Ben42asky/Memory-game.git",
      featured: true,
    },
    {
      title: "KICD AI Learning Materials",
      description:
        "Integrated AI with the KICD (Kenya Institute of Curriculum Development) syllabus to create engaging learning materials for schools. This project combines artificial intelligence with educational content to provide interactive and personalized learning experiences that align with Kenya's national curriculum standards.",
      tags: ["AI", "Education", "KICD", "ChatGPT", "Midjourney"],
      image: "/images/kicd-screenshot.png",
      documentUrl:
        "https://docs.google.com/document/d/e/2PACX-1vRm0tyAJ-pAPZ8LP-lAl4H1m_ls5AyVSxo7nJdGZauXfNwKaYtb6OTzQhPFSwC1eBIeNyqXrU4p23hx/pub",
      featured: false,
    },
    {
      title: "School Website Development",
      description:
        "Built a comprehensive website for a school using canvas design tools and modern website creation platforms. The project focused on creating user-friendly navigation, engaging content presentation, and responsive design to enhance the school's online presence and communication with students and parents.",
      tags: ["Web Design", "Canvas", "UI/UX", "School"],
      image: "/placeholder.svg?height=300&width=400",
      featured: false,
    },
    {
      title: "Mental Health Gamified App",
      description:
        "Transformed traditional mental health workbooks into an engaging, gamified application designed to improve user engagement and therapeutic outcomes. The app incorporates game mechanics, progress tracking, and interactive elements to make mental health resources more accessible and engaging for users.",
      tags: ["Gamification", "Mental Health", "React", "UI/UX"],
      image: "/placeholder.svg?height=300&width=400",
      featured: false,
    },
  ]

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
            All Projects
          </motion.h1>
          <p className="text-muted-foreground max-w-2xl">
            Browse through my complete portfolio of projects spanning web development, interactive applications, and
            more.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{
                y: -5,
                scale: 1.02,
                boxShadow: "0 20px 40px rgba(147, 51, 234, 0.1)",
              }}
            >
              <Card className="h-full hover:shadow-2xl transition-all duration-300 border-purple-500/20 hover:border-purple-500/40">
                <div className="aspect-video bg-gradient-to-br from-purple-500/20 via-blue-600/20 to-cyan-500/20 rounded-t-lg overflow-hidden">
                  <motion.img
                    src={project.image || "/placeholder.svg"}
                    alt={project.title}
                    className="w-full h-full object-cover"
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.3 }}
                  />
                </div>
                <CardHeader>
                  <CardTitle className="text-xl flex items-center justify-between">
                    {project.title}
                    {project.featured && (
                      <Badge
                        variant="secondary"
                        className="text-xs bg-gradient-to-r from-purple-500 to-blue-600 text-white"
                      >
                        Live
                      </Badge>
                    )}
                  </CardTitle>
                  <CardDescription>{project.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tags.map((tag) => (
                      <Badge
                        key={tag}
                        variant="secondary"
                        className="hover:bg-gradient-to-r hover:from-purple-500/20 hover:to-blue-600/20 transition-all"
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  <div className="flex gap-2">
                    {project.liveUrl ? (
                      <Button
                        variant="outline"
                        className="flex-1 hover:bg-gradient-to-r hover:from-purple-500/10 hover:to-blue-600/10 hover:border-purple-500/50"
                        onClick={() => window.open(project.liveUrl, "_blank")}
                      >
                        <ExternalLink className="h-4 w-4 mr-2" />
                        View Live
                      </Button>
                    ) : project.documentUrl ? (
                      <Button
                        variant="outline"
                        className="flex-1 hover:bg-gradient-to-r hover:from-purple-500/10 hover:to-blue-600/10 hover:border-purple-500/50"
                        onClick={() => window.open(project.documentUrl, "_blank")}
                      >
                        <ExternalLink className="h-4 w-4 mr-2" />
                        View Document
                      </Button>
                    ) : (
                      <Button variant="outline" className="flex-1" disabled>
                        <ExternalLink className="h-4 w-4 mr-2" />
                        Coming Soon
                      </Button>
                    )}
                    <Button
                      variant="outline"
                      size="icon"
                      className="hover:bg-gradient-to-r hover:from-purple-500/10 hover:to-blue-600/10 hover:border-purple-500/50"
                      onClick={() => project.githubUrl && window.open(project.githubUrl, "_blank")}
                      disabled={!project.githubUrl}
                    >
                      <Github className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}
