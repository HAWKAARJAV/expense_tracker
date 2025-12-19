import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { ExternalLink, Github, Star, Eye, Filter, X, Calendar, Users } from 'lucide-react'

const ProjectsSection = ({ isDark, setActiveSection }) => {
  const [ref, inView] = useInView({ threshold: 0.2 })
  const [activeFilter, setActiveFilter] = useState('all')
  const [selectedProject, setSelectedProject] = useState(null)

  useEffect(() => {
    if (inView) setActiveSection('projects')
  }, [inView, setActiveSection])

  const projects = [
    {
      id: 1,
      title: "E-Commerce Platform",
      category: "fullstack",
      description: "A complete e-commerce solution with admin dashboard, payment integration, and real-time inventory management.",
      longDescription: "Built a comprehensive e-commerce platform from scratch using React, Node.js, and MongoDB. Features include user authentication, shopping cart, payment processing with Stripe, order tracking, admin dashboard with analytics, and real-time inventory management. The platform handles 1000+ concurrent users and processes $10M+ in transactions annually.",
      image: "/api/placeholder/600/400",
      technologies: ["React", "Node.js", "MongoDB", "Stripe", "AWS", "Redis"],
      liveUrl: "https://example.com",
      githubUrl: "https://github.com",
      features: ["Payment Integration", "Real-time Analytics", "Admin Dashboard", "Mobile Responsive"],
      stats: { stars: 245, forks: 67, views: "12.5k" },
      year: "2023",
      team: "4 developers",
      color: "from-blue-500 to-cyan-600"
    },
    {
      id: 2,
      title: "Task Management App",
      category: "frontend",
      description: "A collaborative task management application with real-time updates and team collaboration features.",
      longDescription: "Developed a modern task management application using React and TypeScript. The app features drag-and-drop functionality, real-time collaboration, advanced filtering, deadline tracking, and team management. Used WebSocket for real-time updates and implemented PWA capabilities for offline functionality.",
      image: "/api/placeholder/600/400",
      technologies: ["React", "TypeScript", "WebSocket", "PWA", "Tailwind"],
      liveUrl: "https://example.com",
      githubUrl: "https://github.com",
      features: ["Drag & Drop", "Real-time Sync", "Team Collaboration", "Offline Mode"],
      stats: { stars: 156, forks: 34, views: "8.2k" },
      year: "2023",
      team: "2 developers",
      color: "from-purple-500 to-pink-600"
    },
    {
      id: 3,
      title: "Weather Analytics Dashboard",
      category: "frontend",
      description: "Interactive weather dashboard with advanced data visualization and predictive analytics.",
      longDescription: "Created an interactive weather analytics dashboard using React and D3.js. Features include historical weather data visualization, weather predictions, interactive maps, customizable widgets, and export functionality. Integrated with multiple weather APIs and implemented caching for optimal performance.",
      image: "/api/placeholder/600/400",
      technologies: ["React", "D3.js", "Chart.js", "Weather APIs", "CSS3"],
      liveUrl: "https://example.com",
      githubUrl: "https://github.com",
      features: ["Data Visualization", "Predictive Analytics", "Interactive Maps", "Export Options"],
      stats: { stars: 89, forks: 23, views: "5.1k" },
      year: "2022",
      team: "Solo project",
      color: "from-green-500 to-teal-600"
    },
    {
      id: 4,
      title: "API Gateway Service",
      category: "backend",
      description: "High-performance API gateway with rate limiting, authentication, and monitoring capabilities.",
      longDescription: "Built a robust API gateway service using Node.js and Express. Implemented advanced features including rate limiting, JWT authentication, request/response transformation, load balancing, health checks, and comprehensive logging. The service handles 100k+ requests per day with 99.9% uptime.",
      image: "/api/placeholder/600/400",
      technologies: ["Node.js", "Express", "JWT", "Redis", "Docker", "Nginx"],
      liveUrl: "https://example.com",
      githubUrl: "https://github.com",
      features: ["Rate Limiting", "Load Balancing", "Health Monitoring", "Request Transformation"],
      stats: { stars: 78, forks: 19, views: "3.8k" },
      year: "2022",
      team: "3 developers",
      color: "from-orange-500 to-red-600"
    },
    {
      id: 5,
      title: "React Component Library",
      category: "frontend",
      description: "Comprehensive UI component library with TypeScript support and Storybook documentation.",
      longDescription: "Developed a comprehensive React component library with 50+ reusable components. Built with TypeScript for type safety, includes Storybook for documentation, automated testing with Jest, and continuous integration. Used by 500+ developers across multiple projects with excellent developer experience.",
      image: "/api/placeholder/600/400",
      technologies: ["React", "TypeScript", "Storybook", "Jest", "Rollup"],
      liveUrl: "https://example.com",
      githubUrl: "https://github.com",
      features: ["50+ Components", "TypeScript Support", "Storybook Docs", "Automated Testing"],
      stats: { stars: 312, forks: 89, views: "15.7k" },
      year: "2023",
      team: "Solo project",
      color: "from-indigo-500 to-purple-600"
    },
    {
      id: 6,
      title: "Real-time Chat Platform",
      category: "fullstack",
      description: "Scalable chat platform with video calls, file sharing, and end-to-end encryption.",
      longDescription: "Created a real-time chat platform supporting text, voice, and video communication. Implemented WebRTC for peer-to-peer video calls, end-to-end encryption for security, file sharing capabilities, and emoji reactions. The platform scales to support 10k+ concurrent users with minimal latency.",
      image: "/api/placeholder/600/400",
      technologies: ["React", "Node.js", "Socket.io", "WebRTC", "MongoDB", "AWS"],
      liveUrl: "https://example.com",
      githubUrl: "https://github.com",
      features: ["Video Calls", "File Sharing", "End-to-end Encryption", "Emoji Reactions"],
      stats: { stars: 189, forks: 45, views: "9.3k" },
      year: "2023",
      team: "5 developers",
      color: "from-teal-500 to-green-600"
    }
  ]

  const filters = [
    { key: 'all', label: 'All Projects' },
    { key: 'fullstack', label: 'Full Stack' },
    { key: 'frontend', label: 'Frontend' },
    { key: 'backend', label: 'Backend' }
  ]

  const filteredProjects = activeFilter === 'all' 
    ? projects 
    : projects.filter(project => project.category === activeFilter)

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
    hidden: { y: 30, opacity: 0, scale: 0.9 },
    visible: {
      y: 0,
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  }

  const ProjectCard = ({ project, index }) => (
    <motion.div
      variants={itemVariants}
      className={`relative group rounded-xl overflow-hidden ${
        isDark ? 'bg-gray-800/80' : 'bg-white'
      } backdrop-blur-sm border ${
        isDark ? 'border-gray-700' : 'border-gray-200'
      } shadow-lg hover:shadow-2xl transition-all duration-300`}
      whileHover={{ y: -10, scale: 1.02 }}
      layout
    >
      {/* Project Image */}
      <div className="relative h-48 overflow-hidden">
        <div className={`w-full h-full bg-gradient-to-br ${project.color} opacity-20`} />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-6xl font-bold opacity-30">{project.title.slice(0, 2)}</div>
        </div>
        
        {/* Overlay on hover */}
        <motion.div
          className="absolute inset-0 bg-black bg-opacity-60 flex items-center justify-center space-x-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 1 }}
        >
          <motion.button
            className="p-3 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30 transition-colors"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setSelectedProject(project)}
          >
            <Eye className="w-5 h-5 text-white" />
          </motion.button>
          <motion.a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30 transition-colors"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <ExternalLink className="w-5 h-5 text-white" />
          </motion.a>
          <motion.a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30 transition-colors"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <Github className="w-5 h-5 text-white" />
          </motion.a>
        </motion.div>
      </div>

      {/* Content */}
      <div className="p-6">
        <div className="flex justify-between items-start mb-3">
          <h3 className="text-xl font-bold group-hover:text-blue-500 transition-colors">
            {project.title}
          </h3>
          <div className="flex items-center space-x-2 text-sm opacity-60">
            <Calendar className="w-4 h-4" />
            <span>{project.year}</span>
          </div>
        </div>

        <p className="text-sm opacity-80 mb-4 leading-relaxed line-clamp-3">
          {project.description}
        </p>

        {/* Technologies */}
        <div className="flex flex-wrap gap-1 mb-4">
          {project.technologies.slice(0, 4).map((tech, idx) => (
            <span
              key={idx}
              className={`px-2 py-1 text-xs rounded-full ${
                isDark ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-700'
              }`}
            >
              {tech}
            </span>
          ))}
          {project.technologies.length > 4 && (
            <span className="px-2 py-1 text-xs rounded-full bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300">
              +{project.technologies.length - 4}
            </span>
          )}
        </div>

        {/* Stats */}
        <div className="flex justify-between items-center text-sm opacity-60">
          <div className="flex items-center space-x-3">
            <div className="flex items-center">
              <Star className="w-4 h-4 mr-1" />
              <span>{project.stats.stars}</span>
            </div>
            <div className="flex items-center">
              <Eye className="w-4 h-4 mr-1" />
              <span>{project.stats.views}</span>
            </div>
          </div>
          <div className="flex items-center">
            <Users className="w-4 h-4 mr-1" />
            <span>{project.team}</span>
          </div>
        </div>
      </div>
    </motion.div>
  )

  return (
    <div ref={ref} className={`py-20 ${isDark ? 'bg-gray-900' : 'bg-white'}`}>
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
            Featured Projects
          </motion.h2>
          <motion.p
            variants={itemVariants}
            className="text-xl opacity-80 max-w-3xl mx-auto"
          >
            A showcase of my recent work and the technologies I love working with
          </motion.p>
        </motion.div>

        {/* Filter Buttons */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="flex justify-center mb-12"
        >
          <div className={`flex space-x-2 p-2 rounded-full ${
            isDark ? 'bg-gray-800/50' : 'bg-gray-100'
          } backdrop-blur-sm`}>
            {filters.map((filter) => (
              <motion.button
                key={filter.key}
                variants={itemVariants}
                onClick={() => setActiveFilter(filter.key)}
                className={`px-6 py-2 rounded-full font-medium transition-all duration-300 ${
                  activeFilter === filter.key
                    ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg'
                    : isDark
                    ? 'text-gray-300 hover:text-white hover:bg-gray-700'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-white'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Filter className="w-4 h-4 inline mr-2" />
                {filter.label}
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Projects Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          layout
        >
          {filteredProjects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </motion.div>

        {/* Project Modal */}
        {selectedProject && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-60 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedProject(null)}
          >
            <motion.div
              className={`relative max-w-4xl w-full max-h-[90vh] overflow-y-auto rounded-xl ${
                isDark ? 'bg-gray-800' : 'bg-white'
              } shadow-2xl`}
              initial={{ scale: 0.9, y: 50 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 50 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setSelectedProject(null)}
                className="absolute top-4 right-4 z-10 p-2 rounded-full bg-black bg-opacity-50 text-white hover:bg-opacity-70 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
              
              <div className={`h-64 bg-gradient-to-br ${selectedProject.color} relative overflow-hidden`}>
                <div className="absolute inset-0 flex items-center justify-center">
                  <h2 className="text-6xl font-bold text-white opacity-30">{selectedProject.title}</h2>
                </div>
              </div>
              
              <div className="p-8">
                <h2 className="text-3xl font-bold mb-4">{selectedProject.title}</h2>
                <p className="text-lg opacity-80 mb-6 leading-relaxed">{selectedProject.longDescription}</p>
                
                <div className="grid md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <h3 className="font-semibold mb-2">Key Features</h3>
                    <ul className="space-y-1">
                      {selectedProject.features.map((feature, idx) => (
                        <li key={idx} className="flex items-center text-sm opacity-80">
                          <span className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-2" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold mb-2">Project Details</h3>
                    <div className="space-y-1 text-sm opacity-80">
                      <div>Year: {selectedProject.year}</div>
                      <div>Team: {selectedProject.team}</div>
                      <div>Stars: {selectedProject.stats.stars}</div>
                      <div>Views: {selectedProject.stats.views}</div>
                    </div>
                  </div>
                </div>
                
                <div className="mb-6">
                  <h3 className="font-semibold mb-2">Technologies Used</h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedProject.technologies.map((tech, idx) => (
                      <span
                        key={idx}
                        className={`px-3 py-1 text-sm rounded-full ${
                          isDark ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-700'
                        }`}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div className="flex space-x-4">
                  <a
                    href={selectedProject.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg font-medium hover:shadow-lg transition-shadow"
                  >
                    <ExternalLink className="w-4 h-4 inline mr-2" />
                    Live Demo
                  </a>
                  <a
                    href={selectedProject.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`px-6 py-3 border rounded-lg font-medium transition-colors ${
                      isDark 
                        ? 'border-gray-600 text-gray-300 hover:bg-gray-700' 
                        : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    <Github className="w-4 h-4 inline mr-2" />
                    Source Code
                  </a>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </div>
    </div>
  )
}

export default ProjectsSection