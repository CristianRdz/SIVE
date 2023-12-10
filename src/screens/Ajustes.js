import { StyleSheet, Text, View } from "react-native";
import React, { useContext, useState } from "react";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Card, useTheme, SegmentedButtons} from "react-native-paper";
import { temas , tamanios } from "../data/themes";
import { AuthContext } from "../services/auth/context/AuthContext";
import DropdownComponent from "../components/common/DropdownComponent";
import { Button } from "react-native-elements";
import { getTextSize } from "../utils/textSizes";

export default function Ajustes() {
  const { colors } = useTheme();
  const { setTheme, theme,logout , changeTextSize, textSize} = useContext(AuthContext);
  const textSizes = getTextSize(textSize.valor ? "medium" : textSize);
  return (
    <KeyboardAwareScrollView style={{ backgroundColor: colors.background }}>
      <Card style={{ margin: 10, padding: 10 }}>

      <Text style={{ fontSize: textSizes.Title, fontWeight: "bold", color: colors.primary }}>
        Temas de la aplicación
      </Text>
      <SegmentedButtons
      style={{margin: 10}}
        value={theme}
        onValueChange={(value) => setTheme(value)}
        buttons={[
          { label: 'Oscuro', value: 'dark' },
          { label: 'Claro', value: 'light' },
          { label: 'Sistema', value: 'system' },
        ]}
      />

      <Text style={{ fontSize: textSizes.Title, fontWeight: "bold", color: colors.primary }}>
        Tamaño de letra
      </Text>
      <SegmentedButtons
      style={{margin: 10}}
        value={textSize}
        onValueChange={(value) => changeTextSize(value)}
        buttons={[
          { label: 'Pequeño', value: 'small' },
          { label: 'Mediano', value: 'medium' },
          { label: 'Grande', value: 'large' },
        ]}
      />
      </Card>


    </KeyboardAwareScrollView>
  );
}

const styles = StyleSheet.create({});
