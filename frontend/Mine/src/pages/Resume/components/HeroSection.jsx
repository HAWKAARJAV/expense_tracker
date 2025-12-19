import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { ChevronDown, Github, Linkedin, Mail, Download, Code, Coffee, Heart } from 'lucide-react'

const HeroSection = ({ isDark, setActiveSection }) => {
  const [ref, inView] = useInView({ threshold: 0.5 })
  const [typedText, setTypedText] = useState('')
  const [currentIndex, setCurrentIndex] = useState(0)
  const roles = [
    'Full-Stack Developer',
    'React Enthusiast',
    'Problem Solver',
    'Tech Innovator',
    'Code Artist'
  ]

  useEffect(() => {
    if (inView) setActiveSection('hero')
  }, [inView, setActiveSection])

  useEffect(() => {
    const currentRole = roles[currentIndex]
    let charIndex = 0
    const typingInterval = setInterval(() => {
      if (charIndex <= currentRole.length) {
        setTypedText(currentRole.slice(0, charIndex))
        charIndex++
      } else {
        setTimeout(() => {
          charIndex = 0
          setCurrentIndex((prev) => (prev + 1) % roles.length)
        }, 2000)
      }
    }, 100)

    return () => clearInterval(typingInterval)
  }, [currentIndex])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 1,
        staggerChildren: 0.3
      }
    }
  }

  const itemVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  }

  const FloatingParticle = ({ delay, duration, x, y }) => (
    <motion.div
      className={`absolute w-2 h-2 ${isDark ? 'bg-blue-400' : 'bg-blue-600'} rounded-full opacity-20`}
      animate={{
        y: [y, y - 100, y],
        x: [x, x + 50, x - 50, x],
        opacity: [0.2, 0.8, 0.2]
      }}
      transition={{
        duration: duration,
        delay: delay,
        repeat: Infinity,
        ease: "easeInOut"
      }}
    />
  )

  return (
    <div ref={ref} className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0">
        {/* Gradient overlay */}
        <div className={`absolute inset-0 ${
          isDark 
            ? 'bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900' 
            : 'bg-gradient-to-br from-blue-50 via-white to-purple-50'
        }`} />
        
        {/* Floating particles */}
        {[...Array(20)].map((_, i) => (
          <FloatingParticle
            key={i}
            delay={i * 0.2}
            duration={8 + Math.random() * 4}
            x={Math.random() * window.innerWidth}
            y={Math.random() * window.innerHeight}
          />
        ))}

        {/* Geometric shapes */}
        <motion.div
          className={`absolute top-20 left-20 w-32 h-32 ${
            isDark ? 'border-blue-400' : 'border-blue-600'
          } border-2 rounded-full opacity-20`}
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        />
        <motion.div
          className={`absolute bottom-20 right-20 w-24 h-24 ${
            isDark ? 'bg-purple-400' : 'bg-purple-600'
          } opacity-10 rounded-lg`}
          animate={{ 
            rotate: [0, 45, 0],
            scale: [1, 1.1, 1]
          }}
          transition={{ duration: 6, repeat: Infinity }}
        />
      </div>

      {/* Main content */}
      <motion.div
        className="relative z-10 text-center max-w-4xl mx-auto px-4"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Profile Image */}
        <motion.div
          variants={itemVariants}
          className="mb-8"
        >
          <motion.div
            className="relative inline-block"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
          >
            <div className={`w-32 h-32 mx-auto rounded-full ${
              isDark ? 'bg-gradient-to-r from-blue-400 to-purple-500' : 'bg-gradient-to-r from-blue-500 to-purple-600'
            } p-1`}>
              <div className={`w-full h-full rounded-full ${
                isDark ? 'bg-gray-800' : 'bg-gray-100'
              } flex items-center justify-center text-4xl font-bold`}>
                AJ
              </div>
            </div>
            <motion.div
              className={`absolute -bottom-2 -right-2 w-8 h-8 ${
                isDark ? 'bg-green-400' : 'bg-green-500'
              } rounded-full border-4 ${
                isDark ? 'border-gray-900' : 'border-white'
              }`}
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </motion.div>
        </motion.div>

        {/* Name */}
        <motion.h1
          variants={itemVariants}
          className="text-6xl md:text-7xl font-bold mb-4 bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent"
        >
          Aarjav Jain
        </motion.h1>

        {/* Typed Role */}
        <motion.div
          variants={itemVariants}
          className="h-16 flex items-center justify-center mb-8"
        >
          <span className="text-2xl md:text-3xl font-semibold">
            {typedText}
            <motion.span
              animate={{ opacity: [0, 1, 0] }}
              transition={{ duration: 1, repeat: Infinity }}
              className="ml-1 text-blue-500"
            >
              |
            </motion.span>
          </span>
        </motion.div>

        {/* Description */}
        <motion.p
          variants={itemVariants}
          className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto leading-relaxed opacity-90"
        >
          Crafting digital experiences with passion, precision, and a touch of magic. 
          Turning ideas into reality through clean code and innovative solutions.
        </motion.p>

        {/* Stats */}
        <motion.div
          variants={itemVariants}
          className="flex justify-center space-x-8 mb-8"
        >
          {[
            { icon: Code, label: "Projects", value: "50+" },
            { icon: Coffee, label: "Cups of Coffee", value: "∞" },
            { icon: Heart, label: "Lines of Code", value: "100K+" }
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              className="text-center"
              whileHover={{ scale: 1.1 }}
              transition={{ duration: 0.3 }}
            >
              <stat.icon className="w-8 h-8 mx-auto mb-2 text-blue-500" />
              <div className="text-2xl font-bold">{stat.value}</div>
              <div className="text-sm opacity-70">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* Action buttons */}
        <motion.div
          variants={itemVariants}
          className="flex flex-col sm:flex-row gap-4 justify-center mb-12"
        >
          <motion.button
            className={`px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 ${
              isDark 
                ? 'bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700' 
                : 'bg-gradient-to-r from-blue-600 to-purple-700 hover:from-blue-700 hover:to-purple-800'
            } text-white shadow-lg hover:shadow-xl transform hover:-translate-y-1`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Download className="w-5 h-5 inline mr-2" />
            Download Resume
          </motion.button>
          
          <motion.button
            className={`px-8 py-4 rounded-full font-semibold text-lg border-2 transition-all duration-300 ${
              isDark 
                ? 'border-blue-400 text-blue-400 hover:bg-blue-400 hover:text-gray-900' 
                : 'border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white'
            } shadow-lg hover:shadow-xl transform hover:-translate-y-1`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => document.getElementById('contact').scrollIntoView({ behavior: 'smooth' })}
          >
            <Mail className="w-5 h-5 inline mr-2" />
            Let's Connect
          </motion.button>
        </motion.div>

        {/* Social links */}
        <motion.div
          variants={itemVariants}
          className="flex justify-center space-x-6 mb-12"
        >
          {[
            { icon: Github, href: "https://github.com", label: "GitHub" },
            { icon: Linkedin, href: "https://linkedin.com", label: "LinkedIn" },
            { icon: Mail, href: "mailto:hello@example.com", label: "Email" }
          ].map((social) => (
            <motion.a
              key={social.label}
              href={social.href}
              className={`p-3 rounded-full transition-all duration-300 ${
                isDark 
                  ? 'bg-gray-800 hover:bg-blue-600 text-gray-300 hover:text-white' 
                  : 'bg-gray-100 hover:bg-blue-600 text-gray-600 hover:text-white'
              } shadow-lg hover:shadow-xl`}
              whileHover={{ scale: 1.1, y: -5 }}
              whileTap={{ scale: 0.9 }}
            >
              <social.icon className="w-6 h-6" />
            </motion.a>
          ))}
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          variants={itemVariants}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="cursor-pointer"
            onClick={() => document.getElementById('about').scrollIntoView({ behavior: 'smooth' })}
          >
            <ChevronDown className="w-8 h-8 text-blue-500" />
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  )
}

export default HeroSection