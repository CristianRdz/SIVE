import { StyleSheet, Text, View } from "react-native";
import React, { useContext } from "react";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Card, useTheme } from "react-native-paper";
import { temas } from "../data/themes";
import { AuthContext } from "../services/auth/context/AuthContext";
import DropdownComponent from "../components/common/DropdownComponent";

export default function Ajustes() {
  const { colors } = useTheme();
  const { setTheme, theme } = useContext(AuthContext);
  return (
    <KeyboardAwareScrollView style={{ backgroundColor: colors.background }}>
      
      <Card style={{ margin: 10, padding: 10 }}>
      <DropdownComponent
        data={temas}
        nombre="nombre"
        id="id"
        setValueOut={setTheme}
      />
      </Card>
    </KeyboardAwareScrollView>
  );
}

const styles = StyleSheet.create({});
