import * as React from "react";
import { Text, View } from "react-native";
import auth from "@react-native-firebase/auth";

export default function AppContainer() {
  const user = auth().currentUser;

  return <Text>Welcome {user?.email}</Text>;
}
