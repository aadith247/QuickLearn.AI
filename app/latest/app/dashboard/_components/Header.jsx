import React from 'react'
import Image from 'next/image'
import { Button } from '@/components/ui/button'

function Header() {
  return (
    <div>
      <div className="flex justify-between items-center p-6 bg-white border-b border-gray-200 shadow-sm">
        <div className="flex items-center gap-3">
          <Image src={'/ai.png'} alt="LearnPath Logo" width={40} height={40}/>
          <div>
            <h1 className="text-xl font-bold text-gray-800">QuickLearn</h1>
            <p className="text-gray-500 text-sm">AI-Powered Learning Platform</p>
          </div>
        </div>
        <Button 
          variant="ghost" 
          className="text-gray-600 hover:text-gray-800 hover:bg-gray-100 transition-colors"
        >
          Welcome
        </Button>
      </div>
    </div>
  )
}

export default Header
