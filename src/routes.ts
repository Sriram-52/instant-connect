import { NativeStackHeaderProps } from "@react-navigation/native-stack";
import ChannelListScreen, { ChannelListHeader } from "./screens/ChannelListScreen";
import ChannelScreen, { ChannelHeader } from "./screens/ChannelScreen";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import type { RootStackParamList } from "./types";

export type Route = {
  name: keyof RootStackParamList;
  Component: React.FC<{
    navigation: any;
    route: any;
  }>;
  header?: (props: NativeStackHeaderProps) => JSX.Element;
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
    header: ChannelListHeader,
  },
  {
    name: "Channel",
    Component: ChannelScreen,
    header: ChannelHeader,
  },
];
