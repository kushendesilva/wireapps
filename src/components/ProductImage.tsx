import React from "react";
import { Image } from "react-native";

interface ProductImageProps {
  uri: string;
}

const ProductImage: React.FC<ProductImageProps> = ({ uri }) => {
  return <Image source={{ uri }} className="w-48 h-48 mb-4" />;
};

export default ProductImage;
