import React, { useContext } from "react";
import { StyleSheet, Text } from "react-native";
import { useTheme } from "react-native-paper";
import { AuthContext } from "../../services/auth/context/AuthContext";
import { getTextSize } from "../../utils/textSizes";

export default function Title({ title, goBack }) {
  const { colors } = useTheme();
  const { textSize } = useContext(AuthContext);
  const textSizes = getTextSize(textSize.valor ? "medium" : textSize);
  return (
    <Text
      style={
        goBack
          ? [styles.goBack, { color: colors.primary , fontSize: textSizes.Title}]
          : [styles.title, { color: colors.primary , fontSize: textSizes.Title}]
      }
    >
      {title}
    </Text>
  );
}

const styles = StyleSheet.create({
  goBack: {
    fontWeight: "bold",
  },
  title: {
    fontWeight: "bold",
    marginHorizontal: 15,
    marginBottom: 10,
  },
});
