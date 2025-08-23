import { NextResponse } from 'next/server';
import { db } from '@/app/configs/db';
import { Chapters } from '@/app/configs/Schema';

export async function GET() {
  try {
    console.log('Testing database connection...');
    
    // Test if we can query the chapters table
    const result = await db.select().from(Chapters).limit(1);
    
    console.log('Database connection successful');
    console.log('Chapters table accessible, sample result:', result);
    
    return NextResponse.json({ 
      success: true, 
      message: 'Database connection successful',
      chaptersTableExists: true,
      sampleData: result
    });
    
  } catch (error) {
    console.error('Database test failed:', error);
    
    return NextResponse.json({ 
      success: false, 
      error: error.message,
      details: 'Database connection or table access failed'
    }, { status: 500 });
  }
}
