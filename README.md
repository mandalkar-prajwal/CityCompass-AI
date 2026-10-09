# CityCompass AI — Explore Smarter. Travel Safer. Live Better.

> **Hackathon Product Submission**  
> *Category: Urban Exploration, Situational Awareness & Civic Intelligence*  
> *Target Showcase City: Pune, Maharashtra, India*

---

## 1. Product Vision

**CityCompass AI** is an intelligent, high-transparency urban exploration and situational awareness platform built to help tourists, students, and citizens safely navigate the chaos of modern city life. It bridges the gap between commercial tourist directories (which omit hazards) and alarmist safety apps (which invent speculative crime numbers) by uniting:
- Curated local cultural, culinary, and budget discoveries.
- Real-time live meteorological telemetry via Open-Meteo.
- Dynamic deterministic itinerary planning with accessibility filtering.
- Crowdsourced civic incident tracking with community verification and local persistence.
- Zero fabricated safety scores or misleading guarantees.

---

## 2. Core Features Implemented

### A. Smart City Discovery
- **Rich Exploratory Directory:** 14 verified locations in Pune covering heritage monuments (Shaniwar Wada, Aga Khan Palace, Sinhagad Fort, Pataleshwar Caves, Dagdusheth Temple), iconic culinary landmarks (Vohuman Cafe, Vaishali, Marz-O-Rin, FC Road street food), stays (The Ritz-Carlton, Zostel Pune), and public parks (Osho Teerth Park, Saras Baug).
- **Multi-Category Filters:** Heritage & Forts, Food & Cafes, Attractions & Nature, Stays, Budget Gems, and Wheelchair Accessible Spaces.
- **Detailed Filters:** Budget tiers (Free, ₹, ₹₹, ₹₹₹), neighbourhood dropdowns, and sorting (Recommended, Highest Rating, Cleanliness Score).
- **Resilient States:** Search query filtering, clear empty states, and one-click "Reset All Filters".

### B. AI Trip Planner (Signature Feature)
- **Deterministic Smart Engine:** Algorithmic recommendation scheduler that factors in budget, duration (Half-day 3–4 hrs, Full-day, Weekend 2-day), user interests (history, food, nature, shopping, family), and mobility constraints (wheelchair ramped only, low walking).
- **Zero Paid API Barrier:** Works reliably out of the box without requiring paid keys or risk of API exhaustion during live judging.
- **Detailed Timeline:** Day breakdown by time slots (Morning, Midday, Afternoon, Sunset/Night), place rationale, estimated spend, and pro travel tips.
- **Print / PDF Export:** Formatted for easy saving.

### C. Interactive City Map
- **Geospatial Engine:** Leaflet + CartoDB Voyager tiles.
- **Custom Category Markers:** Distinguishable color-coded pins for Heritage (Amber), Food (Orange), Sights (Teal), Stays (Indigo), Accessibility (Sky Blue).
- **Hazard Overlay:** Pulsing red/amber markers and radius caution circles representing active citizen-reported civic hazards.
- **Connected Views:** Clicking card "Details" or "Map Pin" smoothly pans the map directly to that venue.

### D. Side-by-Side Place Comparison
- **Direct Metric Matrix:** Select up to 3 places to compare:
  - Price Tier & Estimated Admission / Dining Spend
  - Rating & Review Count (honest "Not available" when unverified)
  - Cleanliness / Hygiene Score
  - Wheelchair accessibility, ramp presence, and terrain intensity
  - Operating Hours
  - Active nearby reported civic issues
  - Curation source attribution
- **One-Click Presets for Judges:** Instant comparisons for "Heritage Heavyweights", "Iconic Culinary Landmarks", and "Tranquil Green Spaces".

