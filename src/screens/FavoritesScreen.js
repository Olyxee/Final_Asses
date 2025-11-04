import React, { useState, useEffect } from "react";
import { View, StyleSheet } from "react-native";
import ImageGrid from "../components/ImageGrid";
import Header from "../components/Header";
import LoadingIndicator from "../components/LoadingIndicator";
import { getFavorites, getImages } from "../utils/imageUtils";

const FavoritesScreen = ({ navigation }) => {
  const [favorites, setFavorites] = useState([]);
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadFavorites();
  }, []);

  const loadFavorites = async () => {
    try {
      const favoritesList = await getFavorites();
      const allImages = await getImages();
      const favoriteImages = allImages.filter((img) =>
        favoritesList.includes(img.path)
      );
      setFavorites(favoritesList);
      setImages(favoriteImages);
    } catch (error) {
      console.error("Error loading favorites:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleImagePress = (image) => {
    navigation.navigate("ImageDetail", { image, favorites });
  };

  if (loading) {
    return <LoadingIndicator />;
  }

  return (
    <View style={styles.container}>
      <Header title="Favorites" />
      <ImageGrid
        images={images}
        onImagePress={handleImagePress}
        favorites={favorites}
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

export default FavoritesScreen;
