import { useCallback, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const STORAGE_KEYS = {
  LAST_CITY: "@weather:lastCity",
  HISTORY: "@weather:history",
};
const MAX_HISTORY = 5;

export default function useSearchHistory() {
  const [lastCity, setLastCity] = useState("");
  const [history, setHistory] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const [lastCityStr, historyStr] = await Promise.all([
          AsyncStorage.getItem(STORAGE_KEYS.LAST_CITY),
          AsyncStorage.getItem(STORAGE_KEYS.HISTORY),
        ]);
        if (lastCityStr) setLastCity(lastCityStr);
        if (historyStr) {
          const parsed = JSON.parse(historyStr);
          if (Array.isArray(parsed)) setHistory(parsed);
        }
      } catch (e) {
        console.log("LOAD PERSISTED ERROR:", e);
      }
    })();
  }, []);

  const saveLastCity = useCallback(async (city) => {
    try {
      setLastCity(city);
      await AsyncStorage.setItem(STORAGE_KEYS.LAST_CITY, city);
    } catch (e) {
      console.log("SAVE LAST CITY ERROR:", e);
    }
  }, []);

  const saveHistory = useCallback(async (items) => {
    try {
      setHistory(items);
      await AsyncStorage.setItem(STORAGE_KEYS.HISTORY, JSON.stringify(items));
    } catch (e) {
      console.log("SAVE HISTORY ERROR:", e);
    }
  }, []);

  const upsertHistory = useCallback(
    async (city) => {
      const norm = (s) => (s || "").toLowerCase();
      const next = [city, ...history.filter((c) => norm(c) !== norm(city))].slice(0, MAX_HISTORY);
      await saveHistory(next);
    },
    [history, saveHistory]
  );

  const clearHistory = useCallback(async () => {
    try {
      await AsyncStorage.removeItem(STORAGE_KEYS.HISTORY);
      setHistory([]);
    } catch (e) {
      console.log("CLEAR HISTORY ERROR:", e);
    }
  }, []);

  return { lastCity, history, saveLastCity, upsertHistory, clearHistory };
}
