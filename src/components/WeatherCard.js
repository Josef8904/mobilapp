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

  const { temp, feelsLike, humidity, wind, description, icon, cityName } = data;

  return (
    <View style={styles.card}>
      <Text style={styles.city}>{cityName}</Text>
      <Image source={{ uri: getIconUri(icon) }} style={styles.icon} resizeMode="contain" />
      <Text style={styles.temp}>{temp}°C</Text>
      <Text style={styles.desc}>{capitalize(description)}</Text>

      <View style={styles.row}>
        <InfoPill label="Känns som" value={`${numOrDash(feelsLike)}°C`} />
        <InfoPill label="Vind" value={`${numOrDash(wind)} m/s`} />
        <InfoPill label="Fukt" value={`${numOrDash(humidity)}%`} />
      </View>
    </View>
  );
}

function InfoPill({ label, value }) {
  return (
    <View style={styles.pill}>
      <Text style={styles.pillLabel}>{label}</Text>
      <Text style={styles.pillValue}>{value}</Text>
    </View>
  );
}

function numOrDash(v) {
  return v === null || v === undefined || Number.isNaN(v) ? "—" : v;
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
    shadowOpacity: 0.08,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 6 },
    elevation: 3,
  },
  center: { alignItems: "center", justifyContent: "center" },
  city: { fontSize: 18, fontWeight: "600", marginBottom: 8 },
  icon: { width: 120, height: 120, marginVertical: 8 },
  temp: { fontSize: 42, fontWeight: "700", marginVertical: 4 },
  desc: { fontSize: 16, color: "#555", marginBottom: 12 },
  muted: { color: "#888" },
  row: {
    flexDirection: "row",
    gap: 8,
    width: "100%",
    justifyContent: "space-between",
    marginTop: 8,
  },
  pill: {
    flex: 1,
    backgroundColor: "#f3f4f6",
    borderRadius: 12,
    paddingVertical: 10,
    paddingHorizontal: 12,
    alignItems: "center",
  },
  pillLabel: { fontSize: 12, color: "#666" },
  pillValue: { fontSize: 16, fontWeight: "600", marginTop: 2 },
});
