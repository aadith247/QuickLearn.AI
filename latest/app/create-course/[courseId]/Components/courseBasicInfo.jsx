'use client'

import React from 'react';
import Image from 'next/image';
import { HiPencilSquare } from 'react-icons/hi2';

function CourseBasicInfo({ title, description, category, onEditClick }) {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-5 md:p-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10 items-center">
        <div>
          <div className="flex items-start gap-3 mb-3">
            <h2 className="text-2xl md:text-3xl font-extrabold">{title}</h2>
            <button 
              aria-label="Edit course title and description"
              className="text-indigo-600 cursor-pointer hover:text-indigo-700 mt-1"
              onClick={onEditClick}>
              <HiPencilSquare className="text-xl" />
            </button>
          </div>

          {description ? (
            <p className="text-gray-600 leading-relaxed mb-4">{description}</p>
          ) : null}

          {category ? (
            <div className="inline-flex items-center gap-2 text-sm font-medium text-indigo-700 bg-indigo-50 px-3 py-1 rounded-full mb-5">
              <span>{category}</span>
            </div>
          ) : null}
        </div>

        <div className="flex items-center justify-center">
          <div className="w-full md:w-[420px] h-[220px] md:h-[260px] bg-slate-100 rounded-xl flex items-center justify-center">
            <Image src="/file.svg" alt="Course" width={120} height={120} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default CourseBasicInfo;

