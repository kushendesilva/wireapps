import React from "react";
import { View, Text, Image } from "react-native";
import { CartItem } from "../store";
import IconButton from "./IconButton";

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
    <View className="p-2 bg-white rounded-xl">
      <View className="flex-row justify-evenly">
        <Image source={{ uri: item.mainImage }} className="w-24 h-24" />
        <View className="justify-evenly">
          <View className="flex-row justify-evenly">
            <Text className="text-base text-gray-600 font-semibold">
              {item.price.currency === "GBP" ? "£" : item.price.currency}{" "}
              {item.price.amount}
            </Text>
            <Text className="text-base text-gray-600">
              Size:
              <Text className="text-base font-semibold text-gray-600">
                {item.selectedSize}
              </Text>
            </Text>
          </View>
          <View className="flex-row items-center mt-2">
            <View className="flex-row items-center border-black border rounded-full">
              <IconButton
                name="remove"
                tw="bg-black"
                onPress={() =>
                  updateCartItemQuantity(
                    item.id,
                    item.selectedSize,
                    item.quantity - 1
                  )
                }
              />
              <Text className="mx-4 text-lg">{item.quantity}</Text>
              <IconButton
                name="add"
                tw="bg-black"
                onPress={() =>
                  updateCartItemQuantity(
                    item.id,
                    item.selectedSize,
                    item.quantity + 1
                  )
                }
              />
            </View>
            <IconButton
              name="trash-bin"
              tw="bg-red-700 ml-2"
              onPress={() => removeFromCart(item.id, item.selectedSize)}
            />
          </View>
        </View>
      </View>
      <Text className="text-lg font-semibold text-center">{item.name}</Text>
    </View>
  );
};

export default CartItemCard;
