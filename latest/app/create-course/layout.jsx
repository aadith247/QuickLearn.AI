
"use client"
import React from 'react'
import Header from '../dashboard/_components/Header'
import { UserInputContext } from '../_context/app'
import { useState } from 'react';
function layout({children}) {
  const [input,setInput]=useState([]);
  return (
   < UserInputContext.Provider value={{input,setInput}}>
    <div>
        <Header/>
        {children}
    </div>
    </UserInputContext.Provider>
  )
}

export default layout
