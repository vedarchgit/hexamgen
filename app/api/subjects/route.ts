import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function GET() {
  try {
    const subjects = await db.subject.findMany({
      select: {
        id: true,
        name: true,
      },
    });
    return NextResponse.json(subjects);
  } catch (error) {
    console.error('[GET_SUBJECTS]', error);
    return new NextResponse('Internal Error', { status: 500 });
  }
}
