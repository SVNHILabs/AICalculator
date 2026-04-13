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
          {/* Copy button — fixed top-right, outside the label/stats row */}
          <button
            onClick={handleCopy}
            className="absolute top-0 right-0 z-10 px-3 py-1.5 bg-accent/10 hover:bg-accent/20 text-accent text-xs font-medium rounded-lg transition-all duration-200 border border-accent/20"
          >
            {copied ? (
              <span className="flex items-center gap-1">
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                  <path d="M2 6l3 3 5-6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                Copied
              </span>
            ) : (
              <span className="flex items-center gap-1">
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                  <rect x="4" y="4" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1"/>
                  <path d="M8 4V2.5A1.5 1.5 0 006.5 1h-4A1.5 1.5 0 001 2.5v4A1.5 1.5 0 002.5 8H4" stroke="currentColor" strokeWidth="1"/>
                </svg>
                Copy
              </span>
            )}
          </button>

          <PromptInput
            value={optimized}
            onChange={() => {}}
            tokens={optimizedTokens}
            words={optimizedWords}
            label="Optimized"
            readOnly
          />
        </div>
      </div>
    </div>
  );
}
