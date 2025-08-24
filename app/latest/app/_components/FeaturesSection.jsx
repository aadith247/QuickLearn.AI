
'use client'
import React from 'react'
import { motion } from 'framer-motion'
import { 
  Brain, 
  Target, 
  Zap, 
  BookOpen, 
  Users, 
  TrendingUp,
  Sparkles,
  Globe
} from 'lucide-react'

const features = [
  {
    icon: Brain,
    title: "AI-Powered Generation",
    description: "AI creates comprehensive, personalized courses tailored to your learning style and goals.",
    color: "bg-indigo-100 text-indigo-600"
  },
  {
    icon: Zap,
    title: "Lightning Fast",
    description: "Generate complete courses in minutes, not hours. Get started learning immediately.",
    color: "bg-amber-100 text-amber-600"
  },
  {
    icon: BookOpen,
    title: "Rich Content",
    description: "Comprehensive materials including explanations, examples, and relevant youtube videos.",
    color: "bg-emerald-100 text-emerald-600"
  },
  {
    icon: Users,
    title: "Explore ",
    description: "Explore and learn from other users' courses.",
    color: "bg-purple-100 text-purple-600"
  },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.1
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

export const FeaturesSection = () => {
  return (
    <section id="features" className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div 
          className="text-center mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
       
          
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Powerful Features for
            <span className="text-indigo-600"> Modern Learning</span>
          </h2>
          
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Experience the future of education with cutting-edge AI technology that transforms how you learn and grow.
          </p>
        </motion.div>

        {/* Features Grid */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className="group relative"
              variants={itemVariants}
            >
              <div className="relative p-8 bg-white rounded-xl border border-gray-200 hover:border-gray-300 transition-all duration-300 hover:shadow-md h-full">
                {/* Icon */}
                <div className={`inline-flex p-4 rounded-xl ${feature.color} mb-6 group-hover:scale-105 transition-transform duration-300`}>
                  <feature.icon className="w-8 h-8" />
                </div>
                
                {/* Content */}
                <h3 className="text-xl font-semibold text-gray-900 mb-4 group-hover:text-indigo-600 transition-colors duration-300">
                  {feature.title}
                </h3>
                
                <p className="text-gray-600 leading-relaxed group-hover:text-gray-700 transition-colors duration-300">
                  {feature.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom CTA */}
        <motion.div 
          className="text-center mt-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
         
          
          <p className="text-gray-600 text-lg mb-8 max-w-2xl mx-auto">
            Ready to transform your learning experience? Start your AI-powered learning journey today.
          </p>
          
      
        </motion.div>
      </div>
    </section>
  )
}
