import { StyleSheet, Text, View } from "react-native";
import React, { useContext, useState } from "react";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useTheme } from "react-native-paper";
import { AuthContext } from "../../../services/auth/context/AuthContext";
import { getTextSize } from "../../../utils/textSizes";
import Modal from "../../common/Modal";
import Sale from "./Sale";

export default function Sales({ sales, fetchDataOut }) {
  const { colors } = useTheme();
  const { textSize } = useContext(AuthContext);
  const textSizes = getTextSize(textSize.valor ? "medium" : textSize);
  const openClose = () => setShowModal((prevState) => !prevState);
  const [showModal, setShowModal] = useState(false);
  const [renderComponent, setRenderComponent] = useState(null);

  const renderSale = (sale) => (
    <TouchableOpacity
      key={sale.uid_sale}
      style={[
        styles.saleContainer,
        { backgroundColor: colors.surface, borderColor: colors.primary },
      ]}
      onPress={() => {
        setRenderComponent(<Sale close={openClose} sale_uid={sale.uid_sale} sale={sale}  fetchDataOut={fetchDataOut} />);
        openClose();
      }}
    >
      <View style={styles.infoContainer}>
        <Text
          style={{
            fontSize: textSizes.Text,
            fontWeight: "bold",
            color: colors.primary,
          }}
        >
          {sale.user.name} {sale.user.lastname} - {sale.user.email}
        </Text>
        <Text
          style={{
            fontSize: textSizes.Small,
            fontWeight: "bold",
            color:
              sale.purchase_status === "Pendiente"
                ? colors.error
                : colors.success,
          }}
        >
          {sale.purchase_status}
        </Text>
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <Text
            style={{
              fontSize: textSizes.Small,
              fontWeight: "bold",
              color: colors.tertiary,
            }}
          >
            {sale.date}
          </Text>
          <Text
            style={{
              fontSize: textSizes.Small,
              fontWeight: "bold",
              color: colors.tertiary,
            }}
          >
            ${sale.total}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View>
      {sales.map((sale) => renderSale(sale))}
      <Modal isVisible={showModal} close={openClose}>
        {renderComponent}
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  saleContainer: {
    flexDirection: "row",
    height: 80,
    width: "100%",
    borderWidth: 0.5,
    borderRadius: 10,
    marginBottom: 10,
  },
  infoContainer: {
    flex: 1,
    marginHorizontal: "3%",
    marginVertical: "1%",
    justifyContent: "space-evenly",
  },
});
