import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import AppContainer from "./src";

export default function App() {
  return (
    <NavigationContainer>
      <AppContainer />
    </NavigationContainer>
  );
}
