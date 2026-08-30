import React from 'react';
import { personalInfo, coreStrengths } from '../data/portfolioData';
import { 
  User, 
  CheckCircle2, 
  Brain, 
  Sparkles, 
  Code2, 
  Database, 
  FileText, 
  GraduationCap, 
  Zap,
  ShieldCheck,
  Cpu,
  Layers,
  Users,
  Rocket
} from 'lucide-react';

interface AboutProps {
  onOpenResume: () => void;
}

export const About: React.FC<AboutProps> = ({ onOpenResume }) => {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Zap': return <Zap className="w-5 h-5 text-amber-400" />;
      case 'Layers': return <Layers className="w-5 h-5 text-indigo-400" />;
      case 'Brain': return <Brain className="w-5 h-5 text-purple-400" />;
      case 'Cpu': return <Cpu className="w-5 h-5 text-sky-400" />;
      case 'Users': return <Users className="w-5 h-5 text-emerald-400" />;
      case 'Rocket': return <Rocket className="w-5 h-5 text-rose-400" />;
      default: return <Sparkles className="w-5 h-5 text-indigo-400" />;
    }
  };

  return (
    <section id="about" className="py-20 bg-[#090d16] relative border-t border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-mono font-medium">
            <User className="w-3.5 h-3.5" />
            <span>ABOUT ME</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Engineering Modern Web Apps with <span className="bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">AI & High Performance</span>
          </h2>
          <p className="text-slate-400 text-base">
            Bridging foundational Computer Science concepts with next-generation generative AI and real-time streaming architectures.
          </p>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Professional Narrative Column */}
          <div className="lg:col-span-7 space-y-6">
            <div className="bg-[#0c101d] border border-slate-800/80 rounded-2xl p-6 sm:p-8 space-y-5 shadow-xl">
              <h3 className="text-xl font-bold text-white flex items-center gap-2.5">
                <Brain className="w-5 h-5 text-indigo-400" />
                <span>Professional Background & Focus</span>
              </h3>

              <div className="space-y-4 text-slate-300 leading-relaxed text-sm sm:text-base">
                <p>
                  I am a Computer Science undergraduate specializing in <strong className="text-white font-semibold">Artificial Intelligence</strong> at <strong className="text-indigo-300 font-medium">Meerut Institute of Engineering and Technology (MIET)</strong> with extensive hands-on experience designing, developing, and deploying full-stack applications.
                </p>
                <p>
                  My development philosophy revolves around building end-to-end solutions that are practical, fast, and scalable. From architecting <span className="text-purple-300 font-medium">AI-driven platforms</span> using the OpenRouter API & Stripe credit systems to constructing low-latency <span className="text-sky-300 font-medium">real-time WebSocket dashboards</span> with Recharts, I take pride in delivering production-ready code.
                </p>
                <p>
                  I am proficient in modern languages and technologies including <strong className="text-white">JavaScript, TypeScript, Python, Java, SQL, React.js, Node.js, Express.js, PostgreSQL (Prisma ORM on Neon), and REST APIs</strong>.
                </p>
              </div>

              {/* Highlights Checklist */}
              <div className="pt-2 border-t border-slate-800 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-sm text-slate-300 font-medium">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Full-Stack Web Architectures</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>LLM API & Prompt Engineering</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Stripe Payments & Usage Credits</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>JWT Auth & Protected Routes</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Real-Time WebSocket Streams</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>PostgreSQL & Prisma ORM</span>
                </div>
              </div>

              {/* Action */}
              <div className="pt-2 flex items-center gap-4">
                <button
                  onClick={onOpenResume}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-indigo-600/20 text-indigo-300 border border-indigo-500/40 hover:bg-indigo-600/30 text-xs font-semibold transition-all cursor-pointer"
                >
                  <FileText className="w-4 h-4" />
                  <span>Inspect Complete Resume</span>
                </button>
                <a
                  href="#contact"
                  className="inline-flex items-center gap-2 text-xs font-semibold text-slate-300 hover:text-white transition-colors"
                >
                  <span>Let's collaborate &rarr;</span>
                </a>
              </div>
            </div>
          </div>

          {/* Core Strengths & Fast Info Column */}
          <div className="lg:col-span-5 space-y-4">
            <h3 className="text-lg font-bold text-white flex items-center gap-2 px-1">
              <Sparkles className="w-4 h-4 text-indigo-400" />
              <span>Core Strengths</span>
            </h3>

            <div className="grid grid-cols-1 gap-3">
              {coreStrengths.map((strength) => (
                <div 
                  key={strength.title}
                  className="bg-[#0c101d] border border-slate-800/80 hover:border-slate-700/90 rounded-xl p-4 transition-all duration-200 group"
                >
                  <div className="flex items-start gap-3.5">
                    <div className="p-2 rounded-lg bg-slate-900 border border-slate-800 shrink-0 group-hover:border-indigo-500/30 transition-colors">
                      {getIcon(strength.iconName)}
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-white group-hover:text-indigo-300 transition-colors">
                        {strength.title}
                      </h4>
                      <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                        {strength.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
