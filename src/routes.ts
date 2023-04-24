import ChannelListScreen from "./screens/ChannelListScreen";
import ChannelScreen from "./screens/ChannelScreen";
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
    name: "ChannelList",
    Component: ChannelListScreen,
  },
  {
    name: "Channel",
    Component: ChannelScreen,
  },
];
