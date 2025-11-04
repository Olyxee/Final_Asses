import React from "react";
import { TouchableOpacity, Image, StyleSheet, View } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";

const ImageCard = ({ image, onPress, size, isFavorite }) => {
  return (
    <TouchableOpacity
      style={[styles.container, { width: size, height: size }]}
      onPress={onPress}
    >
      <Image
        source={{ uri: `file://${image.path}` }}
        style={styles.image}
        resizeMode="cover"
      />
      {isFavorite && (
        <View style={styles.favoriteIcon}>
          <Icon name="favorite" size={20} color="#FF0000" />
        </View>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 5,
    borderRadius: 8,
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: "100%",
  },
  favoriteIcon: {
    position: "absolute",
    top: 5,
    right: 5,
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    borderRadius: 12,
    padding: 2,
  },
});

export default ImageCard;
