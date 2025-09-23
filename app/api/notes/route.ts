import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { sql } from '@vercel/postgres';

const createNoteSchema = z.object({
  title: z.string().min(3),
  subject_id: z.string().uuid(),
  content_md: z.string().optional(),
  content_url: z.string().url().optional(),
  tags: z.array(z.string()).optional(),
});

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const subjectId = searchParams.get('subject_id');

  if (!subjectId) {
    return NextResponse.json({ message: 'subject_id is required' }, { status: 400 });
  }

  try {
    const { rows } = await sql`SELECT * FROM notes WHERE subject_id = ${subjectId}`;
    return NextResponse.json(rows);
  } catch (error) {
    console.error('Failed to fetch notes:', error);
    return NextResponse.json({ message: 'Failed to fetch notes' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  // Note: In a real app, you'd get the user ID from the authenticated session.
  const userId = '123e4567-e89b-12d3-a456-426614174000'; // Placeholder

  try {
    const body = await req.json();
    const validation = createNoteSchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json({ message: 'Invalid request body', errors: validation.error.errors }, { status: 400 });
    }

    const { title, subject_id, content_md, content_url, tags } = validation.data;

    const { rows } = await sql`
      INSERT INTO notes (title, subject_id, content_md, content_url, tags, created_by)
      VALUES (${title}, ${subject_id}, ${content_md}, ${content_url}, ${tags ? `{${tags.join(',')}}` : null}, ${userId})
      RETURNING id, title, subject_id, created_at;
    `;

    return NextResponse.json(rows[0], { status: 201 });

  } catch (error) {
    console.error('Failed to create note:', error);
    return NextResponse.json({ message: 'Failed to create note' }, { status: 500 });
  }
}
