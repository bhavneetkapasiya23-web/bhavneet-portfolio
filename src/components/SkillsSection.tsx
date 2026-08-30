import React, { useState } from 'react';
import { skillCategories } from '../data/portfolioData';
import { 
  Code, 
  Layout, 
  Server, 
  Database, 
  Brain, 
  Terminal, 
  Search, 
  Layers, 
  Check, 
  Sparkles 
} from 'lucide-react';

export const SkillsSection: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const getCategoryIcon = (iconName: string) => {
    switch (iconName) {
      case 'Code': return <Code className="w-5 h-5 text-indigo-400" />;
      case 'Layout': return <Layout className="w-5 h-5 text-purple-400" />;
      case 'Server': return <Server className="w-5 h-5 text-sky-400" />;
      case 'Database': return <Database className="w-5 h-5 text-emerald-400" />;
      case 'Brain': return <Brain className="w-5 h-5 text-rose-400" />;
      case 'Terminal': return <Terminal className="w-5 h-5 text-amber-400" />;
      default: return <Layers className="w-5 h-5 text-indigo-400" />;
    }
  };

  const filteredCategories = skillCategories.map(cat => {
    if (selectedCategory !== 'All' && cat.category !== selectedCategory) {
      return null;
    }
    const filteredSkills = cat.skills.filter(s => 
      s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.tags?.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()))
    );
    if (filteredSkills.length === 0 && searchQuery) return null;
    return { ...cat, skills: filteredSkills };
  }).filter(Boolean);

  const allCategoryNames = ['All', ...skillCategories.map(c => c.category)];

  return (
    <section id="skills" className="py-20 bg-[#080c14] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-xs font-mono font-medium">
            <Layers className="w-3.5 h-3.5" />
            <span>TECHNICAL EXPERTISE</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Skills & <span className="bg-gradient-to-r from-indigo-400 via-purple-300 to-sky-400 bg-clip-text text-transparent">Technology Stack</span>
          </h2>
          <p className="text-slate-400 text-base">
            Comprehensive toolkit spanning modern frontend frameworks, backend microservices, SQL databases, and AI model orchestration.
          </p>
        </div>

        {/* Filter & Search Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-10">
          
          {/* Category Tabs */}
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-1.5 p-1 bg-slate-900/80 border border-slate-800 rounded-2xl max-w-full overflow-x-auto">
            {allCategoryNames.map((catName) => (
              <button
                key={catName}
                onClick={() => setSelectedCategory(catName)}
                className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all whitespace-nowrap cursor-pointer ${
                  selectedCategory === catName
                    ? 'bg-indigo-600 text-white shadow-sm shadow-indigo-600/30'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
                }`}
              >
                {catName}
              </button>
            ))}
          </div>

          {/* Quick Search */}
          <div className="relative w-full md:w-64">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search skill (e.g. React, PostgreSQL)..."
              className="w-full pl-9 pr-4 py-2 bg-slate-900/90 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 transition-colors"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-white"
              >
                ✕
              </button>
            )}
          </div>
        </div>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCategories.map((category) => {
            if (!category) return null;
            return (
              <div 
                key={category.category}
                className="bg-[#0c101d] border border-slate-800/90 hover:border-slate-700 rounded-2xl p-6 transition-all duration-300 shadow-xl flex flex-col justify-between group"
              >
                <div>
                  {/* Category Header */}
                  <div className="flex items-center gap-3 mb-3">
                    <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 group-hover:border-indigo-500/30 transition-colors">
                      {getCategoryIcon(category.iconName)}
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-white group-hover:text-indigo-300 transition-colors">
                        {category.category}
                      </h3>
                      <p className="text-xs text-slate-400 line-clamp-1 font-mono">
                        {category.description}
                      </p>
                    </div>
                  </div>

                  {/* Skills List */}
                  <div className="space-y-3.5 mt-5">
                    {category.skills.map((skill) => (
                      <div 
                        key={skill.name}
                        className="bg-slate-900/60 border border-slate-800/60 rounded-xl p-3 hover:border-slate-700/80 transition-colors"
                      >
                        <div className="flex items-center justify-between mb-1.5">
                          <span className="text-xs font-semibold text-slate-200">
                            {skill.name}
                          </span>
                          <span className={`text-[10px] font-mono font-medium px-2 py-0.5 rounded-md border ${
                            skill.level === 'Advanced'
                              ? 'bg-indigo-500/10 text-indigo-300 border-indigo-500/20'
                              : skill.level === 'Specialization'
                              ? 'bg-purple-500/10 text-purple-300 border-purple-500/20'
                              : 'bg-sky-500/10 text-sky-300 border-sky-500/20'
                          }`}>
                            {skill.level}
                          </span>
                        </div>

                        {/* Skill Tags */}
                        {skill.tags && skill.tags.length > 0 && (
                          <div className="flex flex-wrap gap-1.5 mt-2">
                            {skill.tags.map((tag) => (
                              <span 
                                key={tag} 
                                className="text-[10px] text-slate-400 bg-slate-800/60 px-2 py-0.5 rounded font-mono"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Footer Count */}
                <div className="mt-5 pt-3 border-t border-slate-800/60 flex items-center justify-between text-[11px] text-slate-500 font-mono">
                  <span>{category.skills.length} core competencies</span>
                  <Sparkles className="w-3.5 h-3.5 text-indigo-400/60" />
                </div>
              </div>
            );
          })}
        </div>

        {/* CS Fundamentals & Architecture Banner */}
        <div className="mt-12 bg-gradient-to-r from-indigo-950/40 via-slate-900/80 to-purple-950/40 border border-slate-800 rounded-2xl p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center md:text-left">
            <h3 className="text-lg font-bold text-white flex items-center justify-center md:justify-start gap-2">
              <Brain className="w-5 h-5 text-purple-400" />
              <span>Computer Science & Engineering Foundation</span>
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 max-w-2xl">
              Trained in <strong>Data Structures and Algorithms</strong>, <strong>Object-Oriented Programming (OOP)</strong>, <strong>REST API Design</strong>, and <strong>Distributed System Principles</strong>.
            </p>
          </div>
          <a
            href="#projects"
            className="shrink-0 px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs transition-colors shadow-md shadow-indigo-600/20"
          >
            Explore Projects Using These Skills
          </a>
        </div>

      </div>
    </section>
  );
};