### E. Community Civic Reports
- **Working Submission Form:** Report Road Hazards, Accidents, Cleanliness, Accessibility issues, Crowding, or Street Lighting outages.
- **Validation & Disclaimers:** Validates title, landmark, description, and requires explicit user acknowledgement that this is not an emergency dispatch.
- **Local Persistence:** Persists in browser `localStorage`.
- **Affirmation / Upvoting:** Community members can tap "Confirm Active" (+1) to track unresolved hazards.

### F. Transparent City Insights & Helplines
- **Live Weather Feed:** Fetches real-time temperature, condition text, wind velocity, humidity, and exploration advisories directly from Open-Meteo.
- **Transit & Road Advisories:** Verified guides for Pune Metro Purple Line and Sinhagad Ghat seasonal cautions.
- **Emergency Directory:** Essential numbers (112, 100, 108, 1091, PMC 1800-1030-222).

### G. Data Transparency & Ethics
- Clear separation between live API feeds and curated demonstration datasets.
- Explicit refusal to fabricate arbitrary "Safety Scores" (e.g. 8.4/10) that mislead travelers.

---

## 3. Technology Stack

- **Frontend:** React 18 + TypeScript + Vite
- **Styling:** Tailwind CSS + Lucide React icons
- **Geospatial Mapping:** Leaflet + React-Leaflet + CartoDB Voyager Tile Service
- **Live Weather API:** Open-Meteo REST API (`https://api.open-meteo.com/v1/forecast`)
- **Persistence:** Browser `localStorage` (Reports, Comparisons, Bookmarks, Upvotes)

---

## 4. Setup & Running Locally

### Prerequisites
- Node.js (v18+) & npm

### Installation
```bash
npm install
```

### Start Development Server
```bash
npm run dev
```
Open your browser at `http://localhost:5173`.

### Production Build
```bash
npm run build
npm run preview
```

---

## 5. Live Connected Services vs Demo Data

| Component | Source / API | Live or Curated |
| :--- | :--- | :--- |
| **Current Weather & Alerts** | Open-Meteo Meteorological API | **Live Connected API** |
| **Map Base Tiles** | CartoDB Voyager / OpenStreetMap | **Live Connected API** |
| **City Landmarks & Places** | ASI, PMC, MTDC Public Records | **Curated Verified Dataset** |
| **Civic Hazard Reports** | Browser LocalStorage | **Local Interactive Persistence** |
| **Trip Planner Engine** | CityCompass Algorithmic Scheduler | **Deterministic Client Engine** |

---

## 6. 90-Second Hackathon Demo Script

1. **[0:00 - 0:15] Hook & Explore:** Open `http://localhost:5173`. Point out the live Open-Meteo weather badge in the navbar (e.g. "32°C Sunny"). Switch category filters from "All" to "🏛️ Heritage" and then to "♿ Accessible Spaces" to show instant map pin updates.
2. **[0:15 - 0:35] Compare Places:** Click the "Compare" tab. Tap the one-click preset *"Iconic Culinary Landmarks"*. Show the side-by-side comparison between Vohuman Cafe, Vaishali, and Marz-O-Rin across price, hygiene, and accessibility without fabricated scores.
3. **[0:35 - 0:55] AI Trip Planner:** Click *"AI Trip Planner"*. Select **Budget: 🪙 Budget**, **Duration: Full Day**, and **Mobility: ♿ Wheelchair Accessible Only**. Click *"Generate Smart Itinerary"*. Walk judges through the time-slotted morning-to-evening circuit with rationale and cost estimates.
4. **[0:55 - 1:15] Citizen Report:** Click the orange *"+ Report Issue"* button. Select *"Road Hazard"*, enter "Pothole on JM Road", check the safety disclaimer, and submit. Show that the pin appears immediately in the Civic Reports feed and on the map. Click *"Confirm Active"* to demonstrate community affirmation.
5. **[1:15 - 1:30] City Insights & Ethics:** Navigate to *"City Insights"*. Show live wind/humidity data and emergency helplines. Conclude with the *"Data Transparency"* tab explaining why CityCompass AI never fabricates fake safety scores.
