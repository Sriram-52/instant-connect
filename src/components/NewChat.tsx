import React from "react";
import { ScrollView } from "react-native";
import {
  useUserControllerCreateChannel,
  useUserControllerGetAll,
} from "../api/services/base/users";
import { Divider, List } from "react-native-paper";
import { useAuthContext } from "../context/AuthContext";
import { useStreamChatContext } from "../context/StreamChatContext";
import { Channel } from "stream-chat";

export default function NewChat({ onCreated }: { onCreated: (channel: Channel) => void }) {
  const { user: loggedInUser } = useAuthContext();
  const { setChannelByChannelId } = useStreamChatContext();
  const { data } = useUserControllerGetAll();

  const useCreateChannel = useUserControllerCreateChannel({
    mutation: {
      async onSuccess(channelId) {
        const channel = await setChannelByChannelId(channelId);
        if (!channel) {
          return;
        }
        onCreated(channel);
      },
    },
  });

  const createChannel = (userId: string) => {
    if (!loggedInUser) {
      return;
    }
    useCreateChannel.mutate({
      id: loggedInUser.id,
      data: {
        members: [userId],
      },
    });
  };

  return (
    <List.Section>
      <ScrollView>
        {data
          ?.filter((user) => user.id !== loggedInUser?.id)
          .map((user, index) => (
            <React.Fragment key={user.id}>
              <List.Item
                title={user.name}
                description={user.email}
                onPress={() => createChannel(user.id)}
              />
              {index < data.length - 1 && <Divider />}
            </React.Fragment>
          ))}
      </ScrollView>
    </List.Section>
  );
}
