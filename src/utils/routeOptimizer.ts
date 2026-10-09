import { ItineraryStop, Place } from '../types';

/**
 * Calculates the great-circle (geodesic) distance between two points on Earth using the Haversine formula.
 * Returns distance in kilometers rounded to 1 decimal place.
 */
export function calculateHaversineDistanceKm(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const R = 6371; // Earth's radius in kilometers
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a = 
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c;
  return Math.round(distance * 10) / 10;
}

/**
 * Estimates average urban transit time based on Pune traffic patterns (~15 km/h avg pace in dense corridors + 3 min staging)
 */
export function estimateUrbanTransitTime(distanceKm: number): string {
  if (distanceKm <= 0.3) {
    return '4–7 min walk / hop';
  }
  const minMinutes = Math.max(6, Math.round(distanceKm * 3.5 + 3));
  const maxMinutes = Math.round(minMinutes * 1.35);
  return `~${minMinutes}–${maxMinutes} min transit est.`;
}

/**
 * Orders a set of raw itinerary stops to minimize total travel distance using a Nearest-Neighbor algorithm,
 * anchored at the primary opening/morning venue.
 */
export function optimizeStopSequence(rawStops: Omit<ItineraryStop, 'stopNumber'>[]): {
  orderedStops: ItineraryStop[];
  totalDirectDistanceKm: number;
  explanation: string;
} {
  if (rawStops.length <= 1) {
    const singleStop: ItineraryStop[] = rawStops.map(s => ({
      ...s,
      stopNumber: 1,
      distanceFromPrevKm: 0,
      transitTimeFromPrev: 'Starting Point',
      transitNote: 'Itinerary departure hub'
    }));
    return {
      orderedStops: singleStop,
      totalDirectDistanceKm: 0,
      explanation: 'Single destination circuit.'
    };
  }

  // Anchor at the first stop (typically breakfast or morning monument)
  const remaining = [...rawStops.slice(1)];
  const ordered: Omit<ItineraryStop, 'stopNumber'>[] = [rawStops[0]];

  let current = rawStops[0];
  while (remaining.length > 0) {
    let nearestIndex = 0;
    let minDistance = calculateHaversineDistanceKm(current.lat, current.lng, remaining[0].lat, remaining[0].lng);

    for (let i = 1; i < remaining.length; i++) {
      const dist = calculateHaversineDistanceKm(current.lat, current.lng, remaining[i].lat, remaining[i].lng);
      if (dist < minDistance) {
        minDistance = dist;
        nearestIndex = i;
      }
    }

    const nextStop = remaining.splice(nearestIndex, 1)[0];
    ordered.push(nextStop);
    current = nextStop;
  }

  // Calculate distances between consecutive stops
  let totalDistance = 0;
  const finalStops: ItineraryStop[] = ordered.map((stop, index) => {
    if (index === 0) {
      return {
        ...stop,
        stopNumber: 1,
        distanceFromPrevKm: 0,
        transitTimeFromPrev: 'Departure Hub',
        transitNote: 'Starting location'
      };
    }

    const prev = ordered[index - 1];
    const legDistance = calculateHaversineDistanceKm(prev.lat, prev.lng, stop.lat, stop.lng);
    totalDistance += legDistance;

    return {
      ...stop,
      stopNumber: index + 1,
      distanceFromPrevKm: legDistance,
      transitTimeFromPrev: estimateUrbanTransitTime(legDistance),
      transitNote: `Approx. ${legDistance} km direct line from Stop ${index}`
    };
  });

  const roundedTotal = Math.round(totalDistance * 10) / 10;
  const explanation = `Stops are sequenced via coordinate-based nearest-neighbor proximity starting from ${finalStops[0].placeName}. This minimizes zigzagging between Old Pune peths and outer ring corridors, keeping total direct transit footprint to approx. ${roundedTotal} km.`;

  return {
    orderedStops: finalStops,
    totalDirectDistanceKm: roundedTotal,
    explanation
  };
}
