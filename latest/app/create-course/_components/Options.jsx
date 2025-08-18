import React, { useContext } from 'react';
import { UserInputContext } from '@/app/_context/app';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

function Options() {
  const { input, setInput } = useContext(UserInputContext);

  const handleOptions = (key, value) => {
    setInput(prev => ({
      ...prev,
      [key]: value
    }));
  };

  return (
    <div className="px-4 sm:px-6 lg:px-8 py-6">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-6 border-b pb-2">Course Configuration</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Difficulty Level */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
              <span className="text-gray-500">🎓</span>
              <span>Difficulty level</span>
            </label>
            <Select onValueChange={(value) => handleOptions('Difficulty', value)}>
              <SelectTrigger className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                <SelectValue placeholder="Select difficulty" />
              </SelectTrigger>
              <SelectContent className="bg-white border border-gray-200 rounded-md shadow-lg mt-1">
                <SelectItem value="Beginner" className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Beginner</SelectItem>
                <SelectItem value="Intermediate" className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Intermediate</SelectItem>
                <SelectItem value="Advance" className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Advanced</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Course Duration */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
              <span className="text-gray-500">⏱️</span>
              <span>Course Duration</span>
            </label>
            <Select onValueChange={(value) => handleOptions('Duration', value)}>
              <SelectTrigger className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                <SelectValue placeholder="Select duration" />
              </SelectTrigger>
              <SelectContent className="bg-white border border-gray-200 rounded-md shadow-lg mt-1">
                <SelectItem value="1 Hour" className="px-4 py-2 hover:bg-gray-100 cursor-pointer">1 Hour</SelectItem>
                <SelectItem value="2 Hours" className="px-4 py-2 hover:bg-gray-100 cursor-pointer">2 Hours</SelectItem>
                <SelectItem value="More than 3 Hours" className="px-4 py-2 hover:bg-gray-100 cursor-pointer">More than 3 Hours</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Add Videos */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
              <span className="text-gray-500">📹</span>
              <span>Include Videos</span>
            </label>
            <Select onValueChange={(value) => handleOptions('Videos', value)}>
              <SelectTrigger className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                <SelectValue placeholder="Select option" />
              </SelectTrigger>
              <SelectContent className="bg-white border border-gray-200 rounded-md shadow-lg mt-1">
                <SelectItem value="Yes" className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Yes</SelectItem>
                <SelectItem value="No" className="px-4 py-2 hover:bg-gray-100 cursor-pointer">No</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Number of Chapters */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
              <span className="text-gray-500">📖</span>
              <span>Number of Chapters</span>
            </label>
            <input 
              type="number" 
              onChange={(e) => handleOptions('Chapters', e.target.value)} 
              className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter number of chapters"
              min="1"
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Options