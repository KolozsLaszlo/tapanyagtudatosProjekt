import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { SQLiteProvider } from "expo-sqlite";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import MainScreen from "./screens/MainScreen";
import CalculatorScreen from "./screens/CalculatorScreen";

import RecipeCategoriesScreen from "./screens/RecipesScreen";
import RecipeListScreen from "./screens/RecipeListScreen";
import RecipeDetailsScreen from "./screens/RecipeDetailScreen";
import FavouritesScreen from "./screens/FavouritesScreen";

const Stack = createStackNavigator();

const initializeDatabase = async (db) => {
  try {
    await db.execAsync(`
      PRAGMA journal_mode = WAL;
      CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT UNIQUE,
        password TEXT
      );
    `);
    console.log("Database initialized!");
  } catch (error) {
    console.log("Error initializing database:", error);
  }
};

export default function App() {
  return (
    <SQLiteProvider databaseName="auth.db" onInit={initializeDatabase}>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Login"
          screenOptions={{ headerShown: false }}
        >
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Register" component={RegisterScreen} />
          <Stack.Screen name="Main" component={MainScreen} />
          <Stack.Screen name="Calculator" component={CalculatorScreen} />
          <Stack.Screen
            name="RecipeCategories"
            component={RecipeCategoriesScreen}
          />
          <Stack.Screen name="RecipeList" component={RecipeListScreen} />
          <Stack.Screen name="RecipeDetail" component={RecipeDetailsScreen} />
          <Stack.Screen name="Favourites" component={FavouritesScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </SQLiteProvider>
  );
}
