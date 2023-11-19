import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Overlay } from "react-native-elements";
import { useTheme } from "react-native-paper";

export default function Modal(props) {
    const { isVisible, close, children } = props;
    const { colors } = useTheme();
  return (
    <Overlay
      isVisible={isVisible}
      windowBackgroundColor="rgba(0, 0, 0, .5)"
      overlayBackgroundColor="transparent"
      overlayStyle={{...styles.overlay, backgroundColor: colors.background, color : colors.text}}
      animationType="fade"
      onBackdropPress={close}
    >
      {children}
    </Overlay>
  );
}

const styles = StyleSheet.create({
  overlay: {
    height: "auto",
    width: "90%",
    borderRadius: 20,
  },
});

