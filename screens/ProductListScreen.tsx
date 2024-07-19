import React, { useEffect } from "react";
import { View, Text, FlatList, Button, Image } from "react-native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useProductStore } from "../store/useProductStore";
import { en } from "../locales";

type RootStackParamList = {
  ProductList: undefined;
  ItemDetails: { productId: string };
  ShoppingCart: undefined;
};

type ProductListScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "ProductList"
>;

interface Props {
  navigation: ProductListScreenNavigationProp;
}

const ProductListScreen: React.FC<Props> = ({ navigation }) => {
  const { products, fetchProducts, loading, error } = useProductStore();

  useEffect(() => {
    fetchProducts();
  }, []);

  if (loading) return <Text>{en.loading}</Text>;
  if (error)
    return (
      <Text>
        {en.error} {error}
      </Text>
    );

  return (
    <FlatList
      data={products}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <View>
          <Image
            source={{ uri: item.mainImage }}
            style={{ width: 100, height: 100 }}
          />
          <Text>{item.name}</Text>
          <Text>{item.brandName}</Text>
          <Text>
            {item.price.amount} {item.price.currency}
          </Text>
          <Button
            title={en.view}
            onPress={() =>
              navigation.navigate("ItemDetails", { productId: item.id })
            }
          />
          <Button
            title={en.add + en.cart}
            onPress={() => useProductStore.getState().addToCart(item)}
          />
        </View>
      )}
    />
  );
};

export default ProductListScreen;
