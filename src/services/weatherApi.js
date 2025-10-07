import axios from "axios";
import Constants from "expo-constants";

const API_KEY =
  Constants?.expoConfig?.extra?.OPENWEATHER_API_KEY ||
  process.env.EXPO_PUBLIC_OPENWEATHER_API_KEY;

const BASE_URL = "https://api.openweathermap.org/data/2.5/weather";

function buildUrl(q) {
  return `${BASE_URL}?q=${encodeURIComponent(q)}&appid=${API_KEY}&units=metric&lang=sv`;
}
function cleanCity(input) {
  return String(input || "").trim().replace(/\s+/g, " ");
}

export async function getWeatherByCity(cityInput) {
  if (!API_KEY) {
    throw new Error(
      "Ingen API-nyckel hittades. Sätt EXPO_PUBLIC_OPENWEATHER_API_KEY och starta om bundlern."
    );
  }

  const city = cleanCity(cityInput);
  if (!city) throw new Error("Ange ett stadsnamn.");

  try {
    const { data } = await axios.get(buildUrl(city));
    return mapWeather(data);
  } catch (err) {
    if (err?.response?.status !== 404) {
      logError(err);
      throw friendlyError(err);
    }
  }

  if (!city.includes(",")) {
    try {
      const { data } = await axios.get(buildUrl(`${city},SE`));
      return mapWeather(data);
    } catch (err2) {
      logError(err2);
      throw friendlyError(err2);
    }
  }

  throw new Error("Staden hittades inte. Testa med 'Stad, Landskod' (t.ex. 'Paris,FR').");
}

function mapWeather(data) {
  const temp = Math.round(data.main?.temp);
  const description = data.weather?.[0]?.description ?? "—";
  const icon = data.weather?.[0]?.icon ?? "01d";
  const cityName = `${data.name || ""}${data.sys?.country ? ", " + data.sys.country : ""}`.trim();
  return { temp, description, icon, cityName };
}

function logError(err) {
  console.log("OpenWeather error:", err?.response?.status, err?.response?.data || err?.message);
}

function friendlyError(err) {
  const s = err?.response?.status;
  if (s === 401) return new Error("Ogiltig API-nyckel (401). Kontrollera din miljövariabel.");
  if (s === 404) return new Error("Staden hittades inte. Kontrollera stavningen.");
  if (s === 429) return new Error("För många förfrågningar (429). Vänta en stund och försök igen.");
  return new Error("Kunde inte hämta väder. Kontrollera internet eller försök igen.");
}

export function getIconUri(icon) {
  return `https://openweathermap.org/img/wn/${icon}@4x.png`;
}
