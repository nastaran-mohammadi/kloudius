// app.config.js
import 'dotenv/config';

export default {
  expo: {
    name: "kloudius",
    slug: "kloudius",
    version: "1.0.0",
    orientation: "portrait",
    icon: "./assets/icon.png",
    userInterfaceStyle: "light",
    newArchEnabled: true,
    splash: {
      image: "./assets/splash-icon.png",
      resizeMode: "contain",
      backgroundColor: "#ffffff",
    },
    ios: {
      supportsTablet: true,
    },
    android: {
      adaptiveIcon: {
        foregroundImage: "./assets/adaptive-icon.png",
        backgroundColor: "#ffffff",
      },
      config: {
        googleMaps: {
          apiKey: process.env.GOOGLE_MAPS_API_KEY,
        },
      },
    },
    web: {
      favicon: "./assets/favicon.png",
    },
    extra: {
      googleMapsApiKey: process.env.GOOGLE_MAPS_API_KEY,
      googleMapsImageBaseUrl: process.env.GOOGLE_MAPS_IMAGE_BASE_URL,
    },
  },
};
