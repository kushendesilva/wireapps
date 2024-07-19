import React, { useEffect, useState } from "react";
import { Text, FlatList, TextInput } from "react-native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useProductStore } from "../store";
import { RootStackParamList } from "../navigation";
import { ScreenWrapper, ProductCard, EmptyListCard } from "../components";

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
    <ScreenWrapper>
      <TextInput
        placeholder="Search products..."
        value={searchQuery}
        onChangeText={(text) => setSearchQuery(text)}
        style={{ height: 40, borderColor: "gray", borderWidth: 1, margin: 10 }}
      />
      <FlatList
        data={filteredProducts}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <ProductCard product={item} />}
        ListEmptyComponent={() => <EmptyListCard list="Products" multiple />}
      />
    </ScreenWrapper>
  );
};

export default ProductListScreen;
