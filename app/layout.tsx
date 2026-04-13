import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'TokenSlim — AI Prompt Optimizer',
  description:
    'Reduce your LLM API costs by compressing prompts. Count tokens and optimize prompts with AI — free.',
  keywords: ['token counter', 'prompt optimizer', 'LLM', 'API costs', 'GPT', 'Claude'],
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
