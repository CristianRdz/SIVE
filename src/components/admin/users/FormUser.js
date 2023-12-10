import { Image, Keyboard, ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import Toast from "react-native-toast-message";
import { AuthContext } from "../../../services/auth/context/AuthContext";
import { Card, TextInput, useTheme } from "react-native-paper";
import { Button, Icon } from "react-native-elements";
import { getTextSize } from "../../../utils/textSizes";
import { getRoles } from "../../../services/roles/rolesService";
import DropdownComponent from "../../common/DropdownComponent";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { saveUser, updateUser } from "../../../services/usuarios/usuarioService";

export default function FormUser(props) {
  const { textSize } = useContext(AuthContext);
  
  const textSizes = getTextSize(textSize.valor ? "medium" : textSize);
  const { colors } = useTheme();
  let { usuario } = props;
  const { isFromProfile } = props;
  const { close, fetchDataOut } = props;
  const [roles, setRoles] = useState([]);
  const [role, setRole] = useState(usuario ? usuario.role : "");
  const [showPassword, setShowPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const showHidePass = () => {
    setShowPassword(!showPassword);
  };
  const showHideNewPass = () => {
    setShowNewPassword(!showNewPassword);
  };
  const showHideConfirmPass = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  async function fetchRoles() {
    setLoading(true);
    const roles = await getRoles();
    setRoles(roles);
    setLoading(false);
  }

  useEffect(() => {
    fetchRoles();
  }, []);

  useEffect(() => {
    formik.setFieldValue("role", role);
  }, [role]);

  const formik = useFormik({
    // {
    //     "email": "string",
    //     "lastname": "string",
    //     "name": "string",
    //     "password": "string",
    //     "phoneNumber": "string",
    //     "role": {
    //       "name": "string",
    //       "status": true,
    //       "uid": "string"
    //     },
    //     "surname": "string",
    //   }
    initialValues: usuario
      ? {
          name: usuario.name ? usuario.name : "",
          lastname: usuario.lastname ? usuario.lastname : "",
          surname: usuario.surname ? usuario.surname : "",
          email: usuario.email ? usuario.email : "",
          phoneNumber: usuario.phoneNumber ? usuario.phoneNumber : "",
          role: usuario.role ? usuario.role : "",
        }
      : {
          name: "",
          lastname: "",
          surname: "",
          email: "",
          phoneNumber: "",
          role: "",
          password: "",
          confirmPassword: "",
        },

    validationSchema: usuario
      ? Yup.object({
          name: Yup.string().required("El nombre es obligatorio"),
          lastname: Yup.string().required("El apellido paterno es obligatorio"),
          surname: Yup.string().required("El apellido materno es obligatorio"),
          email: Yup.string()
            .email("El email no es valido")
            .required("El email es obligatorio"),
          phoneNumber: Yup.string().required("El telefono es obligatorio"),
          role: Yup.object().required("El rol es obligatorio"),
        })
      : Yup.object({
          name: Yup.string().required("El nombre es obligatorio"),
          lastname: Yup.string().required("El apellido paterno es obligatorio"),
          surname: Yup.string().required("El apellido materno es obligatorio"),
          email: Yup.string()
            .email("El email no es valido")
            .required("El email es obligatorio"),
          phoneNumber: Yup.string().required("El telefono es obligatorio"),
          role: Yup.object().required("El rol es obligatorio"),
          password: Yup.string()
            .required("La contraseña es obligatoria")
            .min(6, "La contraseña debe tener al menos 6 caracteres")
            .oneOf(
              [Yup.ref("confirmPassword")],
              "Las contraseñas no coinciden"
            ),
          confirmPassword: Yup.string()
            .required("La contraseña es obligatoria")
            .min(6, "La contraseña debe tener al menos 6 caracteres")
            .oneOf([Yup.ref("password")], "Las contraseñas no coinciden"),
        }),
    validateOnChange: false,
    onSubmit: async (formValue) => {
      try {
        if (usuario) {
          usuario.name = formValue.name;
          usuario.lastname = formValue.lastname;
          usuario.surname = formValue.surname;
          usuario.email = formValue.email;
          usuario.phoneNumber = formValue.phoneNumber;
          usuario.role = formValue.role;
          await updateUser(usuario);
          fetchDataOut();
          close();
          Toast.show({
            type: "success",
            text1: "Usuario actualizado",
            text2: "El usuario se actualizo correctamente",
          });

        } else {
          const usuario = {
            name: formValue.name,
            lastname: formValue.lastname,
            surname: formValue.surname,
            email: formValue.email,
            phoneNumber: formValue.phoneNumber,
            role: formValue.role,
            password: formValue.password,
          };
          console.log(usuario);
          const response = await saveUser(usuario);
          if (response) {
            fetchDataOut();
            close();
            Toast.show({
              type: "success",
              text1: "Usuario creado",
              text2: "El usuario se creo correctamente",
            });
          } else {
            fetchDataOut();
            close();
            Toast.show({
              type: "error",
              text1: "Error al crear usuario",
              text2: "El email ya esta registrado",
            });
          }
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
    <KeyboardAwareScrollView style={styles.viewContent}>
      <Text
        style={{
          fontSize: textSizes.Title,
          fontWeight: "bold",
          color: colors.primary,
          marginBottom: 10,
        }}
      >
        {isFromProfile ? "Editar perfil" : usuario ? "Editar usuario" : "Nuevo usuario"}
      </Text>


      <TextInput
        mode="outlined"
        label="Nombre"
        containerStyle={styles.input}
        style={{ fontSize: textSizes.Text }}
        onChangeText={(text) => formik.setFieldValue("name", text)}
        value={formik.values.name}
        error={formik.errors.name ? true : false}
      />
      <Text style={{ fontSize: textSizes.Text, color: colors.error }}>
        {formik.errors.name}
      </Text>
      <TextInput
        mode="outlined"
        label="Apellido paterno"
        containerStyle={styles.input}
        style={{ fontSize: textSizes.Text }}
        onChangeText={(text) => formik.setFieldValue("lastname", text)}
        value={formik.values.lastname}
        error={formik.errors.lastname ? true : false}
      />
      <Text style={{ fontSize: textSizes.Text, color: colors.error }}>
        {formik.errors.lastname}
      </Text>
      <TextInput

        mode="outlined"
        label="Apellido materno"
        containerStyle={styles.input}
        style={{ fontSize: textSizes.Text }}
        onChangeText={(text) => formik.setFieldValue("surname", text)}
        value={formik.values.surname}
        error={formik.errors.surname ? true : false}
      />
      <Text style={{ fontSize: textSizes.Text, color: colors.error }}>
        {formik.errors.surname}
      </Text>
      <TextInput
        mode="outlined"
        label="Email"
        containerStyle={styles.input}
        style={{ fontSize: textSizes.Text }}
        onChangeText={(text) => formik.setFieldValue("email", text)}
        value={formik.values.email}
        error={formik.errors.email ? true : false}
      />
      <Text style={{ fontSize: textSizes.Text, color: colors.error }}>
        {formik.errors.email}
      </Text>
      <TextInput
        mode="outlined"
        label="Telefono"
        containerStyle={styles.input}
        style={{ fontSize: textSizes.Text }}
        onChangeText={(text) => formik.setFieldValue("phoneNumber", text)}
        value={formik.values.phoneNumber}
        error={formik.errors.phoneNumber ? true : false}
      />
      <Text style={{ fontSize: textSizes.Text, color: colors.error }}>
        {formik.errors.phoneNumber}
      </Text>
      {isFromProfile ? null : (
        <>
        <DropdownComponent
        data={roles}
        id={"uid"}
        nombre={"name"}
        placeholder={"Selecciona una categoria"}
        setValueOut={setRole}
        selectedValue={usuario ? usuario.role : role}
      />
      <Text style={{ fontSize: textSizes.Text, color: colors.error }}>
        {formik.errors.role}
      </Text>
      </>
      )}

      {!usuario ? (
        <>
          <TextInput
            mode="outlined"
            label="Nueva contraseña"
            containerStyle={styles.input}
            secureTextEntry={showNewPassword ? false : true}
            style={{ fontSize: textSizes.Text }}
            right={
              <TextInput.Icon
                icon={() => (
                  <Icon
                    type="material-community"
                    name={showNewPassword ? "eye-off-outline" : "eye-outline"}
                    color={colors.primary}
                    iconStyle={styles.icon}
                    onPress={showHideNewPass}
                  />
                )}
              />
            }
            onChangeText={(text) => formik.setFieldValue("password", text)}
            error={formik.errors.password ? true : false}
          />
          <Text style={{ fontSize: textSizes.Text, color: colors.error }}>
            {formik.errors.password}
          </Text>
          <TextInput
            mode="outlined"
            label="Confirmar nueva contraseña"
            containerStyle={styles.input}
            secureTextEntry={showConfirmPassword ? false : true}
            style={{ fontSize: textSizes.Text }}
            right={
              <TextInput.Icon
                icon={() => (
                  <Icon
                    type="material-community"
                    name={
                      showConfirmPassword ? "eye-off-outline" : "eye-outline"
                    }
                    color={colors.primary}
                    iconStyle={styles.icon}
                    onPress={showHideConfirmPass}
                  />
                )}
              />
            }
            onChangeText={(text) =>
              formik.setFieldValue("confirmPassword", text)
            }
            error={formik.errors.confirmPassword ? true : false}
          />
          <Text style={{ fontSize: textSizes.Text, color: colors.error }}>
            {formik.errors.confirmPassword}
          </Text>
        </>
      ) : null}
      <Button
        text
        icon={
          <Icon
            type="material-community"
            name="content-save"
            color={colors.surface}
            style={styles.icon}
          />
        }
        titleStyle={{ color: colors.surface, fontSize: textSizes.Subtitle }}
        title={"Guardar"}
        containerStyle={{
          ...styles.btnContainer,
          backgroundColor: colors.primary,
        }}
        loading={formik.isSubmitting}
        buttonStyle={{ backgroundColor: colors.primary }}
        onPress={formik.handleSubmit}
      />
      <Button
        text
        icon={
          <Icon
            type="material-community"
            name="cancel"
            color={colors.surface}
            style={styles.icon}
          />
        }
        titleStyle={{ color: colors.surface, fontSize: textSizes.Subtitle }}
        title={"Cancelar"}
        containerStyle={{
          ...styles.btnContainer,
          backgroundColor: colors.error,
        }}
        buttonStyle={{ backgroundColor: colors.error }}
        onPress={close}
      />
    </KeyboardAwareScrollView>
  );
}

const styles = StyleSheet.create({
  viewContent: {
    borderRadius: 20,
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
});
