import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import ExploreScreen from "../screens/main/ExploreScreen";
import HotelDetailScreen from "../screens/main/HotelDetailScreen";
import BookingScreen from "../screens/main/BookingScreen";
import ReviewsScreen from "../screens/main/ReviewsScreen";

const Stack = createStackNavigator();

const HotelNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: true,
        headerBackTitleVisible: false,
      }}
    >
      <Stack.Screen
        name="Explore"
        component={ExploreScreen}
        options={{ headerTitle: "Explore Hotels" }}
      />
      <Stack.Screen
        name="HotelDetail"
        component={HotelDetailScreen}
        options={({ route }) => ({
          headerTitle: route.params?.hotelName || "Hotel Details",
        })}
      />
      <Stack.Screen
        name="Booking"
        component={BookingScreen}
        options={{ headerTitle: "Book Your Stay" }}
      />
      <Stack.Screen
        name="Reviews"
        component={ReviewsScreen}
        options={{ headerTitle: "Reviews" }}
      />
    </Stack.Navigator>
  );
};

export default HotelNavigator;
