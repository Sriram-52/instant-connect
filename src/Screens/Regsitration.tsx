import React from "react";
import { NativeSyntheticEvent } from "react-native";
import { TextInputChangeEventData } from "react-native";
import { SafeAreaView, ScrollView, View, Text, TextInput, TouchableOpacity } from "react-native";

const RegisterScreen = (): JSX.Element => {
  const fieldButtonFunction = () => {
    console.log("hi");
  };
  const fieldButtonLabel = "";
  const onPress = () => {
    console.log("hi");
  };
  const handleChange = (e: NativeSyntheticEvent<TextInputChangeEventData>) => {
    console.log("Hi");
  };
  return (
    <SafeAreaView style={{ flex: 1, justifyContent: "center" }}>
      <ScrollView showsVerticalScrollIndicator={false} style={{ paddingHorizontal: 25 }}>
        <Text
          style={{
            alignItems: "center",
            fontFamily: "Roboto-Medium",
            fontSize: 28,
            fontWeight: "500",
            color: "#333",
            marginBottom: 30,
          }}
        >
          Register
        </Text>
        <View
          style={{
            flexDirection: "row",
            borderBottomColor: "#ccc",
            borderBottomWidth: 1,
            paddingBottom: 8,
            marginBottom: 25,
          }}
        >
          <TextInput
            onChange={(e) => {
              handleChange(e);
            }}
            placeholder={"Full Name"}
            style={{ flex: 1, paddingVertical: 0 }}
            secureTextEntry={false}
          />
          <TouchableOpacity onPress={fieldButtonFunction}>
            <Text style={{ color: "#AD40AF", fontWeight: "700" }}>{fieldButtonLabel}</Text>
          </TouchableOpacity>
        </View>
        <View
          style={{
            flexDirection: "row",
            borderBottomColor: "#ccc",
            borderBottomWidth: 1,
            paddingBottom: 8,
            marginBottom: 25,
          }}
        >
          <TextInput
            onChange={(e) => {
              handleChange(e);
            }}
            placeholder={"Email ID"}
            keyboardType={"email-address"}
            style={{ flex: 1, paddingVertical: 0 }}
            secureTextEntry={false}
          />
          <TouchableOpacity onPress={fieldButtonFunction}>
            <Text style={{ color: "#AD40AF", fontWeight: "700" }}>{fieldButtonLabel}</Text>
          </TouchableOpacity>
        </View>
        <View
          style={{
            flexDirection: "row",
            borderBottomColor: "#ccc",
            borderBottomWidth: 1,
            paddingBottom: 8,
            marginBottom: 25,
          }}
        >
          <TextInput
            onChange={(e) => {
              handleChange(e);
            }}
            placeholder={"Password"}
            style={{ flex: 1, paddingVertical: 0 }}
            secureTextEntry={true}
          />
          <TouchableOpacity onPress={fieldButtonFunction}>
            <Text style={{ color: "#AD40AF", fontWeight: "700" }}>{fieldButtonLabel}</Text>
          </TouchableOpacity>
        </View>
        <View
          style={{
            flexDirection: "row",
            borderBottomColor: "#ccc",
            borderBottomWidth: 1,
            paddingBottom: 8,
            marginBottom: 25,
          }}
        >
          <TextInput
            onChange={(e) => {
              handleChange(e);
            }}
            placeholder={"Confirm Password"}
            style={{ flex: 1, paddingVertical: 0 }}
            secureTextEntry={true}
          />
          <TouchableOpacity onPress={fieldButtonFunction}>
            <Text style={{ color: "#AD40AF", fontWeight: "700" }}>{fieldButtonLabel}</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          onPress={onPress}
          style={{
            backgroundColor: "#AD40AF",
            padding: 20,
            borderRadius: 10,
            marginBottom: 30,
          }}
        >
          <Text
            style={{
              textAlign: "center",
              fontWeight: "700",
              fontSize: 16,
              color: "#fff",
            }}
          >
            Register
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

export default RegisterScreen;
