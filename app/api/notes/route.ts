import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { title, subject_id, content_md } = body;

    const backendResponse = await fetch('http://127.0.0.1:8000/api/notes', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ title, subject_id, content_md }),
    });

    if (!backendResponse.ok) {
      const errorData = await backendResponse.json();
      return new NextResponse(JSON.stringify(errorData), { status: backendResponse.status });
    }

    const data = await backendResponse.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error creating note:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}
