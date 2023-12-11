import { StyleSheet, Text, View } from "react-native";
import React, { useContext } from "react";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useTheme } from "react-native-paper";
import { Icon, Image } from "react-native-elements";
import { loadFirstImage } from "../../../utils/constants";
import { getTextSize } from "../../../utils/textSizes";
import { AuthContext } from "../../../services/auth/context/AuthContext";
import { useNavigation } from "@react-navigation/native";
import { removeProductFromCart } from "../../../services/cart/cartService";
import Toast from "react-native-toast-message";
export default function Cart({ elementCarts, fetchDataOut }) {
  const { colors } = useTheme();
  const { textSize } = useContext(AuthContext);
  const textSizes = getTextSize(textSize.valor ? "medium" : textSize);
  const navigation = useNavigation();
  const renderProduct = (elementCart) => (
    <TouchableOpacity
      key={elementCart.uid}
      style={[
        styles.productContainer,
        { backgroundColor: colors.surface, borderColor: colors.primary },
      ]}
    >
      <View
        style={styles.imageContainer}
        onPress={() => {
          navigation.navigate("productosCliente", {
            screen: "producto",
            params: { producto: elementCart.product },
          });
        }}
      >
        <Image
          source={{ uri: loadFirstImage(elementCart.product) }}
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
          {elementCart.product.name}
        </Text>

        <View style={styles.preciosContainer}>
          {(elementCart.product.priceDiscount > 0 && (
            <>
              <Text
                style={{
                  ...styles.priceText,
                  color: colors.primary,
                  fontSize: textSizes.Text,
                }}
              >
                {"$ " + elementCart.product.priceDiscount + " MXN"}
              </Text>
              <Text
                style={{
                  ...styles.precioAnterior,
                  color: colors.tertiary,
                  fontSize: textSizes.Text,
                }}
              >
                {"$ " + elementCart.product.price + " MXN"}
              </Text>
            </>
          )) || (
            <Text
              style={{
                ...styles.priceText,
                color: colors.primary,
                fontSize: textSizes.Text,
              }}
            >
              {"$ " + elementCart.product.price + " MXN"}
            </Text>
          )}
        </View>
        <Text
          style={{
            ...styles.stockText,
            color: colors.primary,
            fontSize: textSizes.Text,
          }}
        >
          {"Cantidad: " + elementCart.quantity}
        </Text>

        <Text
          style={{
            ...styles.stockText,
            color: colors.primary,
            fontSize: textSizes.Text,
          }}
        >
          {"Total: $" +
            elementCart.product.price * elementCart.quantity +
            " MXN"}
        </Text>
      </View>

      <View style={styles.iconContainer}>
        <Icon
          type="material-community"
          name="delete"
          size={30}
          color={colors.primary}
          onPress={async () => {
            try {
              await removeProductFromCart(elementCart.uid);
              fetchDataOut();
              Toast.show({
                text1: "Producto eliminado",
                text2: "El producto se ha eliminado del carrito",
                type: "success",
                position: "bottom",
              });
            } catch (error) {
              console.error(error);
            }
          }}
        />
      </View>
    </TouchableOpacity>
  );

  const isEmpty = elementCarts ? elementCarts.length === 0 : true;

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
          No hay elementos en el carrito
        </Text>
      </View>
    );
  }

  return (
    <View>{elementCarts.map((elementCart) => renderProduct(elementCart))}</View>
  );
}

const styles = StyleSheet.create({
  productContainer: {
    flexDirection: "row",
    height: 150,
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
