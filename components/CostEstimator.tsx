'use client';

import { MODEL_PRICING, PROVIDER_ORDER, PRICING_VERSION, calculateCost } from '@/lib/pricing';

interface CostEstimatorProps {
  originalTokens: number;
  optimizedTokens: number;
}

// Provider brand colors
const PROVIDER_COLORS: Record<string, string> = {
  OpenAI: '#10a37f',
  Anthropic: '#d4a574',
  Google: '#4285f4',
  DeepSeek: '#6366f1',
  Mistral: '#ff7000',
  xAI: '#ffffff',
  Meta: '#0668e1',
  Cohere: '#39594d',
  Alibaba: '#ff6a00',
};

export default function CostEstimator({
  originalTokens,
  optimizedTokens,
}: CostEstimatorProps) {
  if (originalTokens === 0 || optimizedTokens === 0) return null;

  const grouped: Record<string, { model: string; input: number; output: number }[]> = {};
  for (const [model, p] of Object.entries(MODEL_PRICING)) {
    if (!grouped[p.provider]) grouped[p.provider] = [];
    grouped[p.provider].push({ model, input: p.input, output: p.output });
  }

  // Total savings across cheapest & most expensive
  const allInputPrices = Object.values(MODEL_PRICING).map((p) => p.input);
  const maxPrice = Math.max(...allInputPrices);
  const maxSaving = calculateCost(originalTokens, maxPrice, 1000) -
    calculateCost(optimizedTokens, maxPrice, 1000);

  return (
    <div className="animate-fade-up-delay">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-medium text-slate-400 uppercase tracking-widest">
          Estimated savings per 1,000 calls
        </h3>
        <span className="text-[10px] text-slate-600 font-mono">
          Pricing: {PRICING_VERSION} · Input tokens only
        </span>
      </div>

      <div className="space-y-3">
        {PROVIDER_ORDER.filter((p) => grouped[p]).map((provider) => (
          <div
            key={provider}
            className="bg-surface-800 border border-surface-600 rounded-xl overflow-hidden"
          >
            {/* Provider header */}
            <div className="flex items-center gap-2 px-4 py-2.5 border-b border-surface-700">
              <div
                className="w-2 h-2 rounded-full"
                style={{ backgroundColor: PROVIDER_COLORS[provider] || '#6b7280' }}
              />
              <span className="text-xs font-semibold text-slate-300 uppercase tracking-wider">
                {provider}
              </span>
            </div>

            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-surface-700">
                  <th className="text-left px-4 py-2 text-[11px] text-slate-600 font-medium">
                    Model
                  </th>
                  <th className="text-right px-4 py-2 text-[11px] text-slate-600 font-medium">
                    $/1M in
                  </th>
                  <th className="text-right px-4 py-2 text-[11px] text-slate-600 font-medium">
                    $/1M out
                  </th>
                  <th className="text-right px-4 py-2 text-[11px] text-slate-600 font-medium">
                    Before
                  </th>
                  <th className="text-right px-4 py-2 text-[11px] text-slate-600 font-medium">
                    After
                  </th>
                  <th className="text-right px-4 py-2 text-[11px] text-slate-600 font-medium">
                    Saved
                  </th>
                </tr>
              </thead>
              <tbody>
                {grouped[provider].map(({ model, input, output }) => {
                  const costBefore = calculateCost(originalTokens, input, 1000);
                  const costAfter = calculateCost(optimizedTokens, input, 1000);
                  const costSaved = costBefore - costAfter;
                  return (
                    <tr
                      key={model}
                      className="border-b border-surface-700/50 last:border-b-0 hover:bg-surface-700/30 transition-colors"
                    >
                      <td className="px-4 py-2.5 text-slate-300 font-medium text-xs">
                        {model}
                      </td>
                      <td className="px-4 py-2.5 text-right text-slate-500 font-mono text-[11px]">
                        ${input.toFixed(2)}
                      </td>
                      <td className="px-4 py-2.5 text-right text-slate-500 font-mono text-[11px]">
                        ${output.toFixed(2)}
                      </td>
                      <td className="px-4 py-2.5 text-right text-slate-400 font-mono text-[11px]">
                        ${costBefore.toFixed(4)}
                      </td>
                      <td className="px-4 py-2.5 text-right text-slate-300 font-mono text-[11px]">
                        ${costAfter.toFixed(4)}
                      </td>
                      <td className="px-4 py-2.5 text-right text-accent font-mono text-[11px] font-medium">
                        -${costSaved.toFixed(4)}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        ))}
      </div>

      <p className="mt-3 text-[10px] text-slate-600 text-center">
        Prices reflect official API rates as of {PRICING_VERSION}. Verify current rates with providers before committing.
      </p>
    </div>
  );
}
