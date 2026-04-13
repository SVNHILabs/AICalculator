'use client';

import { useState } from 'react';
import PromptInput from './PromptInput';

interface ResultsPanelProps {
  original: string;
  optimized: string;
  originalTokens: number;
  optimizedTokens: number;
  originalWords: number;
  optimizedWords: number;
  reduction: number;
}

export default function ResultsPanel({
  original,
  optimized,
  originalTokens,
  optimizedTokens,
  originalWords,
  optimizedWords,
  reduction,
}: ResultsPanelProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(optimized);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="animate-fade-up">
      {/* Stats bar */}
      <div className="flex items-center justify-between mb-6 p-4 bg-surface-800 border border-surface-600 rounded-xl">
        <div className="flex items-center gap-6">
          <div>
            <span className="text-xs text-slate-500 block">Before</span>
            <span className="text-lg font-mono font-medium text-slate-300">
              {originalTokens.toLocaleString()}
            </span>
          </div>
          <div className="text-slate-600">→</div>
          <div>
            <span className="text-xs text-slate-500 block">After</span>
            <span className="text-lg font-mono font-medium text-accent">
              {optimizedTokens.toLocaleString()}
            </span>
          </div>
        </div>
        <div className="text-right">
          <span className="text-xs text-slate-500 block">Reduction</span>
          <span
            className={`text-2xl font-mono font-bold ${
              reduction >= 30
                ? 'text-accent'
                : reduction >= 15
                ? 'text-yellow-400'
                : 'text-slate-300'
            }`}
          >
            {reduction}%
          </span>
        </div>
      </div>

      {/* Side by side */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
        <PromptInput
          value={original}
          onChange={() => {}}
          tokens={originalTokens}
          words={originalWords}
          label="Original"
          readOnly
        />
        <div className="relative">
          <PromptInput
            value={optimized}
            onChange={() => {}}
            tokens={optimizedTokens}
            words={optimizedWords}
            label="Optimized"
            readOnly
          />
          <button
            onClick={handleCopy}
            className="absolute top-0 right-0 px-3 py-1.5 bg-accent/10 hover:bg-accent/20 text-accent text-xs font-medium rounded-lg transition-all duration-200 border border-accent/20"
          >
            {copied ? '✓ Copied' : 'Copy'}
          </button>
        </div>
      </div>
    </div>
  );
}
