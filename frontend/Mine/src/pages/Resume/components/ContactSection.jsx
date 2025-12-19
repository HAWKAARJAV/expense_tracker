import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Mail, Phone, MapPin, Send, Check, AlertCircle, Github, Linkedin, Twitter } from 'lucide-react'

const ContactSection = ({ isDark, setActiveSection }) => {
  const [ref, inView] = useInView({ threshold: 0.3 })
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [errors, setErrors] = useState({})

  useEffect(() => {
    if (inView) setActiveSection('contact')
  }, [inView, setActiveSection])

  const contactInfo = [
    { icon: Mail, label: 'Email', value: 'hello@aarjavjain.dev', href: 'mailto:hello@aarjavjain.dev' },
    { icon: Phone, label: 'Phone', value: '+1 (555) 123-4567', href: 'tel:+15551234567' },
    { icon: MapPin, label: 'Location', value: 'San Francisco, CA', href: '#' }
  ]

  const socialLinks = [
    { icon: Github, label: 'GitHub', href: 'https://github.com', color: 'hover:text-gray-800' },
    { icon: Linkedin, label: 'LinkedIn', href: 'https://linkedin.com', color: 'hover:text-blue-600' },
    { icon: Twitter, label: 'Twitter', href: 'https://twitter.com', color: 'hover:text-blue-400' },
    { icon: Mail, label: 'Email', href: 'mailto:hello@aarjavjain.dev', color: 'hover:text-red-500' }
  ]

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }))
    }
  }

  const validateForm = () => {
    const newErrors = {}
    
    if (!formData.name.trim()) newErrors.name = 'Name is required'
    if (!formData.email.trim()) newErrors.email = 'Email is required'
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email is invalid'
    if (!formData.subject.trim()) newErrors.subject = 'Subject is required'
    if (!formData.message.trim()) newErrors.message = 'Message is required'
    else if (formData.message.length < 10) newErrors.message = 'Message must be at least 10 characters'

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!validateForm()) return

    setIsSubmitting(true)
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false)
      setIsSubmitted(true)
      setFormData({ name: '', email: '', subject: '', message: '' })
      
      // Reset success message after 5 seconds
      setTimeout(() => setIsSubmitted(false), 5000)
    }, 2000)
  }

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

  const FloatingLabel = ({ label, name, type = 'text', rows, error, value, onChange, required }) => {
    const [isFocused, setIsFocused] = useState(false)
    const isFloating = isFocused || value

    const InputComponent = rows ? 'textarea' : 'input'

    return (
      <div className="relative">
        <InputComponent
          type={rows ? undefined : type}
          name={name}
          rows={rows}
          value={value}
          onChange={onChange}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          className={`w-full px-4 py-3 ${rows ? 'pt-6' : ''} ${
            isDark ? 'bg-gray-800 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'
          } border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${
            error ? 'border-red-500' : ''
          }`}
          required={required}
        />
        <motion.label
          className={`absolute left-4 transition-all duration-200 pointer-events-none ${
            isFloating 
              ? 'top-2 text-xs text-blue-500' 
              : `${rows ? 'top-4' : 'top-3'} text-gray-500`
          } ${error ? 'text-red-500' : ''}`}
          animate={{
            y: isFloating ? 0 : 0,
            scale: isFloating ? 0.85 : 1,
          }}
        >
          {label} {required && '*'}
        </motion.label>
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center mt-1 text-red-500 text-sm"
          >
            <AlertCircle className="w-4 h-4 mr-1" />
            {error}
          </motion.div>
        )}
      </div>
    )
  }

  return (
    <div ref={ref} className={`py-20 ${isDark ? 'bg-gray-800' : 'bg-white'}`}>
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
            Let's Work Together
          </motion.h2>
          <motion.p
            variants={itemVariants}
            className="text-xl opacity-80 max-w-3xl mx-auto"
          >
            Ready to bring your ideas to life? Let's discuss your next project
          </motion.p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Info */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
          >
            <motion.h3
              variants={itemVariants}
              className="text-2xl font-bold mb-8"
            >
              Get In Touch
            </motion.h3>

            <div className="space-y-6 mb-8">
              {contactInfo.map((info, index) => (
                <motion.a
                  key={info.label}
                  variants={itemVariants}
                  href={info.href}
                  className={`flex items-center p-4 rounded-xl ${
                    isDark ? 'bg-gray-900/50' : 'bg-gray-50'
                  } border ${
                    isDark ? 'border-gray-700' : 'border-gray-200'
                  } hover:shadow-lg transition-all duration-300 group`}
                  whileHover={{ scale: 1.02, x: 10 }}
                >
                  <div className={`p-3 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 text-white mr-4 group-hover:scale-110 transition-transform`}>
                    <info.icon className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="font-semibold">{info.label}</p>
                    <p className="text-sm opacity-70">{info.value}</p>
                  </div>
                </motion.a>
              ))}
            </div>

            <motion.div
              variants={itemVariants}
              className={`p-6 rounded-xl ${
                isDark ? 'bg-gradient-to-br from-gray-900 to-gray-800' : 'bg-gradient-to-br from-blue-50 to-purple-50'
              } border ${
                isDark ? 'border-gray-700' : 'border-gray-200'
              }`}
            >
              <h4 className="font-bold text-lg mb-3">Follow Me</h4>
              <p className="text-sm opacity-80 mb-4">
                Stay connected and see what I'm working on
              </p>
              <div className="flex space-x-4">
                {socialLinks.map((social, index) => (
                  <motion.a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`p-3 rounded-lg ${
                      isDark ? 'bg-gray-800 hover:bg-gray-700' : 'bg-white hover:bg-gray-50'
                    } border ${
                      isDark ? 'border-gray-700' : 'border-gray-200'
                    } transition-all duration-300 ${social.color}`}
                    whileHover={{ scale: 1.1, y: -3 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <social.icon className="w-5 h-5" />
                  </motion.a>
                ))}
              </div>
            </motion.div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
          >
            <motion.h3
              variants={itemVariants}
              className="text-2xl font-bold mb-8"
            >
              Send Message
            </motion.h3>

            <motion.form
              variants={itemVariants}
              onSubmit={handleSubmit}
              className="space-y-6"
            >
              <div className="grid sm:grid-cols-2 gap-6">
                <FloatingLabel
                  label="Your Name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  error={errors.name}
                  required
                />
                <FloatingLabel
                  label="Email Address"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  error={errors.email}
                  required
                />
              </div>

              <FloatingLabel
                label="Subject"
                name="subject"
                value={formData.subject}
                onChange={handleInputChange}
                error={errors.subject}
                required
              />

              <FloatingLabel
                label="Your Message"
                name="message"
                rows={5}
                value={formData.message}
                onChange={handleInputChange}
                error={errors.message}
                required
              />

              <motion.button
                type="submit"
                disabled={isSubmitting || isSubmitted}
                className={`w-full py-4 px-6 rounded-lg font-semibold text-lg transition-all duration-300 ${
                  isSubmitted
                    ? 'bg-green-500 text-white'
                    : 'bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white shadow-lg hover:shadow-xl'
                } disabled:opacity-70`}
                whileHover={!isSubmitting && !isSubmitted ? { scale: 1.02, y: -2 } : {}}
                whileTap={!isSubmitting && !isSubmitted ? { scale: 0.98 } : {}}
              >
                {isSubmitting ? (
                  <motion.div
                    className="flex items-center justify-center"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                  >
                    <motion.div
                      className="w-5 h-5 border-2 border-white border-t-transparent rounded-full mr-2"
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    />
                    Sending...
                  </motion.div>
                ) : isSubmitted ? (
                  <motion.div
                    className="flex items-center justify-center"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                  >
                    <Check className="w-5 h-5 mr-2" />
                    Message Sent!
                  </motion.div>
                ) : (
                  <div className="flex items-center justify-center">
                    <Send className="w-5 h-5 mr-2" />
                    Send Message
                  </div>
                )}
              </motion.button>
            </motion.form>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

export default ContactSection