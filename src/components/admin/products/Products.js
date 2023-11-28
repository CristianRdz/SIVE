import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useTheme } from "react-native-paper";
import { Image } from "react-native-elements";

export default function Products({ productos }) {
  const { colors } = useTheme();

  const renderProduct = (producto) => (
    <TouchableOpacity
      key={producto.id}
      style={{
        flexDirection: "row",
        height: 100,
        width: "100%",
        backgroundColor: colors.surface,
        borderWidth: 1,
        borderColor: colors.primary,
        borderRadius: 10,
        marginBottom: 10,
      }}
    >
      <View style={styles.imageContainer}>
        <Image source={{ uri: producto.image }} style={styles.image} />
      </View>
      <View style={styles.infoContainer}>
        <Text style={{ fontSize: 17, fontWeight: "bold", color: colors.primary }}>
          {producto.name}
        </Text>
        <Text style={{ fontSize: 15 }}>{producto.description}</Text>
        <Text style={{ fontSize: 15, fontWeight: "bold" }}>
          Precio: ${producto.price}
        </Text>
        <Text style={{ fontSize: 15, fontWeight: "bold" }}>
          Stock: {producto.stock}
        </Text>
      </View>
    </TouchableOpacity>
  );

  return <View>{productos.map((producto) => renderProduct(producto))}</View>;
}

const styles = StyleSheet.create({
  imageContainer: {
    width: "40%",
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  infoContainer: {
    flex: 1,
    marginHorizontal: "3%",
    marginVertical: "1%",
    justifyContent: "space-evenly",
  },
});
