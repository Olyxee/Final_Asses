import Constants from "expo-constants";

// Prefer Expo runtime config: set keys in app.json under "extra"
// e.g. { "expo": { "extra": { "OPENWEATHER_API_KEY": "your_key" } } }
const manifestExtra =
  (Constants.manifest && Constants.manifest.extra) ||
  (Constants.manifest2 && Constants.manifest2.extra) ||
  {};

export const OPENWEATHER_API_KEY =
  manifestExtra.OPENWEATHER_API_KEY || process.env.OPENWEATHER_API_KEY || null;

export default {
  OPENWEATHER_API_KEY,
};
