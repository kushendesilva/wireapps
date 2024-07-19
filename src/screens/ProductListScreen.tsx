import React, { useEffect } from "react";
import { Text, FlatList, TextInput, View } from "react-native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useProductStore } from "../store";
import { RootStackParamList } from "../navigation";
import {
  ScreenWrapper,
  ProductCard,
  EmptyListCard,
  IconButton,
} from "../components";

type ProductListScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "ProductList"
>;

interface Props {
  navigation: ProductListScreenNavigationProp;
}

const ProductListScreen: React.FC<Props> = () => {
  const {
    fetchProducts,
    filteredProducts,
    searchQuery,
    loading,
    error,
    setSearchQuery,
    applySearch,
    clearSearchQuery,
  } = useProductStore();

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  if (loading) return <Text>Loading...</Text>;
  if (error) return <Text>Error: {error}</Text>;

  return (
    <ScreenWrapper>
      <View className="flex-row items-center m-2">
        <TextInput
          className="flex-1 rounded-lg h-12 p-2 mr-1 bg-white"
          placeholder="Search products..."
          value={searchQuery}
          onChangeText={(text) => setSearchQuery(text)}
        />
        {searchQuery && (
          <IconButton
            name="close"
            color="black"
            tw="bg-white mr-1"
            onPress={clearSearchQuery}
          />
        )}
        <IconButton
          name="search"
          color="black"
          tw="bg-white"
          onPress={applySearch}
        />
      </View>
      <FlatList
        renderItem={({ item }) => (
          <View className="h-32 w-full m-2">
            <ProductCard product={item} />
          </View>
        )}
        // columnWrapperStyle={{ justifyContent: "space-between" }}
        // numColumns={2}
        data={filteredProducts}
        keyExtractor={(item) => item.id}
        ListEmptyComponent={() => <EmptyListCard list="Products" multiple />}
      />
    </ScreenWrapper>
  );
};

export default ProductListScreen;
