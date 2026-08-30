import React, { useState } from 'react';
import { 
  Sparkles, 
  Code, 
  Eye, 
  CreditCard, 
  RefreshCw, 
  CheckCircle2, 
  Send, 
  Layers, 
  Laptop, 
  Zap,
  Coffee,
  Coins,
  Cpu,
  ArrowRight
} from 'lucide-react';

interface PresetPrompt {
  label: string;
  icon: string;
  prompt: string;
  theme: string;
  generatedHtml: string;
}

const PRESET_PROMPTS: PresetPrompt[] = [
  {
    label: 'Modern AI SaaS Landing',
    icon: 'Cpu',
    prompt: 'Build a high-conversion landing page for an AI code assistant with hero CTA, feature cards, and dark theme.',
    theme: 'Dark Indigo',
    generatedHtml: `
      <div class="p-6 bg-slate-950 text-white rounded-2xl space-y-6 font-sans">
        <div class="flex justify-between items-center border-b border-slate-800 pb-3">
          <div class="font-extrabold text-indigo-400 text-lg">⚡ SynapseAI</div>
          <div class="space-x-2 text-xs font-semibold">
            <button class="px-3 py-1 bg-indigo-600 rounded-lg text-white">Get Started</button>
          </div>
        </div>
        <div class="text-center py-6 space-y-3">
          <span class="px-3 py-1 bg-indigo-500/20 text-indigo-300 text-xs rounded-full border border-indigo-500/30">Next-Gen Code Agent</span>
          <h1 class="text-2xl sm:text-3xl font-extrabold text-white">Ship 10x Faster with Autonomous AI</h1>
          <p class="text-slate-400 text-xs max-w-md mx-auto">AI agent that writes, tests, and deploys full-stack apps from a single prompt.</p>
          <div class="pt-2 flex justify-center gap-2">
            <button class="px-4 py-2 bg-indigo-600 rounded-xl text-xs font-bold text-white shadow-md">Try Free</button>
            <button class="px-4 py-2 bg-slate-800 rounded-xl text-xs font-medium text-slate-300">Live Demo</button>
          </div>
        </div>
        <div class="grid grid-cols-3 gap-2 pt-2 border-t border-slate-800/80 text-center">
          <div class="p-3 bg-slate-900/80 rounded-xl"><div class="font-bold text-indigo-400 text-sm">99.8%</div><div class="text-[10px] text-slate-400">Accuracy</div></div>
          <div class="p-3 bg-slate-900/80 rounded-xl"><div class="font-bold text-purple-400 text-sm">&lt; 150ms</div><div class="text-[10px] text-slate-400">Response</div></div>
          <div class="p-3 bg-slate-900/80 rounded-xl"><div class="font-bold text-emerald-400 text-sm">50K+</div><div class="text-[10px] text-slate-400">Developers</div></div>
        </div>
      </div>
    `
  },
  {
    label: 'Artisan Coffee Roastery',
    icon: 'Coffee',
    prompt: 'Design an elegant storefront for an artisanal organic coffee roaster with daily roasts and ordering.',
    theme: 'Warm Espresso',
    generatedHtml: `
      <div class="p-6 bg-stone-900 text-stone-100 rounded-2xl space-y-6 font-serif">
        <div class="flex justify-between items-center border-b border-stone-800 pb-3 font-sans">
          <div class="font-bold tracking-widest text-amber-400 text-sm">☕ AROMA & OAK ROASTERS</div>
          <div class="text-xs text-stone-400 font-mono">Est. 2024</div>
        </div>
        <div class="text-center py-4 space-y-2">
          <h2 class="text-2xl font-bold text-amber-200">Single-Origin Handcrafted Brews</h2>
          <p class="text-xs text-stone-400 max-w-sm mx-auto font-sans">Ethically sourced high-altitude beans roasted in small batches every morning.</p>
        </div>
        <div class="grid grid-cols-2 gap-3 font-sans">
          <div class="p-3 bg-stone-800/80 border border-stone-700 rounded-xl space-y-1">
            <div class="font-bold text-xs text-amber-300">Ethiopian Yirgacheffe</div>
            <div class="text-[11px] text-stone-400">Floral, Bergamot, Citrus notes</div>
            <div class="font-mono text-xs font-bold text-white pt-1">$18.50 / bag</div>
          </div>
          <div class="p-3 bg-stone-800/80 border border-stone-700 rounded-xl space-y-1">
            <div class="font-bold text-xs text-amber-300">Guatemala Antigua</div>
            <div class="text-[11px] text-stone-400">Dark Chocolate, Caramel, Nutty</div>
            <div class="font-mono text-xs font-bold text-white pt-1">$17.00 / bag</div>
          </div>
        </div>
        <button class="w-full py-2.5 bg-amber-600 hover:bg-amber-500 font-sans text-white text-xs font-bold rounded-xl shadow-lg">Order Fresh Roast</button>
      </div>
    `
  },
  {
    label: 'Crypto Staking Dashboard',
    icon: 'Coins',
    prompt: 'Create a decentralized crypto staking portal with APY visualizer and wallet connect simulation.',
    theme: 'Neon Cyber',
    generatedHtml: `
      <div class="p-6 bg-[#0a0f1d] text-cyan-50 rounded-2xl space-y-6 font-sans">
        <div class="flex justify-between items-center border-b border-slate-800 pb-3">
          <div class="font-bold text-cyan-400 flex items-center gap-1 text-sm font-mono">💠 NOVA PROTOCOL</div>
          <div class="px-2.5 py-1 bg-cyan-500/20 border border-cyan-500/40 text-cyan-300 text-[10px] font-mono rounded-lg">Connected: 0x8F...39A</div>
        </div>
        <div class="grid grid-cols-2 gap-3">
          <div class="p-4 bg-slate-900 border border-slate-800 rounded-xl">
            <div class="text-[10px] text-slate-400 font-mono">TOTAL VALUE LOCKED</div>
            <div class="text-xl font-bold font-mono text-cyan-300 mt-1">$42,890,120</div>
            <div class="text-[10px] text-emerald-400 mt-1">+14.2% this epoch</div>
          </div>
          <div class="p-4 bg-slate-900 border border-slate-800 rounded-xl">
            <div class="text-[10px] text-slate-400 font-mono">ESTIMATED APY</div>
            <div class="text-xl font-bold font-mono text-purple-400 mt-1">18.4% APY</div>
            <div class="text-[10px] text-slate-400 mt-1">Auto-compounding</div>
          </div>
        </div>
        <div class="p-4 bg-slate-900/90 border border-cyan-500/30 rounded-xl space-y-2">
          <div class="flex justify-between text-xs font-mono"><span>Staked Amount</span><span class="text-cyan-300 font-bold">14.50 ETH (~$46,400)</span></div>
          <div class="w-full bg-slate-800 h-2 rounded-full overflow-hidden"><div class="bg-cyan-400 h-full w-3/4"></div></div>
          <button class="w-full mt-2 py-2 bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 font-bold text-xs rounded-lg">Claim Rewards (0.42 ETH)</button>
        </div>
      </div>
    `
  }
];

