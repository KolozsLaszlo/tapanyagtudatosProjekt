import React from "react";
import { View, Text } from "react-native";

const ProfileScreen = ({ user }) => {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text style={{ fontSize: 24 }}>👤 Profile - {user}</Text>
    </View>
  );
};

export default ProfileScreen;
