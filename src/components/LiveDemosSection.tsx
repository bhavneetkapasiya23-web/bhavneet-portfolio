import React, { useState } from 'react';
import { StockDashboardWidget } from './StockDashboardWidget';
import { AIBuilderDemoWidget } from './AIBuilderDemoWidget';
import { 
  Play, 
  Sparkles, 
  TrendingUp, 
  Sliders, 
  Layers, 
  Laptop, 
  Activity,
  Code2
} from 'lucide-react';

interface LiveDemosSectionProps {
  initialTab?: 'stock' | 'ai-builder';
}

export const LiveDemosSection: React.FC<LiveDemosSectionProps> = ({ initialTab = 'stock' }) => {
  const [activeDemo, setActiveDemo] = useState<'stock' | 'ai-builder'>(initialTab);

  return (
    <section id="demos" className="py-20 bg-[#090d16] relative border-t border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-mono font-medium">
            <Play className="w-3.5 h-3.5 fill-indigo-400" />
            <span>INTERACTIVE BENCHMARK & SIMULATORS</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Try Live <span className="bg-gradient-to-r from-indigo-400 via-purple-300 to-emerald-400 bg-clip-text text-transparent">Project Demos</span>
          </h2>
          <p className="text-slate-400 text-base">
            Interact directly with live simulated modules of Bhavneet's flagship systems right inside the browser.
          </p>
        </div>

        {/* Demo Selector Tabs */}
        <div className="flex items-center justify-center gap-3 mb-10">
          <button
            onClick={() => setActiveDemo('stock')}
            id="demo-tab-stock"
            className={`px-5 py-3 rounded-2xl text-xs sm:text-sm font-bold flex items-center gap-2.5 transition-all cursor-pointer ${
              activeDemo === 'stock'
                ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30 border border-indigo-500'
                : 'bg-slate-900/80 text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            <Activity className="w-4 h-4 text-emerald-400" />
            <span>Real-Time Stock Stream (WebSocket & Recharts)</span>
          </button>

          <button
            onClick={() => setActiveDemo('ai-builder')}
            id="demo-tab-ai-builder"
            className={`px-5 py-3 rounded-2xl text-xs sm:text-sm font-bold flex items-center gap-2.5 transition-all cursor-pointer ${
              activeDemo === 'ai-builder'
                ? 'bg-purple-600 text-white shadow-lg shadow-purple-600/30 border border-purple-500'
                : 'bg-slate-900/80 text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            <Sparkles className="w-4 h-4 text-purple-300" />
            <span>AI Website Builder (OpenRouter & Stripe)</span>
          </button>
        </div>

        {/* Demo Component Container */}
        <div className="max-w-5xl mx-auto">
          {activeDemo === 'stock' ? (
            <div className="animate-in fade-in duration-300">
              <StockDashboardWidget />
            </div>
          ) : (
            <div className="animate-in fade-in duration-300">
              <AIBuilderDemoWidget />
            </div>
          )}
        </div>

      </div>
    </section>
  );
};
