import React,{useContext,useState,useEffect} from 'react'
import { UserInputContext } from '@/app/_context/app';
import { Input } from "@/components/ui/input"
function TopicDesc() {
  const {input,setInput}=useContext(UserInputContext);
  const handleTopic=(key,value)=>{
    setInput(prev=>({
      ...prev,
      [key]:value
    }));
  };

  return (
    <div className="flex flex-col gap-10 items-center justify-center my-5">
    <div className="mx-20 w-sm md:w-lg max-w-full ">
        <label><span className="font-bold">W</span>rite the topic for which you want to generate the course</label>
        <Input onChange={(e)=>handleTopic('topic',e.target.value)} placeholder="Topic"></Input>
    </div>
    <div className="mx-20 w-sm md:w-lg max-w-full ">
        <label><span className="font-bold">A</span>ny additional information? (Optional)</label>
        <Input onChange={(e)=>handleTopic('preferences',e.target.value)} placeholder="My learning preferences"></Input>
    </div>
    </div>
  )
}

export default TopicDesc
