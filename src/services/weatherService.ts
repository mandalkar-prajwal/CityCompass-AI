import { WeatherData } from '../types';

// WMO Weather interpretation codes (WW)
const WMO_CODES: Record<number, { text: string; icon: string; advisory: string }> = {
  0: { text: 'Clear Sky', icon: '☀️', advisory: 'Ideal outdoor conditions for sightseeing and heritage walks.' },
  1: { text: 'Mainly Clear', icon: '🌤️', advisory: 'Pleasant weather for exploring city attractions.' },
  2: { text: 'Partly Cloudy', icon: '⛅', advisory: 'Comfortable temperature with moderate cloud cover.' },
  3: { text: 'Overcast', icon: '☁️', advisory: 'Overcast skies; good time for indoor museums or street food.' },
  45: { text: 'Foggy', icon: '🌫️', advisory: 'Reduced visibility on mountain ghat roads; drive carefully.' },
  48: { text: 'Depositing Rime Fog', icon: '🌫️', advisory: 'Low visibility in hill areas.' },
  51: { text: 'Light Drizzle', icon: '🌦️', advisory: 'Light intermittent drizzle. Carry a compact umbrella.' },
  53: { text: 'Moderate Drizzle', icon: '🌦️', advisory: 'Drizzle ongoing; sidewalks may be slippery.' },
  55: { text: 'Dense Drizzle', icon: '🌧️', advisory: 'Wet street conditions. Prefer indoor dining and museums.' },
  61: { text: 'Slight Rain', icon: '🌧️', advisory: 'Light rain. Wear water-resistant footwear for walking tours.' },
  63: { text: 'Moderate Rain', icon: '🌧️', advisory: 'Moderate showers. Watch for waterlogged road corners.' },
  65: { text: 'Heavy Rain', icon: '⛈️', advisory: 'Heavy rainfall alert. Avoid low-lying ghat roads.' },
  80: { text: 'Slight Rain Showers', icon: '🌦️', advisory: 'Passing showers expected. Keep rain gear handy.' },
  81: { text: 'Moderate Showers', icon: '🌧️', advisory: 'Scattered downpours. Plan indoor activities.' },
  82: { text: 'Violent Showers', icon: '⛈️', advisory: 'Intense rain. Exercise caution on elevated road stretches.' },
  95: { text: 'Thunderstorm', icon: '⚡', advisory: 'Thunderstorm alert. Seek sheltered indoor venues.' },
};

export async function fetchLiveWeather(lat: number, lng: number, cityName: string): Promise<WeatherData> {
  const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lng}&current=temperature_2m,relative_humidity_2m,weather_code,wind_speed_10m,precipitation&timezone=auto`;
  
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 6000); // 6s timeout

    const response = await fetch(url, { signal: controller.signal });
    clearTimeout(timeoutId);

    if (!response.ok) {
      throw new Error(`Weather API error: ${response.status}`);
    }

    const data = await response.json();
    const current = data.current;
    const weatherCode = current?.weather_code ?? 0;
    const weatherInfo = WMO_CODES[weatherCode] || { 
      text: 'Mild Conditions', 
      icon: '🌤️', 
      advisory: 'Check local weather before extended travel.' 
    };

    return {
      city: cityName,
      temperature: Math.round(current?.temperature_2m ?? 28),
      weatherCode,
      conditionText: `${weatherInfo.icon} ${weatherInfo.text}`,
      windSpeed: Math.round(current?.wind_speed_10m ?? 12),
      humidity: Math.round(current?.relative_humidity_2m ?? 55),
      precipitation: current?.precipitation ?? 0,
      feelsLike: Math.round((current?.temperature_2m ?? 28) + 1),
      advisory: weatherInfo.advisory,
      isLive: true,
      fetchedAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
  } catch (err) {
    console.warn('Weather API unavailable or timed out, returning fallback meteorological estimate:', err);
    return getFallbackWeather(cityName);
  }
}

export function getFallbackWeather(cityName: string): WeatherData {
  return {
    city: cityName,
    temperature: 29,
    weatherCode: 1,
    conditionText: '🌤️ Mainly Clear',
    windSpeed: 11,
    humidity: 52,
    precipitation: 0,
    feelsLike: 30,
    advisory: 'Pleasant city exploration conditions (Stationary estimate).',
    isLive: false,
    fetchedAt: 'Stationary Reference'
  };
}
