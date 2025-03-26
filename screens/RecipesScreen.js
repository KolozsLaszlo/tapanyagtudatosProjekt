import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

const mealTypes = [
  { id: "breakfast", name: "🍳 Reggeli" },
  { id: "lunch", name: "🍲 Ebéd" },
  { id: "dinner", name: "🍕 Vacsora" },
  { id: "snack", name: "🥪 Snack" },
  { id: "dessert", name: "🍰 Desszert" },
];

const RecipesScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Válassz étkezést</Text>
      {mealTypes.map((meal) => (
        <TouchableOpacity
          key={meal.id}
          style={styles.button}
          onPress={() =>
            navigation.navigate("RecipeList", { category: meal.id })
          }
        >
          <Text style={styles.buttonText}>{meal.name}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default RecipesScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f4f4f4",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  button: {
    backgroundColor: "blue",
    padding: 15,
    marginVertical: 5,
    borderRadius: 5,
    width: "80%",
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 18,
  },
});
