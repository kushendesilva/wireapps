import React from "react";
import { TouchableOpacity, Text } from "react-native";

interface AppButtonProps {
  onPress: () => void;
  text: string;
  style?: string;
  textStyle?: string;
  disabled?: boolean;
}

const AppButton: React.FC<AppButtonProps> = ({
  text = "Button",
  style,
  textStyle,
  onPress,
  disabled = false,
}) => {
  return (
    <TouchableOpacity
      disabled={disabled}
      onPress={onPress}
      className={`m-1 w-full h-10 rounded-lg justify-center items-center ${style}`}
    >
      <Text className={`text-lg font-semibold text-center ${textStyle}`}>
        {text}
      </Text>
    </TouchableOpacity>
  );
};

export default AppButton;
