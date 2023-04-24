import React from "react";
import { ChannelList } from "stream-chat-react-native";
import { useAuthContext } from "../context/AuthContext";
import { ChannelFilters, ChannelSort } from "stream-chat";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../types";
import { useStreamChatContext } from "../context/StreamChatContext";

type RouteProp = NativeStackNavigationProp<RootStackParamList, "ChannelList", undefined>;

export default function UserChannelList({ navigation }: { navigation: RouteProp }) {
  const { user } = useAuthContext();
  const { setChannel } = useStreamChatContext();

  const filters: ChannelFilters = {
    type: "messaging",
    members: { $in: [user?.id ?? ""] },
  };

  const sort: ChannelSort = {
    last_message_at: -1,
  };

  return (
    <ChannelList
      filters={filters}
      sort={sort}
      onSelect={(channel) => {
        if (channel.id) {
          navigation.navigate("Channel", { channelId: channel.id });
          setChannel(channel);
        }
      }}
    />
  );
}
