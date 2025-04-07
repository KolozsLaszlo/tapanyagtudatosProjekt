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
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    const checkIfFavorite = async () => {
      try {
        const userId = await AsyncStorage.getItem("currentUserId");
        if (!userId) {
          Alert.alert("Hiba", "Felhasználói azonosító nem található.");
          return;
        }

        const key = `favorites_${userId}`;
        const existingFavorites = await AsyncStorage.getItem(key);
        const favorites = existingFavorites
          ? JSON.parse(existingFavorites)
          : [];

        setIsFavorite(favorites.some((fav) => fav.id === recipe.id));
      } catch (error) {
        console.error("Hiba a kedvencek ellenőrzése közben:", error);
      }
    };

    checkIfFavorite();
  }, [recipe]);

  const addToFavorites = async () => {
    try {
      const userId = await AsyncStorage.getItem("currentUserId");
      if (!userId) {
        Alert.alert("Hiba", "Felhasználói azonosító nem található.");
        return;
      }

      const key = `favorites_${userId}`;
      const existingFavorites = await AsyncStorage.getItem(key);
      let favorites = existingFavorites ? JSON.parse(existingFavorites) : [];

      if (!favorites.some((fav) => fav.id === recipe.id)) {
        favorites.push(recipe);
        await AsyncStorage.setItem(key, JSON.stringify(favorites));
        setIsFavorite(true);
        Alert.alert("Siker!", "A recept hozzáadva a kedvencekhez.");
      }
    } catch (error) {
      console.error("Hiba a kedvencek mentése közben:", error);
    }
  };

  const removeFromFavorites = async () => {
    try {
      const userId = await AsyncStorage.getItem("currentUserId");
      if (!userId) {
        Alert.alert("Hiba", "Felhasználói azonosító nem található.");
        return;
      }

      const key = `favorites_${userId}`;
      const existingFavorites = await AsyncStorage.getItem(key);
      let favorites = existingFavorites ? JSON.parse(existingFavorites) : [];

      favorites = favorites.filter((fav) => fav.id !== recipe.id);
      await AsyncStorage.setItem(key, JSON.stringify(favorites));
      setIsFavorite(false);
      Alert.alert("Siker!", "A recept eltávolítva a kedvencek közül.");
    } catch (error) {
      console.error("Hiba a kedvencek eltávolítása közben:", error);
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

      {/* Dinamikus gomb a kedvencekhez adáshoz vagy eltávolításhoz */}
      <TouchableOpacity
        style={styles.favoriteButton}
        onPress={isFavorite ? removeFromFavorites : addToFavorites}
      >
        <Text style={styles.favoriteButtonText}>
          {isFavorite
            ? "Eltávolítás a kedvencekből"
            : "Hozzáadás a kedvencekhez"}
        </Text>
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
