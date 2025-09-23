import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { sql } from '@vercel/postgres';
// In a real app, you would use a library for blob storage, e.g., @vercel/blob
// import { put } from '@vercel/blob';

const createMaterialSchema = z.object({
  title: z.string().min(3),
  // The file itself will be handled as a multipart/form-data upload
});

export async function GET(req: NextRequest, { params }: { params: { courseId: string } }) {
  const { courseId } = params;

  try {
    const { rows } = await sql`
      SELECT id, title, file_url, created_at, created_by 
      FROM course_materials WHERE course_id = ${courseId}
      ORDER BY created_at DESC;
    `;
    return NextResponse.json(rows);
  } catch (error) {
    console.error('Failed to fetch materials:', error);
    return NextResponse.json({ message: 'Failed to fetch materials' }, { status: 500 });
  }
}

export async function POST(req: NextRequest, { params }: { params: { courseId: string } }) {
  const { courseId } = params;
  const userId = '123e4567-e89b-12d3-a456-426614174000'; // Placeholder user ID

  try {
    // Vercel's Edge Runtime doesn't support multipart/form-data parsing out of the box.
    // A common pattern is to have the client get a secure upload URL from the server,
    // then upload the file directly to blob storage.
    
    // 1. Client asks for a secure upload URL
    // (This would be a separate API route, e.g., /api/upload-url)

    // 2. Server generates a unique path and a signed URL using the blob storage provider.
    // const blob = await put(pathname, request.body, { access: 'public' });

    // 3. Client uploads the file directly to the returned URL.

    // 4. Client then hits this endpoint with the blob URL and other metadata.
    
    // For this example, we'll simulate this process and assume the client is sending
    // the final URL and title in the request body.
    const body = await req.json();
    const { title, file_url } = z.object({ title: z.string(), file_url: z.string().url() }).parse(body);

    const { rows } = await sql`
      INSERT INTO course_materials (course_id, title, file_url, created_by)
      VALUES (${courseId}, ${title}, ${file_url}, ${userId})
      RETURNING *;
    `;

    return NextResponse.json(rows[0], { status: 201 });

  } catch (error) {
    console.error('Failed to create material:', error);
    return NextResponse.json({ message: 'Failed to create material' }, { status: 500 });
  }
}
