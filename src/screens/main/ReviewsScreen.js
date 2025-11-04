import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from "react-native";
import { getHotelReviews, addReview } from "../../services/firebase/hotel";
import Icon from "react-native-vector-icons/MaterialIcons";
import { useAuth } from "../../context/AuthContext";
import CustomInput from "../../components/common/CustomInput";

const ReviewCard = ({ review }) => (
  <View style={styles.reviewCard}>
    <View style={styles.reviewHeader}>
      <Text style={styles.reviewerName}>{review.userName}</Text>
      <View style={styles.ratingContainer}>
        {[1, 2, 3, 4, 5].map((star) => (
          <Icon
            key={star}
            name="star"
            size={16}
            color={star <= review.rating ? "#FFD700" : "#ddd"}
          />
        ))}
      </View>
    </View>
    <Text style={styles.reviewDate}>
      {new Date(review.createdAt?.toDate()).toLocaleDateString()}
    </Text>
    <Text style={styles.reviewComment}>{review.comment}</Text>
  </View>
);

const ReviewsScreen = ({ route }) => {
  const { hotelId } = route.params;
  const { user } = useAuth();
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAddReview, setShowAddReview] = useState(false);
  const [newReview, setNewReview] = useState({
    rating: 5,
    comment: "",
  });

  useEffect(() => {
    loadReviews();
  }, []);

  const loadReviews = async () => {
    try {
      setLoading(true);
      const reviewsData = await getHotelReviews(hotelId);
      setReviews(reviewsData);
    } catch (error) {
      console.error("Error loading reviews:", error);
      Alert.alert("Error", "Failed to load reviews");
    } finally {
      setLoading(false);
    }
  };

  const handleAddReview = async () => {
    if (!user) {
      Alert.alert("Error", "Please sign in to add a review");
      return;
    }

    if (!newReview.comment.trim()) {
      Alert.alert("Error", "Please enter a review comment");
      return;
    }

    try {
      const reviewData = {
        hotelId,
        userId: user.uid,
        userName: user.displayName || "Anonymous",
        rating: newReview.rating,
        comment: newReview.comment.trim(),
      };

      await addReview(reviewData);
      await loadReviews();
      setShowAddReview(false);
      setNewReview({ rating: 5, comment: "" });
      Alert.alert("Success", "Your review has been added");
    } catch (error) {
      console.error("Error adding review:", error);
      Alert.alert("Error", "Failed to add review");
    }
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
      <TouchableOpacity
        style={styles.addReviewButton}
        onPress={() => setShowAddReview(!showAddReview)}
      >
        <Text style={styles.addReviewButtonText}>
          {showAddReview ? "Cancel" : "Add Review"}
        </Text>
      </TouchableOpacity>

      {showAddReview && (
        <View style={styles.addReviewForm}>
          <View style={styles.ratingSelector}>
            <Text style={styles.ratingLabel}>Your Rating:</Text>
            <View style={styles.starsContainer}>
              {[1, 2, 3, 4, 5].map((star) => (
                <TouchableOpacity
                  key={star}
                  onPress={() => setNewReview({ ...newReview, rating: star })}
                >
                  <Icon
                    name="star"
                    size={30}
                    color={star <= newReview.rating ? "#FFD700" : "#ddd"}
                    style={styles.starIcon}
                  />
                </TouchableOpacity>
              ))}
            </View>
          </View>

          <CustomInput
            label="Your Review"
            value={newReview.comment}
            onChangeText={(text) =>
              setNewReview({ ...newReview, comment: text })
            }
            placeholder="Write your review here..."
            multiline
            numberOfLines={4}
            style={styles.reviewInput}
          />

          <TouchableOpacity
            style={styles.submitButton}
            onPress={handleAddReview}
          >
            <Text style={styles.submitButtonText}>Submit Review</Text>
          </TouchableOpacity>
        </View>
      )}

      <FlatList
        data={reviews}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <ReviewCard review={item} />}
        contentContainerStyle={styles.reviewsList}
        ListEmptyComponent={
          <Text style={styles.emptyText}>No reviews yet</Text>
        }
      />
    </View>
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
  addReviewButton: {
    backgroundColor: "#0066CC",
    padding: 12,
    margin: 16,
    borderRadius: 8,
    alignItems: "center",
  },
  addReviewButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  addReviewForm: {
    padding: 16,
    backgroundColor: "#f5f5f5",
    margin: 16,
    borderRadius: 8,
  },
  ratingSelector: {
    marginBottom: 16,
  },
  ratingLabel: {
    fontSize: 16,
    marginBottom: 8,
  },
  starsContainer: {
    flexDirection: "row",
    justifyContent: "center",
  },
  starIcon: {
    marginHorizontal: 4,
  },
  reviewInput: {
    height: 100,
    textAlignVertical: "top",
  },
  submitButton: {
    backgroundColor: "#0066CC",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 16,
  },
  submitButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  reviewsList: {
    padding: 16,
  },
  reviewCard: {
    backgroundColor: "#f5f5f5",
    padding: 16,
    borderRadius: 8,
    marginBottom: 16,
  },
  reviewHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  reviewerName: {
    fontSize: 16,
    fontWeight: "bold",
  },
  ratingContainer: {
    flexDirection: "row",
  },
  reviewDate: {
    fontSize: 12,
    color: "#666",
    marginBottom: 8,
  },
  reviewComment: {
    fontSize: 14,
    lineHeight: 20,
  },
  emptyText: {
    textAlign: "center",
    color: "#666",
    fontSize: 16,
    marginTop: 32,
  },
});

export default ReviewsScreen;
