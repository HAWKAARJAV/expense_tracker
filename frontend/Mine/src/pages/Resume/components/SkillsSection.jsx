import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Code2, Database, Globe, Smartphone, Server, Paintbrush, Zap, Brain } from 'lucide-react'

const SkillsSection = ({ isDark, setActiveSection }) => {
  const [ref, inView] = useInView({ threshold: 0.3 })
  const [activeCategory, setActiveCategory] = useState('frontend')

  useEffect(() => {
    if (inView) setActiveSection('skills')
  }, [inView, setActiveSection])

  const skillCategories = {
    frontend: {
      title: 'Frontend Development',
      icon: Globe,
      color: 'from-blue-500 to-cyan-500',
      skills: [
        { name: 'React/Next.js', level: 95, description: 'Building modern web applications' },
        { name: 'TypeScript', level: 90, description: 'Type-safe development' },
        { name: 'Tailwind CSS', level: 92, description: 'Responsive design systems' },
        { name: 'JavaScript (ES6+)', level: 94, description: 'Modern JS features' },
        { name: 'HTML5/CSS3', level: 96, description: 'Semantic markup & styling' },
        { name: 'Vue.js', level: 80, description: 'Progressive framework' }
      ]
    },
    backend: {
      title: 'Backend Development',
      icon: Server,
      color: 'from-green-500 to-emerald-500',
      skills: [
        { name: 'Node.js', level: 88, description: 'Server-side JavaScript' },
        { name: 'Express.js', level: 90, description: 'Web application framework' },
        { name: 'Python', level: 85, description: 'Versatile programming' },
        { name: 'GraphQL', level: 82, description: 'API query language' },
        { name: 'REST APIs', level: 92, description: 'RESTful web services' },
        { name: 'Microservices', level: 78, description: 'Distributed architecture' }
      ]
    },
    database: {
      title: 'Database & Tools',
      icon: Database,
      color: 'from-purple-500 to-pink-500',
      skills: [
        { name: 'MongoDB', level: 88, description: 'NoSQL database' },
        { name: 'PostgreSQL', level: 85, description: 'Relational database' },
        { name: 'Redis', level: 80, description: 'In-memory caching' },
        { name: 'Docker', level: 82, description: 'Containerization' },
        { name: 'AWS/Cloud', level: 78, description: 'Cloud services' },
        { name: 'Git', level: 94, description: 'Version control' }
      ]
    },
    mobile: {
      title: 'Mobile & Others',
      icon: Smartphone,
      color: 'from-orange-500 to-red-500',
      skills: [
        { name: 'React Native', level: 85, description: 'Cross-platform apps' },
        { name: 'Flutter', level: 75, description: 'Mobile development' },
        { name: 'PWA', level: 88, description: 'Progressive web apps' },
        { name: 'Electron', level: 80, description: 'Desktop applications' },
        { name: 'WebRTC', level: 70, description: 'Real-time communication' },
        { name: 'Web3/Blockchain', level: 65, description: 'Decentralized apps' }
      ]
    }
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.8,
        staggerChildren: 0.1
      }
    }
  }

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  }

  const SkillBar = ({ skill, index, isActive }) => (
    <motion.div
      className={`p-4 rounded-lg ${
        isDark ? 'bg-gray-800/50' : 'bg-white/80'
      } backdrop-blur-sm border ${
        isDark ? 'border-gray-700' : 'border-gray-200'
      } hover:shadow-lg transition-all duration-300`}
      variants={itemVariants}
      whileHover={{ scale: 1.02, y: -2 }}
      initial="hidden"
      animate={isActive ? "visible" : "hidden"}
      transition={{ delay: index * 0.1 }}
    >
      <div className="flex justify-between items-center mb-2">
        <span className="font-semibold text-lg">{skill.name}</span>
        <span className="text-sm opacity-70">{skill.level}%</span>
      </div>
      <p className="text-sm opacity-60 mb-3">{skill.description}</p>
      <div className={`w-full h-2 ${
        isDark ? 'bg-gray-700' : 'bg-gray-200'
      } rounded-full overflow-hidden`}>
        <motion.div
          className={`h-full bg-gradient-to-r ${skillCategories[activeCategory].color} rounded-full`}
          initial={{ width: 0 }}
          animate={isActive ? { width: `${skill.level}%` } : { width: 0 }}
          transition={{ duration: 1.5, delay: index * 0.2, ease: "easeOut" }}
        />
      </div>
    </motion.div>
  )

  const TechIcon = ({ tech, index }) => (
    <motion.div
      className={`p-4 rounded-xl ${
        isDark ? 'bg-gray-800/30' : 'bg-white/30'
      } backdrop-blur-sm border ${
        isDark ? 'border-gray-700' : 'border-gray-300'
      } hover:border-blue-500 transition-all duration-300 cursor-pointer group`}
      variants={itemVariants}
      whileHover={{ scale: 1.1, rotate: 5 }}
      whileTap={{ scale: 0.95 }}
    >
      <div className={`w-12 h-12 mx-auto mb-2 flex items-center justify-center rounded-lg bg-gradient-to-br ${tech.color}`}>
        <tech.icon className="w-6 h-6 text-white" />
      </div>
      <p className="text-center text-sm font-medium">{tech.name}</p>
      <div className={`mt-2 text-xs text-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${
        isDark ? 'text-gray-400' : 'text-gray-600'
      }`}>
        {tech.level}
      </div>
    </motion.div>
  )

  const techStack = [
    { name: 'React', icon: Code2, color: 'from-blue-400 to-blue-600', level: 'Expert' },
    { name: 'Node.js', icon: Server, color: 'from-green-400 to-green-600', level: 'Advanced' },
    { name: 'MongoDB', icon: Database, color: 'from-green-500 to-green-700', level: 'Advanced' },
    { name: 'Next.js', icon: Globe, color: 'from-gray-700 to-gray-900', level: 'Expert' },
    { name: 'TypeScript', icon: Code2, color: 'from-blue-600 to-blue-800', level: 'Advanced' },
    { name: 'AWS', icon: Zap, color: 'from-orange-400 to-orange-600', level: 'Intermediate' },
    { name: 'Design', icon: Paintbrush, color: 'from-pink-400 to-pink-600', level: 'Advanced' },
    { name: 'AI/ML', icon: Brain, color: 'from-purple-400 to-purple-600', level: 'Learning' },
  ]

  return (
    <div ref={ref} className={`py-20 ${isDark ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="text-center mb-16"
        >
          <motion.h2
            variants={itemVariants}
            className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent"
          >
            Skills & Expertise
          </motion.h2>
          <motion.p
            variants={itemVariants}
            className="text-xl opacity-80 max-w-3xl mx-auto"
          >
            A comprehensive toolkit built through years of passionate development and continuous learning
          </motion.p>
        </motion.div>

        {/* Tech Stack Overview */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="mb-16"
        >
          <motion.h3
            variants={itemVariants}
            className="text-2xl font-bold text-center mb-8"
          >
            Technology Stack
          </motion.h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-4">
            {techStack.map((tech, index) => (
              <TechIcon key={tech.name} tech={tech} index={index} />
            ))}
          </div>
        </motion.div>

        {/* Skill Categories */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Category Navigation */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            className="lg:col-span-1"
          >
            <div className="sticky top-8">
              <h3 className="text-2xl font-bold mb-6">Skill Categories</h3>
              <div className="space-y-2">
                {Object.entries(skillCategories).map(([key, category]) => {
                  const Icon = category.icon
                  return (
                    <motion.button
                      key={key}
                      variants={itemVariants}
                      onClick={() => setActiveCategory(key)}
                      className={`w-full p-4 rounded-lg text-left transition-all duration-300 ${
                        activeCategory === key
                          ? `bg-gradient-to-r ${category.color} text-white shadow-lg`
                          : isDark
                          ? 'bg-gray-800 hover:bg-gray-700 text-gray-300'
                          : 'bg-white hover:bg-gray-50 text-gray-700'
                      }`}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <div className="flex items-center space-x-3">
                        <Icon className="w-6 h-6" />
                        <span className="font-semibold">{category.title}</span>
                      </div>
                    </motion.button>
                  )
                })}
              </div>
            </div>
          </motion.div>

          {/* Skills Display */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            className="lg:col-span-2"
          >
            <div className="mb-6">
              <h3 className="text-2xl font-bold mb-2">
                {skillCategories[activeCategory].title}
              </h3>
              <div className={`w-20 h-1 rounded-full bg-gradient-to-r ${skillCategories[activeCategory].color}`} />
            </div>
            
            <div className="grid sm:grid-cols-2 gap-4">
              {skillCategories[activeCategory].skills.map((skill, index) => (
                <SkillBar
                  key={`${activeCategory}-${skill.name}`}
                  skill={skill}
                  index={index}
                  isActive={inView}
                />
              ))}
            </div>

            {/* Additional Info */}
            <motion.div
              variants={itemVariants}
              className={`mt-8 p-6 rounded-lg ${
                isDark ? 'bg-gray-800/50' : 'bg-blue-50'
              } border ${
                isDark ? 'border-gray-700' : 'border-blue-200'
              }`}
            >
              <h4 className="font-bold text-lg mb-2">Always Learning</h4>
              <p className="opacity-80">
                Technology evolves rapidly, and so do I. Currently exploring advanced concepts in 
                Web3, AI/ML integration, and cloud-native architectures to stay ahead of the curve.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

export default SkillsSection