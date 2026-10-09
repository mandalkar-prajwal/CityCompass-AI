import { CommunityReport } from '../types';

export const INITIAL_REPORTS: CommunityReport[] = [
  {
    id: 'rep-pune-001',
    category: 'Road Hazard',
    title: 'Metro Pillar Repair & Lane Barricade',
    locationName: 'Jangli Maharaj (JM) Road, near Deccan Gymkhana',
    city: 'pune',
    lat: 18.5218,
    lng: 73.8442,
    description: 'Ongoing metro feeder barricades reduce southbound traffic from three lanes to single file. Expect 10-15 min peak hour delays.',
    timestamp: '2 hours ago',
    verificationStatus: 'Community Noted',
    upvotes: 14,
    isLocalOnly: true,
    severity: 'moderate'
  },
  {
    id: 'rep-pune-002',
    category: 'Crowding',
    title: 'High Evening Aarti Rush & Limited Footpath Width',
    locationName: 'Shreemant Dagdusheth Ganpati, Budhwar Peth',
    city: 'pune',
    lat: 18.5164,
    lng: 73.8561,
    description: 'Substantial pedestrian influx on Tuesday evenings between 6:30 PM and 8:30 PM. Wheelchair users advised to enter via North gate ramp before 5:00 PM.',
    timestamp: '5 hours ago',
    verificationStatus: 'Community Noted',
    upvotes: 27,
    isLocalOnly: true,
    severity: 'low'
  },
  {
    id: 'rep-pune-003',
    category: 'Street Lighting',
    title: 'Flickering Street Lamp on Heritage Approach Lane',
    locationName: 'Shaniwar Wada Rear Garden Alley, Kasba Peth',
    city: 'pune',
    lat: 18.5188,
    lng: 73.8540,
    description: 'Citizen report: Streetlights between the rear gate and Kasba Ganpati corner are intermittent after 9 PM. Pedestrians advised to stick to the main road.',
    timestamp: 'Yesterday at 9:40 PM',
    verificationStatus: 'Unverified',
    upvotes: 8,
    isLocalOnly: true,
    severity: 'moderate'
  },
  {
    id: 'rep-pune-004',
    category: 'Cleanliness',
    title: 'Overflowing Plastic Waste Near Ghat Parking Lot',
    locationName: 'Sinhagad Ghat Lower Parking Point',
    city: 'pune',
    lat: 18.3685,
    lng: 73.7592,
    description: 'Post-weekend plastic and packaging backlog accumulated near the shared taxi stand. Forest department cleanup scheduled for Wednesday morning.',
    timestamp: '1 day ago',
    verificationStatus: 'Unverified',
    upvotes: 19,
    isLocalOnly: true,
    severity: 'low'
  },
  {
    id: 'rep-pune-005',
    category: 'Accessibility Issue',
    title: 'Broken Curb Ramp at Pedestrian Crossing',
    locationName: 'FC Road near Goodluck Chowk',
    city: 'pune',
    lat: 18.5230,
    lng: 73.8420,
    description: 'Curb cut damaged by utility trenching; temporary metal plate installed but has an uneven 3-inch lip. Electric wheelchair users require assistance.',
    timestamp: '2 days ago',
    verificationStatus: 'Under Review',
    upvotes: 31,
    isLocalOnly: true,
    severity: 'moderate'
  }
];
