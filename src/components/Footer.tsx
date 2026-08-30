import React from 'react';
import { personalInfo } from '../data/portfolioData';
import { 
  Github, 
  Mail, 
  Phone, 
  ArrowUp, 
  Heart, 
  Sparkles,
  Code2,
  FileText
} from 'lucide-react';

interface FooterProps {
  onOpenResume: () => void;
  onOpenChat: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenResume, onOpenChat }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#060910] border-t border-slate-800/80 text-slate-400 py-12 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Top row */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-8 border-b border-slate-800/80">
          
          {/* Logo & title */}
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-600 to-purple-600 p-[1px]">
              <div className="w-full h-full bg-[#0b0f19] rounded-[11px] flex items-center justify-center font-bold text-indigo-400">
                BK
              </div>
            </div>
            <div>
              <span className="font-bold text-base text-white">{personalInfo.name} Kapasiya</span>
              <p className="text-[11px] text-slate-500 font-mono">Software Engineer & Full-Stack Developer</p>
            </div>
          </div>

          {/* Quick links */}
          <div className="flex flex-wrap items-center justify-center gap-6 text-xs text-slate-400 font-medium">
            <a href="#home" className="hover:text-white transition-colors">Home</a>
            <a href="#about" className="hover:text-white transition-colors">About</a>
            <a href="#skills" className="hover:text-white transition-colors">Skills</a>
            <a href="#projects" className="hover:text-white transition-colors">Projects</a>
            <a href="#demos" className="hover:text-white transition-colors">Live Demos</a>
            <a href="#education" className="hover:text-white transition-colors">Education</a>
            <button onClick={onOpenResume} className="hover:text-indigo-400 transition-colors cursor-pointer">Resume</button>
            <button onClick={onOpenChat} className="text-purple-400 hover:text-purple-300 transition-colors cursor-pointer flex items-center gap-1">
              <Sparkles className="w-3 h-3" />
              <span>Ask AI</span>
            </button>
          </div>

          {/* Back to top button */}
          <button
            onClick={scrollToTop}
            className="p-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-800 transition-colors cursor-pointer flex items-center gap-1.5"
            aria-label="Scroll back to top"
          >
            <span>Back to top</span>
            <ArrowUp className="w-4 h-4" />
          </button>

        </div>

        {/* Bottom row */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500 font-mono">
          <div>
            © {new Date().getFullYear()} {personalInfo.fullName}. All rights reserved.
          </div>

          <div className="flex items-center gap-4">
            <a 
              href={personalInfo.github} 
              target="_blank" 
              rel="noreferrer" 
              className="hover:text-slate-300 transition-colors flex items-center gap-1"
            >
              <Github className="w-3.5 h-3.5" />
              <span>GitHub</span>
            </a>
            <a 
              href={`mailto:${personalInfo.email}`} 
              className="hover:text-slate-300 transition-colors flex items-center gap-1"
            >
              <Mail className="w-3.5 h-3.5" />
              <span>Email</span>
            </a>
            <a 
              href={`tel:${personalInfo.phone.replace(/\s+/g, '')}`} 
              className="hover:text-slate-300 transition-colors flex items-center gap-1"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>Phone</span>
            </a>
          </div>
        </div>

      </div>
    </footer>
  );
};
