import React, { useState, useEffect } from "react";
import {
  View,
  Image,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Share,
  Alert,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import Header from "../components/Header";
import { toggleFavorite, getImageInfo } from "../utils/imageUtils";

const ImageDetailScreen = ({ route, navigation }) => {
  const { image, favorites: initialFavorites } = route.params;
  const [isFavorite, setIsFavorite] = useState(
    initialFavorites?.includes(image.path)
  );
  const [imageInfo, setImageInfo] = useState(null);

  useEffect(() => {
    loadImageInfo();
  }, []);

  const loadImageInfo = async () => {
    const info = await getImageInfo(image.path);
    setImageInfo(info);
  };

  const handleFavoritePress = async () => {
    const newFavoriteStatus = await toggleFavorite(image.path);
    setIsFavorite(newFavoriteStatus);
  };

  const handleShare = async () => {
    try {
      await Share.share({
        url: `file://${image.path}`,
        message: "Check out this image!",
      });
    } catch (error) {
      Alert.alert("Error", "Failed to share image");
    }
  };

  const handleDelete = () => {
    Alert.alert("Delete Image", "Are you sure you want to delete this image?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Delete",
        style: "destructive",
        onPress: async () => {
          try {
            // Implement delete functionality
            navigation.goBack();
          } catch (error) {
            Alert.alert("Error", "Failed to delete image");
          }
        },
      },
    ]);
  };

  return (
    <View style={styles.container}>
      <Header
        title="Image Detail"
        showBack
        onBackPress={() => navigation.goBack()}
      />
      <Image
        source={{ uri: `file://${image.path}` }}
        style={styles.image}
        resizeMode="contain"
      />
      <View style={styles.toolbar}>
        <TouchableOpacity
          onPress={handleFavoritePress}
          style={styles.toolbarButton}
        >
          <Icon
            name={isFavorite ? "favorite" : "favorite-border"}
            size={28}
            color={isFavorite ? "#FF0000" : "#000"}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={handleShare} style={styles.toolbarButton}>
          <Icon name="share" size={28} color="#000" />
        </TouchableOpacity>
        <TouchableOpacity onPress={handleDelete} style={styles.toolbarButton}>
          <Icon name="delete" size={28} color="#000" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
  },
  image: {
    flex: 1,
    width: Dimensions.get("window").width,
    height: undefined,
  },
  toolbar: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 16,
    backgroundColor: "#fff",
  },
  toolbarButton: {
    padding: 8,
  },
});

export default ImageDetailScreen;
