// src/components/ErrorCard.js
import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function ErrorCard({ message }) {
  if (!message) return null;
  return (
    <View style={styles.errorCard}>
      <Text style={styles.errorTitle}>Hoppsan!</Text>
      <Text style={styles.errorText}>{message}</Text>
      <Text style={styles.errorHint}>Tips: prova “Stad, Landskod” (t.ex. “Paris,FR”).</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  errorCard: {
    margin: 16,
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 16,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 6 },
  },
  errorTitle: { fontSize: 16, fontWeight: "700", marginBottom: 6, color: "#b00020" },
  errorText: { color: "#333", marginBottom: 6 },
  errorHint: { color: "#666", fontSize: 12 },
});
