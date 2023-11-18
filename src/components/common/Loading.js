import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import React from "react";
import { Overlay } from "react-native-elements";
import { useTheme } from "react-native-paper";

export default function Loading(props) {
  const {colors} = useTheme();
  const { visible, text } = props;
  return (
    <Overlay
      isVisible={visible}
      windowBackgroundColor="rgba(0, 0, 0, .5)"
      overlayBackgroundColor="transparent"
      animationType="fade"
      overlayStyle={styles.overlay}
    >
      <View style={{...styles.view, backgroundColor: colors.background}}>
        <ActivityIndicator size="large" color={colors.primary} />
        <Text style={{...styles.text, color: colors.primary}}>{text}</Text>
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
    borderWidth: 2,
    borderRadius: 10,
  },
  view: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    textTransform: "uppercase",
    fontWeight: "bold",
  },
});
