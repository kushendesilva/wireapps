import React, { useEffect, useState } from "react";
import { View, Text, FlatList, Button, Image, TextInput } from "react-native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useProductStore } from "../store";
import { RootStackParamList } from "../navigation";
import { StatusBar } from "expo-status-bar";

type ProductListScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "ProductList"
>;

interface Props {
  navigation: ProductListScreenNavigationProp;
}

const ProductListScreen: React.FC<Props> = ({ navigation }) => {
  const { products, fetchProducts, loading, error } = useProductStore();
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [filteredProducts, setFilteredProducts] = useState(products);

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    setFilteredProducts(
      products.filter((product) =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
    );
  }, [searchQuery, products]);

  if (loading) return <Text>Loading...</Text>;
  if (error) return <Text>Error: {error}</Text>;

  return (
    <View>
      <StatusBar style="light" />
      <TextInput
        placeholder="Search products..."
        value={searchQuery}
        onChangeText={(text) => setSearchQuery(text)}
        style={{ height: 40, borderColor: "gray", borderWidth: 1, margin: 10 }}
      />
      <FlatList
        data={filteredProducts}
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
              title="View Details"
              onPress={() =>
                navigation.navigate("ItemDetails", {
                  productId: item.id,
                  name: item.name,
                })
              }
            />
          </View>
        )}
      />
    </View>
  );
};

export default ProductListScreen;
