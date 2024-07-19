import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import {
  ProductListScreen,
  ItemDetailsScreen,
  ShoppingCartScreen,
} from "./screens";

type RootStackParamList = {
  ProductList: undefined;
  ItemDetails: { productId: string };
  ShoppingCart: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const App: React.FC = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="ProductList" component={ProductListScreen} />
        <Stack.Screen name="ItemDetails" component={ItemDetailsScreen} />
        <Stack.Screen name="ShoppingCart" component={ShoppingCartScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
