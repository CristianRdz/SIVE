import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { useContext, useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import {
  Card,
  PaperProvider,
  useTheme,
  MD3LightTheme as LightTheme,
  MD3DarkTheme as DarkTheme,
} from "react-native-paper";
import Toast from "react-native-toast-message";
import { AuthContext } from "./src/services/auth/context/AuthContext";
import AppNavigation from "./src/navigation/AppNavigation";
export default function Main() {
  const { colors } = useTheme();
  const { textSize, theme } = useContext(AuthContext);

  const toastConfig = {
    success: (props) => (
      <Card
        style={{
          ...styles.toastBase,
          backgroundColor: useTheme().colors.background,
          borderColor: useTheme().colors.primary,
        }}
      >
        <Text
          style={{
            fontSize: 15,
            fontWeight: "400",
            color: useTheme().colors.primary,
          }}
        >
          {" "}
          {props.text1}
        </Text>
        <Text style={{ fontSize: 13, color: useTheme().colors.primary }}>
          {props.text2}
        </Text>
      </Card>
    ),
    error: (props) => (
      <Card
        style={{
          ...styles.toastBase,
          backgroundColor: useTheme().colors.background,
          borderColor: useTheme().colors.errorContainer,
        }}
      >
        <Text
          style={{
            fontSize: 15,
            fontWeight: "400",
            color: useTheme().colors.primary,
          }}
        >
          {props.text1}
        </Text>
        <Text style={{ fontSize: 13, color: useTheme().colors.primary }}>
          {props.text2}
        </Text>
      </Card>
    ),
  };
  return (
    <PaperProvider
      theme={theme == "system" ? "" : theme == "dark" ? DarkTheme : LightTheme}
    >
      <StatusBar  backgroundColor={theme == "dark" ? "transparent" : "#fff"} style={theme == "dark" ? "light" : "dark"} />
      <NavigationContainer>
        <AppNavigation />
      </NavigationContainer>
      <Toast config={toastConfig} />
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  toastBase: {
    height: 60, width: '95%', justifyContent: 'center', alignItems: 'center', 
    borderWidth: 2, borderRadius: 10, marginVertical: 5, padding: 5
  }
})
