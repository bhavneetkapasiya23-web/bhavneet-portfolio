import React, { useState, useEffect } from 'react';
import { personalInfo } from '../data/portfolioData';
import { 
  Menu, 
  X, 
  FileText, 
  Send, 
  Github, 
  Mail, 
  Code2, 
  Sparkles,
  ExternalLink
} from 'lucide-react';

interface NavbarProps {
  onOpenResume: () => void;
  onOpenChat: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenResume, onOpenChat }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      const sections = ['home', 'about', 'skills', 'projects', 'demos', 'education', 'contact'];
      const scrollPosition = window.scrollY + 200;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#home', id: 'home' },
    { name: 'About', href: '#about', id: 'about' },
    { name: 'Skills', href: '#skills', id: 'skills' },
    { name: 'Projects', href: '#projects', id: 'projects' },
    { name: 'Live Demos', href: '#demos', id: 'demos' },
    { name: 'Education', href: '#education', id: 'education' },
    { name: 'Contact', href: '#contact', id: 'contact' },
  ];

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled 
        ? 'bg-[#090d16]/85 backdrop-blur-md border-b border-slate-800/80 py-3 shadow-lg shadow-black/20' 
        : 'bg-transparent py-5'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        
        {/* Brand / Logo */}
        <a 
          href="#home" 
          className="flex items-center gap-3 group focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 rounded-lg p-1"
          id="nav-logo"
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-purple-500 p-[1px] shadow-md shadow-indigo-500/20 group-hover:shadow-indigo-500/40 transition-all duration-300">
            <div className="w-full h-full bg-[#0b0f19] rounded-[11px] flex items-center justify-center font-bold text-indigo-400 group-hover:text-white transition-colors">
              BK
            </div>
          </div>
          <div>
            <span className="font-bold text-lg text-white tracking-tight group-hover:text-indigo-300 transition-colors flex items-center gap-1.5">
              {personalInfo.name}
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            </span>
            <p className="text-[11px] text-slate-400 font-mono hidden sm:block">Full-Stack & AI Engineer</p>
          </div>
        </a>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-1 bg-slate-900/60 border border-slate-800/60 rounded-full px-4 py-1.5 backdrop-blur-sm">
          {navLinks.map((link) => {
            const isActive = activeSection === link.id;
            return (
              <a
                key={link.name}
                href={link.href}
                id={`nav-link-${link.id}`}
                className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all duration-200 ${
                  isActive 
                    ? 'bg-indigo-600/20 text-indigo-300 border border-indigo-500/30 shadow-xs' 
                    : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
                }`}
              >
                {link.name}
              </a>
            );
          })}
        </nav>

        {/* Action Buttons */}
        <div className="hidden lg:flex items-center gap-3">
          {/* AI Assistant Quick Trigger */}
          <button
            onClick={onOpenChat}
            id="nav-ask-ai-btn"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-purple-950/40 text-purple-300 border border-purple-800/50 hover:bg-purple-900/50 hover:text-purple-200 transition-all cursor-pointer shadow-xs"
            title="Chat with Bhavneet's AI Assistant"
          >
            <Sparkles className="w-3.5 h-3.5 text-purple-400 animate-pulse" />
            <span>Ask AI</span>
          </button>

          {/* Resume Button */}
          <button
            onClick={onOpenResume}
            id="nav-resume-btn"
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-medium bg-slate-800 text-slate-200 hover:bg-slate-700 hover:text-white border border-slate-700 transition-all cursor-pointer"
          >
            <FileText className="w-3.5 h-3.5 text-indigo-400" />
            <span>Resume</span>
          </button>

          {/* Hire Me / Contact CTA */}
          <a
            href="#contact"
            id="nav-contact-cta"
            className="flex items-center gap-1.5 px-4 py-1.5 rounded-lg text-xs font-semibold bg-gradient-to-r from-indigo-500 to-indigo-600 hover:from-indigo-600 hover:to-indigo-700 text-white shadow-md shadow-indigo-600/25 hover:shadow-indigo-600/40 transition-all"
          >
            <Send className="w-3.5 h-3.5" />
            <span>Hire Me</span>
          </a>
        </div>

        {/* Mobile Hamburger Toggle */}
        <div className="flex items-center gap-2 md:hidden">
          <button
            onClick={onOpenResume}
            className="p-2 rounded-lg bg-slate-800/70 border border-slate-700 text-indigo-400 text-xs flex items-center gap-1"
            aria-label="View Resume"
          >
            <FileText className="w-4 h-4" />
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            id="mobile-menu-toggle"
            className="p-2 rounded-lg bg-slate-800 text-slate-300 hover:text-white border border-slate-700 focus:outline-none"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#0c101d] border-b border-slate-800 px-4 pt-3 pb-6 space-y-3 mt-2 shadow-2xl animate-in fade-in slide-in-from-top-4 duration-200">
          <div className="grid grid-cols-2 gap-2 pb-3 border-b border-slate-800">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 rounded-lg text-sm font-medium text-slate-300 hover:bg-slate-800 hover:text-white"
              >
                {link.name}
              </a>
            ))}
          </div>

          <div className="flex flex-col gap-2 pt-1">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenChat();
              }}
              className="w-full flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-medium bg-purple-900/30 text-purple-300 border border-purple-800/40"
            >
              <Sparkles className="w-4 h-4 text-purple-400" />
              <span>Ask AI About Bhavneet</span>
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenResume();
              }}
              className="w-full flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-medium bg-slate-800 text-slate-200 border border-slate-700"
            >
              <FileText className="w-4 h-4 text-indigo-400" />
              <span>View & Download Resume</span>
            </button>
            <a
              href="#contact"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-semibold bg-indigo-600 text-white shadow-md shadow-indigo-600/30"
            >
              <Send className="w-4 h-4" />
              <span>Get In Touch</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
