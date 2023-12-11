import React, { useState, useContext, useEffect } from "react";
import { View, StyleSheet, Text } from "react-native";
import { Button, Icon } from "react-native-elements";
import { AuthContext } from "../../../services/auth/context/AuthContext";
import { useTheme } from "react-native-paper";
import { getSale } from "../../../services/sale/saleService";

export default function Sale(props) {
  const { colors } = useTheme();
  const { textSize } = useContext(AuthContext);
  const { close, sale_uid } = props;
  const [sale, setSale] = useState(null);

  const getSaleFetch = async () => {
  };

  useEffect(() => {
    getSaleFetch();
  }, []);

  return (
    <View>
      <Text></Text>
      <Button
        text
        icon={
          <Icon
            type="material-community"
            name="cancel"
            color={colors.surface}
            style={styles.icon}
          />
        }
        titleStyle={{ color: colors.surface, fontSize: textSize.Subtitle }}
        title={"Cerrar"}
        containerStyle={{
          ...styles.btnContainer,
          backgroundColor: colors.error,
        }}
        buttonStyle={{ backgroundColor: colors.error }}
        onPress={close}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  icon: {
    marginRight: 10,
  },
  btnContainer: {
    marginTop: 15,
    width: "95%",
    alignSelf: "center",
    borderRadius: 10,
  },
});
