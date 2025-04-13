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
import images from "../utils/imageLoader";
import Icon from "react-native-vector-icons/MaterialIcons";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

const FavouritesScreen = ({ navigation }) => {
  const [favourites, setFavourites] = useState([]);

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
    <SafeAreaProvider>
      <SafeAreaView style={styles.container} edges={["top", "left", "right"]}>
        {favourites.length > 0 ? (
          <FlatList
            data={favourites}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <View style={styles.recipeCard}>
                <Image source={images[item.image]} style={styles.recipeImage} />
                <TouchableOpacity
                  style={styles.cardContent}
                  onPress={() =>
                    navigation.navigate("RecipeDetail", { recipe: item })
                  }
                  activeOpacity={0.8}
                >
                  <Text style={styles.recipeName}>{item.name}</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.removeButton}
                  onPress={() => removeFavourite(item.id)}
                >
                  <Icon name="delete" size={28} color="#fff" />
                </TouchableOpacity>
              </View>
            )}
          />
        ) : (
          <Text style={styles.noFavouritesText}>
            Nincsenek kedvenc receptjeid.
          </Text>
        )}
      </SafeAreaView>
    </SafeAreaProvider>
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
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    backgroundColor: "#fff",
    borderRadius: 12,
    marginBottom: 10,
    padding: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  recipeImage: {
    width: 80,
    height: 80,
    borderRadius: 10,
  },
  cardContent: {
    flex: 1,
    paddingHorizontal: 12,
    justifyContent: "center",
  },
  recipeName: {
    fontSize: 18,
    fontWeight: "500",
  },
  removeButton: {
    width: 80,
    height: 80,
    backgroundColor: "#ff4d4d",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  removeButtonText: {
    color: "#fff",
    fontSize: 26,
    fontWeight: "bold",
  },

  recipeName: {
    fontSize: 18,
    fontWeight: "500",
  },
  removeButton: {
    width: 80,
    height: 80,
    backgroundColor: "#ff4d4d",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  removeButtonText: {
    color: "#fff",
    fontSize: 22,
    fontWeight: "bold",
  },
  noFavouritesText: {
    fontSize: 16,
    color: "gray",
    marginTop: 20,
    width: "80%",
    textAlign: "center",
  },
});
