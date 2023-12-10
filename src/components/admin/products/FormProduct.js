import { StyleSheet, Text, View, ScrollView, Image } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import * as ImagePicker from "expo-image-picker";
import * as FileSystem from "expo-file-system";
import Toast from "react-native-toast-message";
import { AuthContext } from "../../../services/auth/context/AuthContext";
import { TextInput, useTheme } from "react-native-paper";
import { Button, Icon } from "react-native-elements";
import { getTextSize } from "../../../utils/textSizes";
import { getCategories } from "../../../services/categories/catgoriesService";
import DropdownComponent from "../../common/DropdownComponent";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import {
  saveProduct,
  updateProduct,
} from "../../../services/products/productService";
import { loadImage } from "../../../utils/constants";

export default function FormProduct(props) {
  const { textSize } = useContext(AuthContext);
  const textSizes = getTextSize(textSize.valor ? "medium" : textSize);
  const { colors } = useTheme();
  let [images, setImages] = useState(producto ? producto.images : []);
  const [cantidadImagenes, setCantidadImagenes] = useState(0);
  let { producto } = props;
  const { close, fetchDataOut } = props;
  const [categorias, setCategorias] = useState([]);
  const [categoria, setCategoria] = useState(producto ? producto.category : "");
  const [loading, setLoading] = useState(false);

  const handleAddImage = async () => {
    setImages([]);
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      alert("Es necesario otorgar permisos para acceder a la galería.");
      return;
    }
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
      allowsMultipleSelection: true,
    });

    if (!result.canceled) {
      const { assets } = result;
      assets.forEach(async (asset) => {
        const constuirImagen = async () => {
          const uri = asset.uri; // uri del archivo
          const name = uri.split("/").pop();
          const mimeType = asset.type + "/" + uri.split(".").pop();
          const base64 = await FileSystem.readAsStringAsync(asset.uri, {
            encoding: "base64",
          });
          const image = {
            uri: uri,
            name,
            mimeType,
            fileBase64: base64,
          };
          return image;
        };
        const image = await constuirImagen();
        setImages((images) => [...images, image]);
      });
    }
  };

  async function fetchCategories() {
    setLoading(true);
    const lineas = await getCategories();
    setCategorias(lineas);
    setLoading(false);
  }
  useEffect(() => {
    fetchCategories();
  }, []);
  useEffect(() => {
    formik.setFieldValue("category", categoria);
  }, [categoria]);

  useEffect(() => {
    formik.setFieldValue("images", images);
  }, [images]);

  const formik = useFormik({
    initialValues: {
      name: producto ? producto.name : "",
      price: producto ? producto.price.toString() : "",
      priceDiscount: producto ? producto.priceDiscount.toString() : "",
      stock: producto ? producto.stock.toString() : "",
      description: producto ? producto.description : "",
      category: producto ? producto.category : "",
      images: producto ? producto.images : [],
    },
    validationSchema: Yup.object({
      name: Yup.string().required("El nombre es obligatorio"),
      price: Yup.string()
        .required("El precio es obligatorio")
        .min(0, "El precio debe ser mayor a 0"),
      priceDiscount: Yup.string("El precio con descuento debe ser un número")
        .min(0, "El precio con descuento debe ser mayor a 0")
        .max(
          Yup.ref("price"),
          "El precio con descuento debe ser menor al precio normal"
        ),
      stock: Yup.string()
        .required("El stock es obligatorio")
        .min(0, "El stock debe ser mayor a 0"),
      category: Yup.object().required("La categoria es obligatoria"),
      description: Yup.string().required("La descripción es obligatoria"),
      // El array debe tener al menos una imagen
      images: Yup.array().required("Las imagenes son obligatorias").min(producto ? 0 : 1, "Las imagenes son obligatorias"),
    }),

    validateOnChange: false,
    onSubmit: async (formValue) => {
      try {
        if (producto) {
          producto.name = formValue.name;
          producto.price = formValue.price;
          producto.priceDiscount = formValue.priceDiscount;
          producto.stock = formValue.stock;
          producto.category = formValue.category;
          producto.description = formValue.description;
          producto.images = formValue.images;
          await updateProduct(producto);
          await fetchDataOut();
          close();
          Toast.show({
            type: "success",
            text1: "Producto actualizado",
            text2: "El producto se actualizó correctamente",
          });
        } else {
          const product = {
            name: formValue.name,
            price: formValue.price,
            priceDiscount: formValue.priceDiscount,
            stock: formValue.stock,
            category: formValue.category,
            description: formValue.description,
            images: formValue.images,
          };
          const response = await saveProduct(product);
          if (response) {
            await fetchDataOut();
            close();
            Toast.show({
              type: "success",
              text1: "Producto guardado",
              text2: "El producto se guardó correctamente",
            });
          }else{
            fetchDataOut();
            close();
            Toast.show({
              type: "error",
              text1: "Error al guardar el producto",
              text2: "Por favor, intentelo más tarde",
            });
          }
        }
      } catch (error) {
        close();
        console.log(error);
        Toast.show({
          type: "error",
          text1: "Error al contactar con el servidor",
          text2: "Por favor, intentelo más tarde",
        });
      }
    },
  });

  return (
    <KeyboardAwareScrollView style={styles.viewContent}>
      <Text
        style={{
          fontSize: textSizes.Title,
          fontWeight: "bold",
          color: colors.primary,
          marginBottom: 10,
        }}
      >
        {producto ? "Editar producto" : "Nuevo producto"}
      </Text>
      <TextInput
        mode="outlined"
        label="Nombre"
        containerStyle={styles.input}
        style={{ fontSize: textSizes.Text }}
        onChangeText={(text) => formik.setFieldValue("name", text)}
        error={formik.errors.name ? true : false}
        value={formik.values.name}
      />
      <Text
        style={
          formik.errors.name
            ? { color: colors.error, fontSize: textSizes.Text }
            : {}
        }
      >
        {formik.errors.name}
      </Text>
      <TextInput
        mode="outlined"
        label="Precio"
        containerStyle={styles.input}
        style={{ fontSize: textSizes.Text }}
        onChangeText={(text) => formik.setFieldValue("price", text)}
        error={formik.errors.price ? true : false}
        value={formik.values.price}
        type="number"
      />
      <Text
        style={
          formik.errors.price
            ? { color: colors.error, fontSize: textSizes.Text }
            : {}
        }
      >
        {formik.errors.price}
      </Text>
      <TextInput
        mode="outlined"
        label="Precio con descuento"
        containerStyle={styles.input}
        style={{ fontSize: textSizes.Text }}
        onChangeText={(text) => formik.setFieldValue("priceDiscount", text)}
        error={formik.errors.priceDiscount ? true : false}
        value={formik.values.priceDiscount}
        type="number"
      />
      <Text
        style={
          formik.errors.priceDiscount
            ? { color: colors.error, fontSize: textSizes.Text }
            : {}
        }
      >
        {formik.errors.priceDiscount}
      </Text>
      <TextInput
        mode="outlined"
        label="Stock"
        containerStyle={styles.input}
        style={{ fontSize: textSizes.Text }}
        onChangeText={(text) => formik.setFieldValue("stock", text)}
        error={formik.errors.stock ? true : false}
        value={formik.values.stock}
        type="number"
      />
      <Text
        style={
          formik.errors.stock
            ? { color: colors.error, fontSize: textSizes.Text }
            : {}
        }
      >
        {formik.errors.stock}
      </Text>
      <DropdownComponent
        data={categorias}
        id={"uid_category"}
        nombre={"name"}
        placeholder={"Selecciona una categoria"}
        setValueOut={setCategoria}
        selectedValue={producto ? producto.category : null}
      />
      <Text
        style={
          formik.errors.category
            ? { color: colors.error, fontSize: textSizes.Text }
            : {}
        }
      >
        {formik.errors.category}
      </Text>
      <TextInput
        mode="outlined"
        label="Descripción"
        containerStyle={styles.input}
        style={{ fontSize: textSizes.Text }}
        onChangeText={(text) => formik.setFieldValue("description", text)}
        error={formik.errors.description ? true : false}
        value={formik.values.description}
        multiline={true}
        numberOfLines={4}
      />
      <Text
        style={
          formik.errors.description
            ? { color: colors.error, fontSize: textSizes.Text }
            : {}
        }
      >
        {formik.errors.description}
      </Text>

      

      <Button
        text
        icon={
          <Icon
            type="material-community"
            name="image-plus"
            color={colors.surface}
            style={styles.icon}
          />
        }
        titleStyle={{ color: colors.surface, fontSize: textSizes.Subtitle }}
        title={"Agregar imagenes"}
        containerStyle={styles.btnContainer}
        buttonStyle={{ backgroundColor: colors.primary }}
        onPress={() => handleAddImage()}
      />
      <ScrollView
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        style={{ marginVertical: 10 }}
      >
        {producto &&
          producto.images.map((image, index) => (
            <Image
              key={index}
              source={{ uri: loadImage(image) }}
              style={{ width: 100, height: 100, marginHorizontal: 10 }}
            />
          ))}
        {images.map((image, index) => (
          <Image
            key={index}
            source={{ uri: image.uri }}
            style={{ width: 100, height: 100, marginHorizontal: 10 }}
          />
        ))}

      </ScrollView>
      <Text
        style={
          formik.errors.images
            ? { color: colors.error, fontSize: textSizes.Text }
            : {}
        }
      >
        {formik.errors.images}
      </Text>
      <Button
        text
        icon={
          <Icon
            type="material-community"
            name="content-save"
            color={colors.surface}
            style={styles.icon}
          />
        }
        titleStyle={{ color: colors.surface, fontSize: textSizes.Subtitle }}
        title={"Guardar"}
        containerStyle={{
          ...styles.btnContainer,
          backgroundColor: colors.primary,
        }}
        buttonStyle={{ backgroundColor: colors.primary }}
        onPress={formik.handleSubmit}
        loading={formik.isSubmitting}
      />
      <Button
        text
        icon={
          <Icon
            type="material-community"
            name="cancel"
            color={colors.surface}
            style={styles.icon}
          />
        }
        titleStyle={{ color: colors.surface, fontSize: textSizes.Subtitle }}
        title={"Cancelar"}
        containerStyle={{
          ...styles.btnContainer,
          backgroundColor: colors.error,
        }}
        buttonStyle={{ backgroundColor: colors.error }}
        onPress={close}
        
      />
    </KeyboardAwareScrollView>
  );
}

const styles = StyleSheet.create({
  viewContent: {
    borderRadius: 20,
    margin: 10,
  },
  input: {
    width: "100%",
    marginTop: 15,
    borderRadius: 10,
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
