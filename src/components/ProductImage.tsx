import React from "react";
import { Image } from "react-native";

interface ProductImageProps {
  uri: string;
  outOfStock?: boolean;
}

const ProductImage: React.FC<ProductImageProps> = ({ uri, outOfStock }) => {
  return (
    <Image
      source={{ uri }}
      className={`mt-2 w-75 h-48 mb-4 rounded-xl ${outOfStock && "opacity-50"}`}
    />
  );
};

export default ProductImage;
