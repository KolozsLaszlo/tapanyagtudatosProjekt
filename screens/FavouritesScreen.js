import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  StyleSheet,
  Alert,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const images = {
  "assets/food-images/rantotta.png": require("../assets/food-images/rantotta.png"),
  "assets/food-images/zabkasa.jpg": require("../assets/food-images/zabkasa.jpg"),
  "assets/food-images/csirkeporkolt.jpg": require("../assets/food-images/csirkeporkolt.jpg"),
};

const FavouritesScreen = ({ navigation }) => {
  const [favourites, setFavourites] = useState([]);

  // Kedvencek betöltése az AsyncStorage-ból
  useEffect(() => {
    const loadFavourites = async () => {
      try {
        const userId = await AsyncStorage.getItem("currentUserId");
        if (!userId) {
          Alert.alert("Hiba", "Felhasználói azonosító nem található.");
          return;
        }

        const key = `favorites_${userId}`;
        const storedFavourites = await AsyncStorage.getItem(key);
        if (storedFavourites) {
          setFavourites(JSON.parse(storedFavourites));
        } else {
          setFavourites([]);
        }
      } catch (error) {
        console.error("Hiba a kedvencek betöltésekor:", error);
        Alert.alert("Hiba", "Nem sikerült betölteni a kedvenceket.");
      }
    };

    loadFavourites();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Kedvenc Receptek</Text>
      {favourites.length > 0 ? (
        <FlatList
          data={favourites}
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
      ) : (
        <Text style={styles.noFavouritesText}>Nincsenek kedvenc receptek.</Text>
      )}
    </View>
  );
};

export default FavouritesScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    padding: 10,
    backgroundColor: "#f4f4f4",
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
  noFavouritesText: {
    fontSize: 16,
    color: "gray",
    marginTop: 20,
  },
});
