import React, { useState } from 'react';
import { 
  AlertTriangle, 
  PlusCircle, 
  ThumbsUp, 
  MapPin, 
  Clock, 
  Search,
  ShieldCheck,
  ImageIcon
} from 'lucide-react';
import { CommunityReport, ReportCategory, CityConfig } from '../types';
import { useLanguage } from '../i18n/LanguageContext';

interface ReportsViewProps {
  city: CityConfig;
  reports: CommunityReport[];
  upvotedReportIds: string[];
  onToggleUpvote: (reportId: string) => void;
  onOpenReportModal: () => void;
}

export const ReportsView: React.FC<ReportsViewProps> = ({
  city,
  reports,
  upvotedReportIds,
  onToggleUpvote,
  onOpenReportModal
}) => {
  const { t } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchFilter, setSearchFilter] = useState<string>('');
  const [selectedPhotoModal, setSelectedPhotoModal] = useState<string | null>(null);

  const categories: ReportCategory[] = [
    'Road Hazard',
    'Accident',
    'Cleanliness',
    'Accessibility Issue',
    'Crowding',
    'Street Lighting',
    'Other'
  ];

  const filteredReports = reports.filter(r => {
    if (selectedCategory !== 'all' && r.category !== selectedCategory) return false;
    if (searchFilter.trim()) {
      const q = searchFilter.toLowerCase();
      return (
        r.title.toLowerCase().includes(q) ||
        r.locationName.toLowerCase().includes(q) ||
        r.description.toLowerCase().includes(q)
      );
    }
    return true;
  });

  const getSeverityBadge = (severity: string) => {
    switch (severity) {
      case 'high':
        return 'bg-red-950/80 text-red-300 border-red-700/60';
      case 'moderate':
        return 'bg-amber-950/80 text-amber-300 border-amber-700/60';
      default:
        return 'bg-yellow-950/80 text-yellow-300 border-yellow-700/60';
    }
  };

  const getStatusLabel = (status: string) => {
    if (status === 'Unverified') return t.unverifiedStatus;
    if (status === 'Community Noted') return t.communityNotedStatus;
    if (status === 'Under Review') return t.underReviewStatus;
    return status;
  };

  return (
    <div className="space-y-8 max-w-6xl mx-auto">
      
      {/* Header Banner */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-amber-950/60 via-slate-900 to-slate-900 border border-amber-800/40 p-6 sm:p-8 shadow-xl">
        <div className="relative z-10 max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 border border-amber-500/40 text-amber-300 text-xs font-semibold">
            <AlertTriangle className="w-3.5 h-3.5 text-amber-400" />
            <span>Crowdsourced Civic Awareness • Photo Enabled</span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
            {t.reportsTitle}
          </h1>

          <p className="text-sm text-slate-300 leading-relaxed">
            {t.reportsSubtitle}
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-3">
            <button
              onClick={onOpenReportModal}
              className="px-4 py-2 bg-orange-600 hover:bg-orange-500 text-white text-xs font-bold rounded-xl shadow-lg shadow-orange-950/50 flex items-center gap-2 transition border border-orange-400/40"
            >
              <PlusCircle className="w-4 h-4" />
              <span>{t.submitNewReportBtn}</span>
            </button>
            <span className="text-xs text-slate-400">
              {reports.length} {t.activeNoticesLogged} ({city.name})
            </span>
          </div>
        </div>
      </div>

      {/* Persistence and Verification Disclaimer Banner */}
      <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 text-xs text-slate-400 space-y-2">
        <div className="flex items-center gap-2 text-slate-200 font-semibold">
          <AlertTriangle className="w-4 h-4 text-amber-400" />
          <span>{t.localStorageNoticeTitle}</span>
        </div>
        <p className="leading-relaxed">
          {t.localStorageNoticeDesc}
        </p>
      </div>

      {/* Filter and Search Bar */}
      <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 flex flex-wrap items-center justify-between gap-3 text-xs">
        
        {/* Category Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 max-w-full">
          <button
            onClick={() => setSelectedCategory('all')}
            className={`px-3 py-1.5 rounded-lg font-medium whitespace-nowrap transition border ${
              selectedCategory === 'all'
                ? 'bg-amber-500 text-slate-950 border-amber-400 font-bold'
                : 'bg-slate-950 text-slate-400 border-slate-800 hover:text-slate-200'
            }`}
          >
            {t.allReportsFilter} ({reports.length})
          </button>
          {categories.map(cat => {
            const count = reports.filter(r => r.category === cat).length;
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-lg font-medium whitespace-nowrap transition border ${
                  selectedCategory === cat
                    ? 'bg-amber-500 text-slate-950 border-amber-400 font-bold'
                    : 'bg-slate-950 text-slate-400 border-slate-800 hover:text-slate-200'
                }`}
              >
                {cat} ({count})
              </button>
            );
          })}
        </div>

        {/* Search within reports */}
        <div className="relative w-full sm:w-64">
          <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={searchFilter}
            onChange={(e) => setSearchFilter(e.target.value)}
            placeholder="Search reports or locations..."
            className="w-full bg-slate-950 border border-slate-800 rounded-lg pl-8 pr-3 py-1.5 text-xs text-slate-200 placeholder-slate-400 focus:outline-none focus:border-amber-500"
          />
        </div>

      </div>

      {/* Report Feed */}
      <div className="space-y-4">
        {filteredReports.length === 0 ? (
          <div className="p-12 text-center rounded-2xl bg-slate-900/60 border border-slate-800 space-y-3">
            <ShieldCheck className="w-12 h-12 text-slate-600 mx-auto" />
            <h3 className="font-bold text-lg text-slate-200">No reports found</h3>
            <p className="text-xs text-slate-400 max-w-sm mx-auto">
              No civic or road alerts matching this filter. You can submit the first report for this category.
            </p>
            <button
              onClick={onOpenReportModal}
              className="px-4 py-2 bg-amber-600 hover:bg-amber-500 text-white text-xs font-semibold rounded-lg shadow-md transition"
            >
              + {t.submitNewReportBtn}
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredReports.map(report => {
              const hasUpvoted = upvotedReportIds.includes(report.id);
              return (
                <div
                  key={report.id}
                  className="bg-slate-900/90 rounded-xl border border-slate-800 p-5 space-y-3 hover:border-slate-700 transition flex flex-col justify-between shadow-lg"
                >
                  <div className="space-y-2">
                    {/* Top Row: Category, Severity, Verification Status */}
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <div className="flex items-center gap-1.5">
                        <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-slate-800 text-amber-300 border border-slate-700">
                          {report.category}
                        </span>
                        <span className={`text-[10px] font-semibold px-2 py-0.5 rounded border uppercase font-mono ${getSeverityBadge(report.severity)}`}>
                          {report.severity === 'high' ? t.priorityHigh : report.severity === 'moderate' ? t.priorityModerate : t.priorityLow}
                        </span>
                      </div>

                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-950 text-slate-400 border border-slate-800">
                        {getStatusLabel(report.verificationStatus)}
                      </span>
                    </div>

                    {/* Report Title */}
                    <h3 className="font-bold text-base text-white tracking-tight">{report.title}</h3>

                    {/* Location & Timestamp */}
                    <div className="flex flex-wrap items-center gap-3 text-xs text-slate-400">
                      <span className="flex items-center gap-1 text-slate-300">
                        <MapPin className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                        <span className="font-medium">{report.locationName}</span>
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5 text-slate-500" />
                        <span>{report.timestamp}</span>
                      </span>
                    </div>

                    {/* Description */}
                    <p className="text-xs text-slate-300 leading-relaxed pt-1">
                      {report.description}
                    </p>

                    {/* Photo preview with click to zoom */}
                    {report.photoUrl && (
                      <div className="pt-2">
                        <div 
                          onClick={() => setSelectedPhotoModal(report.photoUrl || null)}
                          className="relative group rounded-xl overflow-hidden border border-slate-800 bg-slate-950 cursor-pointer h-36"
                        >
                          <img 
                            src={report.photoUrl} 
                            alt={report.title} 
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                          <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                            <span className="px-3 py-1 bg-slate-900/90 text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 border border-slate-700">
                              <ImageIcon className="w-3.5 h-3.5" />
                              <span>Click to enlarge photo</span>
                            </span>
                          </div>
                          {report.photoSizeKb && (
                            <span className="absolute bottom-1.5 right-1.5 text-[9px] bg-slate-900/80 text-slate-300 px-1.5 py-0.5 rounded font-mono border border-slate-800">
                              ~{report.photoSizeKb} KB
                            </span>
                          )}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Card Bottom: Upvoting / Affirmation Loop */}
                  <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs">
                    <div className="flex items-center gap-1 text-slate-400 text-[11px]">
                      {report.isLocalOnly && (
                        <span className="bg-slate-950 px-2 py-0.5 rounded text-[10px] border border-slate-800 font-mono">
                          Local Session
                        </span>
                      )}
                    </div>

                    <button
                      onClick={() => onToggleUpvote(report.id)}
                      className={`px-3 py-1.5 rounded-lg font-semibold flex items-center gap-1.5 transition text-xs border ${
                        hasUpvoted
                          ? 'bg-teal-600 text-white border-teal-500 shadow-sm'
                          : 'bg-slate-950 hover:bg-slate-800 text-slate-300 border-slate-800 hover:text-white'
                      }`}
                      title={hasUpvoted ? 'Remove affirmation' : 'Affirm that this issue is currently active'}
                    >
                      <ThumbsUp className={`w-3.5 h-3.5 ${hasUpvoted ? 'fill-current' : ''}`} />
                      <span>{report.upvotes} {hasUpvoted ? t.affirmedBtn : t.confirmActiveBtn}</span>
                    </button>
                  </div>

                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Photo Lightbox Modal */}
      {selectedPhotoModal && (
        <div 
          onClick={() => setSelectedPhotoModal(null)}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md animate-in fade-in"
        >
          <div className="relative max-w-2xl max-h-[85vh] bg-slate-900 rounded-2xl overflow-hidden border border-slate-700 p-2">
            <button
              onClick={() => setSelectedPhotoModal(null)}
              className="absolute top-4 right-4 p-2 rounded-full bg-slate-950/80 text-white hover:bg-slate-800 z-10"
            >
              ✕
            </button>
            <img 
              src={selectedPhotoModal} 
              alt="Hazard Full View" 
              className="max-h-[75vh] w-auto mx-auto object-contain rounded-xl"
            />
            <p className="text-center text-xs text-slate-400 pt-2 pb-1">
              User-uploaded citizen photo • Unverified community record
            </p>
          </div>
        </div>
      )}

    </div>
  );
};
