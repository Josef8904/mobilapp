import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from "react-native";

export default function HistoryBar({ lastCity, history, onSelect, onClear }) {
  return (
    <>
      <View style={styles.headerRow}>
        {!!lastCity && <Text style={styles.recent}>Senaste: {lastCity}</Text>}
        {history?.length > 0 && (
          <TouchableOpacity onPress={onClear}>
            <Text style={styles.clearBtn}>Rensa historik</Text>
          </TouchableOpacity>
        )}
      </View>
      {history?.length > 0 && (
        <FlatList
          data={history}
          keyExtractor={(item, idx) => `${item}-${idx}`}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.list}
          renderItem={({ item }) => (
            <TouchableOpacity style={styles.item} onPress={() => onSelect?.(item)}>
              <Text style={styles.itemText}>{item}</Text>
            </TouchableOpacity>
          )}
        />
      )}
    </>
  );
}

const styles = StyleSheet.create({
  headerRow: {
    marginHorizontal: 16,
    marginTop: -4,
    marginBottom: 8,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  recent: { color: "#666", fontSize: 12 },
  clearBtn: { color: "#b00020", fontSize: 12, fontWeight: "600" },
  list: { paddingHorizontal: 12, paddingBottom: 4, gap: 8 },
  item: {
    backgroundColor: "#fff",
    borderRadius: 16,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginHorizontal: 4,
    borderWidth: 1,
    borderColor: "#eee",
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 3 },
  },
  itemText: { color: "#333", fontSize: 12, fontWeight: "600" },
});
