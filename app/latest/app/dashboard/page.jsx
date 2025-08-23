'use client'

import React, { useEffect, useState } from 'react';
import { useUser } from '@clerk/nextjs';
import UserCourseList from './_components/userCourseList';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import Link from 'next/link';

export default function DashboardPage() {
  const { user } = useUser();
 

  useEffect(() => {
    if (user) {
      console.log('Dashboard - User Info:', {
        id: user.id,
        email: user.primaryEmailAddress?.emailAddress,
        firstName: user.firstName,
        username: user.username
      });
      
    
    }
  }, [user]);

  return (
    <div className="space-y-8">
   
      <div className="bg-white rounded-lg p-6 border border-gray-200">
        <div className="flex items-center justify-around">
        <Link href="/create-course">
            <Button className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md flex items-center gap-2">
              <Plus className="w-4 h-4" />
              Create AI Course
            </Button>
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-gray-800 mb-2">
              Hello, {user?.firstName || user?.username || 'User'}
            </h1>
            <p className="text-gray-600">
              Create new course with AI and learn the concept according to your learning style
            </p>
          </div>
         
        </div>
      </div>


      <UserCourseList />
    </div>
  );
}
