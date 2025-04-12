import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import * as Animatable from "react-native-animatable";
import { useNavigation } from "@react-navigation/native";
import recipes from "../data/recipes.json";
import messages from "../data/messages.json";

const HomeScreen = ({ user }) => {
  const navigation = useNavigation();
  const [welcomeMessage, setWelcomeMessage] = useState("");
  const [tipRef, setTipRef] = useState(null);

  const refreshTip = () => {
    const randomIndex = Math.floor(
      Math.random() * messages.welcomeMessages.length
    );
    setWelcomeMessage(messages.welcomeMessages[randomIndex]);
  };

  useEffect(() => {
    refreshTip();
  }, []);

  const handleRandomRecipe = () => {
    const categories = Object.keys(recipes);
    const randomCategory =
      categories[Math.floor(Math.random() * categories.length)];

    const categoryRecipes = recipes[randomCategory];
    const randomRecipe =
      categoryRecipes[Math.floor(Math.random() * categoryRecipes.length)];

    navigation.navigate("RecipeDetail", { recipe: randomRecipe });
  };

  const handleTipPress = () => {
    refreshTip(); // előbb új tipp
    if (tipRef) {
      tipRef.animate("pulse", 300); // aztán animáció
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>Üdvözlünk, {user}!</Text>
        <Text style={styles.subtitle}>
          Nem tudod, mit főzz? Kattints a gombra és mi segítünk!
        </Text>

        <TouchableOpacity style={styles.button} onPress={handleRandomRecipe}>
          <Text style={styles.buttonText}>Kérek egy receptet</Text>
        </TouchableOpacity>
      </View>

      {/* Tipp kártya (tappolható, animált) */}
      <Animatable.View
        ref={(ref) => setTipRef(ref)}
        style={styles.tipCard}
        animation="fadeInUp"
        duration={600}
      >
        <TouchableOpacity onPress={handleTipPress} activeOpacity={0.8}>
          <Text style={styles.tipTitle}>💡 Tipp a konyhából</Text>
          <Text style={styles.tipText}>{welcomeMessage}</Text>
        </TouchableOpacity>
      </Animatable.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FAFAFA",
    paddingHorizontal: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 24,
    width: "100%",
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "600",
    marginBottom: 12,
    color: "#212529",
  },
  subtitle: {
    fontSize: 16,
    color: "#6C757D",
    textAlign: "center",
    marginBottom: 20,
  },
  button: {
    backgroundColor: "#007BFF",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "500",
  },
  tipCard: {
    position: "absolute",
    bottom: 30, // itt hagyjuk meg a te beállításod szerint
    left: 20,
    right: 20,
    backgroundColor: "#F1F3F5",
    padding: 16,
    borderRadius: 12,
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
  },
  tipTitle: {
    fontWeight: "600",
    fontSize: 16,
    marginBottom: 6,
    color: "#343A40",
  },
  tipText: {
    fontSize: 14,
    color: "#495057",
  },
});

export default HomeScreen;
