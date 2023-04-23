import Config from "react-native-config";

export const environment = {
  production: Config.ENVIRONMENT === "production",
  BASE_API: "http://10.0.0.166:5001",
};
