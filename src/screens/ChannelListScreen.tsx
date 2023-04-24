import React from "react";
import UserChannelList from "../components/UserChannelList";
import { NativeStackHeaderProps, NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../types";
import CustomAppbar from "../components/CustomAppbar";
import { Appbar, Button, Divider, Menu } from "react-native-paper";
import { Platform, View } from "react-native";
import { useAuthContext } from "../context/AuthContext";

type Props = NativeStackScreenProps<RootStackParamList, "ChannelList">;

export function ChannelListHeader(props: NativeStackHeaderProps) {
  const { navigation } = props;
  const { logout } = useAuthContext();
  const [visible, setVisible] = React.useState(false);

  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);

  const MORE_ICON = Platform.OS === "ios" ? "dots-horizontal" : "dots-vertical";

  return (
    <CustomAppbar
      title="Instant Connect"
      canGoBack={navigation.canGoBack()}
      onBackPress={() => navigation.goBack()}
      actions={
        <>
          <Menu
            onDismiss={closeMenu}
            visible={visible}
            anchor={<Appbar.Action icon={MORE_ICON} onPress={openMenu} />}
          >
            <Menu.Item title="Logout" onPress={logout} />
          </Menu>
        </>
      }
    />
  );
}

export default function ChannelListScreen({ navigation }: Props) {
  return (
    <>
      <UserChannelList navigation={navigation} />
    </>
  );
}
