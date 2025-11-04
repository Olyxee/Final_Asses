import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import CustomInput from "../../components/common/CustomInput";
import { createBooking } from "../../services/firebase/hotel";
import { useAuth } from "../../context/AuthContext";

const BookingScreen = ({ route, navigation }) => {
  const { hotelId, hotelName, price } = route.params;
  const { user } = useAuth();

  const [checkIn, setCheckIn] = useState(new Date());
  const [checkOut, setCheckOut] = useState(new Date(Date.now() + 86400000)); // Tomorrow
  const [guests, setGuests] = useState("1");
  const [showCheckIn, setShowCheckIn] = useState(false);
  const [showCheckOut, setShowCheckOut] = useState(false);
  const [loading, setLoading] = useState(false);

  const calculateNights = () => {
    const diffTime = Math.abs(checkOut - checkIn);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const calculateTotal = () => {
    return calculateNights() * price;
  };

  const onCheckInChange = (event, selectedDate) => {
    setShowCheckIn(false);
    if (selectedDate) {
      setCheckIn(selectedDate);
      if (selectedDate >= checkOut) {
        setCheckOut(new Date(selectedDate.getTime() + 86400000));
      }
    }
  };

  const onCheckOutChange = (event, selectedDate) => {
    setShowCheckOut(false);
    if (selectedDate) {
      if (selectedDate > checkIn) {
        setCheckOut(selectedDate);
      } else {
        Alert.alert(
          "Invalid Date",
          "Check-out date must be after check-in date"
        );
      }
    }
  };

  const handleBooking = async () => {
    if (!user) {
      Alert.alert("Error", "Please sign in to make a booking");
      return;
    }

    if (parseInt(guests) < 1) {
      Alert.alert("Error", "Please enter a valid number of guests");
      return;
    }

    try {
      setLoading(true);
      const bookingData = {
        userId: user.uid,
        hotelId,
        hotelName,
        checkIn,
        checkOut,
        guests: parseInt(guests),
        totalPrice: calculateTotal(),
      };

      await createBooking(bookingData);
      Alert.alert(
        "Booking Confirmed",
        "Your booking has been successfully confirmed!",
        [
          {
            text: "OK",
            onPress: () =>
              navigation.navigate("BookingSuccess", { bookingData }),
          },
        ]
      );
    } catch (error) {
      Alert.alert("Error", "Failed to create booking. Please try again.");
      console.error("Booking error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Booking Details</Text>
        <Text style={styles.hotelName}>{hotelName}</Text>

        <View style={styles.dateContainer}>
          <TouchableOpacity
            style={styles.dateButton}
            onPress={() => setShowCheckIn(true)}
          >
            <Text style={styles.dateLabel}>Check-in Date</Text>
            <Text style={styles.dateText}>{checkIn.toLocaleDateString()}</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.dateButton}
            onPress={() => setShowCheckOut(true)}
          >
            <Text style={styles.dateLabel}>Check-out Date</Text>
            <Text style={styles.dateText}>{checkOut.toLocaleDateString()}</Text>
          </TouchableOpacity>
        </View>

        {showCheckIn && (
          <DateTimePicker
            value={checkIn}
            mode="date"
            minimumDate={new Date()}
            onChange={onCheckInChange}
          />
        )}

        {showCheckOut && (
          <DateTimePicker
            value={checkOut}
            mode="date"
            minimumDate={new Date(checkIn.getTime() + 86400000)}
            onChange={onCheckOutChange}
          />
        )}

        <CustomInput
          label="Number of Guests"
          value={guests}
          onChangeText={setGuests}
          keyboardType="numeric"
          placeholder="Enter number of guests"
        />

        <View style={styles.summaryContainer}>
          <Text style={styles.summaryTitle}>Booking Summary</Text>

          <View style={styles.summaryRow}>
            <Text>Price per night</Text>
            <Text>${price}</Text>
          </View>

          <View style={styles.summaryRow}>
            <Text>Number of nights</Text>
            <Text>{calculateNights()}</Text>
          </View>

          <View style={styles.summaryRow}>
            <Text>Number of guests</Text>
            <Text>{guests}</Text>
          </View>

          <View style={[styles.summaryRow, styles.totalRow]}>
            <Text style={styles.totalText}>Total</Text>
            <Text style={styles.totalPrice}>${calculateTotal()}</Text>
          </View>
        </View>

        <TouchableOpacity
          style={[styles.bookButton, loading && styles.disabledButton]}
          onPress={handleBooking}
          disabled={loading}
        >
          <Text style={styles.bookButtonText}>
            {loading ? "Confirming..." : "Confirm Booking"}
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  content: {
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 8,
  },
  hotelName: {
    fontSize: 18,
    color: "#666",
    marginBottom: 24,
  },
  dateContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 24,
  },
  dateButton: {
    flex: 1,
    marginHorizontal: 8,
    padding: 12,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
  },
  dateLabel: {
    fontSize: 14,
    color: "#666",
    marginBottom: 4,
  },
  dateText: {
    fontSize: 16,
    fontWeight: "500",
  },
  summaryContainer: {
    marginTop: 24,
    padding: 16,
    backgroundColor: "#f5f5f5",
    borderRadius: 8,
  },
  summaryTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 16,
  },
  summaryRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  totalRow: {
    marginTop: 8,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: "#ddd",
  },
  totalText: {
    fontSize: 18,
    fontWeight: "bold",
  },
  totalPrice: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#0066CC",
  },
  bookButton: {
    backgroundColor: "#0066CC",
    padding: 16,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 24,
  },
  disabledButton: {
    opacity: 0.7,
  },
  bookButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default BookingScreen;
