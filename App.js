import React, { useState } from "react";
import { SafeAreaView, StatusBar, View, ActivityIndicator, Text, StyleSheet } from "react-native";
import SearchBar from "./src/components/SearchBar";
import WeatherCard from "./src/components/WeatherCard";
import { getWeatherByCity } from "./src/services/weatherApi";

export default function App() {
  const [loading, setLoading] = useState(false);
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState("");

  const handleSearch = async (city) => {
    try {
      setError("");
      setLoading(true);
      const data = await getWeatherByCity(city);
      setWeather(data);
    } catch (e) {
      console.log("FETCH ERROR:", e?.message || e);
      setWeather(null);
      setError(e?.message || "Kunde inte hämta väder. Kontrollera stadsnamn eller internet.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#f6f6f6" }}>
      <StatusBar barStyle="dark-content" />
      <SearchBar onSearch={handleSearch} />
      {loading ? (
        <View style={styles.center}><ActivityIndicator size="large" /></View>
      ) : error ? (
        <View style={styles.center}><Text style={styles.error}>{error}</Text></View>
      ) : (
        <WeatherCard data={weather} />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  center: { flex: 1, alignItems: "center", justifyContent: "center" },
  error: { color: "#c00", paddingHorizontal: 16, textAlign: "center" },
});
