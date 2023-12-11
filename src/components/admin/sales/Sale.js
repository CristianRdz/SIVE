import { StyleSheet, Text, View } from "react-native";
import React, { useContext, useEffect } from "react";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import { useTheme } from "react-native-paper";
import { Icon, Image } from "react-native-elements";
import { AuthContext } from "../../../services/auth/context/AuthContext";
import { getProductsSale } from "../../../services/sale/saleService";
import { getTextSize } from "../../../utils/textSizes";
import { useState } from "react";
import { loadFirstImage } from "../../../utils/constants";

export default function Sale(props) {
  const { colors } = useTheme();
  const { textSize } = useContext(AuthContext);
  const textSizes = getTextSize(textSize.valor ? "medium" : textSize);
  const { close, sale_uid } = props;
  const [saleProducts, setSaleProducts] = useState([]);
  const [descuento, setDescuento] = useState(0);

  const getSaleFetch = async () => {
    try {
      const elements = await getProductsSale(sale_uid);
      let total = 0;
      let descuento = 0;
      if (elements) {
        elements.forEach((element) => {
          descuento +=
            element.product.priceDiscount > 0
              ? element.product.price * element.quantity -
                element.product.priceDiscount * element.quantity
              : 0;
        });
        descuento = total > 400000 ? descuento + total * 0.1 : descuento;
        descuento = descuento.toFixed(2);
        setDescuento(descuento);
      }
      setSaleProducts(elements);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getSaleFetch();
  }, []);

  const renderProduct = (elementSale) => (
    <TouchableOpacity
      key={elementSale.uid}
      style={[
        styles.productContainer,
        { backgroundColor: colors.surface, borderColor: colors.primary },
      ]}
    >
      <View style={styles.imageContainer}>
        <Image
          source={{ uri: loadFirstImage(elementSale.product) }}
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
          {elementSale.product.name}
        </Text>

        <View style={styles.preciosContainer}>
          {(elementSale.product.priceDiscount > 0 && (
            <>
              <Text
                style={{
                  ...styles.priceText,
                  color: colors.primary,
                  fontSize: textSizes.Text,
                }}
              >
                {"$ " + elementSale.product.priceDiscount + " MXN"}
              </Text>
              <Text
                style={{
                  ...styles.precioAnterior,
                  color: colors.tertiary,
                  fontSize: textSizes.Text,
                }}
              >
                {"$ " + elementSale.product.price + " MXN"}
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
              {"$ " + elementSale.product.price + " MXN"}
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
          {"Cantidad: " + elementSale.quantity}
        </Text>

        <Text
          style={{
            ...styles.stockText,
            color: colors.primary,
            fontSize: textSizes.Text,
          }}
        >
          {"Total: "}
          {elementSale.product.priceDiscount > 0
            ? elementSale.product.priceDiscount * elementSale.quantity
            : elementSale.product.price * elementSale.quantity}
          {" MXN"}
        </Text>
      </View>
    </TouchableOpacity>
  );
  const isEmpty = saleProducts ? saleProducts.length === 0 : true;

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
    <ScrollView
      style={{
        backgroundColor: colors.surface,
      }}
    >
      {saleProducts.map((elementSale) => renderProduct(elementSale))}
      <View
        style={{
          flexDirection: "column",
          justifyContent: "space-between",
          marginHorizontal: "2%",
        }}
      >
        <Text
          style={{
            fontSize: textSizes.Subtitle,
            fontWeight: "bold",
            color: colors.primary,
          }}
        >
          {"Descuento: $" + descuento + " MXN"}
        </Text>
        <Text
          style={{
            fontSize: textSizes.Subtitle,
            fontWeight: "bold",
            color: colors.primary,
          }}
        >
          {"Total: $" +
            (saleProducts[0] ? saleProducts[0].sale.total : 0) +
            " MXN"}
        </Text>
      </View>
    </ScrollView>
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
