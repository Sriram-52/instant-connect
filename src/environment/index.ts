import Config from "react-native-config";

export const environment = {
  production: Config.ENVIRONMENT === "production",
  apiKey: Config.API_KEY || "api-key",
  BASE_API: Config.BASE_API || "http://10.0.0.166:5001",
};
