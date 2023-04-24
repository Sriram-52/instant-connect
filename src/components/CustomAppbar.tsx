import React from "react";
import { Appbar } from "react-native-paper";

export default function CustomAppbar({
  title,
  canGoBack,
  onBackPress,
}: {
  title: string;
  canGoBack?: boolean;
  onBackPress?: () => void;
}) {
  return (
    <Appbar.Header dark>
      {canGoBack && onBackPress && <Appbar.BackAction onPress={onBackPress} />}
      <Appbar.Content title={title} />
    </Appbar.Header>
  );
}
