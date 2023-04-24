import React from "react";
import { Appbar } from "react-native-paper";

export default function CustomAppbar({
  title,
  canGoBack,
  onBackPress,
  actions,
}: {
  title: string;
  canGoBack?: boolean;
  onBackPress?: () => void;
  actions?: React.ReactNode;
}) {
  return (
    <Appbar.Header dark>
      {canGoBack && onBackPress && <Appbar.BackAction onPress={onBackPress} />}
      <Appbar.Content title={title} />
      {actions !== undefined && actions}
    </Appbar.Header>
  );
}
