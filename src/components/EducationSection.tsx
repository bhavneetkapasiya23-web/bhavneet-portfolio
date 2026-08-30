import React from 'react';
import { educationList, certifications } from '../data/portfolioData';
import { 
  GraduationCap, 
  Award, 
  BookOpen, 
  MapPin, 
  Calendar, 
  CheckCircle2, 
  ExternalLink,
  Sparkles,
  School
} from 'lucide-react';

export const EducationSection: React.FC = () => {
  return (
    <section id="education" className="py-20 bg-[#080c14] relative border-t border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-mono font-medium">
            <GraduationCap className="w-3.5 h-3.5" />
            <span>ACADEMIC & CREDENTIALS</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Education & <span className="bg-gradient-to-r from-emerald-400 via-teal-300 to-indigo-400 bg-clip-text text-transparent">Certifications</span>
          </h2>
          <p className="text-slate-400 text-base">
            Formal Computer Science engineering training in Artificial Intelligence alongside verified industry skill credentials.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Left Column: Education Timeline */}
          <div className="lg:col-span-7 space-y-6">
            <h3 className="text-xl font-bold text-white flex items-center gap-2.5">
              <School className="w-5 h-5 text-emerald-400" />
              <span>Academic Timeline</span>
            </h3>

            <div className="relative pl-6 space-y-8 before:absolute before:left-2.5 before:top-3 before:bottom-3 before:w-0.5 before:bg-gradient-to-b before:from-emerald-500 before:via-indigo-500 before:to-slate-800">
              {educationList.map((item, index) => (
                <div 
                  key={item.degree}
                  className="relative group bg-[#0c101d] border border-slate-800/90 hover:border-slate-700/90 rounded-2xl p-6 transition-all duration-300 shadow-xl"
                >
                  {/* Timeline node icon */}
                  <div className="absolute -left-[31px] top-6 w-5 h-5 rounded-full bg-[#0c101d] border-2 border-emerald-500 flex items-center justify-center shadow-md shadow-emerald-500/20 group-hover:scale-125 transition-transform">
                    <div className="w-2 h-2 rounded-full bg-emerald-400" />
                  </div>

                  <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                    <span className="text-xs font-mono font-semibold text-emerald-400 bg-emerald-500/10 px-2.5 py-0.5 rounded-full border border-emerald-500/20 flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {item.period}
                    </span>
                    {item.status && (
                      <span className="text-[11px] font-mono text-indigo-300 bg-indigo-500/10 px-2 py-0.5 rounded-md border border-indigo-500/20">
                        {item.status}
                      </span>
                    )}
                  </div>

                  <h4 className="text-base sm:text-lg font-bold text-white group-hover:text-emerald-300 transition-colors">
                    {item.degree}
                  </h4>

                  <p className="text-sm font-semibold text-slate-300 mt-1">
                    {item.institution}
                  </p>

                  <div className="flex items-center gap-1.5 text-xs text-slate-400 font-mono mt-1">
                    <MapPin className="w-3.5 h-3.5 text-rose-400" />
                    <span>{item.location}</span>
                  </div>

                  {item.details && item.details.length > 0 && (
                    <div className="mt-4 pt-3 border-t border-slate-800 space-y-1.5 text-xs text-slate-300">
                      {item.details.map((detail, dIdx) => (
                        <div key={dIdx} className="flex items-start gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                          <span>{detail}</span>
                        </div>
                      ))}
                    </div>
                  )}

                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Certifications & Competencies */}
          <div className="lg:col-span-5 space-y-6">
            <h3 className="text-xl font-bold text-white flex items-center gap-2.5">
              <Award className="w-5 h-5 text-indigo-400" />
              <span>Verified Certifications</span>
            </h3>

            <div className="space-y-4">
              {certifications.map((cert) => (
                <div 
                  key={cert.title}
                  className="bg-[#0c101d] border border-slate-800/90 hover:border-indigo-500/40 rounded-2xl p-5 shadow-xl transition-all group"
                >
                  <div className="flex items-start gap-3.5">
                    <div className="p-3 rounded-xl bg-indigo-500/10 border border-indigo-500/20 shrink-0 text-indigo-400 group-hover:bg-indigo-500/20 transition-colors">
                      <Award className="w-6 h-6" />
                    </div>
                    <div className="space-y-1">
                      <span className="text-[11px] font-mono font-semibold text-indigo-400 uppercase tracking-wider">
                        {cert.issuer}
                      </span>
                      <h4 className="text-base font-bold text-white group-hover:text-indigo-300 transition-colors">
                        {cert.title}
                      </h4>
                      <p className="text-xs text-slate-400 leading-relaxed pt-1">
                        {cert.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Coursework & Competency Summary Box */}
            <div className="bg-gradient-to-br from-slate-900 via-[#0c101d] to-indigo-950/30 border border-slate-800 rounded-2xl p-6 space-y-4 shadow-xl">
              <div className="flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-indigo-400" />
                <h4 className="text-sm font-bold text-white">Core Academic Coursework</h4>
              </div>
              <div className="grid grid-cols-2 gap-2 text-xs font-mono text-slate-300">
                <div className="p-2 rounded-lg bg-slate-900/80 border border-slate-800">• Artificial Intelligence</div>
                <div className="p-2 rounded-lg bg-slate-900/80 border border-slate-800">• Data Structures (DSA)</div>
                <div className="p-2 rounded-lg bg-slate-900/80 border border-slate-800">• OOP & Software Eng</div>
                <div className="p-2 rounded-lg bg-slate-900/80 border border-slate-800">• Database Systems (SQL)</div>
                <div className="p-2 rounded-lg bg-slate-900/80 border border-slate-800">• Computer Networks</div>
                <div className="p-2 rounded-lg bg-slate-900/80 border border-slate-800">• Web Architecture</div>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
