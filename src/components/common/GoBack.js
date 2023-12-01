import React from "react";
import { Icon } from "react-native-elements";
import { useNavigation } from "@react-navigation/native";
import { StyleSheet, View, TouchableOpacity } from "react-native";
import { useTheme } from "react-native-paper";
import Title from "./Title";

export default function Goback({ title }) {
  const { colors } = useTheme();
  const navigation = useNavigation();

  return (
    <View>
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={styles.container}
      >
        <Icon
          name="chevron-left"
          type="material-community"
          size={30}
          iconStyle={{ color: colors.primary }}
          style={{ marginLeft: 1 }}
        />
        <Title title={title} goBack={true} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 10,
    paddingEnd: "5%",
  },
});
