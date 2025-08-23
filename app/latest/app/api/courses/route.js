import { NextResponse } from 'next/server';
import { db } from '@/app/configs/db';
import { courseList } from '@/app/configs/Schema';
import { eq, or, like } from 'drizzle-orm';

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    // const createdBy = searchParams.get('createdBy');
    const email = searchParams.get('email');

    console.log('Fetching courses for:', { email });
    let courses;
    
    if (email) {
      // Fetch courses for specific user - check both createdBy and userName fields
      courses = await db.select().from(courseList).where(
        or(
          eq(courseList.createdBy, email),
          eq(courseList.userName, email)
        )
      ).orderBy(courseList.id);
    } else {
      // Fetch all courses if no email provided
      courses = await db.select().from(courseList).orderBy(courseList.id);
    }
    return NextResponse.json({ 
      courses,
      count: courses.length 
    });
    
  } catch (error) {
    console.error('GET /api/courses failed:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    const {
      courseId,
      name,
      category,
      level,
      courseOutput,
      createdBy,
      userName,
      userProfileImage,
      videoIncluded
    } = body || {};

    if (!courseId || !name || !category || !level || !courseOutput || !createdBy) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    await db.insert(courseList).values({
      courseId,
      name,
      category,
      level,
      courseOutput,
      createdBy,
      userName: userName || null,
      userProfileImage: userProfileImage || null,
      videoIncluded: typeof videoIncluded === 'undefined' ? null : String(videoIncluded)
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('POST /api/courses failed', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

