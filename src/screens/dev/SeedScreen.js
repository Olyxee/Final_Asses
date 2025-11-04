import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Alert } from "react-native";
import { seedSampleHotels } from "../../services/firebase/seedHotels";

const SeedScreen = () => {
  const [loading, setLoading] = useState(false);

  const handleSeed = async () => {
    try {
      setLoading(true);
      const res = await seedSampleHotels();
      Alert.alert("Seed complete", `Inserted ${res.count} hotel documents`);
    } catch (e) {
      Alert.alert("Seed failed", e.message || String(e));
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Development Seed</Text>
      <Text style={styles.desc}>
        Insert sample hotels into Firestore for development/testing.
      </Text>

      <TouchableOpacity
        style={[styles.button, loading && styles.disabled]}
        onPress={handleSeed}
        disabled={loading}
      >
        <Text style={styles.buttonText}>
          {loading ? "Seeding..." : "Seed Sample Hotels"}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
    backgroundColor: "#fff",
  },
  title: { fontSize: 20, fontWeight: "bold", marginBottom: 8 },
  desc: { color: "#666", marginBottom: 16 },
  button: {
    backgroundColor: "#007AFF",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  disabled: { opacity: 0.7 },
  buttonText: { color: "#fff", fontWeight: "bold" },
});

export default SeedScreen;
