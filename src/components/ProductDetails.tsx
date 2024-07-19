import React from "react";
import { View, Button, Text } from "react-native";
import ProductImage from "./ProductImage";
import ProductInfo from "./ProductInfo";
import SizePicker from "./SizePicker";
import { Product } from "../store";

interface ProductDetailsProps {
  product: Product;
  selectedSize: string | null;
  setSelectedSize: (size: string | null) => void;
  addToCart: (product: Product, size: string) => void;
  cartItem: { quantity: number } | undefined;
  updateCartItemQuantity: (productId: string, quantity: number) => void;
}

const ProductDetails: React.FC<ProductDetailsProps> = ({
  product,
  selectedSize,
  setSelectedSize,
  addToCart,
  cartItem,
  updateCartItemQuantity,
}) => {
  return (
    <View className="p-4">
      <ProductImage uri={product.mainImage} />
      <ProductInfo product={product} />
      <SizePicker
        sizes={product.sizes}
        selectedSize={selectedSize}
        onValueChange={setSelectedSize}
      />
      {cartItem ? (
        <View className="flex flex-row items-center">
          <Button
            title="-"
            onPress={() =>
              updateCartItemQuantity(product.id, cartItem.quantity - 1)
            }
          />
          <Text className="mx-2">{cartItem.quantity}</Text>
          <Button
            title="+"
            onPress={() =>
              updateCartItemQuantity(product.id, cartItem.quantity + 1)
            }
          />
        </View>
      ) : (
        <Button
          title="Add to Cart"
          onPress={() => selectedSize && addToCart(product, selectedSize)}
        />
      )}
    </View>
  );
};

export default ProductDetails;
