"use client"
// coz by default nextjs is server side so if we write this "use client" it is treated as client...usePathName hook is available only in client side
import React from 'react'
import Image from 'next/image'
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { HiOutlineShieldCheck , HiOutlinePower, HiOutlineSquare3Stack3D,HiOutlineHome} from "react-icons/hi2";
import { SignOutButton } from '@clerk/nextjs';
function Siderbar() {
    const path=usePathname();
    const menu=[{
        key:1,
        icon:<HiOutlineHome />,
        name:'Home',
        path : '/dashboard'
    },{
        key:2,
        icon:<HiOutlineSquare3Stack3D /> ,
        name:'Explore',
        path : '/dashboard/explore'
    },
    {
        key:3,
        icon:<HiOutlineShieldCheck />,
        name:'Upgrade',
        path : '/dashboard/upgrade'
    },
    {
        key:4,
        icon:<SignOutButton/>,
        name:'Logout',
        path : ''
    }]
  return (
    <div>
      <div className="fixed h-full md:w-64 p-5 shadow-md">
      <Image src={'/ai.png'} alt="image" width={40} height={40}/>
      <hr className="my-6"/>
     <ul>
        
            {menu.map((item,key)=>{
               return <div key={key}>
                <Link href={item.path}>
                    <div className={`flex gap-3 items-center text-gray-600 p-3 hover:text-black hover:bg-gray-200  rounded-lg hover:cursor-pointer ${item.path==path && 'bg-gray-200 text-black'} `}>
                       <div className="text-lg ">{item.icon}</div> 
                       <div className="text-lg text-pretty ">{item.name}</div> 
                    </div></Link>
                </div>
            })}


     </ul>
    </div>
    </div>
  )
}

export default Siderbar
