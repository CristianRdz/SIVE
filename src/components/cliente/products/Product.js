import React, { useState, useEffect, useContext } from "react";
import { Dimensions, StyleSheet, Text, View } from "react-native";
import { Button, Icon, Image, Input } from "react-native-elements";
import { SwiperFlatListWithGestureHandler } from "react-native-swiper-flatlist/WithGestureHandler";
import { Toast } from "react-native-toast-message/lib/src/Toast";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useFormik } from "formik";
import * as Yup from "yup";
// paper theme
import { useTheme, TextInput } from "react-native-paper";

import { useNavigation } from "@react-navigation/native";
import Loading from "../../common/Loading";
import { loadImage } from "../../../utils/constants";
import { AuthContext } from "../../../services/auth/context/AuthContext";
import { getTextSize } from "../../../utils/textSizes";
import Goback from "../../common/GoBack";
import {
  addProductToCart,
  getCartByUser,
  saveCart,
} from "../../../services/cart/cartService";
export default function Product(props) {
  const { colors } = useTheme();
  

  const { textSize } = useContext(AuthContext);
  const textSizes = getTextSize(textSize.valor ? "medium" : textSize);
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();
  const { params } = props.route;
  let { producto } = params;
  let cantidad = 1;

  const formik = useFormik({
    initialValues: {
      cantidad: cantidad.toString(),
    },
    validateOnChange: false,
    validationSchema: Yup.object({
      cantidad: Yup.number()
        .required("La cantidad es obligatoria")
        .min(1, "La cantidad debe ser mayor a 0")
        .max(
          producto.stock,
          "La cantidad debe ser menor o igual a las existencias"
        ),
    }),
    onSubmit: async (values) => {
      try {
        setLoading(true);
        const elemento_carrito = {
          quantity: parseInt(values.cantidad),
          product: producto,
        };
        const existeCarrito = await getCartByUser();
        if (existeCarrito) {
          await addProductToCart(elemento_carrito);
        } else {
          await saveCart();
          await addProductToCart(elemento_carrito);
        }
        try {
          navigation.navigate("carritoCliente", {
            producto: producto,
          });
        } catch (error) {
          navigation.goBack();
        }
        Toast.show({
          type: "success",
          position: "top",
          text1: "Éxito",
          text2: "Producto agregado al carrito de compras",
        });
      } catch (error) {
        Toast.show({
          type: "error",
          position: "top",
          text1: "Error",
          text2:
            "Ocurrió un error al colocar el producto en el carrito de compras",
        });
      }
    },
  });

  return (
    <KeyboardAwareScrollView
      style={{ ...styles.container, backgroundColor: colors.surface }}
    >
      <Goback title={producto.name} />
      <View style={styles.carouselContainerMobile}>
        <SwiperFlatListWithGestureHandler
          autoplay
          autoplayLoop
          showPagination
          paginationStyle={{
            position: "absolute",
          }}
          paginationActiveColor={colors.primary}
          paginationDefaultColor={colors.secondary}
          style={styles.carousel}
          data={producto.images}
          scrollAnimationDuration={1000}
          renderItem={({ index }) => (
            <View
              key={index}
              style={{
                ...styles.carouselItem,
                backgroundColor: colors.surface,
              }}
            >
              <Image
                source={{
                  uri: loadImage(producto.images[index]),
                }}
                style={styles.carouselImageMobile}
              />
            </View>
          )}
        />
      </View>

      <View style={styles.productInfoContainer}>
        {producto.priceDiscount > 0 && (
          <View style={styles.preciosContainer}>
            <Text
              style={{
                ...styles.priceText,
                color: colors.primary,
                fontSize: textSizes.Title,
              }}
            >
              {"$ " + producto.priceDiscount + " MXN"}
            </Text>
            <Text
              style={{
                ...styles.precioAnterior,
                color: colors.tertiary,
                fontSize: textSizes.Title,
              }}
            >
              {"$ " + producto.price + " MXN"}
            </Text>
          </View>
        )}
        {!producto.priceDiscount && (
          <Text
            style={{
              ...styles.priceText,
              color: colors.primary,
              fontSize: textSizes.Title,
            }}
          >
            {"$ " + producto.price + " MXN"}
          </Text>
        )}
        <Text
          style={{
            ...styles.stockText,
            color: colors.primary,
            fontSize: textSizes.Text,
          }}
        >
          {producto.stock + " disponibles"}
        </Text>
        <Text
          style={{
            ...styles.lineText,
            color: colors.surface,
            fontSize: textSizes.Text,
            borderColor: colors.primary,
            backgroundColor: colors.secondary,
          }}
        >
          {producto.category.name}
        </Text>

        <Text
          style={{
            ...styles.descriptionText,
            color: colors.primary,
            fontSize: textSizes.Text,
          }}
        >
          {producto.description}
        </Text>
        <Text
          style={{
            ...styles.stockText,

            color: colors.primary,

            fontSize: textSizes.Text,
          }}
        >
          {"Total: $" +
            (producto.priceDiscount > 0
              ? producto.priceDiscount
              : producto.price) *
              formik.values.cantidad +
            " MXN"}
        </Text>
        <View
          style={{
            width: "100%",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <TextInput
            mode="outlined"
            label="Cantidad"
            value={formik.values.cantidad}
            containerStyle={styles.input}
            style={{ fontSize: textSizes.Text }}
            right={
              <TextInput.Icon
                icon={() => (
                  <Icon
                    type="material-community"
                    name="numeric"
                    color={colors.primary}
                    iconStyle={styles.icon}
                  />
                )}
              />
            }
            keyboardType="numeric"
            onChangeText={(text) => formik.setFieldValue("cantidad", text)}
            error={formik.errors.cantidad ? true : false}
          />

          <Button
            title="Agregar al carrito"
            icon={
              <Icon
                type="material-community"
                name="cart-plus"
                style={{ marginRight: 10 }}
                size={24}
                color={colors.surface}
              />
            }
            titleStyle={{ color: colors.surface }}
            buttonStyle={{ backgroundColor: colors.primary }}
            containerStyle={styles.btnContainer}
            onPress={() => {
              formik.handleSubmit();
            }}
            loading={formik.isSubmitting}
          />
        </View>
        <Text style={{ fontSize: textSizes.Text, color: colors.error }}>
          {formik.errors.cantidad}
        </Text>
      </View>

      <Loading isVisible={loading} text="Agregando al carrito" />
    </KeyboardAwareScrollView>
  );
}

const { width, height } = Dimensions.get("window");
const styles = StyleSheet.create({
  btnContainer: {
    width: "auto",
    alignSelf: "center",
    borderRadius: 10,
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  carouselContainerMobile: {
    height: height / 2,
    borderWidth: 1,
  },
  carouselContainerWeb: {
    height: width / 2,
    borderWidth: 1,
  },
  carousel: {
    marginBottom: 0,
    height: "100%",
  },
  carouselItem: {
    flex: 1,
    justifyContent: "center",
  },
  carouselImageMobile: {
    resizeMode: "contain",
    width: width,
    height: height / 2,
  },
  carouselImageWeb: {
    resizeMode: "contain",
    width: width,
    height: width / 2,
  },
  productInfoContainer: {
    padding: 20,
  },
  modelText: {
    fontWeight: "bold",
    marginBottom: 10,
  },
  lineText: {
    borderRadius: 10,
    padding: 5,
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: "#ccc",
    marginBottom: 10,
    alignSelf: "flex-start",
  },
  descriptionText: {
    marginBottom: 10,
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
  stockText: {
    color: "gray",
    marginBottom: 20,
  },
  label: {
    fontWeight: "bold",
  },
  descuentos: {
    marginBottom: 5,
  },
});
