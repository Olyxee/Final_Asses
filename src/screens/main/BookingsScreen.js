import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { useAuth } from "../../context/AuthContext";
import { getUserBookings } from "../../services/firebase/hotel";

const BookingCard = ({ item }) => (
  <View style={styles.card}>
    <Text style={styles.hotelName}>{item.hotelName}</Text>
    <Text>
      {new Date(item.checkIn).toLocaleDateString()} -{" "}
      {new Date(item.checkOut).toLocaleDateString()}
    </Text>
    <Text>Guests: {item.guests}</Text>
    <Text style={styles.price}>${item.totalPrice}</Text>
  </View>
);

const BookingsScreen = () => {
  const { user } = useAuth();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      if (!user) {
        setBookings([]);
        setLoading(false);
        return;
      }
      try {
        setLoading(true);
        const data = await getUserBookings(user.uid);
        setBookings(data);
      } catch (e) {
        console.error("Failed to load bookings", e);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [user]);

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#007AFF" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={bookings}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <BookingCard item={item} />}
        ListEmptyComponent={<Text style={styles.empty}>No bookings yet</Text>}
        contentContainerStyle={{ padding: 16 }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  center: { flex: 1, justifyContent: "center", alignItems: "center" },
  card: {
    padding: 16,
    backgroundColor: "#f5f5f5",
    borderRadius: 8,
    marginBottom: 12,
  },
  hotelName: { fontSize: 16, fontWeight: "bold", marginBottom: 6 },
  price: { marginTop: 8, color: "#0066CC", fontWeight: "bold" },
  empty: { textAlign: "center", marginTop: 32, color: "#666" },
});

export default BookingsScreen;
