import { NextRequest, NextResponse } from 'next/server';
import { sql } from '@vercel/postgres';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const subjectId = searchParams.get('subject_id');

  if (!subjectId) {
    return NextResponse.json({ message: 'subject_id is required' }, { status: 400 });
  }

  try {
    const { rows } = await sql`
      SELECT topic, intensity 
      FROM heatmap_topics
      WHERE subject_id = ${subjectId};
    `;
    return NextResponse.json(rows);
  } catch (error) {
    console.error('Failed to fetch heatmap data:', error);
    return NextResponse.json({ message: 'Failed to fetch heatmap data' }, { status: 500 });
  }
}
