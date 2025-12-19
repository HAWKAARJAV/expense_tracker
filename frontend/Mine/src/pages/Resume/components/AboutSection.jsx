import React, { useEffect } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { User, Heart, Target, Lightbulb, Coffee, Music, Camera, Gamepad2 } from 'lucide-react'

const AboutSection = ({ isDark, setActiveSection }) => {
  const [ref, inView] = useInView({ threshold: 0.3 })

  useEffect(() => {
    if (inView) setActiveSection('about')
  }, [inView, setActiveSection])

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

  const hobbies = [
    { icon: Coffee, name: "Coffee Brewing", color: "from-amber-500 to-orange-600" },
    { icon: Music, name: "Music Production", color: "from-purple-500 to-pink-600" },
    { icon: Camera, name: "Photography", color: "from-blue-500 to-cyan-600" },
    { icon: Gamepad2, name: "Gaming", color: "from-green-500 to-emerald-600" }
  ]

  return (
    <div ref={ref} className={`py-20 ${isDark ? 'bg-gray-800' : 'bg-gray-50'}`}>
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
            About Me
          </motion.h2>
          <motion.p
            variants={itemVariants}
            className="text-xl opacity-80 max-w-3xl mx-auto"
          >
            Get to know the person behind the code
          </motion.p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left side - Image and stats */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            className="text-center lg:text-left"
          >
            <motion.div
              variants={itemVariants}
              className="relative mb-8 inline-block"
            >
              <div className="w-80 h-80 mx-auto lg:mx-0 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-600 p-2">
                <div className={`w-full h-full rounded-xl ${
                  isDark ? 'bg-gray-800' : 'bg-gray-100'
                } flex items-center justify-center text-8xl font-bold text-transparent bg-clip-text bg-gradient-to-br from-blue-500 to-purple-600`}>
                  AJ
                </div>
              </div>
              <motion.div
                className="absolute -bottom-4 -right-4 p-4 bg-gradient-to-r from-green-400 to-emerald-500 rounded-xl"
                animate={{ rotate: [0, 10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <User className="w-8 h-8 text-white" />
              </motion.div>
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="grid grid-cols-2 gap-4"
            >
              {[
                { label: "Based in", value: "San Francisco" },
                { label: "Experience", value: "5+ Years" },
                { label: "Projects", value: "100+" },
                { label: "Coffee/Day", value: "∞" }
              ].map((stat, index) => (
                <div
                  key={stat.label}
                  className={`p-4 rounded-lg text-center ${
                    isDark ? 'bg-gray-900/50' : 'bg-white'
                  } border ${
                    isDark ? 'border-gray-700' : 'border-gray-200'
                  }`}
                >
                  <div className="text-2xl font-bold text-blue-500">{stat.value}</div>
                  <div className="text-sm opacity-70">{stat.label}</div>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right side - Content */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            className="space-y-6"
          >
            <motion.div variants={itemVariants}>
              <h3 className="text-2xl font-bold mb-4 flex items-center">
                <Heart className="w-6 h-6 mr-3 text-red-500" />
                Passionate Developer
              </h3>
              <p className="text-lg leading-relaxed opacity-90">
                I'm a full-stack developer with a passion for creating beautiful, functional, 
                and user-friendly applications. With over 5 years of experience in the tech 
                industry, I've had the privilege of working with amazing teams and building 
                products that make a real difference in people's lives.
              </p>
            </motion.div>

            <motion.div variants={itemVariants}>
              <h3 className="text-2xl font-bold mb-4 flex items-center">
                <Target className="w-6 h-6 mr-3 text-blue-500" />
                My Mission
              </h3>
              <p className="text-lg leading-relaxed opacity-90">
                I believe in the power of technology to solve real-world problems. My goal 
                is to craft digital solutions that are not only technically sound but also 
                intuitive and accessible to everyone. I'm constantly learning new technologies 
                and pushing the boundaries of what's possible.
              </p>
            </motion.div>

            <motion.div variants={itemVariants}>
              <h3 className="text-2xl font-bold mb-4 flex items-center">
                <Lightbulb className="w-6 h-6 mr-3 text-yellow-500" />
                What Drives Me
              </h3>
              <div className="space-y-3">
                {[
                  "Creating seamless user experiences that delight and inspire",
                  "Writing clean, maintainable code that stands the test of time",
                  "Collaborating with diverse teams to bring innovative ideas to life",
                  "Mentoring junior developers and sharing knowledge with the community"
                ].map((item, index) => (
                  <div key={index} className="flex items-start">
                    <span className="w-2 h-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full mr-3 mt-3 flex-shrink-0" />
                    <span className="opacity-90">{item}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div variants={itemVariants}>
              <h3 className="text-2xl font-bold mb-4">When I'm Not Coding</h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {hobbies.map((hobby, index) => (
                  <motion.div
                    key={hobby.name}
                    className={`p-3 rounded-lg text-center ${
                      isDark ? 'bg-gray-900/50' : 'bg-white'
                    } border ${
                      isDark ? 'border-gray-700' : 'border-gray-200'
                    } cursor-pointer group`}
                    whileHover={{ scale: 1.05, y: -3 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <div className={`w-12 h-12 mx-auto mb-2 rounded-lg bg-gradient-to-br ${hobby.color} flex items-center justify-center group-hover:scale-110 transition-transform`}>
                      <hobby.icon className="w-6 h-6 text-white" />
                    </div>
                    <p className="text-sm font-medium">{hobby.name}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

export default AboutSection