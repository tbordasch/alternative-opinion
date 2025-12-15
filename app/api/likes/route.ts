import { NextRequest, NextResponse } from 'next/server';
import { toggleLike } from '@/lib/db';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { commentId, sessionId } = body;

    if (!commentId || !sessionId) {
      return NextResponse.json(
        { error: 'Missing commentId or sessionId' },
        { status: 400 }
      );
    }

    const result = await toggleLike(commentId, sessionId);

    if (result.success) {
      return NextResponse.json({
        success: true,
        liked: result.liked,
      });
    } else {
      return NextResponse.json(
        { error: result.error },
        { status: 400 }
      );
    }
  } catch (error) {
    console.error('Error in likes API:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}



