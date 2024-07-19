import React from "react";
import { View, Text, Image, Button } from "react-native";
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

  return (
    <View className="p-4 m-2 bg-white rounded-lg shadow-md">
      <Image
        source={{ uri: product.mainImage }}
        style={{ width: 100, height: 100 }}
        className="mb-2"
      />
      <Text className="text-xl font-bold mb-1">{product.name}</Text>
      <Text className="text-sm text-gray-600 mb-1">{product.brandName}</Text>
      <Text className="text-md font-semibold mb-2">
        {product.price.amount} {product.price.currency}
      </Text>
      <Button
        title="View Details"
        onPress={() =>
          navigation.navigate("ProductDetails", {
            productId: product.id,
            name: product.name,
          })
        }
      />
    </View>
  );
};

export default ProductCard;
