import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useTheme } from "react-native-paper";
import { Icon, Image } from "react-native-elements";

export default function Products({ productos }) {
  const { colors } = useTheme();

  const renderProduct = (producto) => (
    <TouchableOpacity
      key={producto.id}
      style={[
        styles.productContainer,
        { backgroundColor: colors.surface, borderColor: colors.primary },
      ]}
    >
      <View style={styles.imageContainer}>
        <Image source={{ uri: producto.image }} style={styles.image} />
      </View>
      <View style={styles.infoContainer}>
        <Text
          style={{ fontSize: 19, fontWeight: "bold", color: colors.primary }}
        >
          {producto.name}
        </Text>
        <Text
          style={{ fontSize: 15, fontWeight: "bold", color: colors.tertiary }}
        >
          ${producto.price} MXN
        </Text>
      </View>
      <View style={styles.iconContainer}>
        <Icon
          type="material-community"
          name="chevron-right"
          size={30}
          color={colors.primary}
          style={{ marginRight: "5%" }}
        />
      </View>
    </TouchableOpacity>
  );

  const isEmpty = productos.length === 0;

  if (isEmpty) {
    return (
      <View
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginVertical: "20%",
        }}
      >
        <Icon
          type="material-community"
          name="emoticon-sad-outline"
          size={60}
          color={colors.primary}
          style={{ opacity: 0.5 }}
        />
        <Text
          style={{
            fontSize: 20,
            fontWeight: "bold",
            color: colors.primary,
            opacity: 0.5,
          }}
        >
          No hay productos
        </Text>
      </View>
    );
  }

  return <View>{productos.map((producto) => renderProduct(producto))}</View>;
}

const styles = StyleSheet.create({
  productContainer: {
    flexDirection: "row",
    height: 80,
    width: "100%",
    borderWidth: 0.5,
    borderRadius: 10,
    marginBottom: 10,
  },
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
  iconContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginRight: "2%",
  },
});
