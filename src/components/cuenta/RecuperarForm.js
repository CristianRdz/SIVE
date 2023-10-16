import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Button, Card, Icon, Input } from "react-native-elements";
import { useFormik } from "formik";
import * as Yup from "yup";
import Toast from "react-native-toast-message";
import { recoverPassword } from "../../services/auth/usuarioService";
import { Colors } from "../../utils/colors";

export default function RecuperarForm(props) {
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
    <Card containerStyle={styles.viewContent}>
      <Card.Title style={styles.title}>Recuperar Contraseña</Card.Title>
      <Input
        placeholder="Correo electrónico"
        containerStyle={styles.input}
        onChangeText={formik.handleChange("email")}
        value={formik.values.email}
        rightIcon={
          <Icon type="font-awesome-5" name="envelope" iconStyle={styles.icon} />
        }
        errorMessage={formik.errors.email}
      />
      <Button
        title="Recuperar Contraseña"
        icon={
          <Icon
            type="font-awesome-5"
            name="key"
            size={20}
            color="white"
            style={{ marginRight: 10 }}
          />
        }
        containerStyle={styles.btnContainer}
        buttonStyle={styles.btn}
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
    backgroundColor: "#fff",
    borderRadius: 10,
  },
  icon: {
    color: "#c1c1c1",
    marginRight: 10,
  },
  btnContainer: {
    marginTop: 15,
    width: "95%",
    alignSelf: "center",
    borderRadius: 10,
  },
  btn: {
    backgroundColor: Colors.primary,
  },
  title: {
    color: "#fff",
    textAlign: "center",
    fontSize: 20,
    fontWeight: "bold",
  },
  icon: {
    color: "#c1c1c1",
  },
});
