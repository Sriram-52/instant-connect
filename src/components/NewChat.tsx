import React from "react";
import { ScrollView } from "react-native";
import {
  useUserControllerCreateChannel,
  useUserControllerGetAll,
} from "../api/services/base/users";
import { Divider, List } from "react-native-paper";
import { useAuthContext } from "../context/AuthContext";

export default function NewChat({ onCreated }: { onCreated: (channelId: string) => void }) {
  const { user: loggedInUser } = useAuthContext();
  const { data } = useUserControllerGetAll();

  const useCreateChannel = useUserControllerCreateChannel({
    mutation: {
      onSuccess(channelId) {
        onCreated(channelId);
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
        {data?.map((user, index) => (
          <>
            <List.Item
              key={user.id}
              title={user.name}
              description={user.email}
              onPress={() => createChannel(user.id)}
            />
            {index < data.length - 1 && <Divider />}
          </>
        ))}
      </ScrollView>
    </List.Section>
  );
}
