// Model pricing as of April 2026 (per 1M tokens)
// Source: Official provider pricing pages
// To update: edit the PRICING_VERSION date and model entries below

export const PRICING_VERSION = '2026-04';

export interface ModelPricing {
  provider: string;
  input: number;
  output: number;
}

export const MODEL_PRICING: Record<string, ModelPricing> = {
  // ─── OpenAI ────────────────────────────────────────
  'GPT-5.4':              { provider: 'OpenAI',     input: 2.50,   output: 15.00  },
  'GPT-5.4 Pro':          { provider: 'OpenAI',     input: 30.00,  output: 180.00 },
  'GPT-4.1':              { provider: 'OpenAI',     input: 2.00,   output: 8.00   },
  'GPT-4.1 Mini':         { provider: 'OpenAI',     input: 0.40,   output: 1.60   },
  'GPT-4.1 Nano':         { provider: 'OpenAI',     input: 0.10,   output: 0.40   },
  'GPT-4o':               { provider: 'OpenAI',     input: 2.50,   output: 10.00  },
  'o3':                   { provider: 'OpenAI',     input: 10.00,  output: 40.00  },
  'o3-mini':              { provider: 'OpenAI',     input: 1.10,   output: 4.40   },
  'o4-mini':              { provider: 'OpenAI',     input: 0.55,   output: 2.20   },

  // ─── Anthropic ─────────────────────────────────────
  'Claude Opus 4.6':      { provider: 'Anthropic',  input: 15.00,  output: 75.00  },
  'Claude Sonnet 4.6':    { provider: 'Anthropic',  input: 3.00,   output: 15.00  },
  'Claude Haiku 4.5':     { provider: 'Anthropic',  input: 0.25,   output: 1.25   },

  // ─── Google ────────────────────────────────────────
  'Gemini 2.5 Pro':       { provider: 'Google',     input: 1.25,   output: 10.00  },
  'Gemini 2.5 Flash':     { provider: 'Google',     input: 0.15,   output: 0.60   },
  'Gemini 3 Flash':       { provider: 'Google',     input: 0.50,   output: 3.00   },
  'Gemini 3.1 Flash-Lite':{ provider: 'Google',     input: 0.10,   output: 0.40   },

  // ─── DeepSeek ──────────────────────────────────────
  'DeepSeek V3.2':        { provider: 'DeepSeek',   input: 0.14,   output: 0.28   },
  'DeepSeek R1':          { provider: 'DeepSeek',   input: 0.55,   output: 2.19   },

  // ─── Mistral ───────────────────────────────────────
  'Mistral Large':        { provider: 'Mistral',    input: 2.00,   output: 6.00   },
  'Mistral Small':        { provider: 'Mistral',    input: 0.20,   output: 0.60   },

  // ─── xAI ───────────────────────────────────────────
  'Grok 4':               { provider: 'xAI',        input: 3.00,   output: 15.00  },

  // ─── Meta (via API providers) ──────────────────────
  'Llama 4 Maverick':     { provider: 'Meta',       input: 0.15,   output: 0.60   },
  'Llama 3.3 70B':        { provider: 'Meta',       input: 0.59,   output: 0.79   },

  // ─── Cohere ────────────────────────────────────────
  'Command R+':           { provider: 'Cohere',     input: 2.50,   output: 10.00  },

  // ─── Alibaba ───────────────────────────────────────
  'Qwen 3.5 Plus':        { provider: 'Alibaba',    input: 0.80,   output: 2.00   },
};

// Provider display order
export const PROVIDER_ORDER = [
  'OpenAI', 'Anthropic', 'Google', 'DeepSeek', 'Mistral', 'xAI', 'Meta', 'Cohere', 'Alibaba',
];

// Group models by provider for display
export function getModelsByProvider(): Record<string, { model: string; pricing: ModelPricing }[]> {
  const groups: Record<string, { model: string; pricing: ModelPricing }[]> = {};
  for (const [model, pricing] of Object.entries(MODEL_PRICING)) {
    if (!groups[pricing.provider]) groups[pricing.provider] = [];
    groups[pricing.provider].push({ model, pricing });
  }
  return groups;
}

export function calculateCost(
  tokens: number,
  pricePerMillion: number,
  calls: number = 1000
): number {
  return (tokens / 1_000_000) * pricePerMillion * calls;
}
