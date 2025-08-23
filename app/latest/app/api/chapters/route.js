import { NextResponse } from 'next/server';
import { db } from '@/app/configs/db';
import { Chapters } from '@/app/configs/Schema';
import { eq, and } from 'drizzle-orm';

export async function POST(request) {
  try {
    const body = await request.json();
    console.log('Received chapter data:', body);
    
    const { courseId, chapterId, title, content, videoId, createdAt } = body;
    
    if (!courseId || chapterId === undefined || !title) {
      console.error('Missing required fields:', { courseId, chapterId, title });
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    console.log('Attempting to save chapter:', { courseId, chapterId, title });

    // Check if chapter already exists
    const existingChapter = await db
      .select()
      .from(Chapters)
      .where(and(
        eq(Chapters.courseId, courseId),
        eq(Chapters.chapterId, chapterId)
      ));

    console.log('Existing chapters found:', existingChapter.length);

    if (existingChapter.length > 0) {
      // Update existing chapter
      console.log('Updating existing chapter');
      await db
        .update(Chapters)
        .set({
          title: title,
          content: content,
          videoId: videoId,
          updatedAt: new Date()
        })
        .where(and(
          eq(Chapters.courseId, courseId),
          eq(Chapters.chapterId, chapterId)
        ));
    } else {
      // Insert new chapter
      console.log('Inserting new chapter');
      await db.insert(Chapters).values({
        courseId: courseId,
        chapterId: chapterId,
        title: title,
        content: content,
        videoId: videoId,
        createdAt: new Date()
      });
    }

    console.log('Chapter saved successfully');
    return NextResponse.json({ 
      success: true, 
      message: `Chapter ${chapterId} saved successfully` 
    });
    
  } catch (error) {
    console.error('Error in chapters API:', error);
    console.error('Error details:', {
      message: error.message,
      stack: error.stack,
      name: error.name
    });
    return NextResponse.json({ 
      error: error.message,
      details: 'Database operation failed. Please check if the chapters table exists.'
    }, { status: 500 });
  }
}

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const courseId = searchParams.get('courseId');
    
    console.log('Fetching chapters for courseId:', courseId);
    
    if (!courseId) {
      return NextResponse.json({ error: 'Course ID is required' }, { status: 400 });
    }
    
    const chapters = await db
      .select()
      .from(Chapters)
      .where(eq(Chapters.courseId, courseId))
      .orderBy(Chapters.chapterId);
    
    console.log('Found chapters:', chapters.length);
    
    return NextResponse.json({ chapters });
    
  } catch (error) {
    console.error('Error fetching chapters:', error);
    console.error('Error details:', {
      message: error.message,
      stack: error.stack,
      name: error.name
    });
    return NextResponse.json({ 
      error: error.message,
      details: 'Database query failed. Please check if the chapters table exists.'
    }, { status: 500 });
  }
} 