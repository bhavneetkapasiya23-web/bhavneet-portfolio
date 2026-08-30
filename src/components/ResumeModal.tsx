import React, { useState } from 'react';
import { personalInfo } from '../data/portfolioData';
import { 
  X, 
  Printer, 
  Download, 
  Copy, 
  Check, 
  FileText, 
  ExternalLink, 
  Mail, 
  Phone, 
  MapPin, 
  Github,
  Sparkles
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ResumeModal: React.FC<ResumeModalProps> = ({ isOpen, onClose }) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const handlePrint = () => {
    confetti({
      particleCount: 50,
      spread: 70,
      origin: { y: 0.6 }
    });
    window.print();
  };

  const handleCopyText = () => {
    const resumeText = `BHAVNEET
Software Engineer | Full-Stack Developer | AI-Integrated Web Applications
Meerut, Uttar Pradesh | +91 7417634695 | bhavneetkapasiya23@gmail.com | github.com/bhavneetkapasiya23

PROFESSIONAL SUMMARY
Computer Science undergraduate specializing in Artificial Intelligence with hands-on experience designing, developing, and deploying full-stack web applications. Skilled in JavaScript, Python, Java, SQL, React.js, Node.js, Express.js, PostgreSQL, REST APIs, JWT authentication, Stripe integration, WebSockets, and LLM API integration. Seeking a Software Engineer, Full-Stack Developer, or AI-focused internship/entry-level role.

TECHNICAL SKILLS
- Programming Languages: JavaScript, Python, Java, SQL
- Frontend: React.js, TypeScript, HTML5, CSS3, Tailwind CSS, Recharts
- Backend: Node.js, Express.js, REST API Design, JWT Authentication, WebSockets
- Databases: PostgreSQL, Neon PostgreSQL, Prisma ORM
- AI / Machine Learning: Artificial Intelligence, Prompt Engineering, LLM API Integration, OpenRouter API
- Tools & Platforms: Git, GitHub, Vercel, Postman, VS Code, Stripe API
- Computer Science: Data Structures and Algorithms, Object-Oriented Programming

PROJECTS
1. AI Website Builder (2025) | Live: https://ai-site-builder-2tq6.vercel.app/
   React.js, Node.js, Express.js, PostgreSQL, Prisma, OpenRouter API, Stripe
   - Developed a full-stack AI-powered website generator that converts natural-language prompts into complete deployable websites using the OpenRouter API.
   - Implemented a credit-based usage and payment system using Stripe, enabling users to purchase and consume generation credits.
   - Implemented secure JWT-based authentication and authorization for user accounts and protected API routes.
   - Designed database models for users, projects, credits, and payment records using PostgreSQL and Prisma ORM on Neon.
   - Deployed the application on Vercel, completing the full development-to-production deployment lifecycle.

2. Real-Time Stock Dashboard (2025)
   React.js, TypeScript, Recharts, WebSockets
   - Developed a responsive stock market dashboard that streams and renders live price data using WebSockets.
   - Built reusable, strongly typed TypeScript components with Recharts to visualize price trends and historical market movement.
   - Structured client-side state management for continuous incoming data streams to maintain smooth UI performance.

3. AI-Powered Observability Platform (In Progress)
   React.js, Tailwind CSS
   - Designing an AI-assisted observability dashboard for logs, metrics, and system health across microservice architectures.
   - Building a responsive component-driven React interface and planning AI-based anomaly detection and root-cause analysis.

EDUCATION
- Bachelor of Technology, Computer Science and Engineering (Artificial Intelligence) (2023 – Pursuing)
  Meerut Institute of Engineering and Technology (MIET), Meerut, Uttar Pradesh
- Senior Secondary (Class XII), CBSE (2022 – 2023)
  Vardhman Academy, Meerut, Uttar Pradesh
- Secondary (Class X), CBSE (2020 – 2021)
  Vardhman Academy, Meerut, Uttar Pradesh

CERTIFICATIONS
- JavaScript Fundamentals — GreatStack
- React Hooks Course — GreatStack

CORE STRENGTHS
Problem Solving | Analytical Thinking | Communication | Teamwork | Adaptability | Time Management
`;

    navigator.clipboard.writeText(resumeText);
    setCopied(true);
    confetti({
      particleCount: 30,
      spread: 50,
      origin: { y: 0.6 }
    });
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-2 sm:p-4 overflow-y-auto">
      <div className="relative w-full max-w-4xl bg-[#0d111a] border border-slate-700 rounded-3xl shadow-2xl overflow-hidden my-6 flex flex-col max-h-[92vh] animate-in fade-in zoom-in-95 duration-200">
        
        {/* Top Control Bar */}
        <div className="flex items-center justify-between px-6 py-4 bg-slate-900/90 border-b border-slate-800 shrink-0">
          <div className="flex items-center gap-2">
            <FileText className="w-5 h-5 text-indigo-400" />
            <span className="text-sm font-bold text-white">Bhavneet's Official Resume</span>
            <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">Verified</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopyText}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium border border-slate-700 transition-colors cursor-pointer"
              title="Copy as Plain Text"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5 text-slate-400" />}
              <span>{copied ? 'Copied!' : 'Copy Text'}</span>
            </button>

            <button
              onClick={handlePrint}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold shadow-md shadow-indigo-600/30 transition-colors cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print / PDF</span>
            </button>

            <button
              onClick={onClose}
              className="p-1.5 rounded-xl bg-slate-800 text-slate-400 hover:text-white border border-slate-700 cursor-pointer ml-1"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Resume Document Canvas (Printable Sheet) */}
        <div className="overflow-y-auto p-6 sm:p-10 bg-slate-950 text-slate-200 font-sans space-y-6 select-text" id="resume-printable-area">
          
          {/* Header */}
          <div className="text-center pb-5 border-b border-slate-800 space-y-2">
            <h1 className="text-3xl font-extrabold tracking-tight text-white uppercase">
              BHAVNEET
            </h1>
            <p className="text-sm font-semibold text-indigo-400">
              Software Engineer | Full-Stack Developer | AI-Integrated Web Applications
            </p>
            <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1 text-xs text-slate-400 font-mono pt-1">
              <span>Meerut, Uttar Pradesh</span>
              <span>•</span>
              <a href="tel:+917417634695" className="hover:text-indigo-300">+91 7417634695</a>
              <span>•</span>
              <a href="mailto:bhavneetkapasiya23@gmail.com" className="hover:text-indigo-300">bhavneetkapasiya23@gmail.com</a>
              <span>•</span>
              <a href="https://github.com/bhavneetkapasiya23" target="_blank" rel="noreferrer" className="hover:text-indigo-300">github.com/bhavneetkapasiya23</a>
            </div>
          </div>

          {/* Professional Summary */}
          <div className="space-y-2">
            <h2 className="text-xs font-bold font-mono uppercase tracking-widest text-indigo-400 border-b border-slate-800 pb-1">
              PROFESSIONAL SUMMARY
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Computer Science undergraduate specializing in Artificial Intelligence with hands-on experience designing, developing, and deploying full-stack web applications. Skilled in JavaScript, Python, Java, SQL, React.js, Node.js, Express.js, PostgreSQL, REST APIs, JWT authentication, Stripe integration, WebSockets, and LLM API integration. Seeking a Software Engineer, Full-Stack Developer, or AI-focused internship/entry-level role.
            </p>
          </div>

          {/* Technical Skills */}
          <div className="space-y-2">
            <h2 className="text-xs font-bold font-mono uppercase tracking-widest text-indigo-400 border-b border-slate-800 pb-1">
              TECHNICAL SKILLS
            </h2>
            <div className="space-y-1.5 text-xs text-slate-300">
              <div><strong className="text-white">Programming Languages:</strong> JavaScript, Python, Java, SQL</div>
              <div><strong className="text-white">Frontend:</strong> React.js, TypeScript, HTML5, CSS3, Tailwind CSS, Recharts</div>
              <div><strong className="text-white">Backend:</strong> Node.js, Express.js, REST API Design, JWT Authentication, WebSockets</div>
              <div><strong className="text-white">Databases:</strong> PostgreSQL, Neon PostgreSQL, Prisma ORM</div>
              <div><strong className="text-white">AI / Machine Learning:</strong> Artificial Intelligence, Prompt Engineering, LLM API Integration, OpenRouter API</div>
              <div><strong className="text-white">Tools & Platforms:</strong> Git, GitHub, Vercel, Postman, VS Code, Stripe API</div>
              <div><strong className="text-white">Computer Science:</strong> Data Structures and Algorithms, Object-Oriented Programming</div>
            </div>
          </div>

          {/* Projects */}
          <div className="space-y-4">
            <h2 className="text-xs font-bold font-mono uppercase tracking-widest text-indigo-400 border-b border-slate-800 pb-1">
              PROJECTS
            </h2>

            {/* Project 1 */}
            <div className="space-y-1.5">
              <div className="flex flex-wrap justify-between items-baseline gap-2">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-sm font-bold text-white">AI Website Builder</span>
                  <a
                    href="https://ai-site-builder-2tq6.vercel.app/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md bg-purple-600/30 hover:bg-purple-600/50 text-purple-200 hover:text-white border border-purple-500/50 text-[11px] font-mono font-medium transition-all shadow-sm cursor-pointer"
                    title="Tap to open deployed live website in a new tab"
                  >
                    <span>Live Demo: AI Website Builder</span>
                    <ExternalLink className="w-3 h-3 text-purple-300" />
                  </a>
                </div>
                <span className="text-xs font-mono text-slate-400">2025</span>
              </div>
              <div className="text-xs text-indigo-300 italic">
                React.js, Node.js, Express.js, PostgreSQL, Prisma, OpenRouter API, Stripe
              </div>
              <ul className="list-disc list-inside text-xs text-slate-300 space-y-1 pl-1">
                <li>Developed a full-stack AI-powered website generator that converts natural-language prompts into complete deployable websites using the OpenRouter API.</li>
                <li>Implemented a credit-based usage and payment system using Stripe, enabling users to purchase and consume generation credits.</li>
                <li>Implemented secure JWT-based authentication and authorization for user accounts and protected API routes.</li>
                <li>Designed database models for users, projects, credits, and payment records using PostgreSQL and Prisma ORM on Neon.</li>
                <li>Deployed the application on Vercel, completing the full development-to-production deployment lifecycle.</li>
              </ul>
            </div>

            {/* Project 2 */}
            <div className="space-y-1.5">
              <div className="flex justify-between items-baseline">
                <span className="text-sm font-bold text-white">Real-Time Stock Dashboard</span>
                <span className="text-xs font-mono text-slate-400">2025</span>
              </div>
              <div className="text-xs text-indigo-300 italic">
                React.js, TypeScript, Recharts, WebSockets
              </div>
              <ul className="list-disc list-inside text-xs text-slate-300 space-y-1 pl-1">
                <li>Developed a responsive stock market dashboard that streams and renders live price data using WebSockets.</li>
                <li>Built reusable, strongly typed TypeScript components with Recharts to visualize price trends and historical market movement.</li>
                <li>Structured client-side state management for continuous incoming data streams to maintain smooth UI performance.</li>
              </ul>
            </div>

            {/* Project 3 */}
            <div className="space-y-1.5">
              <div className="flex justify-between items-baseline">
                <span className="text-sm font-bold text-white">AI-Powered Observability Platform</span>
                <span className="text-xs font-mono text-slate-400">In Progress</span>
              </div>
              <div className="text-xs text-indigo-300 italic">
                React.js, Tailwind CSS
              </div>
              <ul className="list-disc list-inside text-xs text-slate-300 space-y-1 pl-1">
                <li>Designing an AI-assisted observability dashboard for logs, metrics, and system health across microservice architectures.</li>
                <li>Building a responsive component-driven React interface and planning AI-based anomaly detection and root-cause analysis.</li>
              </ul>
            </div>
          </div>

          {/* Education */}
          <div className="space-y-3">
            <h2 className="text-xs font-bold font-mono uppercase tracking-widest text-indigo-400 border-b border-slate-800 pb-1">
              EDUCATION
            </h2>
            
            <div className="space-y-1">
              <div className="flex justify-between items-baseline">
                <span className="text-xs sm:text-sm font-bold text-white">Bachelor of Technology, Computer Science and Engineering (Artificial Intelligence)</span>
                <span className="text-xs font-mono text-slate-400">2023 – Pursuing</span>
              </div>
              <p className="text-xs text-slate-400">Meerut Institute of Engineering and Technology (MIET), Meerut, Uttar Pradesh</p>
            </div>

            <div className="space-y-1">
              <div className="flex justify-between items-baseline">
                <span className="text-xs sm:text-sm font-bold text-white">Senior Secondary (Class XII), CBSE</span>
                <span className="text-xs font-mono text-slate-400">2022 – 2023</span>
              </div>
              <p className="text-xs text-slate-400">Vardhman Academy, Meerut, Uttar Pradesh</p>
            </div>

            <div className="space-y-1">
              <div className="flex justify-between items-baseline">
                <span className="text-xs sm:text-sm font-bold text-white">Secondary (Class X), CBSE</span>
                <span className="text-xs font-mono text-slate-400">2020 – 2021</span>
              </div>
              <p className="text-xs text-slate-400">Vardhman Academy, Meerut, Uttar Pradesh</p>
            </div>
          </div>

          {/* Certifications */}
          <div className="space-y-2">
            <h2 className="text-xs font-bold font-mono uppercase tracking-widest text-indigo-400 border-b border-slate-800 pb-1">
              CERTIFICATIONS
            </h2>
            <div className="text-xs text-slate-300">
              JavaScript Fundamentals — GreatStack <span className="text-slate-600">|</span> React Hooks Course — GreatStack
            </div>
          </div>

          {/* Core Strengths */}
          <div className="space-y-2">
            <h2 className="text-xs font-bold font-mono uppercase tracking-widest text-indigo-400 border-b border-slate-800 pb-1">
              CORE STRENGTHS
            </h2>
            <div className="text-xs text-slate-300">
              Problem Solving <span className="text-slate-600">|</span> Analytical Thinking <span className="text-slate-600">|</span> Communication <span className="text-slate-600">|</span> Teamwork <span className="text-slate-600">|</span> Adaptability <span className="text-slate-600">|</span> Time Management
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
