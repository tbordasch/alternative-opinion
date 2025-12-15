import { NextRequest, NextResponse } from 'next/server';
import { submitComment } from '@/lib/db';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { opinionId, content, sessionId } = body;

    if (!opinionId || !content || !sessionId) {
      return NextResponse.json(
        { error: 'Missing opinionId, content, or sessionId' },
        { status: 400 }
      );
    }

    const result = await submitComment(opinionId, content, sessionId);

    if (result.success) {
      return NextResponse.json({ success: true });
    } else {
      return NextResponse.json(
        { error: result.error },
        { status: 400 }
      );
    }
  } catch (error) {
    console.error('Error in comments API:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}



