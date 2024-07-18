import React from "react";
import { StatusBar } from "expo-status-bar";
import { Text, View } from "react-native";

interface HomeScreenProps {}

const HomeScreen: React.FC<HomeScreenProps> = () => {
  return (
    <View className="flex-1 items-center justify-center bg-white">
      <Text>Home Screen</Text>
      <StatusBar style="auto" />
    </View>
  );
};

export default HomeScreen;
