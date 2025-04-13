import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Pressable,
  Alert,
  TouchableOpacity,
} from "react-native";
import { useSQLiteContext } from "expo-sqlite";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const RegisterScreen = ({ navigation }) => {
  const db = useSQLiteContext();
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleRegister = async () => {
    if (!userName || !password || !confirmPassword) {
      Alert.alert("Figyelem!", "Kérjük, töltsön ki minden mezőt.");
      return;
    }
    if (password !== confirmPassword) {
      Alert.alert("Hiba", "A jelszavak nem egyeznek.");
      return;
    }
    try {
      const existingUser = await db.getFirstAsync(
        "SELECT * FROM users WHERE username = ?",
        [userName]
      );
      if (existingUser) {
        Alert.alert("Hiba", "A felhasználónév már létezik.");
        return;
      }
      await db.runAsync(
        "INSERT INTO users (username, password) VALUES (?, ?)",
        [userName, password]
      );
      Alert.alert("Siker", "Sikeres regisztráció!");
      navigation.replace("Main", { user: userName });
    } catch (error) {
      console.log("Hiba a regisztráció során:", error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Regisztráció</Text>
      <TextInput
        style={styles.input}
        placeholder="Felhasználónév"
        value={userName}
        onChangeText={setUserName}
      />
      <View style={styles.passwordWrapper}>
        <TextInput
          style={styles.inputWithIcon}
          placeholder="Jelszó"
          secureTextEntry={!showPassword}
          value={password}
          onChangeText={setPassword}
        />
        <TouchableOpacity
          onPress={() => setShowPassword(!showPassword)}
          style={styles.eyeIcon}
        >
          <MaterialCommunityIcons
            name={showPassword ? "eye" : "eye-off"}
            size={24}
            color="#888"
          />
        </TouchableOpacity>
      </View>

      <View style={styles.passwordWrapper}>
        <TextInput
          style={styles.inputWithIcon}
          placeholder="Jelszó megerősítése"
          secureTextEntry={!showConfirmPassword}
          value={confirmPassword}
          onChangeText={setConfirmPassword}
        />
        <TouchableOpacity
          onPress={() => setShowConfirmPassword(!showConfirmPassword)}
          style={styles.eyeIcon}
        >
          <MaterialCommunityIcons
            name={showConfirmPassword ? "eye" : "eye-off"}
            size={24}
            color="#888"
          />
        </TouchableOpacity>
      </View>

      <Pressable onPress={handleRegister} style={styles.button}>
        <Text style={styles.buttonText}>Regisztráció</Text>
      </Pressable>
      <Pressable onPress={() => navigation.navigate("Login")}>
        <Text style={styles.registerText}>Van már fiókja? Bejelentkezés</Text>
      </Pressable>
    </View>
  );
};

const styles = {
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    width: "90%",
    padding: 15,
    fontSize: 18,
    borderRadius: 10,
    marginVertical: 10,
  },
  passwordWrapper: {
    flexDirection: "row",
    alignItems: "center",
    width: "90%",
    marginVertical: 10,
  },
  inputWithIcon: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 15,
    fontSize: 18,
    borderRadius: 10,
  },
  eyeIcon: {
    position: "absolute",
    right: 10,
    padding: 10,
  },
  button: {
    backgroundColor: "blue",
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 10,
    marginTop: 20,
  },
  buttonText: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
  },
  registerText: {
    fontSize: 18,
    color: "blue",
    marginTop: 20,
    textDecorationLine: "underline",
    textAlign: "center",
  },
};

export default RegisterScreen;
