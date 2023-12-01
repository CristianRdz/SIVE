import React from "react";
import { StyleSheet, Text } from "react-native";
import { useTheme } from "react-native-paper";

export default function Title({ title, goBack }) {
  const { colors } = useTheme();
  
  return (
    <Text
      style={
        goBack
          ? [styles.goBack, { color: colors.primary }]
          : [styles.title, { color: colors.primary }]
      }
    >
      {title}
    </Text>
  );
}

const styles = StyleSheet.create({
  goBack: {
    fontSize: 24,
    fontWeight: "bold",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginHorizontal: 15,
    marginBottom: 10,
  },
});
