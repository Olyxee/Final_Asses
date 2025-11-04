import { OPENWEATHER_API_KEY } from "./config";

const BASE = "https://api.openweathermap.org/data/2.5";

export async function getWeatherByCity(city) {
  if (!city) throw new Error("City is required");
  const key = OPENWEATHER_API_KEY;
  if (!key) {
    // Caller should handle lack of key gracefully
    throw new Error(
      "OpenWeather API key is not configured. Set OPENWEATHER_API_KEY in app config."
    );
  }

  const url = `${BASE}/weather?q=${encodeURIComponent(
    city
  )}&units=metric&appid=${key}`;

  const res = await fetch(url);
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`OpenWeather API error: ${res.status} ${text}`);
  }

  const data = await res.json();
  return data;
}

export default { getWeatherByCity };
