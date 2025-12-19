import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Building2, Calendar, MapPin, Award, TrendingUp, Users, Code, Zap } from 'lucide-react'

const ExperienceSection = ({ isDark, setActiveSection }) => {
  const [ref, inView] = useInView({ threshold: 0.2 })
  const [activeExperience, setActiveExperience] = useState(0)

  useEffect(() => {
    if (inView) setActiveSection('experience')
  }, [inView, setActiveSection])

  const experiences = [
    {
      id: 1,
      company: "TechCorp Solutions",
      position: "Senior Full-Stack Developer",
      period: "2022 - Present",
      location: "San Francisco, CA",
      type: "Full-time",
      description: "Leading development of scalable web applications serving 100K+ users daily. Architecting microservices infrastructure and mentoring junior developers.",
      achievements: [
        "Reduced application load time by 60% through performance optimization",
        "Led a team of 5 developers in rebuilding the core platform",
        "Implemented CI/CD pipeline reducing deployment time by 75%",
        "Increased test coverage from 45% to 95%"
      ],
      technologies: ["React", "Node.js", "PostgreSQL", "Docker", "AWS", "TypeScript"],
      icon: Building2,
      color: "from-blue-500 to-purple-600"
    },
    {
      id: 2,
      company: "StartupX",
      position: "Frontend Developer",
      period: "2020 - 2022",
      location: "Austin, TX",
      type: "Full-time",
      description: "Developed responsive web applications using modern frontend technologies. Collaborated closely with design and backend teams to deliver pixel-perfect user experiences.",
      achievements: [
        "Built 15+ reusable React components increasing development speed by 40%",
        "Implemented responsive design system used across 10+ products",
        "Optimized bundle size reducing initial load time by 45%",
        "Maintained 98% client satisfaction score"
      ],
      technologies: ["React", "Vue.js", "Sass", "JavaScript", "REST APIs", "Git"],
      icon: TrendingUp,
      color: "from-green-500 to-teal-600"
    },
    {
      id: 3,
      company: "Digital Agency Pro",
      position: "Junior Web Developer",
      period: "2019 - 2020",
      location: "New York, NY",
      type: "Full-time",
      description: "Started my professional journey developing websites and web applications for various clients. Gained experience in full development lifecycle from concept to deployment.",
      achievements: [
        "Delivered 20+ client projects with 100% on-time completion",
        "Reduced average project delivery time by 30%",
        "Achieved 95% client retention rate",
        "Mentored 3 intern developers"
      ],
      technologies: ["HTML5", "CSS3", "JavaScript", "WordPress", "PHP", "MySQL"],
      icon: Code,
      color: "from-orange-500 to-red-600"
    },
    {
      id: 4,
      company: "FreelanceHub",
      position: "Freelance Developer",
      period: "2018 - 2019",
      location: "Remote",
      type: "Contract",
      description: "Worked with multiple clients to build custom websites and web applications. Specialized in e-commerce solutions and responsive design implementation.",
      achievements: [
        "Completed 50+ freelance projects with 5-star ratings",
        "Generated $100K+ revenue through client work",
        "Built long-term relationships with 15+ repeat clients",
        "Developed expertise in e-commerce platforms"
      ],
      technologies: ["WordPress", "Shopify", "JavaScript", "PHP", "CSS3", "Bootstrap"],
      icon: Users,
      color: "from-purple-500 to-pink-600"
    }
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.8,
        staggerChildren: 0.2
      }
    }
  }

  const itemVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  }

  const TimelineItem = ({ experience, index, isActive }) => {
    const Icon = experience.icon
    const isEven = index % 2 === 0

    return (
      <motion.div
        className={`flex items-center mb-12 ${
          isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'
        }`}
        variants={itemVariants}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
      >
        {/* Content Card */}
        <motion.div
          className={`lg:w-5/12 w-full ${
            isEven ? 'lg:pr-8' : 'lg:pl-8'
          }`}
          whileHover={{ scale: 1.02, y: -5 }}
          transition={{ duration: 0.3 }}
        >
          <div
            className={`p-6 rounded-xl ${
              isDark ? 'bg-gray-800/80' : 'bg-white'
            } backdrop-blur-sm border ${
              isDark ? 'border-gray-700' : 'border-gray-200'
            } shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer`}
            onClick={() => setActiveExperience(index)}
          >
            {/* Header */}
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-xl font-bold mb-1">{experience.position}</h3>
                <p className="text-lg text-blue-500 font-semibold mb-2">{experience.company}</p>
                <div className="flex flex-wrap gap-3 text-sm opacity-75">
                  <div className="flex items-center">
                    <Calendar className="w-4 h-4 mr-1" />
                    {experience.period}
                  </div>
                  <div className="flex items-center">
                    <MapPin className="w-4 h-4 mr-1" />
                    {experience.location}
                  </div>
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    experience.type === 'Full-time' 
                      ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                      : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                  }`}>
                    {experience.type}
                  </span>
                </div>
              </div>
              <div className={`p-3 rounded-lg bg-gradient-to-br ${experience.color}`}>
                <Icon className="w-6 h-6 text-white" />
              </div>
            </div>

            {/* Description */}
            <p className="text-gray-600 dark:text-gray-300 mb-4 leading-relaxed">
              {experience.description}
            </p>

            {/* Key Achievements */}
            <div className="mb-4">
              <h4 className="font-semibold mb-2 flex items-center">
                <Award className="w-4 h-4 mr-2 text-yellow-500" />
                Key Achievements
              </h4>
              <ul className="space-y-1">
                {experience.achievements.slice(0, 3).map((achievement, idx) => (
                  <li key={idx} className="text-sm opacity-80 flex items-start">
                    <span className="w-2 h-2 bg-blue-500 rounded-full mr-2 mt-2 flex-shrink-0" />
                    {achievement}
                  </li>
                ))}
              </ul>
            </div>

            {/* Technologies */}
            <div>
              <h4 className="font-semibold mb-2 text-sm">Technologies Used</h4>
              <div className="flex flex-wrap gap-1">
                {experience.technologies.map((tech, idx) => (
                  <span
                    key={idx}
                    className={`px-2 py-1 text-xs rounded-full ${
                      isDark 
                        ? 'bg-gray-700 text-gray-300' 
                        : 'bg-gray-100 text-gray-700'
                    }`}
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Timeline Line and Dot */}
        <div className="lg:w-2/12 w-full flex justify-center relative hidden lg:block">
          <motion.div
            className={`w-4 h-4 rounded-full bg-gradient-to-br ${experience.color} z-10 relative`}
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <motion.div
              className={`w-8 h-8 rounded-full bg-gradient-to-br ${experience.color} absolute -top-2 -left-2 opacity-20`}
              animate={{ scale: [1, 1.5, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </motion.div>
          {index < experiences.length - 1 && (
            <motion.div
              className={`absolute w-0.5 h-24 ${
                isDark ? 'bg-gray-700' : 'bg-gray-300'
              } top-4`}
              initial={{ height: 0 }}
              whileInView={{ height: '6rem' }}
              viewport={{ once: true }}
              transition={{ delay: 0.5, duration: 0.8 }}
            />
          )}
        </div>

        {/* Spacer for opposite side */}
        <div className="lg:w-5/12 hidden lg:block" />
      </motion.div>
    )
  }

  return (
    <div ref={ref} className={`py-20 ${isDark ? 'bg-gray-800' : 'bg-white'}`}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
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
            Professional Journey
          </motion.h2>
          <motion.p
            variants={itemVariants}
            className="text-xl opacity-80 max-w-3xl mx-auto"
          >
            A progressive career path showcasing growth, impact, and continuous learning
          </motion.p>
        </motion.div>

        {/* Experience Stats */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16"
        >
          {[
            { label: "Years Experience", value: "5+", icon: Calendar, color: "text-blue-500" },
            { label: "Projects Completed", value: "100+", icon: Code, color: "text-green-500" },
            { label: "Teams Led", value: "3", icon: Users, color: "text-purple-500" },
            { label: "Technologies Mastered", value: "20+", icon: Zap, color: "text-orange-500" }
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              variants={itemVariants}
              className={`text-center p-6 rounded-lg ${
                isDark ? 'bg-gray-900/50' : 'bg-gray-50'
              } border ${
                isDark ? 'border-gray-700' : 'border-gray-200'
              }`}
            >
              <stat.icon className={`w-8 h-8 mx-auto mb-3 ${stat.color}`} />
              <div className="text-3xl font-bold mb-1">{stat.value}</div>
              <div className="text-sm opacity-70">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Central line for large screens */}
          <div className="hidden lg:block absolute left-1/2 transform -translate-x-1/2 w-0.5 h-full bg-gradient-to-b from-blue-500 to-purple-600 opacity-30" />
          
          {experiences.map((experience, index) => (
            <TimelineItem
              key={experience.id}
              experience={experience}
              index={index}
              isActive={activeExperience === index}
            />
          ))}
        </div>

        {/* Call to Action */}
        <motion.div
          variants={itemVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="text-center mt-16"
        >
          <div className={`p-8 rounded-xl ${
            isDark ? 'bg-gradient-to-r from-gray-800 to-gray-900' : 'bg-gradient-to-r from-blue-50 to-purple-50'
          } border ${
            isDark ? 'border-gray-700' : 'border-gray-200'
          }`}>
            <h3 className="text-2xl font-bold mb-4">Ready for the Next Challenge</h3>
            <p className="text-lg opacity-80 mb-6 max-w-2xl mx-auto">
              Looking to join a forward-thinking team where I can contribute to meaningful projects 
              and continue growing as a developer.
            </p>
            <motion.button
              className={`px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 ${
                isDark 
                  ? 'bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700' 
                  : 'bg-gradient-to-r from-blue-600 to-purple-700 hover:from-blue-700 hover:to-purple-800'
              } text-white shadow-lg hover:shadow-xl transform hover:-translate-y-1`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => document.getElementById('contact').scrollIntoView({ behavior: 'smooth' })}
            >
              Let's Work Together
            </motion.button>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default ExperienceSection