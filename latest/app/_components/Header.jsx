import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
function Header() {
  return (
    <div>
     <header className="bg-white shadow-sm">
  <div className="mx-auto flex h-20 max-w-screen-xl items-center  px-4 sm:px-6 lg:px-8">
    <a className="block text-indigo-600" href="#">
   
      <span className="sr-only">Home</span>
      <div className="flex items-center gap-4">
          <Image src={'/ai.png'} alt="LearnPath Logo" width={40} height={40}/>
          <div>
            <h1 className="text-xl font-bold text-gray-800">QuickLearn</h1>
           
          </div>
        </div>
     
    </a>

    <div className="flex flex-1 items-center justify-end md:justify-between">
      <nav aria-label="Global" className="hidden md:block">
        {/* <ul className="flex items-center gap-6 text-sm">
          <li>
            <a className="text-gray-500 transition hover:text-gray-500/75" href="#"> About </a>
          </li>

          <li>
            <a className="text-gray-500 transition hover:text-gray-500/75" href="#"> Careers </a>
          </li>

          <li>
            <a className="text-gray-500 transition hover:text-gray-500/75" href="#"> History </a>
          </li>

          <li>
            <a className="text-gray-500 transition hover:text-gray-500/75" href="#"> Services </a>
          </li>

          <li>
            <a className="text-gray-500 transition hover:text-gray-500/75" href="#"> Projects </a>
          </li>

          <li>
            <a className="text-gray-500 transition hover:text-gray-500/75" href="#"> Blog </a>
          </li>
        </ul> */}
      </nav>

      <div className="flex items-center gap-4">
        <div className="sm:flex sm:gap-4">
          <Link
            className="block rounded-md bg-indigo-600 px-5 py-2.5 text-md font-medium text-white transition hover:bg-teal-700"
            href="/sign-in"
          >
            Login
          </Link>

          <Link
            className="hidden rounded-md bg-gray-100 px-5 py-2.5 text-md font-medium text-indigo-600 transition hover:text-teal-600/75 sm:block"
            href="/sign-up"
          >
            Register
          </Link>
        </div>

        <button
          className="block rounded-sm bg-gray-100 p-2.5 text-gray-600 transition hover:text-gray-600/75 md:hidden"
        >
          <span className="sr-only">Toggle menu</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="size-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>
    </div>
  </div>
</header>
    </div>
  )
}

export default Header
