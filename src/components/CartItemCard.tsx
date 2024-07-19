import React from "react";
import { View, Text, Button, Image } from "react-native";
import { CartItem } from "../store";

interface CartItemCardProps {
  item: CartItem;
  updateCartItemQuantity: (
    productId: string,
    size: string,
    quantity: number
  ) => void;
  removeFromCart: (productId: string, size: string) => void;
}

const CartItemCard: React.FC<CartItemCardProps> = ({
  item,
  updateCartItemQuantity,
  removeFromCart,
}) => {
  return (
    <View className="p-4 border-b border-gray-200">
      <Image source={{ uri: item.mainImage }} className="w-24 h-24" />
      <Text className="text-lg font-semibold">{item.name}</Text>
      <Text className="text-sm text-gray-600">
        {item.price.amount} {item.price.currency}
      </Text>
      <Text className="text-sm text-gray-600">Size: {item.selectedSize}</Text>
      <View className="flex-row items-center mt-2">
        <Button
          title="-"
          onPress={() =>
            updateCartItemQuantity(
              item.id,
              item.selectedSize,
              item.quantity - 1
            )
          }
        />
        <Text className="mx-4">{item.quantity}</Text>
        <Button
          title="+"
          onPress={() =>
            updateCartItemQuantity(
              item.id,
              item.selectedSize,
              item.quantity + 1
            )
          }
        />
        <Button
          title="Remove"
          onPress={() => removeFromCart(item.id, item.selectedSize)}
          color="red"
        />
      </View>
    </View>
  );
};

export default CartItemCard;
