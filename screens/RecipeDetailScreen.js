import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";

const RecipeDetailScreen = ({ route }) => {
  const { recipe } = route.params;

  return (
    <View style={styles.container}>
      <Image source={{ uri: recipe.image }} style={styles.image} />
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
  );
};

export default RecipeDetailScreen;

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  image: { width: "100%", height: 200, borderRadius: 10 },
  title: { fontSize: 24, fontWeight: "bold", marginVertical: 10 },
  subtitle: { fontSize: 18, fontWeight: "bold", marginTop: 10 },
  text: { fontSize: 16, marginVertical: 5 },
});
