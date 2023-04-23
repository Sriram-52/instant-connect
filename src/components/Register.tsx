import React, { useState } from "react";
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { useUserControllerCreate } from "../api/services/base/users";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../types";

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
        <Text style={styles.heading}>Register</Text>
        <View style={styles.input}>
          <TextInput
            onChangeText={(text) => setFullName(text)}
            placeholder={"Full Name"}
            style={{ flex: 1, paddingVertical: 0 }}
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

export default Register;

const styles = StyleSheet.create({
  heading: {
    alignItems: "center",
    fontFamily: "Roboto-Medium",
    fontSize: 28,
    fontWeight: "500",
    color: "#333",
    marginBottom: 30,
  },
  input: {
    flexDirection: "row",
    borderBottomColor: "#ccc",
    borderBottomWidth: 1,
    paddingBottom: 8,
    marginBottom: 25,
  },
});
