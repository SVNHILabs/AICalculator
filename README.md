# FruKal — AI Prompt Optimizer & Token Calculator

Reduce your LLM API costs by compressing prompts with AI. Count tokens and get savings across 25+ models from 9 providers — free.

## Features

- **Live token counting** — Instant cl100k_base token counts as you type
- **3 optimization levels** — Light, Medium, Aggressive compression
- **Side-by-side comparison** — See original vs optimized with diff stats
- **25+ models, 9 providers** — OpenAI, Anthropic, Google, DeepSeek, Mistral, xAI, Meta, Cohere, Alibaba
- **Cost estimator** — Savings per 1,000 calls with April 2026 pricing
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
git clone https://github.com/SVNHILabs/AICalculator.git
cd AICalculator
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

1. Push this repo to GitHub
2. Go to [vercel.com/new](https://vercel.com/new)
3. Import your GitHub repository
4. Add environment variable: `GROQ_API_KEY` = your Groq key
5. Click Deploy

Every push to `main` will auto-deploy.

## Updating Pricing

Model pricing is centralized in `lib/pricing.ts`. To update:

1. Edit the `PRICING_VERSION` string (e.g., `'2026-05'`)
2. Update individual model prices in the `MODEL_PRICING` object
3. Add or remove models as needed
4. Push to `main` — Vercel auto-deploys

## Project Structure

```
├── app/
│   ├── api/
│   │   ├── count/route.ts       # Token counting endpoint
│   │   └── optimize/route.ts    # Prompt optimization endpoint
│   ├── globals.css              # Tailwind + custom styles
│   ├── layout.tsx               # Root layout
│   └── page.tsx                 # Main app page
├── components/
│   ├── CostEstimator.tsx        # Pricing table grouped by provider
│   ├── OptimizationLevel.tsx    # Light/Medium/Aggressive selector
│   ├── PromptInput.tsx          # Textarea with live token count
│   └── ResultsPanel.tsx         # Side-by-side comparison
├── lib/
│   ├── groq.ts                  # Groq API client
│   ├── pricing.ts               # Model pricing (25+ models, 9 providers)
│   └── tokenizer.ts             # js-tiktoken wrapper
```

## License

MIT
