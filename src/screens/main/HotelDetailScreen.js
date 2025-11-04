import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { getHotelById, getHotelReviews } from "../../services/firebase/hotel";
import { getWeatherByCity } from "../../services/api/openWeather";
import Icon from "react-native-vector-icons/MaterialIcons";
import { useNavigation } from "@react-navigation/native";

const HotelDetailScreen = ({ route }) => {
  const [hotel, setHotel] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();
  const { hotelId } = route.params;

  useEffect(() => {
    loadHotelDetails();
  }, [hotelId]);

  const loadHotelDetails = async () => {
    try {
      setLoading(true);
      const [hotelData, reviewsData] = await Promise.all([
        getHotelById(hotelId),
        getHotelReviews(hotelId),
      ]);
      setHotel(hotelData);
      setReviews(reviewsData);

      // Fetch weather for hotel's location if possible. Non-fatal.
      if (hotelData?.location) {
        try {
          const w = await getWeatherByCity(hotelData.location);
          setWeather(w);
        } catch (err) {
          console.warn("Failed to fetch weather:", err.message || err);
          setWeather(null);
        }
      }
    } catch (error) {
      console.error("Error loading hotel details:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleBookNow = () => {
    navigation.navigate("Booking", {
      hotelId: hotel.id,
      hotelName: hotel.name,
      price: hotel.price,
    });
  };

  const handleViewReviews = () => {
    navigation.navigate("Reviews", {
      hotelId: hotel.id,
      hotelName: hotel.name,
    });
  };

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#0066CC" />
      </View>
    );
  }

  if (!hotel) {
    return (
      <View style={styles.center}>
        <Text>Hotel not found</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <Image source={{ uri: hotel.image }} style={styles.image} />

      <View style={styles.content}>
        <Text style={styles.name}>{hotel.name}</Text>

        <View style={styles.infoRow}>
          <Icon name="location-on" size={20} color="#666" />
          <Text style={styles.location}>{hotel.location}</Text>
        </View>

        <View style={styles.infoRow}>
          <Icon name="star" size={20} color="#FFD700" />
          <Text style={styles.rating}>
            {hotel.rating} ({reviews.length} reviews)
          </Text>
        </View>

        {weather ? (
          <View style={styles.weatherRow}>
            <Text style={styles.weatherText}>
              {Math.round(weather.main.temp)}°C
            </Text>
            <Text style={styles.weatherDesc}>
              {weather.weather[0].description}
            </Text>
          </View>
        ) : (
          <View style={styles.weatherRow}>
            <Text style={styles.weatherUnavailable}>Weather unavailable</Text>
          </View>
        )}

        <View style={styles.priceContainer}>
          <Text style={styles.price}>${hotel.price}</Text>
          <Text style={styles.perNight}>/night</Text>
        </View>

        <Text style={styles.description}>{hotel.description}</Text>

        <TouchableOpacity
          style={styles.reviewsButton}
          onPress={handleViewReviews}
        >
          <Text style={styles.reviewsButtonText}>View All Reviews</Text>
        </TouchableOpacity>

        {reviews.slice(0, 2).map((review) => (
          <View key={review.id} style={styles.reviewCard}>
            <View style={styles.reviewHeader}>
              <Text style={styles.reviewerName}>{review.userName}</Text>
              <View style={styles.ratingContainer}>
                <Icon name="star" size={16} color="#FFD700" />
                <Text style={styles.reviewRating}>{review.rating}</Text>
              </View>
            </View>
            <Text style={styles.reviewComment}>{review.comment}</Text>
          </View>
        ))}

        <TouchableOpacity style={styles.bookButton} onPress={handleBookNow}>
          <Text style={styles.bookButtonText}>Book Now</Text>
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
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: "100%",
    height: 300,
  },
  content: {
    padding: 16,
  },
  name: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  location: {
    fontSize: 16,
    color: "#666",
    marginLeft: 4,
  },
  rating: {
    fontSize: 16,
    marginLeft: 4,
  },
  priceContainer: {
    flexDirection: "row",
    alignItems: "baseline",
    marginVertical: 16,
  },
  price: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#0066CC",
  },
  perNight: {
    fontSize: 16,
    color: "#666",
    marginLeft: 4,
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 24,
  },
  reviewsButton: {
    marginBottom: 16,
  },
  reviewsButtonText: {
    color: "#0066CC",
    fontSize: 16,
  },
  reviewCard: {
    padding: 16,
    backgroundColor: "#f5f5f5",
    borderRadius: 8,
    marginBottom: 12,
  },
  reviewHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  reviewerName: {
    fontSize: 16,
    fontWeight: "600",
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  reviewRating: {
    marginLeft: 4,
  },
  reviewComment: {
    fontSize: 14,
    color: "#444",
  },
  weatherRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  weatherText: {
    fontSize: 18,
    fontWeight: "600",
    marginRight: 8,
  },
  weatherDesc: {
    fontSize: 14,
    color: "#666",
    textTransform: "capitalize",
  },
  weatherUnavailable: {
    fontSize: 14,
    color: "#999",
  },
  bookButton: {
    backgroundColor: "#0066CC",
    padding: 16,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 24,
  },
  bookButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default HotelDetailScreen;
