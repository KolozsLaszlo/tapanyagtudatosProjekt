import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView,
  Keyboard,
  TouchableWithoutFeedback,
  ScrollView, // ScrollView importálása
  Platform,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Picker } from "@react-native-picker/picker";

const CalculatorScreen = () => {
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("Férfi");
  const [activity, setActivity] = useState("Minimális aktivitás (ülőmunka)");
  const [result, setResult] = useState(null);

  const calculateCalories = () => {
    const bmr =
      gender === "Férfi"
        ? 10 * parseFloat(weight) +
          6.25 * parseFloat(height) -
          5 * parseFloat(age) +
          5
        : 10 * parseFloat(weight) +
          6.25 * parseFloat(height) -
          5 * parseFloat(age) -
          161;

    const activityMultiplier = {
      "Minimális aktivitás (ülőmunka)": 1.2,
      "Enyhe aktivitás (heti 1-3 edzés)": 1.375,
      "Közepes aktivitás (rendszeres edzés)": 1.55,
      "Nagy aktivitás (napi intenzív edzés)": 1.725,
      "Extrém aktivitás (versenysport)": 1.9,
    };

    const calories = bmr * activityMultiplier[activity];
    setResult({
      calories: Math.round(calories),
      protein: Math.round((calories * 0.3) / 4),
      fat: Math.round((calories * 0.25) / 9),
      carbs: Math.round((calories * 0.45) / 4),
    });
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <KeyboardAvoidingView
          style={styles.container}
          behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
          <ScrollView contentContainerStyle={styles.scrollContainer}>
            <Text style={styles.title}>Kalória Kalkulátor</Text>
            <TextInput
              style={styles.input}
              placeholder="Súly (kg)"
              placeholderTextColor="#555"
              keyboardType="decimal-pad"
              value={weight}
              onChangeText={setWeight}
            />
            <TextInput
              style={styles.input}
              placeholder="Magasság (cm)"
              placeholderTextColor="#555"
              keyboardType="decimal-pad"
              value={height}
              onChangeText={setHeight}
            />
            <TextInput
              style={styles.input}
              placeholder="Életkor (év)"
              placeholderTextColor="#555"
              keyboardType="decimal-pad"
              value={age}
              onChangeText={setAge}
            />
            <View style={styles.pickerContainer}>
              <Picker
                selectedValue={gender}
                onValueChange={(itemValue) => setGender(itemValue)}
              >
                <Picker.Item label="Férfi" value="Férfi" />
                <Picker.Item label="Nő" value="Nő" />
              </Picker>
            </View>
            <View style={styles.pickerContainer}>
              <Picker
                selectedValue={activity}
                onValueChange={(itemValue) => setActivity(itemValue)}
              >
                <Picker.Item
                  label="Minimális aktivitás (ülőmunka)"
                  value="Minimális aktivitás (ülőmunka)"
                />
                <Picker.Item
                  label="Enyhe aktivitás (heti 1-3 edzés)"
                  value="Enyhe aktivitás (heti 1-3 edzés)"
                />
                <Picker.Item
                  label="Közepes aktivitás (rendszeres edzés)"
                  value="Közepes aktivitás (rendszeres edzés)"
                />
                <Picker.Item
                  label="Nagy aktivitás (napi intenzív edzés)"
                  value="Nagy aktivitás (napi intenzív edzés)"
                />
                <Picker.Item
                  label="Extrém aktivitás (versenysport)"
                  value="Extrém aktivitás (versenysport)"
                />
              </Picker>
            </View>
            <TouchableOpacity style={styles.button} onPress={calculateCalories}>
              <Text style={styles.buttonText}>Számítás</Text>
            </TouchableOpacity>
            {result && (
              <View style={styles.resultContainer}>
                <Text style={styles.resultText}>
                  Napi kalóriaszükséglet: {result.calories} kcal
                </Text>
                <Text style={styles.resultText}>
                  Fehérje: {result.protein} g
                </Text>
                <Text style={styles.resultText}>Zsír: {result.fat} g</Text>
                <Text style={styles.resultText}>
                  Szénhidrát: {result.carbs} g
                </Text>
              </View>
            )}
          </ScrollView>
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
};

export default CalculatorScreen;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#f4f4f4",
  },
  container: {
    flex: 1,
  },
  scrollContainer: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    marginBottom: 15,
    backgroundColor: "#fff",
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    marginBottom: 15,
    backgroundColor: "#fff",
  },
  button: {
    backgroundColor: "#007BFF",
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
    marginTop: 10,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  resultContainer: {
    marginTop: 20,
    marginBottom: 20,
    padding: 15,
    backgroundColor: "#e0e0e0",
    borderRadius: 5,
  },
  resultText: {
    fontSize: 16,
    marginBottom: 5,
  },
});
