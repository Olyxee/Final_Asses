import React, { useState, useEffect } from "react";
import { View, StyleSheet, RefreshControl } from "react-native";
import ImageGrid from "../components/ImageGrid";
import Header from "../components/Header";
import LoadingIndicator from "../components/LoadingIndicator";
import { getImages, getFavorites } from "../utils/imageUtils";

const GalleryScreen = ({ navigation }) => {
  const [images, setImages] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const loadImages = async () => {
    try {
      const imageList = await getImages();
      const favoritesList = await getFavorites();
      setImages(imageList);
      setFavorites(favoritesList);
    } catch (error) {
      console.error("Error loading images:", error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    loadImages();
  }, []);

  const onRefresh = () => {
    setRefreshing(true);
    loadImages();
  };

  const handleImagePress = (image) => {
    navigation.navigate("ImageDetail", { image, favorites });
  };

  const handleSearchPress = () => {
    navigation.navigate("Search", { images });
  };

  if (loading) {
    return <LoadingIndicator />;
  }

  return (
    <View style={styles.container}>
      <Header title="Gallery" showSearch onSearchPress={handleSearchPress} />
      <ImageGrid
        images={images}
        onImagePress={handleImagePress}
        favorites={favorites}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
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
});

export default GalleryScreen;
