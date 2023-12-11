import { StyleSheet, ScrollView, RefreshControl, Text } from "react-native";
import React, { useState, useEffect, useContext } from "react";
import { useTheme } from "react-native-paper";
import { View } from "react-native";
import Goback from "../../components/common/GoBack";
import Cart from "../../components/cliente/cart/Cart";
import {
  getCartByUser,
  getProductsByUserCart,
} from "../../services/cart/cartService";
import { Button } from "react-native-elements";
import { AuthContext } from "../../services/auth/context/AuthContext";
import { getTextSize } from "../../utils/textSizes";
import { cartToSale } from "../../services/sale/saleService";
import Loading from "../../components/common/Loading";
import { set } from "lodash";
import Toast from "react-native-toast-message";

export default function CarritoScreen(props) {
  const [inputValue, setInputValue] = useState("");
  const [elements, setElements] = useState([]);
  const { colors } = useTheme();

  const { textSize } = useContext(AuthContext);
  const textSizes = getTextSize(textSize.valor ? "medium" : textSize);
  const [refreshing, setRefreshing] = useState(false);
  const [userCart, setUserCart] = useState(null);
  const [loading, setLoading] = useState(false);
  const [total, setTotal] = useState(0);
  const [descuento, setDescuento] = useState(0);

  const getElementsFetch = async () => {
    try {
      setLoading(true);
      const userCart = await getCartByUser();
      const elements = await getProductsByUserCart();
      let total = 0;
      let descuento = 0;
      if (elements) {
        elements.forEach((element) => {
          total +=
            element.product.priceDiscount > 0
              ? element.product.priceDiscount * element.quantity
              : element.product.price * element.quantity;
          descuento +=
            element.product.priceDiscount > 0
              ? element.product.price * element.quantity -
                element.product.priceDiscount * element.quantity
              : 0;
        });
        descuento = total > 400000 ? descuento + total * 0.1 : descuento;
        total = total > 400000 ? total * 0.9 : total;
        total = total.toFixed(2);
        descuento = descuento.toFixed(2);
        setTotal(total);
        setDescuento(descuento);
      }
      setUserCart(userCart);
      setElements(elements);
      await calcularTotal();
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error(error);
    }
  };

  useEffect(() => {
    getElementsFetch();
  }, []);

  useEffect(() => {
    const unsubscribe = props.navigation.addListener("focus", () => {
      getElementsFetch();
    });
    return unsubscribe;
  }, [props.navigation]);

  const onRefresh = () => {
    setRefreshing(true);
    getElementsFetch();
    setRefreshing(false);
  };

  const calcularTotal = async () => {};

  return (
    <View
      style={{
        flex: 1,
        paddingHorizontal: "2%",
        backgroundColor: colors.surface,
      }}
    >
      <Goback title={"Carrito"} />
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
        <Cart elementCarts={elements} fetchDataOut={getElementsFetch} />
      </ScrollView>
      {elements
        ? elements.length > 0 && (
            <View
              style={{
                flexDirection: "column",
                justifyContent: "space-between",
                marginHorizontal: "2%",
              }}
            >
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
                  {"Total: $" + total + " MXN"}
                </Text>

                <Button
                  title="Confirmar compra"
                  onPress={async () => {
                    setLoading(true);
                    await cartToSale(userCart.uid_cart);
                    await getElementsFetch();
                    setLoading(false);
                    Toast.show({
                      text1: "Pedido realizado",
                      text2:
                        "verifica el estado de tu pedido en la sección de pedidos",
                      type: "success",
                      position: "bottom",
                    });
                  }}
                  titleStyle={{
                    fontSize: textSizes.Subtitle,
                    fontWeight: "bold",
                    color: colors.surface,
                  }}
                  icon={{
                    type: "material-community",
                    name: "cart-arrow-right",
                    color: colors.surface,
                    iconStyle: { marginRight: 10 },
                  }}
                  buttonStyle={{ backgroundColor: colors.primary }}
                  containerStyle={styles.btnContainer}
                />
              </View>
            </View>
          )
        : null}

      <Loading visible={loading} text="Cargando..." />
    </View>
  );
}

const styles = StyleSheet.create({
  btnContainer: {
    marginTop: 15,
    marginBottom: 15,
    width: "95%",
    alignSelf: "center",
    borderRadius: 10,
  },
});
