'use client';

import { useEffect, useRef } from 'react';

interface PromptInputProps {
  value: string;
  onChange: (val: string) => void;
  tokens: number;
  words: number;
  label: string;
  readOnly?: boolean;
  placeholder?: string;
  headerAction?: React.ReactNode;
}

export default function PromptInput({
  value,
  onChange,
  tokens,
  words,
  label,
  readOnly = false,
  placeholder,
  headerAction,
}: PromptInputProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height =
        Math.max(200, textareaRef.current.scrollHeight) + 'px';
    }
  }, [value]);

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between mb-3">
        <span className="text-sm font-medium text-slate-400 uppercase tracking-widest">
          {label}
        </span>
        <div className="flex items-center gap-4 text-xs text-slate-500">
          <span>
            <span className="text-accent font-mono font-medium text-sm">
              {tokens.toLocaleString()}
            </span>{' '}
            tokens
          </span>
          <span>
            <span className="font-mono font-medium text-sm text-slate-300">
              {words.toLocaleString()}
            </span>{' '}
            words
          </span>
          {headerAction}
        </div>
      </div>
      <textarea
        ref={textareaRef}
        className={`w-full flex-1 bg-surface-800 border border-surface-600 rounded-xl p-4 text-sm leading-relaxed resize-none transition-all duration-200 ${
          readOnly
            ? 'text-slate-300 cursor-default'
            : 'text-slate-200 focus:border-accent/40 focus:ring-1 focus:ring-accent/20'
        }`}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        readOnly={readOnly}
        placeholder={placeholder}
        spellCheck={false}
        style={{ minHeight: '200px' }}
      />
    </div>
  );
}
