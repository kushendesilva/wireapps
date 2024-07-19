import React from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import { TouchableOpacity, TouchableOpacityProps } from "react-native";

interface IconButtonProps extends TouchableOpacityProps {
  onPress: () => void;
  name?: any;
  color?: string;
  tw?: string;
}

const IconButton: React.FC<IconButtonProps> = ({
  name = "cart",
  color = "white",
  tw = "",
  onPress,
  ...props
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      className={`w-10 h-10 rounded-full justify-center items-center ${tw}`}
      {...props}
    >
      <Ionicons name={name} size={24} color={color} />
    </TouchableOpacity>
  );
};

export default IconButton;
