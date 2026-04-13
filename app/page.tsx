'use client';

import { useState, useEffect, useCallback } from 'react';
import PromptInput from '@/components/PromptInput';
import OptimizationLevel from '@/components/OptimizationLevel';
import ResultsPanel from '@/components/ResultsPanel';
import CostEstimator from '@/components/CostEstimator';

type Level = 'light' | 'medium' | 'aggressive';

interface OptimizeResult {
  original: string;
  optimized: string;
  originalTokens: number;
  optimizedTokens: number;
  originalWords: number;
  optimizedWords: number;
  reduction: number;
}

export default function Home() {
  const [prompt, setPrompt] = useState('');
  const [level, setLevel] = useState<Level>('medium');
  const [tokens, setTokens] = useState(0);
  const [words, setWords] = useState(0);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<OptimizeResult | null>(null);
  const [error, setError] = useState('');

  // Debounced token count
  useEffect(() => {
    if (!prompt.trim()) {
      setTokens(0);
      setWords(0);
      return;
    }

    const timer = setTimeout(async () => {
      try {
        const res = await fetch('/api/count', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ text: prompt }),
        });
        const data = await res.json();
        if (data.tokens !== undefined) {
          setTokens(data.tokens);
          setWords(data.words);
        }
      } catch {
        // Fallback: rough estimate
        setTokens(Math.ceil(prompt.length / 4));
        setWords(prompt.trim().split(/\s+/).length);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [prompt]);

  const handleOptimize = useCallback(async () => {
    if (!prompt.trim() || loading) return;

    setLoading(true);
    setError('');
    setResult(null);

    try {
      const res = await fetch('/api/optimize', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt, level }),
      });

      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.error || 'Optimization failed');
      }

      const data: OptimizeResult = await res.json();
      setResult(data);
    } catch (err: any) {
      setError(err.message || 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  }, [prompt, level, loading]);

  const handleClear = () => {
    setPrompt('');
    setResult(null);
    setError('');
    setTokens(0);
    setWords(0);
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Background grain */}
      <div
        className="fixed inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Subtle glow in top corner */}
      <div className="fixed top-0 right-0 w-[600px] h-[600px] bg-accent/[0.03] rounded-full blur-[150px] pointer-events-none" />

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 py-12 sm:py-20">
        {/* Header */}
        <header className="mb-12 sm:mb-16">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-9 h-9 rounded-lg bg-accent/10 border border-accent/20 flex items-center justify-center">
              <svg
                width="18"
                height="18"
                viewBox="0 0 18 18"
                fill="none"
                className="text-accent"
              >
                <path
                  d="M3 5h12M3 9h8M3 13h5"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
              </svg>
            </div>
            <h1 className="text-2xl font-bold text-white tracking-tight">
              Fru<span className="text-accent">Kal</span>
            </h1>
          </div>
          <p className="text-slate-400 text-sm max-w-lg leading-relaxed">
            Paste your prompt, pick a compression level, and get an optimized
            version that costs less to run — with token counts and savings
            calculated across 25+ models instantly.
          </p>
        </header>

        {/* Main input */}
        <section className="mb-8">
          <PromptInput
            value={prompt}
            onChange={setPrompt}
            tokens={tokens}
            words={words}
            label="Your Prompt"
            placeholder="Paste your LLM prompt here..."
          />
        </section>

        {/* Controls */}
        <section className="mb-8 space-y-4">
          <OptimizationLevel level={level} onChange={setLevel} />

          <div className="flex items-center gap-3">
            <button
              onClick={handleOptimize}
              disabled={!prompt.trim() || loading}
              className={`flex-1 sm:flex-none px-8 py-3 rounded-xl font-medium text-sm transition-all duration-200 ${
                !prompt.trim() || loading
                  ? 'bg-surface-700 text-slate-500 cursor-not-allowed'
                  : 'bg-accent text-surface-900 hover:bg-accent-glow hover:shadow-[0_0_30px_rgba(0,229,160,0.2)] active:scale-[0.98]'
              }`}
            >
              {loading ? (
                <span className="flex items-center gap-2">
                  <svg
                    className="animate-spin h-4 w-4"
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="3"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                    />
                  </svg>
                  Optimizing...
                </span>
              ) : (
                'Optimize Prompt'
              )}
            </button>

            {prompt.trim() && (
              <button
                onClick={handleClear}
                className="px-4 py-3 rounded-xl text-sm text-slate-400 hover:text-slate-200 border border-surface-600 hover:border-surface-600/80 transition-all duration-200"
              >
                Clear
              </button>
            )}
          </div>
        </section>

        {/* Error */}
        {error && (
          <div className="mb-8 p-4 bg-red-500/5 border border-red-500/20 rounded-xl text-red-400 text-sm animate-fade-up">
            {error}
          </div>
        )}

        {/* Loading skeleton */}
        {loading && (
          <div className="mb-8 space-y-4">
            <div className="h-20 shimmer rounded-xl" />
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <div className="h-48 shimmer rounded-xl" />
              <div className="h-48 shimmer rounded-xl" />
            </div>
          </div>
        )}

        {/* Results */}
        {result && !loading && (
          <section className="space-y-8">
            <ResultsPanel
              original={result.original}
              optimized={result.optimized}
              originalTokens={result.originalTokens}
              optimizedTokens={result.optimizedTokens}
              originalWords={result.originalWords}
              optimizedWords={result.optimizedWords}
              reduction={result.reduction}
            />
            <CostEstimator
              originalTokens={result.originalTokens}
              optimizedTokens={result.optimizedTokens}
            />
          </section>
        )}

        {/* Footer */}
        <footer className="mt-20 pt-8 border-t border-surface-700">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs text-slate-600">
            <p>
              Powered by Groq (Llama 3.3 70B) · Token counting via
              js-tiktoken (cl100k_base)
            </p>
            <p>
              Pricing updated: April 2026
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
}
