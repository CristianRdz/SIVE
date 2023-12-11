import { StyleSheet, Text, View } from "react-native";
import React, { useContext } from "react";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useTheme } from "react-native-paper";
import { Icon, Image } from "react-native-elements";
import { loadFirstImage } from "../../../utils/constants";
import { getTextSize } from "../../../utils/textSizes";
import { AuthContext } from "../../../services/auth/context/AuthContext";
import { useNavigation } from "@react-navigation/native";

export default function Products({ productos }) {
  const { colors } = useTheme();
  const { textSize } = useContext(AuthContext);
  const textSizes = getTextSize(textSize.valor ? "medium" : textSize);
  const navigation = useNavigation();
  const renderProduct = (producto) => (
    <TouchableOpacity
      key={producto.uid_producto}
      style={[
        styles.productContainer,
        { backgroundColor: colors.surface, borderColor: colors.primary },
      ]}
      onPress={() => {
        navigation.navigate("producto", {
          producto: producto,
        });
      }}
    >
      <View style={styles.imageContainer}>
        <Image
          source={{ uri: loadFirstImage(producto) }}
          style={styles.image}
        />
      </View>
      <View style={styles.infoContainer}>
        <Text
          style={{
            fontSize: textSizes.Text,
            fontWeight: "bold",
            color: colors.primary,
          }}
        >
          {producto.name}
        </Text>

        <View style={styles.preciosContainer}>
          {producto.priceDiscount > 0 && (
          <>
            <Text
            style={{
              ...styles.priceText,
              color: colors.primary,
              fontSize: textSizes.Text,
            }}
          >
            {"$ " + producto.priceDiscount + " MXN"}
          </Text>
            <Text
              style={{
                ...styles.precioAnterior,
                color: colors.tertiary,
                fontSize: textSizes.Text,
              }}
            >
              {"$ " + producto.price + " MXN"}
            </Text>
            </>
          ) || (
            <Text
            style={{
              ...styles.priceText,
              color: colors.primary,
              fontSize: textSizes.Text,
            }}
          >
            {"$ " + producto.price + " MXN"}
          </Text>
          )}
        </View>
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

  const isEmpty = productos ? productos.length === 0 : true;

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
            fontSize: textSizes.subtitle,
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
    resizeMode: "contain",
  },
  infoContainer: {
    flex: 1,
    marginHorizontal: "3%",
    marginVertical: "1%",
    justifyContent: "space-evenly",
  },
  priceText: {
    fontWeight: "bold",
    marginBottom: 10,
  },
  precioAnterior: {
    fontWeight: "bold",
    textDecorationLine: "line-through",
    marginBottom: 10,
    marginLeft: 5,
  },
  preciosContainer: {
    flexDirection: "row",
    justifyContent: "flex-start",
    marginBottom: 5,
  },
  iconContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginRight: "2%",
  },
});
