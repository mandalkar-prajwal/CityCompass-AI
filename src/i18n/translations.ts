import { Language } from '../types';

export interface TranslationDictionary {
  // Brand & Slogan
  appName: string;
  tagline: string;
  prototypeBanner: string;
  prototypeBannerSub: string;
  unverifiedBadge: string;

  // Nav Items
  navExplore: string;
  navPlanner: string;
  navCompare: string;
  navReports: string;
  navInsights: string;
  navAbout: string;
  reportIssueBtn: string;
  searchPlaceholder: string;
  cityFocus: string;

  // Categories
  catAll: string;
  catHeritage: string;
  catFood: string;
  catAttractions: string;
  catStays: string;
  catBudget: string;
  catAccessibility: string;

  // Filters & Sorting
  filterCost: string;
  filterArea: string;
  filterWheelchairOnly: string;
  filterReset: string;
  sortLabel: string;
  sortRecommended: string;
  sortRating: string;
  sortCleanliness: string;
  allTiers: string;
  allAreas: string;

  // Place Card & Modals
  cardDetails: string;
  cardCompare: string;
  cardAdded: string;
  cardSaved: string;
  cardSave: string;
  cardFreeEntry: string;
  cardWheelchairReady: string;
  cardLimitedRamp: string;
  cardHygiene: string;
  cardNoHazards: string;
  cardCommunityNotices: string;
  cardFocusMap: string;
  ratingNotAvail: string;

  // AI Trip Planner & Route
  plannerTitle: string;
  plannerSubtitle: string;
  budgetPref: string;
  timeWindow: string;
  halfDay: string;
  fullDay: string;
  weekend: string;
  coreInterests: string;
  mobilityMode: string;
  mobilityAll: string;
  mobilityWheelchair: string;
  mobilityLowWalking: string;
  generateItineraryBtn: string;
  generatingBtn: string;
  routeSequencingBadge: string;
  routeExplanationTitle: string;
  directDistanceLabel: string;
  estTransitTimeLabel: string;
  stopNumberLabel: string;
  whyThisStop: string;
  proTravelTip: string;
  viewRouteOnMapBtn: string;
  routeMapTitle: string;
  approxTransitNotice: string;
  printPdfBtn: string;
  preferenceMatch: string;
  estSpend: string;
  walkingIntensity: string;

  // Compare
  compareTitle: string;
  compareSubtitle: string;
  comparingCount: string;
  clearAllBtn: string;
  addPlacePrompt: string;
  featureMetric: string;
  metricPriceTier: string;
  metricRating: string;
  metricCleanliness: string;
  metricAccessibility: string;
  metricHours: string;
  metricHighlights: string;
  metricSafetyNotices: string;
  metricDataSource: string;
  oneClickPresets: string;
  emptyCompareTitle: string;
  emptyCompareDesc: string;
  browsePlacesBtn: string;
  loadSampleBtn: string;

  // Reports
  reportsTitle: string;
  reportsSubtitle: string;
  submitNewReportBtn: string;
  activeNoticesLogged: string;
  localStorageNoticeTitle: string;
  localStorageNoticeDesc: string;
  allReportsFilter: string;
  confirmActiveBtn: string;
  affirmedBtn: string;
  unverifiedStatus: string;
  communityNotedStatus: string;
  underReviewStatus: string;
  priorityHigh: string;
  priorityModerate: string;
  priorityLow: string;

  // Submit Modal
  modalReportTitle: string;
  modalReportSub: string;
  fieldCategory: string;
  fieldSeverity: string;
  fieldHeadline: string;
  fieldLocation: string;
  fieldDescription: string;
  fieldPhotoUpload: string;
  fieldPhotoUploadSub: string;
  fieldPhotoSelected: string;
  fieldRemovePhoto: string;
  fieldDisclaimerCheck: string;
  cancelBtn: string;
  submitBtn: string;
  successTitle: string;
  successDesc: string;
  errTitleReq: string;
  errLocReq: string;
  errDescReq: string;
  errTermsReq: string;
  errFileSize: string;
  errFileType: string;

  // Insights & Safety
  insightsTitle: string;
  insightsSubtitle: string;
  weatherTitle: string;
  refreshWeatherBtn: string;
  emergencyTitle: string;
  emergencySubtitle: string;
  safetyProtocolTitle: string;
  safetyProtocolDesc: string;
}

