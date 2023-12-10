import React, { useContext } from "react";
import { TextInput, StyleSheet, View } from "react-native";
import { Icon } from "react-native-elements";
import { useTheme } from "react-native-paper";
import { AuthContext } from "../../services/auth/context/AuthContext";
import { getTextSize } from "../../utils/textSizes";

export default function Searchbar({ setInputValue }) {
  const { colors } = useTheme();
  const { textSize } = useContext(AuthContext);
  const textSizes = getTextSize(textSize.valor ? "medium" : textSize);

  const hanleInputChange = (text) => {
    let lowercaseInput = text.toLowerCase();
    setInputValue(lowercaseInput);
  };

  return (
    <>
      <View
        style={[
          styles.searchBar,
          {
            backgroundColor: colors.surface,
            borderColor: colors.primary,
            borderWidth: 1,
          },
        ]}
      >
        <Icon
          type="material-community"
          name="search-web"
          size={30}
          color="black"
          iconStyle={{ color: colors.primary }}
          style={styles.searchIcon}
        />
        <TextInput
          style={{...styles.searchInput, color: colors.primary, fontSize: textSizes.Text}}
          placeholder="Buscar..."
          placeholderTextColor={colors.primary}
          onChangeText={(text) => hanleInputChange(text)}
          autoCapitalize="none"

        />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    height: 50,
    borderRadius: 20,
    paddingHorizontal: "5%",
    marginHorizontal: "4%",
    marginBottom: "3%",
  },
  searchIcon: {
    marginRight: "5%",
    marginTop: "-2%",
  },
  searchInput: {
    flex: 1,
  },
});
