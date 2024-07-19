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

interface ProductStore {
  products: Product[];
  cart: Product[];
  productDetails: Product | null;
  loading: boolean;
  error: string | null;
  fetchProducts: () => Promise<void>;
  getProductDetails: (productId: string) => Product | undefined;
  addToCart: (product: Product) => void;
  removeFromCart: (productId: string) => void;
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
        console.log("EXPO_PUBLIC_API_URL is not defined");
        set({ loading: false, error: "EXPO_PUBLIC_API_URL is not defined" });
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
  addToCart: (product: Product) =>
    set((state) => ({ cart: [...state.cart, product] })),
  removeFromCart: (productId: string) =>
    set((state) => ({
      cart: state.cart.filter((item) => item.id !== productId),
    })),
}));
