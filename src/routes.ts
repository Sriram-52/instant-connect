import ChatScreen from "./screens/ChatScreen";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import type { RootStackParamList } from "./types";

export type Route = {
  name: keyof RootStackParamList;
  Component: React.FC<{
    navigation: any;
    route: any;
  }>;
};

export const unProtectedRoutes: Route[] = [
  {
    name: "Login",
    Component: LoginScreen,
  },
  {
    name: "Register",
    Component: RegisterScreen,
  },
];

export const protectedRoutes: Route[] = [
  {
    name: "Home",
    Component: ChatScreen,
  },
];
