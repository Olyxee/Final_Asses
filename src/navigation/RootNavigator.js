import React, { useEffect, useState } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import AsyncStorage from "@react-native-async-storage/async-storage";
import OnboardingScreen from "../screens/onboarding/OnboardingScreen";
import { AuthNavigator } from "./AuthNavigator";
import { MainNavigator } from "./MainNavigator";
import { ActivityIndicator, View } from "react-native";
// Dev-only seed screen
let DevSeedScreen = null;
if (__DEV__) {
  // lazy require to avoid bundling in production
  // eslint-disable-next-line global-require
  DevSeedScreen = require("../screens/dev/SeedScreen").default;
}

const Stack = createStackNavigator();

const RootNavigator = () => {
  const [initialRoute, setInitialRoute] = useState(null);

  useEffect(() => {
    const determineInitial = async () => {
      try {
        const seen = await AsyncStorage.getItem("@hasSeenOnboarding");
        if (!seen) {
          setInitialRoute("Onboarding");
        } else {
          setInitialRoute("Auth");
        }
      } catch (e) {
        setInitialRoute("Auth");
      }
    };
    determineInitial();
  }, []);

  if (!initialRoute) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#007AFF" />
      </View>
    );
  }

  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName={initialRoute}
    >
      <Stack.Screen name="Onboarding" component={OnboardingScreen} />
      <Stack.Screen name="Auth" component={AuthNavigator} />
      <Stack.Screen name="Main" component={MainNavigator} />
      {__DEV__ && DevSeedScreen && (
        <Stack.Screen name="DevSeed" component={DevSeedScreen} />
      )}
    </Stack.Navigator>
  );
};

export default RootNavigator;
