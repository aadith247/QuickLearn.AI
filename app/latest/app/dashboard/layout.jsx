'use client'

import React from 'react';
import { useUser, SignOutButton } from '@clerk/nextjs';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Layers, Shield, LogOut } from 'lucide-react';
import Image from 'next/image';

export default function DashboardLayout({ children }) {
  const { user } = useUser();
  const pathname = usePathname();
  const navigation = [
    { name: 'Home', href: '/dashboard', icon: Home },
    { name: 'Explore', href: '/dashboard/explore', icon: Layers },
    { name: 'Upgrade', href: '/upgrade', icon: Shield },
  ];
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex">
        {/* Sidebar */}
        <div className="w-65 bg-white shadow-sm min-h-screen border-r border-gray-200">
          <div className="p-6">
            {/* Logo */}
            <div className="flex items-center gap-4">
          <Image src={'/ai.png'} alt="LearnPath Logo" width={40} height={40}/>
          <div>
            <h1 className="text-xl font-bold text-gray-800">QuickLearn</h1>
           
          </div>
        </div>
            {/* Navigation */}
            <nav className="space-y-6 my-11">
              {navigation.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`flex items-center px-3 py-3 rounded-lg text-sm font-medium transition-colors ${
                      isActive
                        ? 'bg-gray-100 text-gray-900'
                        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                    }`}
                  >
                    <item.icon className="w-5 h-5 mr-3"/>
                    {item.name}
                  </Link>
                );
              })}
              

              <SignOutButton signOutCallback={() => {
                // Clear all localStorage data
                localStorage.clear();
                
                // Clear sessionStorage as well
                sessionStorage.clear();
                
                // Clear Clerk-related cookies and storage
                document.cookie.split(";").forEach(function(c) { 
                  document.cookie = c.replace(/^ +/, "").replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/"); 
                });
                
                // Clear any remaining Clerk data with more specific targeting
                if (typeof window !== 'undefined') {
                  // Clear any Clerk-specific storage keys (including those that start with __clerk_)
                  Object.keys(localStorage).forEach(key => {
                    if (key.includes('clerk') || key.startsWith('__clerk_') || key.startsWith('_clerk_') || key.includes('__clerk')) {
                      localStorage.removeItem(key);
                      console.log('Removed Clerk localStorage key:', key);
                    }
                  });
                  
                  // Clear any Clerk-specific session storage
                  Object.keys(sessionStorage).forEach(key => {
                    if (key.includes('clerk') || key.startsWith('__clerk_') || key.startsWith('_clerk_') || key.includes('__clerk')) {
                      sessionStorage.removeItem(key);
                      console.log('Removed Clerk sessionStorage key:', key);
                    }
                  });
                  
                  // Force remove specific Clerk keys if they still exist
                  if (localStorage.getItem('__clerk_environment')) {
                    localStorage.removeItem('__clerk_environment');
                    console.log('Force removed __clerk_environment');
                  }
                  if (localStorage.getItem('clerk_telemetry_throttler')) {
                    localStorage.removeItem('clerk_telemetry_throttler');
                    console.log('Force removed clerk_telemetry_throttler');
                  }
                }
                
                console.log('All storage data cleared on logout');
              }}>
                <button className="flex items-center px-3 py-2 rounded-lg text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50 w-full transition-colors">
                  <LogOut className="w-5 h-5 mr-3" />
                  Logout
                </button>
              </SignOutButton>
            </nav>
          </div>
        </div>


        <div className="flex-1">

          <header className="bg-white border-b border-gray-200 px-6 py-4">
            <div className="flex items-center justify-between">
              <div></div> 
              <div className="flex items-center space-x-4">

                <div className="w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center text-sm font-semibold">
                  {user?.firstName?.charAt(0) || user?.username?.charAt(0) || 'U'}
                </div>
              </div>
            </div>
          </header>

        
          <main className="p-6">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
}
