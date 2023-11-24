import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { useTheme, Card } from "react-native-paper";
import { Icon, colors } from "react-native-elements";
import { TouchableOpacity } from "react-native";

export default function InicioAdmin() {
  const { colors } = useTheme();
  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        backgroundColor: colors.background,
      }}
    >
      <Card
        style={{
          width: "90%",
          height: "8%",
          justifyContent: "center",
          alignItems: "center",
          marginBottom: "5%",
        }}
      >
        <Text
          style={{ fontSize: 20, fontWeight: "bold", color: colors.primary }}
        >
          ¡Bienvenido!
        </Text>
      </Card>
      <Card style={{ width: "90%", height: "85%" }}>
        <TouchableOpacity
          style={{
            justifyContent: "center",
            width: "85%",
            height: "27%",
            marginHorizontal: "7%",
            marginVertical: "5%",
            borderColor: colors.primary,
            borderRadius: 10,
            borderWidth: 1,
          }}
          onPress={() => navigation.navigate("")}
        >
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              marginHorizontal: "10%",
            }}
          >
            <Text
              style={{
                fontSize: 20,
                fontWeight: "bold",
                color: colors.primary,
              }}
            >
              Artículos
            </Text>
            <Icon
              type="material-community"
              name="chevron-right"
              size={40}
              color={colors.primary}
            />
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            justifyContent: "center",
            width: "85%",
            height: "27%",
            marginHorizontal: "7%",
            marginVertical: "5%",
            borderColor: colors.primary,
            borderRadius: 10,
            borderWidth: 1,
          }}
          onPress={() => navigation.navigate("")}
        >
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              marginHorizontal: "10%",
            }}
          >
            <Text
              style={{
                fontSize: 20,
                fontWeight: "bold",
                color: colors.primary,
              }}
            >
              Usuarios
            </Text>
            <Icon
              type="material-community"
              name="chevron-right"
              size={40}
              color={colors.primary}
            />
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            justifyContent: "center",
            width: "85%",
            height: "27%",
            marginHorizontal: "7%",
            marginVertical: "5%",
            borderColor: colors.primary,
            borderRadius: 10,
            borderWidth: 1,
          }}
          onPress={() => navigation.navigate("")}
        >
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              marginHorizontal: "10%",
            }}
          >
            <Text
              style={{
                fontSize: 20,
                fontWeight: "bold",
                color: colors.primary,
              }}
            >
              Ventas
            </Text>
            <Icon
              type="material-community"
              name="chevron-right"
              size={40}
              color={colors.primary}
            />
          </View>
        </TouchableOpacity>
      </Card>
    </View>
  );
}

const styles = StyleSheet.create({});
