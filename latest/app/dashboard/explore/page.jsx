'use client'

import React, { useEffect, useState } from 'react';
import { useUser } from '@clerk/nextjs';
import CourseCard from '../_components/CourseCard';

export default function ExplorePage() {
  const { user } = useUser();
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAllCourses();
  }, []);

  const fetchAllCourses = async () => {
    try {
      const userEmail = user?.primaryEmailAddress?.emailAddress;
      const response = await fetch('/api/courses');
      if (response.ok) {
        const data = await response.json();
        // Filter out courses created by the current user (by email and Clerk ID)
        const otherUsersCourses = data.courses?.filter(course => 
          course.createdBy !== userEmail
        ) || [];
        console.log('Other users courses:', otherUsersCourses);
        if (otherUsersCourses.length === 0) {
          const sampleCourses = [
            {
              id: 'sample-1',
              courseId: 'sample-cpp-course',
              name: 'C++ Programming for Beginners',
              category: 'Programming',
              level: 'Beginner',
              userName: 'Game Play',
              chaptersCount: 5,
              createdBy: 'sample-user-1'
            },
            {
              id: 'sample-2',
              courseId: 'sample-fitness-course',
              name: 'Fitness at Home for Beginners',
              category: 'Health',
              level: 'Beginner',
              userName: 'Game Play',
              chaptersCount: 5,
              createdBy: 'sample-user-2'
            },
            {
              id: 'sample-3',
              courseId: 'sample-youtube-course',
              name: 'Advanced YouTube Video Creation with AI',
              category: 'Creative',
              level: 'Advance',
              userName: 'Game Play',
              chaptersCount: 5,
              createdBy: 'sample-user-3'
            }
          ];
          setCourses(sampleCourses);
        } else {
          setCourses(otherUsersCourses);
        }
      } else {
        console.error('Failed to fetch courses:', response.status);
        // Show sample courses if API fails
        const sampleCourses = [
          {
            id: 'sample-1',
            courseId: 'sample-cpp-course',
            name: 'C++ Programming for Beginners',
            category: 'Programming',
            level: 'Beginner',
            userName: 'Game Play',
            chaptersCount: 5,
            createdBy: 'sample-user-1'
          },
          {
            id: 'sample-2',
            courseId: 'sample-fitness-course',
            name: 'Fitness at Home for Beginners',
            category: 'Health',
            level: 'Beginner',
            userName: 'Game Play',
            chaptersCount: 5,
            createdBy: 'sample-user-2'
          },
          {
            id: 'sample-3',
            courseId: 'sample-youtube-course',
            name: 'Advanced YouTube Video Creation with AI',
            category: 'Creative',
            level: 'Advance',
            userName: 'Game Play',
            chaptersCount: 5,
            createdBy: 'sample-user-3'
          }
        ];
        setCourses(sampleCourses);
      }
    } catch (error) {
      console.error('Error fetching courses:', error);
      // Show sample courses on error
      const sampleCourses = [
        {
          id: 'sample-1',
          courseId: 'sample-cpp-course',
          name: 'C++ Programming for Beginners',
          category: 'Programming',
          level: 'Beginner',
          userName: 'Game Play',
          chaptersCount: 5,
          createdBy: 'sample-user-1'
        },
        {
          id: 'sample-2',
          courseId: 'sample-fitness-course',
          name: 'Fitness at Home for Beginners',
          category: 'Health',
          level: 'Beginner',
          userName: 'Game Play',
          chaptersCount: 5,
          createdBy: 'sample-user-2'
        },
        {
          id: 'sample-3',
          courseId: 'sample-youtube-course',
          name: 'Advanced YouTube Video Creation with AI',
          category: 'Creative',
          level: 'Advance',
          userName: 'Game Play',
          chaptersCount: 5,
          createdBy: 'sample-user-3'
        }
      ];
      setCourses(sampleCourses);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Explore More Projects</h1>
        <p className="text-gray-600">Explore more project build with AI by other users.</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map((course) => (
          <CourseCard
            key={course.id}
            course={course}
            showProgress={false}
            showUserInfo={true}
            showMoreOptions={true}
            linkTo={null} // No link for explore courses
          />
        ))}
      </div>
      
      {courses.length === 0 && (
        <div className="text-center py-8">
          <p className="text-gray-600">No courses available to explore yet.</p>
        </div>
      )}
    </div>
  );
}
