import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  Alert,
} from "react-native";
import { getHotels } from "../../services/firebase/hotel";
import { getRecommended } from "../../services/api/fakeStore";
import { useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/MaterialIcons";

const HotelCard = ({ hotel, onPress }) => (
  <TouchableOpacity style={styles.card} onPress={onPress}>
    <Image source={{ uri: hotel.image }} style={styles.hotelImage} />
    <View style={styles.cardContent}>
      <Text style={styles.hotelName}>{hotel.name}</Text>
      <Text style={styles.location}>
        <Icon name="location-on" size={16} color="#666" /> {hotel.location}
      </Text>
      <View style={styles.ratingContainer}>
        <Icon name="star" size={16} color="#FFD700" />
        <Text style={styles.rating}>{hotel.rating}</Text>
      </View>
      <Text style={styles.price}>${hotel.price}/night</Text>
    </View>
  </TouchableOpacity>
);

const ExploreScreen = () => {
  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [recommended, setRecommended] = useState([]);
  const [sortBy, setSortBy] = useState("price");
  const navigation = useNavigation();

  useEffect(() => {
    loadHotels();
    loadRecommended();
  }, [sortBy]);

  const loadHotels = async () => {
    try {
      setLoading(true);
      const hotelData = await getHotels(sortBy);
      setHotels(hotelData);
    } catch (error) {
      console.error("Error loading hotels:", error);
    } finally {
      setLoading(false);
    }
  };

  const loadRecommended = async () => {
    try {
      const data = await getRecommended(6);
      setRecommended(data);
    } catch (err) {
      console.warn("Failed to load recommended items:", err.message || err);
    }
  };

  const handleHotelPress = (hotel) => {
    navigation.navigate("HotelDetail", {
      hotelId: hotel.id,
      hotelName: hotel.name,
    });
  };

  const handleRecommendedPress = (item) => {
    Alert.alert(item.name, `Price: $${item.price}\n\n${item.description}`);
  };

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#0066CC" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {recommended.length > 0 && (
        <View style={styles.recommendedContainer}>
          <Text style={{ marginLeft: 16, marginBottom: 8, fontWeight: "600" }}>
            Recommended for you
          </Text>
          <FlatList
            data={recommended}
            horizontal
            showsHorizontalScrollIndicator={false}
            keyExtractor={(i) => i.id}
            contentContainerStyle={{ paddingHorizontal: 16 }}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.recommendCard}
                onPress={() => handleRecommendedPress(item)}
              >
                <Image
                  source={{ uri: item.image }}
                  style={styles.recommendImage}
                />
                <Text numberOfLines={1} style={styles.recommendName}>
                  {item.name}
                </Text>
                <Text style={styles.recommendPrice}>${item.price}</Text>
              </TouchableOpacity>
            )}
          />
        </View>
      )}
      <View style={styles.sortContainer}>
        <Text>Sort by: </Text>
        <TouchableOpacity
          style={[
            styles.sortButton,
            sortBy === "price" && styles.activeSortButton,
          ]}
          onPress={() => setSortBy("price")}
        >
          <Text>Price</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.sortButton,
            sortBy === "rating" && styles.activeSortButton,
          ]}
          onPress={() => setSortBy("rating")}
        >
          <Text>Rating</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={hotels}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <HotelCard hotel={item} onPress={() => handleHotelPress(item)} />
        )}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.list}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  sortContainer: {
    flexDirection: "row",
    padding: 16,
    alignItems: "center",
    backgroundColor: "#fff",
  },
  sortButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginLeft: 8,
    borderRadius: 20,
    backgroundColor: "#eee",
  },
  activeSortButton: {
    backgroundColor: "#0066CC",
  },
  list: {
    padding: 16,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 12,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  hotelImage: {
    width: "100%",
    height: 200,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  cardContent: {
    padding: 16,
  },
  hotelName: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
  },
  location: {
    fontSize: 14,
    color: "#666",
    marginBottom: 8,
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  rating: {
    marginLeft: 4,
    fontSize: 14,
    color: "#666",
  },
  price: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#0066CC",
  },
});

export default ExploreScreen;
