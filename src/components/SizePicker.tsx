import React from "react";
import { View, Text } from "react-native";
import { Picker } from "@react-native-picker/picker";

interface SizePickerProps {
  sizes: string[];
  selectedSize: string | null;
  onValueChange: (value: string) => void;
}

const SizePicker: React.FC<SizePickerProps> = ({
  sizes,
  selectedSize,
  onValueChange,
}) => {
  return (
    <View className="mb-4">
      <Text className="text-gray-600 mb-2">Available sizes:</Text>
      <Picker
        selectedValue={selectedSize as string}
        onValueChange={onValueChange}
        style={{ height: 50, width: 150 }}
      >
        {sizes.map((size) => (
          <Picker.Item key={size} label={size} value={size} />
        ))}
      </Picker>
    </View>
  );
};

export default SizePicker;
