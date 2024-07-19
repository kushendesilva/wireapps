import React from "react";
import { View } from "react-native";
import ProductInfo from "./ProductInfo";
import SizePicker from "./SizePicker";
import { Product } from "../store";
import AppButton from "./AppButton";

interface DetailsCardProps {
  product: Product;
  selectedSize: string | null;
  setSelectedSize: (size: string | null) => void;
  addToCart: (product: Product, size: string) => void;
  removeFromCart: (productId: string, size: string) => void;
  viewCart: () => void;
  cartItem: { quantity: number } | undefined;
  updateCartItemQuantity: (productId: string, quantity: number) => void;
}

const DetailsCard: React.FC<DetailsCardProps> = ({
  product,
  selectedSize,
  setSelectedSize,
  addToCart,
  removeFromCart,
  viewCart,
  cartItem,
}) => {
  return (
    <View className="p-4">
      <ProductInfo product={product} />
      <SizePicker
        enabled={product.stockStatus === "OUT OF STOCK" ? false : true}
        sizes={product.sizes}
        selectedSize={selectedSize}
        onValueChange={setSelectedSize}
      />
      {cartItem ? (
        <View className="items-center">
          <AppButton
            style="bg-black"
            text="View Cart"
            textStyle="text-white"
            onPress={viewCart}
          />
          <AppButton
            style="bg-red-700"
            text="Remove from Cart"
            textStyle="text-white"
            onPress={() => removeFromCart(product.id, selectedSize as string)}
          />
        </View>
      ) : (
        <View className="items-center">
          <AppButton
            disabled={product.stockStatus === "OUT OF STOCK" ? true : false}
            style={
              product.stockStatus === "OUT OF STOCK"
                ? "bg-gray-400"
                : "bg-black"
            }
            text="Add to Cart"
            textStyle="text-white"
            onPress={() => selectedSize && addToCart(product, selectedSize)}
          />
        </View>
      )}
    </View>
  );
};

export default DetailsCard;
