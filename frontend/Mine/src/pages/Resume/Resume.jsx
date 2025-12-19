import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import HeroSection from './components/HeroSection'
import AboutSection from './components/AboutSection'
import SkillsSection from './components/SkillsSection'
import ExperienceSection from './components/ExperienceSection'
import ProjectsSection from './components/ProjectsSection'
import EducationSection from './components/EducationSection'
import ContactSection from './components/ContactSection'
import Navigation from './components/Navigation'
import ThemeToggle from './components/ThemeToggle'
import { useInView } from 'react-intersection-observer'

const Resume = () => {
  const [isDark, setIsDark] = useState(false)
  const [activeSection, setActiveSection] = useState('hero')

  useEffect(() => {
    // Check for saved theme preference or default to light mode
    const savedTheme = localStorage.getItem('theme')
    if (savedTheme) {
      setIsDark(savedTheme === 'dark')
    }
  }, [])

  useEffect(() => {
    // Apply theme to document
    if (isDark) {
      document.documentElement.classList.add('dark')
      localStorage.setItem('theme', 'dark')
    } else {
      document.documentElement.classList.remove('dark')
      localStorage.setItem('theme', 'light')
    }
  }, [isDark])

  const toggleTheme = () => {
    setIsDark(!isDark)
  }

  return (
    <motion.div 
      className={`min-h-screen transition-colors duration-500 ${
        isDark ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'
      }`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      {/* Navigation */}
      <Navigation isDark={isDark} activeSection={activeSection} setActiveSection={setActiveSection} />
      
      {/* Theme Toggle */}
      <ThemeToggle isDark={isDark} toggleTheme={toggleTheme} />

      {/* Sections */}
      <section id="hero">
        <HeroSection isDark={isDark} setActiveSection={setActiveSection} />
      </section>
      
      <section id="about">
        <AboutSection isDark={isDark} setActiveSection={setActiveSection} />
      </section>
      
      <section id="skills">
        <SkillsSection isDark={isDark} setActiveSection={setActiveSection} />
      </section>
      
      <section id="experience">
        <ExperienceSection isDark={isDark} setActiveSection={setActiveSection} />
      </section>
      
      <section id="projects">
        <ProjectsSection isDark={isDark} setActiveSection={setActiveSection} />
      </section>
      
      <section id="education">
        <EducationSection isDark={isDark} setActiveSection={setActiveSection} />
      </section>
      
      <section id="contact">
        <ContactSection isDark={isDark} setActiveSection={setActiveSection} />
      </section>

      {/* Smooth scroll indicator */}
      <motion.div 
        className="fixed bottom-8 right-8 w-2 h-24 bg-gradient-to-b from-blue-500 to-purple-600 rounded-full opacity-60"
        initial={{ scaleY: 0 }}
        animate={{ scaleY: 1 }}
        transition={{ duration: 1, delay: 2 }}
      />
    </motion.div>
  )
}

export default Resume