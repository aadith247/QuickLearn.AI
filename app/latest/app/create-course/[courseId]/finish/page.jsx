'use client'

import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useUser } from '@clerk/nextjs';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import ReactMarkdown from 'react-markdown';

export default function FinishPage()
{
    const renderMarkdown = (text) => {
        if (!text) return null;
        return <ReactMarkdown>{text}</ReactMarkdown>; };
  const params = useParams();
  const router = useRouter();
  const courseId = Array.isArray(params?.courseId) ? params.courseId[0] : params?.courseId;
  const { user } = useUser();
  
  const [course, setCourse] = useState(null);
  const [chapters, setChapters] = useState([]);
  const [selectedChapter, setSelectedChapter] = useState(0);
  const [loading, setLoading] = useState(true);
  const [chaptersLoading, setChaptersLoading] = useState(true);

  useEffect(() => {
    if (courseId) {
      fetchCourseData();
    }
  }, [courseId]);

  const fetchCourseData = async () => {
    try {
      setLoading(true);
      setChaptersLoading(true);
      
      const courseResponse = await fetch(`/api/courses/${courseId}`);
      if (!courseResponse.ok) throw new Error('Failed to fetch course');
      const courseData = await courseResponse.json();
      setCourse(courseData);

      let fetchedChapters = [];
      try {
        const chaptersResponse = await fetch(`/api/chapters?courseId=${courseId}`);
        if (chaptersResponse.ok) {
          const chaptersData = await chaptersResponse.json();
          fetchedChapters = chaptersData.chapters || [];
        }
      } catch (dbError) {
        console.warn('Database fetch failed:', dbError);
      }

      if (fetchedChapters.length === 0) {
        try {
          const localStorageData = localStorage.getItem(`course_${courseId}_chapters`);
          if (localStorageData) {
            fetchedChapters = JSON.parse(localStorageData);
            fetchedChapters = fetchedChapters.map(ch => ({
              ...ch,
              content: Array.isArray(ch.content) ? ch.content : [],
              durationMinutes: ch.durationMinutes || 15,
              videoId: ch.videoId || null
            }));
          }
        } catch (localStorageError) {
          console.warn('localStorage fallback failed:', localStorageError);
        }
      }

      if (courseData.courseOutput) {
        try {
          const courseOutput = typeof courseData.courseOutput === 'string' 
            ? JSON.parse(courseData.courseOutput) 
            : courseData.courseOutput;

          let courseChapters = [];
          if (courseOutput.chapters && Array.isArray(courseOutput.chapters)) {
            courseChapters = courseOutput.chapters;
          } else if (Array.isArray(courseOutput) && courseOutput[0]?.chapters) {
            courseChapters = courseOutput[0].chapters;
          } else if (courseOutput.course?.chapters) {
            courseChapters = courseOutput.course.chapters;
          }

          if (courseChapters.length > 0) {
            fetchedChapters = fetchedChapters.map((dbChapter, index) => {
              const courseChapter = courseChapters[index] || {};
              return {
                ...dbChapter,
                ...courseChapter,
                id: dbChapter.id || `chapter-${index}`,
                title: dbChapter.title || courseChapter.title || `Chapter ${index + 1}`,
                content: dbChapter.content || courseChapter.content || [],
                durationMinutes: courseChapter.durationMinutes || courseChapter.duration || courseChapter.time || courseChapter.length || 15,
                about: courseChapter.about || courseChapter.description || courseChapter.chapterDescription || dbChapter.about,
                videoId: dbChapter.videoId || courseChapter.videoId || null
              };
            });
          }
        } catch (parseError) {
          console.warn('Error parsing course output:', parseError);
        }
      }

      fetchedChapters = fetchedChapters.filter(ch => ch).map((chapter, index) => ({
        id: chapter.id || `chapter-${index}`,
        title: chapter.title || `Chapter ${index + 1}`,
        content: Array.isArray(chapter.content) ? chapter.content : [],
        durationMinutes: chapter.durationMinutes || 15,
        videoId: chapter.videoId || null,
        ...chapter
      }));

      setChapters(fetchedChapters);
      if (fetchedChapters.length > 0) {
        setSelectedChapter(0);
      }
    } catch (error) {
      console.error('Error fetching course data:', error);
    } finally {
      setLoading(false);
      setChaptersLoading(false);
    }
  };

  const handleBackToCourses = () => {
    router.push('/dashboard');
    setTimeout(() => {
      window.location.reload();
    }, 100);
  };

  const formatDuration = (value) => {
    if (!value) return 'N/A';
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

  const handleChapterSelect = (index) => {
    if (index >= 0 && index < chapters.length) {
      setSelectedChapter(index);
      setChapters([...chapters]);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-indigo-600 mx-auto mb-4"></div>
          <h2 className="text-xl font-semibold text-gray-700 mb-2">Loading Course Content</h2>
          <p className="text-gray-500">Please wait while we fetch your course details...</p>
        </div>
      </div>
    );
  }

  if (!course) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-gray-700 mb-2">Course Not Found</h2>
          <p className="text-gray-500">The course you're looking for doesn't exist.</p>
        </div>
      </div>
    );
  }

  if (chaptersLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-indigo-600 mx-auto mb-4"></div>
          <h2 className="text-xl font-semibold text-gray-700 mb-2">Loading Chapter Content</h2>
          <p className="text-gray-500">Please wait while we fetch your course chapters...</p>
        </div>
      </div>
    );
  }

  const currentChapter = chapters[selectedChapter] || {};
  const chapterContent = currentChapter.content || [];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b border-gray-200 px-4 py-3">
        <div className="flex items-center justify-between">
          <a 
            href="/dashboard"
            className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to My Courses
          </a>
          <h1 className="text-lg font-semibold text-gray-800 dark:text-gray-100">{course.name}</h1>
          <div className="w-20"></div>
        </div>
      </div>

      <div className="flex">
        <div className="w-80 bg-white dark:bg-gray-800 shadow-sm min-h-screen border-r border-gray-200 dark:border-gray-700 flex-shrink-0">
          <div className="p-6">
            <div className="bg-indigo-600 dark:bg-indigo-700 text-white p-4 rounded-lg mb-6">
              <h2 className="text-lg font-bold">{course.name}</h2>
            </div>
            <div className="space-y-1">
              {chapters.map((chapter, index) => {
                const duration = formatDuration(chapter.durationMinutes);
                return (
                  <div
                    key={chapter.id}
                    onClick={() => handleChapterSelect(index)}
                    className={`p-3 rounded-lg cursor-pointer transition-colors ${
                      selectedChapter === index
                        ? 'bg-indigo-50 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-600'
                        : 'hover:bg-gray-50 dark:hover:bg-gray-700'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold flex-shrink-0 ${
                        selectedChapter === index
                          ? 'bg-indigo-600 dark:bg-indigo-700 text-white'
                          : 'bg-gray-200 dark:bg-gray-600 text-gray-600 dark:text-gray-300'
                      }`}>
                        {index + 1}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="font-medium text-gray-800 break-words leading-tight mb-1">
                          {chapter.title}
                        </div>
                        <div className="text-sm text-gray-500">
                          {duration}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <div className="flex-1 p-6">
          {chapters.length === 0 ? (
            <div className="bg-white rounded-lg p-6 text-center">
              <div className="text-6xl mb-4">📚</div>
              <h2 className="text-xl font-semibold text-gray-700 mb-2">No Chapters Available</h2>
              <p className="text-gray-500 mb-4">This course doesn't have any chapters yet. Please generate course content first.</p>
              <a 
                href={`/create-course/${courseId}`}
                className="inline-block bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition-colors"
              >
                Go Back to Course Layout
              </a>
            </div>
          ) : currentChapter.title ? (
            <div className="space-y-6 max-w-4xl mx-auto">
              <div className="bg-white rounded-lg border border-gray-200 p-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">
                  {currentChapter.title}
                </h2>
                <p className="text-gray-600 leading-relaxed">
                {renderMarkdown(currentChapter.about) || "This chapter covers imp concepts"} ;
                </p>
              </div>
              
              {course.videoIncluded !== 'false' && (
                <div className="bg-white rounded-lg border border-gray-200 p-6 w-full">
                  {currentChapter.videoId ? (
                    <div className="aspect-video bg-gray-900 rounded-lg overflow-hidden max-w-2xl mx-auto">
                      <iframe
                        src={`https://www.youtube.com/embed/${currentChapter.videoId}`}
                        title={`${currentChapter.title} - Video Tutorial`}
                        className="w-full h-full"
                        allowFullScreen
                      ></iframe>
                    </div>
                  ) : (
                    <div className="aspect-video bg-gray-100 rounded-lg flex items-center justify-center max-w-2xl mx-auto">
                      <div className="text-center">
                        <div className="text-6xl mb-4">📚</div>
                        <h3 className="text-xl font-semibold mb-2">No Video Available</h3>
                        <p className="text-gray-600">This chapter focuses on text-based learning.</p>
                      </div>
                    </div>
                  )}
                </div>
              )}
              
              {chapterContent.length > 0 && (
                <div className="bg-white rounded-lg border border-gray-200 p-6">
                  {chapterContent.map((topic, index) => (
                    <div key={index} className="mb-8 last:mb-0">
                      <h3 className="text-xl font-semibold text-gray-800 mb-4">
                        {topic.title || `Topic ${index + 1}`}
                      </h3>
                      {topic.explanation && (
                        <div className="mb-4">
                          <p className="text-gray-700 leading-relaxed mb-3">
                          {renderMarkdown(topic.explanation)}
                          </p>
                        </div>
                      )}
                      
                      {topic.keyPoints && topic.keyPoints.length > 0 && (
                        <div className="mb-4">
                          <h5 className="text-md font-medium text-gray-800 mb-2">Key Points:</h5>
                          <ul className="list-disc list-inside space-y-1">
                            {topic.keyPoints.map((point, pointIndex) => (
                              <li key={pointIndex} className="text-gray-700 text-sm">
                      {point}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                      
                      {topic.codeExamples && topic.codeExamples.length > 0 && (
                        <div className="mb-4">
                          <h4 className="text-lg font-medium text-gray-800 mb-2">Code Example:</h4>
                          {topic.codeExamples.map((codeExample, codeIndex) => {
                            let codeText = '';
                            let language = '';
                            if (typeof codeExample === 'string') {
                              codeText = codeExample;
                            } else if (codeExample && typeof codeExample === 'object') {
                              codeText = codeExample.code || codeExample.content || JSON.stringify(codeExample);
                              language = codeExample.language || '';
                            } else {
                              codeText = String(codeExample);
                            }
                            
                            return (
                              <div key={codeIndex} className="bg-gray-900 text-white p-4 rounded-lg overflow-x-auto border border-gray-700">
                                {language && (
                                  <div className="text-xs text-gray-400 mb-2 font-mono">
                                    {language}
                                  </div>
                                )}
                                <pre className="text-sm">
                                  <code>{codeText}</code>
                                </pre>
                              </div>
                            );
                          })}
                        </div>
                      )}
                      
                      {topic.studyResources && topic.studyResources.length > 0 && (
                        <div className="mt-4">
                          <h5 className="text-md font-medium text-gray-800 mb-2">Study Resources:</h5>
                          <ul className="space-y-2">
                            {topic.studyResources.map((resource, resourceIndex) => (
                              <li key={resourceIndex}>
                                <a
                                  href={resource}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium text-sm"
                                >
                                  <span className="mr-2">📖</span>
                                  {resource.includes('http') ? 'Read Article' : resource}
                                </a>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                      
                      {topic.youtubeUrl && (
                        <div className="mt-4">
                          <a
                            href={topic.youtubeUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center text-red-600 hover:text-red-800 font-medium"
                          >
                            <span className="mr-2">📺</span>
                            Watch Video Tutorial
                          </a>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          ) : (
            <div className="bg-white rounded-lg border border-gray-200 p-6 text-center">
              <div className="text-6xl mb-4">🔄</div>
              <h2 className="text-xl font-semibold text-gray-700 mb-2">Loading Chapter Content</h2>
              <p className="text-gray-500">Please wait while we load the selected chapter...</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}