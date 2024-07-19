import React from "react";
import { View } from "react-native";
import { StatusBar } from "expo-status-bar";

interface ScreenWrapperProps {
  children: React.ReactNode;
}

const ScreenWrapper: React.FC<ScreenWrapperProps> = ({ children }) => {
  return (
    <View className="flex-1 bg-dark">
      <StatusBar style="light" />
      {children}
    </View>
  );
};

export default ScreenWrapper;
