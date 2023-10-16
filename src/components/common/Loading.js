import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import React from "react";
import { Overlay } from "react-native-elements";
import { Colors } from "../../utils/colors.js";

export default function Loading(props) {
  // Estilo propio el del profesor es diferente pero se ve bien
  const { visible, text } = props;
  return (
    <Overlay
      isVisible={visible}
      windowBackgroundColor="rgba(0, 0, 0, .5)"
      overlayBackgroundColor="transparent"
      animationType="fade"
      overlayStyle={styles.overlay}
    >
      <View style={styles.view}>
        <ActivityIndicator size="large" color={Colors.primary} />
        <Text style={styles.text}>{text}</Text>
      </View>
    </Overlay>
  );
}

Loading.defaultProps = {
  visible: false,
  text: "",
};

const styles = StyleSheet.create({
  overlay: {
    height: 100,
    width: 200,
    backgroundColor: "#fff",
    borderColor: Colors.primary,
    borderWidth: 2,
    borderRadius: 10,
  },
  view: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    color: Colors.black,
    textTransform: "uppercase",
    fontWeight: "bold",
  },
});
