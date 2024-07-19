import React from "react";
import { TouchableOpacity, Text, Image, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigation";
import { Product } from "../store";

type ProductCardNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "ProductDetails"
>;

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const navigation = useNavigation<ProductCardNavigationProp>();

  const truncateText = (text: string, maxLength: number) => {
    return text.length > maxLength
      ? text.substring(0, maxLength) + "..."
      : text;
  };

  return (
    <TouchableOpacity
      className="p-4 bg-white rounded-2xl shadow-md h-32 w-full flex-[1] overflow-hidden"
      onPress={() =>
        navigation.navigate("ProductDetails", {
          productId: product.id,
          name: product.name,
        })
      }
    >
      <View className="flex-row flex-[1]">
        <View className="relative rounded-2xl pr-6">
          <Image
            source={{ uri: product.mainImage }}
            className={`mb-2 self-center w-28 h-28 ${
              product.stockStatus === "OUT OF STOCK" ? "opacity-50" : ""
            }`}
          />
          {product.stockStatus === "OUT OF STOCK" && (
            <View className="absolute inset-0 flex items-center justify-center">
              <Text className="text-white text-md font-bold bg-red-500 px-2 py-1 rounded transform -rotate-45 absolute top-3 -left-8">
                OUT OF STOCK
              </Text>
            </View>
          )}
        </View>
        <View className="justify-center">
          <Text className="text-base font-bold mb-1">
            {truncateText(product.name, 25)}
          </Text>
          <Text className="text-sm text-gray-600 mb-1">
            {product.brandName ? product.brandName : "Unbranded"}
          </Text>
          <Text className="text-md font-semibold mb-2">
            {product.price.amount} {product.price.currency}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default ProductCard;
