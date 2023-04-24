import * as React from "react";
import {
  DarkTheme,
  NavigationContainer,
  DefaultTheme as NavigationDefaultTheme,
} from "@react-navigation/native";
import AppContainer from "./src/main";
import { Provider as PaperProvider, MD3LightTheme as DefaultTheme } from "react-native-paper";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import AuthContextProvider from "./src/context/AuthContext";
import { ThemeProp } from "react-native-paper/lib/typescript/src/types";
import { useStreamChatTheme } from "./useStreamChatTheme";
import { useColorScheme } from "react-native";

const theme: ThemeProp = {
  ...DefaultTheme,
  dark: false,
  colors: {
    ...DefaultTheme.colors,
    primary: "#663399",
    secondary: "#665a6f",
  },
};

const queryClient = new QueryClient();

export default function App() {
  const colorScheme = useColorScheme();
  const streamChatTheme = useStreamChatTheme();

  return (
    <QueryClientProvider client={queryClient}>
      <PaperProvider theme={theme}>
        <NavigationContainer
          theme={{
            colors: {
              ...(colorScheme === "dark" ? DarkTheme : NavigationDefaultTheme).colors,
              background: streamChatTheme.colors?.white_snow || "#FCFCFC",
            },
            dark: colorScheme === "dark",
          }}
        >
          <AuthContextProvider>
            <AppContainer />
          </AuthContextProvider>
        </NavigationContainer>
      </PaperProvider>
    </QueryClientProvider>
  );
}
