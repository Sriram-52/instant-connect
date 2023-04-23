import * as React from "react";
import auth from "@react-native-firebase/auth";
import LoginScreen from "./screens/LoginScreen";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import RegisterScreen from "./screens/RegisterScreen";
import { RootStackParamList } from "./types";

export default function AppContainer() {
  const user = auth().currentUser;
  const RootStack = createNativeStackNavigator<RootStackParamList>();

  return (
    <RootStack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName="Login"
    >
      <RootStack.Screen name="Login" component={LoginScreen} />
      <RootStack.Screen name="Register" component={RegisterScreen} />
    </RootStack.Navigator>
  );
}
