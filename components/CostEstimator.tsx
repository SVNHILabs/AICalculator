'use client';

import { MODEL_PRICING, calculateCost } from '@/lib/pricing';

interface CostEstimatorProps {
  originalTokens: number;
  optimizedTokens: number;
}

export default function CostEstimator({
  originalTokens,
  optimizedTokens,
}: CostEstimatorProps) {
  if (originalTokens === 0 || optimizedTokens === 0) return null;

  const savings = originalTokens - optimizedTokens;

  return (
    <div className="animate-fade-up-delay">
      <h3 className="text-sm font-medium text-slate-400 uppercase tracking-widest mb-3">
        Estimated savings per 1,000 calls
      </h3>
      <div className="bg-surface-800 border border-surface-600 rounded-xl overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-surface-600">
              <th className="text-left p-3 text-slate-500 font-medium">Model</th>
              <th className="text-right p-3 text-slate-500 font-medium">Before</th>
              <th className="text-right p-3 text-slate-500 font-medium">After</th>
              <th className="text-right p-3 text-slate-500 font-medium">Saved</th>
            </tr>
          </thead>
          <tbody>
            {Object.entries(MODEL_PRICING).map(([model, prices]) => {
              const costBefore = calculateCost(originalTokens, prices.input, 1000);
              const costAfter = calculateCost(optimizedTokens, prices.input, 1000);
              const costSaved = costBefore - costAfter;
              return (
                <tr
                  key={model}
                  className="border-b border-surface-700 last:border-b-0 hover:bg-surface-700/50 transition-colors"
                >
                  <td className="p-3 text-slate-300 font-medium">{model}</td>
                  <td className="p-3 text-right text-slate-400 font-mono text-xs">
                    ${costBefore.toFixed(3)}
                  </td>
                  <td className="p-3 text-right text-slate-300 font-mono text-xs">
                    ${costAfter.toFixed(3)}
                  </td>
                  <td className="p-3 text-right text-accent font-mono text-xs font-medium">
                    -${costSaved.toFixed(3)}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
