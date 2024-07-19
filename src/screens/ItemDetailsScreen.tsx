import React, { useEffect, useState } from "react";
import { View, Text, Button, Image } from "react-native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RouteProp } from "@react-navigation/native";
import { Picker } from "@react-native-picker/picker";
import { useProductStore, Product } from "../store";
import { RootStackParamList } from "../navigation";
import { StatusBar } from "expo-status-bar";

type ItemDetailsScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "ItemDetails"
>;
type ItemDetailsScreenRouteProp = RouteProp<RootStackParamList, "ItemDetails">;

interface Props {
  navigation: ItemDetailsScreenNavigationProp;
  route: ItemDetailsScreenRouteProp;
}

const ItemDetailsScreen: React.FC<Props> = ({ route, navigation }) => {
  const { productId } = route.params;
  const { getProductDetails, cart, addToCart, updateCartItemQuantity } =
    useProductStore();
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
    <View>
      <StatusBar style="light" />
      <Image
        source={{ uri: productDetails.mainImage }}
        style={{ width: 200, height: 200 }}
      />
      <Text>{productDetails.name}</Text>
      <Text>{productDetails.brandName}</Text>
      <Text>
        {productDetails.price.amount} {productDetails.price.currency}
      </Text>
      <Text>{productDetails.description}</Text>
      <Text>{productDetails.stockStatus}</Text>
      <Text>{productDetails.colour}</Text>
      <Text>Available sizes:</Text>
      <Picker
        selectedValue={selectedSize}
        onValueChange={(itemValue: React.SetStateAction<string | null>) =>
          setSelectedSize(itemValue)
        }
        style={{ height: 50, width: 150 }}
      >
        {productDetails.sizes.map((size) => (
          <Picker.Item key={size} label={size} value={size} />
        ))}
      </Picker>
      {cartItem ? (
        <View>
          <Button
            title="-"
            onPress={() =>
              updateCartItemQuantity(productDetails.id, cartItem.quantity - 1)
            }
          />
          <Text>{cartItem.quantity}</Text>
          <Button
            title="+"
            onPress={() =>
              updateCartItemQuantity(productDetails.id, cartItem.quantity + 1)
            }
          />
        </View>
      ) : (
        <Button
          title="Add to Cart"
          onPress={() =>
            selectedSize && addToCart(productDetails, selectedSize)
          }
        />
      )}
      <Button
        title="Go to Cart"
        onPress={() => navigation.navigate("ShoppingCart")}
      />
    </View>
  );
};

export default ItemDetailsScreen;
