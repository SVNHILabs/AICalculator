import { NextRequest, NextResponse } from 'next/server';
import { optimizePrompt } from '@/lib/groq';
import { countTokens, countWords } from '@/lib/tokenizer';

export const maxDuration = 30;

export async function POST(req: NextRequest) {
  try {
    const { prompt, level = 'medium' } = await req.json();

    if (!prompt || typeof prompt !== 'string') {
      return NextResponse.json(
        { error: 'Prompt is required' },
        { status: 400 }
      );
    }

    if (!['light', 'medium', 'aggressive'].includes(level)) {
      return NextResponse.json(
        { error: 'Level must be light, medium, or aggressive' },
        { status: 400 }
      );
    }

    const originalTokens = countTokens(prompt);
    const originalWords = countWords(prompt);

    const optimized = await optimizePrompt(prompt, level);

    const optimizedTokens = countTokens(optimized);
    const optimizedWords = countWords(optimized);
    const reduction = originalTokens > 0
      ? Math.round(((originalTokens - optimizedTokens) / originalTokens) * 100)
      : 0;

    return NextResponse.json({
      original: prompt,
      optimized,
      originalTokens,
      optimizedTokens,
      originalWords,
      optimizedWords,
      reduction,
    });
  } catch (error: any) {
    console.error('Optimize error:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to optimize prompt' },
      { status: 500 }
    );
  }
}
