import React from "react";
import { View, Text, FlatList, Button, Image } from "react-native";
import { useProductStore } from "../store";
import { StatusBar } from "expo-status-bar";

const ShoppingCartScreen: React.FC = () => {
  const { cart, updateCartItemQuantity } = useProductStore();

  return (
    <FlatList
      data={cart}
      keyExtractor={(item) => item.id + item.selectedSize}
      renderItem={({ item }) => (
        <View>
          <StatusBar style="light" />
          <Image
            source={{ uri: item.mainImage }}
            style={{ width: 100, height: 100 }}
          />
          <Text>{item.name}</Text>
          <Text>
            {item.price.amount} {item.price.currency}
          </Text>
          <Text>Size: {item.selectedSize}</Text>
          <View>
            <Button
              title="-"
              onPress={() => updateCartItemQuantity(item.id, item.quantity - 1)}
            />
            <Text>{item.quantity}</Text>
            <Button
              title="+"
              onPress={() => updateCartItemQuantity(item.id, item.quantity + 1)}
            />
          </View>
        </View>
      )}
    />
  );
};

export default ShoppingCartScreen;
