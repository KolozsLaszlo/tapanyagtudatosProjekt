import React, { useState } from "react";
import { View, Text, TextInput, Pressable, Alert } from "react-native";
import { useSQLiteContext } from "expo-sqlite";

const RegisterScreen = ({ navigation }) => {
  const db = useSQLiteContext();
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

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
      <TextInput
        style={styles.input}
        placeholder="Jelszó"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <TextInput
        style={styles.input}
        placeholder="Jelszó megerősítése"
        secureTextEntry
        value={confirmPassword}
        onChangeText={setConfirmPassword}
      />
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
  },
};

export default RegisterScreen;
