import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { SkillsSection } from './components/SkillsSection';
import { ProjectsSection } from './components/ProjectsSection';
import { LiveDemosSection } from './components/LiveDemosSection';
import { EducationSection } from './components/EducationSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { ResumeModal } from './components/ResumeModal';
import { AIChatModal } from './components/AIChatModal';

export default function App() {
  const [resumeModalOpen, setResumeModalOpen] = useState(false);
  const [chatModalOpen, setChatModalOpen] = useState(false);

  const handleOpenStockDemo = () => {
    const el = document.getElementById('demos');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
    const tabBtn = document.getElementById('demo-tab-stock');
    if (tabBtn) {
      tabBtn.click();
    }
  };

  const handleOpenAIBuilderDemo = () => {
    const el = document.getElementById('demos');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
    const tabBtn = document.getElementById('demo-tab-ai-builder');
    if (tabBtn) {
      tabBtn.click();
    }
  };

  return (
    <div className="min-h-screen bg-[#080c14] text-slate-100 selection:bg-indigo-500/30 selection:text-indigo-200">
      
      {/* Navigation */}
      <Navbar 
        onOpenResume={() => setResumeModalOpen(true)}
        onOpenChat={() => setChatModalOpen(true)}
      />

      {/* Main Sections */}
      <main>
        <Hero 
          onOpenResume={() => setResumeModalOpen(true)}
          onOpenChat={() => setChatModalOpen(true)}
        />
        
        <About 
          onOpenResume={() => setResumeModalOpen(true)}
        />

        <SkillsSection />

        <ProjectsSection 
          onOpenStockDemo={handleOpenStockDemo}
          onOpenAIBuilderDemo={handleOpenAIBuilderDemo}
        />

        <LiveDemosSection />

        <EducationSection />

        <ContactSection />
      </main>

      {/* Footer */}
      <Footer 
        onOpenResume={() => setResumeModalOpen(true)}
        onOpenChat={() => setChatModalOpen(true)}
      />

      {/* Interactive Modals */}
      <ResumeModal 
        isOpen={resumeModalOpen}
        onClose={() => setResumeModalOpen(false)}
      />

      <AIChatModal 
        isOpen={chatModalOpen}
        onClose={() => setChatModalOpen(false)}
        onOpenResume={() => {
          setChatModalOpen(false);
          setResumeModalOpen(true);
        }}
      />

    </div>
  );
}
