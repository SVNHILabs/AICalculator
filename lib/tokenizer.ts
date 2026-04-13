import { encodingForModel } from 'js-tiktoken';

let encoder: ReturnType<typeof encodingForModel> | null = null;

function getEncoder() {
  if (!encoder) {
    encoder = encodingForModel('gpt-4o');
  }
  return encoder;
}

export function countTokens(text: string): number {
  if (!text || text.trim().length === 0) return 0;
  const enc = getEncoder();
  const tokens = enc.encode(text);
  return tokens.length;
}

export function countWords(text: string): number {
  if (!text || text.trim().length === 0) return 0;
  return text.trim().split(/\s+/).length;
}
