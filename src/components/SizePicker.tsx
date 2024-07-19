import React from "react";
import { View, Text } from "react-native";
import { Picker } from "@react-native-picker/picker";

interface SizePickerProps {
  sizes: string[];
  selectedSize: string | null;
  onValueChange: (value: string) => void;
  enabled?: boolean;
}

const SizePicker: React.FC<SizePickerProps> = ({
  sizes,
  selectedSize,
  onValueChange,
  enabled = true,
}) => {
  return (
    <View className="mb-4 flex-row items-center justify-between">
      <Text className="text-gray-600 mb-2  text-base font-semibold">
        Available sizes:
      </Text>
      <Picker
        enabled={enabled}
        selectedValue={selectedSize as string}
        onValueChange={onValueChange}
        style={{ height: 50, width: 100 }}
      >
        {sizes.map((size) => (
          <Picker.Item key={size} label={size} value={size} />
        ))}
      </Picker>
    </View>
  );
};

export default SizePicker;
