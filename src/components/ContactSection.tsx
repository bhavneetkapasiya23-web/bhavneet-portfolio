import React, { useState } from 'react';
import { personalInfo, quickFAQ } from '../data/portfolioData';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Send, 
  Github, 
  CheckCircle2, 
  Copy, 
  Check, 
  Sparkles, 
  MessageSquare,
  HelpCircle,
  ChevronDown
} from 'lucide-react';
import confetti from 'canvas-confetti';

export const ContactSection: React.FC = () => {
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleCopy = (text: string, type: 'email' | 'phone') => {
    navigator.clipboard.writeText(text);
    if (type === 'email') {
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 2000);
    } else {
      setCopiedPhone(true);
      setTimeout(() => setCopiedPhone(false), 2000);
    }
    confetti({
      particleCount: 25,
      spread: 50,
      origin: { y: 0.8 }
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setFormSubmitted(true);
    confetti({
      particleCount: 80,
      spread: 90,
      origin: { y: 0.6 },
      colors: ['#6366f1', '#a855f7', '#10b981']
    });

    // Also construct mailto as backup
    const mailtoUrl = `mailto:${personalInfo.email}?subject=${encodeURIComponent(formData.subject || 'Portfolio Inquiry from ' + formData.name)}&body=${encodeURIComponent(
      `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`
    )}`;
    
    // Reset form after short delay
    setTimeout(() => {
      window.location.href = mailtoUrl;
    }, 800);
  };

  return (
    <section id="contact" className="py-20 bg-[#080c14] relative border-t border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-mono font-medium">
            <MessageSquare className="w-3.5 h-3.5" />
            <span>LET'S CONNECT</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Get in Touch & <span className="bg-gradient-to-r from-indigo-400 via-purple-300 to-emerald-400 bg-clip-text text-transparent">Start a Conversation</span>
          </h2>
          <p className="text-slate-400 text-base">
            Interested in hiring, collaborating on an AI / full-stack product, or discussing engineering opportunities? Reach out anytime!
          </p>
        </div>

        {/* Grid: Contact Info & Form */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Left Column: Direct Contact Info & FAQ */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Contact Cards */}
            <div className="space-y-3">
              
              {/* Email Card */}
              <div className="bg-[#0c101d] border border-slate-800/90 hover:border-slate-700 rounded-2xl p-4 flex items-center justify-between transition-colors">
                <div className="flex items-center gap-3.5">
                  <div className="p-2.5 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[11px] font-mono text-slate-400">Direct Email</span>
                    <p className="text-xs sm:text-sm font-semibold text-white">{personalInfo.email}</p>
                  </div>
                </div>
                <button
                  onClick={() => handleCopy(personalInfo.email, 'email')}
                  className="p-2 rounded-lg bg-slate-900 text-slate-400 hover:text-white border border-slate-800 transition-colors cursor-pointer"
                  title="Copy email address"
                >
                  {copiedEmail ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>

              {/* Phone Card */}
              <div className="bg-[#0c101d] border border-slate-800/90 hover:border-slate-700 rounded-2xl p-4 flex items-center justify-between transition-colors">
                <div className="flex items-center gap-3.5">
                  <div className="p-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[11px] font-mono text-slate-400">Phone / WhatsApp</span>
                    <p className="text-xs sm:text-sm font-semibold text-white">{personalInfo.phone}</p>
                  </div>
                </div>
                <button
                  onClick={() => handleCopy(personalInfo.phone, 'phone')}
                  className="p-2 rounded-lg bg-slate-900 text-slate-400 hover:text-white border border-slate-800 transition-colors cursor-pointer"
                  title="Copy phone number"
                >
                  {copiedPhone ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>

              {/* Location Card */}
              <div className="bg-[#0c101d] border border-slate-800/90 hover:border-slate-700 rounded-2xl p-4 flex items-center gap-3.5 transition-colors">
                <div className="p-2.5 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-400">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[11px] font-mono text-slate-400">Location</span>
                  <p className="text-xs sm:text-sm font-semibold text-white">{personalInfo.location}</p>
                </div>
              </div>

              {/* GitHub Card */}
              <a
                href={personalInfo.github}
                target="_blank"
                rel="noreferrer"
                className="bg-[#0c101d] border border-slate-800/90 hover:border-slate-700 rounded-2xl p-4 flex items-center justify-between transition-colors group block"
              >
                <div className="flex items-center gap-3.5">
                  <div className="p-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white">
                    <Github className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[11px] font-mono text-slate-400">GitHub Profile</span>
                    <p className="text-xs sm:text-sm font-semibold text-white group-hover:text-indigo-300 transition-colors">github.com/bhavneetkapasiya23</p>
                  </div>
                </div>
                <span className="text-xs font-mono text-indigo-400">&rarr;</span>
              </a>

            </div>

            {/* Quick FAQ Accordions */}
            <div className="bg-[#0c101d] border border-slate-800/80 rounded-2xl p-5 space-y-3">
              <h4 className="text-xs font-bold font-mono text-slate-300 uppercase tracking-wider flex items-center gap-2">
                <HelpCircle className="w-4 h-4 text-indigo-400" />
                <span>Frequently Asked Questions</span>
              </h4>

              <div className="space-y-2">
                {quickFAQ.map((faq, idx) => {
                  const isOpen = openFaqIndex === idx;
                  return (
                    <div key={idx} className="border border-slate-800/80 rounded-xl overflow-hidden bg-slate-900/50">
                      <button
                        onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                        className="w-full p-3 text-left flex items-center justify-between text-xs font-semibold text-slate-200 hover:text-white cursor-pointer"
                      >
                        <span>{faq.question}</span>
                        <ChevronDown className={`w-3.5 h-3.5 text-slate-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                      </button>
                      {isOpen && (
                        <div className="p-3 pt-0 text-xs text-slate-400 leading-relaxed border-t border-slate-800/40 font-sans">
                          {faq.answer}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

          </div>

          {/* Right Column: Contact Message Form */}
          <div className="lg:col-span-7">
            <div className="bg-[#0c101d] border border-slate-800/90 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6">
              <div>
                <h3 className="text-xl font-bold text-white flex items-center gap-2">
                  <Send className="w-5 h-5 text-indigo-400" />
                  <span>Send a Direct Message</span>
                </h3>
                <p className="text-xs sm:text-sm text-slate-400 mt-1">
                  Fill out the form below to message Bhavneet directly.
                </p>
              </div>

              {formSubmitted ? (
                <div className="p-8 bg-emerald-950/20 border border-emerald-500/30 rounded-2xl text-center space-y-3">
                  <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <h4 className="text-base font-bold text-white">Thank You for Reaching Out!</h4>
                  <p className="text-xs text-slate-300 max-w-md mx-auto">
                    Your message has been initiated. Bhavneet will review your inquiry and respond promptly at <strong className="text-emerald-400">{formData.email || 'your email'}</strong>.
                  </p>
                  <button
                    onClick={() => {
                      setFormSubmitted(false);
                      setFormData({ name: '', email: '', subject: '', message: '' });
                    }}
                    className="mt-2 px-4 py-2 rounded-xl bg-slate-800 text-xs font-semibold text-slate-200 hover:text-white"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-mono text-slate-300 block">Your Name *</label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="John Doe"
                        className="w-full px-4 py-2.5 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs font-mono text-slate-300 block">Your Email *</label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="john@example.com"
                        className="w-full px-4 py-2.5 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-mono text-slate-300 block">Subject</label>
                    <input
                      type="text"
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      placeholder="Internship opportunity / Full-stack project discussion"
                      className="w-full px-4 py-2.5 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-mono text-slate-300 block">Message *</label>
                    <textarea
                      required
                      rows={5}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Hi Bhavneet, I saw your portfolio and would like to discuss..."
                      className="w-full px-4 py-2.5 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 rounded-xl bg-gradient-to-r from-indigo-600 via-indigo-500 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-bold text-xs shadow-lg shadow-indigo-600/25 hover:shadow-indigo-600/40 transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Send className="w-4 h-4" />
                    <span>Send Message to Bhavneet</span>
                  </button>
                </form>
              )}

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
