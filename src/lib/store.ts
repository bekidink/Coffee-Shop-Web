import { doc, getDoc } from "firebase/firestore";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { db } from "./firebase";
import { ProductDetailProps, Variant } from "../types";

interface CartProduct extends ProductDetailProps {
  quantity: number;
  variantId: string;
  price: number;
}

interface UserType {
  firstName: string;
  lastName: string;
  password: string;
  email: string;
  avatar: string;
  id: string;
}

interface StoreType {
  // user
  currentUser: UserType | null;
  isLoading: boolean;
  getUserInfo: (uid: any) => Promise<void>;
  // cart
  cartProduct: CartProduct[];
  addToCart: (
    product: ProductDetailProps & { variantId: string; price: number }
  ) => Promise<void>;
  decreaseQuantity: (productId: string, variantId: string) => void;
  removeFromCart: (productId: string, variantId?: string) => void;
  resetCart: () => void;
  // favorite
  favoriteProduct: CartProduct[];
  addToFavorite: (
    product: ProductDetailProps & { variantId: string; price: number }
  ) => Promise<void>;
  removeFromFavorite: (productId: string, variantId?: string) => void;
  resetFavorite: () => void;
}

const customStorage = {
  getItem: (name: string) => {
    const item = localStorage.getItem(name);
    return item ? JSON.parse(item) : null;
  },
  setItem: (name: string, value: any) => {
    localStorage.setItem(name, JSON.stringify(value));
  },
  removeItem: (name: string) => {
    localStorage.removeItem(name);
  },
};

export const store = create<StoreType>()(
  persist(
    (set) => ({
      currentUser: null,
      isLoading: true,
      cartProduct: [],
      favoriteProduct: [],

      getUserInfo: async (uid: any) => {
        if (!uid) return set({ currentUser: null, isLoading: false });

        const docRef = doc(db, "users", uid);
        const docSnap = await getDoc(docRef);

        try {
          if (docSnap.exists()) {
            set({ currentUser: docSnap.data() as UserType, isLoading: false });
          }
        } catch (error) {
          console.log("getUserInfo error", error);
          set({ currentUser: null, isLoading: false });
        }
      },

      addToCart: (
        product: ProductDetailProps & { variantId: string; price: number }
      ) => {
        return new Promise<void>((resolve) => {
          set((state: StoreType) => {
            const existingProduct = state.cartProduct.find(
              (p) => p.id === product.id && p.variantId === product.variantId
            );

            if (existingProduct) {
              return {
                cartProduct: state.cartProduct.map((p) =>
                  p.id === product.id && p.variantId === product.variantId
                    ? { ...p, quantity: p.quantity + 1 }
                    : p
                ),
              };
            } else {
              return {
                cartProduct: [
                  ...state.cartProduct,
                  {
                    ...product,
                    quantity: 1,
                    variantId: product.variantId,
                    price: product.price,
                  },
                ],
              };
            }
          });
          resolve();
        });
      },

      decreaseQuantity: (productId: string, variantId: string) => {
        set((state: StoreType) => {
          const existingProduct = state.cartProduct.find(
            (p) => p.id === productId && p.variantId === variantId
          );

          if (existingProduct) {
            return {
              cartProduct: state.cartProduct.map((p) =>
                p.id === productId && p.variantId === variantId
                  ? { ...p, quantity: Math.max(p.quantity - 1, 1) }
                  : p
              ),
            };
          }
          return state;
        });
      },

      removeFromCart: (productId: string, variantId?: string) => {
        set((state: StoreType) => ({
          cartProduct: state.cartProduct.filter(
            (item) =>
              !(
                item.id === productId &&
                (!variantId || item.variantId === variantId)
              )
          ),
        }));
      },

      resetCart: () => {
        set({ cartProduct: [] });
      },

      addToFavorite: (
        product: ProductDetailProps & { variantId: string; price: number }
      ) => {
        return new Promise<void>((resolve) => {
          set((state: StoreType) => {
            const isFavorite = state.favoriteProduct.some(
              (item) =>
                item.id === product.id && item.variantId === product.variantId
            );
            return {
              favoriteProduct: isFavorite
                ? state.favoriteProduct.filter(
                    (item) =>
                      !(
                        item.id === product.id &&
                        item.variantId === product.variantId
                      )
                  )
                : [
                    ...state.favoriteProduct,
                    {
                      ...product,
                      quantity: 1,
                      variantId: product.variantId,
                      price: product.price,
                    },
                  ],
            };
          });
          resolve();
        });
      },

      removeFromFavorite: (productId: string, variantId?: string) => {
        set((state: StoreType) => ({
          favoriteProduct: state.favoriteProduct.filter(
            (item) =>
              !(
                item.id === productId &&
                (!variantId || item.variantId === variantId)
              )
          ),
        }));
      },

      resetFavorite: () => {
        set({ favoriteProduct: [] });
      },
    }),
    {
      name: "supergear-storage",
      storage: customStorage,
    }
  )
);
