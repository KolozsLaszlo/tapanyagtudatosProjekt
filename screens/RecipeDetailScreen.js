import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context"; // SafeAreaView importálása

const images = {
  "assets/food-images/rantotta.png": require("../assets/food-images/rantotta.png"),
  "assets/food-images/zabkasa.jpg": require("../assets/food-images/zabkasa.jpg"),
  "assets/food-images/csirkeporkolt.jpg": require("../assets/food-images/csirkeporkolt.jpg"),
};

const RecipeDetailScreen = ({ route, navigation }) => {
  const { recipe } = route.params;

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {/* Vissza gomb */}
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.backButtonText}>{"<"}</Text>
        </TouchableOpacity>

        <Image
          source={images[recipe.image]} // A helyi kép betöltése
          style={styles.image}
        />
        <Text style={styles.title}>{recipe.name}</Text>
        <Text style={styles.subtitle}>Hozzávalók:</Text>
        {recipe.ingredients.map((ingredient, index) => (
          <Text key={index} style={styles.text}>
            - {ingredient}
          </Text>
        ))}
        <Text style={styles.subtitle}>Elkészítési idő: {recipe.prep_time}</Text>
        <Text style={styles.subtitle}>Elkészítés:</Text>
        <Text style={styles.text}>{recipe.instructions}</Text>
      </View>
    </SafeAreaView>
  );
};

export default RecipeDetailScreen;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#fff", // Biztosítja az egységes háttérszínt
  },
  container: { flex: 1, padding: 20 },
  backButton: {
    position: "absolute",
    top: 20, // A gombot a SafeAreaView-en belül a tetejére helyezzük
    left: 20,
    zIndex: 1, // Biztosítja, hogy a gomb a többi elem fölött legyen
    padding: 10,
  },
  backButtonText: {
    fontSize: 24,
    color: "#000",
  },
  image: { width: "100%", height: 200, borderRadius: 10, marginTop: 60 }, // Margin a vissza gomb miatt
  title: { fontSize: 24, fontWeight: "bold", marginVertical: 10 },
  subtitle: { fontSize: 18, fontWeight: "bold", marginTop: 10 },
  text: { fontSize: 16, marginVertical: 5 },
});
