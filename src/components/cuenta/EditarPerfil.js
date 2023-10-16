import { StyleSheet, Text, View } from "react-native";
import React, { useState, useEffect } from "react";
import { Button, Icon, Input } from "react-native-elements";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Toast } from "react-native-toast-message/lib/src/Toast";
import { updateUser } from "../../services/auth/usuarioService";
import { getUsuario, update } from "../../services/usuarios/usuarioServiceFC";
import { Colors } from "../../utils/colors";
export default function EditarPerfil(props) {
  const { close, fetchDataOut } = props;
  let [usuario, setUsuario] = useState(props.usuario);
  async function fetchUsuario() {
    const response = await getUsuario(usuario.id_usuario);
    setUsuario(response);
  }
  useEffect(() => {
    fetchUsuario();
  }, []);
  useEffect(() => {
    formik.setFieldValue("nombre", usuario.nombre);
    formik.setFieldValue("telefono", usuario.telefono);
  }, [usuario]);
  const formik = useFormik({
    initialValues: {
      nombre: usuario.nombre,
      telefono: usuario.telefono,
    },
    validateOnChange: false,
    validationSchema: Yup.object({
      nombre: Yup.string().required("El nombre es obligatorio"),
      telefono: Yup.string()
        .required("El teléfono es obligatorio")
        .matches(/^\d+$/, "El teléfono debe contener sólo números")
        .min(10, "El teléfono debe tener al menos 10 dígitos"),
    }),
    onSubmit: async (formData) => {
      try {
        usuario.nombre = formData.nombre;
        usuario.telefono = formData.telefono;
        const response = await update(usuario);
        if (response.status != 500) {
          Toast.show({
            type: "success",
            position: "top",
            text1: "Perfil actualizado",
            text2: "Tu perfil ha sido actualizado correctamente",
          });
          close();
          fetchDataOut();
        } else {
          Toast.show({
            type: "error",
            position: "top",
            text1: "Error al actualizar perfil",
            text2:
              "Ha ocurrido un error al actualizar tu perfil, intentelo mas tarde",
          });
        }
      } catch (error) {
        Toast.show({
          type: "error",
          position: "top",
          text1: "Error al actualizar perfil",
          text2:
            "Ha ocurrido un error al actualizar tu perfil, intentelo mas tarde",
        });
      }
    },
  });
  return (
    <>
      <View style={styles.header}>
        <Text style={styles.headerText}>Editar perfil</Text>
      </View>
      <View>
        <Input
          placeholder="Nombre"
          value={formik.values.nombre}
          containerStyle={styles.input}
          rightIcon={
            <Icon type="font-awesome-5" name="user" iconStyle={styles.icon} />
          }
          onChangeText={(text) => formik.setFieldValue("nombre", text)}
          errorMessage={formik.errors.nombre}
        />
        <Input
          placeholder="Teléfono"
          value={formik.values.telefono}
          containerStyle={styles.input}
          rightIcon={
            <Icon type="font-awesome-5" name="phone" iconStyle={styles.icon} />
          }
          onChangeText={(text) => formik.setFieldValue("telefono", text)}
          errorMessage={formik.errors.telefono}
          keyboardType="numeric"
          maxLength={10}
        />
        <Button
          title="Guardar cambios"
          icon={
            <Icon
              type="font-awesome-5"
              name="user-edit"
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
    width: "100%",
    marginTop: 15,
    backgroundColor: "#fff",
    borderRadius: 10,
  },
  icon: {
    color: "#c1c1c1",
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
    backgroundColor: Colors.danger,
  },

  divider: {
    backgroundColor: "#179275",
    margin: 40,
  },
  title: {
    color: "#fff",
    textAlign: "center",
    fontSize: 20,
    fontWeight: "bold",
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
});
