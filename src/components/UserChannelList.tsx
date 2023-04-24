import React from "react";
import { ChannelList } from "stream-chat-react-native";
import { useAuthContext } from "../context/AuthContext";
import { ChannelFilters, ChannelSort, Channel } from "stream-chat";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../types";
import { useStreamChatContext } from "../context/StreamChatContext";
import { FAB } from "react-native-paper";
import { StyleSheet } from "react-native";
import NewChat from "./NewChat";

type RouteProp = NativeStackNavigationProp<RootStackParamList, "ChannelList", undefined>;

export default function UserChannelList({ navigation }: { navigation: RouteProp }) {
  const { user } = useAuthContext();
  const { setChannel } = useStreamChatContext();

  const [showNewChat, setShowNewChat] = React.useState(false);

  const filters: ChannelFilters = {
    type: "messaging",
    members: { $in: [user?.id ?? ""] },
  };

  const sort: ChannelSort = {
    last_message_at: -1,
  };

  const onChannelSelect = (channel: Channel) => {
    const members = channel.state.members;
    const memberIds = Object.keys(members);
    const otherMemberId = memberIds.find((id) => id !== user?.id);
    if (otherMemberId) {
      const otherMember = members[otherMemberId];
      navigation.navigate("Channel", {
        channelId: channel.id ?? "",
        channelName: otherMember.user?.name,
      });
    }
  };

  return (
    <>
      {showNewChat ? (
        <NewChat
          onCreated={(channel) => {
            onChannelSelect(channel);
            setShowNewChat(false);
          }}
        />
      ) : (
        <ChannelList
          filters={filters}
          sort={sort}
          onSelect={(channel) => {
            if (channel.id) {
              setChannel(channel);
              onChannelSelect(channel);
            }
          }}
        />
      )}
      <FAB
        icon={showNewChat ? "close" : "message-plus"}
        style={styles.fab}
        onPress={() => setShowNewChat(!showNewChat)}
      />
    </>
  );
}

const styles = StyleSheet.create({
  fab: {
    position: "absolute",
    margin: 16,
    right: 0,
    bottom: 0,
  },
});
