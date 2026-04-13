import { NextRequest, NextResponse } from 'next/server';
import { countTokens, countWords } from '@/lib/tokenizer';

export async function POST(req: NextRequest) {
  try {
    const { text } = await req.json();

    if (!text || typeof text !== 'string') {
      return NextResponse.json(
        { error: 'Text is required' },
        { status: 400 }
      );
    }

    const tokens = countTokens(text);
    const words = countWords(text);
    const characters = text.length;

    return NextResponse.json({ tokens, words, characters });
  } catch (error) {
    console.error('Token count error:', error);
    return NextResponse.json(
      { error: 'Failed to count tokens' },
      { status: 500 }
    );
  }
}
