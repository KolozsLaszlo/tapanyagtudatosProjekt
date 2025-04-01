import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import AsyncStorage from "@react-native-async-storage/async-storage";

const images = {
  "assets/food-images/rantotta.png": require("../assets/food-images/rantotta.png"),
  "assets/food-images/zabkasa.jpg": require("../assets/food-images/zabkasa.jpg"),
  "assets/food-images/csirkeporkolt.jpg": require("../assets/food-images/csirkeporkolt.jpg"),
};

const RecipeDetailScreen = ({ route, navigation }) => {
  const { recipe } = route.params;

  const addToFavorites = async () => {
    try {
      const existingFavorites = await AsyncStorage.getItem("favorites");
      console.log("Létező kedvencek:", existingFavorites);
      let favorites = existingFavorites ? JSON.parse(existingFavorites) : [];

      if (!favorites.some((fav) => fav.id === recipe.id)) {
        favorites.push(recipe);
        await AsyncStorage.setItem("favorites", JSON.stringify(favorites));
        Alert.alert("Siker!", "A recept hozzáadva a kedvencekhez.");
      } else {
        Alert.alert(
          "Figyelmeztetés",
          "Ez a recept már szerepel a kedvencek között."
        );
      }
    } catch (error) {
      console.error("Hiba a kedvencek mentése közben:", error);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.backButtonText}>{"<"}</Text>
        </TouchableOpacity>

        <Image source={images[recipe.image]} style={styles.image} />
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

      {/* Hozzáadás a kedvencekhez gomb */}
      <TouchableOpacity style={styles.favoriteButton} onPress={addToFavorites}>
        <Text style={styles.favoriteButtonText}>Hozzáadás a kedvencekhez</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default RecipeDetailScreen;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#fff",
  },
  container: { flex: 1, padding: 20 },
  backButton: {
    position: "absolute",
    top: 20,
    left: 20,
    zIndex: 1,
    padding: 10,
  },
  backButtonText: {
    fontSize: 24,
    color: "#000",
  },
  image: { width: "100%", height: 200, borderRadius: 10, marginTop: 60 },
  title: { fontSize: 24, fontWeight: "bold", marginVertical: 10 },
  subtitle: { fontSize: 18, fontWeight: "bold", marginTop: 10 },
  text: { fontSize: 16, marginVertical: 5 },
  favoriteButton: {
    backgroundColor: "#ff6347",
    padding: 15,
    margin: 20,
    borderRadius: 10,
    alignItems: "center",
  },
  favoriteButtonText: {
    fontSize: 18,
    color: "#fff",
    fontWeight: "bold",
  },
});
