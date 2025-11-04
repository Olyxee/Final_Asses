import React from "react";
import { View, FlatList, StyleSheet, Dimensions } from "react-native";
import ImageCard from "./ImageCard";

const numColumns = 3;
const screenWidth = Dimensions.get("window").width;
const imageSize = screenWidth / numColumns - 10;

const ImageGrid = ({ images, onImagePress, favorites }) => {
  const renderItem = ({ item }) => (
    <ImageCard
      image={item}
      onPress={() => onImagePress(item)}
      size={imageSize}
      isFavorite={favorites?.includes(item.path)}
    />
  );

  return (
    <FlatList
      data={images}
      renderItem={renderItem}
      keyExtractor={(item) => item.path}
      numColumns={numColumns}
      contentContainerStyle={styles.container}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 5,
  },
});

export default ImageGrid;
