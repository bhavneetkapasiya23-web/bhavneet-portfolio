import React, { useState } from 'react';
import { projects } from '../data/portfolioData';
import { Project } from '../types';
import { 
  FolderGit2, 
  ExternalLink, 
  Github, 
  Sparkles, 
  Layers, 
  CheckCircle2, 
  Activity, 
  ArrowRight,
  Code2,
  Calendar,
  Play
} from 'lucide-react';

interface ProjectsSectionProps {
  onOpenStockDemo: () => void;
  onOpenAIBuilderDemo: () => void;
}

export const ProjectsSection: React.FC<ProjectsSectionProps> = ({ 
  onOpenStockDemo, 
  onOpenAIBuilderDemo 
}) => {
  const [activeFilter, setActiveFilter] = useState<'All' | 'Full-Stack' | 'AI & ML' | 'Real-Time'>('All');
  const [selectedProjectModal, setSelectedProjectModal] = useState<Project | null>(null);

  const filteredProjects = activeFilter === 'All' 
    ? projects 
    : projects.filter(p => p.category === activeFilter);

  return (
    <section id="projects" className="py-20 bg-[#090d16] relative border-t border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-500/10 border border-sky-500/20 text-sky-400 text-xs font-mono font-medium">
            <FolderGit2 className="w-3.5 h-3.5" />
            <span>PORTFOLIO SHOWCASE</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Featured <span className="bg-gradient-to-r from-sky-400 via-indigo-300 to-purple-400 bg-clip-text text-transparent">Engineering Projects</span>
          </h2>
          <p className="text-slate-400 text-base">
            End-to-end applications designed for performance, AI integration, scalability, and robust user experience.
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex items-center justify-center gap-2 mb-12 flex-wrap">
          {(['All', 'Full-Stack', 'Real-Time', 'AI & ML'] as const).map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                activeFilter === filter
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                  : 'bg-slate-900/80 text-slate-400 hover:text-white hover:bg-slate-800 border border-slate-800'
              }`}
            >
              {filter} Projects
            </button>
          ))}
        </div>

        {/* Projects Cards Grid */}
        <div className="space-y-12">
          {filteredProjects.map((project, index) => {
            const isEven = index % 2 === 0;

            return (
              <div 
                key={project.id}
                id={`project-card-${project.id}`}
                className="bg-[#0c101d] border border-slate-800/90 hover:border-slate-700/80 rounded-3xl overflow-hidden shadow-2xl transition-all duration-300 group"
              >
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 items-center">
                  
                  {/* Image & Preview Column */}
                  <div className={`lg:col-span-6 p-5 sm:p-7 ${isEven ? 'lg:order-1' : 'lg:order-2'}`}>
                    <div className="relative rounded-2xl overflow-hidden border border-slate-700/60 shadow-xl aspect-[16/10] bg-slate-900 group">
                      <img 
                        src={project.image} 
                        alt={project.title}
                        className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0c101d] via-transparent to-transparent opacity-40" />
                      
                      {/* Floating Status & Year Badge */}
                      <div className="absolute top-4 left-4 flex items-center gap-2">
                        <span className="px-3 py-1 rounded-full bg-slate-900/90 backdrop-blur-md border border-slate-700 text-xs font-mono font-medium text-white flex items-center gap-1.5">
                          <Calendar className="w-3.5 h-3.5 text-indigo-400" />
                          {project.year}
                        </span>
                        {project.status === 'In Progress' && (
                          <span className="px-2.5 py-1 rounded-full bg-amber-500/20 border border-amber-500/40 text-[11px] font-mono text-amber-300 font-semibold flex items-center gap-1">
                            <Activity className="w-3 h-3 animate-spin" />
                            In Progress
                          </span>
                        )}
                        {project.status === 'Completed' && (
                          <span className="px-2.5 py-1 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-[11px] font-mono text-emerald-300 font-semibold flex items-center gap-1">
                            <CheckCircle2 className="w-3 h-3" />
                            Shipped
                          </span>
                        )}
                      </div>

                      {/* Interactive demo quick hover trigger */}
                      <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3 p-4">
                        {project.id === 'real-time-stock-dashboard' && (
                          <button
                            onClick={onOpenStockDemo}
                            className="px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold flex items-center gap-2 shadow-lg cursor-pointer transform translate-y-2 group-hover:translate-y-0 transition-transform"
                          >
                            <Play className="w-4 h-4 fill-white" />
                            <span>Launch Live Simulator</span>
                          </button>
                        )}
                        {project.id === 'ai-website-builder' && (
                          <a
                            href={project.liveDemoUrl || 'https://ai-site-builder-2tq6.vercel.app/'}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-4 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold flex items-center gap-2 shadow-lg cursor-pointer transform translate-y-2 group-hover:translate-y-0 transition-transform"
                          >
                            <ExternalLink className="w-4 h-4" />
                            <span>Visit Live Website</span>
                          </a>
                        )}
                        <button
                          onClick={() => setSelectedProjectModal(project)}
                          className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium border border-slate-600 flex items-center gap-1.5 cursor-pointer transform translate-y-2 group-hover:translate-y-0 transition-transform"
                        >
                          <Code2 className="w-4 h-4" />
                          <span>Deep Dive</span>
                        </button>
                      </div>

                    </div>
                  </div>

                  {/* Details Column */}
                  <div className={`lg:col-span-6 p-6 sm:p-8 space-y-4 ${isEven ? 'lg:order-2' : 'lg:order-1'}`}>
                    
                    {/* Category & Title */}
                    <div>
                      <span className="text-xs font-mono uppercase tracking-wider text-indigo-400 font-semibold">
                        {project.category} Architecture
                      </span>
                      <h3 className="text-2xl sm:text-3xl font-extrabold text-white group-hover:text-indigo-200 transition-colors mt-1">
                        {project.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-slate-400 font-mono mt-0.5">
                        {project.subtitle}
                      </p>
                    </div>

                    {/* Short Description */}
                    <p className="text-slate-300 text-sm leading-relaxed">
                      {project.description}
                    </p>

                    {/* Resume Key Highlights Checklist */}
                    <div className="space-y-2 pt-1">
                      {project.highlights.slice(0, 3).map((highlight, hIdx) => (
                        <div key={hIdx} className="flex items-start gap-2.5 text-xs text-slate-300 leading-snug">
                          <CheckCircle2 className="w-4 h-4 text-indigo-400 shrink-0 mt-0.5" />
                          <span>{highlight}</span>
                        </div>
                      ))}
                    </div>

                    {/* Tech Stack Tags */}
                    <div className="pt-2">
                      <p className="text-[11px] font-mono text-slate-400 mb-2">Technologies Used:</p>
                      <div className="flex flex-wrap gap-1.5">
                        {project.techStack.map((tech) => (
                          <span 
                            key={tech}
                            className="px-2.5 py-1 rounded-lg text-xs font-mono font-medium bg-slate-900 text-slate-300 border border-slate-800"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-wrap items-center gap-3 pt-3">
                      {project.id === 'real-time-stock-dashboard' && (
                        <button
                          onClick={onOpenStockDemo}
                          className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold transition-colors shadow-md shadow-indigo-600/25 cursor-pointer"
                        >
                          <Play className="w-3.5 h-3.5 fill-white" />
                          <span>Live Dashboard Demo</span>
                        </button>
                      )}

                      {project.id === 'ai-website-builder' && (
                        <>
                          <a
                            href={project.liveDemoUrl || 'https://ai-site-builder-2tq6.vercel.app/'}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold transition-all shadow-md shadow-purple-600/30 cursor-pointer"
                          >
                            <ExternalLink className="w-3.5 h-3.5" />
                            <span>Live Demo (Actual Website)</span>
                          </a>

                          <button
                            onClick={onOpenAIBuilderDemo}
                            className="flex items-center gap-1.5 px-3 py-2.5 rounded-xl bg-purple-950/50 hover:bg-purple-900/50 text-purple-300 border border-purple-800/60 text-xs font-medium transition-colors cursor-pointer"
                          >
                            <Sparkles className="w-3.5 h-3.5" />
                            <span>In-App Simulator</span>
                          </button>
                        </>
                      )}

                      <a
                        href={project.githubUrl || 'https://github.com/bhavneetkapasiya23'}
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-800 text-xs font-medium transition-colors"
                      >
                        <Github className="w-3.5 h-3.5" />
                        <span>Source Code</span>
                      </a>

                      <button
                        onClick={() => setSelectedProjectModal(project)}
                        className="flex items-center gap-1 px-3 py-2.5 rounded-xl text-slate-400 hover:text-white text-xs font-medium transition-colors cursor-pointer"
                      >
                        <span>Full Breakdown</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>

                  </div>

                </div>
              </div>
            );
          })}
        </div>

      </div>

      {/* Project Details Modal */}
      {selectedProjectModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
          <div className="relative w-full max-w-2xl bg-[#0c101d] border border-slate-700 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6 my-8 animate-in fade-in zoom-in-95 duration-200">
            
            {/* Modal Header */}
            <div className="flex items-start justify-between">
              <div>
                <span className="text-xs font-mono uppercase text-indigo-400 font-semibold">
                  {selectedProjectModal.category} • {selectedProjectModal.year}
                </span>
                <h3 className="text-2xl font-bold text-white mt-1">
                  {selectedProjectModal.title}
                </h3>
                <p className="text-xs text-slate-400 font-mono">
                  {selectedProjectModal.subtitle}
                </p>
              </div>
              <button
                onClick={() => setSelectedProjectModal(null)}
                className="p-2 rounded-full bg-slate-800 text-slate-400 hover:text-white border border-slate-700 cursor-pointer"
              >
                ✕
              </button>
            </div>

            {/* Modal Image */}
            <div className="rounded-2xl overflow-hidden border border-slate-700/80 aspect-video">
              <img 
                src={selectedProjectModal.image} 
                alt={selectedProjectModal.title}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Detailed description */}
            <div className="space-y-3">
              <h4 className="text-sm font-bold text-white">System Architecture & Overview</h4>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {selectedProjectModal.longDescription}
              </p>
            </div>

            {/* Highlights */}
            <div className="space-y-2">
              <h4 className="text-sm font-bold text-white">Key Engineering Highlights</h4>
              <div className="space-y-2">
                {selectedProjectModal.highlights.map((h, i) => (
                  <div key={i} className="flex items-start gap-2 text-xs sm:text-sm text-slate-300">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span>{h}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Tech Stack */}
            <div className="space-y-2">
              <h4 className="text-sm font-bold text-white">Technology Stack</h4>
              <div className="flex flex-wrap gap-2">
                {selectedProjectModal.techStack.map((tech) => (
                  <span key={tech} className="px-3 py-1 rounded-lg bg-slate-900 border border-slate-800 text-xs text-indigo-300 font-mono">
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Footer Buttons */}
            <div className="pt-4 border-t border-slate-800 flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                {selectedProjectModal.liveDemoUrl && !selectedProjectModal.liveDemoUrl.startsWith('#') && (
                  <a
                    href={selectedProjectModal.liveDemoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold shadow-md shadow-purple-600/30 transition-all"
                  >
                    <ExternalLink className="w-4 h-4" />
                    <span>Launch Live Demo</span>
                  </a>
                )}

                <a
                  href={selectedProjectModal.githubUrl || 'https://github.com/bhavneetkapasiya23'}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-900 text-slate-200 border border-slate-800 hover:bg-slate-800 text-xs font-semibold"
                >
                  <Github className="w-4 h-4" />
                  <span>View on GitHub</span>
                </a>
              </div>

              <button
                onClick={() => setSelectedProjectModal(null)}
                className="px-5 py-2 rounded-xl bg-slate-800 text-slate-200 hover:text-white border border-slate-700 text-xs font-semibold cursor-pointer"
              >
                Close Window
              </button>
            </div>

          </div>
        </div>
      )}
    </section>
  );
};
