import { StyleSheet, Text, View } from "react-native";
import React, { useContext, useState } from "react";
import { Button, Icon, Input } from "react-native-elements";
import { useFormik } from "formik";
import * as Yup from "yup";
import Toast from "react-native-toast-message";
import { AuthContext } from "../../services/auth/context/AuthContext";
import { changePassword } from "../../services/usuarios/usuarioServiceFC";
import { Colors } from "../../utils/colors";

export default function CambiarContra(props) {
  const { logout } = useContext(AuthContext);
  let { usuario } = props;
  const { close, fetchDataOut } = props;
  const [showPassword, setShowPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const showHidePass = () => {
    setShowPassword(!showPassword);
  };
  const showHideNewPass = () => {
    setShowNewPassword(!showNewPassword);
  };
  const showHideConfirmPass = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };
  const formik = useFormik({
    initialValues: {
      newPassword: "",
      confirmPassword: "",
    },
    validationSchema: Yup.object({
      newPassword: Yup.string()
        .required("La contraseña es obligatoria")
        .min(6, "La contraseña debe tener al menos 6 caracteres")
        .oneOf(
          [Yup.ref("confirmPassword")],
          "Las contraseñas no coinciden"
        ),
      confirmPassword: Yup.string()
        .required("La contraseña es obligatoria")
        .min(6, "La contraseña debe tener al menos 6 caracteres")
        .oneOf([Yup.ref("newPassword")], "Las contraseñas no coinciden"),
    }),
    validateOnChange: false,
    onSubmit: async (formValue) => {
      try {
        usuario.contrasena = formValue.newPassword; // le asignamos la nueva contraseña
        const response = await changePassword(usuario);
        if (response) {
          close();
          logout();
          Toast.show({
            type: "success",
            text1: "Contraseña actualizada",
            text2: "Tu contraseña ha sido actualizada correctamente",
          });
        } else {
          console.log(response);
          close();
          Toast.show({
            type: "error",
            text1: "Error al actualizar contraseña",
            text2:
              "Ha ocurrido un error al actualizar tu contraseña, intentelo mas tarde",
          });
        }
      } catch (error) {
        close();
        console.log(error);
        Toast.show({
          type: "error",
          text1: "Error al actualizar contraseña",
          text2: "La contraseña antigua no es correcta",
        });
      }
    },
  });

  return (
    <>
      <View style={styles.header}>
        <Text style={styles.headerText}>Cambiar contraseña</Text>
      </View>
      <View style={styles.view}>
        <Input
          
          placeholder="Nueva contraseña"
          containerStyle={styles.input}
          secureTextEntry={showNewPassword ? false : true}
          rightIcon={
            <Icon
              type="font-awesome-5"
              name={showNewPassword ? "eye-slash" : "eye"}
              iconStyle={styles.icon}
              onPress={showHideNewPass}
            />
          }
          onChangeText={(text) => formik.setFieldValue("newPassword", text)}
          errorMessage={formik.errors.newPassword}
        />
        <Input
          
          placeholder="Confirmar nueva contraseña"
          containerStyle={styles.input}
          secureTextEntry={showConfirmPassword ? false : true}
          rightIcon={
            <Icon
              type="font-awesome-5"
              name={showConfirmPassword ? "eye-slash" : "eye"}
              iconStyle={styles.icon}
              onPress={showHideConfirmPass}
            />
          }
          onChangeText={(text) => formik.setFieldValue("confirmPassword", text)}
          errorMessage={formik.errors.confirmPassword}
        />
        <Button
          title="Cambiar contraseña"
          icon={
            <Icon
              name="save"
              type="font-awesome-5"
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
        <Button
          title="Cancelar"
          icon={
            <Icon
              name="times"
              type="font-awesome-5"
              size={20}
              color="white"
              style={{ marginRight: 10 }}
            />
          }
          containerStyle={styles.btnContainer}
          buttonStyle={styles.btnCancelar}
          onPress={close}
        />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  input: {
    marginBottom: 10,
  },
  header: {
    backgroundColor: "#000",
    width: "100%",
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: "0%",
  },
  headerText: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
  },
  btnContainer: {
    marginTop: 15,
    width: "95%",
    alignSelf: "center",
    borderRadius: 10,
  },
  btn: {
    backgroundColor: Colors.primary,
    // se centra el boton
  },
  btnCancelar: {
    // Color danger de bootstrap
    backgroundColor: Colors.danger  
  },
  view: {
    alignItems: "center",
    paddingTop: 10,
    paddingBottom: 10,
  },
  icon: {
    color: "#c1c1c1",
    marginRight: 10,
  },
});
