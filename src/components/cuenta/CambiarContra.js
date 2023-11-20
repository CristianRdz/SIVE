import { Image, StyleSheet, Text, View } from "react-native";
import React, { useContext, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import Toast from "react-native-toast-message";
import { AuthContext } from "../../services/auth/context/AuthContext";
import { Card, TextInput, useTheme } from "react-native-paper";
import { Button, Icon } from "react-native-elements";
import { changePasswordUser } from "../../services/usuarios/usuarioService";

export default function CambiarContra(props) {
    const { logout, textSize } = useContext(AuthContext);
    const { colors } = useTheme();
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
                usuario.password = formValue.newPassword; // le asignamos la nueva contraseña
                const response = await changePasswordUser(usuario);
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
        <Card style={styles.viewContent}>
            <TextInput
                mode="outlined"
                label="Nueva contraseña"
                containerStyle={styles.input}
                secureTextEntry={showNewPassword ? false : true}
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
                onChangeText={(text) => formik.setFieldValue("newPassword", text)}
                error={formik.errors.newPassword ? true : false}
            />
            <TextInput
                mode="outlined"
                label="Confirmar nueva contraseña"
                containerStyle={styles.input}
                secureTextEntry={showConfirmPassword ? false : true}
                right={
                    <TextInput.Icon
                        icon={() => (
                            <Icon
                                type="material-community"
                                name={showConfirmPassword ? "eye-off-outline" : "eye-outline"}
                                color={colors.primary}
                                iconStyle={styles.icon}
                                onPress={showHideConfirmPass}
                            />
                        )}
                    />
                }
                onChangeText={(text) => formik.setFieldValue("confirmPassword", text)}
                error={formik.errors.confirmPassword ? true : false}
            />
            <Button
                text
                icon={
                    <Icon
                        type="material-community"
                        name="key"
                        color={colors.surface}
                        style={styles.icon}
                    />
                }
                titleStyle={{ color: colors.surface }}
                title={"Cambiar contraseña"}
                containerStyle={{
                    ...styles.btnContainer,
                    backgroundColor: colors.primary,
                }}
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
                titleStyle={{ color: colors.surface }}
                title={"Cancelar"}
                containerStyle={{
                    ...styles.btnContainer,
                    backgroundColor: colors.error,
                }}
                buttonStyle={{ backgroundColor: colors.error }}
                onPress={close}
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
    }
});