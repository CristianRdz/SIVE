import { StyleSheet, ScrollView, RefreshControl } from "react-native";
import React, { useState, useEffect,  useContext } from "react";
import { useTheme } from "react-native-paper";
import { View } from "react-native";
import Goback from "../../components/common/GoBack";
import Cart from "../../components/cliente/cart/Cart";
import { getCartByUser, getProductsByUserCart } from "../../services/cart/cartService";
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

  const getElementsFetch = async () => {
    try {
      setLoading(true);
      const userCart = await getCartByUser();
      const data = await getProductsByUserCart();
      setUserCart(userCart);
      setElements(data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error(error);
    }
  };

  useEffect(() => {
    getElementsFetch();
  }, []);

  // hacemos que se actualice cada que se cambia a la pantalla
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
      {elements ? elements.length > 0 && (
        <Button
        title="Confirmar compra"
        onPress={async () => {
          setLoading(true);
          await cartToSale(userCart.uid_cart);
          await getElementsFetch();
          setLoading(false);
          Toast.show({
            text1: "Pedido realizado",
            text2: "verifica el estado de tu pedido en la sección de pedidos",
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
      ) : null}\

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
