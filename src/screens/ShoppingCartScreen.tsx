import React from "react";
import { FlatList, View } from "react-native";
import { useProductStore } from "../store";
import { ScreenWrapper, CartItemCard, EmptyListCard } from "../components";

const ShoppingCartScreen: React.FC = () => {
  const { cart, updateCartItemQuantity, removeFromCart } = useProductStore();

  return (
    <ScreenWrapper>
      <FlatList
        data={cart}
        keyExtractor={(item) => item.id + item.selectedSize}
        renderItem={({ item }) => (
          <View className="mx-2 my-1">
            <CartItemCard
              item={item}
              updateCartItemQuantity={updateCartItemQuantity}
              removeFromCart={removeFromCart}
            />
          </View>
        )}
        ListEmptyComponent={() => <EmptyListCard list="Shopping Cart" />}
      />
    </ScreenWrapper>
  );
};

export default ShoppingCartScreen;
