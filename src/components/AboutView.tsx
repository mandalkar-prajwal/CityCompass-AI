import React from 'react';
import { 
  Info, 
  ShieldCheck, 
  Database, 
  AlertTriangle, 
  Compass, 
  Code2
} from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';

export const AboutView: React.FC = () => {
  const { t } = useLanguage();

  return (
    <div className="space-y-8 max-w-4xl mx-auto text-slate-200">
      
      {/* Header Banner */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-slate-900 via-slate-900 to-slate-800 border border-slate-800 p-6 sm:p-8 shadow-xl">
        <div className="relative z-10 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-500/10 border border-teal-500/30 text-teal-300 text-xs font-semibold">
            <Info className="w-3.5 h-3.5" />
            <span>Honest Engineering & Data Ethics</span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
            {t.navAbout}
          </h1>

          <p className="text-sm text-slate-300 leading-relaxed">
            CityCompass AI is built on transparency: distinguishing real-time telemetry from curated demo registries, providing coordinate-based route sequencing, and upholding strict safety reporting guidelines.
          </p>
        </div>
      </div>

      {/* Grid of Principles */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Card 1: Live APIs vs Curated Data */}
        <div className="bg-slate-900/90 rounded-2xl border border-slate-800 p-6 space-y-3 shadow-lg">
          <div className="flex items-center gap-2.5 text-teal-400">
            <Database className="w-5 h-5" />
            <h2 className="font-bold text-base text-white">Live vs Demonstration Data</h2>
          </div>
          <ul className="space-y-2 text-xs text-slate-300 leading-relaxed">
            <li className="flex items-start gap-2">
              <span className="text-emerald-400 font-bold">✓ Live API:</span>
              <span><strong>Open-Meteo:</strong> Fetches live temperature, weather codes, and precipitation with zero API key dependencies.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-emerald-400 font-bold">✓ Live API:</span>
              <span><strong>CartoDB / OpenStreetMap:</strong> Live map tile delivery rendered using Leaflet.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-amber-400 font-bold">ℹ Curated Registry:</span>
              <span><strong>Pune Places:</strong> Curated from verified records (ASI, MTDC, PMRCL), accurately located with genuine coordinates and honest pricing.</span>
            </li>
          </ul>
        </div>

        {/* Card 2: No Fabricated Safety Scores */}
        <div className="bg-slate-900/90 rounded-2xl border border-slate-800 p-6 space-y-3 shadow-lg">
          <div className="flex items-center gap-2.5 text-amber-400">
            <ShieldCheck className="w-5 h-5" />
            <h2 className="font-bold text-base text-white">{t.safetyProtocolTitle}</h2>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed">
            {t.safetyProtocolDesc}
          </p>
        </div>

        {/* Card 3: Community Submissions & Local Storage */}
        <div className="bg-slate-900/90 rounded-2xl border border-slate-800 p-6 space-y-3 shadow-lg">
          <div className="flex items-center gap-2.5 text-teal-400">
            <AlertTriangle className="w-5 h-5 text-amber-400" />
            <h2 className="font-bold text-base text-white">{t.localStorageNoticeTitle}</h2>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed">
            {t.localStorageNoticeDesc}
          </p>
          <ul className="space-y-1.5 text-xs text-slate-400 pt-1">
            <li>• Photo uploads are client-compressed (~35-50 KB) to respect browser quotas.</li>
            <li>• New submissions are pinned directly on the interactive map.</li>
            <li>• Community members can affirm whether an issue is currently active.</li>
            <li>• Clearly stated: <strong>Not an emergency service dispatch.</strong></li>
          </ul>
        </div>

        {/* Card 4: Architecture & Stack */}
        <div className="bg-slate-900/90 rounded-2xl border border-slate-800 p-6 space-y-3 shadow-lg">
          <div className="flex items-center gap-2.5 text-teal-400">
            <Code2 className="w-5 h-5" />
            <h2 className="font-bold text-base text-white">Technical Architecture</h2>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed">
            Crafted for lightning-fast performance, offline resilience, and zero runtime failures:
          </p>
          <div className="flex flex-wrap gap-2 pt-1 text-xs">
            <span className="px-2.5 py-1 bg-slate-950 rounded-lg border border-slate-800 text-teal-300 font-mono">React 18</span>
            <span className="px-2.5 py-1 bg-slate-950 rounded-lg border border-slate-800 text-teal-300 font-mono">TypeScript</span>
            <span className="px-2.5 py-1 bg-slate-950 rounded-lg border border-slate-800 text-teal-300 font-mono">Vite</span>
            <span className="px-2.5 py-1 bg-slate-950 rounded-lg border border-slate-800 text-teal-300 font-mono">Tailwind CSS</span>
            <span className="px-2.5 py-1 bg-slate-950 rounded-lg border border-slate-800 text-teal-300 font-mono">Leaflet & CartoDB</span>
            <span className="px-2.5 py-1 bg-slate-950 rounded-lg border border-slate-800 text-teal-300 font-mono">Open-Meteo API</span>
            <span className="px-2.5 py-1 bg-slate-950 rounded-lg border border-slate-800 text-teal-300 font-mono">Haversine Route Engine</span>
          </div>
        </div>

      </div>

      {/* Footer attribution */}
      <div className="p-6 rounded-2xl bg-slate-950 border border-slate-800 text-center space-y-2">
        <div className="flex items-center justify-center gap-2 text-sm font-bold text-white">
          <Compass className="w-4 h-4 text-teal-400" />
          <span>CityCompass AI</span>
        </div>
        <p className="text-xs text-slate-400">
          Built with care for urban travelers, students, and citizens navigating the chaos we call home.
        </p>
      </div>

    </div>
  );
};
