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
import images from "../utils/imageLoader"; // Importáljuk a képeket

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
                <Text style={styles.recipeName}>{item.name}</Text>
              </TouchableOpacity>
            )}
          />
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.backButtonText}>{"<"}</Text>
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
    alignItems: "center",
    padding: 10,
  },
  backButton: {
    position: "absolute",
    left: 20,
    padding: 10,
  },
  backButtonText: {
    fontSize: 24,
    color: "#000",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  recipeCard: {
    width: "90%",
    padding: 10,
    backgroundColor: "#fff",
    marginVertical: 5,
    borderRadius: 10,
    alignItems: "center",
  },
  recipeImage: {
    width: 100,
    height: 100,
    borderRadius: 10,
  },
  recipeName: {
    marginTop: 10,
    fontSize: 18,
  },
});
