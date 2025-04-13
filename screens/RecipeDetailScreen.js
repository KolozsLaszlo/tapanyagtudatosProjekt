import React, { useEffect, useState, useRef } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Alert,
  ScrollView,
  Animated,
  Easing,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import AsyncStorage from "@react-native-async-storage/async-storage";
import images from "../utils/imageLoader";
import Icon from "react-native-vector-icons/Ionicons";

const RecipeDetailScreen = ({ route, navigation }) => {
  const { recipe } = route.params;
  const [isFavorite, setIsFavorite] = useState(false);
  const animation = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const checkIfFavorite = async () => {
      try {
        const userId = await AsyncStorage.getItem("currentUserId");
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

  const triggerAnimation = () => {
    animation.setValue(0);
    Animated.timing(animation, {
      toValue: 1,
      duration: 600,
      easing: Easing.out(Easing.ease),
      useNativeDriver: true,
    }).start();
  };

  const toggleFavorite = async () => {
    try {
      const userId = await AsyncStorage.getItem("currentUserId");
      const key = `favorites_${userId}`;
      const existingFavorites = await AsyncStorage.getItem(key);
      let favorites = existingFavorites ? JSON.parse(existingFavorites) : [];

      if (isFavorite) {
        favorites = favorites.filter((fav) => fav.id !== recipe.id);
        setIsFavorite(false);
      } else {
        favorites.push(recipe);
        setIsFavorite(true);
      }

      await AsyncStorage.setItem(key, JSON.stringify(favorites));
      triggerAnimation();
    } catch (error) {
      console.error("Hiba a kedvenc váltásnál:", error);
    }
  };

  const spin = animation.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"],
  });

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.headerRow}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Icon name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Image source={images[recipe.image]} style={styles.image} />

        <View style={styles.card}>
          <Text style={styles.title}>{recipe.name}</Text>

          <View style={styles.sectionRow}>
            <Icon
              name="list-outline"
              size={20}
              color="#333"
              style={styles.icon}
            />
            <Text style={styles.sectionTitle}>Hozzávalók</Text>
          </View>
          {recipe.ingredients.map((ingredient, index) => (
            <Text key={index} style={styles.text}>
              • {ingredient}
            </Text>
          ))}

          <View style={styles.sectionRow}>
            <Icon
              name="time-outline"
              size={20}
              color="#333"
              style={styles.icon}
            />
            <Text style={styles.sectionTitle}>Elkészítési idő</Text>
          </View>
          <Text style={styles.text}>{recipe.prep_time}</Text>

          <View style={styles.sectionRow}>
            <Icon
              name="restaurant-outline"
              size={20}
              color="#333"
              style={styles.icon}
            />
            <Text style={styles.sectionTitle}>Elkészítés</Text>
          </View>
          <Text style={styles.text}>{recipe.instructions}</Text>
        </View>
      </ScrollView>

      <Animated.View
        style={[styles.favoriteContainer, { transform: [{ rotate: spin }] }]}
      >
        <TouchableOpacity
          onPress={toggleFavorite}
          style={styles.favoriteButton}
        >
          <Icon
            name={isFavorite ? "heart" : "heart-outline"}
            size={40}
            color={isFavorite ? "#ff3b30" : "#aaa"}
          />
        </TouchableOpacity>
      </Animated.View>
    </SafeAreaView>
  );
};

export default RecipeDetailScreen;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#f2f2f2",
  },
  scrollContainer: {
    paddingBottom: 80,
    alignItems: "center",
    paddingHorizontal: 16,
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    marginTop: 10,
  },
  backButton: {
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 30,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 2,
    elevation: 3,
  },
  image: {
    width: "100%",
    height: 220,
    borderRadius: 16,
    marginTop: 20,
    marginBottom: 20,
  },
  card: {
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 16,
    width: "100%",
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 2,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 8,
  },
  sectionRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 16,
  },
  icon: {
    marginRight: 8,
  },
  text: {
    fontSize: 16,
    marginBottom: 6,
    color: "#333",
  },
  favoriteContainer: {
    position: "absolute",
    bottom: 20,
    alignSelf: "center",
    backgroundColor: "#fff",
    padding: 14,
    borderRadius: 50,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 6,
    elevation: 5,
  },
  favoriteButton: {
    alignItems: "center",
    justifyContent: "center",
  },
});
