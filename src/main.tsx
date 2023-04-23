import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { RootStackParamList } from "./types";
import { useAuthContext } from "./context/AuthContext";
import { View } from "react-native";
import { Text } from "react-native-paper";
import { protectedRoutes, unProtectedRoutes } from "./routes";

export default function AppContainer() {
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
    <RootStack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName="Home"
    >
      {protectedRoutes.map((route) => (
        <RootStack.Screen key={route.name} name={route.name} component={route.Component} />
      ))}
    </RootStack.Navigator>
  );
}
