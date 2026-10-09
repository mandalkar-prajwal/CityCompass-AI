import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap, Circle, Polyline } from 'react-leaflet';
import L from 'leaflet';
import { Place, CommunityReport, CityConfig, ItineraryStop } from '../types';
import { Star, AlertTriangle, Accessibility, ExternalLink, Plus, Check, ShieldAlert, Layers, Navigation } from 'lucide-react';

interface MapViewProps {
  city: CityConfig;
  places: Place[];
  reports: CommunityReport[];
  selectedPlace: Place | null;
  onSelectPlace: (place: Place) => void;
  isCompared: (id: string) => boolean;
  onToggleCompare: (id: string) => void;
  focusedPlace?: Place | null;
  routeStops?: ItineraryStop[] | null;
}

// Controller component to smoothly pan/zoom map when city, focusedPlace, or route changes
const MapController: React.FC<{ 
  center: [number, number]; 
  zoom: number; 
  routeCoordinates?: [number, number][];
}> = ({ center, zoom, routeCoordinates }) => {
  const map = useMap();
  useEffect(() => {
    if (routeCoordinates && routeCoordinates.length > 1) {
      const bounds = L.latLngBounds(routeCoordinates);
      map.fitBounds(bounds, { padding: [50, 50], maxZoom: 15 });
    } else {
      map.flyTo(center, zoom, { duration: 1.2 });
    }
  }, [center, zoom, routeCoordinates, map]);
  return null;
};

