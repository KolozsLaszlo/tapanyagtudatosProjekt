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
  ScrollView,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Picker } from "@react-native-picker/picker";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const CalculatorScreen = () => {
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("Férfi");
  const [activity, setActivity] = useState("Minimális aktivitás (ülőmunka)");
  const [goal, setGoal] = useState("Súlytartás");
  const [result, setResult] = useState(null);
  const [errors, setErrors] = useState({
    weight: false,
    height: false,
    age: false,
  });

  const activityOptions = {
    "Minimális aktivitás (ülőmunka)": 1.2,
    "Enyhe aktivitás (heti 1-3 edzés)": 1.375,
    "Közepes aktivitás (rendszeres edzés)": 1.55,
    "Nagy aktivitás (napi intenzív edzés)": 1.725,
    "Extrém aktivitás (versenysport)": 1.9,
  };

  const calculateCalories = () => {
    const weightValid = weight.trim() !== "" && !isNaN(weight);
    const heightValid = height.trim() !== "" && !isNaN(height);
    const ageValid = age.trim() !== "" && !isNaN(age);

    if (!weightValid || !heightValid || !ageValid) {
      setErrors({
        weight: !weightValid,
        height: !heightValid,
        age: !ageValid,
      });
      setResult(null);
      return;
    }

    setErrors({ weight: false, height: false, age: false });

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

    let calories = bmr * activityOptions[activity];

    if (goal === "Fogyás") calories -= 500;
    if (goal === "Tömegnövelés") calories += 300;

    setResult({
      calories: Math.round(calories),
      protein: Math.round((calories * 0.3) / 4),
      fat: Math.round((calories * 0.25) / 9),
      carbs: Math.round((calories * 0.45) / 4),
    });
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView style={{ flex: 1 }} behavior="height">
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <ScrollView
            contentContainerStyle={styles.scrollContainer}
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
          >
            <Text style={styles.title}>⚡ Kalória Kalkulátor</Text>

            <View
              style={[styles.inputWrapper, errors.weight && styles.inputError]}
            >
              <MaterialCommunityIcons
                name="weight-kilogram"
                size={24}
                color="#888"
              />
              <TextInput
                style={styles.input}
                placeholder="Súly (kg)"
                placeholderTextColor="#888"
                keyboardType="decimal-pad"
                value={weight}
                onChangeText={setWeight}
              />
            </View>
            {errors.weight && (
              <Text style={styles.errorText}>Kérlek, add meg a súlyod!</Text>
            )}

            <View
              style={[styles.inputWrapper, errors.height && styles.inputError]}
            >
              <MaterialCommunityIcons
                name="human-male-height"
                size={24}
                color="#888"
              />
              <TextInput
                style={styles.input}
                placeholder="Magasság (cm)"
                placeholderTextColor="#888"
                keyboardType="decimal-pad"
                value={height}
                onChangeText={setHeight}
              />
            </View>
            {errors.height && (
              <Text style={styles.errorText}>
                Kérlek, add meg a magasságod!
              </Text>
            )}

            <View
              style={[styles.inputWrapper, errors.age && styles.inputError]}
            >
              <MaterialCommunityIcons
                name="calendar-account"
                size={24}
                color="#888"
              />
              <TextInput
                style={styles.input}
                placeholder="Életkor (év)"
                placeholderTextColor="#888"
                keyboardType="decimal-pad"
                value={age}
                onChangeText={setAge}
              />
            </View>
            {errors.age && (
              <Text style={styles.errorText}>
                Kérlek, add meg az életkorod!
              </Text>
            )}

            <Text style={styles.label}>Nem</Text>
            <View style={styles.pickerBox}>
              <Picker
                selectedValue={gender}
                onValueChange={(itemValue) => setGender(itemValue)}
              >
                <Picker.Item label="Férfi" value="Férfi" />
                <Picker.Item label="Nő" value="Nő" />
              </Picker>
            </View>

            <Text style={styles.label}>Aktivitás szint</Text>
            <View style={styles.pickerBox}>
              <Picker
                selectedValue={activity}
                onValueChange={(itemValue) => setActivity(itemValue)}
              >
                {Object.keys(activityOptions).map((key) => (
                  <Picker.Item key={key} label={key} value={key} />
                ))}
              </Picker>
            </View>

            <Text style={styles.label}>Cél</Text>
            <View style={styles.pickerBox}>
              <Picker
                selectedValue={goal}
                onValueChange={(itemValue) => setGoal(itemValue)}
              >
                <Picker.Item label="Fogyás" value="Fogyás" />
                <Picker.Item label="Súlytartás" value="Súlytartás" />
                <Picker.Item label="Tömegnövelés" value="Tömegnövelés" />
              </Picker>
            </View>

            <TouchableOpacity style={styles.button} onPress={calculateCalories}>
              <MaterialCommunityIcons
                name="calculator-variant"
                size={20}
                color="#fff"
              />
              <Text style={styles.buttonText}>Számítás</Text>
            </TouchableOpacity>

            {result && (
              <View style={styles.resultContainer}>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    marginBottom: 12,
                  }}
                >
                  <Text style={styles.resultTitle}>
                    📊 Eredmény (Napi bevitelek)
                  </Text>
                  <TouchableOpacity
                    onPress={() =>
                      Alert.alert(
                        "Mit számol a kalkulátor?",
                        "A kalkulátor a BMR-t (alapanyagcserét) számolja ki, majd ezt szorozza az aktivitási szinteddel. A célod alapján csökkenti vagy növeli a napi ajánlott kalóriát."
                      )
                    }
                  >
                    <MaterialCommunityIcons
                      name="information-outline"
                      size={20}
                      color="#555"
                      style={{ marginLeft: 6 }}
                    />
                  </TouchableOpacity>
                </View>

                <View style={styles.highlightBox}>
                  <Text style={styles.highlightLabel}>
                    Ajánlott napi kalóriabevitel
                  </Text>
                  <Text style={styles.highlightValue}>
                    {result.calories} kcal
                  </Text>
                </View>

                <Text style={styles.explanationText}>
                  A választott célod alapján{" "}
                  {(goal === "Fogyás" && "500 kcal-val csökkentett") ||
                    (goal === "Tömegnövelés" && "300 kcal-val megnövelt") ||
                    "megtartott"}{" "}
                  értéket adtunk meg.
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
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default CalculatorScreen;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#FAFAFA",
  },
  scrollContainer: {
    padding: 20,
    paddingBottom: 50,
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
    color: "#333",
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 12,
    paddingHorizontal: 10,
    paddingVertical: 10,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: "#E0E0E0",
  },
  input: {
    flex: 1,
    fontSize: 16,
    marginLeft: 10,
    color: "#000",
  },
  label: {
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 5,
    marginTop: 10,
    color: "#666",
  },
  pickerBox: {
    backgroundColor: "#fff",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#E0E0E0",
    marginBottom: 15,
    overflow: "hidden",
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#007BFF",
    padding: 16,
    borderRadius: 12,
    marginTop: 15,
    gap: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 5,
    elevation: 3,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  resultContainer: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 20,
    marginTop: 25,
    borderWidth: 1,
    borderColor: "#ddd",
    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 2,
  },
  resultTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  resultText: {
    fontSize: 16,
    marginBottom: 5,
    color: "#555",
  },
  highlightBox: {
    backgroundColor: "#E3F2FD",
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    alignItems: "center",
  },
  highlightLabel: {
    fontSize: 14,
    color: "#1565C0",
    marginBottom: 4,
  },
  highlightValue: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#0D47A1",
  },
  explanationText: {
    fontSize: 14,
    color: "#666",
    marginTop: 10,
    lineHeight: 20,
  },
  inputError: {
    borderColor: "#FF4D4D",
  },
  errorText: {
    color: "#FF4D4D",
    fontSize: 13,
    marginTop: -10,
    marginBottom: 10,
    marginLeft: 5,
  },
});
