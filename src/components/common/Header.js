import React from "react";
import { useNavigation } from "@react-navigation/native";
import { Image } from "react-native-elements";
import { useTheme } from "react-native-paper";
export default function Header(title) {
  const navigation = useNavigation();
  const { colors } = useTheme();
  return {
    title: title,
    headerStyle: {
      // Azul typescript
      backgroundColor: colors.surface,
    },
    // color iconos barra de estado
    headerTintColor: colors.primary,
    headerTitleStyle: {
      fontWeight: 'bold',
    },
    //headerRight:
      // icono de menu
      //() => (
      //  <Image
       //   source={require("../../../assets/inApp/logo.png")}
          //Haremos que se vea en pequeño
       //   style={{ width: 75, height: 30, resizeMode: "contain" , marginRight: 10}}
       // />
      //),
  };
}