export const MapView: React.FC<MapViewProps> = ({
  city,
  places,
  reports,
  onSelectPlace,
  isCompared,
  onToggleCompare,
  focusedPlace,
  routeStops
}) => {
  const [showHazardLayer, setShowHazardLayer] = useState(true);
  const [showRouteLayer, setShowRouteLayer] = useState(true);
  const [tileError, setTileError] = useState(false);

  // Determine current map center
  const center: [number, number] = focusedPlace 
    ? [focusedPlace.lat, focusedPlace.lng] 
    : [city.lat, city.lng];
  const zoom = focusedPlace ? 15 : city.zoom;

  const routeCoordinates: [number, number][] = (routeStops && routeStops.length > 0)
    ? routeStops.map(s => [s.lat, s.lng])
    : [];

  // Custom marker icon creator
  const createCategoryIcon = (category: string) => {
    let bgColor = '#0D9488'; // teal default
    let emoji = '📍';

    if (category === 'heritage') {
      bgColor = '#D97706'; // amber
      emoji = '🏛️';
    } else if (category === 'food') {
      bgColor = '#EA580C'; // orange
      emoji = '🍲';
    } else if (category === 'stays') {
      bgColor = '#6366F1'; // indigo
      emoji = '🏨';
    } else if (category === 'budget') {
      bgColor = '#059669'; // emerald
      emoji = '🪙';
    } else if (category === 'accessibility') {
      bgColor = '#0284C7'; // sky
      emoji = '♿';
    }

    return L.divIcon({
      className: 'custom-leaflet-marker',
      html: `
        <div style="
          background-color: ${bgColor};
          width: 34px;
          height: 34px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 4px 12px rgba(0,0,0,0.45);
          border: 2px solid #ffffff;
          font-size: 15px;
          cursor: pointer;
          transform: translate(-50%, -50%);
        ">
          ${emoji}
        </div>
      `,
      iconSize: [34, 34],
      iconAnchor: [17, 17],
      popupAnchor: [0, -18]
    });
  };

  // Custom route stop marker creator
  const createRouteStopIcon = (stopNumber: number) => {
    return L.divIcon({
      className: 'custom-route-marker',
      html: `
        <div style="
          background: linear-gradient(135deg, #0D9488, #0284C7);
          width: 36px;
          height: 36px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 0 0 3px rgba(255,255,255,0.9), 0 4px 14px rgba(13,148,136,0.6);
          border: 2px solid #ffffff;
          color: #ffffff;
          font-size: 14px;
          font-weight: 800;
          font-family: monospace;
          cursor: pointer;
          transform: translate(-50%, -50%);
        ">
          ${stopNumber}
        </div>
      `,
      iconSize: [36, 36],
      iconAnchor: [18, 18],
      popupAnchor: [0, -20]
    });
  };

  // Custom hazard icon creator
  const createHazardIcon = (severity: string) => {
    const color = severity === 'high' ? '#EF4444' : severity === 'moderate' ? '#F59E0B' : '#EAB308';
    return L.divIcon({
      className: 'custom-hazard-marker',
      html: `
        <div style="
          background-color: ${color};
          width: 30px;
          height: 30px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 0 0 4px rgba(239, 68, 68, 0.35);
          border: 2px solid #ffffff;
          font-size: 14px;
          cursor: pointer;
          transform: translate(-50%, -50%);
          animation: pulse 1.8s infinite;
        ">
          ⚠️
        </div>
      `,
      iconSize: [30, 30],
      iconAnchor: [15, 15],
      popupAnchor: [0, -16]
    });
  };

  return (
    <div className="relative w-full h-full min-h-[460px] rounded-xl overflow-hidden border border-slate-800 shadow-xl bg-slate-950 flex flex-col">
      
      {/* Top Map Action Bar */}
      <div className="absolute top-3 left-3 z-[400] flex flex-wrap items-center gap-2">
        <button
          onClick={() => setShowHazardLayer(!showHazardLayer)}
          className={`px-3 py-1.5 rounded-lg text-xs font-medium backdrop-blur-md transition flex items-center gap-1.5 border shadow-md ${
            showHazardLayer
              ? 'bg-amber-950/80 text-amber-300 border-amber-600/60'
              : 'bg-slate-900/80 text-slate-400 border-slate-700/60 hover:text-white'
          }`}
        >
          <AlertTriangle className="w-3.5 h-3.5 text-amber-400" />
          <span>{showHazardLayer ? 'Hazards: ON' : 'Hazards: OFF'}</span>
        </button>

        {routeStops && routeStops.length > 0 && (
          <button
            onClick={() => setShowRouteLayer(!showRouteLayer)}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium backdrop-blur-md transition flex items-center gap-1.5 border shadow-md ${
              showRouteLayer
                ? 'bg-teal-950/90 text-teal-300 border-teal-500/80'
                : 'bg-slate-900/80 text-slate-400 border-slate-700/60 hover:text-white'
            }`}
          >
            <Navigation className="w-3.5 h-3.5 text-teal-400" />
            <span>{showRouteLayer ? 'Route Path: ON' : 'Route Path: OFF'}</span>
          </button>
        )}
      </div>

      {/* Map Legend Pill */}
      <div className="absolute bottom-3 left-3 z-[400] bg-slate-900/90 backdrop-blur-md px-3 py-2 rounded-lg border border-slate-800 text-[11px] text-slate-300 space-y-1 shadow-lg hidden md:block">
        <div className="font-semibold text-slate-200 flex items-center gap-1">
          <Layers className="w-3 h-3 text-teal-400" />
          <span>Interactive Legend</span>
        </div>
        <div className="flex items-center gap-3 text-[10px]">
          <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-amber-500"></span> Heritage</span>
          <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-orange-500"></span> Food</span>
          <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-teal-500"></span> Sights</span>
          <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-indigo-500"></span> Stays</span>
          {routeStops && routeStops.length > 0 && (
            <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-sky-400 font-bold text-[8px] text-black flex items-center justify-center">#</span> Route</span>
          )}
          <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-pulse"></span> Hazard</span>
        </div>
      </div>

      {/* Map Container */}
      {tileError ? (
        <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center bg-slate-900 text-slate-300">
          <ShieldAlert className="w-10 h-10 text-amber-400 mb-2" />
          <h4 className="font-bold text-slate-200">Map Tiles Temporarily Offline</h4>
          <p className="text-xs text-slate-400 max-w-sm mt-1">
            OpenStreetMap tile server is currently unreachable. You can continue browsing places and reports in the list view.
          </p>
          <button 
            onClick={() => setTileError(false)}
            className="mt-4 px-3 py-1.5 bg-teal-600 text-white rounded-lg text-xs font-semibold"
          >
            Retry Connection
          </button>
        </div>
      ) : (
        <MapContainer
          center={center}
          zoom={zoom}
          scrollWheelZoom={true}
          className="w-full h-full z-10"
        >
          <MapController 
            center={center} 
            zoom={zoom} 
            routeCoordinates={showRouteLayer && routeCoordinates.length > 1 ? routeCoordinates : undefined}
          />

          {/* OpenStreetMap Tile Layer — free, no API key required */}
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            maxZoom={19}
            eventHandlers={{
              tileerror: () => {
                console.warn('OSM tile failed to load. Check network connectivity.');
                setTileError(true);
              }
            }}
          />

          {/* Route Polyline (Smart Route Corridor) */}
          {showRouteLayer && routeCoordinates.length > 1 && (
            <>
              {/* Outer soft shadow line */}
              <Polyline
                positions={routeCoordinates}
                pathOptions={{
                  color: '#0284C7',
                  weight: 7,
                  opacity: 0.35,
                  lineCap: 'round',
                  lineJoin: 'round'
                }}
              />
              {/* Core transit route line */}
              <Polyline
                positions={routeCoordinates}
                pathOptions={{
                  color: '#0D9488',
                  weight: 4,
                  opacity: 0.9,
                  dashArray: '8, 6',
                  lineCap: 'round',
                  lineJoin: 'round'
                }}
              />
            </>
          )}

          {/* Place Category Markers (when not in route-focused view, or all places) */}
          {places.map((place) => (
            <Marker
              key={place.id}
              position={[place.lat, place.lng]}
              icon={createCategoryIcon(place.category)}
            >
              <Popup>
                <div className="w-60 text-slate-100">
                  <div className="relative h-24 -mx-3 -mt-3 mb-2 overflow-hidden rounded-t-lg bg-slate-900">
                    <img 
                      src={place.image} 
                      alt={place.name} 
                      className="w-full h-full object-cover" 
                    />
                    <span className="absolute top-2 left-2 text-[10px] font-semibold px-2 py-0.5 rounded-full bg-slate-950/80 text-teal-300 border border-slate-700 capitalize">
                      {place.category}
                    </span>
                  </div>

                  <h4 className="font-bold text-sm text-slate-100 line-clamp-1">{place.name}</h4>
                  <p className="text-[11px] text-slate-400 mt-0.5">{place.neighbourhood}</p>

                  <div className="flex items-center justify-between text-xs mt-2 pt-2 border-t border-slate-700/60">
                    <span className="text-emerald-400 font-bold font-mono">{place.priceLevel}</span>
                    {place.rating !== undefined && (
                      <span className="flex items-center gap-1 text-amber-300 font-semibold text-[11px]">
                        <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                        {place.rating}
                      </span>
                    )}
                  </div>

                  <div className="text-[10px] text-slate-400 flex items-center gap-1 mt-1">
                    <Accessibility className={`w-3 h-3 ${place.accessibility.wheelchairAccessible ? 'text-teal-400' : 'text-slate-500'}`} />
                    <span>{place.accessibility.wheelchairAccessible ? 'Wheelchair accessible' : 'Step access'}</span>
                  </div>

                  <div className="flex items-center gap-2 mt-3 pt-2 border-t border-slate-700/60">
                    <button
                      onClick={() => onSelectPlace(place)}
                      className="flex-1 py-1 px-2 rounded bg-teal-600 hover:bg-teal-500 text-white text-[11px] font-semibold transition flex items-center justify-center gap-1"
                    >
                      <span>Details</span>
                      <ExternalLink className="w-3 h-3" />
                    </button>
                    <button
                      onClick={() => onToggleCompare(place.id)}
                      className={`p-1 rounded text-[11px] border transition ${
                        isCompared(place.id)
                          ? 'bg-teal-700 text-white border-teal-500'
                          : 'bg-slate-800 text-teal-400 border-slate-700 hover:bg-slate-700'
                      }`}
                      title="Compare place"
                    >
                      {isCompared(place.id) ? <Check className="w-3.5 h-3.5" /> : <Plus className="w-3.5 h-3.5" />}
                    </button>
                  </div>
                </div>
              </Popup>
            </Marker>
          ))}

          {/* Numbered Route Stop Markers */}
          {showRouteLayer && routeStops && routeStops.map((stop) => (
            <Marker
              key={`route-stop-${stop.stopNumber}-${stop.placeId}`}
              position={[stop.lat, stop.lng]}
              icon={createRouteStopIcon(stop.stopNumber)}
              zIndexOffset={500}
            >
              <Popup>
                <div className="w-64 text-slate-100 p-1">
                  <div className="flex items-center justify-between gap-1 mb-1.5">
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-teal-950 text-teal-300 border border-teal-700">
                      Itinerary Stop #{stop.stopNumber}
                    </span>
                    <span className="text-[11px] font-mono text-slate-400 font-semibold">
                      {stop.timeSlot}
                    </span>
                  </div>

                  <h4 className="font-bold text-sm text-white">{stop.placeName}</h4>
                  <p className="text-xs text-slate-300 mt-1">{stop.activity}</p>

                  <div className="mt-2 pt-2 border-t border-slate-700 text-[11px] space-y-1">
                    {stop.stopNumber > 1 && (
                      <div className="text-emerald-400 font-mono">
                        Leg: ~{stop.distanceFromPrevKm} km direct • {stop.transitTimeFromPrev}
                      </div>
                    )}
                    <div className="text-[10px] text-slate-400">
                      Est. Spend: <strong className="text-slate-200">{stop.estimatedCost}</strong>
                    </div>
                  </div>

                  <div className="mt-2 text-[9px] text-slate-400 bg-slate-900 p-1.5 rounded border border-slate-800 italic">
                    Coordinates proximity sequence (approx. geodesic ordering).
                  </div>
                </div>
              </Popup>
            </Marker>
          ))}

          {/* Citizen Reported Hazards & Incidents */}
          {showHazardLayer && reports.map((rep) => (
            <React.Fragment key={rep.id}>
              {/* Caution radius heat circle */}
              <Circle
                center={[rep.lat, rep.lng]}
                radius={250}
                pathOptions={{
                  color: rep.severity === 'high' ? '#EF4444' : '#F59E0B',
                  fillColor: rep.severity === 'high' ? '#EF4444' : '#F59E0B',
                  fillOpacity: 0.12,
                  weight: 1.5,
                  dashArray: '4, 4'
                }}
              />

              <Marker
                position={[rep.lat, rep.lng]}
                icon={createHazardIcon(rep.severity)}
              >
                <Popup>
                  <div className="w-60 text-slate-100">
                    <div className="flex items-center justify-between gap-1 mb-1">
                      <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-amber-950 text-amber-400 border border-amber-800/80">
                        {rep.category}
                      </span>
                      <span className="text-[9px] font-mono text-slate-400">
                        {rep.verificationStatus}
                      </span>
                    </div>

                    <h4 className="font-bold text-xs text-amber-300 mt-1">{rep.title}</h4>
                    <p className="text-[11px] text-slate-300 mt-1 leading-relaxed">{rep.description}</p>
                    
                    {/* Photo in popup if exists */}
                    {rep.photoUrl && (
                      <div className="mt-2 overflow-hidden rounded border border-slate-700">
                        <img src={rep.photoUrl} alt="Hazard preview" className="h-20 w-full object-cover" />
                      </div>
                    )}

                    <div className="mt-2 pt-2 border-t border-slate-700 text-[10px] text-slate-400 flex items-center justify-between">
                      <span>{rep.locationName}</span>
                      <span className="font-mono text-slate-500">{rep.timestamp}</span>
                    </div>

                    <div className="mt-2 text-[9px] text-slate-400 bg-slate-900 p-1.5 rounded border border-slate-800 italic">
                      ⚠️ Community-submitted notice; not official emergency dispatch.
                    </div>
                  </div>
                </Popup>
              </Marker>
            </React.Fragment>
          ))}

        </MapContainer>
      )}

    </div>
  );
};
