import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Overlay } from "react-native-elements";

export default function Modal(props) {
    const { isVisible, close, children } = props;
  return (
    <Overlay
      isVisible={isVisible}
      windowBackgroundColor="rgba(0, 0, 0, .5)"
      overlayBackgroundColor="transparent"
      overlayStyle={styles.overlay}
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
    backgroundColor: "#fff",
    borderRadius: 20,
  },
});

