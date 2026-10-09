export type Language = 'en' | 'mr' | 'hi';

export type PlaceCategory = 
  | 'attractions' 
  | 'food' 
  | 'heritage' 
  | 'stays' 
  | 'budget' 
  | 'accessibility';

export interface AccessibilityInfo {
  wheelchairAccessible: boolean;
  elevatorAvailable?: boolean;
  accessibleRestrooms?: boolean;
  lowWalkingRequired?: boolean;
  notes: string;
}

export interface Place {
  id: string;
  name: string;
  localName?: {
    mr: string;
    hi: string;
  };
  category: PlaceCategory;
  subcategory: string;
  city: string;
  neighbourhood: string;
  lat: number;
  lng: number;
  priceLevel: 'Free' | '₹' | '₹₹' | '₹₹₹';
  estimatedCost: string;
  rating?: number; // Real or undefined if not available
  reviewCount?: number;
  cleanlinessRating?: number; // 1-5 scale
  accessibility: AccessibilityInfo;
  image: string;
  description: string;
  whyVisit: string;
  popularFor: string[];
  openingHours: string;
  address: string;
  activeReportsCount: number;
  isDemoData: boolean;
  curationSource: string;
}

export type ReportCategory = 
  | 'Road Hazard' 
  | 'Accident' 
  | 'Cleanliness' 
  | 'Accessibility Issue' 
  | 'Crowding' 
  | 'Street Lighting' 
  | 'Other';

export type ReportStatus = 'Unverified' | 'Community Noted' | 'Under Review';

export interface CommunityReport {
  id: string;
  category: ReportCategory;
  title: string;
  locationName: string;
  city: string;
  lat: number;
  lng: number;
  description: string;
  photoUrl?: string;
  photoName?: string;
  photoSizeKb?: number;
  timestamp: string;
  verificationStatus: ReportStatus;
  upvotes: number;
  isLocalOnly: boolean;
  severity: 'low' | 'moderate' | 'high';
}

export interface CityConfig {
  id: string;
  name: string;
  state: string;
  country: string;
  lat: number;
  lng: number;
  zoom: number;
  tagline: string;
  description: string;
}

export interface TripPlannerInput {
  cityId: string;
  budget: 'budget' | 'moderate' | 'comfort';
  duration: 'half_day' | 'full_day' | 'weekend';
  interests: string[];
  mobilityPreference: 'all' | 'accessible_only' | 'low_walking';
  customNotes?: string;
}

export interface ItineraryStop {
  stopNumber: number;
  timeSlot: string;
  placeId: string;
  placeName: string;
  category: PlaceCategory;
  activity: string;
  rationale: string;
  estimatedCost: string;
  travelTip: string;
  accessibilityNote?: string;
  lat: number;
  lng: number;
  distanceFromPrevKm?: number; // Approximate direct line distance
  transitTimeFromPrev?: string; // Estimated urban transit time
  transitNote?: string; // Clear disclaimer label
}

export interface ItineraryDay {
  dayNumber: number;
  theme: string;
  summary: string;
  stops: ItineraryStop[];
  totalEstimatedCost: string;
  walkingIntensity: 'Low' | 'Moderate' | 'High';
  totalDirectDistanceKm: number;
  routeExplanation: string;
}

export interface GeneratedItinerary {
  id: string;
  city: string;
  title: string;
  overview: string;
  days: ItineraryDay[];
  disclaimer: string;
  generatedAt: string;
  matchScore: number;
  isRouteOptimized: boolean;
}

export interface WeatherData {
  city: string;
  temperature: number;
  weatherCode: number;
  conditionText: string;
  windSpeed: number;
  humidity?: number;
  precipitation?: number;
  feelsLike?: number;
  advisory: string;
  isLive: boolean;
  fetchedAt: string;
}

export interface CivicInsight {
  id: string;
  type: 'traffic' | 'civic' | 'heritage' | 'safety_notice' | 'budget_tip';
  title: string;
  description: string;
  badge: string;
  source: string;
  timestamp: string;
  isVerified: boolean;
  statusText: string;
}
