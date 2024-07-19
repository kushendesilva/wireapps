// src/store/useProductStore.ts
import { create } from "zustand";
import axios from "axios";

interface Price {
  amount: string;
  currency: string;
}

export interface Product {
  id: string;
  SKU: string;
  name: string;
  brandName: string;
  mainImage: string;
  price: Price;
  sizes: string[];
  stockStatus: string;
  colour: string;
  description: string;
}

export interface CartItem {
  id: string;
  SKU: string;
  name: string;
  brandName: string;
  mainImage: string;
  price: Price;
  sizes: string[];
  stockStatus: string;
  colour: string;
  description: string;
  quantity: number;
  selectedSize: string;
}

interface ProductStore {
  products: Product[];
  cart: CartItem[];
  productDetails: Product | null;
  loading: boolean;
  error: string | null;
  fetchProducts: () => Promise<void>;
  getProductDetails: (productId: string) => Product | undefined;
  addToCart: (product: Product, size: string) => void;
  removeFromCart: (productId: string, size: string) => void;
  updateCartItemQuantity: (
    productId: string,
    size: string,
    quantity: number
  ) => void;
}

export const useProductStore = create<ProductStore>((set, get) => ({
  products: [],
  cart: [],
  productDetails: null,
  loading: false,
  error: null,
  fetchProducts: async () => {
    set({ loading: true, error: null });
    try {
      if (!process.env.EXPO_PUBLIC_API_URL) {
        set({
          loading: false,
          error:
            "env not configured properly. Define EXPO_PUBLIC_API_URL (Refer README.md & .env.example)",
        });
      } else {
        const response = await axios.get(process.env.EXPO_PUBLIC_API_URL);
        set({ products: response.data.data, loading: false });
      }
    } catch (error: any) {
      set({ error: error.message, loading: false });
    }
  },
  getProductDetails: (productId: string) => {
    const { products } = get();
    return products.find((product) => product.id === productId);
  },
  addToCart: (product: Product, size: string) => {
    const { cart } = get();
    const existingItem = cart.find(
      (item) => item.id === product.id && item.selectedSize === size
    );
    if (existingItem) {
      set({
        cart: cart.map((item) =>
          item.id === product.id && item.selectedSize === size
            ? { ...item, quantity: item.quantity + 1 }
            : item
        ),
      });
    } else {
      set({
        cart: [...cart, { ...product, quantity: 1, selectedSize: size }],
      });
    }
  },
  removeFromCart: (productId: string, size: string) => {
    const { cart } = get();
    set({
      cart: cart.filter(
        (item) => !(item.id === productId && item.selectedSize === size)
      ),
    });
  },
  updateCartItemQuantity: (
    productId: string,
    size: string,
    quantity: number
  ) => {
    const { cart } = get();
    if (quantity === 0) {
      set({
        cart: cart.filter(
          (item) => !(item.id === productId && item.selectedSize === size)
        ),
      });
    } else {
      set({
        cart: cart.map((item) =>
          item.id === productId && item.selectedSize === size
            ? { ...item, quantity }
            : item
        ),
      });
    }
  },
}));
