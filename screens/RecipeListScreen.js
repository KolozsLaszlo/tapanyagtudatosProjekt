import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  StyleSheet,
} from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import recipesData from "../data/recipes.json";
import images from "../utils/imageLoader";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

const RecipeListScreen = ({ route, navigation }) => {
  const { category } = route.params;
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    setRecipes(recipesData[category] || []);
  }, [category]);

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.container}>
          <Text style={styles.title}>Receptek</Text>
          <FlatList
            data={recipes}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.recipeCard}
                onPress={() =>
                  navigation.navigate("RecipeDetail", { recipe: item })
                }
              >
                <Image source={images[item.image]} style={styles.recipeImage} />
                <View style={styles.recipeContent}>
                  <Text style={styles.recipeName}>{item.name}</Text>

                  <View style={styles.prepRow}>
                    <Icon
                      name="clock-outline"
                      size={16}
                      color="#666"
                      style={{ marginRight: 4 }}
                    />
                    <Text style={styles.prepTime}>{item.prep_time} perc</Text>
                  </View>

                  <Text style={styles.ingredients}>
                    Hozzávalók: {item.ingredients.slice(0, 3).join(", ")}...
                  </Text>
                </View>
              </TouchableOpacity>
            )}
          />
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Icon name="arrow-left" size={22} color="#333" />
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

export default RecipeListScreen;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#fff",
  },
  container: {
    flex: 1,
    padding: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    alignSelf: "center",
    marginBottom: 20,
  },
  backButton: {
    position: "absolute",
    top: 12,
    left: 12,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "rgba(0,0,0,0.05)",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
  },
  backButtonText: {
    fontSize: 24,
    color: "#000",
  },
  recipeCard: {
    flexDirection: "row",
    backgroundColor: "#f9f9f9",
    borderRadius: 12,
    padding: 12,
    marginVertical: 6,
    marginHorizontal: 10,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  recipeImage: {
    width: 80,
    height: 80,
    borderRadius: 10,
    marginRight: 12,
  },
  recipeContent: {
    flex: 1,
  },
  recipeName: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 4,
    color: "#333",
  },
  prepTime: {
    fontSize: 14,
    color: "#666",
    marginBottom: 2,
  },
  ingredients: {
    fontSize: 13,
    color: "#555",
  },
  prepRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 2,
  },
});
