import React, { useState } from "react";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";
import HomeScreen from "./HomeScreen";
import ProfileScreen from "./ProfileScreen";
import SettingsScreen from "./SettingsScreen";
import AboutScreen from "./AboutScreen";

const MainScreen = ({ route, navigation }) => {
  const { user } = route.params;
  const [activeScreen, setActiveScreen] = useState("Home");

  // Aktív képernyő alapján megjelenítendő komponens
  const renderScreen = () => {
    switch (activeScreen) {
      case "Home":
        return <HomeScreen user={user} />;
      case "Profile":
        return <ProfileScreen user={user} />;
      case "Settings":
        return <SettingsScreen />;
      case "About":
        return <AboutScreen />;
      default:
        return <HomeScreen user={user} />;
    }
  };

  return (
    <View style={{ flex: 1 }}>
      {renderScreen()}

      {/* Alsó navigációs sáv */}
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
            🏠 Home
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => setActiveScreen("Profile")}
          style={styles.navButton}
        >
          <Text
            style={
              activeScreen === "Profile"
                ? styles.activeText
                : styles.inactiveText
            }
          >
            👤 Profile
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => setActiveScreen("Settings")}
          style={styles.navButton}
        >
          <Text
            style={
              activeScreen === "Settings"
                ? styles.activeText
                : styles.inactiveText
            }
          >
            ⚙️ Settings
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => setActiveScreen("About")}
          style={styles.navButton}
        >
          <Text
            style={
              activeScreen === "About" ? styles.activeText : styles.inactiveText
            }
          >
            ℹ️ About
          </Text>
        </TouchableOpacity>

        {/* Kijelentkezés gomb */}
        <TouchableOpacity
          onPress={() => navigation.replace("Login")}
          style={styles.logoutButton}
        >
          <Text style={styles.logoutText}>🚪 Logout</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default MainScreen;

// Stílusok
const styles = StyleSheet.create({
  bottomNav: {
    flexDirection: "row",
    justifyContent: "space-around",
    position: "absolute",
    bottom: 0,
    width: "100%",
    backgroundColor: "#fff",
    padding: 10,
    borderTopWidth: 1,
    borderTopColor: "#ccc",
  },
  navButton: {
    padding: 10,
  },
  activeText: {
    fontWeight: "bold",
    color: "blue",
  },
  inactiveText: {
    color: "gray",
  },
  logoutButton: {
    padding: 10,
    backgroundColor: "red",
    borderRadius: 5,
  },
  logoutText: {
    color: "white",
    fontWeight: "bold",
  },
});
