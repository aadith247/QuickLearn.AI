import React from 'react'
import Image from 'next/image';
import {
    AlertDialog,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogHeader,
    AlertDialogTitle,
  } from "@/components/ui/alert-dialog";

  import { VisuallyHidden } from '@radix-ui/react-visually-hidden';

function LoadingDialog({ loading, progress = 0, currentChapter = 0, totalChapters = 0, status = "Please wait... AI is working on your course" }) {
  const progressPercentage = totalChapters > 0 ? (currentChapter / totalChapters) * 100 : 0;
  
  return (
    <AlertDialog open={loading}>
      <AlertDialogContent className="max-w-md">
        <AlertDialogHeader>
          <VisuallyHidden>
            <AlertDialogTitle>Generating Course Content</AlertDialogTitle>
          </VisuallyHidden>
          <AlertDialogDescription asChild>
            <div className="flex flex-col gap-4 justify-center items-center py-4">
              <Image src={'/loader.gif'} width={120} height={120} alt="loading" />
              
              <div className="text-center space-y-3">
                <div className="text-lg font-semibold text-gray-800">
                  {totalChapters > 0 ? `Generating Chapter ${currentChapter + 1} of ${totalChapters}` : 'Generating Course Content'}
                </div>
                
                <div className="text-sm text-gray-600">{status}</div>
                
                {totalChapters > 0 && (
                  <div className="w-full space-y-2">
                    <div className="flex justify-between text-xs text-gray-500">
                      <span>Progress</span>
                      <span>{Math.round(progressPercentage)}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-indigo-600 h-2 rounded-full transition-all duration-300 ease-out"
                        style={{ width: `${progressPercentage}%` }}
                      ></div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </AlertDialogDescription>
        </AlertDialogHeader>
      </AlertDialogContent>
    </AlertDialog>
  )
}

export default LoadingDialog;
