'use client'

import React from 'react';
import { useUser } from '@clerk/nextjs';
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
              

              <button className="flex items-center px-3 py-2 rounded-lg text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50 w-full transition-colors">
                <LogOut className="w-5 h-5 mr-3" />
                Logout
              </button>
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