export const TRANSLATIONS: Record<Language, TranslationDictionary> = {
  en: {
    appName: 'CityCompass AI',
    tagline: 'Explore Smarter • Travel Safer • Live Better',
    prototypeBanner: 'Live Hackathon Prototype:',
    prototypeBannerSub: 'Showing verified Pune municipal records + real-time Open-Meteo weather.',
    unverifiedBadge: 'Unverified reports clearly flagged',

    navExplore: 'Explore & Map',
    navPlanner: 'AI Trip Planner',
    navCompare: 'Compare',
    navReports: 'Civic Reports',
    navInsights: 'City Insights',
    navAbout: 'Data Transparency',
    reportIssueBtn: 'Report Issue',
    searchPlaceholder: 'Search landmarks, food, stays...',
    cityFocus: 'City Focus:',

    catAll: 'All Highlights',
    catHeritage: 'Heritage & Forts',
    catFood: 'Local Food & Cafes',
    catAttractions: 'Attractions & Nature',
    catStays: 'Hotels & Hostels',
    catBudget: 'Budget Gems',
    catAccessibility: 'Accessible Spaces',

    filterCost: 'Cost:',
    filterArea: 'Area:',
    filterWheelchairOnly: '♿ Wheelchair Ready Only',
    filterReset: 'Reset',
    sortLabel: 'Sort:',
    sortRecommended: 'Recommended',
    sortRating: 'Highest Rating',
    sortCleanliness: 'Cleanliness Score',
    allTiers: 'All Tiers',
    allAreas: 'All Areas',

    cardDetails: 'Details',
    cardCompare: 'Compare',
    cardAdded: 'Added',
    cardSaved: 'Saved',
    cardSave: 'Save',
    cardFreeEntry: 'Free Entry',
    cardWheelchairReady: 'Wheelchair Ready',
    cardLimitedRamp: 'Limited Ramp Access',
    cardHygiene: 'Hygiene',
    cardNoHazards: 'No Active Reported Hazards',
    cardCommunityNotices: 'Community Notice(s)',
    cardFocusMap: 'Focus on Map',
    ratingNotAvail: 'Rating N/A',

    plannerTitle: 'AI City Itinerary Planner',
    plannerSubtitle: 'Craft a realistic, geocoded schedule for exploring Pune balanced across budget, transport distances, opening hours, and personal mobility constraints.',
    budgetPref: 'Budget Preference',
    timeWindow: 'Available Time Window',
    halfDay: 'Half-Day (3-4 hrs)',
    fullDay: 'Full Day (8-10 hrs)',
    weekend: 'Weekend (2 Days)',
    coreInterests: 'Core Interests',
    mobilityMode: 'Mobility & Accessibility Mode',
    mobilityAll: 'All Attractions',
    mobilityWheelchair: '♿ Step-Free / Wheelchair Accessible Only',
    mobilityLowWalking: '🚶 Low Walking Distance',
    generateItineraryBtn: 'Generate Smart Itinerary',
    generatingBtn: 'Assembling Optimal Route...',
    routeSequencingBadge: 'Smart Route Sequencing Active',
    routeExplanationTitle: 'Route Optimization Rationale',
    directDistanceLabel: 'Approx. Direct Distance',
    estTransitTimeLabel: 'Est. Urban Transit',
    stopNumberLabel: 'Stop',
    whyThisStop: 'Why this stop',
    proTravelTip: 'Pro Tip',
    viewRouteOnMapBtn: 'Inspect Route on Map',
    routeMapTitle: 'Geospatial Route Corridor',
    approxTransitNotice: 'Distances are approximate coordinate-based measurements with typical urban transit estimates. Not verified turn-by-turn road measurements.',
    printPdfBtn: 'Print / PDF',
    preferenceMatch: 'Preference Match',
    estSpend: 'Est. Spend',
    walkingIntensity: 'Walking',

    compareTitle: 'Compare Places Transparently',
    compareSubtitle: 'Evaluate price brackets, verified cleanliness ratings, wheelchair accessibility, and community hazard alerts side-by-side without fabricated scores.',
    comparingCount: 'Comparing',
    clearAllBtn: 'Clear All',
    addPlacePrompt: '+ Add Place to Compare...',
    featureMetric: 'Feature / Metric',
    metricPriceTier: 'Price Tier',
    metricRating: 'Rating & Reviews',
    metricCleanliness: 'Cleanliness Assessment',
    metricAccessibility: 'Mobility & Accessibility',
    metricHours: 'Opening Hours',
    metricHighlights: 'Notable Features',
    metricSafetyNotices: 'Community Safety Reports',
    metricDataSource: 'Data Source',
    oneClickPresets: 'One-Click Demos:',
    emptyCompareTitle: 'No places currently in comparison tray',
    emptyCompareDesc: 'Select 2 to 3 places from the Explore view or choose one of the instant presets above to compare pricing, accessibility, and community flags.',
    browsePlacesBtn: 'Browse Places to Compare',
    loadSampleBtn: 'Load Sample Comparison',

    reportsTitle: 'Community Civic & Hazard Reports',
    reportsSubtitle: 'Report road hazards, accidents, lighting issues, and accessibility bottlenecks. Help fellow travelers and citizens stay informed.',
    submitNewReportBtn: 'Submit New Civic Report',
    activeNoticesLogged: 'total active notices logged',
    localStorageNoticeTitle: 'Local Storage & Verification Notice',
    localStorageNoticeDesc: 'Community reports in this demonstration are stored locally in your browser session. All citizen submissions are classified as "Unverified" until vetted by municipal staff or affirmed by community consensus. Never treat unverified crowd submissions as emergency confirmations.',
    allReportsFilter: 'All Reports',
    confirmActiveBtn: 'Confirm Active',
    affirmedBtn: 'Affirmed',
    unverifiedStatus: 'Unverified',
    communityNotedStatus: 'Community Noted',
    underReviewStatus: 'Under Review',
    priorityHigh: 'High Priority',
    priorityModerate: 'Moderate Priority',
    priorityLow: 'Low Priority',

    modalReportTitle: 'Report Civic or Road Issue',
    modalReportSub: 'Crowdsourced Alert (Stored Locally)',
    fieldCategory: 'Issue Category',
    fieldSeverity: 'Severity / Urgency',
    fieldHeadline: 'Headline / Summary',
    fieldLocation: 'Location or Landmark',
    fieldDescription: 'Detailed Description',
    fieldPhotoUpload: 'Attach Photo (Optional)',
    fieldPhotoUploadSub: 'Select JPG, PNG or WebP image (Max 2.5MB). Stored locally in browser.',
    fieldPhotoSelected: 'Photo selected:',
    fieldRemovePhoto: 'Remove photo',
    fieldDisclaimerCheck: 'I understand this report and photo will be stored in my local browser and displayed as an unverified community notice. This platform does not contact emergency services.',
    cancelBtn: 'Cancel',
    submitBtn: 'Submit Citizen Report',
    successTitle: 'Report Submitted Successfully',
    successDesc: 'Your notice has been added to the community log and mapped. It is currently tagged as "Unverified" pending review.',
    errTitleReq: 'Headline / Title is required',
    errLocReq: 'Specific location or landmark is required',
    errDescReq: 'Please provide details describing the hazard',
    errTermsReq: 'You must confirm the safety awareness statement',
    errFileSize: 'Image exceeds 2.5MB limit. Please upload a smaller photo.',
    errFileType: 'Only JPG, PNG, and WebP images are supported.',

    insightsTitle: 'City Insights & Situational Intelligence',
    insightsSubtitle: 'Real-time meteorological readings, public transit advisories, heritage trails, and emergency resources for Pune without fabricated safety ratings.',
    weatherTitle: 'Current Meteorological Conditions',
    refreshWeatherBtn: 'Refresh Live Weather',
    emergencyTitle: 'Emergency Services & Urban Contacts',
    emergencySubtitle: 'Essential public contact numbers for Pune & Maharashtra State',
    safetyProtocolTitle: 'Ethical Safety Protocol',
    safetyProtocolDesc: 'CityCompass AI does not label neighborhoods "Safe" or "Unsafe" without authoritative, contextual empirical data. We display crowdsourced citizen notices with transparent verification tags and timestamps so travelers can make informed personal decisions.'
  },

  mr: {
    appName: 'सिटीकंपास एआय',
    tagline: 'हुशारीने फिरा • सुरक्षित प्रवास करा • उत्तम जगा',
    prototypeBanner: 'थेट हॅकाथॉन प्रोटोटाइप:',
    prototypeBannerSub: 'पुणे महानगरपालिकेची अधिकृत माहिती + ओपन-मेटिओ थेट हवामान अपडेट.',
    unverifiedBadge: 'तपासणी बाकी अहवाल स्पष्टपणे चिन्हांकित',

    navExplore: 'अन्वेषण आणि नकाशा',
    navPlanner: 'एआय सहल नियोजन',
    navCompare: 'तुलना करा',
    navReports: 'नागरी तक्रारी',
    navInsights: 'शहर माहिती',
    navAbout: 'माहिती पारदर्शकता',
    reportIssueBtn: 'तक्रार नोंदवा',
    searchPlaceholder: 'ऐतिहासिक स्थळे, खाद्यसंस्कृती, हॉटेल्स शोधा...',
    cityFocus: 'शहर निवडा:',

    catAll: 'सर्व मुख्य आकर्षणे',
    catHeritage: 'वारसा आणि किल्ले',
    catFood: 'स्थानिक खाद्यसंस्कृती',
    catAttractions: 'आकर्षणे आणि निसर्ग',
    catStays: 'हॉटेल्स आणि निवास',
    catBudget: 'किफायतशीर पर्याय',
    catAccessibility: 'सुलभ प्रवेश स्थळे',

    filterCost: 'खर्च:',
    filterArea: 'परिसर:',
    filterWheelchairOnly: '♿ फक्त व्हीलचेअर सुलभ स्थळे',
    filterReset: 'रीसेट',
    sortLabel: 'क्रमवारी:',
    sortRecommended: 'शिफारस केलेले',
    sortRating: 'सर्वोच्च रेटिंग',
    sortCleanliness: 'स्वच्छता गुण',
    allTiers: 'सर्व खर्च स्तर',
    allAreas: 'सर्व परिसर',

    cardDetails: 'सविस्तर',
    cardCompare: 'तुलना',
    cardAdded: 'जोडले',
    cardSaved: 'जतन केले',
    cardSave: 'जतन करा',
    cardFreeEntry: 'मोफत प्रवेश',
    cardWheelchairReady: 'व्हीलचेअर सुलभ',
    cardLimitedRamp: 'पायऱ्या / मर्यादित रॅम्प',
    cardHygiene: 'स्वच्छता',
    cardNoHazards: 'कोणतीही सक्रिय तक्रार नाही',
    cardCommunityNotices: 'नागरी सूचना',
    cardFocusMap: 'नकाशावर पहा',
    ratingNotAvail: 'रेटिंग उपलब्ध नाही',

    plannerTitle: 'एआय शहर सहल नियोजन व मार्गदर्शक',
    plannerSubtitle: 'बजेट, प्रवास अंतर, उघडण्याच्या वेळा आणि सुलभता यानुसार पुण्यातील सर्वोत्तम, व्यावहारिक व कमी प्रवासाचा मार्ग तयार करा.',
    budgetPref: 'बजेट प्राधान्य',
    timeWindow: 'उपलब्ध वेळ',
    halfDay: 'अर्धा दिवस (३-४ तास)',
    fullDay: 'पूर्ण दिवस (८-१० तास)',
    weekend: 'शनिवार-रविवार (२ दिवस)',
    coreInterests: 'मुख्य आवडी निवडी',
    mobilityMode: 'सुलभता व चालणे प्राधान्य',
    mobilityAll: 'सर्व ऐतिहासिक व पर्यटन स्थळे',
    mobilityWheelchair: '♿ फक्त पायऱ्या नसलेली / रॅम्प असलेली स्थळे',
    mobilityLowWalking: '🚶 कमी चालावे लागणारी स्थळे',
    generateItineraryBtn: 'स्मार्ट मार्ग व सहल तयार करा',
    generatingBtn: 'अनुकूल मार्ग तयार करत आहे...',
    routeSequencingBadge: 'स्मार्ट मार्ग क्रमवारी सक्रिय',
    routeExplanationTitle: 'मार्ग क्रमवारीचे कारण',
    directDistanceLabel: 'अंदाजे थेट अंतर',
    estTransitTimeLabel: 'अंदाजे प्रवास वेळ',
    stopNumberLabel: 'थांबा',
    whyThisStop: 'हे ठिकाण का निवडले',
    proTravelTip: 'महत्त्वाची टीप',
    viewRouteOnMapBtn: 'नकाशावर संपूर्ण मार्ग पहा',
    routeMapTitle: 'भौगोलिक मार्ग नकाशा',
    approxTransitNotice: 'दिलेले अंतर हे नकाशावरील निर्देशांकांवर आधारित अंदाजे थेट अंतर आणि सरासरी शहर प्रवासाचा अंदाज आहे. अधिकृत वळणावळणाचा रस्ता नकाशा नाही.',
    printPdfBtn: 'प्रिंट / पीडीएफ',
    preferenceMatch: 'पसंती जुळवणी',
    estSpend: 'अंदाजे खर्च',
    walkingIntensity: 'चालण्याची तीव्रता',

    compareTitle: 'ठिकाणांची पारदर्शक तुलना करा',
    compareSubtitle: 'खर्च, स्वच्छता गुण, व्हीलचेअर सुलभता आणि आजूबाजूच्या तक्रारींची तुलना करा. बनावट गुणांशिवाय खरी माहिती.',
    comparingCount: 'तुलना करत आहे',
    clearAllBtn: 'सर्व हटवा',
    addPlacePrompt: '+ तुलना करण्यासाठी ठिकाण जोडा...',
    featureMetric: 'वैशिष्ट्य / मापदंड',
    metricPriceTier: 'खर्च श्रेणी',
    metricRating: 'रेटिंग आणि परीक्षणे',
    metricCleanliness: 'स्वच्छता मूल्यमापन',
    metricAccessibility: 'सुलभता व व्हीलचेअर',
    metricHours: 'वेळ',
    metricHighlights: 'मुख्य वैशिष्ट्ये',
    metricSafetyNotices: 'नागरी सूचना व सतर्कता',
    metricDataSource: 'माहिती स्त्रोत',
    oneClickPresets: 'एका क्लिकवर नमुना तुलना:',
    emptyCompareTitle: 'तुलना ट्रेमध्ये कोणतीही ठिकाणे नाहीत',
    emptyCompareDesc: 'अन्वेषण पानावरून २ ते ३ ठिकाणे निवडा किंवा वरील एका क्लिकच्या पर्यायावर क्लिक करून तुलना पहा.',
    browsePlacesBtn: 'ठिकाणे शोधा',
    loadSampleBtn: 'नमुना तुलना लोड करा',

    reportsTitle: 'नागरी तक्रारी व सतर्कता अहवाल',
    reportsSubtitle: 'रस्त्यावरील खड्डे, अपघात, कचरा आणि अंधाऱ्या रस्त्यांबद्दल तक्रार नोंदवा. इतर प्रवाशांना सावध राहण्यास मदत करा.',
    submitNewReportBtn: 'नवीन तक्रार नोंदवा',
    activeNoticesLogged: 'सक्रिय नागरी तक्रारी नोंदवल्या',
    localStorageNoticeTitle: 'स्थानिक साठवणूक आणि पडताळणी सूचना',
    localStorageNoticeDesc: 'या डेमोमध्ये नागरिक अहवाल तुमच्या ब्राउझरच्या लोकल स्टोरेजमध्ये जतन केले जातात. महापालिका किंवा स्थानिक प्रशासनाने तपासेपर्यंत हे अहवाल "तपासणी बाकी" राहतात. आपत्कालीन मदतीसाठी थेट पोलिस किंवा पालिकेशी संपर्क साधा.',
    allReportsFilter: 'सर्व तक्रारी',
    confirmActiveBtn: 'समस्या सुरू आहे (+१)',
    affirmedBtn: 'नोंदवले (+१)',
    unverifiedStatus: 'तपासणी बाकी',
    communityNotedStatus: 'नागरिकांनी नोंदवलेले',
    underReviewStatus: 'पुनरावलोकनात',
    priorityHigh: 'उच्च प्राधान्य',
    priorityModerate: 'मध्यम प्राधान्य',
    priorityLow: 'कमी प्राधान्य',

    modalReportTitle: 'नागरी किंवा रस्त्याची समस्या नोंदवा',
    modalReportSub: 'नागरी सतर्कता (ब्राउझरमध्ये साठवली जाते)',
    fieldCategory: 'तक्रारीचा प्रकार',
    fieldSeverity: 'तीव्रता / निकड',
    fieldHeadline: 'शीर्षक / थोडक्यात समस्या',
    fieldLocation: 'ठिकाण किंवा खूण',
    fieldDescription: 'सविस्तर माहिती',
    fieldPhotoUpload: 'फोटो जोडा (ऐच्छिक)',
    fieldPhotoUploadSub: 'JPG, PNG किंवा WebP फोटो निवडा (कमाल २.५ MB). स्थानिक ब्राउझरमध्ये साठवला जाईल.',
    fieldPhotoSelected: 'फोटो निवडला:',
    fieldRemovePhoto: 'फोटो काढा',
    fieldDisclaimerCheck: 'मला समजते की ही तक्रार आणि फोटो माझ्या ब्राउझरमध्ये साठवला जाईल आणि तपासणी बाकी म्हणून दिसेल. हे व्यासपीठ आपत्कालीन मदत पुरवत नाही.',
    cancelBtn: 'रद्द करा',
    submitBtn: 'तक्रार सादर करा',
    successTitle: 'तक्रार यशस्वीरित्या नोंदवली',
    successDesc: 'तुमची सूचना नागरी नोंदवहीत जोडली गेली आहे आणि नकाशावर दाखवली आहे. सध्या ती "तपासणी बाकी" म्हणून चिन्हांकित आहे.',
    errTitleReq: 'शीर्षक आवश्यक आहे',
    errLocReq: 'ठिकाण किंवा खूण आवश्यक आहे',
    errDescReq: 'कृपया समस्येचे सविस्तर वर्णन द्या',
    errTermsReq: 'कृपया सुरक्षा अटी मान्य करा',
    errFileSize: 'फोटो २.५ MB पेक्षा मोठा आहे. कृपया लहान आकाराचा फोटो निवडा.',
    errFileType: 'फक्त JPG, PNG आणि WebP फोटो स्वीकारले जातात.',

    insightsTitle: 'शहर अंतर्दृष्टी व थेट परिस्थिती',
    insightsSubtitle: 'पुण्यातील थेट हवामान, मेट्रो व सार्वजनिक वाहतूक सूचना, वारसा पदभ्रमण मार्ग आणि आपत्कालीन संपर्क क्रमांक.',
    weatherTitle: 'थेट वातावरणीय परिस्थिती',
    refreshWeatherBtn: 'हवामान रीफ्रेश करा',
    emergencyTitle: 'आपत्कालीन सेवा आणि संपर्क क्रमांक',
    emergencySubtitle: 'पुणे शहर व महाराष्ट्र शासनाचे महत्त्वाचे हेल्पलाइन क्रमांक',
    safetyProtocolTitle: 'नैतिक सुरक्षा धोरण',
    safetyProtocolDesc: 'सिटीकंपास एआय कोणत्याही भागाला काल्पनिक सुरक्षा गुण देत नाही. आम्ही नागरिकांनी नोंदवलेल्या तक्रारी सत्य वेळेसह पारदर्शकपणे मांडतो, जेणेकरून प्रवासी स्वतः जागरूक निर्णय घेऊ शकतील.'
  },

  hi: {
    appName: 'सिटीकंपास एआई',
    tagline: 'होशियारी से घूमें • सुरक्षित यात्रा करें • बेहतर जिएं',
    prototypeBanner: 'लाइव हैकथॉन प्रोटोटाइप:',
    prototypeBannerSub: 'पुणे नगर निगम का सत्यापित डेटा + ओपन-मेटिओ लाइव मौसम अपडेट।',
    unverifiedBadge: 'सत्यापन बाकी रिपोर्ट स्पष्ट रूप से चिह्नित',

    navExplore: 'खोजें और नक्शा',
    navPlanner: 'एआई यात्रा योजना',
    navCompare: 'तुलना करें',
    navReports: 'नागरिक रिपोर्ट',
    navInsights: 'शहर अंतर्दृष्टि',
    navAbout: 'डेटा पारदर्शिता',
    reportIssueBtn: 'समस्या दर्ज करें',
    searchPlaceholder: 'स्थान, खान-पान, होटल खोजें...',
    cityFocus: 'शहर चुनें:',

    catAll: 'सभी प्रमुख स्थल',
    catHeritage: 'विरासत और किले',
    catFood: 'स्थानीय भोजन और कैफे',
    catAttractions: 'आकर्षण और प्रकृति',
    catStays: 'होटल और हॉस्टल',
    catBudget: 'किफायती स्थल',
    catAccessibility: 'सुलभ प्रवेश स्थल',

    filterCost: 'लागत:',
    filterArea: 'क्षेत्र:',
    filterWheelchairOnly: '♿ केवल व्हीलचेयर सुलभ',
    filterReset: 'रीसेट',
    sortLabel: 'क्रमबद्ध:',
    sortRecommended: 'सुझावित',
    sortRating: 'उच्चतम रेटिंग',
    sortCleanliness: 'स्वच्छता स्कोर',
    allTiers: 'सभी स्तर',
    allAreas: 'सभी क्षेत्र',

    cardDetails: 'विवरण',
    cardCompare: 'तुलना',
    cardAdded: 'शामिल',
    cardSaved: 'सहेजा गया',
    cardSave: 'सहेजें',
    cardFreeEntry: 'मुफ्त प्रवेश',
    cardWheelchairReady: 'व्हीलचेयर सुलभ',
    cardLimitedRamp: 'सीढ़ियां / सीमित रैंप',
    cardHygiene: 'स्वच्छता',
    cardNoHazards: 'कोई सक्रिय खतरा नहीं',
    cardCommunityNotices: 'नागरिक सूचनाएं',
    cardFocusMap: 'नक्शे पर देखें',
    ratingNotAvail: 'रेटिंग उपलब्ध नहीं',

    plannerTitle: 'एआई शहर यात्रा योजनाकार एवं मार्ग',
    plannerSubtitle: 'बजट, यात्रा दूरी, खुलने का समय और सुलभता प्राथमिकताओं के आधार पर पुणे का व्यावहारिक और कम यात्रा वाला मार्ग बनाएं।',
    budgetPref: 'बजट प्राथमिकता',
    timeWindow: 'उपलब्ध समय',
    halfDay: 'आधा दिन (3-4 घंटे)',
    fullDay: 'पूरा दिन (8-10 घंटे)',
    weekend: 'सप्ताहांत (2 दिन)',
    coreInterests: 'मुख्य रुचियां',
    mobilityMode: 'सुलभता एवं चलने की प्राथमिकता',
    mobilityAll: 'सभी आकर्षण',
    mobilityWheelchair: '♿ केवल सीढ़ी-मुक्त / व्हीलचेयर सुलभ स्थल',
    mobilityLowWalking: '🚶 कम चलने योग्य स्थल',
    generateItineraryBtn: 'स्मार्ट मार्ग एवं योजना बनाएं',
    generatingBtn: 'सर्वोत्तम मार्ग तैयार कर रहा है...',
    routeSequencingBadge: 'स्मार्ट मार्ग अनुक्रमण सक्रिय',
    routeExplanationTitle: 'मार्ग क्रम का कारण',
    directDistanceLabel: 'अनुमानित सीधी दूरी',
    estTransitTimeLabel: 'अनुमानित यात्रा समय',
    stopNumberLabel: 'पड़ाव',
    whyThisStop: 'यह स्थान क्यों चुना गया',
    proTravelTip: 'महत्वपूर्ण सुझाव',
    viewRouteOnMapBtn: 'नक्शे पर पूरा मार्ग देखें',
    routeMapTitle: 'भौगोलिक मार्ग गलियारा',
    approxTransitNotice: 'दी गई दूरियां निर्देशांकों पर आधारित अनुमानित सीधी दूरी और सामान्य शहरी यातायात समय का अनुमान हैं। यह वास्तविक मोड़-दर-मोड़ सड़क माप नहीं है।',
    printPdfBtn: 'प्रिंट / पीडीएफ',
    preferenceMatch: 'प्राथमिकता मिलान',
    estSpend: 'अनुमानित खर्च',
    walkingIntensity: 'पैदल चलना',

    compareTitle: 'स्थानों की पारदर्शी तुलना करें',
    compareSubtitle: 'लागत, स्वच्छता स्कोर, व्हीलचेयर सुलभता और नागरिक चेतावनियों की साथ-साथ तुलना करें। बिना किसी फर्जी स्कोर के।',
    comparingCount: 'तुलना कर रहे हैं',
    clearAllBtn: 'सभी हटाएं',
    addPlacePrompt: '+ तुलना के लिए स्थान जोड़ें...',
    featureMetric: 'विशेषता / मापदंड',
    metricPriceTier: 'लागत श्रेणी',
    metricRating: 'रेटिंग और समीक्षाएं',
    metricCleanliness: 'स्वच्छता मूल्यांकन',
    metricAccessibility: 'सुलभता एवं व्हीलचेयर',
    metricHours: 'खुलने का समय',
    metricHighlights: 'प्रमुख विशेषताएं',
    metricSafetyNotices: 'नागरिक सुरक्षा सूचनाएं',
    metricDataSource: 'डेटा स्रोत',
    oneClickPresets: 'एक क्लिक में डेमो तुलना:',
    emptyCompareTitle: 'तुलना ट्रे में कोई स्थान नहीं है',
    emptyCompareDesc: 'खोजें पृष्ठ से 2 से 3 स्थान चुनें या ऊपर दिए गए त्वरित विकल्पों में से किसी एक को चुनें।',
    browsePlacesBtn: 'स्थान खोजें',
    loadSampleBtn: 'नमूना तुलना लोड करें',

    reportsTitle: 'नागरिक समस्याएं और चेतावनी रिपोर्ट',
    reportsSubtitle: 'सड़क के गड्ढे, दुर्घटना, कचरा या रोशनी की कमी की रिपोर्ट करें। अन्य यात्रियों को जागरूक रखने में मदद करें।',
    submitNewReportBtn: 'नई नागरिक रिपोर्ट दर्ज करें',
    activeNoticesLogged: 'सक्रिय नागरिक सूचनाएं दर्ज हैं',
    localStorageNoticeTitle: 'लोकल स्टोरेज एवं सत्यापन सूचना',
    localStorageNoticeDesc: 'इस डेमो में नागरिक रिपोर्ट आपके ब्राउज़र के लोकल स्टोरेज में सहेजी जाती हैं। नगर निगम द्वारा जांचे जाने तक सभी रिपोर्ट "सत्यापन बाकी" रहती हैं। आपातकालीन स्थिति में आधिकारिक हेल्पलाइन पर संपर्क करें।',
    allReportsFilter: 'सभी रिपोर्ट',
    confirmActiveBtn: 'समस्या सक्रिय है (+1)',
    affirmedBtn: 'पुष्टि की गई (+1)',
    unverifiedStatus: 'सत्यापन बाकी',
    communityNotedStatus: 'समुदाय द्वारा दर्ज',
    underReviewStatus: 'समीक्षाधीन',
    priorityHigh: 'उच्च प्राथमिकता',
    priorityModerate: 'मध्यम प्राथमिकता',
    priorityLow: 'निम्न प्राथमिकता',

    modalReportTitle: 'नागरिक या सड़क समस्या दर्ज करें',
    modalReportSub: 'नागरिक चेतावनी (ब्राउज़र में स्थानीय रूप से सहेजी गई)',
    fieldCategory: 'समस्या की श्रेणी',
    fieldSeverity: 'गंभीरता / प्राथमिकता',
    fieldHeadline: 'शीर्षक / संक्षिप्त विवरण',
    fieldLocation: 'स्थान या लैंडमार्क',
    fieldDescription: 'विस्तृत विवरण',
    fieldPhotoUpload: 'फोटो संलग्न करें (वैकल्पिक)',
    fieldPhotoUploadSub: 'JPG, PNG या WebP फोटो चुनें (अधिकतम 2.5 MB)। स्थानीय ब्राउज़र में सहेजा जाएगा।',
    fieldPhotoSelected: 'फोटो चुना गया:',
    fieldRemovePhoto: 'फोटो हटाएं',
    fieldDisclaimerCheck: 'मैं समझता हूं कि यह रिपोर्ट और फोटो मेरे स्थानीय ब्राउज़र में सहेजी जाएगी और असत्यापित के रूप में प्रदर्शित होगी। यह प्लेटफॉर्म आपातकालीन सेवाएं प्रदान नहीं करता है।',
    cancelBtn: 'रद्द करें',
    submitBtn: 'रिपोर्ट सबमिट करें',
    successTitle: 'रिपोर्ट सफलतापूर्वक दर्ज की गई',
    successDesc: 'आपकी सूचना नागरिक लॉग में जोड़ दी गई है और नक्शे पर प्रदर्शित है। वर्तमान में इसे "सत्यापन बाकी" के रूप में चिह्नित किया गया है।',
    errTitleReq: 'शीर्षक आवश्यक है',
    errLocReq: 'स्थान या लैंडमार्क आवश्यक है',
    errDescReq: 'कृपया समस्या का विवरण दें',
    errTermsReq: 'कृपया सुरक्षा शर्तों की पुष्टि करें',
    errFileSize: 'फोटो 2.5 MB की सीमा से अधिक है। कृपया छोटा फोटो चुनें।',
    errFileType: 'केवल JPG, PNG और WebP फोटो समर्थित हैं।',

    insightsTitle: 'शहर अंतर्दृष्टि एवं वास्तविक स्थिति',
    insightsSubtitle: 'पुणे का लाइव मौसम, मेट्रो एवं सार्वजनिक यातायात परामर्श, विरासत मार्ग और आपातकालीन संपर्क सूत्र।',
    weatherTitle: 'वर्तमान वातावरणीय स्थिति',
    refreshWeatherBtn: 'मौसम रीफ्रेश करें',
    emergencyTitle: 'आपातकालीन सेवाएं और संपर्क सूत्र',
    emergencySubtitle: 'पुणे शहर और महाराष्ट्र राज्य के महत्वपूर्ण हेल्पलाइन नंबर',
    safetyProtocolTitle: 'नैतिक सुरक्षा नीति',
    safetyProtocolDesc: 'सिटीकंपास एआई किसी भी क्षेत्र को मनमाना सुरक्षा स्कोर नहीं देता है। हम नागरिकों द्वारा दर्ज सूचनाओं को समय के साथ पारदर्शी रूप से प्रस्तुत करते हैं ताकि यात्री स्वयं निर्णय ले सकें।'
  }
};
