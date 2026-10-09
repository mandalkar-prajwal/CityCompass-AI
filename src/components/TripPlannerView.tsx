import React, { useState } from 'react';
import { 
  Sparkles, 
  Clock, 
  DollarSign, 
  Compass, 
  Accessibility, 
  MapPin, 
  RefreshCw, 
  Printer, 
  Navigation,
  Info,
  Layers,
  Map as MapIcon,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import { CityConfig, GeneratedItinerary, Place } from '../types';
import { generateSmartItinerary } from '../services/itineraryEngine';
import { MapView } from './MapView';
import { useLanguage } from '../i18n/LanguageContext';

interface TripPlannerViewProps {
  city: CityConfig;
  allPlaces: Place[];
  onSelectPlaceById?: (placeId: string) => void;
  onViewRouteOnMainMap?: (stops: any[]) => void;
}

export const TripPlannerView: React.FC<TripPlannerViewProps> = ({
  city,
  allPlaces,
  onSelectPlaceById,
  onViewRouteOnMainMap
}) => {
  const { t, language } = useLanguage();

  // Planner State
  const [budget, setBudget] = useState<'budget' | 'moderate' | 'comfort'>('budget');
  const [duration, setDuration] = useState<'half_day' | 'full_day' | 'weekend'>('full_day');
  const [selectedInterests, setSelectedInterests] = useState<string[]>([
    'History & Maratha Forts',
    'Local Street Food & Irani Cafes'
  ]);
  const [mobilityPreference, setMobilityPreference] = useState<'all' | 'accessible_only' | 'low_walking'>('all');
  const [showRouteMap, setShowRouteMap] = useState<boolean>(true);
  
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [itinerary, setItinerary] = useState<GeneratedItinerary | null>(() => {
    return generateSmartItinerary({
      cityId: city.id,
      budget: 'budget',
      duration: 'full_day',
      interests: ['History & Maratha Forts', 'Local Street Food & Irani Cafes'],
      mobilityPreference: 'all'
    });
  });

  const [activeDayIndex, setActiveDayIndex] = useState<number>(0);

  const interestOptions = [
    { id: 'History & Maratha Forts', label: language === 'mr' ? 'वारसा व किल्ले' : language === 'hi' ? 'विरासत और किले' : 'History & Forts', icon: '🏛️' },
    { id: 'Local Street Food & Irani Cafes', label: language === 'mr' ? 'खाद्यसंस्कृती व इराणी कॅफे' : language === 'hi' ? 'खान-पान व कैफे' : 'Street Food & Cafes', icon: '🍲' },
    { id: 'Nature & Zen Gardens', label: language === 'mr' ? 'निसर्ग व बागा' : language === 'hi' ? 'प्रकृति और पार्क' : 'Nature & Parks', icon: '🌿' },
    { id: 'Shopping & Street Bazaars', label: language === 'mr' ? 'खरेदी व बाजार' : language === 'hi' ? 'खरीदारी व बाजार' : 'Bazaars & Shopping', icon: '🛍️' },
    { id: 'Family Friendly & Cleanliness', label: language === 'mr' ? 'कौटुंबिक व स्वच्छता' : language === 'hi' ? 'पारिवारिक स्थल' : 'Family Friendly', icon: '👨‍👩‍👧' }
  ];

  const toggleInterest = (interest: string) => {
    if (selectedInterests.includes(interest)) {
      if (selectedInterests.length > 1) {
        setSelectedInterests(selectedInterests.filter(i => i !== interest));
      }
    } else {
      setSelectedInterests([...selectedInterests, interest]);
    }
  };

  const handleGenerate = () => {
    setIsGenerating(true);
    setTimeout(() => {
      const generated = generateSmartItinerary({
        cityId: city.id,
        budget,
        duration,
        interests: selectedInterests,
        mobilityPreference
      });
      setItinerary(generated);
      setActiveDayIndex(0);
      setIsGenerating(false);
    }, 400);
  };

  const currentDayStops = itinerary?.days[activeDayIndex]?.stops || [];

  return (
    <div className="space-y-8 max-w-6xl mx-auto">
      
      {/* Header Banner */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-teal-950 via-slate-900 to-slate-900 border border-teal-800/40 p-6 sm:p-8 shadow-xl">
        <div className="relative z-10 max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-500/20 border border-teal-500/40 text-teal-300 text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5 text-teal-400" />
            <span>{t.routeSequencingBadge} • Zero Paid API Required</span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
            {t.plannerTitle}
          </h1>

          <p className="text-sm text-slate-300 leading-relaxed">
            {t.plannerSubtitle}
          </p>
        </div>
      </div>

      {/* Input Configuration Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Form Settings Panel */}
        <div className="lg:col-span-5 bg-slate-900/90 rounded-2xl border border-slate-800 p-6 space-y-6 shadow-xl">
          <h2 className="text-base font-bold text-white flex items-center gap-2 pb-2 border-b border-slate-800">
            <Compass className="w-4 h-4 text-teal-400" />
            <span>{t.budgetPref} & {t.timeWindow}</span>
          </h2>

          {/* Budget Tier */}
          <div className="space-y-2">
            <label className="text-xs font-semibold text-slate-300 flex items-center justify-between">
              <span>{t.budgetPref}</span>
              <span className="text-[11px] text-teal-400 font-mono">
                {budget === 'budget' ? '₹300 – ₹700 / day' : budget === 'moderate' ? '₹1,000 – ₹2,500 / day' : '₹3,000+ / day'}
              </span>
            </label>
            <div className="grid grid-cols-3 gap-2">
              {[
                { id: 'budget', label: '🪙 Budget', desc: 'Street food, free entry' },
                { id: 'moderate', label: '☕ Moderate', desc: 'Sit-down cafes, ASI sites' },
                { id: 'comfort', label: '✨ Comfort', desc: 'Premium dining, cabs' }
              ].map(item => (
                <button
                  key={item.id}
                  onClick={() => setBudget(item.id as any)}
                  className={`p-2.5 rounded-xl text-left border transition text-xs ${
                    budget === item.id
                      ? 'bg-teal-500/20 border-teal-500 text-white font-semibold'
                      : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <div className="font-semibold text-xs text-slate-200">{item.label}</div>
                  <div className="text-[10px] text-slate-500 mt-0.5 line-clamp-1">{item.desc}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Time Duration */}
          <div className="space-y-2">
            <label className="text-xs font-semibold text-slate-300">{t.timeWindow}</label>
            <div className="grid grid-cols-3 gap-2">
              {[
                { id: 'half_day', label: t.halfDay, hours: '3-4 hrs' },
                { id: 'full_day', label: t.fullDay, hours: '8-10 hrs' },
                { id: 'weekend', label: t.weekend, hours: '2 Days' }
              ].map(item => (
                <button
                  key={item.id}
                  onClick={() => setDuration(item.id as any)}
                  className={`p-2.5 rounded-xl text-center border transition text-xs ${
                    duration === item.id
                      ? 'bg-teal-500/20 border-teal-500 text-teal-300 font-semibold'
                      : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <div className="font-semibold text-xs truncate">{item.label}</div>
                  <div className="text-[10px] text-slate-500 mt-0.5">{item.hours}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Interests Checklist */}
          <div className="space-y-2">
            <label className="text-xs font-semibold text-slate-300">{t.coreInterests}</label>
            <div className="flex flex-wrap gap-2">
              {interestOptions.map(opt => {
                const isSelected = selectedInterests.includes(opt.id);
                return (
                  <button
                    key={opt.id}
                    onClick={() => toggleInterest(opt.id)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-medium border transition flex items-center gap-1.5 ${
                      isSelected
                        ? 'bg-teal-500 text-white border-teal-400 shadow-md shadow-teal-950/50'
                        : 'bg-slate-950/60 text-slate-400 border-slate-800 hover:border-slate-700 hover:text-slate-300'
                    }`}
                  >
                    <span>{opt.icon}</span>
                    <span>{opt.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Mobility & Accessibility */}
          <div className="space-y-2">
            <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
              <Accessibility className="w-3.5 h-3.5 text-teal-400" />
              <span>{t.mobilityMode}</span>
            </label>
            <div className="space-y-1.5">
              {[
                { id: 'all', title: t.mobilityAll, desc: 'Includes historic forts with staircases and hills' },
                { id: 'accessible_only', title: t.mobilityWheelchair, desc: 'Restricts to places with verified ramp or level access' },
                { id: 'low_walking', title: t.mobilityLowWalking, desc: 'Prioritizes compact sites and nearby transit stops' }
              ].map(opt => (
                <label
                  key={opt.id}
                  onClick={() => setMobilityPreference(opt.id as any)}
                  className={`p-2.5 rounded-xl border flex items-start gap-2.5 cursor-pointer transition text-xs ${
                    mobilityPreference === opt.id
                      ? 'bg-teal-950/50 border-teal-600/80 text-teal-200'
                      : 'bg-slate-950/40 border-slate-800 text-slate-400 hover:text-slate-300'
                  }`}
                >
                  <input
                    type="radio"
                    name="mobility"
                    checked={mobilityPreference === opt.id}
                    onChange={() => {}}
                    className="mt-0.5 text-teal-500 focus:ring-0"
                  />
                  <div>
                    <span className="font-semibold block text-slate-200">{opt.title}</span>
                    <span className="text-[11px] text-slate-500 block leading-tight">{opt.desc}</span>
                  </div>
                </label>
              ))}
            </div>
          </div>

          {/* Generate Button */}
          <button
            onClick={handleGenerate}
            disabled={isGenerating}
            className="w-full py-3 px-4 rounded-xl bg-teal-500 hover:bg-teal-400 active:bg-teal-600 text-slate-950 font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg shadow-teal-950/60 transition disabled:opacity-50"
          >
            {isGenerating ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin" />
                <span>{t.generatingBtn}</span>
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4" />
                <span>{t.generateItineraryBtn}</span>
              </>
            )}
          </button>

          {/* Transparency footnote */}
          <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-[11px] text-slate-400 flex items-start gap-2">
            <Info className="w-4 h-4 text-teal-400 shrink-0 mt-0.5" />
            <p>
              {t.approxTransitNotice}
            </p>
          </div>

        </div>

        {/* Right Output Itinerary Results */}
        <div className="lg:col-span-7 space-y-6">
          
          {itinerary && (
            <div className="bg-slate-900/90 rounded-2xl border border-slate-800 p-6 shadow-xl space-y-6">
              
              {/* Output Header */}
              <div className="flex flex-wrap items-start justify-between gap-4 pb-4 border-b border-slate-800">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="px-2.5 py-0.5 rounded-full bg-teal-500/10 border border-teal-500/30 text-teal-300 text-xs font-semibold">
                      {itinerary.matchScore}% {t.preferenceMatch}
                    </span>
                    <span className="text-slate-400 text-xs font-mono">
                      {itinerary.generatedAt}
                    </span>
                  </div>
                  <h2 className="text-xl font-bold text-white tracking-tight">{itinerary.title}</h2>
                  <p className="text-xs text-slate-300 mt-1">{itinerary.overview}</p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setShowRouteMap(!showRouteMap)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium border flex items-center gap-1.5 transition ${
                      showRouteMap 
                        ? 'bg-teal-950 text-teal-300 border-teal-600' 
                        : 'bg-slate-800 text-slate-300 border-slate-700 hover:text-white'
                    }`}
                  >
                    <MapIcon className="w-3.5 h-3.5 text-teal-400" />
                    <span>{showRouteMap ? 'Hide Route Map' : t.viewRouteOnMapBtn}</span>
                    {showRouteMap ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
                  </button>

                  <button
                    onClick={() => window.print()}
                    className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium border border-slate-700 flex items-center gap-1.5"
                    title={t.printPdfBtn}
                  >
                    <Printer className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">{t.printPdfBtn}</span>
                  </button>
                </div>
              </div>

              {/* Day Tabs (if weekend 2-day) */}
              {itinerary.days.length > 1 && (
                <div className="flex items-center gap-2 border-b border-slate-800 pb-2">
                  {itinerary.days.map((day, idx) => (
                    <button
                      key={day.dayNumber}
                      onClick={() => setActiveDayIndex(idx)}
                      className={`px-4 py-2 rounded-xl text-xs font-semibold transition ${
                        activeDayIndex === idx
                          ? 'bg-teal-500 text-white shadow-md'
                          : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
                      }`}
                    >
                      Day {day.dayNumber} Circuit
                    </button>
                  ))}
                </div>
              )}

              {/* Active Day Summary & Route Optimization Box */}
              {itinerary.days[activeDayIndex] && (
                <div className="space-y-3">
                  <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800/80 flex flex-wrap items-center justify-between gap-3 text-xs">
                    <div>
                      <h3 className="font-bold text-white">{itinerary.days[activeDayIndex].theme}</h3>
                      <p className="text-slate-400 text-[11px] mt-0.5">{itinerary.days[activeDayIndex].summary}</p>
                    </div>
                    <div className="flex flex-wrap items-center gap-2 text-[11px] font-mono shrink-0">
                      <span className="bg-emerald-950/60 text-emerald-300 px-2.5 py-1 rounded border border-emerald-800/40">
                        {t.estSpend}: {itinerary.days[activeDayIndex].totalEstimatedCost}
                      </span>
                      <span className="bg-sky-950/60 text-sky-300 px-2.5 py-1 rounded border border-sky-800/40">
                        Direct Path: ~{itinerary.days[activeDayIndex].totalDirectDistanceKm} km
                      </span>
                    </div>
                  </div>

                  {/* Route Optimization Rationale Banner */}
                  <div className="p-3.5 rounded-xl bg-teal-950/40 border border-teal-800/50 flex items-start gap-2.5 text-xs">
                    <Navigation className="w-4 h-4 text-teal-400 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-bold text-teal-300 block">{t.routeExplanationTitle}</span>
                      <p className="text-slate-300 text-[11px] mt-0.5 leading-relaxed">
                        {itinerary.days[activeDayIndex].routeExplanation}
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Embedded Route Map Viewer */}
              {showRouteMap && currentDayStops.length > 0 && (
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs text-slate-400">
                    <span className="font-semibold text-slate-300 flex items-center gap-1.5">
                      <Navigation className="w-3.5 h-3.5 text-teal-400" />
                      <span>{t.routeMapTitle} (Stops 1 to {currentDayStops.length})</span>
                    </span>
                    <span className="text-[11px] text-teal-400 font-mono">
                      Numbered pins & dashed transit corridor
                    </span>
                  </div>
                  <div className="h-64 sm:h-72 w-full rounded-xl overflow-hidden border border-slate-800">
                    <MapView
                      city={city}
                      places={allPlaces}
                      reports={[]}
                      selectedPlace={null}
                      onSelectPlace={() => {}}
                      isCompared={() => false}
                      onToggleCompare={() => {}}
                      routeStops={currentDayStops}
                    />
                  </div>
                </div>
              )}

              {/* Day Timeline Stops */}
              <div className="space-y-4 relative before:absolute before:left-4 before:top-4 before:bottom-4 before:w-0.5 before:bg-slate-800">
                {currentDayStops.map((stop) => (
                  <div key={stop.stopNumber} className="relative pl-10">
                    
                    {/* Numbered Circle Node on Timeline */}
                    <div className="absolute left-2.5 top-3 -translate-x-1/2 w-6 h-6 rounded-full bg-gradient-to-br from-teal-500 to-sky-600 border-2 border-white shadow-md flex items-center justify-center text-[11px] font-bold text-white font-mono">
                      {stop.stopNumber}
                    </div>

                    {/* Stop Card */}
                    <div className="bg-slate-950/70 rounded-xl border border-slate-800 p-4 space-y-2 hover:border-slate-700 transition">
                      
                      {/* Top Time & Transit Distance Indicator */}
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <div className="flex items-center gap-2">
                          <span className="text-[11px] font-mono font-semibold text-teal-400 bg-teal-950/60 px-2 py-0.5 rounded border border-teal-800/40">
                            {stop.timeSlot}
                          </span>
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-slate-900 text-slate-300 border border-slate-800 font-mono">
                            {t.stopNumberLabel} #{stop.stopNumber}
                          </span>
                        </div>

                        {/* Leg Transit Metric */}
                        {stop.stopNumber > 1 && stop.distanceFromPrevKm !== undefined && (
                          <div className="text-[11px] font-mono text-emerald-400 bg-emerald-950/50 px-2 py-0.5 rounded border border-emerald-800/40 flex items-center gap-1">
                            <span>Leg: ~{stop.distanceFromPrevKm} km direct</span>
                            <span className="text-slate-400">•</span>
                            <span>{stop.transitTimeFromPrev}</span>
                          </div>
                        )}
                      </div>

                      <div className="flex items-start justify-between gap-2 pt-1">
                        <div>
                          <h4 
                            onClick={() => onSelectPlaceById && onSelectPlaceById(stop.placeId)}
                            className="font-bold text-base text-white hover:text-teal-400 cursor-pointer transition"
                          >
                            {stop.placeName}
                          </h4>
                          <p className="text-xs text-slate-300 font-medium">{stop.activity}</p>
                        </div>
                        <span className="text-[10px] uppercase font-bold text-slate-400 bg-slate-900 px-2 py-0.5 rounded border border-slate-800 shrink-0">
                          {stop.category}
                        </span>
                      </div>

                      {/* Rationale & Tip */}
                      <p className="text-xs text-slate-400 leading-relaxed pt-1">
                        <strong className="text-slate-300">{t.whyThisStop}: </strong>{stop.rationale}
                      </p>

                      <div className="bg-slate-900/90 rounded-lg p-2.5 border border-slate-800/80 text-[11px] text-amber-300/90 flex items-start gap-1.5">
                        <span className="shrink-0 font-bold">💡 {t.proTravelTip}:</span>
                        <span>{stop.travelTip}</span>
                      </div>

                      {stop.accessibilityNote && (
                        <div className="text-[11px] text-slate-400 flex items-center gap-1.5 pt-1">
                          <Accessibility className="w-3.5 h-3.5 text-teal-400 shrink-0" />
                          <span>{stop.accessibilityNote}</span>
                        </div>
                      )}
                    </div>

                  </div>
                ))}
              </div>

              {/* Bottom Disclaimer */}
              <div className="p-3.5 rounded-xl bg-slate-950/90 border border-slate-800 text-[11px] text-slate-400 flex items-start gap-2">
                <Info className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <p className="leading-relaxed">
                  {itinerary.disclaimer}
                </p>
              </div>

            </div>
          )}

        </div>

      </div>

    </div>
  );
};
