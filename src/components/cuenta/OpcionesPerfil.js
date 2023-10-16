import { StyleSheet, Text, View } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { Icon, ListItem } from "react-native-elements";
import { map } from "lodash";
import Modal from "../common/Modal";
import BotonesSocial from "../common/BotonesSocial";
import CambiarContra from "./CambiarContra";
import { getUserById } from "../../services/auth/usuarioService";

import { useNavigation } from "@react-navigation/native";
import { AuthContext } from "../../services/auth/context/AuthContext";
import Loading from "../common/Loading";
import EditarPerfil from "./EditarPerfil";
import { getUsuario } from "../../services/usuarios/usuarioServiceFC";
import DireccionForm from "../client/direccion/DireccionForm";
import { getDireccionUsuario } from "../../services/client/direccion/DireccionService";

export default function OpcionesPerfil(props) {
  const navigation = useNavigation();
  const { fetchDataOut, setLocalLoading } = props;
  const { userInfo, isLoading, logout } = useContext(AuthContext);
  const [response, setResponse] = useState({});
  const [direccion, setDireccion] = useState(null);
  async function fetchData() {
    // dependeremos del rol para consultar a un servicio u otro
    if (userInfo.user.usuario.rol.id_rol === 1) {
      const response = await getUsuario(userInfo.user.usuario.id_usuario);
      setResponse(response);
    } else {
      const response = await getUserById(userInfo.user.usuario.id_usuario);
      setResponse(response);
      let data = await getDireccionUsuario(userInfo.user.usuario.id_usuario);
      // si no es null el data de la response del servicio
      if (data) {
        setDireccion(data);
      }
    }
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
            close={openClose}
            usuario={response}
            fetchDataOut={fetchData}
            setLocalLoading={setLocalLoading}
          />
        );
        break;
      case "perfil":
        setRenderComponent(
          <EditarPerfil
            close={openClose}
            usuario={response}
            fetchDataOut={fetchData}
            setLocalLoading={setLocalLoading}
          />
        );
        break;
      case "direccion":
        setRenderComponent(
          <DireccionForm
            close={openClose}
            usuario={response}
            direccion={direccion}
            fetchDataOut={fetchData}
            setLocalLoading={setLocalLoading}
          />
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
    <View style={styles.container}>
      <Loading isVisible={isLoading} text="Cargando..." />
      {response.nombre ? (
        <Text style={styles.mensaje}>Bienvenido {response.nombre}</Text>
      ) : (
        <Text style={styles.mensaje}>Bienvenido</Text>
      )}
      {map(optionsMenu, (menu, index) => (
        <ListItem key={index} onPress={menu.onPress}>
          <Icon
            type={menu.iconType}
            name={menu.iconNameLeft}
            color={menu.iconColorLeft}
          />
          <ListItem.Content>
            <ListItem.Title>{menu.title}</ListItem.Title>
          </ListItem.Content>
          <Icon
            type={menu.iconType}
            name={menu.iconNameRight}
            color={menu.iconColorRight}
          />
        </ListItem>
      ))}
      <BotonesSocial />
      <Modal isVisible={showModal} close={openClose}>
        {renderComponent}
      </Modal>
    </View>
  );
}

function getOptionsMenu(selectComponent) {
  const navigation = useNavigation();
  const { userInfo, isLoading, logout } = useContext(AuthContext);
  // segun el rol del user info se muestran las opciones
  if (userInfo.token && userInfo.user.usuario.rol.id_rol === 1) {
    return [
      {
        title: "Editar perfil",
        iconType: "font-awesome-5",
        iconNameLeft: "user-edit",
        iconColorLeft: "#000000",
        iconColorRight: "#000000",
        iconNameRight: "chevron-right",
        onPress: () => selectComponent("perfil"),
      },
      {
        title: "Cambiar contraseña",
        iconType: "font-awesome-5",
        iconNameLeft: "key",
        iconColorLeft: "#000000",
        iconColorRight: "#000000",
        iconNameRight: "chevron-right",
        onPress: () => selectComponent("contra"),
      },

      {
        title: "Cerrar sesión",
        iconType: "font-awesome-5",
        iconNameLeft: "sign-out-alt",
        iconColorLeft: "#000000",
        iconColorRight: "#000000",
        iconNameRight: "chevron-right",
        onPress: () => {
          logout();
        },
      },
    ];
  } else if (userInfo.token && userInfo.user.usuario.rol.id_rol === 2) {
    return [
      {
        title: "Editar perfil",
        iconType: "font-awesome-5",
        iconNameLeft: "user-edit",
        iconColorLeft: "#000000",
        iconColorRight: "#000000",
        iconNameRight: "chevron-right",
        onPress: () => selectComponent("perfil"),
      },
      {
        title: "Cambiar contraseña",
        iconType: "font-awesome-5",
        iconNameLeft: "key",
        iconColorLeft: "#000000",
        iconColorRight: "#000000",
        iconNameRight: "chevron-right",
        onPress: () => selectComponent("contra"),
      },
      {
        title: "Pedidos",
        iconType: "font-awesome-5",
        iconNameLeft: "clipboard-list",
        iconColorLeft: "#000000",
        iconColorRight: "#000000",
        iconNameRight: "chevron-right",
        onPress: () => navigation.navigate("pedidosClienteS"),
      },
      {
        title: "Dirección de envío",
        iconType: "font-awesome-5",
        iconNameLeft: "map-marker-alt",
        iconColorLeft: "#000000",
        iconColorRight: "#000000",
        iconNameRight: "chevron-right",
        onPress: () => selectComponent("direccion"),
      },
      {
        title: "Cerrar sesión",
        iconType: "font-awesome-5",
        iconNameLeft: "sign-out-alt",
        iconColorLeft: "#000000",
        iconColorRight: "#000000",
        iconNameRight: "chevron-right",
        onPress: () => {
          logout();
        },
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
    backgroundColor: "#fff",
  },
  container: {
    backgroundColor: "#fff",
  },
});
