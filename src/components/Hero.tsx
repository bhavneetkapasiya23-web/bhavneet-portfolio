import React, { useState } from 'react';
import { personalInfo, stats } from '../data/portfolioData';
import { 
  Github, 
  Mail, 
  Phone, 
  MapPin, 
  ArrowRight, 
  FileText, 
  Sparkles, 
  Copy, 
  Check, 
  Code2, 
  Layers, 
  Terminal, 
  ExternalLink,
  ChevronDown
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface HeroProps {
  onOpenResume: () => void;
  onOpenChat: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenResume, onOpenChat }) => {
  const [copiedEmail, setCopiedEmail] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(personalInfo.email);
    setCopiedEmail(true);
    confetti({
      particleCount: 30,
      spread: 50,
      origin: { y: 0.8 },
      colors: ['#6366f1', '#a855f7', '#38bdf8']
    });
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  return (
    <section id="home" className="relative pt-28 pb-20 md:pt-36 md:pb-28 overflow-hidden bg-grid-pattern">
      {/* Ambient background glow orbs */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[350px] bg-indigo-600/15 blur-[120px] rounded-full pointer-events-none -z-10" />
      <div className="absolute top-1/3 right-10 w-[350px] h-[300px] bg-purple-600/10 blur-[100px] rounded-full pointer-events-none -z-10" />
      <div className="absolute bottom-10 left-10 w-[300px] h-[250px] bg-blue-600/10 blur-[90px] rounded-full pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Text & Intro */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            
            {/* Live Availability Status Pill */}
            <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-slate-900/90 border border-slate-800 shadow-inner backdrop-blur-md">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
              </span>
              <span className="text-xs font-medium text-slate-300">
                Open to <span className="text-emerald-400 font-semibold">Software Engineer</span> & <span className="text-indigo-400 font-semibold">AI Roles</span>
              </span>
            </div>

            {/* Main Headline */}
            <div className="space-y-2">
              <p className="text-sm font-mono tracking-wider text-indigo-400 uppercase font-semibold">
                Hello, world! I am
              </p>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight">
                {personalInfo.name}{' '}
                <span className="bg-gradient-to-r from-indigo-400 via-purple-300 to-sky-400 bg-clip-text text-transparent">
                  Kapasiya
                </span>
              </h1>
              <p className="text-lg sm:text-xl font-semibold text-slate-300">
                Software Engineer <span className="text-indigo-400">•</span> Full-Stack Developer <span className="text-purple-400">•</span> AI Integrations
              </p>
            </div>

            {/* Bio Description */}
            <p className="text-slate-400 text-base sm:text-lg max-w-2xl leading-relaxed mx-auto lg:mx-0">
              Computer Science undergraduate specializing in <span className="text-slate-200 font-medium">Artificial Intelligence</span> with hands-on experience designing, developing, and deploying full-stack web applications, real-time WebSocket streams, and LLM-powered software solutions.
            </p>

            {/* Key Contact & Location Badges */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 text-xs text-slate-400 font-mono pt-1">
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-slate-900/60 border border-slate-800/80">
                <MapPin className="w-3.5 h-3.5 text-rose-400" />
                <span>{personalInfo.location}</span>
              </div>
              <button 
                onClick={handleCopyEmail}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-slate-900/60 border border-slate-800/80 hover:border-indigo-500/50 hover:text-indigo-300 transition-all cursor-pointer"
                title="Click to copy email address"
              >
                <Mail className="w-3.5 h-3.5 text-indigo-400" />
                <span>{personalInfo.email}</span>
                {copiedEmail ? <Check className="w-3 h-3 text-emerald-400 ml-0.5" /> : <Copy className="w-3 h-3 text-slate-500 ml-0.5" />}
              </button>
              <a 
                href={`tel:${personalInfo.phone.replace(/\s+/g, '')}`}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-slate-900/60 border border-slate-800/80 hover:border-emerald-500/50 hover:text-emerald-300 transition-all"
              >
                <Phone className="w-3.5 h-3.5 text-emerald-400" />
                <span>{personalInfo.phone}</span>
              </a>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 pt-2">
              <a
                href="#projects"
                id="hero-view-projects-btn"
                className="flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm bg-gradient-to-r from-indigo-500 via-indigo-600 to-purple-600 text-white shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/40 hover:scale-[1.02] active:scale-[0.98] transition-all"
              >
                <span>View Featured Projects</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              <button
                onClick={onOpenResume}
                id="hero-view-resume-btn"
                className="flex items-center gap-2 px-5 py-3 rounded-xl font-medium text-sm bg-slate-900 text-slate-200 border border-slate-700/80 hover:bg-slate-800 hover:text-white hover:border-slate-600 transition-all cursor-pointer"
              >
                <FileText className="w-4 h-4 text-indigo-400" />
                <span>Interactive Resume</span>
              </button>

              <button
                onClick={onOpenChat}
                id="hero-ai-chat-btn"
                className="flex items-center gap-2 px-4 py-3 rounded-xl font-medium text-sm bg-purple-950/40 text-purple-300 border border-purple-800/50 hover:bg-purple-900/50 hover:text-white transition-all cursor-pointer"
              >
                <Sparkles className="w-4 h-4 text-purple-400" />
                <span>Ask AI About Me</span>
              </button>
            </div>

            {/* Social Links Row */}
            <div className="flex items-center justify-center lg:justify-start gap-4 pt-3 text-slate-400">
              <span className="text-xs font-mono text-slate-500">Connect:</span>
              <a 
                href={personalInfo.github} 
                target="_blank" 
                rel="noreferrer"
                id="hero-github-link"
                className="flex items-center gap-1.5 text-xs text-slate-300 hover:text-white transition-colors bg-slate-900/80 px-3 py-1.5 rounded-lg border border-slate-800 hover:border-slate-700"
              >
                <Github className="w-4 h-4" />
                <span>GitHub ({personalInfo.githubUsername})</span>
              </a>
              <a 
                href="mailto:bhavneetkapasiya23@gmail.com"
                id="hero-mail-link"
                className="flex items-center gap-1.5 text-xs text-slate-300 hover:text-white transition-colors bg-slate-900/80 px-3 py-1.5 rounded-lg border border-slate-800 hover:border-slate-700"
              >
                <Mail className="w-4 h-4 text-indigo-400" />
                <span>Send Email</span>
              </a>
            </div>

          </div>

          {/* Right Column: Profile Image & Interactive Card */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-full max-w-md">
              
              {/* Glowing gradient background rings */}
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-tr from-indigo-500/20 via-purple-500/20 to-sky-500/20 blur-xl -z-10" />
              
              {/* Card Container */}
              <div className="relative bg-[#0c101d]/90 border border-slate-800 rounded-3xl p-5 shadow-2xl backdrop-blur-xl space-y-4">
                
                {/* Profile Photo with Styled Frame */}
                <div className="relative aspect-square w-full rounded-2xl overflow-hidden border border-slate-700/60 shadow-inner group">
                  <img 
                    src={personalInfo.avatar} 
                    alt={personalInfo.fullName}
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0c101d] via-transparent to-transparent opacity-60" />
                  
                  {/* Floating badge inside photo */}
                  <div className="absolute bottom-3 left-3 right-3 bg-slate-900/90 backdrop-blur-md border border-slate-700/60 rounded-xl p-2.5 flex items-center justify-between">
                    <div>
                      <p className="text-xs font-bold text-white">Bhavneet Kapasiya</p>
                      <p className="text-[11px] text-indigo-300 font-mono">B.Tech CSE (AI) • 2023–Present</p>
                    </div>
                    <div className="px-2 py-1 rounded-md bg-indigo-500/20 border border-indigo-500/40 text-[10px] font-mono text-indigo-300 font-semibold">
                      MIET Meerut
                    </div>
                  </div>
                </div>

                {/* Tech Highlights Grid */}
                <div className="grid grid-cols-2 gap-2 pt-1">
                  <div className="bg-slate-900/70 border border-slate-800/80 rounded-xl p-3 flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-lg bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400">
                      <Code2 className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="text-[11px] text-slate-400 font-mono">Frontend & State</p>
                      <p className="text-xs font-bold text-slate-200">React • TS • Tailwind</p>
                    </div>
                  </div>

                  <div className="bg-slate-900/70 border border-slate-800/80 rounded-xl p-3 flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-lg bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400">
                      <Layers className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="text-[11px] text-slate-400 font-mono">Backend & Data</p>
                      <p className="text-xs font-bold text-slate-200">Node • Postgres • Prisma</p>
                    </div>
                  </div>

                  <div className="bg-slate-900/70 border border-slate-800/80 rounded-xl p-3 flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-lg bg-sky-500/10 border border-sky-500/20 flex items-center justify-center text-sky-400">
                      <Sparkles className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="text-[11px] text-slate-400 font-mono">AI Systems</p>
                      <p className="text-xs font-bold text-slate-200">LLMs • OpenRouter • AI</p>
                    </div>
                  </div>

                  <div className="bg-slate-900/70 border border-slate-800/80 rounded-xl p-3 flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
                      <Terminal className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="text-[11px] text-slate-400 font-mono">Real-Time</p>
                      <p className="text-xs font-bold text-slate-200">WebSockets • Recharts</p>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </div>

        </div>

        {/* Quick Stats Bar */}
        <div className="mt-16 pt-8 border-t border-slate-800/80 grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-slate-900/40 border border-slate-800/60 rounded-2xl p-4 text-center hover:border-indigo-500/30 transition-colors">
            <p className="text-2xl sm:text-3xl font-extrabold text-white font-mono">5+</p>
            <p className="text-xs text-slate-400 mt-1 font-medium">Production & Real-World Projects</p>
          </div>
          <div className="bg-slate-900/40 border border-slate-800/60 rounded-2xl p-4 text-center hover:border-indigo-500/30 transition-colors">
            <p className="text-2xl sm:text-3xl font-extrabold text-indigo-400 font-mono">15+</p>
            <p className="text-xs text-slate-400 mt-1 font-medium">Languages, Frameworks & Tools</p>
          </div>
          <div className="bg-slate-900/40 border border-slate-800/60 rounded-2xl p-4 text-center hover:border-indigo-500/30 transition-colors">
            <p className="text-2xl sm:text-3xl font-extrabold text-purple-400 font-mono">B.Tech (AI)</p>
            <p className="text-xs text-slate-400 mt-1 font-medium">Artificial Intelligence Focus</p>
          </div>
          <div className="bg-slate-900/40 border border-slate-800/60 rounded-2xl p-4 text-center hover:border-indigo-500/30 transition-colors">
            <p className="text-2xl sm:text-3xl font-extrabold text-emerald-400 font-mono">Immediate</p>
            <p className="text-xs text-slate-400 mt-1 font-medium">Internship / Job Availability</p>
          </div>
        </div>

      </div>
    </section>
  );
};