export const AIBuilderDemoWidget: React.FC = () => {
  const [selectedPreset, setSelectedPreset] = useState<PresetPrompt>(PRESET_PROMPTS[0]);
  const [customPrompt, setCustomPrompt] = useState<string>(PRESET_PROMPTS[0].prompt);
  const [isGenerating, setIsGenerating] = useState(false);
  const [activeTab, setActiveTab] = useState<'preview' | 'code'>('preview');
  const [credits, setCredits] = useState(48);
  const [currentHtml, setCurrentHtml] = useState(PRESET_PROMPTS[0].generatedHtml);
  const [generationStep, setGenerationStep] = useState('');

  const handleGenerate = (promptText: string, preset?: PresetPrompt) => {
    if (isGenerating || credits <= 0) return;

    setIsGenerating(true);
    setCredits(prev => Math.max(0, prev - 1));
    setGenerationStep('Connecting OpenRouter API & analyzing prompt...');

    const targetHtml = preset ? preset.generatedHtml : `
      <div class="p-6 bg-slate-950 text-slate-100 rounded-2xl space-y-4 font-sans border border-indigo-500/30">
        <div class="flex justify-between items-center border-b border-slate-800 pb-2">
          <span class="text-xs font-bold text-indigo-400">✨ Custom Generated App</span>
          <span class="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded">Verified Output</span>
        </div>
        <h2 class="text-xl font-bold text-white">Generated: "${promptText.slice(0, 45)}..."</h2>
        <p class="text-xs text-slate-400 leading-relaxed">Synthesized full-stack component with responsive layout, semantic styling, and clean token usage.</p>
        <div class="p-3 bg-slate-900 rounded-xl text-xs font-mono text-indigo-300">
          Status: Deployed to Vercel production edge runtime.
        </div>
      </div>
    `;

    setTimeout(() => {
      setGenerationStep('Synthesizing Tailwind layout & HTML DOM tree...');
    }, 600);

    setTimeout(() => {
      setGenerationStep('Applying responsive breakpoints & interactions...');
    }, 1100);

    setTimeout(() => {
      setCurrentHtml(targetHtml);
      setIsGenerating(false);
      setGenerationStep('');
    }, 1600);
  };

  return (
    <div className="bg-[#0b0f19] border border-slate-800 rounded-3xl p-6 shadow-2xl space-y-6">
      
      {/* Header & Credits Status */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-purple-400">
              Interactive System Simulator
            </span>
            <div className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-300 text-[11px] font-mono">
              <Sparkles className="w-3 h-3 text-purple-400" />
              <span>OpenRouter & Stripe Integration</span>
            </div>
          </div>
          <h3 className="text-xl font-bold text-white mt-1 flex items-center gap-2">
            <span>AI Website Builder</span>
            <span className="text-xs font-normal text-slate-400 font-mono">by Bhavneet</span>
          </h3>
        </div>

        {/* Credits Badge & External Live Link */}
        <div className="flex flex-wrap items-center gap-3">
          <a
            href="https://ai-site-builder-2tq6.vercel.app/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold shadow-md shadow-purple-600/30 transition-all cursor-pointer"
          >
            <span>Visit Live Website</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </a>

          <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800">
            <CreditCard className="w-3.5 h-3.5 text-indigo-400" />
            <div className="text-xs font-mono">
              <span className="text-slate-400">Credits: </span>
              <span className="text-indigo-300 font-bold">{credits} / 50</span>
            </div>
          </div>
          <button
            onClick={() => setCredits(50)}
            className="text-[11px] font-mono text-slate-400 hover:text-white underline cursor-pointer"
          >
            Refill
          </button>
        </div>
      </div>

      {/* Preset Prompts Selection */}
      <div className="space-y-2">
        <label className="text-xs font-mono text-slate-400 block">Pick a preset prompt or customize:</label>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
          {PRESET_PROMPTS.map((preset) => {
            const isSelected = selectedPreset.label === preset.label;
            return (
              <button
                key={preset.label}
                onClick={() => {
                  setSelectedPreset(preset);
                  setCustomPrompt(preset.prompt);
                  handleGenerate(preset.prompt, preset);
                }}
                className={`p-3 rounded-xl text-left border transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-purple-950/40 border-purple-500/50 text-white'
                    : 'bg-slate-900/60 border-slate-800 text-slate-300 hover:border-slate-700'
                }`}
              >
                <div className="text-xs font-bold text-purple-300 flex items-center gap-1.5">
                  <Sparkles className="w-3 h-3" />
                  <span>{preset.label}</span>
                </div>
                <p className="text-[11px] text-slate-400 line-clamp-1 mt-1 font-mono">
                  {preset.prompt}
                </p>
              </button>
            );
          })}
        </div>
      </div>

      {/* Input Prompt Box */}
      <div className="relative">
        <input
          type="text"
          value={customPrompt}
          onChange={(e) => setCustomPrompt(e.target.value)}
          placeholder="Describe any website (e.g. 'Fitness workout tracker with timer')..."
          className="w-full pl-4 pr-32 py-3 bg-slate-900 border border-slate-800 rounded-2xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-purple-500"
        />
        <button
          onClick={() => handleGenerate(customPrompt)}
          disabled={isGenerating}
          className="absolute right-1.5 top-1.5 bottom-1.5 px-4 rounded-xl bg-purple-600 hover:bg-purple-500 disabled:opacity-50 text-white font-bold text-xs flex items-center gap-1.5 shadow-md transition-all cursor-pointer"
        >
          {isGenerating ? (
            <>
              <RefreshCw className="w-3.5 h-3.5 animate-spin" />
              <span>Generating...</span>
            </>
          ) : (
            <>
              <Sparkles className="w-3.5 h-3.5" />
              <span>Generate (1 Credit)</span>
            </>
          )}
        </button>
      </div>

      {/* Generation Status Indicator */}
      {isGenerating && (
        <div className="p-3 bg-purple-950/30 border border-purple-800/40 rounded-xl flex items-center gap-3 animate-pulse text-xs font-mono text-purple-300">
          <RefreshCw className="w-4 h-4 animate-spin text-purple-400" />
          <span>{generationStep}</span>
        </div>
      )}

      {/* Preview / Code Tabs */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-2xl overflow-hidden">
        <div className="flex items-center justify-between px-4 py-2.5 bg-slate-950/80 border-b border-slate-800">
          <div className="flex items-center gap-1">
            <button
              onClick={() => setActiveTab('preview')}
              className={`px-3 py-1 rounded-lg text-xs font-medium flex items-center gap-1.5 cursor-pointer ${
                activeTab === 'preview' ? 'bg-purple-600/30 text-purple-300 border border-purple-500/40' : 'text-slate-400 hover:text-white'
              }`}
            >
              <Eye className="w-3.5 h-3.5" />
              <span>Live Generated Preview</span>
            </button>
            <button
              onClick={() => setActiveTab('code')}
              className={`px-3 py-1 rounded-lg text-xs font-medium flex items-center gap-1.5 cursor-pointer ${
                activeTab === 'code' ? 'bg-purple-600/30 text-purple-300 border border-purple-500/40' : 'text-slate-400 hover:text-white'
              }`}
            >
              <Code className="w-3.5 h-3.5" />
              <span>Tailwind HTML Source</span>
            </button>
          </div>

          <span className="text-[11px] font-mono text-slate-500">React + Express + Neon PostgreSQL Engine</span>
        </div>

        {/* Tab Content */}
        <div className="p-4">
          {activeTab === 'preview' ? (
            <div 
              className="w-full rounded-xl overflow-hidden"
              dangerouslySetInnerHTML={{ __html: currentHtml }}
            />
          ) : (
            <pre className="p-4 bg-slate-950 rounded-xl text-xs font-mono text-emerald-400 overflow-x-auto max-h-72">
              <code>{currentHtml.trim()}</code>
            </pre>
          )}
        </div>
      </div>

    </div>
  );
};
