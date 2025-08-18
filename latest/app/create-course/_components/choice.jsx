"use client"
import CategoryList from '@/app/_shared/CategoryList'
import React, { useContext ,useState} from 'react'
import Image from 'next/image'
import { UserInputContext } from '@/app/_context/app';


function Choice() {
  const {input,setInput}=useContext(UserInputContext);

  const handleCategory=(name)=>{
    setInput(prev=>({
      ...prev,
      category:name
    }));
  };

  return (
    <div className="grid grid-cols-3  mt-5  gap-10 px-10 md:px-20">
        {
            CategoryList.map((item,id)=>
            {
               return <div key={id} onClick={()=>handleCategory(item.name)} className={`flex sm:flex-col rounded-xl cursor-pointer hover:bg-yellow-50 hover:border-black flex-col gap-5 p-5 border items-center ${input.category==item.name && `bg-yellow-50 border-indigo-500`}`}>
                <Image  alt="Image" src={item.icon} width={100} height={100}></Image>
                <div >{item.name}</div>
                </div>
            })
        }
      
    </div>
  )
}

export default Choice
