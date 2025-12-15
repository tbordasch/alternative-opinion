import { NextRequest, NextResponse } from 'next/server';
import { submitOpinion } from '@/lib/db';

export async function POST(request: NextRequest) {
  try {
    const { content } = await request.json();

    if (!content || typeof content !== 'string') {
      return NextResponse.json(
        { success: false, error: 'Invalid content' },
        { status: 400 }
      );
    }

    const result = await submitOpinion(content);

    if (result.success) {
      return NextResponse.json({ success: true });
    } else {
      return NextResponse.json(
        { success: false, error: result.error },
        { status: 400 }
      );
    }
  } catch (error) {
    console.error('Error in submit-opinion API:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}

