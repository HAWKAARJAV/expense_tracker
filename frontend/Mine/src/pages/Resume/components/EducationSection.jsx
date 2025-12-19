import React, { useEffect } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { GraduationCap, Award, BookOpen, Calendar, MapPin } from 'lucide-react'

const EducationSection = ({ isDark, setActiveSection }) => {
  const [ref, inView] = useInView({ threshold: 0.3 })

  useEffect(() => {
    if (inView) setActiveSection('education')
  }, [inView, setActiveSection])

  const education = [
    {
      degree: "Master of Science in Computer Science",
      school: "Stanford University",
      period: "2017 - 2019",
      location: "Stanford, CA",
      gpa: "3.9/4.0",
      description: "Specialized in Software Engineering and Machine Learning. Thesis on distributed systems optimization.",
      achievements: ["Dean's List", "Teaching Assistant", "Research Publication"],
      color: "from-blue-500 to-purple-600"
    },
    {
      degree: "Bachelor of Science in Computer Engineering",
      school: "University of California, Berkeley",
      period: "2013 - 2017",
      location: "Berkeley, CA",
      gpa: "3.8/4.0",
      description: "Comprehensive foundation in computer systems, algorithms, and software development.",
      achievements: ["Magna Cum Laude", "ACM Chapter President", "Hackathon Winner"],
      color: "from-green-500 to-teal-600"
    }
  ]

  const certifications = [
    { name: "AWS Solutions Architect", issuer: "Amazon", year: "2023" },
    { name: "Google Cloud Professional", issuer: "Google", year: "2022" },
    { name: "React Advanced Patterns", issuer: "Meta", year: "2022" },
    { name: "Kubernetes Administrator", issuer: "CNCF", year: "2021" }
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

  return (
    <div ref={ref} className={`py-20 ${isDark ? 'bg-gray-900' : 'bg-gray-50'}`}>
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
            Education & Certifications
          </motion.h2>
          <motion.p
            variants={itemVariants}
            className="text-xl opacity-80 max-w-3xl mx-auto"
          >
            Academic foundation and continuous learning journey
          </motion.p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Education */}
          <div className="lg:col-span-2">
            <motion.h3
              variants={itemVariants}
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
              className="text-2xl font-bold mb-6 flex items-center"
            >
              <GraduationCap className="w-6 h-6 mr-3 text-blue-500" />
              Education
            </motion.h3>
            
            <div className="space-y-6">
              {education.map((edu, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  initial="hidden"
                  animate={inView ? "visible" : "hidden"}
                  transition={{ delay: index * 0.2 }}
                  className={`p-6 rounded-xl ${
                    isDark ? 'bg-gray-800/80' : 'bg-white'
                  } backdrop-blur-sm border ${
                    isDark ? 'border-gray-700' : 'border-gray-200'
                  } shadow-lg hover:shadow-xl transition-all duration-300`}
                  whileHover={{ scale: 1.02, y: -5 }}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h4 className="text-xl font-bold mb-1">{edu.degree}</h4>
                      <p className="text-lg text-blue-500 font-semibold mb-2">{edu.school}</p>
                      <div className="flex flex-wrap gap-3 text-sm opacity-75 mb-2">
                        <div className="flex items-center">
                          <Calendar className="w-4 h-4 mr-1" />
                          {edu.period}
                        </div>
                        <div className="flex items-center">
                          <MapPin className="w-4 h-4 mr-1" />
                          {edu.location}
                        </div>
                        <div className="flex items-center">
                          <Award className="w-4 h-4 mr-1" />
                          GPA: {edu.gpa}
                        </div>
                      </div>
                    </div>
                    <div className={`p-3 rounded-lg bg-gradient-to-br ${edu.color}`}>
                      <GraduationCap className="w-6 h-6 text-white" />
                    </div>
                  </div>

                  <p className="text-gray-600 dark:text-gray-300 mb-4 leading-relaxed">
                    {edu.description}
                  </p>

                  <div>
                    <h5 className="font-semibold mb-2 text-sm">Achievements</h5>
                    <div className="flex flex-wrap gap-2">
                      {edu.achievements.map((achievement, idx) => (
                        <span
                          key={idx}
                          className={`px-3 py-1 text-xs rounded-full ${
                            isDark ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-700'
                          }`}
                        >
                          {achievement}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Certifications */}
          <div>
            <motion.h3
              variants={itemVariants}
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
              className="text-2xl font-bold mb-6 flex items-center"
            >
              <Award className="w-6 h-6 mr-3 text-purple-500" />
              Certifications
            </motion.h3>
            
            <div className="space-y-4">
              {certifications.map((cert, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  initial="hidden"
                  animate={inView ? "visible" : "hidden"}
                  transition={{ delay: (index + 2) * 0.2 }}
                  className={`p-4 rounded-lg ${
                    isDark ? 'bg-gray-800/50' : 'bg-white/80'
                  } backdrop-blur-sm border ${
                    isDark ? 'border-gray-700' : 'border-gray-200'
                  } hover:shadow-lg transition-all duration-300`}
                  whileHover={{ scale: 1.03 }}
                >
                  <h4 className="font-semibold text-sm mb-1">{cert.name}</h4>
                  <p className="text-xs opacity-70 mb-1">{cert.issuer}</p>
                  <p className="text-xs text-blue-500 font-medium">{cert.year}</p>
                </motion.div>
              ))}
            </div>

            {/* Additional Learning */}
            <motion.div
              variants={itemVariants}
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
              className={`mt-8 p-6 rounded-xl ${
                isDark ? 'bg-gray-800/50' : 'bg-blue-50'
              } border ${
                isDark ? 'border-gray-700' : 'border-blue-200'
              }`}
            >
              <h4 className="font-bold text-lg mb-3 flex items-center">
                <BookOpen className="w-5 h-5 mr-2 text-blue-500" />
                Continuous Learning
              </h4>
              <p className="text-sm opacity-80 mb-3">
                I believe in lifelong learning and staying updated with the latest technologies.
              </p>
              <div className="space-y-2">
                {[
                  "Advanced React Patterns",
                  "System Design Principles",
                  "Cloud Architecture",
                  "Machine Learning Basics"
                ].map((topic, idx) => (
                  <div key={idx} className="flex items-center text-sm">
                    <span className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-2" />
                    {topic}
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default EducationSection