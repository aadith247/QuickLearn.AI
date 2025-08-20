"use client"
import Link from 'next/link';
import React from 'react'
import { useState,useContext,useEffect } from 'react';
import Header from '../dashboard/_components/Header'
import { HiSquares2X2,HiLightBulb ,HiClipboardDocumentCheck } from "react-icons/hi2";
import { Button } from '@/components/ui/button';
import { list } from '../_shared/CategoryList';
import Choice from './_components/choice';
import TopicDesc from './_components/TopicDesc';
import Options from './_components/Options';
import { UserInputContext } from '@/app/_context/app';
import { GenerateCourseLayout_AI } from '@/app/configs/AIModel';
import LoadingDialog from './_components/LoadingDialog';
import uuid4 from 'uuid4';
import { courseList } from '../configs/Schema';
import { useUser } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import { getVideos } from '../configs/service';
function page() {
  
    const stepperOptions=[{
        key:1,
        name:"Category",
        icon:<HiSquares2X2 />,
    },{
        key:2,
        name:"Topic & desc",
        icon:<HiLightBulb/>,
    },{
        key:3,
        name:"Options",
        icon:<HiClipboardDocumentCheck/>,
    }
    

]
const {input,setInput}=useContext(UserInputContext);
const { user, isSignedIn } = useUser();
const router=useRouter();
useEffect(()=>{
  console.log(input);
},[input]);

const [activeIndex,setActiveIndex]=useState(0);
const checkStatus=()=>{
  if(input.length==0)
  {
    return true;
  }
   else if(activeIndex==1 && (input.topic==undefined || input.topic.length==0) )
  {
    return true;
  }
  else if(activeIndex==2 && (input.Difficulty==undefined || input.Duration==undefined || input.Videos==undefined || input.Chapters==undefined))
  {
    return true;
  }
  
  return false;
}

const [loading,setLoading]=useState(false);


const GenerateCourseLayout=async ()=>{
   setLoading(true);
  const BASIC_PROMPT="Generate a Course JSON with: courseName, description, duration (overall), noOfChapters, and chapters as an array of objects with chapterName, about(what are we going to learn in this chapter (what topics covered...)), and duration in minutes. Ensure each chapter includes a numeric duration.";
  const USER_PROMPT=' Category: '+input?.category+'; Topic: '+input?.topic+'; Preferences: '+input?.preferences+'; Difficulty: '+input?.Difficulty+'; Duration: '+input?.Duration+'; NoOfChapters: '+input?.Chapters+'; Return strictly valid JSON only.';
  const final_prompt=BASIC_PROMPT+USER_PROMPT;
  const result=await GenerateCourseLayout_AI.sendMessage(final_prompt,{json:true});
  console.log(result);
  setLoading(false);
  saveLayoutInDb(result);
 
}


const saveLayoutInDb = async (courseLayout) => {
  const id = uuid4();
  setLoading(true);
  try {
    const derivedName = courseLayout?.courseName || courseLayout?.name || courseLayout?.title || input?.topic || 'Untitled Course';
    const userEmail = user?.primaryEmailAddress?.emailAddress || user?.emailAddresses?.[0]?.emailAddress || '';
     
    const res = await fetch('/api/courses', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        courseId: id,
        name: derivedName,
        category: input?.category || '',
        level: input?.Difficulty || '',
        courseOutput: courseLayout,
        createdBy: user?.id, // Use Clerk user ID
        userName: userEmail, // Use email as userName
        userProfileImage: user?.imageUrl || '',
        videoIncluded: input?.Videos === 'Yes'
      })
    });

    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err?.error || 'Failed to save course');
    }
  } catch (error) {
    console.error('Failed to save course layout', error);
  } finally {
    setLoading(false);
    router.replace(`/create-course/${id}`);
  }
};
  return (
    <div>
     
        <div className="flex flex-col justify-center items-center mt-15">
     <h1 className="text-gray-600 text-pretty font-sans text-5xl font-bold ">create course</h1>
     <div className="flex justify-center items-center gap-4 mt-20">
     {stepperOptions.map((item,key)=>
     {
        return <div key={key}>
        <div className="flex  gap-4 items-center">
        <div key={key} className="flex flex-col items-center ">
        <div className={`text-2xl text-white bg-gray-300 rounded-full p-4 ${activeIndex>=key && 'bg-indigo-500'}`}>{item.icon}</div>
        <h1 className="text-sm text-pretty font-bold mt-1 font-italic ">{item.name}</h1>
        </div>
        {key!=stepperOptions.length-1 && (<div className={`h-1 w-[50px] mb-3 rounded-full md:w-[90px] lg:w-[170px] ${activeIndex>key ?  'bg-indigo-500' : 'bg-gray-200'} ` }></div>)}
        </div>
        <div className="flex gap-4 mt-4">
        </div>
        {/* choices list */}
        </div>
     })
     }</div>
     </div>

     {activeIndex==0 ? <Choice/> : null}
     {activeIndex==1 ? <TopicDesc/> : null}
     {activeIndex==2 ? <Options/> : null}

     <div className="px-5 md:px-10 lg:px-30 ">
    
        <div className="flex justify-between mt-10">
            <Button disabled={activeIndex==0} className="bg-indigo-500" onClick={()=>{setActiveIndex(activeIndex-1)}}>Prev</Button>
            {
            activeIndex != stepperOptions.length-1 ? 
               (<Button disabled={checkStatus()} onClick={() => {if (activeIndex < stepperOptions.length) {setActiveIndex(activeIndex + 1);}}}className="bg-indigo-500">Next</Button>)
             :   (
      
             <Button disabled={checkStatus()} onClick={()=>{GenerateCourseLayout()}}  className="bg-indigo-500">Generate</Button>
             )
             }

        
        </div>
      
    
  </div>
  { <LoadingDialog loading={loading}/>}
    </div>


  )
}

export default page
