import React from 'react';
import { 
  Scale, 
  Trash2, 
  Plus, 
  Star, 
  Accessibility, 
  Clock, 
  Sparkles, 
  AlertTriangle, 
  ShieldCheck
} from 'lucide-react';
import { Place } from '../types';
import { useLanguage } from '../i18n/LanguageContext';

interface CompareViewProps {
  comparedPlaces: Place[];
  allPlaces: Place[];
  onRemoveFromCompare: (placeId: string) => void;
  onAddToCompare: (placeId: string) => void;
  onClearAll: () => void;
  onSelectPlace: (place: Place) => void;
  onNavigateToExplore: () => void;
}

export const CompareView: React.FC<CompareViewProps> = ({
  comparedPlaces,
  allPlaces,
  onRemoveFromCompare,
  onAddToCompare,
  onClearAll,
  onSelectPlace,
  onNavigateToExplore
}) => {
  const { t, language } = useLanguage();

  // Preset comparison suggestions for instant hackathon demonstration
  const quickPresets = [
    {
      title: language === 'mr' ? 'ऐतिहासिक वास्तू' : language === 'hi' ? 'विरासत स्थल' : 'Heritage Heavyweights',
      desc: 'Shaniwar Wada vs Aga Khan Palace',
      ids: ['pune-shaniwar-wada', 'pune-aga-khan-palace']
    },
    {
      title: language === 'mr' ? 'प्रसिद्ध खाद्यसंस्कृती' : language === 'hi' ? 'प्रसिद्ध खान-पान' : 'Iconic Culinary Landmarks',
      desc: 'Vohuman Cafe vs Vaishali Restaurant vs Marz-O-Rin',
      ids: ['pune-vohuman-cafe', 'pune-vaishali-restaurant', 'pune-marz-o-rin']
    },
    {
      title: language === 'mr' ? 'शांत निसर्गरम्य बागा' : language === 'hi' ? 'शांत प्राकृतिक स्थल' : 'Tranquil Green Spaces',
      desc: 'Osho Teerth Park vs Saras Baug',
      ids: ['pune-osho-teerth-park', 'pune-saras-baug']
    }
  ];

  const handleApplyPreset = (ids: string[]) => {
    onClearAll();
    ids.forEach(id => onAddToCompare(id));
  };

  const remainingPlaces = allPlaces.filter(p => !comparedPlaces.some(cp => cp.id === p.id));

  return (
    <div className="space-y-8 max-w-6xl mx-auto">
      
      {/* Header Banner */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-slate-900 via-slate-900 to-slate-800 border border-slate-800 p-6 sm:p-8 shadow-xl">
        <div className="relative z-10 max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-500/10 border border-teal-500/30 text-teal-300 text-xs font-semibold">
            <Scale className="w-3.5 h-3.5" />
            <span>Side-by-Side Fact Comparison • Up to 3 Places</span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
            {t.compareTitle}
          </h1>

          <p className="text-sm text-slate-300 leading-relaxed">
            {t.compareSubtitle}
          </p>

          {/* Quick presets for judges */}
          <div className="pt-2 flex flex-wrap items-center gap-2">
            <span className="text-xs text-slate-400 font-semibold mr-1">{t.oneClickPresets}</span>
            {quickPresets.map((preset, idx) => (
              <button
                key={idx}
                onClick={() => handleApplyPreset(preset.ids)}
                className="px-3 py-1.5 rounded-lg bg-slate-950/80 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-700/80 text-xs font-medium transition"
              >
                ✨ {preset.title}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Comparison Area */}
      {comparedPlaces.length === 0 ? (
        <div className="p-12 text-center rounded-2xl bg-slate-900/60 border border-slate-800 space-y-4">
          <Scale className="w-12 h-12 text-slate-600 mx-auto" />
          <h3 className="font-bold text-xl text-slate-200">{t.emptyCompareTitle}</h3>
          <p className="text-xs text-slate-400 max-w-md mx-auto">
            {t.emptyCompareDesc}
          </p>
          <div className="flex items-center justify-center gap-3 pt-2">
            <button
              onClick={onNavigateToExplore}
              className="px-4 py-2 bg-teal-600 hover:bg-teal-500 text-white text-xs font-semibold rounded-lg shadow-md transition"
            >
              {t.browsePlacesBtn}
            </button>
            <button
              onClick={() => handleApplyPreset(quickPresets[0].ids)}
              className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold rounded-lg border border-slate-700 transition"
            >
              {t.loadSampleBtn}
            </button>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          
          {/* Top Actions Bar */}
          <div className="flex items-center justify-between">
            <div className="text-xs text-slate-300">
              {t.comparingCount} <strong className="text-teal-400">{comparedPlaces.length} of 3</strong>
            </div>

            <div className="flex items-center gap-2">
              {/* Add another place dropdown if less than 3 */}
              {comparedPlaces.length < 3 && remainingPlaces.length > 0 && (
                <div className="relative">
                  <select
                    onChange={(e) => {
                      if (e.target.value) {
                        onAddToCompare(e.target.value);
                        e.target.value = '';
                      }
                    }}
                    defaultValue=""
                    className="bg-slate-900 border border-slate-700 rounded-lg px-3 py-1.5 text-xs text-slate-200 focus:outline-none focus:border-teal-500 cursor-pointer"
                  >
                    <option value="" disabled>{t.addPlacePrompt}</option>
                    {remainingPlaces.map(p => (
                      <option key={p.id} value={p.id}>{p.name} ({p.category})</option>
                    ))}
                  </select>
                </div>
              )}

              <button
                onClick={onClearAll}
                className="px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-rose-400 border border-slate-800 hover:border-rose-900/50 text-xs font-medium transition flex items-center gap-1.5"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>{t.clearAllBtn}</span>
              </button>
            </div>
          </div>

          {/* Comparison Matrix Table / Cards */}
          <div className="overflow-x-auto rounded-2xl border border-slate-800 bg-slate-900/90 shadow-2xl">
            <table className="w-full text-left border-collapse min-w-[650px]">
              
              {/* Table Header: Place Cards */}
              <thead>
                <tr className="border-b border-slate-800 bg-slate-950/80">
                  <th className="p-4 w-44 text-xs font-bold text-slate-400 uppercase tracking-wider">
                    {t.featureMetric}
                  </th>
                  {comparedPlaces.map(place => (
                    <th key={place.id} className="p-4 align-top w-1/3">
                      <div className="relative group rounded-xl overflow-hidden bg-slate-900 border border-slate-800 p-3 space-y-2">
                        {/* Remove button */}
                        <button
                          onClick={() => onRemoveFromCompare(place.id)}
                          className="absolute top-2 right-2 p-1.5 rounded-full bg-slate-950/80 hover:bg-rose-900/80 text-slate-400 hover:text-white transition z-10"
                          title="Remove from comparison"
                        >
                          ✕
                        </button>

                        <div className="h-28 rounded-lg overflow-hidden relative">
                          <img 
                            src={place.image} 
                            alt={place.name} 
                            className="w-full h-full object-cover" 
                          />
                          <span className="absolute bottom-1.5 left-1.5 text-[10px] font-semibold px-2 py-0.5 rounded-full bg-slate-950/80 text-teal-300 capitalize border border-slate-700">
                            {place.category}
                          </span>
                        </div>

                        <div>
                          <h3 
                            onClick={() => onSelectPlace(place)}
                            className="font-bold text-sm text-white hover:text-teal-400 transition cursor-pointer line-clamp-1"
                          >
                            {place.name}
                          </h3>
                          <p className="text-[11px] text-slate-400 mt-0.5 truncate">{place.neighbourhood}</p>
                        </div>
                      </div>
                    </th>
                  ))}
                  {/* Fill empty column if only 2 places */}
                  {comparedPlaces.length === 2 && (
                    <th className="p-4 align-middle text-center w-1/3 border-l border-slate-800/60 bg-slate-950/20">
                      <div className="p-6 border border-dashed border-slate-800 rounded-xl space-y-2 text-slate-500">
                        <Plus className="w-6 h-6 mx-auto text-slate-600" />
                        <span className="text-xs font-semibold block">+ 3rd Spot</span>
                      </div>
                    </th>
                  )}
                </tr>
              </thead>

              {/* Table Rows */}
              <tbody className="divide-y divide-slate-800/80 text-xs text-slate-200">
                
                {/* Row: Price Bracket */}
                <tr className="hover:bg-slate-800/20 transition">
                  <td className="p-4 font-semibold text-slate-400">{t.metricPriceTier}</td>
                  {comparedPlaces.map(place => (
                    <td key={place.id} className="p-4 font-mono font-bold text-emerald-400">
                      {place.priceLevel} ({place.estimatedCost})
                    </td>
                  ))}
                  {comparedPlaces.length === 2 && <td className="p-4 border-l border-slate-800/60"></td>}
                </tr>

                {/* Row: Rating & Reviews */}
                <tr className="hover:bg-slate-800/20 transition">
                  <td className="p-4 font-semibold text-slate-400">{t.metricRating}</td>
                  {comparedPlaces.map(place => (
                    <td key={place.id} className="p-4">
                      {place.rating !== undefined ? (
                        <div className="flex items-center gap-1.5 text-amber-300 font-bold">
                          <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                          <span>{place.rating} / 5.0</span>
                          {place.reviewCount && (
                            <span className="text-[11px] text-slate-400 font-normal">
                              ({place.reviewCount.toLocaleString()} reviews)
                            </span>
                          )}
                        </div>
                      ) : (
                        <span className="text-slate-500 italic">{t.ratingNotAvail}</span>
                      )}
                    </td>
                  ))}
                  {comparedPlaces.length === 2 && <td className="p-4 border-l border-slate-800/60"></td>}
                </tr>

                {/* Row: Cleanliness / Hygiene */}
                <tr className="hover:bg-slate-800/20 transition">
                  <td className="p-4 font-semibold text-slate-400">{t.metricCleanliness}</td>
                  {comparedPlaces.map(place => (
                    <td key={place.id} className="p-4">
                      {place.cleanlinessRating !== undefined ? (
                        <div className="flex items-center gap-1.5 text-cyan-300 font-semibold font-mono">
                          <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                          <span>{place.cleanlinessRating} / 5.0 Hygiene</span>
                        </div>
                      ) : (
                        <span className="text-slate-500 italic">Not available</span>
                      )}
                    </td>
                  ))}
                  {comparedPlaces.length === 2 && <td className="p-4 border-l border-slate-800/60"></td>}
                </tr>

                {/* Row: Accessibility */}
                <tr className="hover:bg-slate-800/20 transition">
                  <td className="p-4 font-semibold text-slate-400">{t.metricAccessibility}</td>
                  {comparedPlaces.map(place => (
                    <td key={place.id} className="p-4 space-y-1">
                      <div className="flex items-center gap-1.5 font-semibold">
                        <Accessibility className={`w-4 h-4 ${place.accessibility.wheelchairAccessible ? 'text-teal-400' : 'text-slate-500'}`} />
                        <span className={place.accessibility.wheelchairAccessible ? 'text-teal-300' : 'text-slate-400'}>
                          {place.accessibility.wheelchairAccessible ? t.cardWheelchairReady : t.cardLimitedRamp}
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-400 leading-snug">{place.accessibility.notes}</p>
                    </td>
                  ))}
                  {comparedPlaces.length === 2 && <td className="p-4 border-l border-slate-800/60"></td>}
                </tr>

                {/* Row: Operating Hours */}
                <tr className="hover:bg-slate-800/20 transition">
                  <td className="p-4 font-semibold text-slate-400">{t.metricHours}</td>
                  {comparedPlaces.map(place => (
                    <td key={place.id} className="p-4 flex items-center gap-1.5 text-slate-300">
                      <Clock className="w-3.5 h-3.5 text-slate-400" />
                      <span>{place.openingHours}</span>
                    </td>
                  ))}
                  {comparedPlaces.length === 2 && <td className="p-4 border-l border-slate-800/60"></td>}
                </tr>

                {/* Row: Highlights */}
                <tr className="hover:bg-slate-800/20 transition">
                  <td className="p-4 font-semibold text-slate-400">{t.metricHighlights}</td>
                  {comparedPlaces.map(place => (
                    <td key={place.id} className="p-4">
                      <div className="flex flex-wrap gap-1">
                        {place.popularFor.map((item, idx) => (
                          <span key={idx} className="text-[10px] px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">
                            {item}
                          </span>
                        ))}
                      </div>
                    </td>
                  ))}
                  {comparedPlaces.length === 2 && <td className="p-4 border-l border-slate-800/60"></td>}
                </tr>

                {/* Row: Community Safety / Hazard Notices */}
                <tr className="hover:bg-slate-800/20 transition">
                  <td className="p-4 font-semibold text-slate-400">{t.metricSafetyNotices}</td>
                  {comparedPlaces.map(place => (
                    <td key={place.id} className="p-4">
                      {place.activeReportsCount > 0 ? (
                        <div className="flex items-center gap-1.5 text-amber-400 bg-amber-950/40 p-2 rounded-lg border border-amber-800/50">
                          <AlertTriangle className="w-4 h-4 shrink-0" />
                          <span>{place.activeReportsCount} {t.cardCommunityNotices}</span>
                        </div>
                      ) : (
                        <div className="flex items-center gap-1.5 text-emerald-400 text-xs">
                          <ShieldCheck className="w-4 h-4" />
                          <span>{t.cardNoHazards}</span>
                        </div>
                      )}
                    </td>
                  ))}
                  {comparedPlaces.length === 2 && <td className="p-4 border-l border-slate-800/60"></td>}
                </tr>

                {/* Row: Curation Source */}
                <tr className="hover:bg-slate-800/20 transition">
                  <td className="p-4 font-semibold text-slate-400">{t.metricDataSource}</td>
                  {comparedPlaces.map(place => (
                    <td key={place.id} className="p-4 text-[11px] text-slate-400">
                      {place.curationSource}
                    </td>
                  ))}
                  {comparedPlaces.length === 2 && <td className="p-4 border-l border-slate-800/60"></td>}
                </tr>

              </tbody>
            </table>
          </div>

        </div>
      )}

    </div>
  );
};
