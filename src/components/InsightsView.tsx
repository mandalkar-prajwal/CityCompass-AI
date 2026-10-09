import React from 'react';
import { 
  BarChart3, 
  CloudSun, 
  Wind, 
  Droplets, 
  Navigation, 
  Compass, 
  RefreshCw, 
  ShieldCheck, 
  PhoneCall
} from 'lucide-react';
import { CityConfig, WeatherData } from '../types';
import { PUNE_INSIGHTS } from '../data/cityInsights';
import { useLanguage } from '../i18n/LanguageContext';

interface InsightsViewProps {
  city: CityConfig;
  weather: WeatherData | null;
  onRefreshWeather: () => void;
  isLoadingWeather: boolean;
}

export const InsightsView: React.FC<InsightsViewProps> = ({
  city,
  weather,
  onRefreshWeather,
  isLoadingWeather
}) => {
  const { t } = useLanguage();
  const insights = PUNE_INSIGHTS;

  return (
    <div className="space-y-8 max-w-6xl mx-auto">
      
      {/* Header Banner */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-slate-900 via-slate-900 to-slate-800 border border-slate-800 p-6 sm:p-8 shadow-xl">
        <div className="relative z-10 max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-500/10 border border-teal-500/30 text-teal-300 text-xs font-semibold">
            <BarChart3 className="w-3.5 h-3.5 text-teal-400" />
            <span>Transparent City Intelligence & Verified Sources</span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
            {t.insightsTitle}
          </h1>

          <p className="text-sm text-slate-300 leading-relaxed">
            {t.insightsSubtitle}
          </p>
        </div>
      </div>

      {/* Live Weather Widget Section */}
      <div className="bg-slate-900/90 rounded-2xl border border-slate-800 p-6 shadow-xl space-y-4">
        
        <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-slate-800">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-400">
              <CloudSun className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-white flex items-center gap-2">
                <span>{t.weatherTitle}</span>
                {weather?.isLive ? (
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-950 text-emerald-400 border border-emerald-800/80 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                    Live Open-Meteo API
                  </span>
                ) : (
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-slate-800 text-slate-400">
                    Stationary Estimate
                  </span>
                )}
              </h2>
              <p className="text-xs text-slate-400">Station Coordinates: {city.lat}° N, {city.lng}° E</p>
            </div>
          </div>

          <button
            onClick={onRefreshWeather}
            disabled={isLoadingWeather}
            className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium border border-slate-700 flex items-center gap-1.5 transition disabled:opacity-50"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isLoadingWeather ? 'animate-spin' : ''}`} />
            <span>{isLoadingWeather ? 'Updating...' : t.refreshWeatherBtn}</span>
          </button>
        </div>

        {weather ? (
          <div className="space-y-4">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {/* Temperature */}
              <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800">
                <span className="text-xs text-slate-400 block">Temperature</span>
                <div className="text-3xl font-extrabold text-white mt-1">
                  {weather.temperature}°C
                </div>
                <span className="text-xs text-slate-400 mt-1 block">
                  Feels like {weather.feelsLike ?? weather.temperature}°C
                </span>
              </div>

              {/* Condition */}
              <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800">
                <span className="text-xs text-slate-400 block">Condition</span>
                <div className="text-lg font-bold text-teal-300 mt-2 truncate">
                  {weather.conditionText}
                </div>
                <span className="text-[11px] text-slate-500 font-mono mt-1 block">
                  WMO Code: {weather.weatherCode}
                </span>
              </div>

              {/* Wind Speed */}
              <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800">
                <span className="text-xs text-slate-400 block flex items-center gap-1">
                  <Wind className="w-3.5 h-3.5 text-slate-400" />
                  Wind Velocity
                </span>
                <div className="text-2xl font-bold text-slate-200 mt-1">
                  {weather.windSpeed} <span className="text-xs font-normal text-slate-400">km/h</span>
                </div>
                <span className="text-[11px] text-slate-400 mt-1 block">Gentle breeze</span>
              </div>

              {/* Humidity */}
              <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800">
                <span className="text-xs text-slate-400 block flex items-center gap-1">
                  <Droplets className="w-3.5 h-3.5 text-cyan-400" />
                  Relative Humidity
                </span>
                <div className="text-2xl font-bold text-cyan-300 mt-1">
                  {weather.humidity ?? 55}%
                </div>
                <span className="text-[11px] text-slate-400 mt-1 block">Comfortable level</span>
              </div>
            </div>

            {/* Weather Travel Advisory */}
            <div className="p-4 rounded-xl bg-teal-950/30 border border-teal-800/40 flex items-start gap-3">
              <Compass className="w-5 h-5 text-teal-400 shrink-0 mt-0.5" />
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-teal-300">
                  Exploration Advisory
                </h4>
                <p className="text-xs text-slate-200 mt-0.5 leading-relaxed">
                  {weather.advisory}
                </p>
                <p className="text-[11px] text-slate-400 mt-1">
                  Source: <a href="https://open-meteo.com/" target="_blank" rel="noreferrer" className="text-teal-400 underline">Open-Meteo Open Data</a> • Last synchronized at {weather.fetchedAt}
                </p>
              </div>
            </div>
          </div>
        ) : (
          <div className="p-6 text-center text-xs text-slate-400">
            Weather feed is currently loading...
          </div>
        )}

      </div>

      {/* Verified City Advisories & Transit Cards */}
      <div className="space-y-4">
        <h2 className="text-lg font-bold text-white flex items-center gap-2">
          <Navigation className="w-4 h-4 text-teal-400" />
          <span>Verified Municipal & Transit Advisories</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {insights.map((item) => (
            <div 
              key={item.id}
              className="bg-slate-900/90 rounded-xl border border-slate-800 p-5 space-y-3 shadow-lg flex flex-col justify-between"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-slate-800 text-teal-300 border border-slate-700">
                    {item.badge}
                  </span>
                  <span className={`text-[10px] font-mono px-2 py-0.5 rounded ${
                    item.isVerified 
                      ? 'bg-emerald-950 text-emerald-400 border border-emerald-800/60' 
                      : 'bg-slate-950 text-slate-400 border border-slate-800'
                  }`}>
                    {item.statusText}
                  </span>
                </div>

                <h3 className="font-bold text-base text-white">{item.title}</h3>
                <p className="text-xs text-slate-300 leading-relaxed">{item.description}</p>
              </div>

              <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-400">
                <span className="truncate">Source: <strong className="text-slate-300">{item.source}</strong></span>
                <span className="shrink-0 font-mono text-[10px] text-slate-500">{item.timestamp}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Safety Awareness & Emergency Helpline Matrix */}
      <div className="bg-slate-900/90 rounded-2xl border border-slate-800 p-6 shadow-xl space-y-4">
        
        <div className="flex items-center gap-2.5 pb-2 border-b border-slate-800">
          <div className="p-2 rounded-xl bg-rose-950/50 border border-rose-800/60 text-rose-400">
            <PhoneCall className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-bold text-white">{t.emergencyTitle}</h3>
            <p className="text-xs text-slate-400">{t.emergencySubtitle}</p>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 text-xs">
          {[
            { label: 'All Emergency Dispatch', number: '112', desc: 'Police, Fire & Medical' },
            { label: 'Pune City Police', number: '100 / 020-26122880', desc: 'Direct Police Control' },
            { label: 'Medical Ambulance', number: '108', desc: 'Emergency response' },
            { label: 'Women Helpline', number: '1091', desc: '24/7 dedicated assistance' },
            { label: 'PMC Civic Grievance', number: '1800-1030-222', desc: 'Municipal issues' }
          ].map((contact, idx) => (
            <div key={idx} className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
              <span className="text-[11px] text-slate-400 block">{contact.label}</span>
              <span className="font-mono font-bold text-rose-400 text-sm block">{contact.number}</span>
              <span className="text-[10px] text-slate-500 block">{contact.desc}</span>
            </div>
          ))}
        </div>

        {/* Safety Disclaimer Banner */}
        <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 text-xs text-slate-400 space-y-2">
          <div className="flex items-center gap-2 text-slate-200 font-semibold">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>{t.safetyProtocolTitle}</span>
          </div>
          <p className="leading-relaxed">
            {t.safetyProtocolDesc}
          </p>
        </div>

      </div>

    </div>
  );
};
