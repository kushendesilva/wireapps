import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import {
  ProductListScreen,
  ProductDetailsScreen,
  ShoppingCartScreen,
} from "../screens";
import { IconButton } from "../components";

export type RootStackParamList = {
  ProductList: undefined;
  ProductDetails: { productId: string; name: string };
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
              <IconButton onPress={() => navigation.navigate("ShoppingCart")} />
            ),
          })}
        />
        <Stack.Screen
          name="ProductDetails"
          component={ProductDetailsScreen}
          options={({ route, navigation }) => ({
            title: route.params.name,
            headerRight: () => (
              <IconButton onPress={() => navigation.navigate("ShoppingCart")} />
            ),
          })}
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
