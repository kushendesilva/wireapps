import React from "react";
import { View, Text } from "react-native";
import { Product } from "../store";

interface ProductInfoProps {
  product: Product;
}

const ProductInfo: React.FC<ProductInfoProps> = ({ product }) => {
  return (
    <View className="mb-4">
      <Text className="text-xl font-bold">{product.name}</Text>
      <Text className="text-sm text-gray-600">{product.brandName}</Text>
      <Text className="text-lg font-semibold">
        {product.price.amount} {product.price.currency}
      </Text>
      <Text className="text-gray-600">{product.description}</Text>
      <Text className="text-gray-600">{product.stockStatus}</Text>
      <Text className="text-gray-600">{product.colour}</Text>
    </View>
  );
};

export default ProductInfo;
