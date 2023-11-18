import { StyleSheet, Text, View } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import Toast from "react-native-toast-message";
import Loading from "../common/Loading";
import { Card, TextInput, useTheme } from "react-native-paper";
import { Button, Icon, Image } from "react-native-elements";
import { recoverPassword } from "../../services/auth/usuarioService";

export default function RecuperarForm(props) {
  const { colors } = useTheme();
  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validateOnChange: false,
    validationSchema: Yup.object({
      email: Yup.string()
        .email("El correo electrónico no es válido")
        .required("El correo electrónico es requerido"),
    }),
    onSubmit: async (values) => {
      try {
        const response = await recoverPassword(values.email);
        if (response) {
          Toast.show({
            type: "success",
            position: "top",
            text1: "Correo electrónico enviado",
            text2: "Se ha enviado un correo electrónico a su cuenta.",
          });
        } else {
          Toast.show({
            type: "error",
            position: "top",
            text1: "Error al enviar el correo electrónico",
            text2:
              "Ha ocurrido un error al enviar el correo electrónico. Inténtelo de nuevo más tarde.",
          });
        }
      } catch (error) {
        Toast.show({
          type: "error",
          position: "top",
          text1: "Error al enviar el correo electrónico",
          text2:
            "Ha ocurrido un error al enviar el correo electrónico. Inténtelo de nuevo más tarde.",
        });
      }
    },
  });

  return (
    <Card style={styles.viewContent}>
      <Image
        source={"http://129.146.111.32:3000/65518237004b5d61506f7057"}
        style={styles.logo}
      />
      
      <TextInput
        mode="outlined"
        label="Correo electrónico"
        containerStyle={styles.input}
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
        onChangeText={(text) => formik.setFieldValue("email", text)}
        error={formik.errors.email ? true : false}
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
        titleStyle={{ color: colors.surface }}
        title={"Recuperar contraseña"}
        containerStyle={{ ...styles.btnContainer, backgroundColor: colors.primary }}
        buttonStyle={{ backgroundColor: colors.primary }}
        onPress={formik.handleSubmit}
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
