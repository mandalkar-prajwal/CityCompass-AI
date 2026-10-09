import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { ExploreView } from './components/ExploreView';
import { TripPlannerView } from './components/TripPlannerView';
import { CompareView } from './components/CompareView';
import { ReportsView } from './components/ReportsView';
import { InsightsView } from './components/InsightsView';
import { AboutView } from './components/AboutView';
import { PlaceDetailModal } from './components/PlaceDetailModal';
import { SubmitReportModal } from './components/SubmitReportModal';

import { CityConfig, Place, CommunityReport, WeatherData } from './types';
import { CITIES } from './data/cities';
import { PUNE_PLACES } from './data/punePlaces';
import { fetchLiveWeather } from './services/weatherService';
import { 
  getStoredReports, 
  saveReport, 
  getComparedPlaceIds, 
  toggleComparePlace, 
  clearComparedPlaces,
  getBookmarkedPlaceIds,
  toggleBookmarkPlace,
  getUpvotedReportIds,
  toggleUpvoteReport
} from './services/storageService';
import { LanguageProvider, useLanguage } from './i18n/LanguageContext';
import { Compass } from 'lucide-react';

const AppContent: React.FC = () => {
  const { t } = useLanguage();

  // Navigation & City selection
  const [activeTab, setActiveTab] = useState<string>('explore');
  const [selectedCity, setSelectedCity] = useState<CityConfig>(CITIES[0]); // Default to Pune
  const [places] = useState<Place[]>(PUNE_PLACES);
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Persistent storage states
  const [reports, setReports] = useState<CommunityReport[]>([]);
  const [comparedIds, setComparedIds] = useState<string[]>([]);
  const [bookmarkedIds, setBookmarkedIds] = useState<string[]>([]);
  const [upvotedReportIds, setUpvotedReportIds] = useState<string[]>([]);

  // Modals & Inspection states
  const [selectedPlace, setSelectedPlace] = useState<Place | null>(null);
  const [isReportModalOpen, setIsReportModalOpen] = useState<boolean>(false);

  // Live Weather state
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [isLoadingWeather, setIsLoadingWeather] = useState<boolean>(false);

  // Initialize data on mount
  useEffect(() => {
    setReports(getStoredReports());
    setComparedIds(getComparedPlaceIds());
    setBookmarkedIds(getBookmarkedPlaceIds());
    setUpvotedReportIds(getUpvotedReportIds());
  }, []);

  // Fetch live weather whenever city changes
  useEffect(() => {
    let isMounted = true;
    const loadWeather = async () => {
      setIsLoadingWeather(true);
      const data = await fetchLiveWeather(selectedCity.lat, selectedCity.lng, selectedCity.name);
      if (isMounted) {
        setWeather(data);
        setIsLoadingWeather(false);
      }
    };

    loadWeather();
    return () => {
      isMounted = false;
    };
  }, [selectedCity]);

  // Weather manual refresh
  const handleRefreshWeather = async () => {
    setIsLoadingWeather(true);
    const data = await fetchLiveWeather(selectedCity.lat, selectedCity.lng, selectedCity.name);
    setWeather(data);
    setIsLoadingWeather(false);
  };

  // Compare handlers
  const handleToggleCompare = (placeId: string) => {
    const updated = toggleComparePlace(placeId);
    setComparedIds(updated);
  };

  const handleClearAllCompare = () => {
    clearComparedPlaces();
    setComparedIds([]);
  };

  // Bookmark handlers
  const handleToggleBookmark = (placeId: string) => {
    const updated = toggleBookmarkPlace(placeId);
    setBookmarkedIds(updated);
  };

  // Report submission handler
  const handleAddReport = (newReport: CommunityReport) => {
    const updated = saveReport(newReport);
    setReports(updated);
  };

  // Report upvote handler
  const handleToggleUpvote = (reportId: string) => {
    const result = toggleUpvoteReport(reportId);
    setReports(result.updatedReports);
    setUpvotedReportIds(getUpvotedReportIds());
  };

  // Filtered compared places
  const comparedPlaces = places.filter(p => comparedIds.includes(p.id));

  return (
    <div className="min-h-screen bg-[#0A1128] text-slate-100 flex flex-col font-sans selection:bg-teal-500 selection:text-white">
      
      {/* Top Main Navigation Bar with Language Switcher */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        selectedCity={selectedCity}
        setSelectedCity={setSelectedCity}
        weather={weather}
        comparedCount={comparedIds.length}
        openReportModal={() => setIsReportModalOpen(true)}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />

      {/* Main Dynamic Viewport */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {activeTab === 'explore' && (
          <ExploreView
            city={selectedCity}
            places={places}
            reports={reports}
            comparedPlaceIds={comparedIds}
            bookmarkedPlaceIds={bookmarkedIds}
            onToggleCompare={handleToggleCompare}
            onToggleBookmark={handleToggleBookmark}
            onSelectPlace={(p) => setSelectedPlace(p)}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
          />
        )}

        {activeTab === 'planner' && (
          <TripPlannerView
            city={selectedCity}
            allPlaces={places}
            onSelectPlaceById={(id) => {
              const found = places.find(p => p.id === id);
              if (found) setSelectedPlace(found);
            }}
          />
        )}

        {activeTab === 'compare' && (
          <CompareView
            comparedPlaces={comparedPlaces}
            allPlaces={places}
            onRemoveFromCompare={handleToggleCompare}
            onAddToCompare={handleToggleCompare}
            onClearAll={handleClearAllCompare}
            onSelectPlace={(p) => setSelectedPlace(p)}
            onNavigateToExplore={() => setActiveTab('explore')}
          />
        )}

        {activeTab === 'reports' && (
          <ReportsView
            city={selectedCity}
            reports={reports}
            upvotedReportIds={upvotedReportIds}
            onToggleUpvote={handleToggleUpvote}
            onOpenReportModal={() => setIsReportModalOpen(true)}
          />
        )}

        {activeTab === 'insights' && (
          <InsightsView
            city={selectedCity}
            weather={weather}
            onRefreshWeather={handleRefreshWeather}
            isLoadingWeather={isLoadingWeather}
          />
        )}

        {activeTab === 'about' && (
          <AboutView />
        )}
      </main>

      {/* Place Details Slide-over / Modal */}
      <PlaceDetailModal
        place={selectedPlace}
        onClose={() => setSelectedPlace(null)}
        isCompared={selectedPlace ? comparedIds.includes(selectedPlace.id) : false}
        isBookmarked={selectedPlace ? bookmarkedIds.includes(selectedPlace.id) : false}
        onToggleCompare={handleToggleCompare}
        onToggleBookmark={handleToggleBookmark}
        reports={reports}
      />

      {/* Submit Report Modal */}
      <SubmitReportModal
        isOpen={isReportModalOpen}
        onClose={() => setIsReportModalOpen(false)}
        city={selectedCity}
        onSubmitReport={handleAddReport}
      />

      {/* Application Footer */}
      <footer className="border-t border-slate-800/80 bg-slate-950/90 text-slate-400 py-6 text-xs mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Compass className="w-4 h-4 text-teal-400" />
            <span className="font-semibold text-slate-200">{t.appName}</span>
            <span className="text-slate-500">• {t.tagline}</span>
          </div>

          <div className="flex items-center gap-4 text-[11px] text-slate-400">
            <span>Live Weather: Open-Meteo</span>
            <span>•</span>
            <span>Maps: OpenStreetMap (© contributors)</span>
            <span>•</span>
            <button 
              onClick={() => setActiveTab('about')}
              className="text-teal-400 hover:underline"
            >
              {t.navAbout}
            </button>
          </div>
        </div>
      </footer>

    </div>
  );
};

export const App: React.FC = () => {
  return (
    <LanguageProvider>
      <AppContent />
    </LanguageProvider>
  );
};

export default App;
