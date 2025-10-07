// App.js
import React, { useCallback, useState } from "react";
import { SafeAreaView, StatusBar, View, ActivityIndicator, StyleSheet } from "react-native";
import SearchBar from "./src/components/SearchBar";
import WeatherCard from "./src/components/WeatherCard";
import ErrorCard from "./src/components/ErrorCard";
import HistoryBar from "./src/components/HistoryBar";
import useSearchHistory from "./src/hooks/useSearchHistory";
import { getWeatherByCity } from "./src/services/weatherApi";

export default function App() {
  const { lastCity, history, saveLastCity, upsertHistory, clearHistory } = useSearchHistory();

  const [loading, setLoading] = useState(false);
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState("");

  const handleSearch = useCallback(
    async (city) => {
      try {
        setError("");
        setLoading(true);
        const data = await getWeatherByCity(city);
        setWeather(data);
        const resolvedCity = data.cityName || city;
        await saveLastCity(resolvedCity);
        await upsertHistory(resolvedCity);
      } catch (e) {
        console.log("FETCH ERROR:", e?.message || e);
        setWeather(null);
        setError(e?.message || "Kunde inte hämta väder. Kontrollera stadsnamn eller internet.");
      } finally {
        setLoading(false);
      }
    },
    [saveLastCity, upsertHistory]
  );

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#f6f6f6" }}>
      <StatusBar barStyle="dark-content" />
      <SearchBar onSearch={handleSearch} />
      <HistoryBar
        lastCity={lastCity}
        history={history}
        onSelect={handleSearch}
        onClear={clearHistory}
      />

      {loading ? (
        <View style={styles.center}>
          <ActivityIndicator size="large" />
        </View>
      ) : error ? (
        <ErrorCard message={error} />
      ) : (
        <WeatherCard data={weather} />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  center: { flex: 1, alignItems: "center", justifyContent: "center" },
});
