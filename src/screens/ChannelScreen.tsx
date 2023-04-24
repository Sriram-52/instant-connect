import React from "react";
import SelectedChannel from "../components/SelectedChannel";
import { NativeStackHeaderProps, NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../types";
import CustomAppbar from "../components/CustomAppbar";

type Props = NativeStackScreenProps<RootStackParamList, "Channel">;

export function ChannelHeader(props: NativeStackHeaderProps) {
  const { navigation } = props;
  const route = props.route as Props["route"];
  const { channelId, channelName } = route.params;

  return (
    <CustomAppbar
      title={channelName ? channelName : channelId}
      canGoBack={navigation.canGoBack()}
      onBackPress={() => navigation.goBack()}
    />
  );
}

export default function ChannelScreen({ navigation, route }: Props) {
  return (
    <>
      <SelectedChannel />
    </>
  );
}
