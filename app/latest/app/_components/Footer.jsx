'use client'

import React from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { 
  Heart, 
  ArrowUp,
  BookOpen,
  GraduationCap,
  Users,
  Globe
} from 'lucide-react'

const featureIcons = [
  { icon: BookOpen, color: 'text-indigo-500 hover:text-indigo-600' },
  { icon: GraduationCap, color: 'text-blue-500 hover:text-blue-600' },
  { icon: Users, color: 'text-emerald-500 hover:text-emerald-600' },
  { icon: Globe, color: 'text-amber-500 hover:text-amber-600' }
]

export const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <footer className="bg-white border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          {/* Brand section */}
          <div className="md:col-span-2 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <Link href="#" className="inline-block mb-6">
                <span className="text-2xl font-bold text-indigo-600">
                  QuickLearn
                </span>
              </Link>
              
              <p className="text-gray-600 text-lg leading-relaxed mb-8 max-w-2xl mx-auto">
                Transform your learning experience with AI-powered personalized courses. 
                Create, customize, and master any subject at your own pace.
              </p>
              
              <div className="flex justify-center space-x-8 mb-8">
                {featureIcons.map((item, index) => (
                  <motion.div
                    key={index}
                    className={`p-3 bg-gray-50 rounded-xl border border-gray-200 ${item.color} transition-all duration-200 hover:bg-gray-100 hover:scale-110`}
                    whileHover={{ y: -2 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <item.icon className="w-6 h-6" />
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>

        {/* Bottom section */}
     
      </div>
    </footer>
  )
}
