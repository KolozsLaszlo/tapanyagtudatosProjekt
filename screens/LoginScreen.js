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
import AsyncStorage from "@react-native-async-storage/async-storage";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const LoginScreen = ({ navigation }) => {
  const db = useSQLiteContext();
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

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
        await AsyncStorage.setItem("currentUserId", userName);
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
    <View style={styles.container}>
      <Text style={styles.title}>Bejelentkezés</Text>
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
      <Pressable onPress={handleLogin} style={styles.button}>
        <Text style={styles.buttonText}>Bejelentkezés</Text>
      </Pressable>
      <Pressable onPress={() => navigation.navigate("Register")}>
        <Text style={styles.registerText}>Nincs fiókja? Regisztráció</Text>
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
    padding: 20,
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
    padding: 20,
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
    width: "90%",
  },
};

export default LoginScreen;
