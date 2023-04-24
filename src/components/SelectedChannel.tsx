import React from "react";
import { useStreamChatContext } from "../context/StreamChatContext";
import { Channel, MessageList, MessageInput } from "stream-chat-react-native";

export default function SelectedChannel() {
  const { channel } = useStreamChatContext();

  console.log("channel", channel);

  if (!channel) {
    return null;
  }

  return (
    <Channel channel={channel}>
      <MessageList />
      <MessageInput />
    </Channel>
  );
}
