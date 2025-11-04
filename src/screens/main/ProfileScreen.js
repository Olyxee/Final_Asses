import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Alert } from "react-native";
import { useAuth } from "../../context/AuthContext";

const ProfileScreen = ({ navigation }) => {
  const { user, signOut } = useAuth();

  const handleLogout = async () => {
    try {
      await signOut();
      // onAuthChange listener will redirect to auth
    } catch (e) {
      Alert.alert("Logout failed", e.message || String(e));
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Profile</Text>
      {user ? (
        <View style={styles.card}>
          <Text style={styles.label}>Name</Text>
          <Text style={styles.value}>{user.displayName || "—"}</Text>

          <Text style={styles.label}>Email</Text>
          <Text style={styles.value}>{user.email}</Text>

          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate("EditProfile")}
          >
            <Text style={styles.buttonText}>Edit Profile</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.button, styles.logout]}
            onPress={handleLogout}
          >
            <Text style={styles.buttonText}>Logout</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <Text style={styles.empty}>Not signed in</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: "#fff" },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 12 },
  card: { backgroundColor: "#f5f5f5", padding: 16, borderRadius: 8 },
  label: { color: "#666", marginTop: 8 },
  value: { fontSize: 16, fontWeight: "600" },
  button: {
    backgroundColor: "#007AFF",
    padding: 12,
    borderRadius: 8,
    marginTop: 16,
    alignItems: "center",
  },
  logout: { backgroundColor: "#ff3b30" },
  buttonText: { color: "#fff", fontWeight: "bold" },
  empty: { color: "#666", marginTop: 16 },
});

export default ProfileScreen;
