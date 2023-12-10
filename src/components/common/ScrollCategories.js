import React, { useState, useEffect, useContext } from "react";
import { useNavigation } from "@react-navigation/native";
import {
  ScrollView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { useTheme } from "react-native-paper";
import { getCategories } from "../../services/categories/catgoriesService";
import { AuthContext } from "../../services/auth/context/AuthContext";
import { getTextSize } from "../../utils/textSizes";

export default function ScrollCategories(props) {
  const { colors } = useTheme();
  const { textSize } = useContext(AuthContext);
  const textSizes = getTextSize(textSize.valor ? "medium" : textSize);
  const { setCategoriesOut } = props;
  const [categories, setCategories] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);

  async function fetchCategories() {
    try {
      const response = await getCategories();
      setCategories(response);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <View style={styles.viewContainer}>
      <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
        {categories.map((category) => (
          <TouchableOpacity
            key={category.uid_category}
            activeOpacity={0.6}
            style={[styles.container, { backgroundColor: selectedCategories.includes(category) ? colors.primary : colors.secondary }]}
            onPress={() => {
              if (selectedCategories.includes(category)) {
                const filteredCategories = selectedCategories.filter(
                  (selectedCategory) => selectedCategory !== category
                );
                setSelectedCategories(filteredCategories);
                setCategoriesOut(filteredCategories);
              } else {
                const updatedCategories = [...selectedCategories, category];
                setSelectedCategories(updatedCategories);
                setCategoriesOut(updatedCategories);
              }
            }}
          >
            <Text
              style={[styles.text, { color: colors.surface , fontSize: textSizes.Small}]}
              numberOfLines={1}
            >
              {category.name}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  viewContainer: {
    marginHorizontal: 20,
    marginBottom: "8%",
  },
  container: {
    height: 35,
    marginRight: 10,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontWeight: "500",
    textAlign: "center",
    paddingHorizontal: 20,
  },
});
