'use client';

type Level = 'light' | 'medium' | 'aggressive';

interface OptimizationLevelProps {
  level: Level;
  onChange: (level: Level) => void;
}

const LEVELS: { key: Level; label: string; desc: string; range: string }[] = [
  { key: 'light', label: 'Light', desc: 'Trim filler words', range: '10-20%' },
  { key: 'medium', label: 'Medium', desc: 'Restructure & merge', range: '20-40%' },
  { key: 'aggressive', label: 'Aggressive', desc: 'Max compression', range: '40-60%' },
];

export default function OptimizationLevel({
  level,
  onChange,
}: OptimizationLevelProps) {
  return (
    <div className="flex gap-2">
      {LEVELS.map((l) => (
        <button
          key={l.key}
          onClick={() => onChange(l.key)}
          className={`flex-1 px-3 py-3 rounded-xl border text-left transition-all duration-200 ${
            level === l.key
              ? 'border-accent/50 bg-accent/5 shadow-[0_0_20px_rgba(0,229,160,0.08)]'
              : 'border-surface-600 bg-surface-800 hover:border-surface-600/80 hover:bg-surface-700'
          }`}
        >
          <div className="flex items-center justify-between mb-1">
            <span
              className={`text-sm font-semibold ${
                level === l.key ? 'text-accent' : 'text-slate-300'
              }`}
            >
              {l.label}
            </span>
            <span
              className={`text-xs font-mono ${
                level === l.key ? 'text-accent/70' : 'text-slate-500'
              }`}
            >
              ~{l.range}
            </span>
          </div>
          <span className="text-xs text-slate-500">{l.desc}</span>
        </button>
      ))}
    </div>
  );
}
