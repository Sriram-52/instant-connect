import React from "react";
import UserChannelList from "../components/UserChannelList";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../types";

type Props = NativeStackScreenProps<RootStackParamList, "ChannelList">;

export default function ChannelListScreen({ navigation }: Props) {
  return <UserChannelList navigation={navigation} />;
}
