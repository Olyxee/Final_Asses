import React, { useState } from "react";
import { View, TextInput, StyleSheet } from "react-native";
import ImageGrid from "../components/ImageGrid";
import Header from "../components/Header";

const SearchScreen = ({ route, navigation }) => {
  const { images } = route.params;
  const [searchQuery, setSearchQuery] = useState("");

  const filteredImages = images.filter((image) =>
    image.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleImagePress = (image) => {
    navigation.navigate("ImageDetail", { image });
  };

  return (
    <View style={styles.container}>
      <Header title="Search" showBack onBackPress={() => navigation.goBack()} />
      <TextInput
        style={styles.searchInput}
        placeholder="Search images..."
        value={searchQuery}
        onChangeText={setSearchQuery}
        autoFocus
      />
      <ImageGrid images={filteredImages} onImagePress={handleImagePress} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  searchInput: {
    margin: 16,
    padding: 8,
    borderRadius: 8,
    backgroundColor: "#f0f0f0",
    fontSize: 16,
  },
});

export default SearchScreen;
