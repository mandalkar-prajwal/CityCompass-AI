import { CivicInsight } from '../types';

export const PUNE_INSIGHTS: CivicInsight[] = [
  {
    id: 'ins-metro-purple',
    type: 'traffic',
    title: 'Pune Metro Purple Line Route & Fares',
    description: 'PCMC to Swargate metro line now operates stations across Shivajinagar, Civil Court, and Mandai. Fast, air-conditioned transport bypassing Old Pune bottlenecks. Feeder e-rickshaws available at Shivajinagar.',
    badge: 'Transit Advisory',
    source: 'Maha Metro Rail Corporation (PMRCL)',
    timestamp: 'Updated 4 hours ago',
    isVerified: true,
    statusText: 'Verified Public Transit Guide'
  },
  {
    id: 'ins-monsoon-sinhagad',
    type: 'safety_notice',
    title: 'Ghat Road Caution & Monsoon Slippage',
    description: 'During rain showers, the 8km mountain ghat road up to Sinhagad Fort can experience loose gravel and fog. Two-wheelers should maintain under 25 km/h. Avoid edge parking near hairpin curves.',
    badge: 'Weather & Terrain Caution',
    source: 'District Disaster Management Authority (Pune)',
    timestamp: 'Seasonal Advisory',
    isVerified: true,
    statusText: 'Verified Forest & Road Caution'
  },
  {
    id: 'ins-heritage-walk',
    type: 'heritage',
    title: 'Historic Peth Walk Route (Old Pune)',
    description: 'For cultural travelers: Walk from Shaniwar Wada → Kasba Ganpati → Lal Mahal → Phule Mandai → Vishrambaug Wada. Best explored on foot between 7:30 AM and 10:30 AM before market traffic peaks.',
    badge: 'Curated Heritage Walk',
    source: 'Pune Heritage Cell & INTACH Pune',
    timestamp: 'Editorial Heritage Trail',
    isVerified: true,
    statusText: 'Verified Cultural Route'
  },
  {
    id: 'ins-student-budget',
    type: 'budget_tip',
    title: 'Student & Budget Dining Guide',
    description: 'Pune offers exceptional value meals: Unlimited Maharashtrian Thalis along Tilak Road (₹120-180), iconic Irani breakfast at Vohuman/Cafe Goodluck (₹110), and filter coffee with SPDP at FC Road.',
    badge: 'Budget Guide',
    source: 'CityCompass Local Curators',
    timestamp: 'Curated Demo Guide',
    isVerified: false,
    statusText: 'Curated Editorial Recommendation'
  },
  {
    id: 'ins-pmc-cleanliness',
    type: 'civic',
    title: 'Swachh Pune Door-to-Door Waste Collection',
    description: 'PMC zero-waste segregation is in effect across all 15 administrative wards. Public dustbins installed at 200-meter intervals along FC Road, JM Road, and MG Road Camp.',
    badge: 'Civic Infrastructure',
    source: 'Pune Municipal Corporation (PMC)',
    timestamp: 'Official Civic Update',
    isVerified: true,
    statusText: 'Verified Civic Record'
  }
];
