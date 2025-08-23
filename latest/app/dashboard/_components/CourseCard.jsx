'use client'

import React from 'react';
import Link from 'next/link';
import { MoreVertical } from 'lucide-react';

const CourseCard = ({ 
  course, 
  showProgress = false, 
  showUserInfo = false, 
  showMoreOptions = false,
  linkTo = null 
}) =>
  {
  const {
    id,
    courseId,
    name,
    category,
    level,
    userName,
    chaptersCount,
    completedChapters = 0,
    userProfileImage
  } = course;

  const actualChaptersCount = chaptersCount || 0;
  const progressPercentage = actualChaptersCount > 0 ? ((completedChapters || 0) / actualChaptersCount) * 100 : 0;

  const CardContent = (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">

      <div className="relative h-48 bg-gradient-to-br from-indigo-500 to-indigo-600">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white">
            <div className="text-4xl font-bold mb-2">
              {name?.charAt(0) || 'C'}
            </div>
            <div className="text-sm opacity-90">
              {category || 'Programming'}
            </div>
          </div>
        </div>
        
        {showUserInfo && (
          <div className="absolute top-3 left-3">
            <div className="w-6 h-6 bg-green-500 text-white rounded-full flex items-center justify-center text-xs font-semibold">
              {userName?.charAt(0) || 'U'}
            </div>
          </div>
        )}
        

        <div className="absolute top-3 right-3">
          <span className={`px-2 py-1 text-xs font-medium rounded-full ${
            level === 'Beginner' 
              ? 'bg-purple-100 text-purple-800' 
              : level === 'Intermediate'
              ? 'bg-yellow-100 text-yellow-800'
              : 'bg-red-100 text-red-800'
          }`}>
            {level || 'Beginner'}
          </span>
        </div>
        {showMoreOptions && (
          <div className="absolute bottom-3 right-3">
            <button className="text-white hover:text-gray-200">
              <MoreVertical className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>

      <div className="p-4">
        <h3 className="font-semibold text-gray-800 text-lg mb-2 group-hover:text-indigo-600 transition-colors">
          {name}
        </h3>
        <div className="flex items-center justify-between text-sm text-gray-600 mb-2">
          <span className="flex items-center">
            <span className="mr-1">📚</span>
            {actualChaptersCount > 0 ? `${actualChaptersCount} Chapters` : 'No Chapters'}
          </span>
          <span className="capitalize">{level || 'Beginner'}</span>
        </div>

        {showProgress && (
          <div className="mt-3">
            <div className="flex justify-between text-xs text-gray-500 mb-1">
              <span>Progress</span>
              <span>{completedChapters} / {chaptersCount}</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-indigo-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${progressPercentage}%` }}
              ></div>
            </div>
          </div>
        )}
        {showUserInfo && (
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="w-6 h-6 bg-green-500 text-white rounded-full flex items-center justify-center text-xs font-semibold mr-2">
                {userName?.charAt(0) || 'U'}
              </div>
              <span className="text-sm text-gray-600">{userName || 'User'}</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );

  // If linkTo is provided, wrap in Link component
  if (linkTo) {
    return (
      <Link href={linkTo} className="block group">
        {CardContent}
      </Link>
    );
  }

  return CardContent;
};

export default CourseCard;
