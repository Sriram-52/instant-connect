import { useEffect, useState } from "react";
import { StreamChat } from "stream-chat";
import { environment } from "../environment";
import { useAuthContext } from "../context/AuthContext";
import { userControllerGetToken } from "../api/services/base/users";
import { StreamChatGenerics } from "../types";

const chatClient = StreamChat.getInstance<StreamChatGenerics>(environment.apiKey);

export const useChatClient = () => {
  const [clientIsReady, setClientIsReady] = useState(false);

  const { user } = useAuthContext();

  useEffect(() => {
    const setupClient = async () => {
      try {
        if (!user?.id) {
          return;
        }
        const token = await userControllerGetToken(user.id);
        chatClient.connectUser({ id: user.id }, token);
        setClientIsReady(true);
      } catch (error) {
        if (error instanceof Error) {
          console.error(`An error occurred while connecting the user: ${error.message}`);
        }
      }
    };

    if (!chatClient.userID) {
      setupClient();
    }
  }, []);

  return {
    clientIsReady,
  };
};
