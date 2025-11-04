import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";

const Header = ({
  title,
  showSearch = false,
  onSearchPress,
  showBack = false,
  onBackPress,
}) => {
  return (
    <View style={styles.container}>
      {showBack && (
        <TouchableOpacity style={styles.backButton} onPress={onBackPress}>
          <Icon name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
      )}
      <Text style={styles.title}>{title}</Text>
      {showSearch && (
        <TouchableOpacity style={styles.searchButton} onPress={onSearchPress}>
          <Icon name="search" size={24} color="#000" />
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 56,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    backgroundColor: "#fff",
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  title: {
    flex: 1,
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
  },
  backButton: {
    position: "absolute",
    left: 16,
    zIndex: 1,
  },
  searchButton: {
    position: "absolute",
    right: 16,
    zIndex: 1,
  },
});

export default Header;
