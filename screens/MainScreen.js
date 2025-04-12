import React, { useState } from "react";
import { View, TouchableOpacity, Text, StyleSheet, Alert } from "react-native";
import HomeScreen from "./HomeScreen";
import RecipesScreen from "./RecipesScreen";
import CalculatorScreen from "./CalculatorScreen";
import FavouritesScreen from "./FavouritesScreen";
import Icon from "react-native-vector-icons/MaterialIcons"; // vagy Ionicons / FontAwesome is lehet

const MainScreen = ({ navigation, route }) => {
  const { user } = route.params;
  const [activeScreen, setActiveScreen] = useState("Home");

  const handleLogout = () => {
    Alert.alert("Kijelentkezés", "Biztosan ki szeretnél jelentkezni?", [
      { text: "Mégse", style: "cancel" },
      {
        text: "Igen",
        onPress: () => navigation.replace("Login"),
      },
    ]);
  };

  const renderScreen = () => {
    switch (activeScreen) {
      case "Home":
        return <HomeScreen user={user} />;
      case "Recipes":
        return <RecipesScreen navigation={navigation} />;
      case "Profile":
        return <ProfileScreen user={user} />;
      case "Calculator":
        return <CalculatorScreen />;
      case "Favourites":
        return <FavouritesScreen navigation={navigation} />;
      default:
        return <HomeScreen user={user} />;
    }
  };

  return (
    <View style={{ flex: 1 }}>
      {renderScreen()}

      <View style={styles.bottomNav}>
        <TouchableOpacity
          onPress={() => setActiveScreen("Home")}
          style={styles.navButton}
        >
          <Icon
            name="home"
            size={28}
            color={activeScreen === "Home" ? "#1e90ff" : "gray"}
          />
          <Text
            style={
              activeScreen === "Home"
                ? styles.activeLabel
                : styles.inactiveLabel
            }
          >
            Home
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => setActiveScreen("Recipes")}
          style={styles.navButton}
        >
          <Icon
            name="restaurant-menu"
            size={28}
            color={activeScreen === "Recipes" ? "#1e90ff" : "gray"}
          />
          <Text
            style={
              activeScreen === "Recipes"
                ? styles.activeLabel
                : styles.inactiveLabel
            }
          >
            Receptek
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => setActiveScreen("Calculator")}
          style={styles.navButton}
        >
          <Icon
            name="calculate"
            size={28}
            color={activeScreen === "Calculator" ? "#1e90ff" : "gray"}
          />
          <Text
            style={
              activeScreen === "Calculator"
                ? styles.activeLabel
                : styles.inactiveLabel
            }
          >
            Kalkulátor
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => setActiveScreen("Favourites")}
          style={styles.navButton}
        >
          <Icon
            name="favorite"
            size={28}
            color={activeScreen === "Favourites" ? "#1e90ff" : "gray"}
          />
          <Text
            style={
              activeScreen === "Favourites"
                ? styles.activeLabel
                : styles.inactiveLabel
            }
          >
            Kedvencek
          </Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={handleLogout} style={styles.navButton}>
          <Icon name="logout" size={28} color="red" />
          <Text style={[styles.inactiveLabel, { color: "red" }]}>Kilépés</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f9f9f9",
  },

  bottomNav: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: "#ffffff",
    height: 70,
    borderTopWidth: 1,
    borderTopColor: "#e0e0e0",
    elevation: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -1 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },

  navButton: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },

  activeLabel: {
    fontSize: 12,
    color: "#1e90ff",
    fontWeight: "600",
    marginTop: 4,
  },

  inactiveLabel: {
    fontSize: 12,
    color: "#8e8e8e",
    marginTop: 4,
  },

  logoutLabel: {
    fontSize: 12,
    color: "red",
    marginTop: 4,
  },

  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    textAlign: "center",
    marginVertical: 20,
  },

  screenWrapper: {
    flex: 1,
    paddingHorizontal: 16,
    paddingBottom: 80, // hogy ne takarja ki a bottom nav
  },

  card: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },

  cardTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },

  cardText: {
    fontSize: 14,
    color: "#555",
    marginTop: 8,
  },

  button: {
    backgroundColor: "#1e90ff",
    padding: 12,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
  },

  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});

export default MainScreen;
