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
import images from "../utils/imageLoader"; // Importáljuk a képeket

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

  // Recept eltávolítása a kedvencek közül
  const removeFavourite = async (recipeId) => {
    try {
      const userId = await AsyncStorage.getItem("currentUserId");
      if (!userId) {
        Alert.alert("Hiba", "Felhasználói azonosító nem található.");
        return;
      }

      const key = `favorites_${userId}`;
      const updatedFavourites = favourites.filter(
        (item) => item.id !== recipeId
      );
      setFavourites(updatedFavourites);
      await AsyncStorage.setItem(key, JSON.stringify(updatedFavourites));
    } catch (error) {
      console.error("Hiba a recept eltávolításakor:", error);
      Alert.alert("Hiba", "Nem sikerült eltávolítani a receptet.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Kedvenc Receptek</Text>
      {favourites.length > 0 ? (
        <FlatList
          data={favourites}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.recipeCard}>
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate("RecipeDetail", { recipe: item })
                }
              >
                <Image source={images[item.image]} style={styles.recipeImage} />
                <Text style={styles.recipeName}>{item.name}</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.removeButton}
                onPress={() => removeFavourite(item.id)}
              >
                <Text style={styles.removeButtonText}>Eltávolítás</Text>
              </TouchableOpacity>
            </View>
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
  removeButton: {
    marginTop: 10,
    padding: 5,
    backgroundColor: "#ff4d4d",
    borderRadius: 5,
  },
  removeButtonText: {
    color: "#fff",
    fontSize: 14,
  },
  noFavouritesText: {
    fontSize: 16,
    color: "gray",
    marginTop: 20,
  },
});
