"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { motion, useScroll, useTransform, useMotionValue, useSpring } from "framer-motion"
import { ArrowDown, ArrowUp, ExternalLink, Github, Linkedin, Mail, Menu, Moon, Sun, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useTheme } from "next-themes"
import Link from "next/link"

export default function Portfolio() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [showScrollTop, setShowScrollTop] = useState(false)
  const [displayedText, setDisplayedText] = useState("")
  const [currentIndex, setCurrentIndex] = useState(0)
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme } = useTheme()
  const { scrollYProgress } = useScroll()
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"])

  // Mouse position for magnetic effects
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  const fullName = "Benjamin Otieno"

  // Handle mounting
  useEffect(() => {
    setMounted(true)
  }, [])

  // Typewriter effect
  useEffect(() => {
    if (currentIndex < fullName.length) {
      const timeout = setTimeout(() => {
        setDisplayedText(fullName.slice(0, currentIndex + 1))
        setCurrentIndex(currentIndex + 1)
      }, 150)
      return () => clearTimeout(timeout)
    }
  }, [currentIndex, fullName])

  useEffect(() => {
    if (!mounted) return

    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [mounted])

  const scrollToSection = (id: string) => {
    if (typeof window !== "undefined") {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" })
      setIsMenuOpen(false)
    }
  }

  const scrollToTop = () => {
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "smooth" })
    }
  }

  // Magnetic button component
  const MagneticButton = ({ children, className, ...props }: any) => {
    const ref = useState<HTMLButtonElement | null>(null)
    const x = useMotionValue(0)
    const y = useMotionValue(0)
    const springX = useSpring(x, { stiffness: 300, damping: 30 })
    const springY = useSpring(y, { stiffness: 300, damping: 30 })

    const handleMouseMove = (e: React.MouseEvent) => {
      if (!ref.current || !mounted) return
      const rect = ref.current[0]?.getBoundingClientRect()
      if (!rect) return

      const centerX = rect.left + rect.width / 2
      const centerY = rect.top + rect.height / 2
      const deltaX = e.clientX - centerX
      const deltaY = e.clientY - centerY

      x.set(deltaX * 0.3)
      y.set(deltaY * 0.3)
    }

    const handleMouseLeave = () => {
      x.set(0)
      y.set(0)
    }

    return (
      <motion.div
        ref={ref}
        style={{ x: springX, y: springY }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className={className}
        {...props}
      >
        {children}
      </motion.div>
    )
  }

  // Ripple effect component
  const RippleButton = ({ children, onClick, className, ...props }: any) => {
    const [ripples, setRipples] = useState<Array<{ x: number; y: number; id: number }>>([])

    const handleClick = (e: React.MouseEvent) => {
      const rect = e.currentTarget.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top
      const newRipple = { x, y, id: Date.now() }

      setRipples((prev) => [...prev, newRipple])

      setTimeout(() => {
        setRipples((prev) => prev.filter((ripple) => ripple.id !== newRipple.id))
      }, 600)

      if (onClick) onClick(e)
    }

    return (
      <Button className={`relative overflow-hidden ${className}`} onClick={handleClick} {...props}>
        {children}
        {ripples.map((ripple) => (
          <motion.span
            key={ripple.id}
            className="absolute bg-white/30 rounded-full pointer-events-none"
            style={{
              left: ripple.x - 25,
              top: ripple.y - 25,
              width: 50,
              height: 50,
            }}
            initial={{ scale: 0, opacity: 1 }}
            animate={{ scale: 4, opacity: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          />
        ))}
      </Button>
    )
  }

  const projects = [
    {
      title: "Fear Fighter",
      description:
        "An interactive web application designed to help users overcome fears and phobias through guided exercises and progress tracking.",
      tags: ["React", "Next.js", "TypeScript", "CSS"],
      image: "/images/fear-fighter-new-screenshot.jpeg",
      liveUrl: "https://fearfighter.vercel.app/",
      githubUrl: "https://github.com/Ben42asky/fear-fighter.git",
      featured: true,
    },
    {
      title: "Memory Game",
      description:
        "An engaging memory card game built with modern web technologies, featuring multiple difficulty levels and score tracking.",
      tags: ["JavaScript", "TypeScript", "CSS", "Next.js"],
      image: "/images/memory-game-screenshot.png",
      liveUrl: "https://memory-game-liart-mu.vercel.app/",
      githubUrl: "https://github.com/Ben42asky/Memory-game.git",
      featured: true,
    },
    {
      title: "KICD AI Learning Materials",
      description:
        "Integrated AI with the KICD syllabus to create engaging learning materials for schools, providing interactive and personalized educational content.",
      tags: ["AI", "Education", "KICD", "ChatGPT", "Midjourney"],
      image: "/images/kicd-screenshot.png",
      featured: false,
    },
    {
      title: "School Website Development",
      description:
        "Built a comprehensive website for a school using canvas design tools and modern website creation platforms, focusing on user-friendly navigation and engaging content presentation.",
      tags: ["Web Design", "Canvas", "UI/UX", "School"],
      image: "/placeholder.svg?height=300&width=400",
      featured: false,
    },
    {
      title: "Mental Health Gamified App",
      description:
        "Transformed traditional mental health workbooks into an engaging, gamified application to improve user engagement and therapeutic outcomes.",
      tags: ["Gamification", "Mental Health", "React", "UI/UX"],
      image: "/placeholder.svg?height=300&width=400",
      featured: false,
    },
  ]

  const skills = {
    development: ["Python", "JavaScript", "HTML", "CSS", "React", "Node.js", "Vue.js", "PHP"],
    tools: ["Git", "VS Code", "Figma", "MySQL", "MongoDB", "Firebase"],
    ai: ["ChatGPT", "Midjourney", "Perplexity", "AI Integration"],
    soft: ["Project Management", "Client Communication", "Mentorship", "UI/UX Design"],
  }

  // Get featured projects (your real projects)
  const featuredProjects = projects.filter((project) => project.featured)

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

    const particles = Array.from({ length: 20 }, (_, i) => i)

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

  // Don't render until mounted to avoid hydration issues
  if (!mounted) {
    return null
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Navigation */}
      <motion.nav
        className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-md border-b"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <motion.div className="text-2xl font-bold tabular-nums" whileHover={{ scale: 1.05 }}>
            42
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-8">
            {["Home", "About", "Projects", "Skills", "Contact"].map((item) => (
              <MagneticButton
                key={item}
                onClick={() => scrollToSection(item.toLowerCase())}
                className="hover:text-primary transition-colors cursor-pointer bg-transparent border-none p-2"
              >
                {item}
              </MagneticButton>
            ))}
          </div>

          <div className="flex items-center space-x-4">
            <MagneticButton>
              <Button variant="ghost" size="icon" onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
                {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
              </Button>
            </MagneticButton>

            {/* Mobile Menu Button */}
            <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <motion.div
            className="md:hidden bg-background border-t"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
          >
            <div className="container mx-auto px-4 py-4 space-y-4">
              {["Home", "About", "Projects", "Skills", "Contact"].map((item) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item.toLowerCase())}
                  className="block w-full text-left hover:text-primary transition-colors"
                >
                  {item}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </motion.nav>

      {/* Hero Section */}
      <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden">
        <FloatingParticles />

        <motion.div style={{ y }} className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 via-blue-600/20 to-cyan-500/20" />
        </motion.div>

        <div className="container mx-auto px-4 text-center z-10">
          <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            {/* Profile Image */}
            <div className="w-64 h-64 mx-auto mb-8 rounded-2xl overflow-hidden">
              <img
                src="/images/benjamin-profile.jpg"
                alt="Benjamin Otieno - Full-Stack Developer"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Typewriter Effect for Name */}
            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-purple-500 via-blue-600 to-cyan-500 bg-clip-text text-transparent min-h-[1.2em]">
              {displayedText}
              <motion.span
                animate={{ opacity: [1, 0] }}
                transition={{ duration: 0.8, repeat: Number.POSITIVE_INFINITY }}
                className="text-purple-500"
              >
                |
              </motion.span>
            </h1>

            <h2 className="text-2xl md:text-3xl text-muted-foreground mb-6">Full-Stack Developer</h2>

            <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Bridging user needs and technology with scalable, AI-powered solutions.
            </p>

            <MagneticButton>
              <RippleButton size="lg" onClick={() => scrollToSection("projects")} className="mb-16">
                View My Work
              </RippleButton>
            </MagneticButton>
          </motion.div>
        </div>

        <motion.div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
        >
          <ArrowDown className="h-6 w-6 text-muted-foreground" />
        </motion.div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="grid md:grid-cols-2 gap-12 items-center"
          >
            <div>
              <div className="w-80 h-80 mx-auto md:mx-0 rounded-2xl overflow-hidden">
                <img src="/images/benjamin-profile.jpg" alt="Benjamin Otieno" className="w-full h-full object-cover" />
              </div>
            </div>

            <div>
              <h2 className="text-4xl font-bold mb-6">About Me</h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  I'm a self-taught Full-Stack Developer specializing in JavaScript, Python, and AI tools. I build
                  digital products that solve real-world problems, streamline workflows, and improve user experiences.
                </p>
                <p>
                  With experience in UI/UX, project management, and business consulting, I bring empathy, creativity,
                  and technical skills to every project.
                </p>
                <p>
                  I've led educational and rural development initiatives, building accessible websites and content using
                  modern technologies.
                </p>
                <p>I'm passionate about learning, mentoring, and using tech to create sustainable impact.</p>
              </div>

              <div className="mt-8 grid grid-cols-2 gap-4 text-sm">
                <div>
                  <h4 className="font-semibold mb-2">Quick Facts</h4>
                  <ul className="space-y-1 text-muted-foreground">
                    <li>• Self-taught developer</li>
                    <li>• Speaks 2 languages</li>
                    <li>• Fitness enthusiast</li>
                    <li>• Based in Kenya</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Interests</h4>
                  <ul className="space-y-1 text-muted-foreground">
                    <li>• AI & Machine Learning</li>
                    <li>• Rural Development</li>
                    <li>• Education Technology</li>
                    <li>• Mentorship</li>
                  </ul>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20 bg-muted/50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold mb-4">Featured Projects</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              A collection of projects that showcase my skills in full-stack development, interactive applications, and
              user-centered design.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {featuredProjects.map((project, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{
                  y: -10,
                  rotateX: 5,
                  rotateY: 5,
                  scale: 1.02,
                }}
                style={{ transformStyle: "preserve-3d" }}
                className="perspective-1000"
              >
                <Card className="h-full hover:shadow-2xl transition-all duration-300">
                  <div className="aspect-video bg-muted rounded-t-lg overflow-hidden group">
                    <motion.img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover"
                      whileHover={{ scale: 1.1 }}
                      transition={{ duration: 0.3 }}
                    />
                  </div>
                  <CardHeader>
                    <CardTitle className="text-xl">{project.title}</CardTitle>
                    <CardDescription>{project.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.tags.map((tag) => (
                        <Badge key={tag} variant="secondary">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    <div className="flex gap-2">
                      <MagneticButton className="flex-1">
                        <RippleButton
                          variant="outline"
                          className="w-full"
                          onClick={() => window.open(project.liveUrl, "_blank")}
                        >
                          <ExternalLink className="h-4 w-4 mr-2" />
                          View Live
                        </RippleButton>
                      </MagneticButton>
                      <MagneticButton>
                        <RippleButton
                          variant="outline"
                          size="icon"
                          onClick={() => window.open(project.githubUrl, "_blank")}
                        >
                          <Github className="h-4 w-4" />
                        </RippleButton>
                      </MagneticButton>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          <div className="flex justify-center mt-12">
            <MagneticButton>
              <Link href="/projects">
                <RippleButton size="lg" variant="outline" className="group">
                  View All Projects
                  <ArrowDown className="ml-2 h-4 w-4 transition-transform group-hover:translate-y-1" />
                </RippleButton>
              </Link>
            </MagneticButton>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold mb-4">Skills & Tools</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Technologies and tools I use to bring ideas to life.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
              whileHover={{
                scale: 1.02,
                rotateY: 2,
              }}
            >
              <Card className="hover:shadow-lg transition-all duration-300">
                <CardHeader>
                  <CardTitle className="text-lg">Development</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {skills.development.slice(0, 4).map((skill) => (
                      <Badge key={skill} variant="outline">
                        {skill}
                      </Badge>
                    ))}
                    {skills.development.length > 4 && (
                      <Badge variant="outline">+{skills.development.length - 4} more</Badge>
                    )}
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              whileHover={{
                scale: 1.02,
                rotateY: -2,
              }}
            >
              <Card className="hover:shadow-lg transition-all duration-300">
                <CardHeader>
                  <CardTitle className="text-lg">Tools & Technologies</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {skills.tools.slice(0, 4).map((skill) => (
                      <Badge key={skill} variant="outline">
                        {skill}
                      </Badge>
                    ))}
                    {skills.tools.length > 4 && <Badge variant="outline">+{skills.tools.length - 4} more</Badge>}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          <div className="flex justify-center mt-12">
            <MagneticButton>
              <Link href="/skills">
                <RippleButton size="lg" variant="outline" className="group">
                  View All Skills
                  <ArrowDown className="ml-2 h-4 w-4 transition-transform group-hover:translate-y-1" />
                </RippleButton>
              </Link>
            </MagneticButton>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-muted/50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold mb-4">What People Say</h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.02 }}
            className="max-w-4xl mx-auto"
          >
            <Card className="text-center hover:shadow-lg transition-all duration-300">
              <CardContent className="pt-8">
                <blockquote className="text-xl italic mb-6">
                  "Benja is an incredibly fast learner and diligent worker. Highly valued by all those he works with."
                </blockquote>
                <div className="text-muted-foreground">
                  <p className="font-semibold">Josh Read</p>
                  <p>CEO of Fikia</p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold mb-4">Let's Work Together!</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Ready to bring your ideas to life? Let's discuss your project and create something amazing together.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-12 max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.02 }}
            >
              <Card className="hover:shadow-lg transition-all duration-300">
                <CardHeader>
                  <CardTitle>Send a Message</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Input placeholder="Your Name" />
                  <Input type="email" placeholder="Your Email" />
                  <Textarea placeholder="Your Message" rows={5} />
                  <MagneticButton className="w-full">
                    <RippleButton
                      className="w-full"
                      onClick={() =>
                        window.open(
                          "mailto:odedebenjamin7@gmail.com?subject=Portfolio Contact&body=Hi Benjamin, I'd like to get in touch regarding...",
                          "_blank",
                        )
                      }
                    >
                      Send Message
                    </RippleButton>
                  </MagneticButton>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <div>
                <h3 className="text-xl font-semibold mb-4">Get in Touch</h3>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <Mail className="h-5 w-5 text-primary" />
                    <span>odedebenjamin7@gmail.com</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <span className="h-5 w-5 text-primary flex items-center justify-center text-sm">📱</span>
                    <span>+254 114292224</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <span className="h-5 w-5 text-primary flex items-center justify-center text-sm">📍</span>
                    <span>Migori, Kenya</span>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-4">Connect</h3>
                <div className="flex space-x-4">
                  <MagneticButton>
                    <RippleButton
                      variant="outline"
                      size="icon"
                      onClick={() => window.open("https://www.linkedin.com/in/benjamin-odede-a7151a353/", "_blank")}
                    >
                      <Linkedin className="h-5 w-5" />
                    </RippleButton>
                  </MagneticButton>
                  <MagneticButton>
                    <RippleButton
                      variant="outline"
                      size="icon"
                      onClick={() => window.open("https://github.com/Ben42asky", "_blank")}
                    >
                      <Github className="h-5 w-5" />
                    </RippleButton>
                  </MagneticButton>
                  <MagneticButton>
                    <RippleButton
                      variant="outline"
                      size="icon"
                      onClick={() => window.open("mailto:odedebenjamin7@gmail.com", "_blank")}
                    >
                      <Mail className="h-5 w-5" />
                    </RippleButton>
                  </MagneticButton>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-20 bg-muted/50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold mb-4">Where I'm Based</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Located in Migori, Kenya, working with clients globally.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.01 }}
            className="max-w-4xl mx-auto"
          >
            <Card className="overflow-hidden hover:shadow-lg transition-all duration-300">
              <div className="aspect-[16/9] relative">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3989.7567890123456!2d34.4736!3d-1.0634!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMcKwMDMnNDguMiJTIDM0wrAyOCcyNS4wIkU!5e0!3m2!1sen!2ske!4v1234567890123"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="absolute inset-0"
                />
              </div>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 border-t bg-muted/50">
        <div className="container mx-auto px-4 text-center text-muted-foreground">
          <p>&copy; 2025 Benjamin Otieno. All rights reserved.</p>
        </div>
      </footer>

      {/* Scroll to Top Button */}
      {showScrollTop && (
        <MagneticButton>
          <motion.button
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
            onClick={scrollToTop}
            className="fixed bottom-8 right-8 z-50 bg-gradient-to-r from-purple-500 to-blue-600 text-white p-3 rounded-full shadow-lg hover:from-purple-600 hover:to-blue-700 transition-all duration-300"
          >
            <ArrowUp className="h-5 w-5" />
          </motion.button>
        </MagneticButton>
      )}
    </div>
  )
}
