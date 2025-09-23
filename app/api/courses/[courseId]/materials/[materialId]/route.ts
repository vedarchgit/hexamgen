import { NextRequest, NextResponse } from 'next/server';
import { sql } from '@vercel/postgres';
// import { del } from '@vercel/blob';

export async function DELETE(
  req: NextRequest,
  { params }: { params: { courseId: string; materialId: string } }
) {
  const { materialId } = params;
  // Note: In a real app, you would verify ownership (user ID from session).

  try {
    // First, find the material to get its file URL for deletion from blob storage.
    const { rows, rowCount } = await sql`SELECT file_url FROM course_materials WHERE id = ${materialId}`;

    if (rowCount === 0) {
      return NextResponse.json({ message: 'Material not found' }, { status: 404 });
    }

    const { file_url } = rows[0];

    // 1. Delete the file from blob storage.
    // await del(file_url); // This uses the @vercel/blob client

    // 2. Delete the record from the database.
    await sql`DELETE FROM course_materials WHERE id = ${materialId}`;

    return NextResponse.json({ message: 'Material deleted successfully' });

  } catch (error) {
    console.error('Failed to delete material:', error);
    // If the blob deletion fails, you might have an orphaned file.
    // Robust error handling would involve logging this for later cleanup.
    return NextResponse.json({ message: 'Failed to delete material' }, { status: 500 });
  }
}
