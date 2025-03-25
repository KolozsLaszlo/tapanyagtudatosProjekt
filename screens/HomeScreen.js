import React from "react";
import { View, Text } from "react-native";

const HomeScreen = ({ user }) => {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text style={{ fontSize: 24 }}>🏠 Home - {user}</Text>
    </View>
  );
};
export default HomeScreen;
