import { StyleSheet, Text, View } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import Toast from "react-native-toast-message";
import Loading from "../common/Loading";
import { Card, TextInput, useTheme } from "react-native-paper";
import { Button, Icon, Image } from "react-native-elements";
import { resetPassword } from "../../services/usuarios/usuarioService";
import { AuthContext } from "../../services/auth/context/AuthContext";
import { getTextSize } from "../../utils/textSizes";

export default function RecuperarForm(props) {
    const { colors } = useTheme();
    let { restartPass } = props;
    const { textSize } = useContext(AuthContext);
    const [showPassword, setShowPassword] = useState(false);
    const [showCPassword, setShowCPassword] = useState(false);
    const textSizes = getTextSize(textSize.valor ? "medium" : textSize);
    const formik = useFormik({
      initialValues: {
        password: "",
        confirmPassword: "",
        token: "",
      },
      validateOnChange: false,
      onSubmit: async (values) => {
        try {
          let cosas = {password:values.password, confirmPassword:values.confirmPassword, token:values.token};
          const response = await resetPassword(cosas);
          if (response) {
            Toast.show({
              type: "success",
              position: "top",
              text1: "Contraseña restablecida",
              text2: "Se ha cambiado la contraseña de su cuenta.",
            });
          } else {
            Toast.show({
              type: "error",
              position: "top",
              text1: "Error al restablecer su contraseña",
              text2:
                "Ha ocurrido un error al restablecer su contraseña. Inténtelo de nuevo más tarde.",
            });
          }
        } catch (error) {
          console.log(error)
          Toast.show({
            type: "error",
            position: "top",
            text1: "Error al catch restablecer su contraseña",
            text2:
              "Ha ocurrido un error al restablecer su contraseña. Inténtelo de nuevo más tarde.",
          });
        }
      },
    });
    const showHidePass = () => {
      setShowPassword(!showPassword);
    };
    const showCHidePass = () => {
      setShowCPassword(!showCPassword);
    };
    return (
      <Card style={styles.viewContent}>
        <Image
          source={require("../../../assets/iconDulce.png")}
          style={styles.logo}
        />
        
        <TextInput
        mode="outlined"
        label="Contraseña"
        containerStyle={styles.input}
        autoCapitalize="none"
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
       <TextInput
        mode="outlined"
        label="Confirmar contraseña"
        containerStyle={styles.input}
        autoCapitalize="none"
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
                onPress={showCHidePass}
              />
            )}
          />
        }
        onChangeText={(text) => formik.setFieldValue("confirmPassword", text)}
        error={formik.errors.password ? true : false}
      />
      <TextInput
        mode="outlined"
        label="Token"
        containerStyle={styles.input}
        style={{ fontSize: textSizes.Text }}
        onChangeText={(text) => formik.setFieldValue("token", text)}
        error={formik.errors.name ? true : false}
        value={formik.values.name}
      />
        
        <Button
          text
          icon={
            <Icon
              type="material-community"
              name="lock-reset"
              color={colors.surface}
              style={styles.icon}
            />
          }
          titleStyle={{ color: colors.surface , fontSize: textSizes.Subtitle}}
          title={"Restablecer contraseña"}
          containerStyle={{ ...styles.btnContainer, backgroundColor: colors.primary }}
          buttonStyle={{ backgroundColor: colors.primary }}
          onPress={formik.handleSubmit}
          loading={formik.isSubmitting}
        />
  
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
  