import React, { useState } from "react";
import { SafeAreaView, ScrollView, View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { TextInput } from "react-native-paper";

import { useUserControllerCreate } from "../api/services/base/users";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../types";
import Lottie from "lottie-react-native";

type RegisterScreenRouteProp = NativeStackNavigationProp<RootStackParamList, "Register", undefined>;

const Register = ({ navigation }: { navigation: RegisterScreenRouteProp }): JSX.Element => {
  const [fullName, setFullName] = React.useState<string>("");
  const [email, setEmail] = React.useState<string>("");
  const [password, setPassword] = React.useState<string>("");
  const [confirmPassword, setConfirmPassword] = React.useState<string>("");

  const [loading, setLoading] = useState(false);

  const [errors, setErrors] = React.useState({
    email: "",
    password: "",
    name: "",
  });

  const useRegister = useUserControllerCreate({
    mutation: {
      onSuccess: () => {
        setLoading(false);

        setFullName("");
        setEmail("");
        setPassword("");
        setConfirmPassword("");

        setErrors({
          email: "",
          password: "",
          name: "",
        });

        navigation.navigate("Login");
      },
    },
  });

  const validate = () => {
    const errors = {
      email: "",
      password: "",
      name: "",
    };

    if (email.trim().length === 0) {
      errors.email = "Email is required";
    }

    if (password.trim().length === 0) {
      errors.password = "Password is required";
    }

    if (confirmPassword.trim().length === 0) {
      errors.password = "Confirm password is required";
    }

    if (password !== confirmPassword) {
      errors.password = "Passwords do not match";
    }

    if (password.trim().length < 6) {
      errors.password = "Password must be at least 6 characters";
    }

    if (fullName.trim().length === 0) {
      errors.name = "Name is required";
    }

    return errors;
  };

  const handleSubmit = () => {
    const errors = validate();
    setErrors(errors);

    if (Object.values(errors).some((error) => error.length > 0)) {
      return;
    }

    setLoading(true);
    useRegister.mutate({
      data: {
        email: email,
        password: password,
        name: fullName,
      },
    });
  };

  return (
    <SafeAreaView style={{ flex: 1, justifyContent: "center" }}>
      <ScrollView showsVerticalScrollIndicator={false} style={{ paddingHorizontal: 25 }}>
        <Lottie
          style={{ height: 300, width: 300, marginLeft: 15 }}
          source={require("../assets/register.json")}
          autoPlay
        />
        <Text style={styles.heading}>Register</Text>
        <View style={styles.input}>
          <TextInput
            onChangeText={(text) => setFullName(text)}
            placeholder={"Full Name"}
            style={{ flex: 1 }}
            secureTextEntry={false}
          />
        </View>
        <View style={styles.input}>
          <TextInput
            onChangeText={(text) => setEmail(text)}
            placeholder={"Email ID"}
            keyboardType={"email-address"}
            style={{ flex: 1, paddingVertical: 0 }}
            secureTextEntry={false}
          />
        </View>
        <View style={styles.input}>
          <TextInput
            onChangeText={(text) => setPassword(text)}
            placeholder={"Password"}
            style={{ flex: 1, paddingVertical: 0 }}
            secureTextEntry={true}
          />
        </View>
        <View style={styles.input}>
          <TextInput
            onChangeText={(text) => setConfirmPassword(text)}
            placeholder={"Confirm Password"}
            style={{ flex: 1, paddingVertical: 0 }}
            secureTextEntry={true}
          />
        </View>
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
          <Text style={{ color: "#fff", fontWeight: "bold", fontSize: 18 }}>Register</Text>
        </TouchableOpacity>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            marginBottom: 30,
          }}
        >
          <Text>Already registered?</Text>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Text style={{ color: "#663399", fontWeight: "700" }}> Login</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Register;

const styles = StyleSheet.create({
  heading: {
    color: "#000",
    fontSize: 40,
    fontWeight: "bold",
  },
  input: {
    marginVertical: 20,
  },
});
