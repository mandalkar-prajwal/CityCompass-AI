import React from 'react';
import { 
  X, 
  MapPin, 
  Star, 
  Accessibility, 
  Sparkles, 
  Check, 
  Plus, 
  AlertTriangle, 
  ShieldCheck, 
  Info, 
  Bookmark
} from 'lucide-react';
import { Place, CommunityReport } from '../types';
import { useLanguage } from '../i18n/LanguageContext';

interface PlaceDetailModalProps {
  place: Place | null;
  onClose: () => void;
  isCompared: boolean;
  isBookmarked: boolean;
  onToggleCompare: (id: string) => void;
  onToggleBookmark: (id: string) => void;
  reports: CommunityReport[];
}

export const PlaceDetailModal: React.FC<PlaceDetailModalProps> = ({
  place,
  onClose,
  isCompared,
  isBookmarked,
  onToggleCompare,
  onToggleBookmark,
  reports
}) => {
  const { t } = useLanguage();
  if (!place) return null;

  // Find related reports for this place
  const relatedReports = reports.filter(r => 
    r.locationName.toLowerCase().includes(place.name.toLowerCase()) ||
    r.locationName.toLowerCase().includes(place.neighbourhood.toLowerCase()) ||
    place.address.toLowerCase().includes(r.locationName.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-200">
      
      {/* Click outside to close */}
      <div className="absolute inset-0" onClick={onClose} />

      {/* Modal Card */}
      <div className="relative w-full max-w-2xl max-h-[90vh] bg-slate-900 border border-slate-700/80 rounded-2xl shadow-2xl overflow-hidden flex flex-col z-10 text-slate-100">
        
        {/* Modal Image Header */}
        <div className="relative h-64 sm:h-72 w-full bg-slate-950 shrink-0">
          <img
            src={place.image}
            alt={place.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent" />

          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full bg-slate-900/80 hover:bg-slate-800 text-slate-300 hover:text-white transition border border-slate-700/80"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Header Badges */}
          <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between gap-3">
            <div>
              <div className="flex items-center gap-2 mb-1.5">
                <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-teal-500/20 text-teal-300 border border-teal-500/40 capitalize">
                  {place.category} • {place.subcategory}
                </span>
                <span className="text-xs font-mono font-semibold px-2 py-0.5 rounded bg-emerald-950/80 text-emerald-400 border border-emerald-800/40">
                  {place.priceLevel}
                </span>
              </div>
              <h2 className="text-2xl font-bold text-white tracking-tight">{place.name}</h2>
              <p className="text-xs text-slate-300 flex items-center gap-1 mt-1">
                <MapPin className="w-3.5 h-3.5 text-teal-400" />
                <span>{place.address}</span>
              </p>
            </div>

            {/* Rating pill */}
            {place.rating !== undefined && (
              <div className="bg-amber-950/80 border border-amber-700/60 rounded-xl px-3 py-1.5 text-center shrink-0">
                <div className="flex items-center gap-1 text-amber-300 font-bold text-sm">
                  <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                  <span>{place.rating}</span>
                </div>
                <div className="text-[10px] text-amber-400 font-mono">
                  {place.reviewCount ? `${place.reviewCount.toLocaleString()} reviews` : 'Verified'}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Modal Scrollable Content */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1 text-sm">
          
          {/* Quick Metrics Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-3.5 bg-slate-950/60 rounded-xl border border-slate-800 text-xs">
            <div>
              <span className="text-slate-400 text-[11px] block">{t.filterCost}</span>
              <span className="font-semibold text-emerald-300 mt-0.5 block">{place.estimatedCost}</span>
            </div>
            <div>
              <span className="text-slate-400 text-[11px] block">{t.metricHours}</span>
              <span className="font-semibold text-slate-200 mt-0.5 block">{place.openingHours}</span>
            </div>
            <div>
              <span className="text-slate-400 text-[11px] block">{t.metricCleanliness}</span>
              <span className="font-semibold text-cyan-300 mt-0.5 block flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5" />
                {place.cleanlinessRating ? `${place.cleanlinessRating} / 5.0` : 'Not Rated'}
              </span>
            </div>
            <div>
              <span className="text-slate-400 text-[11px] block">{t.metricAccessibility}</span>
              <span className="font-semibold text-teal-300 mt-0.5 block flex items-center gap-1">
                <Accessibility className="w-3.5 h-3.5" />
                {place.accessibility.wheelchairAccessible ? t.cardWheelchairReady : t.cardLimitedRamp}
              </span>
            </div>
          </div>

          {/* Description & Why Visit */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-teal-400 mb-1.5">Overview</h4>
            <p className="text-slate-300 leading-relaxed">{place.description}</p>
          </div>

          <div className="p-4 rounded-xl bg-teal-950/30 border border-teal-800/40">
            <h4 className="text-xs font-bold uppercase tracking-wider text-teal-300 mb-1 flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-teal-400" />
              {t.whyThisStop}
            </h4>
            <p className="text-slate-200 text-xs leading-relaxed">{place.whyVisit}</p>
          </div>

          {/* Popular Highlights Pills */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">{t.metricHighlights}</h4>
            <div className="flex flex-wrap gap-2">
              {place.popularFor.map((item, idx) => (
                <span key={idx} className="px-3 py-1 rounded-lg bg-slate-800 text-slate-200 border border-slate-700 text-xs font-medium">
                  ✨ {item}
                </span>
              ))}
            </div>
          </div>

          {/* Accessibility & Mobility Deep Dive */}
          <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 space-y-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
              <Accessibility className="w-4 h-4 text-teal-400" />
              {t.metricAccessibility}
            </h4>
            <p className="text-xs text-slate-300 leading-relaxed">
              {place.accessibility.notes}
            </p>
            <div className="flex items-center gap-4 pt-1 text-[11px] text-slate-400">
              <span className={place.accessibility.wheelchairAccessible ? 'text-teal-400' : 'text-slate-500'}>
                • {place.accessibility.wheelchairAccessible ? 'Verified step-free access' : 'Steps / uneven terrain present'}
              </span>
              <span className={place.accessibility.lowWalkingRequired ? 'text-teal-400' : 'text-slate-400'}>
                • {place.accessibility.lowWalkingRequired ? 'Low walking required' : 'Moderate to high terrain'}
              </span>
            </div>
          </div>

          {/* Nearby Community Reports */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2 flex items-center justify-between">
              <span>{t.metricSafetyNotices}</span>
              <span className="text-[11px] text-slate-500 font-normal">
                {relatedReports.length} {t.cardCommunityNotices}
              </span>
            </h4>

            {relatedReports.length > 0 ? (
              <div className="space-y-2">
                {relatedReports.map((rep) => (
                  <div key={rep.id} className="p-3 rounded-lg bg-amber-950/20 border border-amber-800/40 text-xs space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-amber-300 flex items-center gap-1">
                        <AlertTriangle className="w-3.5 h-3.5" />
                        {rep.category}: {rep.title}
                      </span>
                      <span className="text-[10px] text-amber-400/80 font-mono bg-amber-900/40 px-1.5 py-0.2 rounded">
                        {rep.verificationStatus}
                      </span>
                    </div>
                    <p className="text-slate-300 text-[11px]">{rep.description}</p>
                    <span className="text-[10px] text-slate-500 block">Reported: {rep.timestamp}</span>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-3 rounded-lg bg-slate-950/40 border border-slate-800/80 text-xs flex items-center gap-2 text-slate-400">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>{t.cardNoHazards}</span>
              </div>
            )}
          </div>

          {/* Data Transparency & Source Badge */}
          <div className="p-3 rounded-lg bg-slate-950 border border-slate-800 text-[11px] text-slate-400 flex items-start gap-2">
            <Info className="w-4 h-4 text-teal-400 shrink-0 mt-0.5" />
            <div>
              <span className="font-medium text-slate-300">Verified Curation Source: </span>
              <span>{place.curationSource}.</span>
              <p className="text-[10px] text-slate-500 mt-0.5">
                CityCompass AI does not claim absolute safety. Always practice common urban precautions.
              </p>
            </div>
          </div>

        </div>

        {/* Modal Footer Actions */}
        <div className="p-4 bg-slate-950/80 border-t border-slate-800 flex items-center justify-between gap-3 shrink-0">
          <div className="flex items-center gap-2">
            <button
              onClick={() => onToggleBookmark(place.id)}
              className={`px-3 py-2 rounded-lg text-xs font-semibold flex items-center gap-1.5 border transition ${
                isBookmarked 
                  ? 'bg-amber-500/20 text-amber-300 border-amber-500/50' 
                  : 'bg-slate-800 text-slate-300 border-slate-700 hover:text-white'
              }`}
            >
              <Bookmark className="w-3.5 h-3.5 fill-current" />
              <span>{isBookmarked ? t.cardSaved : t.cardSave}</span>
            </button>

            <button
              onClick={() => onToggleCompare(place.id)}
              className={`px-3 py-2 rounded-lg text-xs font-semibold flex items-center gap-1.5 border transition ${
                isCompared
                  ? 'bg-teal-600 text-white border-teal-500'
                  : 'bg-slate-800 text-teal-400 border-slate-700 hover:bg-slate-700'
              }`}
            >
              {isCompared ? <Check className="w-3.5 h-3.5" /> : <Plus className="w-3.5 h-3.5" />}
              <span>{isCompared ? t.cardAdded : t.cardCompare}</span>
            </button>
          </div>

          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium border border-slate-700"
          >
            {t.cancelBtn}
          </button>
        </div>

      </div>

    </div>
  );
};
