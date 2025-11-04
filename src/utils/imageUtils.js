import AsyncStorage from "@react-native-async-storage/async-storage";
import { Platform } from "react-native";
import * as FileSystem from "expo-file-system";

const FAVORITES_KEY = "@hotel_booking_favorites";
const IMAGES_DIRECTORY = `${FileSystem.documentDirectory}images`;

export const getImages = async () => {
  try {
    // Ensure directory exists
    const dirInfo = await FileSystem.getInfoAsync(IMAGES_DIRECTORY);
    if (!dirInfo.exists) {
      await FileSystem.makeDirectoryAsync(IMAGES_DIRECTORY, {
        intermediates: true,
      });
      return [];
    }

    const files = await FileSystem.readDirectoryAsync(IMAGES_DIRECTORY);
    const imagePromises = files
      .filter((filename) => /\.(jpg|jpeg|png|gif)$/i.test(filename))
      .map(async (filename) => {
        const filePath = `${IMAGES_DIRECTORY}/${filename}`;
        const fileInfo = await FileSystem.getInfoAsync(filePath);
        return {
          name: filename,
          path: filePath,
          size: fileInfo.size,
          type: filename.split(".").pop().toLowerCase(),
        };
      });

    return await Promise.all(imagePromises);
  } catch (error) {
    console.error("Error reading images directory:", error);
    return [];
  }
};

export const getFavorites = async () => {
  try {
    const favorites = await AsyncStorage.getItem(FAVORITES_KEY);
    return favorites ? JSON.parse(favorites) : [];
  } catch (error) {
    console.error("Error getting favorites:", error);
    return [];
  }
};

export const toggleFavorite = async (imagePath) => {
  try {
    const favorites = await getFavorites();
    const isFavorite = favorites.includes(imagePath);

    let newFavorites;
    if (isFavorite) {
      newFavorites = favorites.filter((path) => path !== imagePath);
    } else {
      newFavorites = [...favorites, imagePath];
    }

    await AsyncStorage.setItem(FAVORITES_KEY, JSON.stringify(newFavorites));
    return !isFavorite;
  } catch (error) {
    console.error("Error toggling favorite:", error);
    return false;
  }
};

export const getImageInfo = async (imagePath) => {
  try {
    const fileInfo = await FileSystem.getInfoAsync(imagePath);
    return {
      size: fileInfo.size,
      modifiedTime: fileInfo.modificationTime,
      uri: fileInfo.uri,
    };
  } catch (error) {
    console.error("Error getting image info:", error);
    return null;
  }
};
