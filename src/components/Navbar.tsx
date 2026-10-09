import React, { useState } from 'react';
import { 
  Compass, 
  MapPin, 
  Sparkles, 
  Scale, 
  AlertTriangle, 
  BarChart3, 
  Info, 
  PlusCircle, 
  Menu, 
  X,
  Search,
  CloudSun,
  Globe
} from 'lucide-react';
import { CityConfig, WeatherData, Language } from '../types';
import { CITIES } from '../data/cities';
import { useLanguage } from '../i18n/LanguageContext';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  selectedCity: CityConfig;
  setSelectedCity: (city: CityConfig) => void;
  weather: WeatherData | null;
  comparedCount: number;
  openReportModal: () => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  selectedCity,
  setSelectedCity,
  weather,
  comparedCount,
  openReportModal,
  searchQuery,
  setSearchQuery
}) => {
  const { t, language, setLanguage } = useLanguage();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'explore', label: t.navExplore, icon: Compass },
    { id: 'planner', label: t.navPlanner, icon: Sparkles, badge: 'Smart' },
    { id: 'compare', label: t.navCompare, icon: Scale, count: comparedCount },
    { id: 'reports', label: t.navReports, icon: AlertTriangle },
    { id: 'insights', label: t.navInsights, icon: BarChart3 },
    { id: 'about', label: t.navAbout, icon: Info }
  ];

  const languages: { code: Language; label: string; short: string }[] = [
    { code: 'en', label: 'English', short: 'EN' },
    { code: 'mr', label: 'मराठी', short: 'मराठी' },
    { code: 'hi', label: 'हिंदी', short: 'हिंदी' }
  ];

  return (
    <header className="sticky top-0 z-40 bg-[#0A1128]/95 backdrop-blur-md border-b border-slate-800 text-slate-100 transition-all">
      {/* Top Banner / Disclaimer Pill */}
      <div className="bg-slate-900/90 text-xs text-slate-400 py-1 px-4 border-b border-slate-800/60 flex items-center justify-between">
        <div className="flex items-center gap-2 overflow-hidden text-ellipsis whitespace-nowrap">
          <span className="inline-block w-2 h-2 rounded-full bg-teal-400 animate-pulse"></span>
          <span className="font-medium text-slate-300">{t.prototypeBanner}</span>
          <span className="text-slate-400 hidden sm:inline">{t.prototypeBannerSub}</span>
        </div>
        <div className="flex items-center gap-3 shrink-0">
          <span className="text-[11px] text-amber-400/90 bg-amber-950/40 px-2 py-0.5 rounded border border-amber-800/40 font-mono">
            {t.unverifiedBadge}
          </span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-3 sm:gap-4">
          
          {/* Brand Logo & Tagline */}
          <div className="flex items-center gap-3 shrink-0 cursor-pointer" onClick={() => setActiveTab('explore')}>
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-teal-500 to-teal-700 flex items-center justify-center shadow-lg shadow-teal-900/40 text-white border border-teal-400/30">
              <Compass className="w-6 h-6 animate-[spin_20s_linear_infinite]" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-lg font-bold tracking-tight text-white font-['Plus_Jakarta_Sans']">
                  {t.appName} <span className="text-teal-400 text-xs px-1.5 py-0.5 rounded-full bg-teal-950/60 border border-teal-800/60 font-mono">AI</span>
                </span>
              </div>
              <p className="text-[11px] text-slate-400 hidden lg:block">
                {t.tagline}
              </p>
            </div>
          </div>

          {/* City Selector Pill */}
          <div className="hidden lg:flex items-center gap-2 bg-slate-900/80 border border-slate-700/60 rounded-lg px-2.5 py-1.5 text-xs">
            <MapPin className="w-3.5 h-3.5 text-teal-400 shrink-0" />
            <select
              value={selectedCity.id}
              onChange={(e) => {
                const found = CITIES.find(c => c.id === e.target.value);
                if (found) setSelectedCity(found);
              }}
              className="bg-transparent text-slate-200 font-semibold focus:outline-none cursor-pointer pr-1"
            >
              {CITIES.map(c => (
                <option key={c.id} value={c.id} className="bg-slate-900 text-slate-200">
                  {c.name}, {c.state} {c.id === 'pune' ? '(Full Dataset)' : '(Preview)'}
                </option>
              ))}
            </select>
          </div>

          {/* Language Switcher Pill (EN | MR | HI) */}
          <div className="flex items-center bg-slate-900/90 border border-slate-700/80 rounded-lg p-1 text-xs gap-0.5 shrink-0 shadow-sm">
            <Globe className="w-3.5 h-3.5 text-teal-400 ml-1 mr-1 hidden sm:inline shrink-0" />
            {languages.map((l) => (
              <button
                key={l.code}
                onClick={() => setLanguage(l.code)}
                className={`px-2 py-1 rounded text-xs font-semibold transition ${
                  language === l.code
                    ? 'bg-teal-500 text-slate-950 shadow-sm'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
                title={`Switch language to ${l.label}`}
              >
                {l.short}
              </button>
            ))}
          </div>

          {/* Live Weather Widget */}
          {weather && (
            <div 
              onClick={() => setActiveTab('insights')}
              className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-900/60 border border-slate-800 hover:border-slate-700 transition cursor-pointer text-xs"
              title="Click to view full meteorological breakdown"
            >
              <CloudSun className="w-4 h-4 text-amber-400" />
              <span className="font-semibold text-slate-200">{weather.temperature}°C</span>
              <span className="text-slate-400 border-l border-slate-700 pl-2 hidden 2xl:inline">{weather.conditionText}</span>
              {weather.isLive ? (
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" title="Live meteorological feed"></span>
              ) : (
                <span className="text-[10px] text-slate-500 font-mono">REF</span>
              )}
            </div>
          )}

          {/* Search Input Bar */}
          <div className="flex-1 max-w-xs relative hidden sm:block">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={t.searchPlaceholder}
              className="w-full bg-slate-900/90 border border-slate-700/70 rounded-lg pl-9 pr-4 py-1.5 text-xs text-slate-200 placeholder-slate-400 focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500 transition"
            />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white text-xs"
              >
                ✕
              </button>
            )}
          </div>

          {/* Desktop Navigation Items */}
          <nav className="hidden xl:flex items-center gap-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium transition-all ${
                    isActive
                      ? 'bg-teal-500/15 text-teal-300 border border-teal-500/30 shadow-sm'
                      : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-teal-400' : 'text-slate-400'}`} />
                  <span>{item.label}</span>
                  {item.badge && (
                    <span className="text-[10px] px-1 py-0.2 bg-teal-900/80 text-teal-300 rounded font-mono border border-teal-700/40">
                      {item.badge}
                    </span>
                  )}
                  {typeof item.count === 'number' && item.count > 0 && (
                    <span className="text-[10px] px-1.5 py-0.2 bg-orange-500/80 text-white rounded-full font-bold">
                      {item.count}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>

          {/* Primary Action Button: Report Issue */}
          <div className="flex items-center gap-2">
            <button
              onClick={openReportModal}
              className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-orange-600 hover:bg-orange-500 active:bg-orange-700 text-white text-xs font-semibold shadow-md shadow-orange-950/40 transition border border-orange-400/30 shrink-0"
            >
              <PlusCircle className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">{t.reportIssueBtn}</span>
              <span className="sm:hidden">Report</span>
            </button>

            {/* Mobile Menu Toggle Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="xl:hidden p-2 rounded-lg bg-slate-800 text-slate-300 hover:text-white focus:outline-none"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Navigation Dropdown Drawer */}
      {mobileMenuOpen && (
        <div className="xl:hidden bg-[#0A1128] border-b border-slate-800 px-4 pt-2 pb-4 space-y-2">
          {/* Mobile Search */}
          <div className="relative mb-3 sm:hidden">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={t.searchPlaceholder}
              className="w-full bg-slate-900 border border-slate-700 rounded-lg pl-9 pr-3 py-2 text-xs text-slate-200 placeholder-slate-400"
            />
          </div>

          <div className="grid grid-cols-2 gap-2 mb-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveTab(item.id);
                    setMobileMenuOpen(false);
                  }}
                  className={`flex items-center gap-2 p-2.5 rounded-lg text-xs font-medium text-left transition ${
                    isActive
                      ? 'bg-teal-500/20 text-teal-300 border border-teal-500/40'
                      : 'bg-slate-900 text-slate-300 hover:bg-slate-800'
                  }`}
                >
                  <Icon className="w-4 h-4 text-teal-400 shrink-0" />
                  <span className="truncate">{item.label}</span>
                  {typeof item.count === 'number' && item.count > 0 && (
                    <span className="ml-auto text-[10px] px-1.5 py-0.2 bg-orange-500 text-white rounded-full">
                      {item.count}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* City selector in mobile */}
          <div className="pt-2 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
            <span>{t.cityFocus}</span>
            <select
              value={selectedCity.id}
              onChange={(e) => {
                const found = CITIES.find(c => c.id === e.target.value);
                if (found) setSelectedCity(found);
              }}
              className="bg-slate-800 text-slate-200 px-2 py-1 rounded border border-slate-700 font-medium"
            >
              {CITIES.map(c => (
                <option key={c.id} value={c.id}>{c.name} ({c.state})</option>
              ))}
            </select>
          </div>
        </div>
      )}
    </header>
  );
};
