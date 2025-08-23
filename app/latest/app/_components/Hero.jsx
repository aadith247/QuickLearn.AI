import React from 'react'
import Link from 'next/link'

export const Hero=()=>{
    return <>
<section className="bg-gray-100 lg:grid lg:h-[90vh] lg:place-content-center">
  <div className="mx-auto w-screen max-w-screen-xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8 lg:py-32">
    <div className="mx-auto max-w-screen-lg text-center">
      <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl md:text-5xl">
        <div className="text-indigo-600 pb-3">QuickLearn</div> 

     Learn anything
     <div className="pt-3">Powered by <span className="text-red-500">AI</span></div>
      </h1>

      <div className="mt-4 text-base text-pretty text-gray-700 sm:text-lg/relaxed">
       <div>Unclock personalized education with AI-driven course creation.</div>
       <div>Tailor your learning journey to fit your unique goals and pace</div> 
      </div>

      <div className="mt-4 flex justify-center gap-4 sm:mt-6">
        <Link
          className="inline-block rounded border border-indigo-600 bg-indigo-600 px-5 py-3 font-medium text-white shadow-sm transition-colors hover:bg-indigo-700"
          href="/sign-up"
        >
          Get Started
        </Link>
      </div>
    </div>
  </div>
</section>
    
    
    </>

};