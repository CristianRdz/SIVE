import { StyleSheet, Text, View } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import Toast from "react-native-toast-message";
import Loading from "../common/Loading";
import { AuthContext } from "../../services/auth/context/AuthContext";
import { useNavigation } from "@react-navigation/native";
import { Colors } from "../../utils/colors";
import { Card, TextInput, useTheme } from "react-native-paper";
import { Button, Icon } from "react-native-elements";
import { Dropdown } from "react-native-element-dropdown";
import { temas , tamanios } from "../../data/themes";
import DropdownComponent from "../common/DropdownComponent";
import { roles } from "../../data/roles";

export default function LoginForm() {
  const {setTheme, theme} = useContext(AuthContext);
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
      <DropdownComponent data = {temas} nombre = "nombre" id = "id" setValueOut = {setTheme} />
      <TextInput
        mode="outlined"
        label="Correo electrónico"
        containerStyle={styles.input}
        rightIcon={
          <Icon type="material-community" name="at" iconStyle={styles.icon} />
        }
        onChangeText={(text) => formik.setFieldValue("username", text)}
        errorMessage={formik.errors.username}
      />
      <TextInput
        mode="outlined"
        label="Contraseña"
        containerStyle={styles.input}
        secureTextEntry={showPassword ? false : true}
        rightIcon={
          <Icon
            type="font-awesome-5"
            name={showPassword ? "eye-slash" : "eye"}
            iconStyle={styles.icon}
            onPress={showHidePass}
          />
        }
        onChangeText={(text) => formik.setFieldValue("password", text)}
        errorMessage={formik.errors.password}
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
        titleStyle={{ color: colors.surface }}
        title={"Iniciar Sesión"}
        containerStyle={{ ...styles.btnContainer, backgroundColor: colors.primary }}
        buttonStyle={{ backgroundColor: colors.primary }}
        onPress={formik.handleSubmit}
      />
      <Text
        style={{ ...styles.registerLink, color: colors.primary }}
        onPress={() => {
          navigation.navigate("recoverS");
        }}
      >
        ¿Olvidaste tu contraseña?
      </Text>
      <Text
        style={{ ...styles.registerLink, color: colors.primary }}
        onPress={() => {
          navigation.navigate("registerS");
        }}
      >
        ¿No tienes cuenta? Registrate
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
    fontSize: 20,
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
    fontSize: 16,
  },
});
