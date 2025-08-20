'use client'

import React, { useEffect, useMemo, useState } from 'react';
import { useUser } from '@clerk/nextjs';
import { useParams } from 'next/navigation';
import CourseBasicInfo from './Components/courseBasicInfo';
import ChapterList from './Components/chapterList';
import EditCourse from './Components/EditCourse';
import { GenerateCourseLayout_AI } from '@/appconfigs/AIModel';
import { GenerateChapterContent_AI } from '@/app/configs/AIModel';
import { Button } from '@.components/ui/button';
import LoadingDialog from '../_components/LoadingDialog';
 import { getVideos } from '@/app/configs/service';

export default function CourseLayout() {
  const params = useParams();
  const courseId = Array.isArray(params?.courseId) ? params.courseId[0] : params?.courseId;
  const { isLoaded, isSignedIn } = useUser();

  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [editedTitle, setEditedTitle] = useState('');
  const [editedDescription, setEditedDescription] = useState('');
  const [isLoadingCourse, setIsLoadingCourse] = useState(true);
  const [currentChapter, setCurrentChapter] = useState(0);
  const [totalChapters, setTotalChapters] = useState(0);
  const [status, setStatus] = useState('');

  useEffect(() => {
    if (!isLoaded) return;
    setIsLoadingCourse(true);

    if(!isSignedIn)
    {
      setError('Please sign in to view this course');
      setIsLoadingCourse(false);
      return;
    }

    const fetchCourse = async () => {
      try {
        const res = await fetch(`/api/courses/${courseId}`);
        if (!res.ok)
        {
          const err = await res.json().catch(() => ({}));
          throw new Error(err?.error || 'Failed to load course');
        }
        const data = await res.json();
        setCourse(data);
      } catch (e) {
        setError(e.message);
      } finally {
        setIsLoadingCourse(false);
      }
    };
    
    fetchCourse();
  }, [courseId, isLoaded, isSignedIn]);

  const { name: courseName, category, level } = course || {};
  const rawOutput = course?.courseOutput;

  const parsedOutput = useMemo(() => {
    if (!rawOutput) return {};
    if (typeof rawOutput === 'object') return rawOutput;
    try {
      return JSON.parse(rawOutput);
    } catch {
      return {};
    }
  }, [rawOutput]);

  const courseTitle = editedTitle || parsedOutput[0]?.courseName || 'Course';

  const courseDescription = editedDescription
    || parsedOutput.description
    || parsedOutput.courseDescription
    || parsedOutput.course?.description
    || '';


  let chapters = parsedOutput[0]?.chapters;
  
  if (!chapters) {
    chapters = parsedOutput.chapters;
  }
  if (!chapters) {
    chapters = parsedOutput.course?.chapters;
  }
  if (!chapters) {
    chapters = parsedOutput[0]?.course?.chapters;
  }
  
  // If still no chapters, try to extract from courseOutput directly
  if (!chapters && typeof rawOutput === 'string') {
    try {
      const parsed = JSON.parse(rawOutput);
      chapters = parsed[0]?.chapters || parsed.chapters || parsed.course?.chapters;
    } catch (e) {
      console.log('Could not parse rawOutput as JSON');
    }
  }



  const chaptersCount = Array.isArray(chapters) ? chapters.length : 0;

  // Helper function to properly evaluate video inclusion
  const evaluateVideoInclusion = (value) => {
    if (value === null || value === undefined) return null;
    if (typeof value === 'boolean') return value;
    if (typeof value === 'string') {
      const lowerValue = value.toLowerCase();
      if (lowerValue === 'true' || lowerValue === 'yes' || lowerValue === '1') return true;
      if (lowerValue === 'false' || lowerValue === 'no' || lowerValue === '0') return false;
      return null; // Unknown string value
    }
    if (typeof value === 'number') return value > 0;
    return null;
  };

  const videosIncluded = evaluateVideoInclusion(parsedOutput.videosIncluded)
    ?? evaluateVideoInclusion(parsedOutput.videos)
    ?? evaluateVideoInclusion(parsedOutput.course?.videosIncluded)
    ?? evaluateVideoInclusion(parsedOutput.course?.videos)
    ?? evaluateVideoInclusion(course?.videoIncluded);

  const levelDisplay = level || parsedOutput.difficulty || parsedOutput.level || 'N/A';
  const categoryDisplay = category || parsedOutput.topic || category || '';

  const formatDuration = (value) => {
    if (!value) return 'N/A';
    
    // Convert minutes to hours if it's a number
    if (typeof value === 'number' || /^\d+$/.test(String(value))) {
      const minutes = parseInt(value);
      if (minutes >= 60) {
        const hours = Math.floor(minutes / 60);
        const remainingMinutes = minutes % 60;
        if (remainingMinutes === 0) {
          return `${hours} hour${hours > 1 ? 's' : ''}`;
        } else {
          return `${hours} hour${hours > 1 ? 's' : ''} ${remainingMinutes} minute${remainingMinutes > 1 ? 's' : ''}`;
        }
      } else {
        return `${minutes} minute${minutes > 1 ? 's' : ''}`;
      }
    }
    
    return String(value);
  };

  const parseDurationToMinutes = (value) => {
    if (!value) return 0;
    const s = String(value).trim().toLowerCase();
    
    // If it's already a number, assume minutes
    if (/^\d+(\.\d+)?$/.test(s)) return Math.round(parseFloat(s));
    
    // Extract numeric value and convert based on unit
    const numMatch = s.match(/\d+(?:\.\d+)?/);
    if (!numMatch) return 0;
    
    const num = parseFloat(numMatch[0]);
    if (/hour|hr|\bh\b/.test(s)) return Math.round(num * 60);
    if (/minute|min|\bm\b/.test(s)) return Math.round(num);
    
    // Default to minutes if no unit specified
    return Math.round(num);
  };

  const totalChapterMinutes = Array.isArray(chapters)
    ? chapters.reduce((acc, raw) => {
        const ch = (raw && typeof raw === 'object') ? raw : {};
        const d = ch.durationMinutes || ch.duration || ch.time || ch.length;
        return acc + parseDurationToMinutes(d);
      }, 0)
    : 0;

  const durationRaw = parsedOutput.duration;

  const overallMinutes = totalChapterMinutes || parseDurationToMinutes(durationRaw);
  const overallDurationDisplay = formatDuration(overallMinutes);


  if (isLoadingCourse) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-indigo-600 mx-auto mb-4"></div>
          <h2 className="text-xl font-semibold text-gray-700 mb-2">Loading Course Layout</h2>
          <p className="text-gray-500">Please wait while we fetch your course details...</p>
        </div>
      </div>
    );
  }

  if (error) return <div className="p-6 text-red-600">{error}</div>;

  
  

  const handleSaveEdits = ({ title: newTitle, description: newDesc }) => {
    if (newTitle) setEditedTitle(newTitle);
    if (newDesc) setEditedDescription(newDesc);
    setIsEditOpen(false);
  };

  const generateChapterContent = async () => {
    if (!Array.isArray(chapters) || chapters.length === 0) {
      console.warn('No chapters available to generate content');
      return;
    }

    setLoading(true);
    setCurrentChapter(0);
    setTotalChapters(chapters.length);
    setStatus('Initializing chapter generation...');
 
    
    try {
      const results = [];
      
      for (let i = 0; i < chapters.length; i++) {
        setCurrentChapter(i);
        setStatus(`Generating content for: ${chapters[i].chaptername || chapters[i].title || `Chapter ${i + 1}`}`);
        const chapter = chapters[i];
        const chapterTitle = chapter.chapterName || chapter.title || `Chapter ${i + 1}`;
        const chapterDesc = chapter.about || chapter.description || chapter.chapterDescription || '';

        console.log(`Processing chapter ${i + 1}: ${chapterTitle}`);
        
        let prompt;
        try {
          
          if (course?.category?.toLowerCase().includes('programming') || course?.name?.toLowerCase().includes('programming')) {
            // Enhanced prompt for programming courses
            const programmingLanguage = course?.level || 'JavaScript'; // Default language
            prompt = `Create detailed programming content for: ${course?.name}, Chapter: ${chapterTitle}. 
Generate an array of topics with the following structure:
{
  "title": "Topic Title",
  "explanation": "Detailed explanation of the concept with examples and best practices",
  "codeExamples": ["code example in ${programmingLanguage}"],
  "studyResources": ["famous article or resource link to study this topic"],
  "keyPoints": ["key point 1", "key point 2", "key point 3"]
}

Focus on:
1. Clear, beginner-friendly explanations
2. Practical code examples in ${programmingLanguage}
3. Real-world applications
4. Common mistakes and how to avoid them
5. Best practices and coding standards
6. Links to famous articles, documentation, or tutorials

Return the response in JSON format with an array of topics.`;
          } else {
            // Regular prompt for non-programming courses
            prompt = `explain the topic in detail on topic (generate array of lists breaking down the Chapter into topics and each has field title,explanation,codeExamples(if applicable) just return array of lists for each chapter where each list having field title,explanation,codeExamples thats it) : ${course?.name},Chapter:${chapterTitle} in JSON format with list of array with fields as title, description on given chapter in detail, codeExample(code field in <precode> format) if applicable`;
          }
          
          let aiContent;
          try {
            const result = await GenerateChapterContent_AI.sendMessage(prompt, { json: true });
            aiContent = result;
            console.log(`AI content generated for chapter ${i + 1}:`, aiContent);
          } catch (aiError) {
            console.warn(`AI content generation failed for chapter ${i + 1}, attempting fallback...`);
            const rawResponse = await GenerateChapterContent_AI.sendMessage(prompt, { json: false });
            const jsonMatch = rawResponse.match(/\[[\s\S]*\]/);
            if (jsonMatch) {
              aiContent = JSON.parse(jsonMatch[0]);
            } else {
              aiContent = [{ title: chapterTitle, explanation: chapterDesc, codeExamples: [] }];
            }
          }

          // Clean up code examples to ensure they're strings
          if (Array.isArray(aiContent)) {
            aiContent = aiContent.map(topic => {
              if (topic.codeExamples && Array.isArray(topic.codeExamples)) {
                topic.codeExamples = topic.codeExamples.map(codeExample => {
                  if (typeof codeExample === 'object' && codeExample !== null) {
                    return codeExample.code || codeExample.content || JSON.stringify(codeExample);
                  }
                  return String(codeExample);
                });
              }
              return topic;
            });
          }

        
          let videoResults = [];
          let videoId = null;
          
          if (course?.videoIncluded !== 'false') {
            try {
              const searchQuery = `${chapterTitle} ${course?.name} tutorial`;
              const videos = await getVideos(searchQuery);
              videoResults = videos;
              videoId = videos.length > 0 ? videos[0].id.videoId : null;
              console.log(`Found ${videos.length} videos for chapter ${i + 1}:`, videos);
            } catch (videoError) {
              console.warn(`Video search failed for chapter ${i + 1}:`, videoError);
              videoResults = [];
              videoId = null;
              // Continue with content generation even if videos fail
            }
          } else {
            console.log(`Skipping video generation for chapter ${i + 1} - videos not requested`);
          }

          // Save chapter content to database
          const chapterData = {
            courseId: courseId,
            chapterId: i,
            title: chapterTitle,
            content: aiContent,
            videoId: videoId,
            createdAt: new Date().toISOString()
          };

          console.log(`Saving chapter ${i + 1} to database:`, chapterData);
          
          try {
            const saveResponse = await fetch('/api/chapters', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(chapterData)
            });

            if (saveResponse.ok) {
              const saveResult = await saveResponse.json();
              console.log(`Chapter ${i + 1} saved to database successfully:`, saveResult);
            } else {
              const errorData = await saveResponse.json().catch(() => ({}));
              console.error(`Failed to save chapter ${i + 1} to database:`, errorData);
              console.warn('Continuing without database save...');
            }
          } catch (saveError) {
            console.error(`Database save error for chapter ${i + 1}:`, saveError);
            console.warn('Continuing without database save...');
          }

          results.push({
            chapterId: i,
            title: chapterTitle,
            status: 'success',
            content: {
              ...chapterData,
              videos: videoResults
            }
          });

          try
          {
            const existingData = JSON.parse(localStorage.getItem(`course_${courseId}_chapters`) || '[]');
            existingData[i] = chapterData;
            localStorage.setItem(`course_${courseId}_chapters`, JSON.stringify(existingData));
            console.log(`Chapter ${i + 1} stored in localStorage as fallback`);
          } catch (localStorageError) {
            console.warn('localStorage fallback failed:', localStorageError);
          }
          console.log(`Chapter ${i + 1} completed successfully`);

        } catch (error) {
          console.error(`Error processing chapter ${i + 1}:`, error);
          results.push({
            chapterId: i,
            title: chapterTitle,
            status: 'error',
            error: error.message
          });
        }
      }

      console.log('All chapters processed:', results);
      
      setStatus('Generation completed! Redirecting...');
      setTimeout(() => {
        window.location.href = `/create-course/${courseId}/finish`;
      }, 2000);
      
    } catch (error) {
      console.error('Chapter generation failed:', error);
      setStatus(`Error: ${error.message}`);
    } finally {
      setTimeout(() => {
        setLoading(false);
        setCurrentChapter(0);
        setTotalChapters(0);
        setStatus('');
      }, 3000);
    }
  };

      


  return <><LoadingDialog 
    loading={loading} 
    currentChapter={currentChapter}
    totalChapters={totalChapters}
    status={status}
  />
      
      <div className="px-4 py-6 md:px-10 lg:px-24">
        <div className="text-center text-2xl md:text-3xl font-bold mb-8">Course Layout</div>

        <CourseBasicInfo
          title={courseTitle}
          description={courseDescription}
          category={categoryDisplay}
          onEditClick={() => setIsEditOpen(true)}
        />

        <div className="mt-6 rounded-2xl border border-gray-200 bg-white px-5 py-4 md:px-8 md:py-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-sm">
            <div>
              <div className="text-gray-500 mb-1">Skill Level</div>
              <div className="font-semibold">{levelDisplay}</div>
            </div>
            <div>
              <div className="text-gray-500 mb-1">Duration</div>
              <div className="font-semibold">{overallDurationDisplay}</div>
            </div>
            <div>
              <div className="text-gray-500 mb-1">No Of Chapters</div>
              <div className="font-semibold">{chaptersCount}</div>
            </div>
            <div>
              <div className="text-gray-500 mb-1">Video Included?</div>
              <div className="font-semibold">
                {videosIncluded === null ? 'N/A' : 
                 videosIncluded === true ? 'Yes' : 
                 videosIncluded === false ? 'No' : 'N/A'}
              </div>
            </div>
          </div>
        </div>

        {Array.isArray(chapters) && chapters.length > 0 ? (
          <ChapterList chapters={chapters} formatDuration={formatDuration} />
        ) : (
          <div className="mt-8">
            <div className="text-lg font-semibold mb-3">Chapters</div>
            <div className="rounded-2xl border border-gray-200 bg-white px-5 py-4 md:px-6 md:py-5">
              <div className="text-center text-gray-500">
                <p>No chapters found in course data.</p>
                <p className="text-sm mt-2">This might be due to the course structure not being properly parsed.</p>
                <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                  <p className="text-xs text-gray-600">Debug Info:</p>
                  <p className="text-xs text-gray-600">Chapters count: {chaptersCount}</p>
                  <p className="text-xs text-gray-600">Raw output type: {typeof rawOutput}</p>
                  <p className="text-xs text-gray-600">Parsed output keys: {Object.keys(parsedOutput || {}).join(', ')}</p>
                </div>
              </div>
            </div>
          </div>
        )}

        <EditCourse
          initialTitle={courseTitle}
          initialDescription={courseDescription}
          open={isEditOpen}
          onOpenChange={setIsEditOpen}
          onSave={handleSaveEdits}
          courseId={courseId}
        />

        <Button 
          onClick={generateChapterContent} 
          disabled={loading}
          className='mt-4 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2.5 rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed'
        >
          {loading ? 'Generating Content...' : 'Generate Course Content'}
        </Button>
      </div>
    </>
    };
