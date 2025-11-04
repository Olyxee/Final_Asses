import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Icon from "react-native-vector-icons/MaterialIcons";

import GalleryScreen from "../screens/GalleryScreen";
import ImageDetailScreen from "../screens/ImageDetailScreen";
import FavoritesScreen from "../screens/FavoritesScreen";
import SearchScreen from "../screens/SearchScreen";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const GalleryStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="GalleryMain" component={GalleryScreen} />
    <Stack.Screen name="ImageDetail" component={ImageDetailScreen} />
    <Stack.Screen name="Search" component={SearchScreen} />
  </Stack.Navigator>
);

const FavoritesStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="FavoritesMain" component={FavoritesScreen} />
    <Stack.Screen name="ImageDetail" component={ImageDetailScreen} />
  </Stack.Navigator>
);

const AppNavigator = () => (
  <Tab.Navigator
    screenOptions={({ route }) => ({
      tabBarIcon: ({ focused, color, size }) => {
        let iconName;

        if (route.name === "Gallery") {
          iconName = focused ? "photo-library" : "photo-library";
        } else if (route.name === "Favorites") {
          iconName = focused ? "favorite" : "favorite-border";
        }

        return <Icon name={iconName} size={size} color={color} />;
      },
      tabBarActiveTintColor: "#007AFF",
      tabBarInactiveTintColor: "gray",
    })}
  >
    <Tab.Screen name="Gallery" component={GalleryStack} />
    <Tab.Screen name="Favorites" component={FavoritesStack} />
  </Tab.Navigator>
);

export default AppNavigator;
