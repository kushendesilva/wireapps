import React from "react";
import { View, Text, FlatList, Button, Image } from "react-native";
import { useProductStore } from "../store/useProductStore";
import { en } from "../locales";

const ShoppingCartScreen: React.FC = () => {
  const { cart, removeFromCart } = useProductStore();

  return (
    <FlatList
      data={cart}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <View>
          <Image
            source={{ uri: item.mainImage }}
            style={{ width: 100, height: 100 }}
          />
          <Text>{item.name}</Text>
          <Text>
            {item.price.amount} {item.price.currency}
          </Text>
          <Button
            title={en.remove + en.cart}
            onPress={() => removeFromCart(item.id)}
          />
        </View>
      )}
    />
  );
};

export default ShoppingCartScreen;
