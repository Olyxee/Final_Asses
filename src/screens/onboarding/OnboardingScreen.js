import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  TouchableOpacity,
  FlatList,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const { width, height } = Dimensions.get("window");

const onboardingData = [
  {
    id: "1",
    title: "Find Perfect Hotels",
    description: "Discover and book the perfect hotel for your stay with ease",
    image: {
      uri: "https://images.unsplash.com/photo-1501117716987-c8e3b2cfb2e6?auto=format&fit=crop&w=1200&q=80",
    },
  },
  {
    id: "2",
    title: "Easy Booking",
    description: "Book your favorite hotels with just a few taps",
    image: {
      uri: "https://images.unsplash.com/photo-1528909514045-2fa4ac7a08ba?auto=format&fit=crop&w=1200&q=80",
    },
  },
  {
    id: "3",
    title: "Start Your Journey",
    description: "Begin your journey with us today",
    image: {
      uri: "https://images.unsplash.com/photo-1445019980597-93fa8acb246c?auto=format&fit=crop&w=1200&q=80",
    },
  },
];

const OnboardingScreen = ({ navigation }) => {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);

  const handleSkip = async () => {
    try {
      await AsyncStorage.setItem("@hasSeenOnboarding", "true");
      navigation.replace("Auth");
    } catch (error) {
      console.error("Error saving onboarding status:", error);
    }
  };

  const handleNext = () => {
    if (currentSlideIndex < onboardingData.length - 1) {
      setCurrentSlideIndex(currentSlideIndex + 1);
    } else {
      handleSkip();
    }
  };

  const renderItem = ({ item }) => {
    return (
      <View style={styles.slide}>
        <Image source={item.image} style={styles.image} />
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.description}>{item.description}</Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={onboardingData}
        renderItem={renderItem}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={(e) => {
          const contentOffset = e.nativeEvent.contentOffset;
          const viewSize = e.nativeEvent.layoutMeasurement;
          const pageNum = Math.floor(contentOffset.x / viewSize.width);
          setCurrentSlideIndex(pageNum);
        }}
      />
      <View style={styles.bottomContainer}>
        <View style={styles.indicatorContainer}>
          {onboardingData.map((_, index) => (
            <View
              key={index}
              style={[
                styles.indicator,
                currentSlideIndex === index && styles.activeIndicator,
              ]}
            />
          ))}
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity onPress={handleSkip} style={styles.skipButton}>
            <Text style={styles.skipText}>Skip</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleNext} style={styles.nextButton}>
            <Text style={styles.nextText}>
              {currentSlideIndex === onboardingData.length - 1
                ? "Get Started"
                : "Next"}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  slide: {
    width,
    height,
    alignItems: "center",
    padding: 20,
  },
  image: {
    width: width * 0.8,
    height: height * 0.4,
    resizeMode: "contain",
    marginTop: height * 0.1,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    marginTop: 20,
    textAlign: "center",
  },
  description: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
    marginTop: 10,
    paddingHorizontal: 20,
  },
  bottomContainer: {
    position: "absolute",
    bottom: 50,
    left: 0,
    right: 0,
  },
  indicatorContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 20,
  },
  indicator: {
    height: 8,
    width: 8,
    backgroundColor: "#ccc",
    marginHorizontal: 5,
    borderRadius: 4,
  },
  activeIndicator: {
    backgroundColor: "#007AFF",
    width: 20,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
  },
  skipButton: {
    padding: 15,
  },
  skipText: {
    color: "#666",
    fontSize: 16,
  },
  nextButton: {
    backgroundColor: "#007AFF",
    paddingHorizontal: 30,
    paddingVertical: 15,
    borderRadius: 25,
  },
  nextText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default OnboardingScreen;
