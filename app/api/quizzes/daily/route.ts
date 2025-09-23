import { NextRequest, NextResponse } from 'next/server';
import { sql } from '@vercel/postgres';

export async function GET(req: NextRequest) {
  try {
    // Placeholder logic: Get the most recent quiz marked as 'daily'
    // In a real app, you might have more complex logic based on the current date.
    const { rows, rowCount } = await sql`
      SELECT * FROM quizzes 
      WHERE is_daily = true 
      ORDER BY created_at DESC 
      LIMIT 1;
    `;

    if (rowCount === 0) {
      return NextResponse.json({ message: 'No daily quiz found' }, { status: 404 });
    }

    return NextResponse.json(rows[0]);

  } catch (error) {
    console.error('Failed to fetch daily quiz:', error);
    return NextResponse.json({ message: 'Failed to fetch daily quiz' }, { status: 500 });
  }
}
