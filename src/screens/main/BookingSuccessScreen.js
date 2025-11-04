import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

const BookingSuccessScreen = ({ route, navigation }) => {
  const { bookingData } = route.params || {};

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Booking Confirmed</Text>
      <Text style={styles.message}>Your booking has been confirmed.</Text>
      {bookingData && (
        <View style={styles.card}>
          <Text style={styles.row}>Hotel: {bookingData.hotelName}</Text>
          <Text style={styles.row}>
            Dates: {new Date(bookingData.checkIn).toLocaleDateString()} -{" "}
            {new Date(bookingData.checkOut).toLocaleDateString()}
          </Text>
          <Text style={styles.row}>Guests: {bookingData.guests}</Text>
          <Text style={styles.total}>Total: ${bookingData.totalPrice}</Text>
        </View>
      )}

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("Main", { screen: "Explore" })}
      >
        <Text style={styles.buttonText}>Back to Explore</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 16,
    backgroundColor: "#fff",
  },
  title: { fontSize: 22, fontWeight: "bold", marginBottom: 8 },
  message: { color: "#666", marginBottom: 16 },
  card: {
    width: "100%",
    backgroundColor: "#f5f5f5",
    padding: 16,
    borderRadius: 8,
    marginBottom: 16,
  },
  row: { marginBottom: 6 },
  total: { marginTop: 8, fontWeight: "bold", color: "#0066CC" },
  button: { backgroundColor: "#007AFF", padding: 12, borderRadius: 8 },
  buttonText: { color: "#fff", fontWeight: "bold" },
});

export default BookingSuccessScreen;
