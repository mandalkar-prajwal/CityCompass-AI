import React, { useState, useMemo } from 'react';
import { 
  Place, 
  CityConfig, 
  CommunityReport 
} from '../types';
import { PlaceCard } from './PlaceCard';
import { MapView } from './MapView';
import { 
  RotateCcw, 
  Compass, 
  Map, 
  ListFilter, 
  Sparkles, 
  Search, 
  Building2, 
  AlertCircle
} from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';

interface ExploreViewProps {
  city: CityConfig;
  places: Place[];
  reports: CommunityReport[];
  comparedPlaceIds: string[];
  bookmarkedPlaceIds: string[];
  onToggleCompare: (id: string) => void;
  onToggleBookmark: (id: string) => void;
  onSelectPlace: (place: Place) => void;
  searchQuery: string;
  setSearchQuery: (q: string) => void;
}

export const ExploreView: React.FC<ExploreViewProps> = ({
  city,
  places,
  reports,
  comparedPlaceIds,
  bookmarkedPlaceIds,
  onToggleCompare,
  onToggleBookmark,
  onSelectPlace,
  searchQuery,
  setSearchQuery
}) => {
  const { t } = useLanguage();

  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedPrice, setSelectedPrice] = useState<string>('all');
  const [wheelchairOnly, setWheelchairOnly] = useState<boolean>(false);
  const [sortBy, setSortBy] = useState<'recommended' | 'rating' | 'cleanliness'>('recommended');
  const [mobileTab, setMobileTab] = useState<'list' | 'map'>('list');
  const [focusedPlace, setFocusedPlace] = useState<Place | null>(null);

  // Available categories with dynamic localized labels
  const categories: { id: string; label: string; icon: string }[] = [
    { id: 'all', label: t.catAll, icon: '🌟' },
    { id: 'heritage', label: t.catHeritage, icon: '🏛️' },
    { id: 'food', label: t.catFood, icon: '🍲' },
    { id: 'attractions', label: t.catAttractions, icon: '📍' },
    { id: 'stays', label: t.catStays, icon: '🏨' },
    { id: 'budget', label: t.catBudget, icon: '🪙' },
    { id: 'accessibility', label: t.catAccessibility, icon: '♿' }
  ];

  // Unique neighbourhoods for filtering
  const neighbourhoods = useMemo(() => {
    const list = Array.from(new Set(places.map(p => p.neighbourhood)));
    return list.sort();
  }, [places]);

  const [selectedNeighbourhood, setSelectedNeighbourhood] = useState<string>('all');

  // Filter places
  const filteredPlaces = useMemo(() => {
    return places.filter(place => {
      // Search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesName = place.name.toLowerCase().includes(q);
        const matchesDesc = place.description.toLowerCase().includes(q);
        const matchesNeighbourhood = place.neighbourhood.toLowerCase().includes(q);
        const matchesHighlights = place.popularFor.some(h => h.toLowerCase().includes(q));
        if (!matchesName && !matchesDesc && !matchesNeighbourhood && !matchesHighlights) return false;
      }

      // Category filter
      if (selectedCategory !== 'all') {
        if (selectedCategory === 'accessibility') {
          if (!place.accessibility.wheelchairAccessible) return false;
        } else if (place.category !== selectedCategory) {
          return false;
        }
      }

      // Price filter
      if (selectedPrice !== 'all') {
        if (selectedPrice === 'Free' && place.priceLevel !== 'Free') return false;
        if (selectedPrice === '₹' && place.priceLevel !== '₹') return false;
        if (selectedPrice === '₹₹' && place.priceLevel !== '₹₹') return false;
        if (selectedPrice === '₹₹₹' && place.priceLevel !== '₹₹₹') return false;
      }

      // Wheelchair toggle
      if (wheelchairOnly && !place.accessibility.wheelchairAccessible) {
        return false;
      }

      // Neighbourhood
      if (selectedNeighbourhood !== 'all' && place.neighbourhood !== selectedNeighbourhood) {
        return false;
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'rating') {
        return (b.rating ?? 0) - (a.rating ?? 0);
      }
      if (sortBy === 'cleanliness') {
        return (b.cleanlinessRating ?? 0) - (a.cleanlinessRating ?? 0);
      }
      return 0; // recommended order
    });
  }, [places, searchQuery, selectedCategory, selectedPrice, wheelchairOnly, selectedNeighbourhood, sortBy]);

  const resetFilters = () => {
    setSelectedCategory('all');
    setSelectedPrice('all');
    setSelectedNeighbourhood('all');
    setWheelchairOnly(false);
    setSearchQuery('');
    setSortBy('recommended');
  };

  const hasActiveFilters = selectedCategory !== 'all' || selectedPrice !== 'all' || selectedNeighbourhood !== 'all' || wheelchairOnly || searchQuery !== '';

  return (
    <div className="space-y-6">
      
      {/* City Hero & Stats Banner */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-slate-900 via-slate-900 to-slate-800 border border-slate-800 p-6 sm:p-8 shadow-xl">
        <div className="relative z-10 max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-500/10 border border-teal-500/30 text-teal-300 text-xs font-semibold">
            <Compass className="w-3.5 h-3.5" />
            <span>Discover {city.name} • {city.tagline}</span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
            Navigate the Pulse of <span className="text-teal-400">{city.name}</span>
          </h1>

          <p className="text-sm text-slate-300 leading-relaxed max-w-2xl">
            {city.description}
          </p>

          {/* Quick Metrics */}
          <div className="flex flex-wrap items-center gap-4 sm:gap-6 pt-3 text-xs text-slate-300">
            <div className="flex items-center gap-1.5 bg-slate-950/60 px-3 py-1.5 rounded-lg border border-slate-800">
              <Building2 className="w-4 h-4 text-teal-400" />
              <span className="font-bold text-white">{places.length}</span> Curated Places
            </div>
            <div className="flex items-center gap-1.5 bg-slate-950/60 px-3 py-1.5 rounded-lg border border-slate-800">
              <AlertCircle className="w-4 h-4 text-amber-400" />
              <span className="font-bold text-white">{reports.length}</span> {t.activeNoticesLogged}
            </div>
            <div className="flex items-center gap-1.5 bg-slate-950/60 px-3 py-1.5 rounded-lg border border-slate-800">
              <Sparkles className="w-4 h-4 text-emerald-400" />
              <span>100% Honest Disclaimers</span>
            </div>
          </div>
        </div>
      </div>

      {/* Category Pills Slider */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {categories.map(cat => {
          const isActive = selectedCategory === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all border shrink-0 ${
                isActive
                  ? 'bg-teal-500 text-white border-teal-400 shadow-lg shadow-teal-950/50'
                  : 'bg-slate-900/90 text-slate-300 border-slate-800 hover:border-slate-700 hover:text-white'
              }`}
            >
              <span>{cat.icon}</span>
              <span>{cat.label}</span>
            </button>
          );
        })}
      </div>

      {/* Filter & Control Toolbar */}
      <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 flex flex-wrap items-center justify-between gap-3 text-xs">
        
        {/* Left Filter Controls */}
        <div className="flex flex-wrap items-center gap-2.5">
          {/* Price Selector */}
          <div className="flex items-center gap-1.5 bg-slate-950/80 px-2.5 py-1.5 rounded-lg border border-slate-800">
            <span className="text-slate-400 text-[11px]">{t.filterCost}</span>
            <select
              value={selectedPrice}
              onChange={(e) => setSelectedPrice(e.target.value)}
              className="bg-transparent text-slate-200 font-medium focus:outline-none cursor-pointer"
            >
              <option value="all" className="bg-slate-900">{t.allTiers}</option>
              <option value="Free" className="bg-slate-900">{t.cardFreeEntry}</option>
              <option value="₹" className="bg-slate-900">₹ Budget</option>
              <option value="₹₹" className="bg-slate-900">₹₹ Mid-Range</option>
              <option value="₹₹₹" className="bg-slate-900">₹₹₹ Luxury</option>
            </select>
          </div>

          {/* Neighbourhood Selector */}
          <div className="flex items-center gap-1.5 bg-slate-950/80 px-2.5 py-1.5 rounded-lg border border-slate-800">
            <span className="text-slate-400 text-[11px]">{t.filterArea}</span>
            <select
              value={selectedNeighbourhood}
              onChange={(e) => setSelectedNeighbourhood(e.target.value)}
              className="bg-transparent text-slate-200 font-medium focus:outline-none cursor-pointer max-w-[140px] truncate"
            >
              <option value="all" className="bg-slate-900">{t.allAreas}</option>
              {neighbourhoods.map(n => (
                <option key={n} value={n} className="bg-slate-900">{n}</option>
              ))}
            </select>
          </div>

          {/* Wheelchair accessible toggle */}
          <button
            onClick={() => setWheelchairOnly(!wheelchairOnly)}
            className={`px-3 py-1.5 rounded-lg border font-medium transition flex items-center gap-1.5 ${
              wheelchairOnly
                ? 'bg-teal-950/80 text-teal-300 border-teal-600'
                : 'bg-slate-950/80 text-slate-400 border-slate-800 hover:text-slate-200'
            }`}
          >
            <span>{t.filterWheelchairOnly}</span>
          </button>

          {/* Reset Filters */}
          {hasActiveFilters && (
            <button
              onClick={resetFilters}
              className="px-2.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-rose-300 transition flex items-center gap-1 border border-slate-700"
            >
              <RotateCcw className="w-3 h-3" />
              <span>{t.filterReset}</span>
            </button>
          )}
        </div>

        {/* Right Sort & View Controls */}
        <div className="flex items-center gap-2 ml-auto">
          {/* Sorting */}
          <div className="flex items-center gap-1.5 bg-slate-950/80 px-2.5 py-1.5 rounded-lg border border-slate-800">
            <span className="text-slate-400 text-[11px]">{t.sortLabel}</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="bg-transparent text-slate-200 font-medium focus:outline-none cursor-pointer"
            >
              <option value="recommended" className="bg-slate-900">{t.sortRecommended}</option>
              <option value="rating" className="bg-slate-900">{t.sortRating}</option>
              <option value="cleanliness" className="bg-slate-900">{t.sortCleanliness}</option>
            </select>
          </div>

          {/* Mobile List / Map Toggle Tabs */}
          <div className="lg:hidden flex items-center bg-slate-950 p-1 rounded-lg border border-slate-800">
            <button
              onClick={() => setMobileTab('list')}
              className={`p-1.5 rounded-md text-xs font-semibold ${
                mobileTab === 'list' ? 'bg-teal-600 text-white' : 'text-slate-400 hover:text-white'
              }`}
            >
              <ListFilter className="w-4 h-4" />
            </button>
            <button
              onClick={() => setMobileTab('map')}
              className={`p-1.5 rounded-md text-xs font-semibold ${
                mobileTab === 'map' ? 'bg-teal-600 text-white' : 'text-slate-400 hover:text-white'
              }`}
            >
              <Map className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>

      {/* Main Split Layout: Cards Feed (Left) & Map (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Places Feed Column */}
        <div className={`lg:col-span-7 space-y-4 ${mobileTab === 'map' ? 'hidden lg:block' : 'block'}`}>
          
          <div className="flex items-center justify-between text-xs text-slate-400 px-1">
            <span>Showing <strong className="text-slate-200">{filteredPlaces.length}</strong> matching spots in {city.name}</span>
            {searchQuery && (
              <span>Filtered by "{searchQuery}"</span>
            )}
          </div>

          {/* Empty State */}
          {filteredPlaces.length === 0 ? (
            <div className="p-12 text-center rounded-2xl bg-slate-900/60 border border-slate-800 space-y-3">
              <Search className="w-10 h-10 text-slate-600 mx-auto" />
              <h3 className="font-bold text-lg text-slate-200">No places match your filters</h3>
              <p className="text-xs text-slate-400 max-w-sm mx-auto">
                Try widening your price range, clearing search terms, or resetting category filters to discover more city gems.
              </p>
              <button
                onClick={resetFilters}
                className="mt-2 px-4 py-2 bg-teal-600 hover:bg-teal-500 text-white text-xs font-semibold rounded-lg shadow-md transition"
              >
                {t.filterReset}
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {filteredPlaces.map(place => (
                <PlaceCard
                  key={place.id}
                  place={place}
                  isCompared={comparedPlaceIds.includes(place.id)}
                  isBookmarked={bookmarkedPlaceIds.includes(place.id)}
                  onToggleCompare={onToggleCompare}
                  onToggleBookmark={onToggleBookmark}
                  onSelectPlace={onSelectPlace}
                  onLocateOnMap={(p) => {
                    setFocusedPlace(p);
                    setMobileTab('map');
                  }}
                />
              ))}
            </div>
          )}
        </div>

        {/* Interactive Map Column */}
        <div className={`lg:col-span-5 sticky top-24 ${mobileTab === 'list' ? 'hidden lg:block' : 'block'}`}>
          <div className="h-[600px] w-full">
            <MapView
              city={city}
              places={filteredPlaces}
              reports={reports}
              selectedPlace={focusedPlace}
              onSelectPlace={onSelectPlace}
              isCompared={(id) => comparedPlaceIds.includes(id)}
              onToggleCompare={onToggleCompare}
              focusedPlace={focusedPlace}
            />
          </div>
        </div>

      </div>

    </div>
  );
};
