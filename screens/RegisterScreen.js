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
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text style={{ fontSize: 24 }}>Regisztráció</Text>
      <TextInput
        style={{ borderWidth: 1, width: "80%", marginVertical: 5 }}
        placeholder="Felhasználónév"
        value={userName}
        onChangeText={setUserName}
      />
      <TextInput
        style={{ borderWidth: 1, width: "80%", marginVertical: 5 }}
        placeholder="Jelszó"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <TextInput
        style={{ borderWidth: 1, width: "80%", marginVertical: 5 }}
        placeholder="Jelszó megerősítése"
        secureTextEntry
        value={confirmPassword}
        onChangeText={setConfirmPassword}
      />
      <Pressable
        onPress={handleRegister}
        style={{ backgroundColor: "blue", padding: 10, borderRadius: 5 }}
      >
        <Text style={{ color: "white" }}>Regisztráció</Text>
      </Pressable>
      <Pressable onPress={() => navigation.navigate("Login")}>
        <Text style={{ color: "black" }}>Van már fiókja? Bejelentkezés</Text>
      </Pressable>
    </View>
  );
};

export default RegisterScreen;
