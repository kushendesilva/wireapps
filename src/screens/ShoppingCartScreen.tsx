import React from "react";
import { FlatList } from "react-native";
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
          <CartItemCard
            item={item}
            updateCartItemQuantity={updateCartItemQuantity}
            removeFromCart={removeFromCart}
          />
        )}
        ListEmptyComponent={() => <EmptyListCard list="Shopping Cart" />}
      />
    </ScreenWrapper>
  );
};

export default ShoppingCartScreen;
