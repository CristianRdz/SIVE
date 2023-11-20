import { Image, StyleSheet, Text, View } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import Toast from "react-native-toast-message";
import Loading from "../common/Loading";
import { AuthContext } from "../../services/auth/context/AuthContext";
import { useNavigation } from "@react-navigation/native";
import { Card, TextInput, useTheme } from "react-native-paper";
import { Button, Icon } from "react-native-elements";
import { getTextSize } from "../../utils/textSizes";

export default function LoginForm() {
  const { login, textSize } = useContext(AuthContext);
  const textSizes = getTextSize(textSize.valor ? "medium" : textSize);
  const { colors } = useTheme();
  const navigation = useNavigation();
  const [showPassword, setShowPassword] = useState(false);
  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validateOnChange: false,
    validationSchema: Yup.object({
      username: Yup.string()
        .email("El correo no es válido")
        .required("El correo es obligatorio"),
      password: Yup.string().required("La contraseña es obligatoria"),
    }),
    onSubmit: (formData) => {
      try {
        login(formData.username, formData.password);
      } catch (error) {
        console.log(error);
        Toast.show({
          type: "error",
          position: "top",
          text1: "Error al iniciar sesión",
          text2: "Ha ocurrido un error al iniciar sesión, intentelo mas tarde",
        });
      }
    },
  });
  const showHidePass = () => {
    setShowPassword(!showPassword);
  };
  return (
    <Card style={styles.viewContent}>
      <Image
        source={require("../../../assets/iconDulce.png")}
        style={styles.logo}
      />

      <TextInput
        mode="outlined"
        label="Correo electrónico"
        containerStyle={styles.input}
        style={{ fontSize: textSizes.Text }}
        right={
          <TextInput.Icon
            icon={() => (
              <Icon
                type="material-community"
                name="at"
                color={colors.primary}
                iconStyle={styles.icon}
              />
            )}
          />
        }
        onChangeText={(text) => formik.setFieldValue("username", text)}
        error={formik.errors.username ? true : false}
      />
      <TextInput
        mode="outlined"
        label="Contraseña"
        containerStyle={styles.input}
        style={{ fontSize: textSizes.Text }}
        secureTextEntry={showPassword ? false : true}
        right={
          <TextInput.Icon
            icon={() => (
              <Icon
                type="material-community"
                name={showPassword ? "eye-off-outline" : "eye-outline"}
                color={colors.primary}
                iconStyle={styles.icon}
                onPress={showHidePass}
              />
            )}
          />
        }
        onChangeText={(text) => formik.setFieldValue("password", text)}
        error={formik.errors.password ? true : false}
      />
      <Button
        text
        icon={
          <Icon
            type="material-community"
            name="login"
            color={colors.surface}
            style={styles.icon}
          />
        }
        titleStyle={{ color: colors.surface , fontSize: textSizes.Subtitle}}
        title={"Iniciar Sesión"}
        containerStyle={{
          ...styles.btnContainer,
          backgroundColor: colors.primary,
        }}
        buttonStyle={{ backgroundColor: colors.primary }}
        onPress={formik.handleSubmit}
      />
      <Text
        style={{ ...styles.registerLink, color: colors.primary , fontSize: textSizes.Subtitle}}
        onPress={() => {
          navigation.navigate("recoverS");
        }}
      >
        ¿Olvidaste tu contraseña?
      </Text>
    </Card>
  );
}

const styles = StyleSheet.create({
  viewContent: {
    borderRadius: 20,
    padding: 10,
    margin: 10,
  },
  input: {
    width: "100%",
    marginTop: 15,
    borderRadius: 10,
  },
  icon: {
    marginRight: 10,
  },
  btnContainer: {
    marginTop: 15,
    width: "95%",
    alignSelf: "center",
    borderRadius: 10,
  },

  divider: {
    margin: 40,
  },
  title: {
    marginTop: 20,
    textAlign: "center",
    fontWeight: "bold",
  },
  logo: {
    resizeMode: "contain",
    width: "100%",
    height: 100,
    alignSelf: "center",
    marginVertical: 20,
  },
  registerLink: {
    //bold
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 10,
  },
});
