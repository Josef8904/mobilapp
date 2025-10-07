import React, { useState } from "react";
import { View, TextInput, Button, StyleSheet } from "react-native";

export default function SearchBar({ onSearch }) {
  const [value, setValue] = useState("");
  const submit = () => {
    const city = value.trim();
    if (city && typeof onSearch === "function") onSearch(city);
  };
  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Skriv stad, t.ex. Stockholm"
        value={value}
        onChangeText={setValue}
        onSubmitEditing={submit}
        style={styles.input}
        returnKeyType="search"
      />
      <Button title="Sök" onPress={submit} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flexDirection: "row", gap: 8, padding: 16, alignItems: "center" },
  input: {
    flex: 1,
    backgroundColor: "#fff",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: "#ddd",
  },
});
