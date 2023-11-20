import React, { useContext } from "react";
import { useNavigation } from "@react-navigation/native";
import { Image } from "react-native-elements";
import { useTheme } from "react-native-paper";
import { AuthContext } from "../../services/auth/context/AuthContext";
import { getTextSize } from "../../utils/textSizes";
export default function Header(title) {
  const navigation = useNavigation();
  const { colors } = useTheme();
  const {textSize} = useContext(AuthContext);
  const textSizes = getTextSize(textSize.valor ? "medium" : textSize);
  return {
    title: title,
    headerStyle: {
      // Azul typescript
      backgroundColor: colors.surface,
    },
    // color iconos barra de estado
    headerTintColor: colors.primary,
    headerTitleStyle: {
      // color titulo
      color: colors.primary,
      fontSize: textSizes.Subtitle,
      fontWeight: "bold",
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
