import React from "react";
import { View, Text } from "react-native";

interface EmptyListCardProps {
  list: string;
  multiple?: boolean;
}

const EmptyListCard: React.FC<EmptyListCardProps> = ({
  list = "List",
  multiple = false,
}) => {
  return (
    <View className="flex-1 justify-center items-center bg-white p-4">
      <Text className="text-xl font-bold">
        {list} {multiple ? "are" : "is"} empty
      </Text>
    </View>
  );
};

export default EmptyListCard;
