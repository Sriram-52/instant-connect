import { createContext, useContext, useMemo, useState } from "react";
import { useChatClient } from "../hooks/useChatClient";
import { Text } from "react-native-paper";
import { Chat, ThreadContextValue } from "stream-chat-react-native";
import { Channel as ChannelType, StreamChat } from "stream-chat";
import { environment } from "../environment";
import { StreamChatGenerics } from "../types";

type StreamChatContextType = {
  channel: ChannelType<StreamChatGenerics> | undefined;
  setChannel: React.Dispatch<React.SetStateAction<ChannelType<StreamChatGenerics> | undefined>>;
  setThread: React.Dispatch<
    React.SetStateAction<ThreadContextValue<StreamChatGenerics>["thread"] | undefined>
  >;
  thread: ThreadContextValue<StreamChatGenerics>["thread"] | undefined;
  setChannelByChannelId: (channelId: string) => Promise<ChannelType | undefined>;
};

export const StreamChatContext = createContext<StreamChatContextType | null>(null);

export const useStreamChatContext = () => {
  const context = useContext(StreamChatContext);
  if (!context) {
    throw new Error("StreamChatContext not found");
  }
  return context;
};

function StreamChatContextProvider({ children }: { children: React.ReactNode }) {
  const [channel, setChannel] = useState<ChannelType<StreamChatGenerics> | undefined>(undefined);
  const [thread, setThread] = useState<
    ThreadContextValue<StreamChatGenerics>["thread"] | undefined
  >(undefined);

  const { clientIsReady } = useChatClient();

  const chatClient = StreamChat.getInstance(environment.apiKey);

  const setChannelByChannelId = async (channelId: string) => {
    const channel = await chatClient.queryChannels({ id: channelId });
    if (channel.length > 0) {
      setChannel(channel[0]);
      return channel[0];
    }
  };

  const value = useMemo((): StreamChatContextType => {
    return {
      channel,
      setChannel,
      thread,
      setThread,
      setChannelByChannelId,
    };
  }, [channel, thread]);

  if (!clientIsReady) {
    return <Text>Loading...</Text>;
  }

  return (
    <StreamChatContext.Provider value={value}>
      <Chat client={chatClient}>{children}</Chat>
    </StreamChatContext.Provider>
  );
}

export default StreamChatContextProvider;
