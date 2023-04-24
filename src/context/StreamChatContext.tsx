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
  const [channel, setChannel] = useState<any>(null);
  const [thread, setThread] = useState<any>(null);

  const { clientIsReady } = useChatClient();

  const value = useMemo((): StreamChatContextType => {
    return {
      channel,
      setChannel,
      thread,
      setThread,
    };
  }, [channel, thread]);

  if (!clientIsReady) {
    return <Text>Loading...</Text>;
  }

  const chatClient = StreamChat.getInstance(environment.apiKey);

  return (
    <StreamChatContext.Provider value={value}>
      <Chat client={chatClient}>{children}</Chat>
    </StreamChatContext.Provider>
  );
}

export default StreamChatContextProvider;
