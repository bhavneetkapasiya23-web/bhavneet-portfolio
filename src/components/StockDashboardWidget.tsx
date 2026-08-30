import React, { useState, useEffect, useRef } from 'react';
import { 
  Activity, 
  TrendingUp, 
  TrendingDown, 
  RefreshCw, 
  Wifi, 
  WifiOff, 
  DollarSign, 
  Zap, 
  Clock, 
  Sliders,
  CheckCircle2,
  ChevronRight,
  Maximize2
} from 'lucide-react';

interface StockDataPoint {
  time: string;
  price: number;
  volume: number;
}

const STOCK_LIST = [
  { symbol: 'NVDA', name: 'NVIDIA Corp', basePrice: 128.50, volatility: 0.8 },
  { symbol: 'AAPL', name: 'Apple Inc.', basePrice: 224.20, volatility: 0.4 },
  { symbol: 'TSLA', name: 'Tesla Inc.', basePrice: 215.80, volatility: 1.2 },
  { symbol: 'MSFT', name: 'Microsoft Corp', basePrice: 418.10, volatility: 0.5 },
];

export const StockDashboardWidget: React.FC = () => {
  const [selectedStock, setSelectedStock] = useState(STOCK_LIST[0]);
  const [priceHistory, setPriceHistory] = useState<StockDataPoint[]>([]);
  const [currentPrice, setCurrentPrice] = useState(STOCK_LIST[0].basePrice);
  const [change24h, setChange24h] = useState(2.45);
  const [isConnected, setIsConnected] = useState(true);
  const [updateIntervalMs, setUpdateIntervalMs] = useState(1000);
  const [tradeLogs, setTradeLogs] = useState<{ id: string; type: 'BUY' | 'SELL'; price: number; time: string; qty: number }[]>([]);
  const [portfolioBalance, setPortfolioBalance] = useState(10000);
  const [holdingShares, setHoldingShares] = useState(15);
  const [latency, setLatency] = useState(18);

  // Initialize history when stock changes
  useEffect(() => {
    let price = selectedStock.basePrice;
    const initialHistory: StockDataPoint[] = [];
    const now = Date.now();

    for (let i = 20; i >= 0; i--) {
      const delta = (Math.random() - 0.48) * selectedStock.volatility;
      price = Math.max(10, +(price + delta).toFixed(2));
      const t = new Date(now - i * 2000);
      initialHistory.push({
        time: t.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
        price: price,
        volume: Math.floor(Math.random() * 800) + 200
      });
    }

    setPriceHistory(initialHistory);
    setCurrentPrice(price);
    setChange24h(+((price - selectedStock.basePrice) / selectedStock.basePrice * 100).toFixed(2));
  }, [selectedStock]);

  // Live WebSocket Simulation Stream
  useEffect(() => {
    if (!isConnected) return;

    const interval = setInterval(() => {
      const delta = (Math.random() - 0.48) * selectedStock.volatility;
      setCurrentPrice((prev) => {
        const nextPrice = Math.max(10, +(prev + delta).toFixed(2));
        const now = new Date();
        const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });

        setPriceHistory((prevHist) => {
          const nextHist = [...prevHist, {
            time: timeStr,
            price: nextPrice,
            volume: Math.floor(Math.random() * 1200) + 100
          }];
          if (nextHist.length > 25) nextHist.shift();
          return nextHist;
        });

        setChange24h(+((nextPrice - selectedStock.basePrice) / selectedStock.basePrice * 100).toFixed(2));
        setLatency(Math.floor(Math.random() * 12) + 12);
        return nextPrice;
      });
    }, updateIntervalMs);

    return () => clearInterval(interval);
  }, [isConnected, selectedStock, updateIntervalMs]);

  const handleBuy = () => {
    if (portfolioBalance < currentPrice) return;
    setPortfolioBalance(prev => +(prev - currentPrice).toFixed(2));
    setHoldingShares(prev => prev + 1);
    setTradeLogs(prev => [
      {
        id: Math.random().toString(36).substring(7),
        type: 'BUY',
        price: currentPrice,
        time: new Date().toLocaleTimeString(),
        qty: 1
      },
      ...prev.slice(0, 5)
    ]);
  };

  const handleSell = () => {
    if (holdingShares <= 0) return;
    setPortfolioBalance(prev => +(prev + currentPrice).toFixed(2));
    setHoldingShares(prev => prev - 1);
    setTradeLogs(prev => [
      {
        id: Math.random().toString(36).substring(7),
        type: 'SELL',
        price: currentPrice,
        time: new Date().toLocaleTimeString(),
        qty: 1
      },
      ...prev.slice(0, 5)
    ]);
  };

  // SVG Chart Calculations
  const minPrice = Math.min(...priceHistory.map(p => p.price), currentPrice) * 0.998;
  const maxPrice = Math.max(...priceHistory.map(p => p.price), currentPrice) * 1.002;
  const range = maxPrice - minPrice || 1;
  const svgWidth = 600;
  const svgHeight = 180;

  const points = priceHistory.map((pt, idx) => {
    const x = (idx / Math.max(1, priceHistory.length - 1)) * svgWidth;
    const y = svgHeight - ((pt.price - minPrice) / range) * (svgHeight - 20) - 10;
    return `${x},${y}`;
  }).join(' ');

  const areaPoints = points ? `${points} ${svgWidth},${svgHeight} 0,${svgHeight}` : '';
  const isPositive = change24h >= 0;

  return (
    <div className="bg-[#0b0f19] border border-slate-800 rounded-3xl p-6 shadow-2xl space-y-6">
      
      {/* Header / Stream status */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-indigo-400">
              Live WebSocket Stream Demo
            </span>
            <div className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-[11px] font-mono">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
              <span>WS Connected ({latency}ms)</span>
            </div>
          </div>
          <h3 className="text-xl font-bold text-white mt-1 flex items-center gap-2">
            <span>Real-Time Stock Dashboard</span>
            <span className="text-xs font-normal text-slate-400 font-mono">by Bhavneet</span>
          </h3>
        </div>

        {/* Controls */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsConnected(!isConnected)}
            className={`px-3 py-1.5 rounded-xl text-xs font-medium border transition-colors flex items-center gap-1.5 cursor-pointer ${
              isConnected 
                ? 'bg-slate-800 text-slate-200 border-slate-700 hover:bg-slate-700' 
                : 'bg-rose-950/40 text-rose-300 border-rose-800'
            }`}
          >
            {isConnected ? <Wifi className="w-3.5 h-3.5 text-emerald-400" /> : <WifiOff className="w-3.5 h-3.5 text-rose-400" />}
            <span>{isConnected ? 'Stream Active' : 'Stream Paused'}</span>
          </button>

          <select
            value={updateIntervalMs}
            onChange={(e) => setUpdateIntervalMs(Number(e.target.value))}
            className="bg-slate-800 text-slate-300 text-xs px-2.5 py-1.5 rounded-xl border border-slate-700 focus:outline-none"
          >
            <option value={500}>500ms (High Freq)</option>
            <option value={1000}>1000ms (1s)</option>
            <option value={2000}>2000ms (2s)</option>
          </select>
        </div>
      </div>

      {/* Stock Tickers Selection Bar */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
        {STOCK_LIST.map((stock) => {
          const isSelected = selectedStock.symbol === stock.symbol;
          return (
            <button
              key={stock.symbol}
              onClick={() => setSelectedStock(stock)}
              className={`p-3 rounded-2xl border text-left transition-all cursor-pointer ${
                isSelected 
                  ? 'bg-indigo-950/40 border-indigo-500/50 shadow-md shadow-indigo-500/10' 
                  : 'bg-slate-900/60 border-slate-800/80 hover:border-slate-700'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="font-bold text-sm text-white font-mono">{stock.symbol}</span>
                <span className="text-[10px] text-slate-400">{stock.name.split(' ')[0]}</span>
              </div>
              <p className="text-xs font-mono font-semibold text-slate-300 mt-1">
                ${stock.basePrice.toFixed(2)}
              </p>
            </button>
          );
        })}
      </div>

      {/* Main Chart Card */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 space-y-4">
        
        {/* Price & Change Banner */}
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <div className="text-xs text-slate-400 font-mono">{selectedStock.name} ({selectedStock.symbol})</div>
            <div className="text-3xl font-extrabold text-white font-mono tracking-tight flex items-baseline gap-3 mt-0.5">
              ${currentPrice.toFixed(2)}
              <span className={`text-sm font-semibold flex items-center font-mono ${isPositive ? 'text-emerald-400' : 'text-rose-400'}`}>
                {isPositive ? <TrendingUp className="w-4 h-4 mr-0.5" /> : <TrendingDown className="w-4 h-4 mr-0.5" />}
                {isPositive ? '+' : ''}{change24h}%
              </span>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="flex items-center gap-4 text-xs font-mono text-slate-400">
            <div>
              <span className="text-slate-500 block text-[10px]">24H HIGH</span>
              <span className="text-slate-200 font-semibold">${(maxPrice * 0.999).toFixed(2)}</span>
            </div>
            <div>
              <span className="text-slate-500 block text-[10px]">24H LOW</span>
              <span className="text-slate-200 font-semibold">${(minPrice * 1.001).toFixed(2)}</span>
            </div>
            <div>
              <span className="text-slate-500 block text-[10px]">VOLUME</span>
              <span className="text-slate-200 font-semibold">14.2M</span>
            </div>
          </div>
        </div>

        {/* SVG Interactive Wave Graph */}
        <div className="relative w-full h-[180px] bg-slate-950/60 rounded-xl overflow-hidden border border-slate-800/80 p-2">
          
          {/* Grid lines */}
          <div className="absolute inset-0 flex flex-col justify-between pointer-events-none p-2 opacity-15">
            <div className="border-b border-slate-400 border-dashed w-full" />
            <div className="border-b border-slate-400 border-dashed w-full" />
            <div className="border-b border-slate-400 border-dashed w-full" />
          </div>

          <svg 
            viewBox={`0 0 ${svgWidth} ${svgHeight}`} 
            className="w-full h-full preserve-3d"
            preserveAspectRatio="none"
          >
            <defs>
              <linearGradient id="stockGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={isPositive ? '#10b981' : '#f43f5e'} stopOpacity="0.35" />
                <stop offset="100%" stopColor={isPositive ? '#10b981' : '#f43f5e'} stopOpacity="0.0" />
              </linearGradient>
            </defs>

            {areaPoints && (
              <polygon
                points={areaPoints}
                fill="url(#stockGradient)"
              />
            )}

            {points && (
              <polyline
                fill="none"
                stroke={isPositive ? '#10b981' : '#f43f5e'}
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                points={points}
              />
            )}
          </svg>

          {/* Real-time Ticker Timestamp */}
          <div className="absolute bottom-2 right-3 text-[10px] font-mono text-slate-500 bg-slate-900/80 px-2 py-0.5 rounded border border-slate-800">
            Feed: Live Tick ({priceHistory[priceHistory.length - 1]?.time || 'Now'})
          </div>
        </div>

      </div>

      {/* Trading Simulation & Account Panel */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        
        {/* Account Balance & Action */}
        <div className="bg-slate-900/60 border border-slate-800/80 rounded-2xl p-4 space-y-3">
          <div className="flex items-center justify-between text-xs">
            <span className="text-slate-400 font-mono">Demo Paper Portfolio</span>
            <span className="text-emerald-400 font-mono font-bold">${portfolioBalance.toFixed(2)} USD</span>
          </div>

          <div className="flex items-center justify-between text-xs pb-1">
            <span className="text-slate-400 font-mono">Holding {selectedStock.symbol}:</span>
            <span className="text-indigo-300 font-mono font-bold">{holdingShares} Shares (~${(holdingShares * currentPrice).toFixed(2)})</span>
          </div>

          <div className="grid grid-cols-2 gap-2 pt-1">
            <button
              onClick={handleBuy}
              className="w-full py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-md shadow-emerald-600/20 transition-all cursor-pointer flex items-center justify-center gap-1.5"
            >
              <TrendingUp className="w-3.5 h-3.5" />
              <span>Buy 1 Share (${currentPrice.toFixed(2)})</span>
            </button>
            <button
              onClick={handleSell}
              disabled={holdingShares <= 0}
              className="w-full py-2.5 rounded-xl bg-rose-600 hover:bg-rose-500 disabled:opacity-40 disabled:hover:bg-rose-600 text-white font-bold text-xs shadow-md shadow-rose-600/20 transition-all cursor-pointer flex items-center justify-center gap-1.5"
            >
              <TrendingDown className="w-3.5 h-3.5" />
              <span>Sell 1 Share</span>
            </button>
          </div>
        </div>

        {/* Live Order Execution Ticker */}
        <div className="bg-slate-900/60 border border-slate-800/80 rounded-2xl p-4 space-y-2">
          <div className="flex items-center justify-between text-xs">
            <span className="text-slate-400 font-mono">Order Book Stream</span>
            <span className="text-[10px] text-slate-500 font-mono">Recent Actions</span>
          </div>

          <div className="space-y-1.5 max-h-[85px] overflow-y-auto">
            {tradeLogs.length === 0 ? (
              <p className="text-[11px] text-slate-500 font-mono italic pt-2 text-center">
                Click "Buy" or "Sell" to simulate instant client order routing.
              </p>
            ) : (
              tradeLogs.map(log => (
                <div key={log.id} className="flex items-center justify-between text-[11px] font-mono bg-slate-950/60 px-2.5 py-1 rounded border border-slate-800/60">
                  <span className={log.type === 'BUY' ? 'text-emerald-400 font-bold' : 'text-rose-400 font-bold'}>
                    {log.type} {log.qty} {selectedStock.symbol}
                  </span>
                  <span className="text-slate-300">${log.price.toFixed(2)}</span>
                  <span className="text-slate-500 text-[10px]">{log.time}</span>
                </div>
              ))
            )}
          </div>
        </div>

      </div>

    </div>
  );
};
