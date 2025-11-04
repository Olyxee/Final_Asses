import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import Icon from "react-native-vector-icons/MaterialIcons";

import ExploreScreen from "../screens/main/ExploreScreen";
import HotelDetailScreen from "../screens/main/HotelDetailScreen";
import BookingScreen from "../screens/main/BookingScreen";
import ReviewsScreen from "../screens/main/ReviewsScreen";
import BookingsScreen from "../screens/main/BookingsScreen";
import ProfileScreen from "../screens/main/ProfileScreen";
import EditProfileScreen from "../screens/main/EditProfileScreen";
import BookingSuccessScreen from "../screens/main/BookingSuccessScreen";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const ExploreStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: true }}>
    <Stack.Screen
      name="Explore"
      component={ExploreScreen}
      options={{ headerTitle: "Explore" }}
    />
    <Stack.Screen
      name="HotelDetail"
      component={HotelDetailScreen}
      options={{ headerTitle: "Hotel Details" }}
    />
    <Stack.Screen
      name="Booking"
      component={BookingScreen}
      options={{ headerTitle: "Booking" }}
    />
    <Stack.Screen
      name="BookingSuccess"
      component={BookingSuccessScreen}
      options={{ headerTitle: "Success" }}
    />
    <Stack.Screen
      name="Reviews"
      component={ReviewsScreen}
      options={{ headerTitle: "Reviews" }}
    />
  </Stack.Navigator>
);

const ProfileStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: true }}>
    <Stack.Screen
      name="Profile"
      component={ProfileScreen}
      options={{ headerTitle: "Profile" }}
    />
    <Stack.Screen
      name="EditProfile"
      component={EditProfileScreen}
      options={{ headerTitle: "Edit Profile" }}
    />
  </Stack.Navigator>
);

export const MainNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ focused, color, size }) => {
          let iconName = "home";
          if (route.name === "Explore") iconName = "search";
          if (route.name === "Bookings") iconName = "book";
          if (route.name === "Profile") iconName = "person";
          return <Icon name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: "#007AFF",
        tabBarInactiveTintColor: "gray",
      })}
    >
      <Tab.Screen name="Explore" component={ExploreStack} />
      <Tab.Screen name="Bookings" component={BookingsScreen} />
      <Tab.Screen name="Profile" component={ProfileStack} />
    </Tab.Navigator>
  );
};
