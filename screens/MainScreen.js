import React, { useState } from "react";
import { View, TouchableOpacity, Text, StyleSheet, Alert } from "react-native";
import HomeScreen from "./HomeScreen";
import RecipesScreen from "./RecipesScreen";
import CalculatorScreen from "./CalculatorScreen";
import FavouritesScreen from "./FavouritesScreen";

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
          <Text
            style={
              activeScreen === "Home" ? styles.activeText : styles.inactiveText
            }
          >
            Home
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setActiveScreen("Recipes")}
          style={styles.navButton}
        >
          <Text
            style={
              activeScreen === "Recipes"
                ? styles.activeText
                : styles.inactiveText
            }
          >
            Receptek
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => setActiveScreen("Calculator")}
          style={styles.navButton}
        >
          <Text
            style={
              activeScreen === "Calculator"
                ? styles.activeText
                : styles.inactiveText
            }
          >
            Kalkulátor
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setActiveScreen("Favourites")}
          style={styles.navButton}
        >
          <Text
            style={
              activeScreen === "Favourites"
                ? styles.activeText
                : styles.inactiveText
            }
          >
            Kedvencek
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleLogout} style={styles.logoutButton}>
          <Text style={styles.logoutText}>Kijelentkezés</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  bottomNav: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    position: "absolute",
    bottom: 0,
    width: "100%",
    backgroundColor: "#fff",
    height: 60,
    borderTopWidth: 1,
    borderTopColor: "#ccc",
  },
  navButton: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    height: "100%",
    backgroundColor: "#f0f0f0",
  },
  activeText: {
    fontWeight: "bold",
    color: "blue",
    fontSize: 16,
    marginTop: 5,
  },
  inactiveText: {
    color: "gray",
    fontSize: 16,
    marginTop: 5,
  },
  logoutButton: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    height: "100%",
    backgroundColor: "red",
  },
  logoutText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
    marginTop: 5,
  },
});

export default MainScreen;
