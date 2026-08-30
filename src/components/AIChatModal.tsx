import React, { useState, useRef, useEffect } from 'react';
import { personalInfo, quickFAQ } from '../data/portfolioData';
import { 
  Sparkles, 
  Send, 
  X, 
  Bot, 
  User, 
  Code2, 
  FileText, 
  Mail, 
  ExternalLink,
  ChevronRight,
  RefreshCcw
} from 'lucide-react';

interface AIChatModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenResume: () => void;
}

interface Message {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
  links?: { label: string; action: () => void }[];
}

const INITIAL_MESSAGES: Message[] = [
  {
    id: '1',
    sender: 'assistant',
    text: `Hello! I'm Bhavneet's interactive AI Portfolio Assistant. I have complete knowledge of his resume, engineering projects, tech stack, and background. Feel free to ask me anything or click a preset question below!`,
    timestamp: 'Just now'
  }
];

const PRESET_QUESTIONS = [
  "What is Bhavneet's primary tech stack?",
  "Tell me about his AI Website Builder project",
  "How was the Real-Time Stock Dashboard built?",
  "What is his education & college?",
  "Is Bhavneet available for internships or full-time roles?",
  "How can I get in touch with Bhavneet?"
];

export const AIChatModal: React.FC<AIChatModalProps> = ({ 
  isOpen, 
  onClose,
  onOpenResume
}) => {
  const [messages, setMessages] = useState<Message[]>(INITIAL_MESSAGES);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const chatBottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      chatBottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen]);

  if (!isOpen) return null;

  const generateAnswer = (query: string): string => {
    const q = query.toLowerCase();

    if (q.includes('skill') || q.includes('stack') || q.includes('technolog') || q.includes('language')) {
      return `Bhavneet's core technical toolkit includes:\n• Languages: JavaScript (ES6+), TypeScript, Python, Java, SQL\n• Frontend: React.js, Tailwind CSS, HTML5/CSS3, Recharts, Framer Motion\n• Backend & APIs: Node.js, Express.js, REST APIs, JWT Auth, WebSockets\n• Databases: PostgreSQL, Neon PostgreSQL, Prisma ORM\n• AI & ML: Prompt Engineering, LLM API Integration, OpenRouter API, Gemini API\n• Tools: Git, GitHub, Vercel, Postman, Stripe API, VS Code.`;
    }

    if (q.includes('ai website builder') || q.includes('website builder') || q.includes('prompt')) {
      return `The AI Website Builder (2025) is a full-stack platform that turns natural-language prompts into deployable web apps.\n• Live App: https://ai-site-builder-2tq6.vercel.app/\n• Uses the OpenRouter API for LLM synthesis\n• Credit & billing system via Stripe\n• Secure JWT authentication & protected routes\n• PostgreSQL + Prisma ORM on Neon\n• Deployed to Vercel with automated CI/CD.`;
    }

    if (q.includes('stock') || q.includes('websocket') || q.includes('dashboard')) {
      return `The Real-Time Stock Dashboard (2025) is built with React.js, TypeScript, Recharts, and WebSockets.\n• Streams sub-second live price ticks over WebSocket channels\n• High-throughput client-side buffer state management to prevent UI stutter\n• Interactive Recharts for candlestick and volume visualization.`;
    }

    if (q.includes('observability') || q.includes('progress') || q.includes('in progress')) {
      return `The AI-Powered Observability Platform (In Progress) is an intelligent telemetry dashboard built with React.js and Tailwind CSS for distributed microservices. It features automated AI anomaly detection and incident root-cause analysis.`;
    }

    if (q.includes('education') || q.includes('college') || q.includes('degree') || q.includes('miet') || q.includes('school')) {
      return `Bhavneet is currently pursuing his Bachelor of Technology (B.Tech) in Computer Science and Engineering (Artificial Intelligence) at Meerut Institute of Engineering and Technology (MIET), Meerut (2023–Present). He completed Senior Secondary (Class XII) and Secondary (Class X) at Vardhman Academy, Meerut.`;
    }

    if (q.includes('certif') || q.includes('course')) {
      return `Bhavneet holds verified certifications in 'JavaScript Fundamentals' and 'React Hooks Course' from GreatStack.`;
    }

    if (q.includes('availab') || q.includes('intern') || q.includes('job') || q.includes('hire') || q.includes('role')) {
      return `Yes! Bhavneet is actively available and seeking Software Engineer, Full-Stack Developer, or AI-focused internship/entry-level positions. He can join immediately.`;
    }

    if (q.includes('contact') || q.includes('email') || q.includes('phone') || q.includes('reach') || q.includes('github')) {
      return `You can reach Bhavneet directly:\n• Email: bhavneetkapasiya23@gmail.com\n• Phone: +91 7417634695\n• Location: Meerut, Uttar Pradesh, India\n• GitHub: https://github.com/bhavneetkapasiya23`;
    }

    return `Bhavneet is a Software Engineer specializing in Artificial Intelligence and Full-Stack development (React, Node.js, Express, PostgreSQL, Prisma, WebSockets, LLMs). Is there a specific project, skill, or credential you'd like to explore?`;
  };

  const handleSend = (textToSend?: string) => {
    const text = textToSend || inputText;
    if (!text.trim() || isTyping) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      sender: 'user',
      text: text.trim(),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    setInputText('');
    setIsTyping(true);

    setTimeout(() => {
      const answer = generateAnswer(text);
      const assistantMsg: Message = {
        id: (Date.now() + 1).toString(),
        sender: 'assistant',
        text: answer,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, assistantMsg]);
      setIsTyping(false);
    }, 450);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-2 sm:p-4">
      <div className="relative w-full max-w-2xl bg-[#0c101d] border border-purple-800/60 rounded-3xl shadow-2xl overflow-hidden flex flex-col h-[620px] max-h-[92vh] animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 bg-slate-900/90 border-b border-slate-800 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-purple-600/20 border border-purple-500/40 flex items-center justify-center text-purple-400">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <span>Bhavneet's AI Assistant</span>
                <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">Online</span>
              </h3>
              <p className="text-[11px] text-slate-400 font-mono">Answers grounded in Bhavneet's resume & projects</p>
            </div>
          </div>

          <div className="flex items-center gap-1">
            <button
              onClick={() => setMessages(INITIAL_MESSAGES)}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
              title="Reset conversation"
            >
              <RefreshCcw className="w-4 h-4" />
            </button>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Chat History Messages */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4 font-sans">
          {messages.map((msg) => (
            <div 
              key={msg.id}
              className={`flex gap-3 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              {msg.sender === 'assistant' && (
                <div className="w-8 h-8 rounded-xl bg-purple-600/20 border border-purple-500/30 flex items-center justify-center text-purple-300 shrink-0 mt-0.5">
                  <Bot className="w-4 h-4" />
                </div>
              )}

              <div className={`max-w-[85%] rounded-2xl p-4 text-xs sm:text-sm leading-relaxed ${
                msg.sender === 'user'
                  ? 'bg-indigo-600 text-white rounded-tr-none shadow-md'
                  : 'bg-slate-900 border border-slate-800 text-slate-200 rounded-tl-none space-y-2'
              }`}>
                <p className="whitespace-pre-line">{msg.text}</p>
                <span className="block text-[10px] text-slate-400/80 font-mono mt-1 text-right">
                  {msg.timestamp}
                </span>
              </div>

              {msg.sender === 'user' && (
                <div className="w-8 h-8 rounded-xl bg-indigo-600/30 border border-indigo-500/40 flex items-center justify-center text-indigo-300 shrink-0 mt-0.5">
                  <User className="w-4 h-4" />
                </div>
              )}
            </div>
          ))}

          {isTyping && (
            <div className="flex gap-3 items-center">
              <div className="w-8 h-8 rounded-xl bg-purple-600/20 border border-purple-500/30 flex items-center justify-center text-purple-300 shrink-0">
                <Bot className="w-4 h-4" />
              </div>
              <div className="bg-slate-900 border border-slate-800 rounded-2xl rounded-tl-none px-4 py-3 text-xs text-purple-300 flex items-center gap-1.5 font-mono">
                <span className="w-2 h-2 rounded-full bg-purple-400 animate-ping"></span>
                <span>Bhavneet's AI is analyzing...</span>
              </div>
            </div>
          )}

          <div ref={chatBottomRef} />
        </div>

        {/* Preset Prompt Suggestions */}
        <div className="px-4 py-2 bg-slate-950/80 border-t border-slate-800/80 overflow-x-auto whitespace-nowrap flex gap-2">
          {PRESET_QUESTIONS.map((q) => (
            <button
              key={q}
              onClick={() => handleSend(q)}
              className="text-[11px] font-mono px-3 py-1 rounded-full bg-slate-900 hover:bg-purple-950/50 hover:text-purple-300 text-slate-400 border border-slate-800 hover:border-purple-800/50 transition-colors cursor-pointer shrink-0"
            >
              {q}
            </button>
          ))}
        </div>

        {/* Input Bar */}
        <div className="p-4 bg-slate-900/90 border-t border-slate-800 shrink-0 flex items-center gap-2">
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Ask about Bhavneet's projects, skills, education, or hiring..."
            className="flex-1 px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-purple-500"
          />
          <button
            onClick={() => handleSend()}
            disabled={!inputText.trim() || isTyping}
            className="p-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 disabled:opacity-40 text-white transition-colors cursor-pointer"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>

      </div>
    </div>
  );
};
