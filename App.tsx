import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import AppContainer from "./src";
import { Provider as PaperProvider, MD3LightTheme as DefaultTheme } from "react-native-paper";

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: "#663399",
    secondary: "#665a6f",
  },
};

export default function App() {
  return (
    <PaperProvider theme={theme}>
      <NavigationContainer>
        <AppContainer />
      </NavigationContainer>
    </PaperProvider>
  );
}
