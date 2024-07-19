import React, { useEffect, useState } from "react";
import { Text, Button } from "react-native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RouteProp } from "@react-navigation/native";
import { useProductStore, Product } from "../store";
import { RootStackParamList } from "../navigation";
import ScreenWrapper from "../components/ScreenWrapper";
import ProductDetails from "../components/ProductDetails";

type ProductDetailsScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "ProductDetails"
>;
type ProductDetailsScreenRouteProp = RouteProp<
  RootStackParamList,
  "ProductDetails"
>;

interface Props {
  navigation: ProductDetailsScreenNavigationProp;
  route: ProductDetailsScreenRouteProp;
}

const ProductDetailsScreen: React.FC<Props> = ({ route, navigation }) => {
  const { productId } = route.params;
  const {
    getProductDetails,
    cart,
    addToCart,
    removeFromCart,
    updateCartItemQuantity,
  } = useProductStore();
  const [productDetails, setProductDetails] = useState<Product | null>(null);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);

  useEffect(() => {
    const product = getProductDetails(productId);
    setProductDetails(product || null);
  }, [productId]);

  useEffect(() => {
    if (productDetails) {
      setSelectedSize(productDetails.sizes[0]);
    }
  }, [productDetails]);

  if (!productDetails) return <Text>Product not found</Text>;

  const cartItem = cart.find(
    (item) => item.id === productId && item.selectedSize === selectedSize
  );

  return (
    <ScreenWrapper>
      <ProductDetails
        product={productDetails}
        selectedSize={selectedSize}
        setSelectedSize={setSelectedSize}
        addToCart={(product, size) => addToCart(product, size)}
        cartItem={cartItem}
        updateCartItemQuantity={(productId, quantity) =>
          updateCartItemQuantity(productId, selectedSize || "", quantity)
        }
      />
      <Button
        title="Go to Cart"
        onPress={() => navigation.navigate("ShoppingCart")}
      />
    </ScreenWrapper>
  );
};

export default ProductDetailsScreen;
