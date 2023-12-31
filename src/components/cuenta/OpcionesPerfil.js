import { StyleSheet, Text, View } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { Icon, ListItem } from "react-native-elements";
import { map } from "lodash";
import Modal from "../common/Modal";
import { useNavigation } from "@react-navigation/native";
import { AuthContext } from "../../services/auth/context/AuthContext";
import Loading from "../common/Loading";
import { getUser } from "../../services/usuarios/usuarioService.js";
import { useTheme, Avatar } from "react-native-paper";
import CambiarContra from "./CambiarContra.js";
import FormUser from "../admin/users/FormUser.js";

export default function OpcionesPerfil(props) {
  const { colors } = useTheme();
  const { setLocalLoading } = props;
  const { userInfo, isLoading, logout } = useContext(AuthContext);
  const [response, setResponse] = useState({});

  async function fetchData() {
    const response = await getUser(userInfo.identKey);
    setResponse(response);
  }

  useEffect(() => {
    fetchData();
  }, []);

  const [showModal, setShowModal] = useState(false);
  const [renderComponent, setRenderComponent] = useState(null);
  const openClose = () => setShowModal((prevState) => !prevState);

  const selectComponent = (word) => {
    switch (word) {
      case "contra":
        setRenderComponent(
          <CambiarContra
            usuario={response}
            close={openClose}
          />
        );
        break;
      case "perfil":
        setRenderComponent(
          <FormUser close={openClose} fetchDataOut={fetchData} isFromProfile={true} usuario={response} />
        );
        break;
      default:
        setRenderComponent(<Text>default</Text>);
        break;
    }
    openClose();
  };

  const optionsMenu = getOptionsMenu(selectComponent);
  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <Loading isVisible={isLoading} text="Cargando..." />
      <Avatar.Text size={100} label={response.name ? response.name[0] : "" } style={{ alignSelf: "center", marginTop: 20 }} />
      {response.name ? (
        <Text style={{ ...styles.mensaje, color: colors.primary }}>
          {response.name} {response.lastname} {response.surname}
        </Text>
      ) : (
        <Text style={{ ...styles.mensaje, color: colors.primary }}>
          Bienvenido
        </Text>
      )}
      {map(optionsMenu, (menu, index) => (
        <ListItem
          key={index}
          onPress={menu.onPress}
          ViewComponent={menu.ViewComponent}
          containerStyle={{ backgroundColor: colors.background }}
        >
          <Icon
            type={menu.iconType}
            name={menu.iconNameLeft}
            color={menu.iconColorLeft}
          />
          <ListItem.Content selectionColor={colors.primary}>
            <ListItem.Title
              style={{ fontWeight: "bold", color: colors.primary }}
            >
              {menu.title}
            </ListItem.Title>
          </ListItem.Content>
          <Icon
            type={menu.iconType}
            name={menu.iconNameRight}
            color={menu.iconColorRight}
          />
        </ListItem>
      ))}
      <Modal isVisible={showModal} close={openClose}>
        {renderComponent}
      </Modal>
    </View>
  );
}

function getOptionsMenu(selectComponent) {
  const navigation = useNavigation();
  const { userInfo, isLoading, logout } = useContext(AuthContext);
  const { colors } = useTheme();
  // segun el rol del user info se muestran las opciones
  if (userInfo.token && userInfo.role.name === "admin") {
    return [
      {
        title: "Editar perfil",
        iconType: "material-community",
        iconNameLeft: "account-circle",
        iconColorLeft: colors.primary,
        iconColorRight: colors.primary,
        iconNameRight: "chevron-right",
        onPress: () => selectComponent("perfil"),
      },
      {
        title: "Cambiar contraseña",
        iconType: "material-community",
        iconNameLeft: "key",
        iconColorLeft: colors.primary,
        iconColorRight: colors.primary,
        iconNameRight: "chevron-right",
        onPress: () => selectComponent("contra"),
      }
    ];
  } else if (userInfo.token && userInfo.role.name === "cliente") {
    return [
      {
        title: "Editar perfil",
        iconType: "material-community",
        iconNameLeft: "account-circle",
        iconColorLeft: colors.primary,
        iconColorRight: colors.primary,
        iconNameRight: "chevron-right",
        onPress: () => selectComponent("perfil"),
      },
      {
        title: "Cambiar contraseña",
        iconType: "material-community",
        iconNameLeft: "key",
        iconColorLeft: colors.primary,
        iconColorRight: colors.primary,
        iconNameRight: "chevron-right",
        onPress: () => selectComponent("contra"),
      },
    ];
  }
}

const styles = StyleSheet.create({
  mensaje: {
    textAlign: "center",
    fontSize: 20,
    fontWeight: "bold",
    marginVertical: 20,
  },
});
