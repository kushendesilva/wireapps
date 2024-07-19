import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import {
  ProductListScreen,
  ItemDetailsScreen,
  ShoppingCartScreen,
} from "../screens";
import Ionicons from "@expo/vector-icons/Ionicons";

export type RootStackParamList = {
  ProductList: undefined;
  ItemDetails: { productId: string; name: string };
  ShoppingCart: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export const AppNavigator: React.FC = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: {
            backgroundColor: "black",
          },
          headerTintColor: "white",
          headerTitleStyle: {
            fontWeight: "bold",
          },
        }}
      >
        <Stack.Screen
          name="ProductList"
          component={ProductListScreen}
          options={({ navigation }) => ({
            title: "Products",
            headerRight: () => (
              <Ionicons
                name="cart"
                size={32}
                color="white"
                onPress={() => navigation.navigate("ShoppingCart")}
              />
            ),
          })}
        />
        <Stack.Screen
          name="ItemDetails"
          component={ItemDetailsScreen}
          options={({ route }) => ({ title: route.params.name })}
        />
        <Stack.Screen
          name="ShoppingCart"
          component={ShoppingCartScreen}
          options={{ title: "Cart" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
