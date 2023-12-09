import React, { useState, useEffect } from "react";
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

export default function ScrollCategories() {
  const { colors } = useTheme();
  const navigation = useNavigation();
  const [categories, setCategories] = useState([]);

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
            key={category.id}
            activeOpacity={0.6}
            style={[styles.container, { backgroundColor: colors.primary }]}
          >
            <Text
              style={[styles.text, { color: colors.surface }]}
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
    fontSize: 13,
    paddingHorizontal: 20,
  },
});
