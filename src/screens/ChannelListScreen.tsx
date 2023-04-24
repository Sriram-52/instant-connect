import React from "react";
import UserChannelList from "../components/UserChannelList";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../types";
import CustomAppbar from "../components/CustomAppbar";

type Props = NativeStackScreenProps<RootStackParamList, "ChannelList">;

export default function ChannelListScreen({ navigation }: Props) {
  return (
    <>
      <CustomAppbar
        title="Instant Connect"
        canGoBack={navigation.canGoBack()}
        onBackPress={() => navigation.goBack()}
      />
      <UserChannelList navigation={navigation} />
    </>
  );
}
