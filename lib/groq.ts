const GROQ_API_URL = 'https://api.groq.com/openai/v1/chat/completions';

const SYSTEM_PROMPTS: Record<string, string> = {
  light: `You are a prompt compression expert. Rewrite the user's LLM prompt to use fewer tokens while preserving the exact same intent, constraints, output format, and expected result quality.

Optimization level: LIGHT
- Only remove filler words, redundant phrases, and obvious padding
- Keep the overall structure and sentence flow intact
- Target ~10-20% token reduction

Rules:
- Never remove critical constraints or context
- Never change the expected output format
- Never add new instructions that weren't in the original
- Return ONLY the optimized prompt text, nothing else — no explanations, no labels, no markdown`,

  medium: `You are a prompt compression expert. Rewrite the user's LLM prompt to use fewer tokens while preserving the exact same intent, constraints, output format, and expected result quality.

Optimization level: MEDIUM
- Restructure sentences for conciseness
- Merge repeated or overlapping ideas
- Replace verbose phrasing with tight equivalents
- Target ~20-40% token reduction

Rules:
- Never remove critical constraints or context
- Never change the expected output format
- Never add new instructions that weren't in the original
- Return ONLY the optimized prompt text, nothing else — no explanations, no labels, no markdown`,

  aggressive: `You are a prompt compression expert. Rewrite the user's LLM prompt to use fewer tokens while preserving the exact same intent, constraints, output format, and expected result quality.

Optimization level: AGGRESSIVE
- Maximum compression — strip every non-essential word
- Use shorthand and abbreviations where meaning stays clear
- Collapse multi-sentence instructions into single dense lines
- Target ~40-60% token reduction

Rules:
- Never remove critical constraints or context
- Never change the expected output format
- Never add new instructions that weren't in the original
- Return ONLY the optimized prompt text, nothing else — no explanations, no labels, no markdown`,
};

export async function optimizePrompt(
  prompt: string,
  level: 'light' | 'medium' | 'aggressive'
): Promise<string> {
  const apiKey = process.env.GROQ_API_KEY;
  if (!apiKey) {
    throw new Error('GROQ_API_KEY is not configured');
  }

  const response = await fetch(GROQ_API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: 'llama-3.3-70b-versatile',
      messages: [
        { role: 'system', content: SYSTEM_PROMPTS[level] },
        { role: 'user', content: prompt },
      ],
      temperature: 0.3,
      max_tokens: 4096,
    }),
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Groq API error: ${response.status} — ${error}`);
  }

  const data = await response.json();
  return data.choices[0]?.message?.content?.trim() || '';
}
