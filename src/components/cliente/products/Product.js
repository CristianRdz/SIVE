import React, { useState, useEffect } from "react";
import {
  Dimensions,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { Button, Icon, Image, Input } from "react-native-elements";
import { SwiperFlatListWithGestureHandler } from "react-native-swiper-flatlist/WithGestureHandler";
import { Toast } from "react-native-toast-message/lib/src/Toast";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useFormik } from "formik";
import * as Yup from "yup";

import { useNavigation } from "@react-navigation/native";
import Loading from "../../common/Loading";
export default function RenderizarInventario(props) {
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();
  const { params } = props.route;
  let { inventario } = params;
  let [producto, setProducto] = useState(
    inventario ? inventario.productos[0] : null
  );
  const [precio, setPrecio] = useState(null);
  const [existencias, setExistencias] = useState(null);
  let cantidad = 1;

  useEffect(() => {
    inventario.promociones
      ? setPrecio(
          (
            producto.precio -
            (inventario.promociones.porcentaje / 100) * producto.precio
          ).toFixed(2)
        )
      : setPrecio(producto.precio);
    setExistencias(producto.existencias);
  }, [producto]);

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
          existencias,
          "La cantidad debe ser menor o igual a las existencias"
        ),
    }),
    onSubmit: async (values) => {
      try {
        setLoading(true);
        const elemento_carrito = {
          cantidad_producto: values.cantidad,
          precio_producto: precio,
          productos: producto,
          imagen: inventario.imagenes[0].enlace,
          promociones: inventario.promociones ? inventario.promociones : null,
        };
        const existeCarrito = await obtenerCarrito();
        if (existeCarrito === null) {
          await guardarCarrito([]);
          await agregarProductoAlCarrito(elemento_carrito);
        } else {
          await agregarProductoAlCarrito(elemento_carrito);
        }
        try {
          navigation.navigate("carritoCliente", {
            screen: "carritoClienteS",
            params: { actualizarCarrito: elemento_carrito },
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
    <KeyboardAwareScrollView style={styles.container}>
     
        <View style={styles.carouselContainerMobile}>
          <SwiperFlatListWithGestureHandler
            autoplay
            autoplayLoop
            showPagination
            // hacemos que se vea vertical la paginación con el estilo y la volteamos
            paginationStyle={{
              position: "absolute",
              zIndex: 1,
            }}
            paginationActiveColor="#007ACC"
            paginationDefaultColor="gray"
            style={styles.carousel}
            data={inventario.imagenes}
            scrollAnimationDuration={1000}
            renderItem={({ index }) => (
              <View style={styles.carouselItem}>
                <Image
                  source={{
                    uri: `${inventario.imagenes[index].enlace}`,
                  }}
                  style={styles.carouselImageMobile}
                />
              </View>
            )}
          />
        </View>

      <View style={styles.productInfoContainer}>
        <Text style={styles.modelText}>{"Modelo: " + inventario.modelo}</Text>
        <Text style={styles.lineText}>
          {"Linea: " + inventario.linea.nombre_linea}
        </Text>
        {inventario.promociones && (
          <View style={styles.preciosContainer}>
            <Text style={styles.priceText}>{"$ " + precio + " MXN"}</Text>
            <Text style={styles.precioAnterior}>
              {"$ " + producto.precio + " MXN"}
            </Text>
          </View>
        )}
        {!inventario.promociones && (
          <Text style={styles.priceText}>{"$ " + precio + " MXN"}</Text>
        )}
        {inventario.promociones && (
          <Text style={styles.descuentos}>
            {"-" + inventario.promociones.porcentaje + "%"}
          </Text>
        )}
        <Text style={styles.descriptionText}>{inventario.descripcion}</Text>
        <Text style={styles.stockText}>{existencias + " en existencia"}</Text>
        <Text style={styles.label}>{"Tallas"}</Text>
        
        <Text style={styles.label}>{"Cantidad"}</Text>
        <Input
          errorMessage={formik.errors.cantidad}
          placeholder="Cantidad"
          keyboardType="numeric"
          value={formik.values.cantidad}
          onChangeText={(text) => formik.setFieldValue("cantidad", text)}
          rightIcon={
            <Icon
              type="font-awesome-5"
              name="box-open"
              style={{ marginRight: 10 }}
              size={24}
              color="black"
            />
          }
          containerStyle={{ width: width * 0.9, alignSelf: "center" }}
        />
        <Text style={styles.stockText}>
          {"Total: $" + (precio * formik.values.cantidad).toFixed(2) + " MXN"}
        </Text>
        <Button
          title="Agregar al carrito"
          icon={
            <Icon
              type="font-awesome-5"
              name="cart-plus"
              style={{ marginRight: 10 }}
              size={24}
              color="white"
            />
          }
          buttonStyle={styles.btnSuccess}
          containerStyle={styles.btnContainer}
          onPress={() => {
            formik.handleSubmit();
          }}
        />
      </View>
      <Loading isVisible={loading} text="Agregando al carrito" />
    </KeyboardAwareScrollView>
  );
}

const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

const styles = StyleSheet.create({
  btnContainer: {
    width: width * 0.9,
    alignSelf: "center",
    borderRadius: 10,
  },
  btnSuccess: {
    backgroundColor: Colors.primary,
    // se centra el boton
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  carouselContainerMobile: {
    height: height / 2,
    backgroundColor: "#f5f5f5",
    borderColor: "#c1c1c1",
    borderWidth: 1,
  },
  carouselContainerWeb: {
    height: width / 2,
    backgroundColor: "#f5f5f5",
    borderColor: "#c1c1c1",
    borderWidth: 1,
  },
  carousel: {
    marginBottom: 0,
    height: "100%",
  },
  carouselItem: {
    backgroundColor: "#fff",
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
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  lineText: {
    fontSize: 20,
    marginBottom: 10,
  },
  descriptionText: {
    fontSize: 16,
    marginBottom: 10,
  },
  priceText: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  precioAnterior: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#ccc",
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
    fontSize: 16,
    color: "gray",
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#000",
  },
  descuentos: {
    fontSize: 12,
    color: "green",
    marginBottom: 5,
  },
});
