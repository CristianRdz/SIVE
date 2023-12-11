import { RefreshControl, ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState , useContext} from "react";
//React native elements button
import { Button } from "react-native-elements";
import { Card, useTheme,Avatar } from "react-native-paper";
import { getCategories } from "../../services/categories/catgoriesService";
import Goback from "../common/GoBack";
import { AuthContext } from "../../services/auth/context/AuthContext";
import { getTextSize } from "../../utils/textSizes";
import { useNavigation } from "@react-navigation/native";

export default function InicioCliente() {
  const { colors } = useTheme();
  const { textSize } = useContext(AuthContext);
  const textSizes = getTextSize(textSize.valor ? "medium" : textSize);
  const [categories, setCategories] = useState([]);
  const navigation = useNavigation();
  async function loadCategories() {
    try {
      const data = await getCategories();
      setCategories(data);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    loadCategories();
  }, []);
  const [refreshing, setRefreshing] = useState(false);
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    loadCategories();
    setRefreshing(false);
  }, []);


  return (
    <ScrollView style={{ backgroundColor: colors.background }} refreshControl={ <RefreshControl refreshing={refreshing} onRefresh={onRefresh} /> } >
      <Goback title={"Categorías"} />
      {categories.map((category, index) => (
        <Card key={index} style={{ margin: 10, padding: 10 }}>
          <Text style={{ color: colors.primary , fontSize: textSizes.Title, fontWeight: "bold" }}> {category.name} </Text>
          <Avatar.Text size={100} label={category.name.charAt(0)} style={{ alignSelf: "center", marginTop: 20 , marginBottom: 20 }} />
          <Card.Content>
            <Text style={{ color: colors.primary , fontSize: textSizes.Text}}>
              {category.description}
            </Text>
          </Card.Content>
          <Card.Actions>
            <Button
              buttonStyle={{ backgroundColor: colors.primary }}
              titleStyle={{ color: colors.surface , fontSize: textSizes.Subtitle}}
              containerStyle={styles.btnContainer}
              title="Ver productos"
              onPress={() =>
                navigation.navigate("productosCliente", {
                  category: category,
                })

                
              }
              icon={{
                type: "material-community",
                name: "eye-outline",
                color: colors.surface,
              }}
            />
          </Card.Actions>
        </Card>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  btnContainer: {
    marginTop: 15,
    width: "95%",
    alignSelf: "center",
    borderRadius: 10,
  },
});
