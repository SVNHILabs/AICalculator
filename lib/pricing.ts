export const MODEL_PRICING: Record<string, { input: number; output: number }> = {
  'GPT-4o': { input: 2.50, output: 10.00 },
  'Claude Sonnet': { input: 3.00, output: 15.00 },
  'Gemini Pro': { input: 1.25, output: 5.00 },
  'Llama 3 70B': { input: 0.59, output: 0.79 },
};

export function calculateCost(
  tokens: number,
  pricePerMillion: number,
  calls: number = 1000
): number {
  return (tokens / 1_000_000) * pricePerMillion * calls;
}
