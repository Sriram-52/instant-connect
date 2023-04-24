import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { RootStackParamList, StreamChatGenerics } from "./types";
import { useAuthContext } from "./context/AuthContext";
import { SafeAreaView, View } from "react-native";
import { Text } from "react-native-paper";
import { protectedRoutes, unProtectedRoutes } from "./routes";
import StreamChatContextProvider from "./context/StreamChatContext";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { OverlayProvider } from "stream-chat-react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useStreamChatTheme } from "../useStreamChatTheme";

function MainContainer() {
  const { user, tokenListener } = useAuthContext();
  const [loading, setLoading] = React.useState(true);
  const RootStack = createNativeStackNavigator<RootStackParamList>();

  React.useEffect(() => {
    const subscriber = tokenListener(() => setLoading(false));
    return () => subscriber();
  }, []);

  if (loading) {
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    );
  }

  if (!user) {
    return (
      <RootStack.Navigator
        screenOptions={{
          headerShown: false,
        }}
        initialRouteName="Login"
      >
        {unProtectedRoutes.map((route) => (
          <RootStack.Screen key={route.name} name={route.name} component={route.Component} />
        ))}
      </RootStack.Navigator>
    );
  }

  return (
    <StreamChatContextProvider>
      <RootStack.Navigator
        screenOptions={{
          headerShown: false,
        }}
        initialRouteName="ChannelList"
      >
        {protectedRoutes.map((route) => (
          <RootStack.Screen key={route.name} name={route.name} component={route.Component} />
        ))}
      </RootStack.Navigator>
    </StreamChatContextProvider>
  );
}

export default function Main() {
  const { bottom } = useSafeAreaInsets();
  const theme = useStreamChatTheme();
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <OverlayProvider<StreamChatGenerics> bottomInset={bottom} value={{ style: theme }}>
        <SafeAreaView style={{ flex: 1 }}>
          <MainContainer />
        </SafeAreaView>
      </OverlayProvider>
    </GestureHandlerRootView>
  );
}
