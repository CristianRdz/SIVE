import React, { useContext } from "react";
import { StyleSheet, Text } from "react-native";
import { useFormik } from "formik";
import * as Yup from "yup";
import { AuthContext } from "../../../services/auth/context/AuthContext";
import { TextInput, useTheme } from "react-native-paper";
import { Button, Icon } from "react-native-elements";
import { getTextSize } from "../../../utils/textSizes";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { saveCategory } from "../../../services/categories/catgoriesService";
import Toast from "react-native-toast-message";

export default function FormCategory(props) {
  const { colors } = useTheme();
  const { textSize } = useContext(AuthContext);
  const textSizes = getTextSize(textSize.valor ? "medium" : textSize);
  const { close, fetchDataOut } = props;

  const formik = useFormik({
    initialValues: {
      name: "",
      description: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("El nombre es obligatorio"),
      description: Yup.string().required("La descripción es obligatoria"),
    }),
    validateOnChange: false,
    onSubmit: async (formData) => {
      try {
        const category = {
          name: formData.name,
          description: formData.description,
        };

        console.log(category);
        const response = await saveCategory(category);

        if (response) {
          fetchDataOut();
          close();
          Toast.show({
            type: "success",
            text1: "Categoría creada",
            text2: "La categoría se ha creado correctamente",
          });
        } else {
          Toast.show({
            type: "error",
            text1: "Error",
            text2: "Ha ocurrido un error al crear la categoría",
          });
        }
      } catch (error) {
        close();
        console.error(error);

        Toast.show({
          type: "error",
          text1: "Error",
          text2: "Ha ocurrido un error al crear la categoría",
        });
      }
    },
  });

  return (
    <KeyboardAwareScrollView style={styles.viewContent}>
      <Text
        style={{
          fontSize: textSizes.Text,
          fontWeight: "bold",
          color: colors.primary,
          alignSelf: "center",
        }}
      >
        Nueva categoría
      </Text>
      <TextInput
        mode="outlined"
        label="Nombre"
        style={{ fontSize: textSizes.Text }}
        containerStyle={styles.input}
        onChangeText={(text) => formik.setFieldValue("name", text)}
        value={formik.values.name}
        error={formik.errors.name}
      />
      <Text style={{ fontSize: textSizes.Text, color: colors.error }}>
        {formik.errors.name}
      </Text>
      <TextInput
        mode="outlined"
        label="Descripción"
        style={{ fontSize: textSizes.Text }}
        containerStyle={styles.input}
        onChangeText={(text) => formik.setFieldValue("description", text)}
        value={formik.values.description}
        error={formik.errors.description}
      />
      <Text style={{ fontSize: textSizes.Text, color: colors.error }}>
        {formik.errors.description}
      </Text>
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
