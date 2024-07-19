import React, { useEffect, useState } from "react";
import { View, Text, Button, Image } from "react-native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RouteProp } from "@react-navigation/native";
import { useProductStore } from "../store/useProductStore";
import { Product } from "../store/useProductStore";
import { en } from "../locales";

type RootStackParamList = {
  ItemDetails: { productId: string };
  ShoppingCart: undefined;
};

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
  const { getProductDetails } = useProductStore();
  const [productDetails, setProductDetails] = useState<Product | null>(null);

  useEffect(() => {
    const product = getProductDetails(productId);
    setProductDetails(product || null);
  }, [productId]);

  if (!productDetails) return <Text>{en.product + en.notFound}</Text>;

  return (
    <View>
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
      <Text>
        {en.sizes} {productDetails.sizes.join(", ")}
      </Text>
      <Button
        title={en.add + en.cart}
        onPress={() => useProductStore.getState().addToCart(productDetails)}
      />
      <Button
        title={en.go + en.cart}
        onPress={() => navigation.navigate("ShoppingCart")}
      />
    </View>
  );
};

export default ItemDetailsScreen;
