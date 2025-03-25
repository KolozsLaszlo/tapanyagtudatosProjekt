import React, { useState } from "react";
import { View, Text, TextInput, Pressable, Alert } from "react-native";
import { useSQLiteContext } from "expo-sqlite";

const LoginScreen = ({ navigation }) => {
  const db = useSQLiteContext();
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    if (!userName || !password) {
      Alert.alert(
        "Figyelem",
        "Kérjük, adja meg a felhasználónevet és a jelszót"
      );
      return;
    }
    try {
      const user = await db.getFirstAsync(
        "SELECT * FROM users WHERE username = ? AND password = ?",
        [userName, password]
      );
      if (user) {
        Alert.alert("Siker", "Sikeres bejelentkezés");
        navigation.replace("Main", { user: userName });
      } else {
        Alert.alert("Hiba", "Érvénytelen felhasználónév vagy jelszó");
      }
    } catch (error) {
      console.log("Hiba a bejelentkezés során:", error);
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text style={{ fontSize: 24 }}>Bejelentkezés</Text>
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
      <Pressable
        onPress={handleLogin}
        style={{ backgroundColor: "blue", padding: 10, borderRadius: 5 }}
      >
        <Text style={{ color: "white" }}>Bejelentkezés</Text>
      </Pressable>
      <Pressable onPress={() => navigation.navigate("Register")}>
        <Text>Nincs fiókja? Regisztráció</Text>
      </Pressable>
    </View>
  );
};

export default LoginScreen;
