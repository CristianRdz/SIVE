import { StyleSheet, Text, View } from "react-native";
import React, { useContext } from "react";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Card, useTheme } from "react-native-paper";
import { temas , tamanios } from "../data/themes";
import { AuthContext } from "../services/auth/context/AuthContext";
import DropdownComponent from "../components/common/DropdownComponent";
import { Button } from "react-native-elements";

export default function Ajustes() {
  const { colors } = useTheme();
  const { setTheme, theme,logout } = useContext(AuthContext);
  return (
    <KeyboardAwareScrollView style={{ backgroundColor: colors.background }}>
      
      <Card style={{ margin: 10, padding: 10 }}>

      <Text style={{ fontSize: 20, fontWeight: "bold", color: colors.primary }}>
        Temas de la aplicación
      </Text>
      <DropdownComponent
        data={temas}
        nombre="nombre"
        id="id"
        setValueOut={setTheme}
      />

      <Text style={{ fontSize: 20, fontWeight: "bold", color: colors.primary }}>
        Tamaño de letra
      </Text>
      <DropdownComponent
        data={tamanios}
        nombre="nombre"
        id="id"
        setValueOut={setTheme}
      />
      </Card>


    </KeyboardAwareScrollView>
  );
}

const styles = StyleSheet.create({});
