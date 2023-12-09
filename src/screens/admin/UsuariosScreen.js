import { StyleSheet, ScrollView, RefreshControl } from "react-native";
import React, { useState, useEffect } from "react";
import { useTheme } from "react-native-paper";
import { View } from "react-native";
import Searchbar from "../../components/common/Searchbar";
import Goback from "../../components/common/GoBack";
import Title from "../../components/common/Title";
import { set } from "lodash";
import { getUsers } from "../../services/usuarios/usuarioService";
import Users from "../../components/admin/users/Users";
export default function UsuariosScreen() {
  // const [usuarios, setUsuarios] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [usuarios, setUsuarios] = useState([]);
  const { colors } = useTheme();
  const [refreshing, setRefreshing] = useState(false);

  const getUsersFetch = async () => {
    try {
      const data = await getUsers();
      setUsuarios(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getUsersFetch();
  }, []);

  const onRefresh = () => {
    setRefreshing(true);
    getUsersFetch();
    setRefreshing(false);
  };

  useEffect(() => {
    if (inputValue !== "") {
      const filteredUsers = usuarios.filter(
        (usuario) =>
          usuario.name.toLowerCase().includes(inputValue.toLowerCase()) ||
          usuario.lastname.toLowerCase().includes(inputValue.toLowerCase()) ||
          usuario.email.toLowerCase().includes(inputValue.toLowerCase()) ||
          usuario.role.name.toLowerCase().includes(inputValue.toLowerCase())||
          usuario.surname.toLowerCase().includes(inputValue.toLowerCase())
      );
      setUsuarios(filteredUsers);
    } else {
      getUsersFetch();
    }
  }, [inputValue]);

  return (
    <View
      style={{
        flex: 1,
        paddingHorizontal: "2%",
        backgroundColor: colors.surface,
      }}
    >
      <Goback title={"Usuarios"} />
      <Searchbar setInputValue={setInputValue} />

      <Title title={"Lista de usuarios"} />
      <ScrollView
        //make reload when scroll
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            style={{ backgroundColor: colors.surface, height: 10 }}
          />
        }
        showsVerticalScrollIndicator={false}
        style={{ backgroundColor: colors.surface }}
      >
        <Users usuarios={usuarios} fetchDataOut={getUsersFetch} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({});
