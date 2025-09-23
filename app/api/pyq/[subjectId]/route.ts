import { NextRequest, NextResponse } from 'next/server';
import { sql } from '@vercel/postgres';

export async function GET(req: NextRequest, { params }: { params: { subjectId: string } }) {
  const { subjectId } = params;

  try {
    const { rows } = await sql`SELECT * FROM pyqs WHERE subject_id = ${subjectId}`;
    return NextResponse.json(rows);
  } catch (error) {
    console.error('Failed to fetch PYQs:', error);
    return NextResponse.json({ message: 'Failed to fetch PYQs for this subject' }, { status: 500 });
  }
}
