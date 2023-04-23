import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { TextInput } from "react-native-paper";
import Lottie from "lottie-react-native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../types";

type LoginScreenRouteProp = NativeStackNavigationProp<RootStackParamList, "Login", undefined>;

const Login = ({ navigation }: { navigation: LoginScreenRouteProp }) => {
  const [text, setText] = React.useState("");

  return (
    <>
      <View style={{ paddingTop: 20, paddingHorizontal: 20 }}>
        <Lottie
          style={{ height: 300, width: 300, marginLeft: 15 }}
          source={require("../assets/login.json")}
          autoPlay
        />
        <Text style={{ color: "#000", fontSize: 40, fontWeight: "bold" }}>Log In</Text>
        <Text style={{ color: "#808080", fontSize: 18, marginVertical: 5 }}>
          Enter Your Details to Login
        </Text>
        <View style={{ marginVertical: 20 }}>
          <TextInput
            style={{ marginBottom: 20 }}
            label="Email"
            value={text}
            onChangeText={(text) => setText(text)}
          />
          <TextInput
            style={{ marginBottom: 20 }}
            label="Password"
            value={text}
            onChangeText={(text) => setText(text)}
          />
          <TouchableOpacity
            onPress={() => {}}
            activeOpacity={0.7}
            style={{
              height: 55,
              width: "100%",
              backgroundColor: "#663399",
              marginVertical: 20,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text style={{ color: "#fff", fontWeight: "bold", fontSize: 18 }}>Log In</Text>
          </TouchableOpacity>
          <Text
            onPress={() => {
              navigation.navigate("Register");
            }}
            style={{
              color: "#000",
              fontWeight: "bold",
              textAlign: "center",
              fontSize: 16,
            }}
          >
            Don't have account ?Register
          </Text>
        </View>
      </View>
    </>
  );
};

export default Login;
