import { NextResponse } from 'next/server';
import { db } from '@/app/configs/db';
import { courseList } from '@/app/configs/Schema';
import { and, eq } from 'drizzle-orm';
import { currentUser } from '@clerk/nextjs/server';

export async function GET(_req, { params }) {
  try {
    const { courseId } = params;
    const user = await currentUser();
    const email = user?.primaryEmailAddress?.emailAddress;
    if (!email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    const result = await db.select().from(courseList).where((eq(courseList.courseId, courseId)));
    const item = result?.[0] || null;
    if (!item) return NextResponse.json(null, { status: 200 });
    return NextResponse.json(item, { status: 200 });
  } catch (error) {
    console.error('GET /api/courses/[courseId] failed', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function PATCH(req, { params }) {
  try {
    const { courseId } = params || {};
    const body = await req.json();
    const { name, description } = body || {};

    const user = await currentUser();
    const email =
      user?.primaryEmailAddress?.emailAddress || user?.emailAddresses?.[0]?.emailAddress || '';

    if (!email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const existing = await db
      .select()
      .from(courseList)
      .where(and(eq(courseList.courseId, courseId), eq(courseList.createdBy, email)));

    const item = existing?.[0];
    if (!item) {
      return NextResponse.json({ error: 'Not found' }, { status: 404 });
    }

    let output = item.courseOutput;
    if (typeof output === 'string') {
      try { output = JSON.parse(output); } catch { output = {}; }
    }
    if (!output || typeof output !== 'object') output = {};

    const updatedOutput = { ...output };
    if (typeof name === 'string' && name.length > 0) {
      updatedOutput.courseName = name;
      updatedOutput.title = name;
    }
    if (typeof description === 'string') {
      updatedOutput.description = description;
      updatedOutput.courseDescription = description;
    }

    const updateData = {};
    if (typeof name === 'string' && name.length > 0) updateData.name = name;
    updateData.courseOutput = updatedOutput;

    await db
      .update(courseList)
      .set(updateData)
      .where(and(eq(courseList.courseId, courseId), eq(courseList.createdBy, email)));

    const updated = await db
      .select()
      .from(courseList)
      .where(and(eq(courseList.courseId, courseId), eq(courseList.createdBy, email)));

    return NextResponse.json(updated?.[0] || null, { status: 200 });
  } catch (error) {
    console.error('PATCH /api/courses/[courseId] failed', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

