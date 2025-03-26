import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  StyleSheet,
} from "react-native";
import recipesData from "../data/recipes.json";

const RecipeListScreen = ({ route, navigation }) => {
  const { category } = route.params;
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    setRecipes(recipesData[category] || []);
  }, [category]);

  return (
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
            <Image source={{ uri: item.image }} style={styles.recipeImage} />
            <Text style={styles.recipeName}>{item.name}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default RecipeListScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    padding: 10,
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
