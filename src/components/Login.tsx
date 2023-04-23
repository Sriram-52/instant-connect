import React from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import { TextInput } from "react-native-paper";
import Lottie from "lottie-react-native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../types";
import { useAuthContext } from "../context/AuthContext";

type LoginScreenRouteProp = NativeStackNavigationProp<RootStackParamList, "Login", undefined>;

const Login = ({ navigation }: { navigation: LoginScreenRouteProp }) => {
  const { login } = useAuthContext();

  const [formData, setFormData] = React.useState({
    email: "",
    password: "",
  });

  const handleChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    const { email, password } = formData;
    await login(email, password);
  };

  return (
    <>
      <ScrollView style={{ paddingTop: 20, paddingHorizontal: 20 }}>
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
            value={formData.email}
            onChangeText={(text) => handleChange("email", text)}
          />
          <TextInput
            style={{ marginBottom: 20 }}
            label="Password"
            secureTextEntry
            value={formData.password}
            onChangeText={(text) => handleChange("password", text)}
          />
          <TouchableOpacity
            onPress={handleSubmit}
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
      </ScrollView>
    </>
  );
};

export default Login;
