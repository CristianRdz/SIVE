import { StyleSheet, Text, View } from "react-native";
import React, { useContext, useState } from "react";
import { Button, Card, Icon, Input } from "react-native-elements";
import { useFormik } from "formik";
import * as Yup from "yup";
import Toast from "react-native-toast-message";
import Loading from "../common/Loading";
import { AuthContext } from "../../services/auth/context/AuthContext";
import { useNavigation } from "@react-navigation/native";
import { Image } from "react-native-elements/dist/image/Image";
import { roles } from "../../data/roles";
import { register } from "../../services/auth/usuarioService";
import { Colors } from "../../utils/colors";

export default function RegistroForm() {
  const navigation = useNavigation();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const formik = useFormik({
    initialValues: {
      nombre: "",
      correo: "",
      telefono: "",
      contrasena: "",
      confirmarContrasena: "",
    },
    validateOnChange: false,
    validationSchema: Yup.object({
      nombre: Yup.string().required("El nombre es obligatorio"),
      correo: Yup.string()
        .email("El correo no es válido")
        .required("El correo es obligatorio"),
      // son solo 10 digitos
      telefono: Yup.string()
        .required("El teléfono es obligatorio")
        .min(10, "El teléfono debe tener 10 dígitos")
        .max(10, "El teléfono debe tener 10 dígitos"),
      // validamos que ambas contraseñas sean iguales de minimo 6 caracteres
      contrasena: Yup.string()
        .required("La contraseña es obligatoria")
        .min(6, "La contraseña debe tener al menos 6 caracteres")
        .oneOf(
          [Yup.ref("confirmarContrasena")],
          "Las contraseñas no coinciden"
        ),
      confirmarContrasena: Yup.string()
        .required("La contraseña es obligatoria")
        .min(6, "La contraseña debe tener al menos 6 caracteres")
        .oneOf([Yup.ref("contrasena")], "Las contraseñas no coinciden"),
    }),
    onSubmit: async (formData) => {
      try {
        setLoading(true);
        // Tenemos que contruir un json asi
        //   {
        //     "nombre": "Cristian Rodriguez Rodriguez",
        //     "correo": "redalphasiete1@gmail.com",
        //     "contrasena": "123456",
        //     "telefono": "7777909013",
        //     "rol": {
        //         "id_rol": 2,
        //         "nombre_rol": "cliente"
        //     }
        // }
        const rol = roles[1];
        const usuario = {
          nombre: formData.nombre,
          correo: formData.correo,
          telefono: formData.telefono,
          contrasena: formData.contrasena,
          rol: rol,
        };
        const registrado = await register(usuario);
        if (registrado) {
          navigation.goBack();
          Toast.show({
            type: "success",
            position: "top",
            text1: "Registro Exitoso",
            text2: "Ahora puedes iniciar sesión",
          });
          setLoading(false);
        } else {
          navigation.goBack();
          Toast.show({
            type: "error",
            position: "top",
            text1: "Error al Registrar",
            text2: "Ocurrió un error al registrar el usuario",
          });
          setLoading(false);
        }
      } catch (error) {
        console.log(error);
        Toast.show({
          type: "error",
          position: "top",
          text1: "Error al Registrar",
          text2: "Ocurrió un error al registrar el usuario",
        });
        setLoading(false);
      }
    },
  });
  const showHidePass = () => {
    setShowPassword(!showPassword);
  };
  const showHideConfirmPass = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };
  return (
    <Card containerStyle={styles.viewContent}>
      <Card.Title style={styles.title}>Ingrese sus datos</Card.Title>
      <Input
        placeholder="Nombre completo"
        containerStyle={styles.input}
        rightIcon={
          <Icon type="font-awesome-5" name="user" iconStyle={styles.icon} />
        }
        onChangeText={(text) => formik.setFieldValue("nombre", text)}
        errorMessage={formik.errors.nombre}
      />
      <Input
        placeholder="Correo electrónico"
        containerStyle={styles.input}
        rightIcon={
          <Icon type="font-awesome-5" name="envelope" iconStyle={styles.icon} />
        }
        onChangeText={(text) => formik.setFieldValue("correo", text)}
        errorMessage={formik.errors.correo}
      />
      <Input
        placeholder="Teléfono"
        containerStyle={styles.input}
        rightIcon={
          <Icon type="font-awesome-5" name="phone" iconStyle={styles.icon} />
        }
        onChangeText={(text) => formik.setFieldValue("telefono", text)}
        errorMessage={formik.errors.telefono}
      />
      <Input
        placeholder="Contraseña"
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
        onChangeText={(text) => formik.setFieldValue("contrasena", text)}
        errorMessage={formik.errors.contrasena}
      />
      <Input
        placeholder="Confirmar contraseña"
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
        onChangeText={(text) =>
          formik.setFieldValue("confirmarContrasena", text)
        }
        errorMessage={formik.errors.confirmarContrasena}
      />
      <Button
        icon={
          <Icon
            type="font-awesome-5"
            name="user-plus"
            color="#fff"
            style={styles.icon}
          />
        }
        title={"Registrarse"}
        containerStyle={styles.btnContainer}
        buttonStyle={styles.btn}
        onPress={formik.handleSubmit}
        loading={formik.isSubmitting}
      />

      <Loading visible={loading} text="Registrando usuario..." />
    </Card>
  );
}

const styles = StyleSheet.create({
  viewContent: {
    borderRadius: 20,
    padding: 10,
    margin: 10,
    marginBottom: 20,
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

  divider: {
    backgroundColor: "#179275",
    margin: 40,
  },
  title: {
    marginTop: 20,
    color: "#000",
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
    color: "#000",
    fontSize: 16,
  },
});
