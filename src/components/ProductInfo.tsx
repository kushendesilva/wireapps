import React from "react";
import { View, Text } from "react-native";
import { Product } from "../store";
import ProductImage from "./ProductImage";

interface ProductInfoProps {
  product: Product;
}

const ProductInfo: React.FC<ProductInfoProps> = ({ product }) => {
  return (
    <View>
      <Text className="text-xl font-bold">{product.name}</Text>
      <Text className="text-sm text-gray-600">
        {product.brandName ? product.brandName : "Unbranded"}
      </Text>
      <ProductImage
        uri={product.mainImage}
        outOfStock={product.stockStatus === "OUT OF STOCK" ? true : false}
      />
      <View className="flex-row items-center justify-between">
        <Text className="text-lg font-semibold">
          {product.price.currency === "GBP" ? "£" : product.price.currency}{" "}
          {product.price.amount}
        </Text>
        <View
          className={`${
            product.stockStatus === "OUT OF STOCK"
              ? "bg-red-400"
              : "bg-green-400"
          } rounded-xl px-2 py-1`}
        >
          <Text className="text-black">{product.stockStatus}</Text>
        </View>
      </View>
      <Text className="text-gray-600 mt-2">{product.description}</Text>
      <View className="flex-row justify-between mt-2">
        <Text className="text-gray-600 text-base font-semibold">Color:</Text>
        <View className={`bg-white border border-black px-4 py-1 rounded-full`}>
          <Text className="text-black">
            {product.colour[0].toUpperCase() + product.colour.substring(1)}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default ProductInfo;
