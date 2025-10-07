import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import { getIconUri } from "../services/weatherApi";

export default function WeatherCard({ data }) {
  if (!data) {
    return (
      <View style={[styles.card, styles.center]}>
        <Text style={styles.muted}>Sök efter en stad för att visa vädret</Text>
      </View>
    );
  }

  const { temp, description, icon, cityName } = data;

  return (
    <View style={styles.card}>
      <Text style={styles.city}>{cityName}</Text>
      <Image source={{ uri: getIconUri(icon) }} style={styles.icon} resizeMode="contain" />
      <Text style={styles.temp}>{temp}°C</Text>
      <Text style={styles.desc}>{capitalize(description)}</Text>
    </View>
  );
}

function capitalize(s) {
  return typeof s === "string" && s.length ? s[0].toUpperCase() + s.slice(1) : s;
}

const styles = StyleSheet.create({
  card: {
    margin: 16,
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 3,
  },
  center: { alignItems: "center", justifyContent: "center" },
  city: { fontSize: 18, fontWeight: "600", marginBottom: 8 },
  icon: { width: 120, height: 120, marginVertical: 8 },
  temp: { fontSize: 42, fontWeight: "700", marginVertical: 4 },
  desc: { fontSize: 16, color: "#555" },
  muted: { color: "#888" },
});
