import React from "react";
import SelectedChannel from "../components/SelectedChannel";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../types";
import CustomAppbar from "../components/CustomAppbar";

type Props = NativeStackScreenProps<RootStackParamList, "Channel">;

export default function ChannelScreen({ navigation, route }: Props) {
  const { channelId, channelName } = route.params;
  return (
    <>
      <CustomAppbar
        title={channelName ? channelName : channelId}
        canGoBack={navigation.canGoBack()}
        onBackPress={() => navigation.goBack()}
      />
      <SelectedChannel />
    </>
  );
}
