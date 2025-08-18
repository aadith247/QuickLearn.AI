'use client'

import React, { useEffect, useState } from 'react';
import { useUser } from '@clerk/nextjs';
import CourseCard from './CourseCard';
import { Button } from '@/components/ui/button';

export default function UserCourseList() {
  const { user } = useUser();
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      fetchUserCourses();
    }
  }, [user]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (user) {
        fetchUserCourses();
      }
    }, 5000); 

    return () => clearInterval(interval);
  }, [user]);

  const fetchUserCourses = async () => {
    try {
      const userEmail = user?.primaryEmailAddress?.emailAddress;
      const userId = user?.id;

      let courses = [];

   
      const methods = [
        { name: 'Email', url: `/api/courses?email=${userEmail}` },
        { name: 'All courses', url: '/api/courses' }
      ];
      
      console.log('User identification:', { userEmail, userId });
      for (const method of methods) {
        try
        {
          console.log(`Trying method: ${method.name}`);
          const response = await fetch(method.url);
          console.log(`${method.name} response status:`, response.status);
          if (response.ok) {
            const data = await response.json();
            console.log(`${method.name} courses found:`, data.courses?.length || 0);
            console.log(`${method.name} raw data:`, data);
            
      
            
            if (method.name === 'All courses') {
             
              courses = data.courses?.filter(course => 
                course.createdBy === userId || 
                course.userName === userEmail ||
                course.createdBy === userEmail
              ) || [];
              console.log('Filtered courses for current user:', courses);
            } else {
              courses = data.courses || [];
            }
            
            if (courses.length > 0) {
              console.log(`Found ${courses.length} courses using ${method.name}`);
              break;
            }
          }
        } catch (error) {
          console.error(`Error with ${method.name}:`, error);
        }
      }
      
      console.log('Final courses data:', courses);
      setCourses(courses);

      
    } catch (error) {
      console.error('Error fetching user courses:', error);
    } finally {
      setLoading(false);
    }
  };

 

  const refreshCourses = () => {
    setLoading(true);
    fetchUserCourses();
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  if (courses.length === 0) {
    const userEmail = user?.primaryEmailAddress?.emailAddress;
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-gray-800">My AI Courses</h2>
          <div className="flex gap-2">
            <button 
              onClick={refreshCourses}
              className="text-indigo-600 hover:text-indigo-800 text-sm font-medium"
            >
              Refresh
            </button>
      
          </div>
        </div>
        
        <div className="text-center py-8">
          <p className="text-gray-600 mb-4">No courses created yet. Create your first course!</p>
          <div className="text-sm text-gray-500 space-y-1">
          
          </div>
        </div>
       
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-800">My AI Courses</h2>
        <div className="flex gap-2">
          <button 
            onClick={refreshCourses}
            className="text-indigo-600 hover:text-indigo-800 text-sm font-medium"
          >
            Refresh
          </button>
     
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map((course) => {
          // Calculate actual chapter count from courseOutput
          let chaptersCount = 0;
          let completedChapters = 0;
          
          try {
            if (course.courseOutput) {
              const courseOutput = typeof course.courseOutput === 'string' 
                ? JSON.parse(course.courseOutput) 
                : course.courseOutput;
              
              // Extract chapters from different possible structures
              let chapters = [];
              if (courseOutput.chapters && Array.isArray(courseOutput.chapters)) {
                chapters = courseOutput.chapters;
              } else if (courseOutput[0] && courseOutput[0].chapters) {
                chapters = courseOutput[0].chapters;
              } else if (courseOutput.course && courseOutput.course.chapters) {
                chapters = courseOutput.course.chapters;
              }
              
              chaptersCount = chapters.length;
            }
          } catch (error) {
            console.warn('Failed to parse course output for chapter count:', error);
            chaptersCount = 0;
          }
          
          // Create enriched course object with actual chapter count
          const enrichedCourse = {
            ...course,
            chaptersCount,
            completedChapters
          };
          
          return (
            <CourseCard
              key={course.id}
              course={enrichedCourse}
              showProgress={true}
              showUserInfo={false}
              showMoreOptions={false}
              linkTo={`/create-course/${course.courseId}/finish`}
            />
          );
        })}
      </div>
    </div>
  );
}