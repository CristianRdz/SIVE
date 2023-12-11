import { StyleSheet, Text, View } from "react-native";
import React, { useContext, useState } from "react";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useTheme } from "react-native-paper";
import { Icon, Image, Button } from "react-native-elements";
import { loadFirstImage } from "../../../utils/constants";
import Modal from "../../common/Modal";
import FormProduct from "./FormProduct";
import { removeProduct } from "../../../services/products/productService";
import { AuthContext } from "../../../services/auth/context/AuthContext";
import { getTextSize } from "../../../utils/textSizes";

export default function Products({ productos, fetchDataOut }) {
  const { colors } = useTheme();
  const { textSize } = useContext(AuthContext);
  const textSizes = getTextSize(textSize.valor ? "medium" : textSize);
  const openClose = () => setShowModal((prevState) => !prevState);
  const [showModal, setShowModal] = useState(false);
  const [renderComponent, setRenderComponent] = useState(null);

  const renderProduct = (producto) => (
    <TouchableOpacity
      key={producto.uid_product}
      style={[
        styles.productContainer,
        { backgroundColor: colors.surface, borderColor: colors.primary },
      ]}
    >
      <View style={styles.imageContainer}>
        <Image
          source={{ uri: loadFirstImage(producto) }}
          style={styles.imagen}
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
        <Text
          style={{
            fontSize: textSizes.Small,
            fontWeight: "bold",
            color: colors.tertiary,
          }}
        >
          ${producto.price} MXN
        </Text>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.iconContainer}>
          <Icon
            type="material-community"
            name="pencil-outline"
            size={30}
            color={colors.primary}
            onPress={() => {
              setRenderComponent(
                <FormProduct
                  producto={producto}
                  close={openClose}
                  fetchDataOut={fetchDataOut}
                />
              );
              openClose();
            }}
          />
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconContainer}>
          <Icon
            type="material-community"
            name="trash-can-outline"
            size={30}
            color={colors.primary}
            onPress={() => {
              removeProduct(producto.uid_product);
              fetchDataOut();
            }}
          />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  const isEmpty = productos ? productos.length === 0 : true;

  if (isEmpty) {
    return (
      <>
        <Button
          text
          icon={
            <Icon
              type="material-community"
              name="plus"
              color={colors.surface}
              style={styles.icon}
            />
          }
          titleStyle={{ color: colors.surface }}
          title={"Agregar producto"}
          containerStyle={{
            ...styles.btnContainer,
            backgroundColor: colors.primary,
          }}
          buttonStyle={{ backgroundColor: colors.primary }}
          onPress={() => {
            setRenderComponent(
              <FormProduct close={openClose} fetchDataOut={fetchDataOut} />
            );
            openClose();
          }}
        />
        <Modal isVisible={showModal} close={openClose}>
          {renderComponent}
        </Modal>

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
      </>
    );
  }

  return (
    <View>
      <Button
        text
        icon={
          <Icon
            type="material-community"
            name="plus"
            color={colors.surface}
            style={styles.icon}
          />
        }
        titleStyle={{ color: colors.surface, fontSize: textSizes.Subtitle }}
        title={"Agregar producto"}
        containerStyle={{
          ...styles.btnContainer,
          backgroundColor: colors.primary,
        }}
        buttonStyle={{ backgroundColor: colors.primary }}
        onPress={() => {
          setRenderComponent(
            <FormProduct close={openClose} fetchDataOut={fetchDataOut} />
          );
          openClose();
        }}
      />
      {productos.map((producto) => renderProduct(producto))}
      <Modal isVisible={showModal} close={openClose}>
        {renderComponent}
      </Modal>
    </View>
  );
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
  imagen: {
    width: "100%",
    height: 80,
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
  btnContainer: {
    marginTop: 15,
    marginBottom: 15,
    width: "95%",
    alignSelf: "center",
    borderRadius: 10,
  },

  buttonContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    width: "30%",
  },
});
