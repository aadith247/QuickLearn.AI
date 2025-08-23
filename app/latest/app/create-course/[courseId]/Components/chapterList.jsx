'use client'

import React from 'react';
import { HiOutlineClock, HiCheckCircle } from 'react-icons/hi2';

function ChapterList({ chapters, formatDuration }) {
  if (!Array.isArray(chapters) || chapters.length === 0) return null;

  return (
    <div className="mt-8">
      <div className="text-lg font-semibold mb-3">Chapters</div>
      <div className="space-y-4">
        {chapters.map((raw, idx) => {
    const ch=raw;
          const chapterTitle = ch.chapterName || ch.title || ch.name || `Chapter ${idx + 1}`;
          const chapterAbout = ch.about || ch.description || '';
          const minutes = ch.durationMinutes || ch.duration;
          const chapterDuration = formatDuration(minutes);
          return (
            <div key={idx} className="rounded-2xl border border-gray-200 bg-white px-5 py-4 md:px-6 md:py-5">
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-start gap-4">
                  <div className="rounded-full bg-indigo-600 text-white flex items-center justify-center text-sm font-semibold mt-1" style={{ width: '40px', height: '40px', minWidth: '40px', minHeight: '40px' }}>
                    {idx + 1}
                  </div>
                  <div>
                    <div className="text-base md:text-lg font-semibold">{chapterTitle}</div>
                    {chapterAbout && (
                      <p className="text-sm text-gray-600 mt-2 leading-relaxed">{chapterAbout}</p>
                    )}
                    <div className="flex items-center gap-2 mt-2 text-indigo-600 font-medium text-sm">
                      <HiOutlineClock className="text-base" />
                      <span>{chapterDuration}</span>
                    </div>
                  </div>
                </div>
                <div className="text-gray-400 mt-1">
                  <HiCheckCircle className="text-2xl" />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default ChapterList;

