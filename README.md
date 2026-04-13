# TokenSlim — AI Prompt Optimizer

Reduce your LLM API costs by compressing prompts with AI. Count tokens and get optimized prompts instantly — for free.

![Next.js](https://img.shields.io/badge/Next.js-14-black)
![Vercel](https://img.shields.io/badge/Deploy-Vercel-black)
![License](https://img.shields.io/badge/License-MIT-green)

## Features

- **Live token counting** — Instant cl100k_base token counts as you type
- **3 optimization levels** — Light, Medium, Aggressive compression
- **Side-by-side comparison** — See original vs optimized with diff stats
- **Cost estimator** — Savings per 1,000 calls across GPT-4o, Claude, Gemini, Llama
- **One-click copy** — Copy optimized prompt to clipboard
- **Zero cost** — Groq free tier + Vercel free tier

## Tech Stack

- **Framework:** Next.js 14 (App Router)
- **LLM:** Groq API (Llama 3.3 70B — free tier)
- **Token Counting:** js-tiktoken (cl100k_base)
- **Styling:** Tailwind CSS
- **Hosting:** Vercel (serverless)

## Quick Start

### 1. Clone the repo

```bash
git clone https://github.com/YOUR_USERNAME/tokenslim.git
cd tokenslim
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set up environment

```bash
cp .env.example .env.local
```

Edit `.env.local` and add your Groq API key:

```
GROQ_API_KEY=gsk_your_key_here
```

Get a free key at [console.groq.com](https://console.groq.com)

### 4. Run locally

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## Deploy to Vercel

### Option A: One-click deploy

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/YOUR_USERNAME/tokenslim&env=GROQ_API_KEY&envDescription=Get%20a%20free%20Groq%20API%20key%20at%20console.groq.com)

### Option B: GitHub integration (recommended)

1. Push this repo to GitHub
2. Go to [vercel.com/new](https://vercel.com/new)
3. Import your GitHub repository
4. Add environment variable: `GROQ_API_KEY` = your Groq key
5. Click Deploy

Every push to `main` will auto-deploy.

## Project Structure

```
tokenslim/
├── app/
│   ├── api/
│   │   ├── count/route.ts       # Token counting endpoint
│   │   └── optimize/route.ts    # Prompt optimization endpoint
│   ├── globals.css              # Tailwind + custom styles
│   ├── layout.tsx               # Root layout
│   └── page.tsx                 # Main app page
├── components/
│   ├── CostEstimator.tsx        # Pricing breakdown table
│   ├── OptimizationLevel.tsx    # Light/Medium/Aggressive selector
│   ├── PromptInput.tsx          # Textarea with live token count
│   └── ResultsPanel.tsx         # Side-by-side comparison
├── lib/
│   ├── groq.ts                  # Groq API client
│   ├── pricing.ts               # Model pricing constants
│   └── tokenizer.ts             # js-tiktoken wrapper
├── .env.example
├── package.json
├── tailwind.config.js
└── tsconfig.json
```

## Environment Variables

| Variable       | Required | Description                          |
| -------------- | -------- | ------------------------------------ |
| `GROQ_API_KEY` | Yes      | Free API key from console.groq.com   |

## License

MIT
