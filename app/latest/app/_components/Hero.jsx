'use client'

import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'

export const Hero = () => {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

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
    hidden: { y: 20, opacity: 0 },
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
    <section className="bg-white py-20 lg:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="text-center max-w-4xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          animate={isVisible ? "visible" : "hidden"}
        >
          {/* Main heading */}
          <motion.div variants={itemVariants} className="mb-8">
            <motion.h1 
              className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight"
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <span className="text-indigo-600">QuickLearn</span>
              <br />
              <span className="text-gray-900">AI-Powered</span>
              <br />
              <span className="text-gray-900">Learning</span>
            </motion.h1>
          </motion.div>

          {/* Subtitle */}
          <motion.div variants={itemVariants} className="mb-12">
            <p className="text-xl text-gray-600 leading-relaxed max-w-3xl mx-auto">
              Transform your learning experience with AI-driven personalized courses. 
              <span className="text-indigo-600 font-medium"> Create, customize, and master</span> any subject at your own pace.
            </p>
          </motion.div>

          {/* Features */}
          <motion.div variants={itemVariants} className="mb-12">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              {[
                { icon: "🚀", title: "AI Generated", desc: "Smart course creation" },
                { icon: "🎯", title: "Personalized", desc: "Tailored to your goals" },
                { icon: "⚡", title: "Fast Learning", desc: "Optimized for speed" }
              ].map((feature, index) => (
                <motion.div
                  key={index}
                  className="bg-gray-50 rounded-xl p-6 border border-gray-100 hover:border-gray-200 transition-all duration-300 group"
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="text-4xl mb-3">{feature.icon}</div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{feature.title}</h3>
                  <p className="text-gray-600 text-sm">{feature.desc}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link href="/sign-up">
              <motion.button
                className="px-8 py-4 bg-indigo-600 text-white font-semibold rounded-lg text-lg shadow-sm hover:bg-indigo-700 transition-all duration-200 group"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <span className="flex items-center gap-2">
                  Get Started Free
                  <motion.svg 
                    className="w-5 h-5 group-hover:translate-x-1 transition-transform"
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </motion.svg>
                </span>
              </motion.button>
            </Link>
            
            <Link href="/sign-in">
              <motion.button
                className="px-8 py-4 border-2 border-gray-300 text-gray-700 font-semibold rounded-lg text-lg hover:border-gray-400 hover:bg-gray-50 transition-all duration-200"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Sign In
              </motion.button>
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}





// import React from 'react'
// import Link from 'next/link'

// export const Hero=()=>{
//     return <>
// <section className="bg-gray-100 lg:grid lg:h-[90vh] lg:place-content-center">
//   <div className="mx-auto w-screen max-w-screen-xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8 lg:py-32">
//     <div className="mx-auto max-w-screen-lg text-center">
//       <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl md:text-5xl">
//         <div className="text-indigo-600 pb-3">QuickLearn</div> 

//      Learn anything
//      <div className="pt-3">Powered by <span className="text-red-500">AI</span></div>
//       </h1>

//       <div className="mt-4 text-base text-pretty text-gray-700 sm:text-lg/relaxed">
//        <div>Unclock personalized education with AI-driven course creation.</div>
//        <div>Tailor your learning journey to fit your unique goals and pace</div> 
//       </div>

//       <div className="mt-4 flex justify-center gap-4 sm:mt-6">
//         <Link
//           className="inline-block rounded border border-indigo-600 bg-indigo-600 px-5 py-3 font-medium text-white shadow-sm transition-colors hover:bg-indigo-700"
//           href="/sign-up"
//         >
//           Get Started
//         </Link>
//       </div>
//     </div>
//   </div>
// </section>
    
    
//     </>

// };
