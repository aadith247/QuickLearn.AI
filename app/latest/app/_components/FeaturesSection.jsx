
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
    description: "Advanced AI algorithms create comprehensive, personalized courses tailored to your learning style and goals.",
    color: "bg-indigo-100 text-indigo-600"
  },
  {
    icon: Target,
    title: "Personalized Learning",
    description: "Adaptive content that evolves with your progress, ensuring optimal learning outcomes.",
    color: "bg-blue-100 text-blue-600"
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
    description: "Comprehensive materials including explanations, examples, and interactive elements.",
    color: "bg-emerald-100 text-emerald-600"
  },
  {
    icon: Users,
    title: "Community Driven",
    description: "Learn from and share with a community of learners and educators worldwide.",
    color: "bg-purple-100 text-purple-600"
  },
  {
    icon: TrendingUp,
    title: "Progress Tracking",
    description: "Monitor your learning journey with detailed analytics and achievement milestones.",
    color: "bg-rose-100 text-rose-600"
  }
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
          <motion.div
            className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-50 rounded-full border border-indigo-200 mb-6"
            initial={{ scale: 0.8 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Sparkles className="w-5 h-5 text-indigo-600" />
            <span className="text-indigo-700 text-sm font-medium">Why Choose QuickLearn</span>
          </motion.div>
          
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
          <div className="inline-flex items-center gap-3 px-6 py-3 bg-indigo-50 rounded-full border border-indigo-200 mb-6">
            <Globe className="w-5 h-5 text-indigo-600" />
            <span className="text-indigo-700 text-sm">Join thousands of learners worldwide</span>
          </div>
          
          <p className="text-gray-600 text-lg mb-8 max-w-2xl mx-auto">
            Ready to transform your learning experience? Start your AI-powered learning journey today.
          </p>
          
          <motion.button
            className="px-8 py-4 bg-indigo-600 text-white font-semibold rounded-lg text-lg shadow-sm hover:bg-indigo-700 transition-all duration-200"
            whileHover={{ scale: 1.02, y: -1 }}
            whileTap={{ scale: 0.98 }}
          >
            Start Learning Now
          </motion.button>
        </motion.div>
      </div>
    </section>
  )
}
