import React,{useContext,useEffect,useState} from 'react';
import { UserInputContext } from '@/app/_context/app';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Input } from '@/components/ui/input'

function Options() {
  const {input,setInput}=useContext(UserInputContext);

const handleOptions=(key,value)=>{
  setInput(prev=>({
    ...prev,
    [key]:value
  }));
};
  return (
    <div>
    <div className="px-10 md:px-44 ml-30 mt-4">
    <div className="grid grid-cols-2 sm:grid-rows-1 md:gap-10 ">
      <div>
      <label className="text-sm">🎓Difficulty level</label>
      <Select onValueChange={(value)=>handleOptions('Difficulty',value)}>
  <SelectTrigger className="max-w-full md:w-sm sm:w-[200px] ">
    <SelectValue placeholder="Select"/>
  </SelectTrigger>
  <SelectContent>
    <SelectItem value="Beginner">Beginner</SelectItem>
    <SelectItem value="Intermediate">Intermediate</SelectItem>
    <SelectItem value="Advance">Advance</SelectItem>
  </SelectContent>
</Select>
    </div>
    <div>
      <label className="text-sm">⏱️Course Duration</label>
      <Select onValueChange={(value)=>handleOptions('Duration',value)}>
  <SelectTrigger className="max-w-full md:w-sm sm:w-[200px]">
    <SelectValue placeholder="Select" />
  </SelectTrigger>
  <SelectContent>
    <SelectItem value="1 Hour">1 Hour</SelectItem>
    <SelectItem value="2 Hours">2 Hours</SelectItem>
    <SelectItem value="More than 3 Hours">More than 3 Hours</SelectItem>
  </SelectContent>
</Select>
    </div>
    <div>
      <label className="text-sm">📹Add Videos</label>
      <Select onValueChange={(value)=>handleOptions('Videos',value)}>
  <SelectTrigger className="max-w-full md:w-sm sm:w-[200px]">
    <SelectValue placeholder="Select" />
  </SelectTrigger>
  <SelectContent>
    <SelectItem value="Yes">Yes</SelectItem>
    <SelectItem value="No">No</SelectItem>
   
  </SelectContent>
</Select>
    </div>
    <div>
      <label className="text-sm ">📖Number of Chapters</label>
     <Input type={{Number}} onChange={(e)=>handleOptions('Chapters',e.target.value)} className="max-w-full md:w-sm sm:w-[200px]" placeholder="Chapters"></Input>
    </div>
    </div>
    
   </div>
    </div>
  )
}

export default Options
