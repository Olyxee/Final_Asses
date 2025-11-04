// Polyfills required by Firebase Web SDK when running under React Native / Expo
// - react-native-get-random-values provides crypto.getRandomValues
// - react-native-url-polyfill provides global URL and related APIs
import "react-native-get-random-values";
import "react-native-url-polyfill/auto";

import { registerRootComponent } from "expo";
import App from "./App";

// registerRootComponent calls AppRegistry.registerComponent('main', () => App);
// It also ensures that whether you load the app in Expo Go or in a native build,
// the environment is set up appropriately
registerRootComponent(App);
