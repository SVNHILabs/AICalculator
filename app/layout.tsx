import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'FruKal — AI Prompt Optimizer & Token Calculator',
  description:
    'Reduce your LLM API costs by compressing prompts. Count tokens and optimize prompts across 25+ models — free.',
  keywords: ['token counter', 'prompt optimizer', 'LLM', 'API costs', 'GPT', 'Claude', 'Gemini', 'DeepSeek'],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen">{children}</body>
    </html>
  );
}
