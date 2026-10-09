import React from 'react';
import { 
  Star, 
  MapPin, 
  Accessibility, 
  Sparkles, 
  Plus, 
  Check, 
  AlertTriangle, 
  ShieldCheck, 
  Bookmark,
  ExternalLink
} from 'lucide-react';
import { Place } from '../types';
import { useLanguage } from '../i18n/LanguageContext';

interface PlaceCardProps {
  place: Place;
  isCompared: boolean;
  isBookmarked: boolean;
  onToggleCompare: (id: string) => void;
  onToggleBookmark: (id: string) => void;
  onSelectPlace: (place: Place) => void;
  onLocateOnMap?: (place: Place) => void;
}

export const PlaceCard: React.FC<PlaceCardProps> = ({
  place,
  isCompared,
  isBookmarked,
  onToggleCompare,
  onToggleBookmark,
  onSelectPlace,
  onLocateOnMap
}) => {
  const { t, language } = useLanguage();

  const getCategoryColor = (cat: string) => {
    switch (cat) {
      case 'heritage': return 'bg-amber-950/70 text-amber-300 border-amber-700/50';
      case 'food': return 'bg-orange-950/70 text-orange-300 border-orange-700/50';
      case 'attractions': return 'bg-teal-950/70 text-teal-300 border-teal-700/50';
      case 'stays': return 'bg-indigo-950/70 text-indigo-300 border-indigo-700/50';
      case 'budget': return 'bg-emerald-950/70 text-emerald-300 border-emerald-700/50';
      case 'accessibility': return 'bg-sky-950/70 text-sky-300 border-sky-700/50';
      default: return 'bg-slate-800 text-slate-300 border-slate-700';
    }
  };

  const getTranslatedCategory = (cat: string) => {
    switch (cat) {
      case 'heritage': return t.catHeritage;
      case 'food': return t.catFood;
      case 'attractions': return t.catAttractions;
      case 'stays': return t.catStays;
      case 'budget': return t.catBudget;
      case 'accessibility': return t.catAccessibility;
      default: return cat;
    }
  };

  return (
    <div className="group bg-slate-900/90 rounded-xl border border-slate-800 hover:border-slate-700 transition-all duration-300 flex flex-col overflow-hidden hover:shadow-xl hover:shadow-black/40 hover:-translate-y-0.5">
      
      {/* Top Image & Overlay Badges */}
      <div className="relative h-44 w-full overflow-hidden bg-slate-950">
        <img
          src={place.image}
          alt={place.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
          onError={(e) => {
            (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=800&q=80';
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />

        {/* Category Badge */}
        <div className="absolute top-3 left-3 flex items-center gap-1.5">
          <span className={`text-[11px] font-semibold px-2.5 py-0.5 rounded-full border backdrop-blur-md ${getCategoryColor(place.category)}`}>
            {getTranslatedCategory(place.category)}
          </span>
          {place.priceLevel === 'Free' && (
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/90 text-white shadow-sm">
              {t.cardFreeEntry}
            </span>
          )}
        </div>

        {/* Compare & Bookmark Buttons on Image */}
        <div className="absolute top-3 right-3 flex items-center gap-1.5">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onToggleBookmark(place.id);
            }}
            className={`p-1.5 rounded-lg backdrop-blur-md transition border ${
              isBookmarked 
                ? 'bg-amber-500 text-slate-950 border-amber-400' 
                : 'bg-slate-900/80 text-slate-300 border-slate-700/60 hover:text-white hover:bg-slate-800'
            }`}
            title={isBookmarked ? t.cardSaved : t.cardSave}
          >
            <Bookmark className="w-3.5 h-3.5 fill-current" />
          </button>
        </div>

        {/* Price & Neighbourhood overlay at bottom of image */}
        <div className="absolute bottom-2 left-3 right-3 flex items-center justify-between text-xs">
          <div className="flex items-center gap-1 text-slate-300 font-medium truncate">
            <MapPin className="w-3.5 h-3.5 text-teal-400 shrink-0" />
            <span className="truncate">{place.neighbourhood}</span>
          </div>
          <span className="font-semibold text-emerald-400 font-mono bg-slate-900/80 px-2 py-0.5 rounded border border-slate-700/60 shrink-0">
            {place.priceLevel}
          </span>
        </div>
      </div>

      {/* Card Content Body */}
      <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
        <div>
          {/* Title & Subcategory */}
          <div className="flex items-start justify-between gap-2">
            <div>
              <h3 
                onClick={() => onSelectPlace(place)}
                className="font-bold text-base text-slate-100 hover:text-teal-400 transition cursor-pointer line-clamp-1"
              >
                {place.name}
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">{place.subcategory}</p>
            </div>
            {/* Rating pill if available */}
            {place.rating !== undefined ? (
              <div className="flex items-center gap-1 bg-amber-950/40 border border-amber-800/40 text-amber-300 px-2 py-0.5 rounded text-xs font-semibold shrink-0">
                <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                <span>{place.rating}</span>
                {place.reviewCount && (
                  <span className="text-[10px] text-amber-500 font-normal">
                    ({place.reviewCount > 1000 ? `${(place.reviewCount/1000).toFixed(1)}k` : place.reviewCount})
                  </span>
                )}
              </div>
            ) : (
              <span className="text-[10px] text-slate-500 font-mono italic">{t.ratingNotAvail}</span>
            )}
          </div>

          {/* Description snippet */}
          <p className="text-xs text-slate-300 mt-2 line-clamp-2 leading-relaxed">
            {place.description}
          </p>

          {/* Highlights tag pills */}
          <div className="flex flex-wrap gap-1.5 mt-2.5">
            {place.popularFor.slice(0, 2).map((item, idx) => (
              <span key={idx} className="text-[10px] px-2 py-0.5 rounded bg-slate-800/80 text-slate-300 border border-slate-700/50">
                • {item}
              </span>
            ))}
          </div>
        </div>

        {/* Accessibility & Safety status indicators */}
        <div className="pt-3 border-t border-slate-800/80 space-y-2">
          <div className="flex items-center justify-between text-[11px] text-slate-400">
            {/* Accessibility badge */}
            <div className="flex items-center gap-1.5">
              <Accessibility className={`w-3.5 h-3.5 ${place.accessibility.wheelchairAccessible ? 'text-teal-400' : 'text-slate-500'}`} />
              <span className={place.accessibility.wheelchairAccessible ? 'text-teal-300' : 'text-slate-500'}>
                {place.accessibility.wheelchairAccessible ? t.cardWheelchairReady : t.cardLimitedRamp}
              </span>
            </div>

            {/* Cleanliness rating */}
            {place.cleanlinessRating && (
              <div className="flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-cyan-400" />
                <span className="text-cyan-300 font-mono">{place.cleanlinessRating}/5 {t.cardHygiene}</span>
              </div>
            )}
          </div>

          {/* Community Notice Indicator */}
          <div className="flex items-center justify-between text-[11px]">
            {place.activeReportsCount > 0 ? (
              <div className="flex items-center gap-1 text-amber-400 bg-amber-950/30 px-2 py-0.5 rounded border border-amber-800/30">
                <AlertTriangle className="w-3 h-3 shrink-0" />
                <span>{place.activeReportsCount} {t.cardCommunityNotices}</span>
              </div>
            ) : (
              <div className="flex items-center gap-1 text-emerald-400/90 text-[10px]">
                <ShieldCheck className="w-3 h-3" />
                <span>{t.cardNoHazards}</span>
              </div>
            )}

            {/* Price detail tooltip text */}
            <span className="text-[10px] text-slate-400 font-mono truncate max-w-[130px]" title={place.estimatedCost}>
              {place.estimatedCost}
            </span>
          </div>
        </div>

        {/* Footer Card Actions */}
        <div className="pt-2 flex items-center gap-2">
          {/* View Details Action */}
          <button
            onClick={() => onSelectPlace(place)}
            className="flex-1 py-1.5 px-3 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium transition flex items-center justify-center gap-1 border border-slate-700"
          >
            <span>{t.cardDetails}</span>
            <ExternalLink className="w-3 h-3 text-slate-400" />
          </button>

          {/* Compare Checkbox / Toggle */}
          <button
            onClick={() => onToggleCompare(place.id)}
            className={`py-1.5 px-3 rounded-lg text-xs font-semibold transition flex items-center gap-1 border ${
              isCompared
                ? 'bg-teal-600 text-white border-teal-500 shadow-sm'
                : 'bg-slate-900 hover:bg-slate-800 text-teal-400 border-slate-700'
            }`}
          >
            {isCompared ? (
              <>
                <Check className="w-3 h-3" />
                <span>{t.cardAdded}</span>
              </>
            ) : (
              <>
                <Plus className="w-3 h-3" />
                <span>{t.cardCompare}</span>
              </>
            )}
          </button>

          {/* Map pin button */}
          {onLocateOnMap && (
            <button
              onClick={() => onLocateOnMap(place)}
              className="p-1.5 rounded-lg bg-slate-800 hover:bg-teal-900/50 hover:text-teal-300 text-slate-400 transition border border-slate-700"
              title={t.cardFocusMap}
            >
              <MapPin className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

      </div>

    </div>
  );
};
