import React, { useEffect, useRef } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Animated,
  Dimensions,
  Easing,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const { width } = Dimensions.get("window");

const mealTypes = [
  { id: "breakfast", name: "Reggeli", icon: "silverware-fork-knife" },
  { id: "lunch", name: "Ebéd", icon: "food" },
  { id: "dinner", name: "Vacsora", icon: "noodles" },
  { id: "snack", name: "Snack", icon: "food-apple" },
  { id: "dessert", name: "Desszert", icon: "cupcake" },
];

const RecipesScreen = ({ navigation }) => {
  const chefAnim = useRef(new Animated.Value(-60)).current;
  const opacityAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const runAnimation = () => {
      chefAnim.setValue(-60);
      opacityAnim.setValue(0);

      Animated.parallel([
        Animated.timing(chefAnim, {
          toValue: 50,
          duration: 4000,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(opacityAnim, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
      ]).start(() => {
        Animated.timing(opacityAnim, {
          toValue: 0,
          duration: 500,
          useNativeDriver: true,
        }).start(() => {
          setTimeout(runAnimation, 1000);
        });
      });
    };

    runAnimation();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Válassz étkezést</Text>

      <View style={styles.buttonContainer}>
        {mealTypes.map((meal) => (
          <TouchableOpacity
            key={meal.id}
            style={styles.button}
            onPress={() =>
              navigation.navigate("RecipeList", { category: meal.id })
            }
          >
            <MaterialCommunityIcons
              name={meal.icon}
              size={24}
              color="#333"
              style={styles.icon}
            />
            <Text style={styles.buttonText}>{meal.name}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.bottomSection}>
        <Animated.View
          style={{
            transform: [{ translateX: chefAnim }],
            opacity: opacityAnim,
          }}
        >
          <MaterialCommunityIcons name="chef-hat" size={40} color="#aaa" />
        </Animated.View>
        <Text style={styles.bottomText}>Főzzünk valami jót!</Text>
      </View>
    </View>
  );
};

export default RecipesScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    paddingHorizontal: 20,
    backgroundColor: "#f9f9f9",
    justifyContent: "space-between",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    alignSelf: "center",
    marginBottom: 20,
  },
  buttonContainer: {
    flex: 1,
    justifyContent: "center",
    width: "100%",
    gap: 12,
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    paddingVertical: 18,
    paddingHorizontal: 20,
    borderRadius: 15,
    width: "100%",
    justifyContent: "flex-start",
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 5,
    elevation: 3,
  },
  icon: {
    marginRight: 15,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
  },
  bottomSection: {
    alignItems: "center",
    marginBottom: 30,
  },
  bottomText: {
    marginTop: 5,
    fontSize: 20,
    color: "#888",
    textAlign: "center",
    fontStyle: "italic",
    width: "80%",
  },
});
