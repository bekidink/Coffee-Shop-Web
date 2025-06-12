import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Define the CartItem interface
interface CartItem {
  id: string;
  title: string;
  salePrice: number;
  qty: number;
  imageUrl: string;
  vendorId: string;
}

// Define the initial state type
type CartState = CartItem[];

// Initialize state with type checking
const initialState: CartState =
  (typeof window !== "undefined" &&
    (JSON.parse(localStorage.getItem("cart") || "[]") as CartItem[])) ||
  [];

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state: CartState, action: PayloadAction<CartItem>) => {
      const { id, title, salePrice, imageUrl, vendorId } = action.payload;
      const existingItem = state.find((item) => item.id === id);
      if (existingItem) {
        existingItem.qty += 1;
      } else {
        const newItem: CartItem = {
          id,
          title,
          salePrice,
          qty: 1,
          imageUrl,
          vendorId,
        };
        state.push(newItem);
      }
      if (typeof window !== "undefined") {
        localStorage.setItem("cart", JSON.stringify(state));
      }
    },
    removeFromCart: (state: CartState, action: PayloadAction<string>) => {
      const cartId = action.payload;
      const newState = state.filter((item) => item.id !== cartId);
      if (typeof window !== "undefined") {
        localStorage.setItem("cart", JSON.stringify(newState));
      }
      return newState;
    },
    incrementQty: (state: CartState, action: PayloadAction<string>) => {
      const cartId = action.payload;
      const cartItem = state.find((item) => item.id === cartId);
      if (cartItem) {
        cartItem.qty += 1;
        if (typeof window !== "undefined") {
          localStorage.setItem("cart", JSON.stringify(state));
        }
      }
    },
    decrementQty: (state: CartState, action: PayloadAction<string>) => {
      const cartId = action.payload;
      const cartItem = state.find((item) => item.id === cartId);
      if (cartItem && cartItem.qty > 1) {
        cartItem.qty -= 1;
        if (typeof window !== "undefined") {
          localStorage.setItem("cart", JSON.stringify(state));
        }
      }
    },
  },
});

export const { addToCart, removeFromCart, incrementQty, decrementQty } =
  cartSlice.actions;
export default cartSlice.reducer;
