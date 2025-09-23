import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { sql } from '@vercel/postgres';

const updateNoteSchema = z.object({
  title: z.string().min(3).optional(),
  content_md: z.string().optional(),
  content_url: z.string().url().optional(),
  tags: z.array(z.string()).optional(),
});

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  const { id } = params;

  try {
    const { rows, rowCount } = await sql`SELECT * FROM notes WHERE id = ${id}`;
    if (rowCount === 0) {
      return NextResponse.json({ message: 'Note not found' }, { status: 404 });
    }
    return NextResponse.json(rows[0]);
  } catch (error) {
    console.error('Failed to fetch note:', error);
    return NextResponse.json({ message: 'Failed to fetch note' }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  const { id } = params;
  // Note: In a real app, you'd verify ownership (user ID from session matches created_by).

  try {
    const body = await req.json();
    const validation = updateNoteSchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json({ message: 'Invalid request body', errors: validation.error.errors }, { status: 400 });
    }

    const { title, content_md, content_url, tags } = validation.data;

    // Dynamically build the update query
    const updates: string[] = [];
    const values: any[] = [];
    let queryIndex = 1;

    if (title) {
      updates.push(`title = $${queryIndex++}`);
      values.push(title);
    }
    if (content_md) {
      updates.push(`content_md = $${queryIndex++}`);
      values.push(content_md);
    }
    if (content_url) {
      updates.push(`content_url = $${queryIndex++}`);
      values.push(content_url);
    }
    if (tags) {
      updates.push(`tags = $${queryIndex++}`);
      values.push(`{${tags.join(',')}}`);
    }

    if (updates.length === 0) {
      return NextResponse.json({ message: 'No fields to update' }, { status: 400 });
    }

    values.push(id);
    const { rows, rowCount } = await sql.query(
      `UPDATE notes SET ${updates.join(', ')} WHERE id = $${queryIndex} RETURNING *`,
      values
    );

    if (rowCount === 0) {
      return NextResponse.json({ message: 'Note not found' }, { status: 404 });
    }

    return NextResponse.json(rows[0]);

  } catch (error) {
    console.error('Failed to update note:', error);
    return NextResponse.json({ message: 'Failed to update note' }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  const { id } = params;
  // Note: In a real app, you'd verify ownership.

  try {
    const { rowCount } = await sql`DELETE FROM notes WHERE id = ${id}`;

    if (rowCount === 0) {
      return NextResponse.json({ message: 'Note not found' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Note deleted successfully' });

  } catch (error) {
    console.error('Failed to delete note:', error);
    return NextResponse.json({ message: 'Failed to delete note' }, { status: 500 });
  }
}
